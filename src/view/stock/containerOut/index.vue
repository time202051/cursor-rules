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
    <!-- <dialogTemplate :form="accountForm"></dialogTemplate> -->

  </div>
</template>

<script>
import { getTwoDaysAgo } from "@/utils/getTime.js";
import { Reserve } from "@/api/request/swagger";
import minxin from "./index.js";
export default {
  name: "containerOutManagement",
  mixins: [minxin],
  mounted() {
    this.formSearchData.value.timer = getTwoDaysAgo();
    this.getTable();
  },
  data() {
    return {
      multipleSelection: [],
    };
  },
  methods: {
    getTable() {
      let timer = this.formSearchData.value.timer;
      this.formSearchData.value.BeginTime = timer ? timer[0] : "";
      this.formSearchData.value.EndTime = timer ? timer[1] : "";
      this.get({
        url: Reserve.containerOutPages,
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
    handleReset() {
      // from.timer = getTwoDaysAgo();
      // this.formSearchData.value = { ...from };

     for (let key in this.formSearchData.value) {
          this.formSearchData.value[key] = null
        }
        this.paginations.page = 1;
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
             let timer = this.formSearchData.value.timer;
       this.formSearchData.value.BeginTime = timer ? timer[0] : "";
       this.formSearchData.value.EndTime = timer ? timer[1] : "";
       this.post({
         url: Reserve.exportContainerOutPages,
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
