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
      <template slot="tsjList" slot-scope="scope">
        <div>{{ scope.row.tsjList.join("、") }}</div>
      </template>
    </MyTable>
    <dialogTemplate :form="form"> </dialogTemplate>
  </div>
</template>

<script>
import { Basic, warehouse } from "@/api/request/swagger";
import minxin from "./index.js";
export default {
  name: "areaAasterFileManagement",
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
      this.get({
        url: Basic.getRegionList,
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
      //区域属性下拉数据
      this.get({
        url: Basic.selectRegionAttributesList,
        isLoading: false,
      }).then((res) => {
        this.Handle_Select({
          keyword: "regionAttributes",
          handleData: this.form.model,
          list: res.result,
          config: { type: "type", prop: "prop", children: "child" },
        });
        this.Handle_Select({
          keyword: "RegionAttributes",
          handleData: this.formSearchData.tableSearch,
          list: res.result,
          config: { type: "inputType", prop: "value", children: "children" },
        });
      });
      //仓库下拉数据
      this.get({
        url: Basic.selectWarehouseList,
        isLoading: false,
      }).then((res) => {
        this.Handle_Select({
          keyword: "warehouseId",
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
      this.form.title = "编辑区域";
      this.form.value = {
        regionCenter: data[0].regionCenter,
        regionCode: data[0].regionCode,
        regionName: data[0].regionName,
        regionAttributes: data[0].regionAttributes,
        warehouseId: data[0].warehouseId,
        enabled: data[0].enabled,
        tsjList: data[0].tsjList,
        id: data[0].id,
      };
    },
    // 创建
    create() {
      this.form.dialogFormVisible = true;
      this.form.requestData.flage = "add";
      this.form.title = "新增区域";
      this.form.value = {
        regionCenter: "",
        regionCode: "",
        regionName: "",
        regionAttributes: "",
        warehouseId: "",
        enabled: true,
        tsjList: [],
      };
    },
    // 导出按钮
    export() {
      this.post({
        url: Basic.exportRegion,
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
            url: warehouse.region + "/" + data[0].id,
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
