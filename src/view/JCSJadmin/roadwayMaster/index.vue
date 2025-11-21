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
      <template slot="maxCount" slot-scope="scope">
        <span>{{ scope.row.maxCount | formatNumberFilter }}</span>
      </template>
      <template slot="reserveCount" slot-scope="scope">
        <span>{{ scope.row.reserveCount | formatNumberFilter }}</span>
      </template>
    </MyTable>
    <dialogTemplate :form="form"> </dialogTemplate>
  </div>
</template>

<script>
import { warehouse, Basic } from "@/api/request/swagger";
import minxin from "./index.js";
export default {
  name: "roadwayMasterManagement",
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
        url: Basic.getRoadwayList,
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
      this.form.title = "编辑巷道";
      this.form.value = {
        code: data[0].code,
        roadWayName: data[0].roadWayName,
        maxCount: data[0].maxCount,
        reserveCount: data[0].reserveCount,
        enabled: data[0].enabled,
        inEnabled: data[0].inEnabled,
        outEnabled: data[0].outEnabled,
        remark: data[0].remark,
        id: data[0].id,
      };
    },
    // 创建
    create() {
      this.form.dialogFormVisible = true;
      this.form.requestData.flage = "add";
      this.form.title = "新增巷道";
      this.form.value = {
        code: "",
        roadWayName: "",
        maxCount: 1,
        reserveCount: 1,
        enabled: true,
        inEnabled: true,
        outEnabled: true,
        remark: "",
      };
    },
    // 导出按钮
    export() {
      this.post({
        url: Basic.exportRoadway,
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
