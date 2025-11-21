<template>
  <div class="table_list_fix">
    <!-- 扩展性内容 -->
    <slot name="content_context" />
    <!-- table中间button eg:导出 @click="item.method" -->
    <div class="btnbox">
      <el-row :gutter="10" style="width: 100%">
        <el-col :span="getspan.W1">
          <div v-if="btnlist.length == 0" style="color: transparent">
            占位字
          </div>
          <el-form class="demo-form-inline">
            <el-form-item>
              <el-button
                v-for="(btn, index) in btnlist"
                :key="index"
                size="small"
                :type="btn.types ? btn.types : 'primary'"
                @click="btn.method"
              >
                <i v-if="btn.icon" :class="btn.icon" />
                {{ btn.title }}
              </el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="getspan.W2">
          <!-- 选择显示头部工具栏 -->
          <div style="display: flex; margin-top: 10px">
            <el-dropdown
              v-if="tableData.options.headTool"
              class="avatar-container right-menu-item hover-effect"
              trigger="click"
            >
              <div class="avatar-wrapper">
                <div class="layui-table-tool-self">
                  <i class="el-icon-s-operation" />
                </div>
              </div>
              <el-dropdown-menu slot="dropdown" style="padding: 5px">
                <el-checkbox-group v-model="checkedTableColumns">
                  <el-checkbox
                    v-for="column in checkedTableList"
                    :key="column.prop"
                    class="checkbox"
                    :label="column.prop"
                    >{{ column.label }}
                  </el-checkbox>
                </el-checkbox-group>
              </el-dropdown-menu>
            </el-dropdown>
            <div
              v-if="tableData.options.refreshBtn"
              class="avatar-container right-menu-item hover-effect el-dropdown"
              @click="refreshTable"
            >
              <div class="avatar-wrapper">
                <div class="layui-table-tool-self">
                  <i class="el-icon-refresh" />
                </div>
              </div>
            </div>
            <div
              v-if="tableData.options.downloadBtn"
              class="avatar-container right-menu-item hover-effect el-dropdown"
              @click="printTable"
            >
              <div class="avatar-wrapper">
                <div class="layui-table-tool-self">
                  <i class="el-icon-printer" />
                </div>
              </div>
            </div>
            <div
              v-if="tableData.options.entityName"
              class="avatar-container right-menu-item hover-effect el-dropdown"
              @click="viewEntity(tableData.options.entityName)"
            >
              <div class="avatar-wrapper">
                <div class="layui-table-tool-self">
                  <i class="el-icon-document" />
                </div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col v-if="tableData.twinPage" :span="getspan.W3">
          <!--          <el-radio-group  style="display: flex; margin-top: 10px"-->
          <!--                           v-model="twinPage"-->
          <!--                          size="mini"-->
          <!--                           @change="radioChange()" >-->
          <!--            <el-radio-->
          <!--              v-for="(item,index) in tableData.twinPageFrom.list"-->
          <!--              :key="'twinPage'+index"-->
          <!--              :label="item.value"-->
          <!--              border>{{ item.label }}-->
          <!--            </el-radio>-->
          <!--          </el-radio-group>-->
        </el-col>
      </el-row>
    </div>
    <!--  表格  -->
    <!-- @select="select" 2025年4月09日14点22分08秒 表格行勾选，与列里的单选框勾选冲突-->
    <div class="tablebox">
      <el-table
        :ref="tableRef"
        v-loading="tableData.loading"
        border
        v-bind="tableData.options"
        :data="tableData.rows"
        style="width: 100%"
        :height="tableHeight"
        :default-sort="tableData.sort"
        :max-height="600"
        v-on="tableEvents"
        @selection-change="SelectionChange"
        @select-all="selectAll"
        @row-click="rowClick"
         :row-style="handleRowStyle"
      >
        <template v-for="(item, index) in bindTableColumns">
          <el-table-column
            v-if="item.label == ''"
            :key="item.prop"
            :label="item.label"
            :fixed="item.fixed || false"
            :width="item.width"
            :prop="item.prop"
            :min-width="item.minWidth || '150px'"
            :show-overflow-tooltip="item.overHidden==undefined? true: false"
            :sortable="item.sortable || false"
            :type="item.type || 'normal'"
          >
            <template v-if="item.render" v-slot="scope">
              <!-- 使用函数式组件进行dom渲染 -->
              <render-dom :render="() => item.render(scope.row)" />
            </template>
            <template v-if="item.renderSlot" v-slot="scope">
              <slot :row="scope.row" :name="item.prop" />
            </template>
          </el-table-column>
        </template>
        <el-table-column
          v-if="tableData.options && tableData.options.index"
          width="60"
          align="center"
          type="index"
          :index="computeTableIndex"
          label="序号"
        />
        <!--  v-bind="options && options.props"-->
        <template v-for="(item, index) in bindTableColumns"  >
          <el-table-column
            v-if="item.label != ''"
            :key="item.prop"
            :label="item.label"
            :fixed="item.fixed || false"
            :width="item.width"
            :prop="item.prop"
            :min-width="item.minWidth || '150px'"
            :show-overflow-tooltip="item.overHidden==undefined? true: false"
            :sortable="item.sortable || false"
            :type="item.type || 'normal'"
          >
            <template v-if="item.render" v-slot="scope" >
              <!-- 使用函数式组件进行dom渲染 -->
              <render-dom :render="() => item.render(scope.row)" />
            </template>
            <template v-else-if="item.renderSlot" v-slot="scope">
              <slot :row="scope.row" :name="item.prop" />
            </template>
          </el-table-column>
        </template>
        <el-table-column
          v-if="tableData.operates && tableData.operates.length > 0"
          label="操作"
          align="center"
        >
          <template slot-scope="scope">
            <div class="operate-group">
              <template v-for="(btn, key) in tableData.operates">
                <span
                  v-if="
                    !btn.isShow ||
                    (btn.isShow && btn.isShow(scope.row, scope.$index))
                  "
                  :key="key"
                >
                  <el-button
                    :style="btn.style || ''"
                    :size="btn.size || 'small'"
                    :type="btn.type || `text`"
                    :icon="btn.icon"
                    :plain="btn.plain"
                    :disabled="
                      btn.disabled && btn.disabled(scope.row, scope.$index)
                    "
                    @click.native.prevent="btn.method(scope.row, scope.$index)"
                    >{{ btn.label
                    }}{{
                      tableData.operates.length >= 2 ? "&nbsp;&nbsp;" : ""
                    }}</el-button
                  >
                </span>
              </template>
            </div>
          </template>
        </el-table-column>
        <div slot="empty" class="empty">
          <img
            v-if="tableData.rows.length == 0"
            src="@/assets/logo/nodata.jpg"
          />
        </div>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="pagebox">
      <el-row>
        <el-col :span="24">
          <el-pagination
            v-if="paginations.pagetionShow && paginations.total > 0"
            :current-page.sync="paginations.page"
            :page-sizes="paginations.page_sizes || pageSizes"
            :page-size="paginations.limit"
            layout="total, sizes, prev, pager, next, jumper,slot"
            :total="paginations.total"
            @size-change="handleSizeChange"
            @current-change="handleindexChange"
          >
            <div
              v-if="paginations.refresh"
              :key="1"
              class="avatar-container right-menu-item hover-effect el-dropdown"
              style="margin-left: 10px"
              @click="refreshTableBTN"
            >
              <div class="avatar-wrapper">
                <div class="layui-table-tool-self">
                  <i class="el-icon-refresh" />
                </div>
              </div>
            </div>
          </el-pagination>

          <!-- <div class="surepagination" @click="ArePagesure">
                <span>确定</span>
            </div>-->
        </el-col>
      </el-row>
    </div>
    <printTemplate
      v-show="false"
      class="printTemplate"
      :print-list-obj="printListObj"
    />
    <el-dialog
      title="实体变更记录"
      :visible.sync="dialogVisible"
      width="80%"
      :modal="false"
      style="z-index: 9999 !important"
      class="dialog_change_table"
      :before-close="handleClose"
    >
      <FormSearch
        :form-search-data="formSearchDataTemp"
        @handleSearch="handleSearchTemp"
        @handleReset="handleResetTemp"
      />
      <MyTable
        :paginations="paginationsTemp"
        :btnlist="btnTemp"
        :empty-img="tableDataTemp.emptyImg"
        :table-data="tableDataTemp"
        :multiple-selection="multipleSelectionTemp"
        @SelectionChange="SelectionChangeTemp"
        @handleSizeChange="handleSizeChangeTemp"
        @handleindexChange="handleindexChangeTemp"
      >
        <template slot="details" slot-scope="scope" >
          <!-- <div style="color: #1682e6; cursor: pointer" @click="detailsTemp(scope)">
          查看
        </div> -->
          <el-popover placement="top-start" trigger="click">
            <div class="entity_changeinfo20250408">
              <table>
                <tr>
                  <th>字段</th>
                  <th>原数据</th>
                  <th>新数据</th>
                </tr>
                <tr v-for="item in scope.row.changeInfo">
                  <!-- <td>{{ item }}</td>
                    <td></td>
                    <td></td> -->
                  <td>{{ item.fieldName }}</td>
                  <td>
                    {{ item.originalValue }}
                  </td>
                  <td>
                    {{ item.currentValue }}
                  </td>
                </tr>
              </table>
            </div>
            <div slot="reference" style="color: #1682e6">查看</div>
          </el-popover>

          <!-- <div style="color: #1682e6; cursor: pointer" >
          {{ scope.row.changeInfo.join("\n") }}
        </div> -->
        </template>
      </MyTable>
      <!-- <table>
        <tr>
          <th>修改时间</th>
          <th>修改内容</th>
        </tr>
        <template v-for="item in list">
          <tr>
            <td>{{ item.ChangeTime }}</td>
            <td>{{ item.ChangeInfo.join(" | ") }}</td>
          </tr>
        </template>
      </table>
      <el-pagination
        @current-change="handleSizeChangeentity"
        layout="prev, pager, next"
        :total="entitypages.total"
      >
      </el-pagination> -->
    </el-dialog>
  </div>
