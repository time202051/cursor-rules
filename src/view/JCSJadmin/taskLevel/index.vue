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
    />
    <dialogTemplate :form="formLevel" />
  </div>
</template>

<script>
import {  BusinessTask } from '@/api/request/swagger'
import minxin from './index.js'
// import { getCurrentWeek } from '@/utils/getTime.js'
// import { get3to3Days } from '@/utils/getTime.js'

export default {
  name:'taskLevelManagement',

  mixins: [minxin],
  data() {
    return {
      multipleSelection: []
    }
  },
  mounted() {
    // this.formSearchData.value.timer = get3to3Days()
    this.getTable()
  },
  methods: {
    getTable() {
      // const timer = this.formSearchData.value.timer
      // this.formSearchData.value.BeginTime = timer ? timer[0] : ''
      // this.formSearchData.value.EndTime = timer ? timer[1] : ''
      this.get({
        url: BusinessTask.taskLevelPages,
        isLoading: true,
        data: Object.assign(this.formSearchData.value, {
          Page: this.paginations.page,
          MaxResultCount: this.paginations.limit
        })
      }).then((res) => {
        this.tableData.rows = res.result.items
        this.paginations.total = res.result.totalCount
        this.tableData.emptyImg = true
      })
    },
    SelectionChange(row) {
      this.multipleSelection = row
    },
    handleSearch(from) {
      var self = this
      self.formSearchData.value = { ...from }
      self.paginations.page = 1
      this.getTable()
    },
    handleReset(from) {
      // from.timer = get3to3Days()
      this.formSearchData.value = { ...from }
    },
    handleSizeChange(val) {
      this.paginations.page = 1
      this.paginations.limit = val
      this.getTable()
    },
    handleindexChange(val) {
      this.paginations.page = val
      this.getTable()
    },
    changeLevelBtn(){
       // 设置优先级
      let data = this.multipleSelection;
      if (data.length == 0|| data.length >1 ) return this.$message.info("请选择一条数据");
      this.formLevel.value={
        id: data[0].id - 0,
        newLevel: data[0].level,
      }
      this.formLevel.dialogFormVisible=true
    },

    // 导出按钮
    exprot() {
      const timer = this.formSearchData.value.timer
      this.formSearchData.value.BeginTime = timer ? timer[0] : ''
      this.formSearchData.value.EndTime = timer ? timer[1] : ''
      this.post({
        url: BusinessTask.exportBusinessTask,
        isLoading: true,
        responseType: 'blob',
        data: Object.assign(this.formSearchData.value, {
          Page: this.paginations.page,
          MaxResultCount: this.paginations.limit
        })
      }).then((res) => {
        this.fnexsl(res) // fnexsl封装的导出方法
      })
    }
  }
}
</script>

<style></style>
