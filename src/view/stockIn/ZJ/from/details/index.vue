<template>
  <div>
    <el-dialog
      :title="form.title"
      top="3vh"
      width="85%"
      :visible.sync="form.outerVisible"
      class="dialog"
    >
      <FormSearch
        :form-search-data="ZJOrder.formSearchData"
        @handleSearch="handleSearch"
        @handleReset="handleReset"
      />
      <MyTable
        :paginations="ZJOrder.paginations"
        :btnlist="btnlist"
        :emptyImg="ZJOrder.tableData.emptyImg"
        :tableData="ZJOrder.tableData"
        :multipleSelection="ZJOrder.multipleSelection"
        @SelectionChange="SelectionChange"
        @handleSizeChange="handleSizeChange"
        @handleindexChange="handleindexChange"
      >
      </MyTable>
      <div slot="footer" class="dialog-footer">
        <el-button @click="form.outerVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <dialogTemplate
      :form="ZJOrder.form"
      @newRequest="submitResult"
    ></dialogTemplate>
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
      btnlist: [
        {
          title: "导出",
          method: this.export,
        },
        {
          title: "提交结果",
          method: this.sumbit,
        },
      ],
    };
  },
  methods: {
    getTable() {
      this.get({
        url: InBound.getZJOrderDetailList,
        data: Object.assign(this.ZJOrder.formSearchData.value, {
          id: this.form.row.id,
          Page: this.ZJOrder.paginations.page,
          MaxResultCount: this.ZJOrder.paginations.limit,
        }),
        isLoading: true,
      })
        .then((res) => {
          this.ZJOrder.tableData.rows = res.result.items;
          this.ZJOrder.paginations.total = res.result.totalCount;
        })
        .catch(() => {
          this.ZJOrder.tableData.rows = [];
          this.ZJOrder.paginations.total = 0;
        });
    },
    handleSearch(from) {
      var self = this;
      self.ZJOrder.formSearchData.value = { ...from };
      self.ZJOrder.paginations.page = 1;
      this.getTable();
    },
    handleReset() {},
    SelectionChange(row) {
      this.ZJOrder.multipleSelection = row;
    },
    handleSizeChange(val) {
      this.ZJOrder.paginations.page = 1;
      this.ZJOrder.paginations.limit = val;
      this.getTable();
    },
    handleindexChange(val) {
      this.ZJOrder.paginations.page = val;
      this.getTable();
    },
    sumbit() {
      let data = this.ZJOrder.multipleSelection;
      if (data.length == 0) return this.$message.info("请至少选择一条数据");
      if (
        data.filter((item) => {
          return item.qualityCheckResult != 0;
        }).length
      ) {
        return this.$message.warning("只能提交质检结果是待检的单据");
      }
      this.ZJOrder.form.dialogFormVisible = true;
      this.ZJOrder.form.value = {
        qualityCheckResult: 1,
      };
    },
    submitResult(value) {
      let arr = this.ZJOrder.multipleSelection.map((item) => {
        return {
          id: item.id,
          qualityCheckResult: value.qualityCheckResult,
        };
      });
      this.post({
        url: InBound.submitZJOrderDetailResult,
        data: arr,
        isLoading: true,
      }).then((res) => {
        this.getTable();
        this.ZJOrder.form.dialogFormVisible = false;
        this.$message({
          type: "success",
          message: "操作成功!",
        });
      });
    },
    export() {
      this.post({
        url: InBound.exportZJOrderDetail,
        isLoading: true,
        responseType: "blob",
        data: Object.assign(this.ZJOrder.formSearchData.value, {
          Page: this.ZJOrder.paginations.page,
          MaxResultCount: this.ZJOrder.paginations.limit,
          id: this.form.row.id,
        }),
      }).then((res) => {
        this.fnexsl(res); //fnexsl封装的导出方法
      });
    },
  },
};
</script>
<style lang="scss" scoped>
// .dialog {
//   ::v-deep .el-dialog__body {
//     padding: 10px 20px 0;
//   }
// }
</style>
