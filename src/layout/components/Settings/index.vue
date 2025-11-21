<template>
  <div class="drawer-container">
    <div>
      <h3 class="drawer-title">Page style setting</h3>

      <div class="drawer-item">
        <span>按钮颜色</span>
        <!-- <span>Theme Color</span> -->
        <theme-picker style="float: right;height: 26px;margin: -3px 8px 0 0;" @change="btnChange" />
      </div>

      <!-- <div class="drawer-item">
        <span>主题颜色</span>
        <el-color-picker class="theme-picker"
          :predefine="['#409EFF', '#1890ff', '#304156','#212121','#11a983', '#13c2c2', '#6959CD', '#f5222d', ]"
          popper-class="theme-picker-dropdown" style="float: right;height: 26px;margin: -3px 8px 0 0;"
          @change="themeChange_1" v-model="color1"></el-color-picker>
      </div> -->

      <div class="drawer-item">
        <span>打开标签视图</span>
        <!-- <span>Open Tags-View</span> -->
        <el-switch v-model="tagsView" class="drawer-switch" />
      </div>

      <div class="drawer-item">
        <span>固定头部</span>
        <!-- <span>Fixed Header</span> -->
        <el-switch v-model="fixedHeader" class="drawer-switch" />
      </div>

      <div class="drawer-item">
        <span>边栏logo</span>
        <!-- <span>Sidebar Logo</span> -->
        <el-switch v-model="sidebarLogo" class="drawer-switch" />
      </div>

    </div>
  </div>
</template>

<script>
  import ThemePicker from '@/components/ThemePicker'
  import ThemePickerChange from '@/components/ThemePickerChange'

  export default {
    components: {
      ThemePicker,
      ThemePickerChange
    },
    data() {
      return {
        color1: '#409EFF'
      }
    },
    computed: {
      fixedHeader: {
        get() {
          return this.$store.state.settings.fixedHeader
        },
        set(val) {
          this.$store.dispatch('settings/changeSetting', {
            key: 'fixedHeader',
            value: val
          })
        }
      },
      tagsView: {
        get() {
          return this.$store.state.settings.tagsView
        },
        set(val) {
          this.$store.dispatch('settings/changeSetting', {
            key: 'tagsView',
            value: val
          })
        }
      },
      sidebarLogo: {
        get() {
          return this.$store.state.settings.sidebarLogo
        },
        set(val) {
          this.$store.dispatch('settings/changeSetting', {
            key: 'sidebarLogo',
            value: val
          })
        }
      }
    },
    methods: {
      btnChange(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'theme',
          value: val
        })
      },
      themeChange_1(val) {
        this.$store.dispatch('changeThemeColor/changeThemeColor', {
          key: 'theme',
          value: val
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .drawer-container {
    padding: 24px;
    font-size: 14px;
    line-height: 1.5;
    word-wrap: break-word;

    .drawer-title {
      margin-bottom: 12px;
      color: rgba(0, 0, 0, .85);
      font-size: 14px;
      line-height: 22px;
    }

    .drawer-item {
      color: rgba(0, 0, 0, .65);
      font-size: 14px;
      padding: 12px 0;
    }

    .drawer-switch {
      float: right
    }
  }
</style>
<style scoped>
  .theme-message,
  .theme-picker-dropdown {
    z-index: 99999 !important;
  }

  .theme-picker .el-color-picker__trigger {
    height: 26px !important;
    width: 26px !important;
    padding: 2px;
  }

  .theme-picker-dropdown .el-color-dropdown__link-btn {
    display: none;
  }
</style>
