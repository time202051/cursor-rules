<template>
  <div class="table_list_fix">
    <!-- 扩展性内容 -->
    <slot name="content_context"></slot>
    <div class="tablebox">
      <el-table
        id="parentbox"
        border
        empty-text="暂无数据"
        :ref="tableRef"
        :data="tableDatas.tableData"
        @row-click="rowClick"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        @expand-change="expandSelect"
        :row-key="getRowKeys"
        :expand-row-keys="expands"
        class="nestedtable"
        :height="tableHeight"
        min-height="500"
        :cell-style="styleHeader"
        :default-sort="tableDatas.sort"
      >
        <el-table-column
          width="60"
          align="center"
          type="index"
          v-if="tableDatas.options.index"
          :index="computeTableIndex"
          :label="tableDatas.options.labelIndex"
        />
        <el-table-column
          :min-width="200"
          v-for="item in tableDatas.tableHader"
          :key="item.selection"
          :type="item.type"
          :label="item.label"
          :width="item.width"
          :fixed="item.fixed"
          :prop="item.prop"
          :show-overflow-tooltip="true"
        >
          <template v-if="item.type === 'expand'" v-slot="poprs">
            <el-table
              empty-text="暂无数据"
              id="childbox"
              ref="multipleTable"
              border
              :data="tableDatas.childrenData"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="SelectionChange"
              max-height="305"
              :cell-style="styleFun"
              :header-cell-style="{ background: '#e7f6f8', color: '#ffffff' }"
              :row-class-name="tableRowClassName"
            >
              <el-table-column
                v-if="
                  (tableDatas.childrenList &&
                    tableDatas.childrenList.selection) ||
                  false
                "
                type="selection"
                align="center"
                :selectable="childrenSelectable"
                fixed
              ></el-table-column>
              <el-table-column
                :min-width="200"
                v-for="items in tableDatas.childrenHeader"
                :align="items.center"
                :key="items.prop"
                :type="items.type"
                :width="items.width"
                :label="items.label"
                :prop="items.prop"
                :fixed="items.fixed"
                :show-overflow-tooltip="true"
              >
                <template slot-scope="row">
                  <div v-if="items.flage == 'SN'">
                    <slot name="snSlot" :data="row.row"></slot>
                  </div>
                    <div v-if="items.flage == 'qtCount'">
                    <slot name="qtCount" :data="row.row"></slot>
                  </div>
                      <div v-if="items.flage == 'realQty'">
                    <slot name="realQty" :data="row.row"></slot>
                  </div>
                  <div v-if="items.flage == 'productVoucher'">
                    <slot name="productVoucherSlot" :data="row.row"></slot>
                  </div>
                  <div v-if="items.flage == 'billDetail'">
                    <slot name="billDetail" :data="row.row"></slot>
                  </div>
                  <div class="cell el-tooltip cellpadding" v-if="!items.flage">
                    {{ row.row[items.prop] }}
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <!-- 子组件分页 -->
            <div id="tableOne" style="margin: 10px 0px 0px 15px">
              <pagination2
                :curr_page="c_curr_page"
                :total="c_total"
                :page_size="c_page_size"
                :pageSizes="pageSizechild"
                @change="chilpageChange"
              ></pagination2>
            </div>
          </template>
        
          <template v-else-if="item.flage" slot-scope="scope">
            <template>
            
              <slot :name="item.prop" :scope="scope.row"></slot>
            </template>
            <!-- <span> {{ scope.row[item.prop] }}v-if="item.prop=='takeQtys'"</span> -->
          </template>
        
        </el-table-column>

        <div slot="empty" class="empty">
          <img src="@/assets/logo/nodata.jpg" v-if="emptyImg" />
        </div>
      </el-table>
    </div>
    <!--  父组件分页    -->
    <div id="tableOne" class="fathertable" style="margin: 10px 0px 0px 15px">
      <pagination
        ref="tableA"
        :curr_page="curr_page"
        :total="total"
        :page_size="page_size"
        :pageSizes="pageSizes"
        @change="fatherpagechange"
        :positionsflage="tableDatas.positionsflage"
      ></pagination>
    </div>
  </div>
</template>

<script>
import pagination from "@/components/Pagination/index";
import pagination2 from "@/components/Pagination/index";

