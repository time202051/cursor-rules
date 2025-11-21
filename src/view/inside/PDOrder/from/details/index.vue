<template>
  <div>
    <el-dialog
      :title="form.title"
      top="5vh"
      width="90%"
      :visible.sync="form.dialogFormVisible"
    >
      <FormSearch
        :form-search-data="formSearchData"
        @handleSearch="handleSearch"
        @handleReset="handleReset"
      />
      <MyTable
        :paginations="paginations"
        :btnlist="[]"
        :emptyImg="tableData.emptyImg"
        :tableData="tableData"
        @handleSizeChange="handleSizeChange"
        @handleindexChange="handleindexChange"
      >
        <template slot="boxNos" slot-scope="scope">
          <div
            style="color: #d9001b; cursor: pointer"
            @click="boxNoDetail(scope)"
          >
            详情
          </div>
        </template>
      </MyTable>
      <div slot="footer" class="dialog-footer">
        <el-button @click="form.dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <!--箱号详情-->
    <boxNoTemplate :form="boxNoForm" ref="boxNoTemplate"></boxNoTemplate>
  </div>
</template>
<script>
import index from "./index";
import boxNoTemplate from "../boxNo/index.vue";
import { Inventory } from "@/api/request/swagger";
export default {
  mixins: [index],
  props: {
    form: Object,
  },
  components: {
    boxNoTemplate,
  },
  data() {
    return {};
  },
  methods: {
    //箱号详情
    boxNoDetail(params) {
      this.boxNoForm.row = params.row;
      this.boxNoForm.row.ILTId = this.form.row.id;
      setTimeout(() => {
        this.$refs.boxNoTemplate.getTable();
        this.boxNoForm.dialogFormVisible = true;
      }, 10);
    },
    getTable() {
      this.get({
        url: Inventory.getInventoryOrderDetailList,
        data: Object.assign(this.formSearchData.value, {
          ILTId: this.form.row.id,
          Page: this.paginations.page,
          MaxResultCount: this.paginations.limit,
          BeginTime: this.formSearchData.value.timer?.[0],
          EndTime: this.formSearchData.value.timer?.[1],
        }),
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
    handleSearch(from) {
      var self = this;
      self.formSearchData.value = { ...from };
      self.paginations.page = 1;
      this.getTable();
    },
    handleReset() {},
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
