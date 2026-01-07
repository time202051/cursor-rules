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
      <template slot="lang" slot-scope="scope">
        <span>{{ scope.row.lang | formatNumberFilter }}</span>
      </template>
      <template slot="width" slot-scope="scope">
        <span>{{ scope.row.width | formatNumberFilter }}</span>
      </template>
      <template slot="height" slot-scope="scope">
        <span>{{ scope.row.height | formatNumberFilter }}</span>
      </template>
    </MyTable>
    <dialogTemplate :form="form"> </dialogTemplate>
  </div>
</template>

<script>
import { Basic, warehouse } from "@/api/request/swagger";
import minxin from "./index.js";
export default {
  name: "containerTypeMasterManagement",
  mixins: [minxin],
  mounted() {
    this.getTable();
  },
  data() {
    return {
      multipleSelection: [],
    };
  },
  methods: {
    getTable() {
      this.get({
        url: Basic.getContainerTypeList,
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
      this.form.title = "编辑容器类型";
      this.form.value = {
        containerTypeCode: data[0].containerTypeCode,
        containerTypeName: data[0].containerTypeName,
        lang: data[0].lang,
        width: data[0].width,
        height: data[0].height,
        isPileUp: data[0].isPileUp,
        enabled: data[0].enabled,
        remark: data[0].remark,
        id: data[0].id,
      };
    },
    // 创建
    create() {
      this.form.dialogFormVisible = true;
      this.form.requestData.flage = "add";
      this.form.title = "新增容器类型";
      this.form.value = {
        containerTypeCode: "",
        containerTypeName: "",
        lang: 0,
        width: 0,
        height: 0,
        isPileUp: true,
        enabled: true,
        remark: "",
      };
    },
    // 导出按钮
    export() {
      this.post({
        url: Basic.exportContainerType,
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
            url: warehouse.handleContainerType + "/" + data[0].id,
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
