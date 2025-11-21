<style lang="scss" scoped>
@import url("./login.scss");
</style>
<template>
  <div class="layadmin-user-login">
    <div class="layadmin-user-login-main">
      <el-card class="login_body">
        <div slot="header" class="login_clearfix">
          <span>{{ displayName }}</span>
        </div>
        <div class="text item">
          <div id="login_div">
            <div class="h4">欢迎登录</div>
            <div class="h4" style="margin-top: 5px">智能仓储管理系统</div>
            <!-- <div class="h4" style="text-align:center">用户登录</div> -->
            <el-form
              ref="loginForm"
              :model="loginForm"
              :rules="loginRules"
              class="login-form"
              autocomplete="on"
              style="margin-top: 10px"
              label-position="left"
            >
              <!--              <el-form-item prop="systemName" class="selectss">-->
              <!--                <el-select prefix-icon="el-icon-s-cooperation" v-model="loginForm.systemName" clearable-->
              <!--                  placeholder="请选择" class="selects" @focus="setMinWidthEmpty" @change="systemNameChange">-->
              <!--                  <el-option v-for="item in systemNamelist" :key="item.key" :label="item.label" :value="item.key" />-->
              <!--                </el-select>-->
              <!--              </el-form-item>-->
              <!-- <el-form-item prop="tenantId" class="selectss">
                <el-select
                  prefix-icon="el-icon-s-cooperation"
                  v-model="loginForm.tenantId"
                  clearable
                  placeholder="请选择仓库(必选)"
                  class="selects"
                  @focus="setMinWidthEmpty"
                >
                  <el-option
                    v-for="item in list"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item> -->
              <el-form-item prop="userName">
                <el-input
                  ref="userName"
                  v-model="loginForm.userName"
                  placeholder="用户名"
                  name="userName"
                  type="text"
                  tabindex="1"
                  autocomplete="on"
                  prefix-icon="el-icon-user"
                />
              </el-form-item>
              <el-form-item prop="password">
                <el-input
                  :key="passwordType"
                  ref="password"
                  prefix-icon="el-icon-s-cooperation"
                  v-model="loginForm.password"
                  :type="passwordType"
                  placeholder="密码"
                  name="password"
                  tabindex="2"
                  autocomplete="on"
                  @keyup.native="checkCapslock"
                  @blur="capsTooltip = false"
                  @keyup.enter.native="handleLogin"
                />
              </el-form-item>
              <div class="operate">
                <el-form-item prop="checked">
                  <el-checkbox ref="checked" v-model="loginForm.checked"
                    >记住用户
                  </el-checkbox>
                </el-form-item>
                <div class="language">
                  <span
                    @click="changeLanguage('zh')"
                    :class="language == 'zh' ? 'active-language' : ''"
                    >中文版</span
                  >
                  <el-divider direction="vertical"></el-divider>
                  <span
                    @click="changeLanguage('en')"
                    :class="language == 'en' ? 'active-language' : ''"
                    >EN</span
                  >
                </div>
              </div>
              <el-form-item>
                <el-button
                  type="primary"
                  id="btn"
                  @click.native.prevent="handleLogin"
                  class="login_buttonlong"
                  >登录（login）
                </el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-card>
    </div>
    <div
      style="
        font-size: 8px;
        text-align: center;
        color: #999;
        margin-bottom: 10px;
        position: absolute;
        bottom: 10px;
        right: 0;
        left: 0;
      "
    >
      Copyright © 2023 上海欧力德信息技术有限公司
    </div>
  </div>
