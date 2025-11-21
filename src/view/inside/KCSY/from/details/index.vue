<template>
  <div>
    <el-dialog
      title="库存损益详情"
      top="5vh"
      width="90%"
      :visible.sync="form.outerVisible"
    >
      <MyTable
        :paginations="BCorder.paginations"
        :btnlist="[]"
        :emptyImg="BCorder.tableData.emptyImg"
        :tableData="BCorder.tableData"
        :multipleSelection="BCorder.multipleSelection"
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
import { Stock } from "@/api/request/swagger";
export default {
  mixins: [index],
  props: {
    form: Object,
  },
  computed: {},
  data() {
    return {
      innerVisible: false,
      multipleSelection: [],
    };
  },
  methods: {
    getTable() {
      this.get({
        url: Stock.stockLossDetailPages,
        data: {
          stockchangeid: this.form.row.id,
          Page: this.BCorder.paginations.page,
          MaxResultCount: this.BCorder.paginations.limit,
        },
        isLoading: true,
      }).then((res) => {
        this.BCorder.tableData.rows = res.result.items;
        this.BCorder.paginations.total = res.result.totalCount;
      }).catch(()=>{
        this.BCorder.tableData.rows = [];
        this.BCorder.paginations.total = 0;
      });
    },
    SelectionChange() {},
    handleSizeChange(val) {
      this.BCorder.paginations.page = 1;
      this.BCorder.paginations.limit = val;
      this.getTable();
    },
    handleindexChange(val) {
      this.BCorder.paginations.page = val;
      this.getTable();
    },
    submitForm() {},
    resetForm(formName) {
      if (this.form.requestData.flage == "autoArrange") {
        return this.$emit("resetForm");
      }
      this.$refs[formName].resetFields();
      this.form.dialogFormVisible = false;
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
