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
    <dialogTemplate :form="form"> </dialogTemplate>
  </div>
</template>

<script>
import { Basic, warehouse } from "@/api/request/swagger";
import minxin from "./index.js";
export default {
  name: "customerMasterFileManagement",
  mixins: [minxin],
  mounted() {
    this.getTable();
    this.getSelect();
  },
  data() {
    return {
      multipleSelection: [],
    };
  },
  methods: {
    getTable() {
      let timer = this.formSearchData.value.timer;
      this.formSearchData.value.BeginTime = timer ? timer[0] : "";
      this.formSearchData.value.EndTime = timer ? timer[1] : "";
      this.get({
        url: Basic.getCustomerList,
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
    getSelect() {
      //公司下拉数据
      this.get({
        url: Basic.selectCompanyList,
      }).then((res) => {
        this.Handle_Select({
          keyword: "orgId",
          handleData: this.form.model,
          list: res.result,
          config: { type: "type", prop: "prop", children: "child" },
        });
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
    // 编辑
    update() {
      let data = this.multipleSelection;
      if (data.length == 0 || data.length > 1)
        return this.$message.info("请选择一条数据");
      this.form.requestData.flage = "update";
      this.form.dialogFormVisible = true;
      this.form.title = "编辑客户";
      this.form.value = {
        PriorityLayer: data[0].priorityLayer,
        shipperCode: data[0].shipperCode,
        shipperName: data[0].shipperName,
        shipperSimpleName: data[0].shipperSimpleName,
        orgId: data[0].orgId,
        contacts: data[0].contacts,
        telephone: data[0].telephone,
        longitude: data[0].longitude,
        latitude: data[0].latitude,
        language: data[0].language,
        isTurnoverNox: data[0].isTurnoverNox,
        enabled: data[0].enabled,
        address: data[0].address,
        remark: data[0].remark,
        id: data[0].id,
      };
    },
    create() {
      this.form.dialogFormVisible = true;
      this.form.requestData.flage = "add";
      this.form.title = "新增客户";
      this.form.value = {
        PriorityLayer: 2,
        shipperCode: "",
        shipperName: "",
        shipperSimpleName: "",
        orgId: "",
        contacts: "",
        telephone: "",
        longitude: "",
        latitude: "",
        language: "",
        isTurnoverNox: true,
        enabled: true,
        address: "",
        remark: "",
      };
    },
    // 导出
    export() {
      let timer = this.formSearchData.value.timer;
      this.formSearchData.value.beginTime = timer ? timer[0] : "";
      this.formSearchData.value.endTime = timer ? timer[1] : "";
      this.post({
        url: Basic.exportCustomer,
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
    delete() {
      let data = this.multipleSelection;
      if (data.length != 1) return this.$message.info("请选择一条数据");
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.del({
            url: warehouse.shipper + "/" + data[0].id,
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
  },
};
</script>

<style></style>
