<template>
  <div>
    <!-- <FormSearch
      :form-search-data="formSearchData"
      @handleSearch="handleSearch"
      @handleReset="handleReset"
    /> -->
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
import { getOneDaysAgo7hour } from "@/utils/getTime.js";
export default {
  name: "trayCountManagement",
  mixins: [minxin],
  mounted() {
    // this.formSearchData.value.timer = getOneDaysAgo7hour();
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
        url: Statistics.trayCount,
        isLoading: true,
        data: {},
      }).then((res) => {
        this.tableData.rows = res.result.items;
        // this.paginations.total = res.result.totalCount;
        this.tableData.emptyImg = true;
      });
    },
    SelectionChange(row) {
      this.multipleSelection = row;
    },
    // handleSearch(from) {
    //   var self = this;
    //   self.formSearchData.value = { ...from };
    //   self.paginations.page = 1;
    //   this.getTable();
    // },
    // handleReset(from) {
    //   from.timer = getOneDaysAgo7hour();
    //   this.formSearchData.value = { ...from }
    // },
    handleSizeChange(val) {
      this.paginations.page = 1;
      this.paginations.limit = val;
      this.getTable();
    },
    handleindexChange(val) {
      this.paginations.page = val;
      this.getTable();
    },
    //查看明细按钮
    detail() {
      let data = this.multipleSelection;
      if (data.length == 0 || data.length > 1)
        return this.$message.info("请选择一条数据");
      this.form.value = { ...data[0] };
      this.form.dialogFormVisible = true;
    },
    // 导出按钮
    export() {
      this.post({
        url: Statistics.exportTrayCount,
        isLoading: true,
        responseType: "blob",
        data:{},
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