export default {
  name: "fAndSTable",
  props: {
    tableDatas: Object,
    exportBut: {
      type: Array,
      default: [],
    },
    emptyImg: {
      //显示复选框，
      type: Boolean,
      default: false,
    },
  },
  model: {
    prop: "treeTableData",
  },
  data() {
    return {
      flag: false,
      curr_page: 1,
      total: 0,
      page_size: 10,

      c_curr_page: 1,
      c_total: 0,
      c_page_size: 5,

      pageSizes: [20, 30,  50, 100],
      pageSizechild: [5, 10, 15, 30, 100],

      multipleSelection: [],
      multipleSelectiontableTwo: [],
      chilData: {},
      //存储chekebox方法的数据
      publicMethod: [],
      // 获取row的key值
      getRowKeys(row) {
        return row.flage;
      },
      // 要展开的行，数值的元素是row的key值
      expands: [],
      rowexpand: false,
      screenWidth: 0,
      tableHeight:
        document.documentElement.clientHeight - this.tableDatas.height || 485,
      pagetionShow: this.tableDatas.pagetionShow || true,
      tableRef: this.tableDatas.tableRef || "tableRef", //ref
    };
  },
  watch: {
    tableDatas(newV, oldV) {},
    expands: {
      deep: true,
      handler: function (newV, oldV) {},
    },
    "tableDatas.rowClick": {
      deep: true,
      handler: function (newV, oldV) {
        if (newV == true) {
          this.expands = [];
        }
      },
    },
    "tableDatas.positionsflage": {
      deep: true,
      handler: function (newV, oldV) {},
    },
    "tableDatas.count": {
      deep: true,
      handler: function (newV, oldV) {
        this.total = newV;
      },
    },
    "tableDatas.c_count": {
      deep: true,
      handler: function (newV, oldV) {
        this.c_total = newV;
      },
    },

    multipleSelection(newV, oldV) {
      this.multipleSelection = newV;
    },
  },
  mounted() {
    var that = this;
    window.addEventListener("resize", function () {
      that.screenWidth = document.body.offsetHeight;
    });
    this.$nextTick(() => {
      this.tableHeight =
        document.documentElement.clientHeight - this.tableDatas.height;
      this.$refs[this.tableRef].doLayout();
    });
  },
  methods: {
    computeTableIndex(index) {
      return (this.curr_page - 1) * this.page_size + index + 1;
    },
    tableRowClassName({ row, rowIndex }) {
      if (row.dEL) return "error-row";
      return "";
    },
    styleHeader(row) {
      if (row.row.isRed) {
        return "color:red;";
      }
    },
    styleFun(row) {
      if (row.row.actualQty !== row.row.deliervyQty && row.row.actualQty != 0) {
        return "color:red;";
      }
    },
    //子分页
    chilpageChange(dataPage) {
      let childTebleDate = {
        curPage: dataPage.curPage,
        pageSize: dataPage.pageSize,
        data: this.chilData,
        flag: "chilChange",
      };
      this.$emit("childChange", childTebleDate);
    },
    //父分页
    fatherpagechange(dataPage) {
      this.curr_page = dataPage.curPage;
      this.page_size = dataPage.pageSize;
      this.$refs.tableA.curPage = dataPage.curPage;
      this.$refs.tableA.pageSize = dataPage.pageSize;
      this.$emit("tableChange", dataPage.curPage, dataPage.pageSize);
    },
    //行点击事件
    rowClick(row, column, event) {
      //点击行展开与关闭
      // this.$refs.table.toggleRowExpansion(row);
    },
    //点击父chekebox 得到当前chekebox的值zzz
    handleSelectionChange(val) {
      // this.treeTableData.multipleSelection = val;
      this.$emit("handleSelectionChange", val);
    },
    //点击自己chekebox 得到当前chekebox的值zzz，返回true 显示checkbox
    childrenSelectable(row, index) {
      // this.treeTableData.multipleSelection = val;
      if (row.productVoucherTest && row.productVoucher) {
        return true;
      } else {
        return false;
      }
      this.$emit("childrenSelectable", row);
    },
    //点击子chekebox 得到当前chekebox的值
    SelectionChange(val) {
      this.$emit("SelectionChange", val);
      // this.treeTableData.multipleSelectiontableTwo = val;
    },
    //当用户对某一行展开或者关闭的时候会触发该事件（展开行时，回调的第二个参数为 expandedRows；树形表格时第二参数为 expanded）
    expandSelect(row, expandedRows) {
      //传递给父级数据
      this.chilData = row;
      var that = this;
      if (!row.expand) {
        //分页需要的标识
        let chilDataChenge = {
          curPage: that.c_curr_page,
          pageSize: that.c_page_size,
          data: row,
          expands: that.expands,
        };

        that.expands = [];
        expandedRows.forEach((item) => {
          item.expand = false;
        });
        row.expand = true;
        that.expands.push(row.flage);
        chilDataChenge.expands = that.expands;
        this.rowexpand = row.expand;
        //展开
        that.$emit("childExpenChange", chilDataChenge);
      } else {
        //关闭
        that.expands = [];
        row.expand = false;
        this.rowexpand = false;
        that.multipleSelectiontableTwo = []; //清空子级
      }
    },
  },
  components: {
    pagination,
    pagination2,
  },
};
</script>
<style lang="scss" scoped>
.table_list_fix {
  overflow: hidden;
  border-top: 1px solid #ebeef5;
  ::v-deep.el-table {
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
    ::v-deepa {
      color: #fff;
      text-decoration: none;
      display: inline-block;
      margin: 0px 5px;
      // width: 5.5%;
      ::v-deep.el-button {
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
}
::v-deep.el-table__body tr.current-row > td {
  background-color: rgb(24, 144, 255) !important;
  color: #fff;
}
::v-deep.el-table__expanded-cell {
  padding: 20px 55px !important;
}
.cellpadding {
  padding-left: 0px !important;
  padding-right: 0px !important;
}
</style>