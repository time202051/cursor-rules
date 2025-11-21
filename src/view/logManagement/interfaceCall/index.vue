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
      :emptyImg="tableData.emptyImg"
      :tableData="tableData"
      :multipleSelection="multipleSelection"
      @SelectionChange="SelectionChange"
      @handleSizeChange="handleSizeChange"
      @handleindexChange="handleindexChange"
    >
    </MyTable>
    <dialogTemplate :form="form"></dialogTemplate>
    <Setting :is-setting="isSetting" @close="settingClose()" :setting-form="settingForm"/>
  </div>
</template>

<script>
import {  AuditLogging } from "@/api/request/swagger";
import minxin from "./index.js";
import {getCurrentWeek} from "@/utils/getTime.js";
import Setting from "./setting/index.vue";

export default {
  name: "interfaceCallManagement",
  mixins: [minxin],
  components: {Setting},
  mounted() {
    this.formSearchData.value.timer = getCurrentWeek();
    this.getTable();
  },
  data() {
    return {
      isSetting: false,
      settingForm: Object,
      multipleSelection: [],
    };
  },
  methods: {
    getTable() {
      let timer = this.formSearchData.value.timer;
      this.formSearchData.value.StartTime = timer ? timer[0] : "";
      this.formSearchData.value.EndTime = timer ? timer[1] : "";
      this.get({
        url: AuditLogging.auditLogPages,
        isLoading: true,
        data: Object.assign(this.formSearchData.value, {
          Page: this.paginations.page,
          MaxResultCount: this.paginations.limit,
        }),
      }).then((res) => {
        this.tableData.rows = res.result.items;
        this.paginations.total = res.result.totalCount;
        this.tableData.emptyImg = true;
      });
    },
    SelectionChange(row) {
      this.multipleSelection = row;
    },
    handleSearch(from) {
      var self = this;
      self.formSearchData.value = {...from};
      self.paginations.page = 1;
      this.getTable();
    },
    handleReset(from) {
      from.timer = getCurrentWeek();
      this.formSearchData.value = {...from}
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
    // 编辑
    update() {
      let data = this.multipleSelection;
      if (data.length == 0 || data.length > 1)
        return this.$message.info("请选择一条数据");
      this.form.value = {...data[0]};
      this.form.requestData.flage = "update";
      this.form.dialogFormVisible = true;
    },
    // 创建
    create() {
      this.form.dialogFormVisible = true;
      this.form.requestData.flage = "add";
      this.form.value = {
        serviceName: "",
        methodName: "",
        parameters: "",
      };
    },
    delete() {
      let data = this.multipleSelection;
      if (data.length == 0 || data.length > 1)
        return this.$message.info("请选择一条数据");
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.del({
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
    // 查看明细
    detailsView() {
      let data = this.multipleSelection;
      if (data.length == 0 || data.length > 1)
        return this.$message.info("请选择一条数据");

      this.form.value = Object.assign(this.form.value, data[0]);
      this.form.dialogFormVisible = true;
    },
    setting() {
      this.get({
        url: AuditLogging.auditLogSetting,
        isLoading: true
      }).then((res) => {
        console.log(res);
        this.settingForm = res.result;
        this.isSetting = true;
      });
    },
    settingClose() {
      this.isSetting = false;
    },
    // 导出按钮
    export() {
      let timer = this.formSearchData.value.timer;
      this.formSearchData.value.StartTime = timer ? timer[0] : "";
      this.formSearchData.value.EndTime = timer ? timer[1] : "";
      this.post({
        url: AuditLogging.exportAuditLog,
        isLoading: true,
        responseType: "blob",
        data: Object.assign(this.formSearchData.value, {
          Page: this.paginations.page,
          MaxResultCount: this.paginations.limit,
        }),
      }).then((res) => {
        this.fnexsl(res); //fnexsl封装的导出方法
      });
    }
  },
};
</script>

<style></style>
