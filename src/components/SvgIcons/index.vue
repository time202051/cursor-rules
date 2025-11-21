<!--
 * @Description: 
 * @Autor: gaoxue
 * @Date: 2021-09-26 11:25:13
 * @LastEditors: gaoxue
 * @LastEditTime: 2021-09-26 11:25:54
-->
<template>
  <div class="icon-body">
    <el-input
      placeholder="请输入内容"
      suffix-icon="el-icon-search el-input__icon"
      v-model="name"
      @input.native="filterIcons"
    >
    </el-input>
    <div class="icon-list">
      <div
        v-for="(item, index) in iconList"
        :key="index"
        @click="selectedIcon(item)"
      >
        <i :class="`el-icon-${item}`"></i>
        <span>{{ item }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import icons from "./icon.js";
export default {
  name:'SvgIcons',
  data() {
    return {
      name: null,
      iconList: icons,
    };
  },
  methods: {
    filterIcons() {
      this.iconList = icons;
      if (this.name) {
        this.iconList = this.iconList.filter((item) =>
          item.includes(this.name)
        );
      }
    },
    selectedIcon(name) {
      this.$emit("selectedIcon", name);
      document.body.click();
    },
    reset() {
      this.name = "";
      this.iconList = icons;
    },
  },
};
</script>

<style lang="scss" scoped>
.icon-body {
  width: 100%;
  padding: 10px;
  .icon-list {
    height: 200px;
    overflow-y: scroll;
    div {
      height: 30px;
      line-height: 30px;
      margin-bottom: -5px;
      cursor: pointer;
      width: 33%;
      float: left;
      i {
        display: inline-block;
        height: 30px;
        width: 16px;
        margin-right: 5px;
      }
      span {
        // display: inline-block;
        // vertical-align: -0.15em;
        // fill: currentColor;
        // overflow: hidden;
        // vertical-align: -0.15em;
        // fill: currentColor;
      }
    }
  }
}
</style>