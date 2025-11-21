<template>
  <div id="login_div">
    <h4>欢迎登录</h4>
    <h4 style="margin-top: 5px">智能仓储管理系统</h4>
    <el-form
      ref="form"
      :model="form"
      label-width="10px"
      label-position="left"
      style="margin-top: 15px"
      :rules="loginRules"
      class="login_from"
    >
      <el-form-item prop="loginName">
        <el-input
          ref="loginName"
          placeholder="用户名"
          prefix-icon="el-icon-user"
          v-model="form.loginName"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          ref="password"
          type="password"
          placeholder="密码"
          prefix-icon="el-icon-s-cooperation"
          v-model="form.password"
          @keyup.enter.native="loginForm('form')"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          id="btn"
          @click="loginForm('form')"
          class="login_buttonlong"
          >登录</el-button
        >
        <!-- <el-button type="primary" @click="clickfull" class="login_buttonlong">登录</el-button> -->
      </el-form-item>
    </el-form>

    <setPositionFrom
      v-show="isActive"
      id="ccpublic"
      ref="ccpublic"
      :fromData="fromData"
      :warehouselist="warehouselist"
    ></setPositionFrom>
  </div>
</template>
<script>
import { userToken, WorkBench } from "@/api/cngfigrequestAddress/config";
import screenfull from "screenfull";
import varible from "@/util/variableFlage";
import { sendRequest } from "@/api/utils/http";
import * as RequestFn from "@/util/requestFN"; //请求方法
import { validateUsername, validatePassword } from "../../../util/validate";
import { createConnection } from "@/util/signalRID.js";
import setPositionFrom from "./from/index.vue";
export default {
  inject: ["reload"],
  data() {
    const valUsername = (rule, value, callback) => {
      if (!validateUsername(value)) {
        if (!value) {
          callback(new Error("用户名未填"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    const valPassword = (rule, value, callback) => {
      if (!validatePassword(value)) {
        if (!value) {
          callback(new Error("密码未填"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    return {
      warehouselist: [],
      fromData: {},
      isActive: false,
      isFullscreen: false,
      WorkBenchFlage: false,
      form: {
        loginName: "",
        password: "",
        warehouseId: '',
      },
      loginRules: {
        loginName: [
          { required: true, trigger: "blur", validator: valUsername },
        ],
        password: [{ required: true, trigger: "blur", validator: valPassword }],
      },
      redirect: undefined,
      otherQuery: {},
      token: null,
      connection: null,
      timer: null,
      urlValCodes: null,
      tempFlage: false,
      fromData: {
        warehouseId: null,
      },
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        const query = route.query;
        if (query) {
          this.redirect = query.redirect;
          this.otherQuery = this.getOtherQuery(query);
        }
      },
      immediate: true,
    },
  },
  created() {},
  components: { setPositionFrom },
  mounted() {
    //  this.isFullscreen = true;
    //  this.clickfull();
    // this.fullScreen(document.documentElement)
    // document.addEventListener('fullscreenchange', Fn);
  },
  methods: {
    clickfull() {
      if (!screenfull.enabled) {
        this.$message({
          message: "不支持全屏",
          type: "warning",
        });
        return false;
      }

      screenfull.toggle();
    },
    change() {
      if (screenfull.isFullscreen) {
        this.isFullscreen = screenfull.isFullscreen;
      }
    },

    init() {
      if (screenfull.enabled) {
        screenfull.on("change", this.change);
      }
    },
    destroy() {
      if (screenfull.enabled) {
        screenfull.off("change", this.change);
      }
    },

    loginForm(formName) {
      var self = this;
      this.fromData.warehouseId = null;
      this.$refs[formName].validate((v) => {
        if (v) {
          // this.post({
          //   defaultUrl: userToken.GetWarehouse,
          //   data: this.form,
          // }).then((res, er) => {
          //   (this.fromData.loginName = this.form.loginName),
          //     (this.fromData.password = this.form.password),
          //     (self.warehouselist = res.result);
          //   if (res.result.length > 1) {
              // let containerApiURL = "http://192.168.3.238:8092";
              // window.localStorage.setItem("containerApiURL", containerApiURL);
              // window.global_config.containerApiURL = containerApiURL;
            //   return this.layeropen({
            //     title: "仓库",
            //     id: $("#ccpublic"),
            //     ref: "ccpublic",
            //   });
            // } else {
            //   this.fromData.warehouseId = res.result[0].key;
              this.$store.dispatch("user/login", this.form).then((res) => {
                if (res.result.token) {
                  this.token = res.result.token;
                  layer.closeAll();
                  this.$store.commit("user/SET_TOKEN", res.result.token);
                  this.$store.commit("user/RES_TOKEN", res.result.refreshToken);
                  this.$message.success("欢迎进入");
                  this.$router.push({
                    path: this.redirect || "/",
                    query: this.otherQuery,
                  });
                }
              });
          //   }
          // });
        }
      });
    },
    //创建链接的方法
    createConnection() {
      if (this.token) {
        //创建链接
        this.connection = new signalR.HubConnectionBuilder()
          .withUrl(varible.connectionwithUrl, {
            accessTokenFactory: () => this.token,
          })
          .build();
        let signalRID = this.connection;
        this.$store.commit("connectionURL", signalRID);
        //执行链接
        let _that = this;
        signalRID
          .start()
          .then(function () {
            //  debugger;
            //存链接
            console.log(signalRID, "signalRID");
            if (_that.timer != null) {
              clearInterval(_that.timer);
              _that.reload();
              // clearInterval(_that.reload());
            }
            //监听停止链接后 重连链接 如果 重连失败继续链接 如果成功 就不用链接 （不报错了就代表重连成功）
            signalRID.onclose(function () {
              //  debugger
              console.error("连接断开");
              // //重连的的方法
              if (_that.token) {
                _that.timer = setTimeout(_that.createConnection, 5000);
              }
              // setTimeout(_that.reload(), 6000);
            });
            _that.timer = null;
          })
          .catch(function (err) {
            if (_that.token) {
              _that.timer = setTimeout(_that.createConnection, 5000);
            }

            //  debugger
            //刷新组件
            // setTimeout(_that.reload(), 6000);
            return console.error(err.toString());
          });

        // //停止链接
        // signalRID
        //   .stop()
        //   .then(function() {
        //     //  debugger;
        //     //清空链接
        //     _that.$store.commit("connectionURL", null);
        //     clearInterval(_that.timer);
        //     _that.timer = null;
        //   })
        //   .catch(err => {});
      }
    },

    //调用用户拣选屏编码接口
    userBindWork(code, datas, isFlage) {
      let BaseUrl;
      let flage;
      if (isFlage == false) {
        BaseUrl = WorkBench.UserBindWork + "?workbenchCode=" + code;
        flage = false;
      } else {
        BaseUrl = WorkBench.UserBindWork + "?isBigScreen=" + true;
        flage = true;
      }
      let _that = this;
      RequestFn.PostRequest(
        {
          url: BaseUrl,
        },
        (res) => {
          if (!flage) {
            this.$message.success("欢迎进入");
            this.$router.push({
              path: "/stockOutScreen",
              query: this.otherQuery,
            });
          } else {
            this.$message.success("欢迎进入");
            this.$router.push({
              path: "/bigScreen",
              query: this.otherQuery,
            });
          }
        },
        (err) => {
          if (err.error) layer.msg(err.error.message);
          _that.$store.commit("user/SET_TOKEN", null);
          _that.$store.commit("user/RES_TOKEN", null);
          window.localStorage.removeItem("connectionURL");
          window.localStorage.removeItem("workbenchCodeFlage");
          window.localStorage.removeItem("token");
          window.localStorage.removeItem("restoken");
        }
      );
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== "redirect") {
          acc[cur] = query[cur];
        }
        return acc;
      }, {});
    },
  },
};
</script>
<style scoped>
.login_buttonlong {
  width: 100%;
}
.login_from .el-form-item {
  margin-bottom: 35px;
}
h4 {
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 700;
  font-size: 26px;
  color: #232757;
}
</style>
