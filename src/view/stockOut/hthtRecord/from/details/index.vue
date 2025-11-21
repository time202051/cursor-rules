<template>
  <div>
    <el-dialog
      :title="form.title"
      top="5vh"
      width="90%"
      class="detail_dialog"
      :visible.sync="form.outerVisible"
    >
      <MyTable
        :paginations="HTHTrecord.paginations"
        :btnlist="[]"
        :emptyImg="HTHTrecord.tableData.emptyImg"
        :tableData="HTHTrecord.tableData"
        :multipleSelection="HTHTrecord.multipleSelection"
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
import { OutBound } from "@/api/request/swagger";

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
        url: OutBound.getHTHTDetailList,
        data: {
          ConsolidineRecordId: this.form.row.id,
          Page: this.HTHTrecord.paginations.page,
          MaxResultCount: this.HTHTrecord.paginations.limit,
        },
        isLoading: true,
      }).then((res) => {
        this.HTHTrecord.tableData.rows = res.result.items;
        this.HTHTrecord.paginations.total = res.result.totalCount;
      });
    },
    SelectionChange() {},
    handleSizeChange(val) {
      this.HTHTrecord.paginations.page = 1;
      this.HTHTrecord.paginations.limit = val;
      this.getTable();
    },
    handleindexChange(val) {
      this.HTHTrecord.paginations.page = val;
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
::v-deep .el-dialog__body {
  // padding: 10px !important;
}
::v-deep .el-tabs--border-card > .el-tabs__content {
  padding: 0px 0px 0px 0px !important;
}
.el-dialog__header {
  background-color: #4a77ac;
  // padding: 10px;
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
