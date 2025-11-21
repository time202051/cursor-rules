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
    <dialogTemplate :form="form" @selectChange="selectChange"> </dialogTemplate>
  </div>
</template>

<script>
import { warehouse } from "@/api/request/swagger";
import minxin from "./index.js";
export default {
  name: "cargoLocationManagement",
  mixins: [minxin],
  data() {
    return {
      multipleSelection: [],
    };
  },
  mounted() {
    this.getTable();
    // this.getSelect();
    // console.log(this.hasBtn(this));
  },
  methods: {
    getTable() {
      this.get({
        url: warehouse.entrancePages,
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
    // getTable() {
    //   this.get({
    //     url: warehouse.cargoLocationPages,
    //     isLoading: true,
    //     data: {
    //       Page: this.paginations.page,
    //       MaxResultCount: this.paginations.limit,
    //       code: this.formSearchData.value.code,
    //     },
    //   }).then((res) => {
    //     this.tableData.rows = res.result.items;
    //     this.paginations.total = res.result.totalCount;
    //     this.tableData.emptyImg = true;
    //   });
    // },
    // regionChange(val) {
    //   this.get({
    //     url: warehouse.areaSelect,
    //     data: {
    //       regionId: val,
    //     },
    //   }).then((res) => {
    //     this.Handle_Select({
    //       handleData: this.formSearchData.tableSearch,
    //       config: { type: "inputType", prop: "value", children: "children" },
    //       keyword: "areaId",
    //       list: res.result,
    //     });
    //   });
    // },
    selectChange(obj) {
      // console.log(obj);
      let obj1 = {
        handleData: this.form.model,
        config: { type: "type", prop: "prop", children: "child" },
      };
      if (obj.obj.prop == "regionId" && obj.val) {
        return new Promise((resolve, reject) => {
          this.get({
            // url: warehouse.roadWaySelect,
            data: {
              regionId: obj.val,
            },
          }).then((res) => {
            this.Handle_Select({
              ...obj1,
              ...{
                keyword: "roadWayId",
                list: res.result,
              },
            });
            resolve();
          });
          this.get({
            // url: warehouse.areaSelect,
            data: {
              regionId: obj.val,
            },
          }).then((res) => {
            this.Handle_Select({
              ...obj1,
              ...{
                keyword: "areaId",
                list: res.result,
              },
            });
            resolve();
          });
        });
      }
    },
    // getSelect() {
    //   this.get({
    //     url: warehouse.regionSelect,
    //   }).then((res) => {
    //     this.Handle_Select({
    //       keyword: "regionId",
    //       handleData: this.form.model,
    //       list: res.result,
    //       config: { type: "type", prop: "prop", children: "child" },
    //     });
    //     this.Handle_Select({
    //       keyword: "regionId",
    //       handleData: this.formSearchData.tableSearch,
    //       list: res.result,
    //       config: { type: "inputType", prop: "value", children: "children" },
    //     });
    //   });
    // },
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
      this.form.value = { ...data[0] };
      this.form.requestData.flage = "update";
      this.form.dialogFormVisible = true;
    },
    // 创建
    create() {
      this.form.dialogFormVisible = true;
         this.form.requestData.flage = "add";
      this.form.value = {
        code: "",
        name: "",
        // entranceType: "",
        enabled: true,
        remark: "",
      };
      // this.form.requestData = {
      //   flage: "add",
      //   url: warehouse.entrance,
      //   fn: this.getTable,
      // };
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
            url: warehouse.entrance + "/" + data[0].id,
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
    exprot() {},
    // importBtn() {
    //   this.$message({
    //     type: "info",
    //     message: "上传信息",
    //   });
    // },
  },
};
</script>

<style>
</style>
