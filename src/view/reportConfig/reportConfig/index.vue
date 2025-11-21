<template>
  <div class="box" ref="box">
    <div class="left">
      <!-- <reportConfigLeft></reportConfigLeft> -->
      <div class="leftbox">
        <div class="panel-header">
          <div class="panel-title">
            配置列表 <i class="el-icon-setting"></i>
          </div>
          <el-row style="display: flex; justify-content: end; margin: 5px">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-plus"
               @click="addPlus"
            ></el-button>
            <!-- <el-button  type="primary" size="mini" icon="el-icon-minus" ></el-button> -->
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-refresh"
              @click="refresh"
            ></el-button>
          </el-row>
        </div>
        <el-tree
          :data="data"
          :props="defaultProps"
          @node-click="handleNodeClick"
          :expand-on-click-node="false"
        >
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ node.label }}</span>
            <span>
              <el-button
                type="text"
                size="mini"
                @click="() => remove(node, data)"
              >
                删除
              </el-button>
            </span>
          </span>
        </el-tree>
      </div>
    </div>
    <div class="resize" title="收缩侧边栏">⋮</div>
    <div class="mid">
      <reportConfigRight ref="reportConfigRightTemplate" :leftFn='leftFn'></reportConfigRight>
    </div>
  </div>
</template>
<script>
import index from "./index";
export default {
  ...index,
};
</script>
<style lang="scss" scoped>
@import url("index.scss");

.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.leftbox {
  // min-width: 200px;
  height: 100%;
  overflow-x: auto;
}
.panel-header {
  width: 100%;
  //   background: linear-gradient(to bottom, #eff5ff 0, #e0ecff 100%);
  //   padding: 5px;
  //   border: 1px solid #95b8e7;
  box-sizing: border-box;
}
.panel-title {
  font-size: 18px;
  font-weight: bold;
  color: #0e2d5f;
  line-height: 40px;
  height: 40px;
  padding: 6px 5px;
  border-bottom: 1px solid #ccc;
}
</style>
