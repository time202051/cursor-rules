<template>
  <div>
    <el-dialog
      title="收货订单详情"
      top="5vh"
      width="90%"
      :visible.sync="form.outerVisible"
    >
      <FormSearch
        :form-search-data="SHOrder.formSearchData"
        @handleSearch="handleSearch"
        @handleReset="handleReset"
      />
      <MyTable
        :paginations="SHOrder.paginations"
        :btnlist="btnlist"
        :emptyImg="SHOrder.tableData.emptyImg"
        :tableData="SHOrder.tableData"
        :multipleSelection="SHOrder.multipleSelection"
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
import { InBound } from "@/api/request/swagger";

export default {
  mixins: [index],
  props: {
    form: Object,
  },
  computed: {},
  data() {
    return {
      multipleSelection: [],
      btnlist: [
        {
          title: "导出",
          method: this.export,
        },
      ],
    };
  },
  methods: {
    getTable() {
      this.get({
        url: InBound.getSHOrderDetailList,
        data: Object.assign(this.SHOrder.formSearchData.value, {
          StockInId: this.form.row.id,
          Page: this.SHOrder.paginations.page,
          MaxResultCount: this.SHOrder.paginations.limit,
        }),
        isLoading: true,
      })
        .then((res) => {
          this.SHOrder.tableData.rows = res.result.items;
          this.SHOrder.paginations.total = res.result.totalCount;
        })
        .catch(() => {
          this.SHOrder.tableData.rows = [];
          this.SHOrder.paginations.total = 0;
        });
    },
    handleSearch(from) {
      var self = this;
      self.SHOrder.formSearchData.value = { ...from };
      self.SHOrder.paginations.page = 1;
      this.getTable();
    },
    handleReset() {},
    SelectionChange() {},
    handleSizeChange(val) {
      this.SHOrder.paginations.page = 1;
      this.SHOrder.paginations.limit = val;
      this.getTable();
    },
    handleindexChange(val) {
      this.SHOrder.paginations.page = val;
      this.getTable();
    },
    export() {
      this.post({
        url: InBound.exportSHOrderDetail,
        isLoading: true,
        responseType: "blob",
        data: Object.assign(this.SHOrder.formSearchData.value, {
          StockInId: this.form.row.id,
          Page: this.SHOrder.paginations.page,
          MaxResultCount: this.SHOrder.paginations.limit,
          // Page: this.paginations.page,
          // MaxResultCount: this.paginations.limit,
        }),
      }).then((res) => {
        this.fnexsl(res); //fnexsl封装的导出方法
      });
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
