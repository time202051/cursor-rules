<template>
  <div class="dialogbox">
    <el-select :value="valueTitle" :clearable="clearable" @clear="clearHandle" :id="id"
      :placeholder="`请选择${valueTitle}`"
    @focus="setMinWidthEmpty">
      <el-option :value="valueTitle" :label="valueTitle">
        <el-tree id="tree-option" ref="selectTree" :accordion="accordion" :data="options" :props="props"
          :node-key="props.value" :default-expanded-keys="defaultExpandedKey"
          :style="{ 'min-width': minWidth + 2 + 'px' }" @node-click="handleNodeClick"></el-tree>
      </el-option>
    </el-select>
  </div>
</template>

<script>
  export default {
    name: "TreeSelectfrom",
    model: {
      prop: "value",
      event: "getValue",
    },
    props: {
      select_tree: String,
      /* 配置项 */
      props: {
        type: Object,
        default: () => {
          return {
            value: "id", // ID字段名
            label: "title", // 显示名称
            children: "child", // 子级字段名
          };
        },
      },
      /* 选项列表数据(树形结构的对象数组) */
      options: {
        type: Array,
        default: () => {
          return [];
        },
      },
      /* 初始值 */
      value: {
        type: String,
        default: () => {
          return null;
        },
      },
      /* 可清空选项 */
      clearable: {
        type: Boolean,
        default: () => {
          return true;
        },
      },
      /* 自动收起 */
      accordion: {
        type: Boolean,
        default: () => {
          return true;
        },
      },
    },
    data() {
      return {
        valueId: this.value, // 初始值
        valueTitle: "",
        id: this.select_tree || "select_tree",
        defaultExpandedKey: [],
        minWidth: 0,
      };
    },
    mounted() {
      this.initHandle();
    },
    methods: {
      //设置宽度最小值
      setMinWidthEmpty(val) {
        this.minWidth = val.srcElement.clientWidth;
        //无数据情况下
        var mpty = document.getElementsByClassName("el-select-dropdown__empty");
        if (mpty.length > 0) {
          mpty[0].style["min-width"] = val.srcElement.clientWidth + 2 + "px";
        }
      },
      // 初始化值
      initHandle() {
        this.valueTitle = "";
        if (this.valueId) {
          this.valueTitle = this.$refs.selectTree.getNode(this.valueId).data[
            this.props.label
          ]; // 初始化显示
          this.$refs.selectTree.setCurrentKey(this.valueId); // 设置默认选中
          this.defaultExpandedKey = [this.valueId]; // 设置默认展开
        } else if (this.valueId === "") {
          this.valueTitle = "";
        }

        this.$nextTick(() => {
          let scrollWrap = document.querySelectorAll(
            ".el-scrollbar .el-select-dropdown__wrap"
          )[0];
          let scrollBar = document.querySelectorAll(
            ".el-scrollbar .el-scrollbar__bar"
          );
          scrollWrap.style.cssText =
            "margin: 0px; max-height: none; overflow: hidden;";
          scrollBar.forEach((ele) => (ele.style.width = 0));
        });
      },
      // 切换选项
      handleNodeClick(node) {
        this.valueTitle = node[this.props.label];
        this.valueId = node[this.props.value];
        this.$emit("getValue", this.valueId);
        this.defaultExpandedKey = [];
      },

      // 清除选中
      clearHandle() {
        this.valueTitle = "";
        this.valueId = null;
        this.defaultExpandedKey = [];
        this.clearSelected();
        this.$emit("getValue", null);
      },
      /* 清空选中样式 */
      clearSelected() {
        let allNode = document.querySelectorAll("#tree-option .el-tree-node");
        allNode.forEach((element) => element.classList.remove("is-current"));
      },
    },
    watch: {
      value: {
        handler() {
          this.valueId = this.value;
          this.initHandle();
        },
        immediate: true,
        deep: true

      },
      select_tree(a, b) {},
      valueTitle(a, b) {},
    },
  };
</script>
<style lang='scss' scoped>
  .el-select {
    width: 100% !important;
  }

  .el-scrollbar .el-scrollbar__view .el-select-dropdown__item {
    height: auto;
    max-height: 274px;
    padding: 0;
    overflow: hidden;
    // overflow-y: auto;
  }

  .el-select-dropdown__item.selected {
    font-weight: normal;
  }

  ul li>.el-tree .el-tree-node__content {
    height: auto;
    // padding: 0 20px;
  }

  .el-tree-node__label {
    font-weight: normal;
  }

  .el-tree>.is-current .el-tree-node__label {
    color: #409eff;
    font-weight: 700;
  }

  .el-tree>.is-current .el-tree-node__children .el-tree-node__label {
    color: #606266;
    font-weight: normal;
  }

  .dialogbox {
    ::v-deep .el-select-dropdown__item.selected {
      font-weight: 500 !important;
    }

    ::v-deep .el-tree-node__label {
      font-weight: 500 !important;
    }
  }
</style>
