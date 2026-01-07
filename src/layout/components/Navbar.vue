<template>
  <div class="navbar">
    <div>
      <hamburger
        id="hamburger-container"
        :is-active="sidebar.opened"
        class="hamburger-container"
        @toggleClick="toggleSideBar"
      />
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    </div>
    <!--    <div>-->
    <!--      <el-tabs style="line-height: 46px; height: 100%; cursor: pointer" v-model="activeName" @tab-click="handleClick">-->
    <!--        <el-tab-pane label="wms系统" name="wms"></el-tab-pane>-->
    <!--        <el-tab-pane label="config系统" name="config"></el-tab-pane>-->
    <!--      </el-tabs>-->
    <!--    </div>-->
    <div class="right-menu">
      <template v-if="device !== 'mobile'">
        <!-- <search id="header-search" class="right-menu-item line-height" /> -->
        <!-- <error-log class="errLog-container right-menu-item hover-effect line-height" /> -->
        <screenfull
          id="screenfull"
          class="right-menu-item hover-effect line-height"
        />
        <!--     <el-tooltip content="Global Size" effect="dark" placement="bottom">
               <size-select id="size-select" class="right-menu-item hover-effect line-height" />
             </el-tooltip> -->
      </template>
      <el-button type="primary" class="download" @click="downloadClk"
        >下载</el-button
      >
      <el-dropdown
        class="avatar-container right-menu-item hover-effect"
        trigger="click"
      >
        <div class="avatar-wrapper">
          <!-- <img :src="avatar" class="user-avatar"> -->
          <span style="font-size: 14px">{{ introduction.name }}</span>
          <span
            v-if="introduction.tenant"
            style="font-size: 14px; display: block"
            >({{ introduction.tenant }})</span
          >
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <!-- <router-link to="/profile/index">
            <el-dropdown-item>Profile</el-dropdown-item>
          </router-link>
          <router-link to="/">
            <el-dropdown-item>Dashboard</el-dropdown-item>
          </router-link>
          <a target="_blank" href="https://github.com/PanJiaChen/vue-element-admin/">
            <el-dropdown-item>Github</el-dropdown-item>
          </a>-->
          <el-dropdown-item @click.native="MP">修改密码</el-dropdown-item>
          <el-dropdown-item divided @click.native="cleanCache"
            >清理缓存</el-dropdown-item
          >
          <el-dropdown-item divided @click.native="logout">
            <span style="display: block">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <dialogTemplate :form="form" ref="dialogForm"></dialogTemplate>
      <QrCode :form="qrCodeForm" ref="QrCode"></QrCode>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
import ErrorLog from "@/components/ErrorLog";
import Screenfull from "@/components/Screenfull";
import SizeSelect from "@/components/SizeSelect";
import Search from "@/components/HeaderSearch";
import QrCode from "./QrCode/index.vue";
import { enumsSelect } from "@/api/login/login";
import { identity } from "@/api/request/swagger";
import axios from "axios";
import { Message } from "element-ui";
import { swaggerUnload } from "ol-base-components";

export default {
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,
    SizeSelect,
    Search,
    QrCode,
  },
  computed: {
    ...mapGetters(["sidebar", "avatar", "device", "introduction"]),
  },
  data() {
    //老的
    var validatePass2 = (rule, value, callback) => {
      let regex = new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@#$%&*]).{8,}$|^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$|^(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&*]).{8,}$|^(?=.*[a-z])(?=.*\\d)(?=.*[@#$%&*]).{8,}$|^(?=.*[A-Z])(?=.*\\d)(?=.*[@#$%&*]).{10,}$"
      );
      if (value === "") {
        callback(new Error("请输入修改密码"));
      } else {
        if (value.length < 10) {
          callback(new Error("修改密码长度不能小于10位数!"));
        } else if (!regex.test(value)) {
          callback(
            new Error(
              "密码至少包含三种字符类型:小写字母、大写字母、数字、特殊字符"
            )
          );
        } else if (this.form.value.password !== "") {
          this.$refs.dialogForm.$refs.form.validateField("checkPass");
        }
        callback();
      }
    };
    //新的
    var validatePass1 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入确认密码"));
      } else {
        if (value.length < 10) {
          callback(new Error("确认密码长度不能小于10位数!"));
        } else if (value !== this.form.value.passwordOld) {
          callback(new Error("确认密码与修改密码不一致!"));
        } else {
          callback();
        }
      }
    };
    return {
      activeName: "wms",
      form: {
        dialogFormVisible: false,
        title: "",
        model: [
          {
            label: "修改密码",
            type: "input",
            prop: "passwordOld",
            showPassword: true,
          },
          {
            label: "确认密码",
            type: "input",
            prop: "password",
            showPassword: true,
          },
        ],
        rules: {
          password: [
            { required: true, trigger: "blur", validator: validatePass1 },
          ],
          passwordOld: [
            { required: true, trigger: "blur", validator: validatePass2 },
          ],
        },
        value: {
          password: "",
          passwordOld: "",
        },
        requestData: {
          methodsType: "post",
          flage: "add",
          flages: true,
          joinData: ["password"],
          url: identity.updatepassword,
          fn: function () {
            console.log("操作成功！");
          },
        },
      },
      qrCodeForm: {
        dialogFormVisible: false,
        text: "",
      },
    };
  },
  methods: {
    downloadClk() {
      this.get({
        url: identity.downloadAppAddress,
        isLoading: true,
      }).then((res) => {
        this.qrCodeForm.text = res.result;
        window.open(res.result, "_self");
        this.qrCodeForm.dialogFormVisible = true;
        this.$refs.QrCode.generateCode();
      });
    },
    handleClick(tab, event) {
      if (tab.name == "wms") {
      }
    },
    MP() {
      this.form.dialogFormVisible = true;
      this.form.value = {
        password: "",
        passwordOld: "",
      };
      this.form.requestData.flage = "add";
    },
    cleanCache() {
      enumsSelect().then((res) => {
        res.result.enableStatusEnum = {
          enums: [
            {
              key: true,
              value: "启用",
            },
            {
              key: false,
              value: "禁用",
            },
          ],
        };
        let wms = JSON.parse(localStorage.getItem("wms"));
        wms.SET_enumsSelect = res.result;
        localStorage.setItem("wms", JSON.stringify(wms));
        location.reload();
      });
    },
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    async logout() {
      await this.$store.dispatch("user/logout");
      // this.Cookies.set("userNamePc",'')
      // this.Cookies.set("passwordPc",'')
      this.$router.push(`/login`);
      // this.$router.push(`/login?redirect=${this.$route.fullPath}`);
      swaggerUnload();
    },
  },
};
</script>
<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  display: flex;
  justify-content: space-between;
  align-items: center;
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;
    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }
  .breadcrumb-container {
    float: left;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .line-height {
    line-height: 50px;
  }
  .right-menu {
    float: right;
    height: 100%;
    text-align: center;
    // line-height: 50px;
    &:focus {
      outline: none;
    }
    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      // height: 100%;
      font-size: 18px;
      color: #5a5e66;
      // vertical-align: text-bottom;
      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;
        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }
    .download {
      font-size: 14px;
      padding: 0 5px;
      background: none;
      border: none;
      color: #1890ff;
    }
    .avatar-container {
      margin-right: 30px;
      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 6px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
