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
import {  ConfigInfo } from "@/api/request/swagger";
import minxin from "./index.js";
export default {
  // name: "configstationManagement",
  mixins: [minxin],
  mounted() {
    this.getTable();
    this.getSelect();
    console.log(this.hasBtn(this));
  },
  data() {
    return {
      multipleSelection: [],
    };
  },
  methods: {
    getTable() {
      this.get({
        url: ConfigInfo.entrancebusinessconfigpages,
        isLoading:true,
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
      // //翻包工位下拉
      // this.get({
      //   url: ConfigInfo.regionSelect,
      // }).then((res) => {
      //   this.Handle_Select({
      //     keyword: "StationId",
      //     handleData: this.formSearchData.tableSearch,
      //     list: res.result,
      //     config: { type: "inputType", prop: "prop", children: "children" },
      //   });
      // });
      //等级下拉
        // this.get({
        //   url: PublicAggregate.rankSelect,
        // }).then((res) => {
        //   this.Handle_Select({
        //     keyword: "rankId",
        //     handleData: this.form.model,
        //     list: res.result,
        //     config: { type: "type", prop: "prop", children: "child" },
        //   });
        // });
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
    handleDeatils(){
      this.$message.error("测试表格数据");
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
         entranceCode: "",
                    businessTypeCode: "",
                    // businessType: "",
                    remark: "",
                    enabled: true,
      };
    },
    delete() {
      let data = this.multipleSelection;
      if (data.length == 0 || data.length > 1)
        return this.$message.info("请选择一条数据");
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.del({
            url: ConfigInfo.entrancebusinessconfig + "/" + data[0].id,
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
    exprot() {
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
