<template>
  <div class="login-container">
    <div class="beijing"></div>
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      autocomplete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">{{ displayName }}</h3>
      </div>
      <el-form-item prop="tenantId" class="selectss">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-select
          v-model="loginForm.tenantId"
          clearable
          placeholder="请选择"
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
      </el-form-item>
      <el-form-item prop="userName">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="userName"
          v-model="loginForm.userName"
          placeholder="用户名"
          name="userName"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>

      <el-tooltip
        v-model="capsTooltip"
        content="Caps lock is On"
        placement="right"
        manual
      >
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
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
          <span class="show-pwd" @click="showPwd">
            <svg-icon
              :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
            />
          </span>
        </el-form-item>
      </el-tooltip>
      <!--  type="primary" -->
      <el-button
        :loading="loading"
        style="
          width: 100%;
          margin-bottom: 2px;
          background: #546f89;
          border-color: #546f89;
          color: #e7e9ed;
          font-size: 18px;
        "
        @click.native.prevent="handleLogin"
        >Login</el-button
      >
    </el-form>

    <el-dialog title="Or connect with" :visible.sync="showDialog">
      Can not be simulated on local, so please combine you own business
      simulation! ! !
      <br />
      <br />
      <br />
      <social-sign />
    </el-dialog>
  </div>
</template>

<script>
import { validUsername } from "@/utils/validate";
import SocialSign from "./components/SocialSignin";
import { WebSystem, Tenant } from "@/api/request/swagger";
export default {
  name: "Login",
  components: { SocialSign },
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
      displayName: "",
      loginForm: {
         userName: "",
        password: "",
       
        // userName: "admin",
        // password: "qwe",
        tenantId: "",
      },
      loginRules: {
        userName: [
          { required: true, trigger: "blur", message: "请输入用户名" },
        ],
        password: [{ required: true, trigger: "blur", message: "请输入密码" }],
        // tenantId: [{ required: true, message: "必填", trigger: "blur" }],
      },
      passwordType: "password",
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {},
      list: [],
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
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    this.WebSystem();
    if (this.loginForm.userName === "") {
      this.$refs.userName.focus();
    } else if (this.loginForm.password === "") {
      this.$refs.password.focus();
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    WebSystem() {
      this.get({
        url: Tenant.all,
      }).then((res) => {
        this.list = res.result;
        if (this.list.length == 1) {
          this.loginForm.tenantId = this.list[0].id;
        }
      });
      this.get({
        url: WebSystem.findByCode,
        data: {
          code: window.global_config.name,
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
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("user/login", this.loginForm)
            .then(() => {
              this.$router.push({
                path: this.redirect || "/",
                query: this.otherQuery,
              });
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
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

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 95%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  background-image: url("~@/assets/logo/loginBackground.jpg"); //背景图片
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  .beijing {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0px;
    top: 0px;
    background-color: $bg;
    // background: url("../../assets/bg/bg.jpg") #283443;

    // background-repeat: no-repeat;
    // background-size: cover;
    // -webkit-filter: blur(30px);
    // -moz-filter: blur(30px);
    // -o-filter: blur(30px);
    // -ms-filter: blur(30px);
    // filter: blur(30px);
  }
  .login-form {
    width: 520px;
    max-width: 100%;
    background-color: #c2c0c380;
    /* padding: 171px 30px 34px; */
    // margin:206px 993px 0;
    margin-top: 10%;
    // margin-left: 65%;
    border-radius: 20px;
    overflow: hidden;
    position: absolute;
    z-index: 5;
  }

  // 原来的
  // .login-form {
  //   position: relative;
  //   width: 520px;
  //   max-width: 100%;
  //   padding: 160px 35px 0;
  //   margin: 0 auto;
  //   overflow: hidden;
  // }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 8px;
    // color: $dark_gray;
    color: #546f89;
    vertical-align: middle;
    width: 22px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    // 新增的
    .title {
      font-size: 26px;
      color: #101010;
      margin: 4px auto 13px auto;
      padding-top: 20px;
      text-align: center;
      font-weight: bold;
    }

    //原来的
    // .title {
    //   font-size: 26px;
    //   color: $light_gray;
    //   margin: 0px auto 40px auto;
    //   text-align: center;
    //   font-weight: bold;
    // }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}

.el-select {
  width: 95% !important;
}
.selectss {
  .el-form-item__content {
    .selects {
      ::v-deep .el-input {
        width: 100% !important;
      }
    }
  }
}
</style>
