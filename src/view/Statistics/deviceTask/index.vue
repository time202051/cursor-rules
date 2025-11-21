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
import { Statistics } from "@/api/request/swagger";
import minxin from "./index.js";
import { getYesterday } from "@/utils/getTime.js";
export default {
  name: "deviceTaskManagement",
  mixins: [minxin],
  mounted() {
    this.formSearchData.value.Time = getYesterday();
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
        url: Statistics.deviceTask,
        isLoading: true,
        data: Object.assign(this.formSearchData.value, {}),
      }).then((res) => {
        this.tableData.rows = res.result.items;
        this.tableData.emptyImg = true;
      });
    },
    SelectionChange(row) {
      this.multipleSelection = row;
    },
    handleSearch(from) {
      var self = this;
      self.formSearchData.value = { ...from };
      this.getTable();
    },
    handleReset(from) {
      from.Time = getYesterday();
      this.formSearchData.value = { ...from }
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
   
    // 导出按钮
    export() {
      this.post({
        url: Statistics.exportDeviceTask,
        isLoading: true,
        responseType: "blob",
        data: Object.assign(this.formSearchData.value, {}),
      }).then((res) => {
        this.fnexsl(res); //fnexsl封装的导出方法
      });
    },
  },
};
</script>

<style>
.CCSLH{
    max-height:30px;
    overflow: hidden;
    text-overflow: ellipsis; 
    display: -webkit-box;
    -webkit-line-clamp: 1; 
    -webkit-box-orient: vertical;
    padding: 5px 0;
}
</style>
