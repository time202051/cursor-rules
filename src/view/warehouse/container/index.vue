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
import { warehouse } from "@/api/request/swagger";
import minxin from "./index.js";
export default {
  name: "containerManagement",
  mixins: [minxin],
  components: {},
  mounted() {
    this.getTable();
    // console.log(this.hasBtn(this));
  },
  data() {
    return {
      multipleSelection: [],
    };
  },
  methods: {
    getTable() {
      this.get({
        url: warehouse.containerPages,
        isLoading:true,
        data: {
          Page: this.paginations.page,
          MaxResultCount: this.paginations.limit,
          Code: this.formSearchData.value.Code,//编码
          LoadStatus:this.formSearchData.value.loadStatus,//承载状态
          UsageStatus:this.formSearchData.value.usageStatus,//使用状态
          ContainerShapeType:this.formSearchData.value.locationType,//容器形态
          Enabled:this.formSearchData.value.enabled,//启用状态

        },
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
    update() {
      let data = this.multipleSelection;
      if (data.length == 0 || data.length > 1)
        return this.$message.info("请选择一条数据");
      this.form.value = { ...data[0] };
      this.form.requestData.flage = "update";
      this.form.dialogFormVisible = true;
    },
    create() {
      this.form.dialogFormVisible = true;
      this.form.requestData.flage = "add";
      this.form.value = {
        code: "",
        containerShapeType: "",
        loadStatus: "",
        usageStatus: "",
        remark: "",
        enabled: true,
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
            url: warehouse.container + "/" + data[0].id,
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
    importBtn() {
      this.$message({
        type: "info",
        message: "上传信息",
      });
    },
  },
};
</script>

<style>
</style>
