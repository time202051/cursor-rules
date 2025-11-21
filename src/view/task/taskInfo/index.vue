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
    <dialogTemplate :form="form1"/>
    <dialogTemplate :form="form2"/>
    <dialogTemplate :form="formPriorty" />

  </div>
</template>

<script>
import { AGV, BusinessTask, Job } from '@/api/request/swagger'
import minxin from './index.js'
// import { getCurrentWeek } from '@/utils/getTime.js'
import { get3to3Days } from '@/utils/getTime.js'
export default {
  name:'taskInfoManagement',
  mixins: [minxin],
  data() {
    return {
      multipleSelection: []
    }
  },
  mounted() {
    this.formSearchData.value.timer = []

    if (this.formSearchData.value.IsUnFinished == null) {
      this.formSearchData.value.IsUnFinished = true
    }
    this.getTable()
  },
  methods: {
    getTable() {
      const timer = this.formSearchData.value.timer
      this.formSearchData.value.BeginTime = timer ? timer[0] : ''
      this.formSearchData.value.EndTime = timer ? timer[1] : ''
      this.get({
        url: Job.getTaskList,
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
      from.InteractionSystem = 100
      from.timer = []
      from.IsUnFinished = true
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
  changePriortyBtn(){
       // 设置优先级
      let data = this.multipleSelection;
      if (data.length == 0|| data.length >1 ) return this.$message.info("请选择一条数据");
      this.formPriorty.value={
        taskNo:data[0].taskNo,
        priorty:data[0].priorty,
        interactionSystem:100 ,
      }
      this.formPriorty.dialogFormVisible=true
    },
    // 申请巷道-（高青松要求加）
    applyLocation() {
      const data = this.multipleSelection
      if (data.length == 0 || data.length > 1) { return this.$message.info('请选择一条数据') }
      this.form1.dialogFormVisible = true
      this.form1.title = '申请巷道'
      this.form1.value = {
        wmsTaskCode: data[0].taskNo,
        pointCode: ''
      }
    },
    // 申请库位-（高青松要求加）
    applyFinalLocation() {
      const data = this.multipleSelection
      if (data.length === 0 || data.length > 1) { return this.$message.info('请选择一条数据') }
      this.form2.dialogFormVisible = true
      this.form2.title = '申请库位'
      this.form2.value = {
        wmsTaskCode: data[0].taskNo,
        Lanewaycode: data[0].putRoadWayCode
      }
    },


    // 申请巷道库位-（原）
    apply() {
      const data = this.multipleSelection
      if (data.length == 0 || data.length > 1) { return this.$message.info('请选择一条数据') }
      this.form.dialogFormVisible = true
      this.form.title = '申请巷道库位'
      this.form.value = {
        entrance: '',
        height: 0,
        containerCode: data[0].containerCode
      }
    },
    // 任务完成
    finish() {
      const data = this.multipleSelection
      if (data.length == 0|| data.length > 1) return this.$message.info('请选择一条数据')
      this.$confirm('此操作将完成该任务, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.post({
            url: Job.completeTask,
            data:  { wmsTaskCode: data[0].taskNo }
          }).then((res) => {
            this.getTable()
            this.$message.success('操作成功')
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
    },
    // 重发
    repeater() {
      const data = this.multipleSelection
      if (data.length == 0) return this.$message.info('请选择一条或多条数据')
      this.$confirm('此操作将重发任务, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.post({
            url: BusinessTask.resetTask,
            data: data.map((item) => item.id)
          }).then((res) => {
            this.getTable()
            this.$message.success('操作成功')
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
    },
    //  任务取消
    taskUnfo() {
      const data = this.multipleSelection
      if (data.length == 0) return this.$message.info('请至少选择一条数据')
      this.$confirm('此操作将取消该任务, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.post({
            url: BusinessTask.cancelTask,
            data: { ids: data.map((item) => item.id), taskSystem: 100 }
          }).then((res) => {
            this.getTable()
            this.$message.success('操作成功')
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
    },
    // 任务补发
    Resend() {
      const data = this.multipleSelection
      if (data.length == 0 || data.length > 1) { return this.$message.info('请选择一条数据') }
      this.$confirm('此操作将永久补发该任务, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.post({
            url: AGV.Resend + '/' + data[0].taskNo
          }).then((res) => {
            this.getTable()
            this.$message.success('操作成功')
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
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
