import axios from "@/api/request/axios";
import store from "@/store";
import { MessageBox, Message, Col } from "element-ui";
import { showFullScreenLoading, hideFullScreenLoading } from "@/utils/loading";
/** 未完成
 * 刷新token
 */

/**
 *
 * @param {//通用请求的方法 } param
 * @returns
 */

export function request(param) {
  let wms = JSON.parse(localStorage.getItem("wms"));
  let hasToken = null;
  if (wms) hasToken = wms.SET_TOKEN;
  if (param.isLoading) showFullScreenLoading();
  const defaultConfig = {
    method: "post",
    isLoading: false,
    responseType: "json",
    timeout: 120000,
    headers: {
      Accept: "application/json;odata.metadata=minimal;odata.streaming=true",
      "Content-Type": "application/json",
      // 'Content-Type': 'application/json;odata.metadata=minimal;odata.streaming=true',
      Authorization: "Bearer " + hasToken,
    },
    success: function () {},
    failed: function () {},
    error: function () {},
  };
  if (!param.isLoading) hideFullScreenLoading();
  if (param.url === undefined)
    return console.error("url:" + param.url), hideFullScreenLoading();
  if (param.urlFlage === "wcs")
    param.url = window.global_config.wcsURL + param.url;
  else if (param.url === "/api/app/stock-out/container-out-pages")
    param.url = window.global_config.LCURL + param.url;
  else if (param.url === "/api/app/stock-out/export-container-out")
    param.url = window.global_config.LCURL + param.url;
  else if (param.url === "/api/app/statistics/device-alarm-pages-old")
    param.url =
      window.global_config.LCURL + "/api/app/statistics/device-alarm-pages";
  else if (param.url === "/api/app/statistics/export-device-alarms-old")
    param.url =
      window.global_config.LCURL + "/api/app/statistics/export-device-alarms";
  else param.url = window.global_config.baseURL + param.url;

  if (!param.isSwagger) {
    if (param.method === "get") param.params = param.data;
    else param.data = param.data;
  }

  for (const key in param) {
    defaultConfig[key] = param[key];
  }
  axios(defaultConfig)
    .then(function (res) {
      hideFullScreenLoading();
      // 统一处理 blob 文件下载（包括 application/octet-stream、excel、pdf 等）
      const isBlobResponse = res && res.data && res.data instanceof Blob;
      if (res.status === 200 && isBlobResponse) {
        const contentType = (res.headers && res.headers["content-type"]) || "";
        // 如果后端错误信息以 JSON 形式包在 blob 里，解析并抛出
        if (contentType.indexOf("application/json") > -1) {
          const reader = new FileReader();
          reader.readAsText(res.data);
          reader.onload = function () {
            try {
              const blobJson = JSON.parse(reader.result);
              if (typeof param.error !== "function") {
                Message({
                  message:
                    (blobJson &&
                      (blobJson.message ||
                        (blobJson.error && blobJson.error.message))) ||
                    "下载失败",
                  type: "error",
                  duration: 5 * 1000,
                });
              } else {
                param.error(blobJson);
              }
            } catch (e) {
              param.error({ message: "解析 Blob JSON 时出错", error: e });
            }
          };
          return;
        }
        // 提取文件名，支持 filename*=UTF-8''xxx 与 filename="xxx"
        let fileName = "download";
        const disposition = res.headers && res.headers["content-disposition"];
        if (disposition) {
          const utf8Match = /filename\*\s*=\s*UTF-8''([^;]+)$/i.exec(
            disposition
          );
          const asciiMatch = /filename\s*=\s*([^;]+)$/i.exec(disposition);
          if (utf8Match) fileName = decodeURIComponent(utf8Match[1]);
          else if (asciiMatch)
            fileName = asciiMatch[1].replace(/^"(.*)"$/, "$1");
        }
        res.fileName = fileName;
        if (typeof param.success !== "function") {
          console.error(param.success);
          return false;
        } else {
          param.success(res);
          return;
        }
      }
      // 兼容早期仅判断 excel 的逻辑
      if (
        (res.status === 200 &&
          res.data &&
          res.data.type == "application/x-xls") ||
        (res.data && res.data.type == "application/vnd.ms-excel")
      ) {
        if (typeof param.success !== "function") {
          console.error(param.success);
          return false;
        } else {
          res.fileName = res.headers["content-disposition"]
            .split(";")[1]
            .split("=")[1];
          param.success(res);
          return;
        }
      }
      if (res.status === 200) {
        if (!res.data.success) {
          // 如果data是Blob类型
          if (res.data instanceof Blob) {
            // 如果是blob类型的
            // Blob转对象
            const reader = new FileReader();
            reader.readAsText(res.data);
            reader.onload = function () {
              try {
                const blobRes = JSON.parse(reader.result);
                if (blobRes.code === 200) {
                  param.success(res.data);
                } else {
                  Message({
                    message: blobRes.error.message || "Error",
                    type: "error",
                    duration: 5 * 1000,
                  });
                }
              } catch (error) {
                param.error({ message: "解析 Blob 数据时出错", error });
              }
            };
          }
          const code = parseInt(res.data.error.code);

          if (code === 401) {
            MessageBox.confirm(
              "身份验证失败，您可以取消以停留在此页面，或再次登录",
              "确认注销",
              {
                confirmButtonText: "重新登录",
                cancelButtonText: "关闭",
                type: "warning",
              }
            ).then(() => {
              store.dispatch("user/resetToken").then(() => {
                location.reload();
              });
            });
          } else if (code === 500 && param.refreshTokYs) {
            routes.push({
              path: "/login",
            });
            return false;
          } else if (code === 500) {
            if (typeof param.error !== "function") {
              Message({
                message: res.data.error.message || "Error",
                type: "error",
                duration: 5 * 1000,
              });
            } else {
              if (res.data.error) {
                param.error(res.data);
              }
            }
          } else {
            if (typeof param.error !== "function") {
              Message({
                message: res.data.error.message || "Error",
                type: "error",
                duration: 5 * 1000,
              });
            } else {
              if (res.data.error) {
                param.error(res.data);
              }
            }
          }
        } else {
          if (typeof param.success !== "function") {
            console.error(param.success);
            return false;
          } else {
            param.success(res.data);
          }
        }
      }
    })
    .catch((err) => {
      hideFullScreenLoading();
      param.error(err);
    });
}

export default request;
