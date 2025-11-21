<template>
  <div>
    <el-dialog
      :title="form.title"
      :visible.sync="form.dialogFormVisible"
      width="45%"
      top="14vh"
      append-to-body
    >
      <MyTable
        class="mytable"
        :paginations="paginations"
        :btnlist="[]"
        :emptyImg="tableData.emptyImg"
        :tableData="tableData"
        @handleSizeChange="handleSizeChange"
        @handleindexChange="handleindexChange"
      >
      </MyTable>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { OutBound } from "@/api/request/swagger";
import minxin from "./index.js";
export default {
  mixins: [minxin],
  props: {
    form: Object,
  },
  methods: {
    handleSizeChange(val) {
      this.paginations.page = 1;
      this.paginations.limit = val;
      this.getTable();
    },
    handleindexChange(val) {
      this.paginations.page = val;
      this.getTable();
    },
    getTable() {
      this.get({
        url: OutBound.getJXBoxNoDetailList,
        isLoading: true,
        data: {
          Page: this.paginations.page,
          MaxResultCount: this.paginations.limit,
          PickId: this.form.row.id,
        },
      }).then((res) => {
        this.tableData.rows = res.result.items;
        this.paginations.total = res.result.totalCount;
        this.tableData.emptyImg = true;
      });
    },
    resetForm() {
      this.form.dialogFormVisible = false;
    },
  },
};
</script>
<style lang="scss">
.mytable .btnbox {
  padding: 0;
}
</style>
<style lang="scss" scoped>
</style>
