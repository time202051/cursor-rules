<template>
  <div>
    <el-dialog
      :title="form.title"
      top="10vh"
      width="45%"
      :visible.sync="form.dialogFormVisible"
    >
      <MyTable
        :paginations="paginations"
        :btnlist="[]"
        :emptyImg="tableData.emptyImg"
        :tableData="tableData"
        @handleSizeChange="handleSizeChange"
        @handleindexChange="handleindexChange"
      >
      </MyTable>
      <div slot="footer" class="dialog-footer">
        <el-button @click="form.dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import index from "./index";
import { Inventory } from "@/api/request/swagger";
export default {
  mixins: [index],
  props: {
    form: Object,
  },
  data() {
    return {};
  },
  methods: {
    getTable() {
      this.get({
        url: Inventory.getInventoryOrderDetailBoxNos,
        data: {
          ILTId: this.form.row.ILTId,
          ILTDetailId: this.form.row.id,
          Page: this.paginations.page,
          MaxResultCount: this.paginations.limit,
        },
        isLoading: true,
      }).then((res) => {
        this.tableData.rows = res.result.items;
        this.paginations.total = res.result.totalCount;
        this.tableData.emptyImg = true;
      });
    },
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
<style lang="scss" scoped>
::v-deep .el-dialog__body {
  padding: 10px !important;
}
::v-deep .el-tabs--border-card > .el-tabs__content {
  padding: 0px 0px 0px 0px !important;
}
.el-dialog__header {
  background-color: #4a77ac;
  padding: 10px;
  // padding-bottom: none;
  .el-dialog__title,
  .el-dialog__headerbtn i {
    color: white;
  }
}
.el-select,
.el-input-number {
  width: 100% !important;
}
.activeWidth {
  width: 50% !important;
}
</style>
