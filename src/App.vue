<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>
<style lang="scss">
.my-table .btnbox {
  display: none!important;
}
.my-table .tablebox {
  margin-top: 0!important;
}
#app {
  --themeColor: #008cff;
}
.el-loading-spinner {
  .el-icon-loading {
    font-size: 50px;
  }
}
.el-loading-mask {
  z-index: 999999 !important;
}
.el-tabs--border-card{
  height: auto!important;
}
.el-tag{
  height: 24px;
  line-height: 24px;
  margin-top: 4px;
  margin-bottom: 4px
}
</style>