</template>
<script>
// import echarts from "echarts";
import printTemplate from "./printTable.vue";

import minxin from "./index.js";
export default {
  name: "MyTable",
  mixins: [minxin],
  components: {
    printTemplate,
    // 函数式组件注册
    renderDom: {
      functional: true,
      props: {
        render: Function,
      },
      render(createElement, context) {
      const renderFn = context.props.render();
      return renderFn(createElement);
    }
    },
  },
  model: {
    prop: "multipleSelection",
    event: "SelectionChange",
  },
  props: {
    rowStyle: {
      type: Function,
      default: () => ({})
    },
    printListObj: {
      type: Object,
      default: () => {
        return {
          title: "",
          tableHeader: "",
          tableData: "",
        };
      },
    }, // 打印参数
    btnlist: Array,
    outTable: {
      type: Object,
      default: () => {
        return {
          tableProp: {},
        };
      },
    },
    // exportBut: {
    //   type: Array,
    //   default: [],
    // },
    // 表格传的形式
    tableData: {
      type: Object,
      default: () => {
        return {
          loading: false,
          options: {
            selection: null, // 多选框
            index: null, // 序号
            headTool: true, // 开启头部工具栏
            refreshBtn: true, // 开启表格头部刷新按钮
            downloadBtn: true, // 开启表格头部下载按钮
          }, // 序号和复选框
          rows: [], // 表数据
          columns: [], // 表头
          operates: [], // 表格里面的操作按钮
          tableHeightDiff: 300,
        };
      },
    },
    tableDataShow: {
      type: Boolean,
      default: true,
    },
    displayDetail: {
      type: Boolean,
      default: true,
    },
    pageSizes: {
      type: Array,
      default: () => {
        return [20, 40, 60, 100, 200];
      },
    },
    paginations: {
      // 显示复选框，
      type: Object,
      default: () => {
        return {
          page: 1, // 当前位于那页面
          total: 0, // 总数
          limit: 20, // 一页显示多少条
          pagetionShow: true,
        };
      },
    },
    emptyImg: {
      // 显示复选框，
      type: Boolean,
      default: false,
    },
    tableEvents: Object,
  },
  data() {
    return {
      selectActive: [],
      entitypages: {
        total: 1000,
      },
      list: [
        {
          ChangeInfo: ["1>2", "2>1"],
          ChangeTime: "2025-02-14T07:38:08.189+00:00",
          ChangeType: "修改",
        },
        {
          ChangeInfo: ["1>2", "2>1"],
          ChangeTime: "2025-02-14T07:38:08.189+00:00",
          ChangeType: "修改",
        },
      ],

      tableRef: this.tableData.tableRef || "tableRef", // ref
      toggleRowFlage: this.tableData.toggleRowFlage || false, // 点击行高亮select标识
      screenWidth: 0,
      tableHeight:
        document.documentElement.clientHeight - this.tableData.tableHeightDiff,
      pagetionShow: this.paginations.pagetionShow || true,
      twinPage: 1,
    };
  },
  computed: {
    getspan() {
      let obj = {
        W1: 20,
        W2: 4,
      };
      if (this.tableData.twinPage) {
        obj = {
          W1: 14,
          W2: 3,
          W3: 7,
        };
      }
      return obj;
    },
    bindTableColumns() {
      return this.tableData.columns.filter((column) => column.show);
    },
    checkedTableList: {
      get() {
        // 返回选中的列名
        return this.tableData.columns.filter(
          (item) => item.type != "selection"
        );
      },
    },
    /* 这里使用了getter和setter，这样写的好处不用自己手动监听复选框的选中事件 */
    checkedTableColumns: {
      get() {
        // 返回选中的列名
        return this.bindTableColumns.map((column) => column.prop);
      },
      set(checked) {
        // 设置表格列的显示与隐藏
        console.log(this.tableData.columns, "this.tableData.columns");
        this.tableData.columns.forEach((column, index) => {
          // 如果选中，则设置列显示

          if (checked.includes(column.prop)) {
            column.show = true;
          } else {
            // 如果未选中，则设置列隐藏
            column.show = false;
          }
        });
      },
    },
  },
  watch: {
    $route(newRoute) {
      this.tableHeight =
        document.documentElement.clientHeight - this.tableData.tableHeightDiff;
    },
    immediate: true,
    "tableData.tableHeightDiff": {
      handler(newVal, OldVal) {
        this.tableHeight =
          document.documentElement.clientHeight -
          this.tableData.tableHeightDiff;
      },
      deep: true,
    },
    displayDetail: {
      handler(newVal, OldVal) {
        this.$nextTick(() => {
          this.$refs[this.tableRef].doLayout();
        });
      },
      deep: true,
    },
    screenWidth: function (val) {
      this.screenWidth =
        document.documentElement.clientHeight - this.tableData.tableHeightDiff;
      this.$refs[this.tableRef].doLayout();
    },
  },
  mounted() {
    // console.log(this.checkedTableList, 'checkedTableList')
    var that = this;
    window.addEventListener("resize", function () {
      that.screenWidth = document.body.offsetHeight;
    });
    this.$nextTick(() => {
      this.tableHeight =
        document.documentElement.clientHeight - this.tableData.tableHeightDiff;
      this.$refs[this.tableRef].doLayout();
    });
  },
  methods: {
    handleRowStyle({ row, rowIndex }) {
      return this.rowStyle(row, rowIndex);
    },
    radioChange() {
      this.$emit("radioChange", this.twinPage);
    },
    // 刷新表格
    refreshTable() {
      const view = this.$router.history.current;
      this.$store.dispatch("tagsView/delCachedView", view).then(() => {
        const { fullPath } = view;
        this.$nextTick(() => {
          this.$router.replace({
            path: "/redirect" + fullPath,
          });
        });
      });
      console.log("refreshTable");
      this.$emit("refreshTable");
    },
    printTable() {
      console.log("printTable");
      if (this.tableData.rows.length <= 0) return;
      this.printListObj.title = this.$router.history.current.name;
      this.printListObj.tableHeader = this.tableData.columns;
      this.printListObj.tableData = this.tableData.rows;
      console.log(this.printListObj);
      setTimeout(() => {
        $(".printTemplate").show();
        $(".printTemplate").jqprint();
        $(".printTemplate").hide();
      }, 50);
      this.$emit("printTable");
    },
    handleSizeChangeentity(v) {
      console.log(v);
    },

    selectAll(val) {
      this.$emit("selectAll", val);
    },
    select(val, row) {
      this.$emit("selectTab", val, row);
    },
    refreshTableBTN() {
      this.$emit("refreshTableBTN");
    },
    rowClick(row, column) {
      this.$emit("rowClick", row);
      // if (
      //   this.tableData.columns.every((item) => {
      //     return item.label !== "是否只出样件";
      //   })
      // ) {
      //   // 为true时 点击行高亮select
      //   this.$refs.tableRef.toggleRowSelection(row);
      // }
      this.$refs.tableRef.toggleRowSelection(row);
    },
    computeTableIndex(index) {
      return (this.paginations.page - 1) * this.paginations.limit + index + 1;
    },
    // 挑选的数据
    SelectionChange(val) {
      // console.log(val)
      this.selectActive = val;
      this.multipleSelection = val;
      this.$emit("SelectionChange", val);
    },
    // 分页选择
    handleSizeChange(val) {
      this.paginations.limit = val;
      this.$emit("handleSizeChange", val);
    },
    handleindexChange(val) {
      this.paginations.page = val;
      this.$emit("handleindexChange", val);
    },
  },
};
</script>
<style lang="scss" scoped>
.table_list_fix {
  overflow: hidden;

  ::v-deep .el-table {
    td {
      padding: 0px;

      div {
        line-height: 28px;
        font-size: 12px;
      }
    }

    th {
      padding: 0px;
      background: #f5f7fa;
      // background-color: #F2F2F2;
      div {
        line-height: 28px;
        font-weight: 400;
        // color: #606266;
        color: #333;
        font-size: 12px;
      }
    }
  }

  .btn-operates {
    margin: 10px 0px 10px 15px;

    ::v-deep a {
      color: #fff;
      text-decoration: none;
      display: inline-block;
      margin: 0px 5px;
      // width: 5.5%;
      ::v-deep .el-button {
        width: 100%;
        padding: 7px;
        font-size: 13px;
      }
    }
  }
}

