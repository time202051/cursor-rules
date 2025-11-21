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
      <template slot="enabledDesc" slot-scope="scope">
        <div>
          <span
            class="dot"
            :style="{
              background: scope.row.enabled ? '#19be6b' : 'red',
            }"
          ></span>
          <span>{{ scope.row.enabledDesc }}</span>
        </div>
      </template>
    </MyTable>
    <dialogTemplate :form="form" />
  </div>
</template>

<script>
import { warehouse, Basic } from "@/api/request/swagger";
import minxin from "./index.js";
export default {
  name: "PointManagement",
  mixins: [minxin],
  data() {
    return {
      multipleSelection: [],
    };
  },
  mounted() {
    this.getTable();
    this.getSelect();
  },
  methods: {
    getTable() {
      this.get({
        url: warehouse.warehousePages,
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
      //  区域下拉数据
      this.get({
        url: Basic.selectRegionList,
        isLoading: false,
      }).then((res) => {
        this.Handle_Select({
          keyword: "regionId",
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
      const data = this.multipleSelection;
      if (data.length == 0 || data.length > 1) {
        return this.$message.info("请选择一条数据");
      }
      this.form.requestData.flage = "update";
      this.form.dialogFormVisible = true;
      this.form.title = "编辑通道";
      this.form.value = {...data[0]};
    },
    // 创建
    create() {
      this.form.dialogFormVisible = true;
      this.form.requestData.flage = "add";
      this.form.title = "新增通道";
      this.form.value = {
        code: "",
        roadWayName: "",
        enabled: true,
        remark: "",
        freeBits: undefined,
      };
    },
    // 导出按钮
    export() {
      // let timer = this.formSearchData.value.timer;
      // this.formSearchData.value.BeginInTime = timer ? timer[0] : "";
      // this.formSearchData.value.EndInTime = timer ? timer[1] : "";
      this.post({
        url: warehouse.exportRoadWay,
        isLoading: true,
        responseType: "blob",
        data: Object.assign(this.formSearchData.value, {
          Page: this.paginations.page,
          MaxResultCount: this.paginations.limit,
        }),
      }).then((res) => {
        this.fnexsl(res); // fnexsl封装的导出方法
      });
    },
  },
};
</script>

<style></style>
