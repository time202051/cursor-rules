<template>
  <div>
    <FormSearch
      :form-search-data="formSearchData"
      @handleSearch="handleSearch"
      @handleReset="handleReset"
    />
    <MyTable
      :paginations="paginations"
      :btnlist="this.hasBtn(this)"
      :empty-img="tableData.emptyImg"
      :table-data="tableData"
      :multiple-selection="multipleSelection"
      @SelectionChange="SelectionChange"
      @handleSizeChange="handleSizeChange"
      @handleindexChange="handleindexChange"
    >
    </MyTable>
    <createTemplate ref="createTemplate" :form="createForm" />
  </div>
</template>
<script>
import { Stock, Inventory } from "@/api/request/swagger";
import minxin from "./index.js";
import createTemplate from "./from/create/index.vue";
export default {
  name:'PDPlanOrderManagement',

  components: { createTemplate },
  mixins: [minxin],
  data() {
    return {
      multipleSelection: [],
    };
  },
  mounted() {
    this.getTable();
  },
  methods: {
    getTable() {
      const timer = this.formSearchData.value.timer;
      this.formSearchData.value.BeginTime = timer?.[0];
      this.formSearchData.value.EndTime = timer?.[1];
      this.get({
        url: Inventory.getInventoryPlanOrderList,
        isLoading: true,
        data: Object.assign(this.formSearchData.value, {
          Page: this.paginations.page,
          MaxResultCount: this.paginations.limit,
        }),
      }).then((res) => {
        this.tableData.rows = res.result.items;
        this.paginations.total = res.result.totalCount; // 是否传了分页
        this.tableData.emptyImg = true;
      });
    },
    SelectionChange(row) {
      this.multipleSelection = row;
    },
    handleSearch(from) {
      var self = this;
      self.formSearchData.value = { ...from };
      self.paginations.page = 1;
      this.getTable();
    },
    handleReset() {},
    handleSizeChange(val) {
      this.paginations.page = 1;
      this.paginations.limit = val;
      this.getTable();
    },
    handleindexChange(val) {
      this.paginations.page = val;
      this.getTable();
    },
    // 任务下发
    task() {
      const data = this.multipleSelection;
      if (data.length == 0) {
        return this.$message.info("请至少选择一条数据");
      }
      if (
        data.filter((item) => {
          return item.iLTPlanState != 0;
        }).length
      ) {
        return this.$message.warning("只能任务下发盘点状态是待确认的单据！");
      }
      this.$confirm("此操作将下发数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.post({
            url: Inventory.confirmInventPlanOrder,
            data: {
              ids: data.map((item) => {
                return item.id;
              }),
            },
          }).then((res) => {
            this.getTable();
            this.$message.success("操作成功");
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消任务下发",
          });
        });
    },
    // 盘点中止
    stop() {
      const data = this.multipleSelection;
      if (data.length == 0 || data.length > 1) {
        return this.$message.info("请选择一条数据");
      }
      this.$confirm("此操作将中止数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.post({
            url: Inventory.stopInventPlanOrder,
            data: {
              id: data[0].id,
              ids: [data[0].id],
            },
          }).then((res) => {
            this.getTable();
            this.$message.success("操作成功");
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消盘点中止",
          });
        });
    },
    // 新增盘点单（盘点制单）
    ZD() {
      this.createForm.title = "盘点计划制单";
      this.createForm.requestData.flage = "add";
      this.createForm.dialogFormVisible = true;
    },
    delete() {
      const data = this.multipleSelection;
      if (data.length == 0) {
        return this.$message.info("请至少选择一条数据");
      }
      if (
        data.filter((item) => {
          return item.iLTPlanState != 0 && item.iLTPlanState != 1;
        }).length
      ) {
        return this.$message.warning(
          "只能删除盘点状态是待确认和待处理的单据！"
        );
      }
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.post({
            url: Inventory.deleteInventPlanOrder,
            data: {
              ids: data.map((item) => {
                return item.id;
              }),
            },
          }).then((res) => {
            this.getTable();
            this.$message.success("删除成功");
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
        // 导出按钮
    export() {
      const timer = this.formSearchData.value.timer;
      this.formSearchData.value.BeginTime = timer?.[0];
      this.formSearchData.value.EndTime = timer?.[1];
      this.post({
        url: Inventory.exportiLTPlan,
        isLoading: true,
        responseType: "blob",
        data: Object.assign(this.formSearchData.value, {
          Page: this.paginations.page,
          MaxResultCount: this.paginations.limit,
        }),
      }).then((res) => {
        this.fnexsl(res); //fnexsl封装的导出方法
      });
    },
  },
};
</script>
<style></style>
