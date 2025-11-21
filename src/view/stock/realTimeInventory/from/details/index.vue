<template>
  <div>
    <el-dialog
      title="详情"
      top="5vh"
      width="80%"
      class="detail_dialog"
      :visible.sync="form.outerVisible"
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
      >
      </MyTable>
      <div slot="footer" class="dialog-footer">
        <el-button @click="form.outerVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import index from "./index";
import { Reserve } from "@/api/request/swagger";
export default {
  mixins: [index],
  props: {
    form: Object,
  },
  methods: {
    getTable() {
      this.get({
        url: Reserve.getZXMsgList,
        data: {
          StockId: this.form.row.id,
          Page: this.paginations.page,
          MaxResultCount: this.paginations.limit,
        },
        isLoading: true,
      })
        .then((res) => {
          this.tableData.rows = res.result.items;
          this.paginations.total = res.result.totalCount;
        })
        .catch(() => {
          this.tableData.rows = [];
          this.paginations.total = 0;
        });
    },
    handleSearch(from) {
      var self = this;
      self.formSearchData.value = { ...from };
      self.paginations.page = 1;
      this.getTable();
    },
    handleReset() {},
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
<style lang="scss" scoped>
::v-deep .detail_dialog {
  // position: relative;
  .el-dialog__body {
    padding-top:0px;
  }
  .btnbox {
    padding:0px;
  }
}
// ::v-deep .btnbox {
//   display: none;
// }
::v-deep .tablebox {
  margin-top: 0;
  padding: 0;
}
::v-deep .el-dialog__body {
  padding: 25px 25px 10px;
}
::v-deep .el-dialog__footer {
  padding: 0 25px 20px;
}
</style>
