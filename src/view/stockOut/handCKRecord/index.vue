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
    </MyTable>
    <reasonSetting :form="reasonForm" ref="reasonTemplate"></reasonSetting>
  </div>
</template>
<script>
import { OutBound } from "@/api/request/swagger";
import minxin from "./index.js";
import reasonSetting from "./from/reason/index.vue"
export default {
  name:'handCKRecordManagement',
  mixins: [minxin],
  components:{
    reasonSetting
  },
  data() {
    return {
      multipleSelection: [],
    };
  },
  mounted() {
    this.getTable();
  },
  methods: {
    getTable() {
      let timer = this.formSearchData.value.timer;
      this.formSearchData.value.beginTime = timer?.[0];
      this.formSearchData.value.endTime = timer?.[1];
      this.get({
        url: OutBound.getHandCKRecordList,
        isLoading: true,
        data: Object.assign(this.formSearchData.value, {
          Page: this.paginations.page,
          MaxResultCount: this.paginations.limit,
        }),
      }).then((res) => {
        this.tableData.rows = res.result.items;
        this.paginations.total = res.result.totalCount; // 是否传了分页
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
    export() {
      let timer = this.formSearchData.value.timer;
      this.formSearchData.value.beginTime = timer?.[0];
      this.formSearchData.value.endTime = timer?.[1];
      this.post({
        url: OutBound.exportHandCKRecord,
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
    setting(){
      this.reasonForm.dialogFormVisible = true;
      this.$refs.reasonTemplate.getTable();
    }
  },
};
</script>
<style></style>