.table-header {
  padding-top: 10px;

  .table-header_button {
    text-align: right;
    float: right;
    margin-bottom: 12px;
    line-height: 40px;
  }
}

.newjump {
  text-decoration: none;
  color: dodgerblue;
}

.pagination {
  text-align: center;
}

.pagebox {
  margin: 10px 0px 0px 15px;
}

.tablebox {
  margin-top: 10px;
  padding: 0px 10px 10px 10px;
}

::v-deep .el-pager {
  // li {
  //   margin: 0px 2px;
  //   // padding: 0px 5px;
  //   font-size: 12px;
  //   /* min-width: 35.5px; */
  //   // min-width: 30px;
  //   //    height: 24px;
  //   // line-height: 24px;
  // }
  // /deep/ li.active {
  //   background: #e8f4ff;
  //   border: 1px solid #1890ff;
  //   color: #1890ff;
  // }
  // .number {
  //   border: 1px solid #e9ebec;
  //   color: #666;
  //   //  border-radius: 5px;
  // }
}

::v-deep .el-table__body tr.current-row > td {
  background-color: rgb(24, 144, 255) !important;
  color: #fff;
}

::v-deep .redrow {
  background: #fde6e6 !important;
}

.cellpadding {
  // padding-left: 0px;
  padding-right: 0px;
}

.btnbox {
  width: 100%;
  display: flex;

  .upload-demo {
    display: -webkit-inline-box;
    margin-left: 10px;
  }

  .el-form-item {
    margin-bottom: 0px;
  }

  padding: 10px 10px 0px 10px;
}

.layui-table-tool-self {
  display: block;
  width: 26px;
  height: 26px;
  padding: 5px;
  line-height: 16px;
  margin-right: 10px;
  text-align: center;
  color: #333;
  border: 1px solid #ccc;
  cursor: pointer;
}

.checkbox {
  display: block;
}
.entity_changeinfo20250408 {
  table {
    border-collapse: collapse;
    border: 1px solid #333;
    tr {
      th {
        border: 1px solid #333;
        padding: 5px;
      }
      td {
        border: 1px solid #333;
        padding: 5px;
      }
    }
  }
}
</style>
<style lang="scss">
.dialog_change_table {
  .el-dialog {
    margin-top: 30px !important;
  }
}
</style>
