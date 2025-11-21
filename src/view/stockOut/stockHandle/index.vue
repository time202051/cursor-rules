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
    <dialogTemplate :form="form" />
  </div>
</template>

<script>
import { OutBound } from '@/api/request/swagger'
import minxin from './index.js'
export default {
  name:'stockHandleManagement',

  mixins: [minxin],
  data() {
    return {
      multipleSelection: []
    }
  },
  mounted() {
    this.getTable()
  },
  methods: {
    getTable() {
      const timer = this.formSearchData.value.timer
      this.formSearchData.value.BeginTime = timer ? timer[0] : ''
      this.formSearchData.value.EndTime = timer ? timer[1] : ''
      this.get({
        url: OutBound.getStockTransferList,
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
    handleReset() {},
    handleSizeChange(val) {
      this.paginations.page = 1
      this.paginations.limit = val
      this.getTable()
    },
    handleindexChange(val) {
      this.paginations.page = val
      this.getTable()
    }
  }
}
</script>

<style></style>
