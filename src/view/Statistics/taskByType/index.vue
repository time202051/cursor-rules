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
       :row-style="setRowBackgroundColor" 
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
  name: "taskByTypeManagement",
  mixins: [minxin],
  mounted() {
    this.formSearchData.value.timer = getOneDaysAgo7hour();
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
      this.formSearchData.value.EndTime = timer ? timer[1] : "";
      this.get({
        url: Statistics.taskByType,
        isLoading: true,
        data: Object.assign(this.formSearchData.value, {
          Page: this.paginations.page,
          MaxResultCount: this.paginations.limit,
        }),
      }).then((res) => {
        this.tableData.rows = this.processData(res.result.items);
        this.paginations.total = res.result.totalCount;
        this.tableData.emptyImg = true;
      });
    },

    processData(originalData) {
       const result = [];
      const colors = ['#a2a1ff', '#29a7b3', '#d4e678', '#fbb03c', '#87c45f', '#85baff'];
      
      let currentBusinessType = '';
      let colorIndex = 0;
      
      originalData.forEach((item, index) => {
        if (item.业务类型 !== currentBusinessType) {
          result.push({
            "业务类型": "",
            "任务类型": item.业务类型,
            "任务数": '',
            "bgColor": colors[colorIndex % colors.length]
          });
          colorIndex++;
          currentBusinessType = item.业务类型;
        }
        
        result.push(item);
      });
      return result;
    },
    
  setRowBackgroundColor(row, rowIndex) {
      if(row.bgColor)
        return { 
          backgroundColor: row.bgColor, 
          color: '#fff',
          pointerEvents:'none',
        };
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
      from.timer = getOneDaysAgo7hour();
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
      this.formSearchData.value.EndTime = timer ? timer[1] : "";
      this.post({
        url: Statistics.taskByTypeExport,
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
.table_list_fix {
  ::v-deep .el-table {
    td {
      div {
        font-size: 18px;
      }
    }
  }
}

</style>


