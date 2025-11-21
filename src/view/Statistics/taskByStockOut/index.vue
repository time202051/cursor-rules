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
     <template slot="details" slot-scope="scope">
        <div style="color: #1682e6; cursor: pointer" @click="details(scope.row)">
          查看
        </div>
      </template>
    </MyTable>
     <detailsdialogTemplate ref="detailsdialogTemplate"/>
  </div>
</template>

<script>
import { Statistics } from "@/api/request/swagger";
import minxin from "./index.js";
import { getDaysBefore } from "@/utils/publicFn.js";
import detailsdialogTemplate from './from/details/index.vue'

export default {
  name: "taskByStockOutManagement",
  mixins: [minxin],
  components: { detailsdialogTemplate },

  mounted() {
    this.formSearchData.value.timer = getDaysBefore('yesterday');
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
      this.formSearchData.value.StartTime = timer ? timer[0] : "";
      // this.formSearchData.value.EndTime = timer ? timer[1] : "";
      this.get({
        url: Statistics.stockOutStatistics,
        isLoading: true,
        data: Object.assign(this.formSearchData.value, {
          Page: this.paginations.page,
          MaxResultCount: this.paginations.limit,
        }),
      }).then((res) => {
        this.tableData.rows = res.result;
        // this.paginations.total = res.result.totalCount;
        this.tableData.emptyImg = true;
      });
    },
    details(row) {
        this.$refs.detailsdialogTemplate.innerVisible = true
        this.$refs.detailsdialogTemplate.getTable(row)
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
    handleReset(from) {
      from.timer = getDaysBefore('yesterday');
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
      let timer = this.formSearchData.value.timer;
      this.formSearchData.value.StartTime = timer ? timer[0] : "";
      // this.formSearchData.value.EndTime = timer ? timer[1] : "";
      this.post({
        url: Statistics.exportStockOutStatistics,
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
    // 导出详情按钮
    exportDetails() {
      let timer = this.formSearchData.value.timer;
      this.formSearchData.value.StartTime = timer ? timer[0] : "";
      // this.formSearchData.value.EndTime = timer ? timer[1] : "";
      this.post({
        url: Statistics.exportStockOutDetailStatistics,
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
<style lang="scss" scoped>

</style>


