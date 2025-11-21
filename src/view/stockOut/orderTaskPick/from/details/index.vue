<template>
  <div>
    <el-dialog
      :title="form.title"
      top="5vh"
      width="90%"
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
        @selectTab="onSelect"
        ref="mytable"
        class="my-table"
      >
        <template slot="zdBoxNo" slot-scope="scope">
          <div style="color: #1682e6; cursor: pointer" @click="setting(scope)">
            设置
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
      let self = this;
      // console.log(this.form.row)
      this.get({
        url: OutBound.orderpickboxpages+`/${this.form.row.pickId}`,
        // data: {
        //   StockOutId: this.form.row.id,
        //   Page: this.paginations.page,
        //   MaxResultCount: this.paginations.limit,
        // },
        isLoading: true,
      }).then((res) => {
        this.tableData.rows = res.result;
        // this.paginations.total = res.result.totalCount;
        // this.tableData.rows.forEach((row) => {
        //   if (row.isSample) {
        //     self.$nextTick(() => {
        //       self.$refs.mytable.$refs.tableRef.toggleRowSelection(row);
        //     });
        //   }
        // });
      });
    },
    onSelect(row, column) {
      const state = row.length && row.indexOf(column) !== -1;
      this.post({
        url: `${OutBound.setCKOrderDetailYJ}/${column.id}?isSample=${Boolean(
          state
        )}`,
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
/**针对出库订单详情，第二列是多选 */
// 隐藏多选框表头
::v-deep .el-table .disableSelection .cell .el-checkbox__inner {
  display: none;
}
// 替换后的表头内容（根据需求自行设置）
::v-deep .el-table .disableSelection .cell::before {
  content: "是否只出样件";
}
::v-deep .el-table-column--selection .cell{
  padding:0 10px;
}
</style>
