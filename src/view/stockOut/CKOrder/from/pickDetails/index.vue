<template>
  <div>
    <el-dialog
      :title="form.title"
      top="5vh"
      width="90%"
      class="detail_dialog"
      :visible.sync="form.dialogFormVisible"
    >
      <MyTable
        :paginations="paginations"
        :btnlist="[]"
        :emptyImg="tableData.emptyImg"
        :tableData="tableData"
        :multipleSelection="multipleSelection"
        @SelectionChange="SelectionChange"
        @handleSizeChange="handleSizeChange"
        @handleindexChange="handleindexChange"

        ref="mytable"
        class="my-table"
      >
      <!-- @selectTab="onSelect"  2025年4月09日14点22分08秒 表格行勾选，与列里的单选框勾选冲突-->
      <template slot="isSample" slot-scope="scope">
          <div style="color: #1682e6; cursor: pointer" >
            <el-checkbox v-model="scope.row.isSample" @change="e=>isSampleFN(e,scope)"></el-checkbox>
          </div>
        </template>
        <template slot="lack" slot-scope="scope">
          <span>{{ scope.row.lackStatusDesc }} </span>
          <el-tooltip
            effect="dark"
            :content="scope.row.remark"
            placement="top"
            v-if="scope.row.lackStatus"
          >
            <i
              class="el-icon-warning-outline"
              style="
                font-size: 16px;
                margin-left: 1px;
                position: relative;
                top: 1px;
              "
            ></i>
          </el-tooltip>
        </template>
      </MyTable>
      <div slot="footer" class="dialog-footer">
        <el-button @click="form.dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <boxNoTemplate ref="boxNoTemplate" :form="boxNoForm"></boxNoTemplate>
  </div>
</template>
<script>
import index from "./index";
import { OutBound } from "@/api/request/swagger";
import boxNoTemplate from "../box/index.vue";
export default {
  components: {
    boxNoTemplate,
  },
  mixins: [index],
  props: {
    form: Object,
  },
  computed: {},
  data() {
    return {};
  },
  methods: {
    setting(params) {
      this.boxNoForm.row = params.row;
      this.boxNoForm.dialogFormVisible = true;
      this.$refs.boxNoTemplate.canAssign.formSearchData.value = {
        Qty: undefined,
        BoxCode: null,
      };
      this.$refs.boxNoTemplate.getCanAssignTable();
      this.$refs.boxNoTemplate.getAlreadyAssignTable();
    },
    cellClass(row) {
      // 判断第几列
      if (row.columnIndex === 1) {
        return "disableSelection";
      }
    },
    getTable() {
      console.log(this.form.row);
      this.get({
        url: OutBound.orderpickpages,
        isLoading: true,
        data: {
          StockOutBillNo: this.form.row.billNo,
          Page: this.paginations.page,
          MaxResultCount: this.paginations.limit
        },
      }).then((res) => {
        this.tableData.rows = res.result.items;
        this.paginations.total = res.result.totalCount; //是否传了分页
        this.tableData.emptyImg = true;
      });
    },
    isSampleFN(e, row) {
      // 2025年4月09日14点22分08秒 表格行勾选，与列里的单选框勾选冲突,优化插槽复选框
      this.post({
        url: `${OutBound.setCKOrderDetailYJ}/${row.row.id}?isSample=${e}`,
        isLoading: true,
      }).then(() => {
        this.getTable();
        this.$message.success("操作成功");
      });
    },
    SelectionChange() {},
    handleSizeChange(val) {
      this.paginations.page = 1;
      this.paginations.limit = val;
      this.getTable();
    },
    handleindexChange(val) {
      this.paginations.page = val;
      this.getTable();
    },
  },
};
</script>
<style scoped lang="scss">
::v-deep .detail_dialog {
  // position: relative;
  .el-dialog__body {
    padding-top:0px;
  }
  .btnbox {
    padding: 0px;
    display: block !important;
  }
}
/**针对出库订单详情，第二列是多选 */
// 隐藏多选框表头
::v-deep .el-table .disableSelection .cell .el-checkbox__inner {
  display: none;
}
// 替换后的表头内容（根据需求自行设置）
// ::v-deep .el-table .disableSelection .cell::before {
//   content: "是否只出样件";
// }
::v-deep .el-table-column--selection .cell{
  padding:0 10px;
}
</style>
