/**
 * ⚠️  警告：此文件由脚本自动生成，请勿手动编辑！
 * ��  swagger更新后请重新运行生成脚本
 * 服务地址：http://192.168.101.27:5006
*/

import { api } from "@/api/request/sendRuest"
/**
 * 获取接口信息
 * @param {Object} params - 请求参数
 * @param {string} [params.path] - 路由
*/
export const getApidescription = (params, options = {}) => {
 return api({
  url: `/api/app/api-description/api-description`,
  method: "get",
  params,
  ...options
 });
};