</template>
<script>
import { validUsername } from "@/utils/validate";
import SocialSign from "./components/SocialSignin";
import { pickingScreen, Tenant, WebSystem, Login } from "@/api/request/swagger";
import { JSEncrypt } from "jsencrypt";
export default {
  name: "Login",
  components: {
    SocialSign,
  },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error("Please enter the correct user name"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 3) {
        callback(new Error("The password can not be less than 3 digits"));
      } else {
        callback();
      }
    };
    return {
      systemNamelist: [
        {
          key: "config",
          label: "config",
        },
        {
          key: "wms",
          label: "wms",
        },
      ],
      displayName: "",
      loginForm: {
        userName: "",
        password: "",
        checked: false,
        systemName: "wms",
        // tenantId: "",
        scret: "",
      },
      loginRules: {
        tenantId: [
          {
            required: true,
            trigger: "blur",
            message: "请选择仓库",
          },
        ],
        userName: [
          {
            required: true,
            trigger: "blur",
            message: "请输入用户名",
          },
        ],
        password: [
          {
            required: true,
            trigger: "blur",
            message: "请输入密码",
          },
        ],
        // tenantId: [{ required: true, message: "必填", trigger: "blur" }],
      },
      passwordType: "password",
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {},
      list: [],
      workbenchCode: null,
      language: "zh",
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
  created() {
    localStorage.setItem("lang", "zh");
    this.$i18n.locale = "zh";
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    this.WebSystem();
    if (this.loginForm.userName === "") {
      this.$refs.userName.focus();
    } else if (this.loginForm.password === "") {
      this.$refs.password.focus();
    }
    let userName = this.Cookies.get("userNamePc");
    let password = this.Cookies.get("passwordPc");
    if (userName && password) {
      this.loginForm.userName = userName;
      this.loginForm.password = password;
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    getKey() {
      return new Promise((resolve, reject) => {
        this.get({
          url: Login.getKey,
        })
          .then((res) => {
            resolve(res);
          })
          .catch(() => {
            reject();
          });
      });
    },
    changeLanguage(val) {
      this.language = val;
      localStorage.setItem("lang", val);
      this.$i18n.locale = val;
    },
    systemNameChange() {
      this.get({
        url: WebSystem.findByCode,
        data: {
          code: this.loginForm.systemName,
        },
      }).then((res) => {
        this.displayName = res.result.displayName;
        sessionStorage.setItem("testwms", this.displayName);
      });
    },
    WebSystem() {
      this.get({
        url: Tenant.all,
      }).then((res) => {
        this.list = res.result;
        if (this.list.length == 1) {
          // this.loginForm.tenantId = this.list[0].id;
        }
      });
      this.get({
        url: WebSystem.findByCode,
        data: {
          code: this.loginForm.systemName,
          // code: window.global_config.name,
        },
      }).then((res) => {
        this.displayName = res.result.displayName;
      });
    },
    setMinWidthEmpty(val) {
      this.minWidth = val.srcElement.clientWidth;
      // 无数据情况下
      var mpty = document.getElementsByClassName("el-select-dropdown__empty");
      if (mpty.length > 0) {
        mpty[0].style["min-width"] = val.srcElement.clientWidth + 2 + "px";
      }
    },
    checkCapslock(e) {
      const { key } = e;
      this.capsTooltip = key && key.length === 1 && key >= "A" && key <= "Z";
    },
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    userbindwork() {
      this.post({
        url:
          pickingScreen.userbindwork + "?workbenchCode=" + this.workbenchCode,
        isLoading: false,
        data: {
          workbenchCode: this.workbenchCode,
        },
      }).then((res) => {
        this.$router.push({
          path: "/pickingScreen",
          name: "拣选",
          query: {
            workbenchCode: this.workbenchCode,
          },
        });
      });
    },
    handleLogin() {
      let str = window.location.href ? window.location.href : "";
      if (str.includes("?")) {
        let tempList = str.substring(str.indexOf("?") + 1).split("=");
        this.workbenchCode = tempList[1];
        window.localStorage.setItem(
          "workbenchCodeFlage",
          JSON.stringify(this.workbenchCode)
        );
      }
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          if (this.loginForm.checked) {
            this.Cookies.set("userNamePc", this.loginForm.userName);
            this.Cookies.set("passwordPc", this.loginForm.password);
          }
          this.getKey().then((res) => {
            this.loginForm.scret = res.result?.publicKey;
            var encryptor = new JSEncrypt();
            encryptor.setPublicKey(res.result?.xkeyList);
            // this.loginForm.password = encryptor.encrypt(this.loginForm.password); //加密密码
            let OBJ = {...this.loginForm}
            OBJ.password= encryptor.encrypt(this.loginForm.password)
            this.$store.dispatch("user/login", OBJ)
              .then(() => {
                let data = JSON.parse(localStorage.getItem("wms"));
                if (data.outTime) {
                  this.$message.warning("密码即将到期，请更改密码");
                }
                // this.$router.push({
                //   path: this.redirect || "/",
                //   query: this.otherQuery,
                // });
                if (this.workbenchCode) {
                  // this.userbindwork()
                  this.$router.push({
                    path: "/pickingScreen",
                    name: "拣选",
                    query: {
                      workbenchCode: this.workbenchCode,
                    },
                  });
                } else {
                  this.$store.state.tagsView.visitedViews = [];
                  this.$router.push({ path: "/" });
                  this.loading = false;
                }
              })
              .catch(() => {
                this.loading = false;
              });
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== "redirect") {
          acc[cur] = query[cur];
        }
        return acc;
      }, {});
    },
    // afterQRScan() {
    //   if (e.key === 'x-admin-oauth-code') {
    //     const code = getQueryObject(e.newValue)
    //     const codeMap = {
    //       wechat: 'code',
    //       tencent: 'code'
    //     }
    //     const type = codeMap[this.auth_type]
    //     const codeName = code[type]
    //     if (codeName) {
    //       this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
    //         this.$router.push({ path: this.redirect || '/' })
    //       })
    //     } else {
    //       alert('第三方登录失败')
    //     }
    //   }
    // }
  },
};
</script>
<style>
.login_body .el-card__header {
  /* padding: 0px; */
}

.el-card__body {
  padding: 10px;
}

.login_buttonlong {
  width: 100%;
}

.login_from .el-form-item {
  margin-bottom: 35px;
}

.h4 {
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 700;
  font-size: 26px;
  color: #232757;
}

.login_body {
  z-index: 999;
  width: 375px;
  margin: auto;
  margin-top: 25px;
  margin-left: 65%;
  box-sizing: border-box;
  background-color: rgba(255, 255, 255, 1);
  box-sizing: border-box;
  border-radius: 15px;
  border: 1px #d2d2d2 solid;
}

.el-card__header {
  padding: 0px;
}

.login_clearfix {
  background: #2f4056;
  font-size: 20px;
  box-sizing: border-box;
  text-align: center;
  padding: 20px;
  color: wheat;
}
.operate {
  display: flex;
  justify-content: space-between;
}
.language {
  line-height: 36px;
  font-size: 14px;
  cursor: pointer;
}
.active-language {
  color: #1890ff;
}
</style>
