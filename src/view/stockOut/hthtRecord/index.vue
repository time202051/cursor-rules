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
      <template slot="details" slot-scope="scope">
        <div style="color: #1682e6; cursor: pointer" @click="details(scope)">
          查看
        </div>
      </template>
    </MyTable>
    <detailsdialogTemplate
      ref="detailsdialogTemplate"
      :form="detailsform"
    />
  </div>
</template>
<script>
import { OutBound } from '@/api/request/swagger'
import minxin from './index.js'
import detailsdialogTemplate from './from/details/index.vue'
export default {
  name:'hthtRecordManagement',
  components: { detailsdialogTemplate },
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
        url: OutBound.getHTHTList,
        isLoading: true,
        data: Object.assign(this.formSearchData.value, {
          Page: this.paginations.page,
          MaxResultCount: this.paginations.limit
        })
      }).then((res) => {
        this.tableData.rows = res.result.items
        this.paginations.total = res.result.totalCount // 是否传了分页
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
    handleReset() {
      for (const key in this.formSearchData.value) {
        this.formSearchData.value[key] = null
      }
      this.paginations.page = 1
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
    details(row) {
      this.detailsform.row = row.row
      setTimeout(() => {
        this.$refs.detailsdialogTemplate.getTable()
        this.detailsform.outerVisible = true
      }, 10)
    },
    export() {
      const timer = this.formSearchData.value.timer
      this.formSearchData.value.BeginTime = timer ? timer[0] : ''
      this.formSearchData.value.EndTime = timer ? timer[1] : ''
      this.post({
        url: OutBound.exportHTHT,
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
