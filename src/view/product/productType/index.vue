<template>
  <div>
    <FormSearch ref='FormSearch' :form-search-data="formSearchData" @handleSearch="handleSearch"
      @handleReset="handleReset">
    </FormSearch>
    <MyTable :paginations="paginations" :btnlist="this.hasBtn(this)"
      :tableData="tableData" :multipleSelection="multipleSelection" @SelectionChange="SelectionChange"
      @handleSizeChange="handleSizeChange" @handleindexChange="handleindexChange">
    </MyTable>
    <dialogTemplate :form="form"> </dialogTemplate>
  </div>
</template>

<script>
  import {
    Product,
    PublicAggregate
  } from "@/api/request/swagger";
  import minxin from "./index.js";
  export default {
    name: "warehousestationManagement",
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
          url: Product.productTypeList,
          isLoading: true,
          data: Object.assign(this.formSearchData.value, {
            Page: this.paginations.page,
            MaxResultCount: this.paginations.limit,
          }),
        }).then((res) => {
          this.tableData.rows = res.result.items;
          this.paginations.total = res.result.totalCount;
        });
      },
      getSelect() {
        //物料类别
        this.get({
          url: Product.producttypeselect,
        }).then((res) => {
          //测试物料类别下拉框
          this.formSearchData.tableSearch[1].children = res.result
          // this.form.model[2].child = res.result



          // //表单下拉
          this.Handle_Select({
            keyword: "productTypeId",
            handleData: this.form.model,
            list: res.result,
            config: {
              type: "type",
              prop: "prop",
              children: "child"
            },
          });
        });
        //单位
        this.get({
          url: PublicAggregate.dictionariesselect,
        }).then((res) => {

          //表单下拉
          this.Handle_Select({
            keyword: "unitId",
            handleData: this.form.model,
            list: res.result,
            config: {
              type: "type",
              prop: "prop",
              children: "child"
            },
          });
        });
      },
      SelectionChange(row) {
        this.multipleSelection = row;
      },
      handleSearch(from) {
        var self = this;
        self.formSearchData.value = {
          ...from
        }
        console.log(from)
        self.paginations.page = 1;
        this.getTable();

      },
      handleReset() {
        this.formSearchData.value = {
          code: null,
          TypeId: null,
          Enabled: null,
        }
        this.TreeSelectIds = ""
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

      // 编辑按钮
      update() {
        let data = this.multipleSelection;
        if (data.length == 0 || data.length > 1)
          return this.$message.info("请选择一条数据");

        this.form.value = {
          ...data[0]
        };
        this.form.requestData.flage = "update";
        this.form.dialogFormVisible = true;
      },

      create() {
        this.form.requestData.flage = "add";
        this.form.value = {
          code: "",
          displayName: "",
          // enabled: true,
          remark: "",
        };
           this.form.dialogFormVisible = true;
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
              url: Product.productType + "/" + data[0].id,
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
        // let timer = this.formSearchData.value.timer;
        // this.formSearchData.value.BeginInTime = timer ? timer[0] : "";
        // this.formSearchData.value.EndInTime = timer ? timer[1] : "";
        // this.post({
        //   url: Product.exportProduct,
        //   isLoading: true,
        //   responseType: "blob",
        //   data: Object.assign(this.formSearchData.value, {
        //     Page: this.paginations.page,
        //     MaxResultCount: this.paginations.limit,
        //   }),
        // }).then((res) => {
        //   this.fnexsl(res); //fnexsl封装的导出方法
        // });
      },
      import() {
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
