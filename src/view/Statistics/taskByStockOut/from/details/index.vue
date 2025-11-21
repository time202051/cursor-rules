<template>
  <div>
    <el-dialog
      title="详情"
      top="5vh"
      width="90%"
      class="detail_dialog"
      :visible.sync="innerVisible"
    >
      <MyTable
        :paginations="TSOdatails.paginations"
        :btnlist="[]"
        :emptyImg="TSOdatails.tableData.emptyImg"
        :tableData="TSOdatails.tableData"
        :multipleSelection="TSOdatails.multipleSelection"
        @SelectionChange="SelectionChange"
        @handleSizeChange="handleSizeChange"
        @handleindexChange="handleindexChange"
      >
      </MyTable>
      <div slot="footer" class="dialog-footer">
        <el-button @click="innerVisible = false">取  消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import index from "./index";
import { Statistics } from "@/api/request/swagger";

export default {
  mixins: [index],
 
  computed: {},
  data() {
    return {
    };
  },
  methods: {
    getTable(v) {
      this.get({
        url: Statistics.stockOutDetailStatistics,
        data: {
          StartTime: v.startTime,
          EndTime: v.endTime,
        },
        isLoading: true,
      }).then((res) => {
        this.TSOdatails.tableData.rows = res.result;
      });
    },
    SelectionChange() {},
    handleSizeChange(val) {
      this.TSOdatails.paginations.page = 1;
      this.TSOdatails.paginations.limit = val;
      this.getTable();
    },
    handleindexChange(val) {
      this.TSOdatails.paginations.page = val;
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
