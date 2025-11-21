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
    <dialogTemplate :form="formPriorty" />
  </div>
</template>

<script>
import { AGV, BusinessTask, Job } from '@/api/request/swagger'
import minxin from './index.js'
// import { getCurrentWeek } from '@/utils/getTime.js'
import { get3to3Days } from '@/utils/getTime.js'

export default {
  name:'RCSManagement',

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
    getSelect() {
      // 所属区域下拉
      this.get({
        url: ILT.regionSelect
      }).then((res) => {
        this.Handle_Select({
          keyword: 'regionId',
          handleData: this.form.model,
          list: res.result,
          config: { type: 'type', prop: 'prop', children: 'child' }
        })
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
      from.IsUnFinished = true
      from.InteractionSystem = 101
      from.timer = []
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
        interactionSystem:101 ,
      }
      this.formPriorty.dialogFormVisible=true
    },
    // 任务强制完成
    taskYES() {
      const data = this.multipleSelection
      if (data.length == 0 || data.length > 1) { return this.$message.info('请选择一条数据') }
      this.$confirm('此操作将强制完成该任务, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.post({
            url: AGV.callback,
            data: {
              taskCode: data[0].taskNo,
              method: 'end',
              cache: 'true'
            }
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
            data: { ids: data.map((item) => item.id), taskSystem: 101 }
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
    // 任务完成
    finish() {
      let ARR1 =this.SET_enumsSelect({
                  keyword: "agvTaskStepEnum",
              })
      let ARR2 = ARR1.map(item => ({
        key: item.value,
        value:item.value
      }));
      const data = this.multipleSelection
      if (data.length == 0 || data.length > 1) { return this.$message.info('请选择一条数据') }
      this.form.dialogFormVisible = true
      this.form.title = '任务完成'
      this.form.model[0].child=ARR2
      this.form.value = {
        method: '',
        taskCode: data[0].taskNo
      }
    },
    delete() {
      const data = this.multipleSelection
      if (data.length == 0 || data.length > 1) { return this.$message.info('请选择一条数据') }
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.del({
            url: Point.station + '/' + data[0].id
          }).then((res) => {
            this.getTable()
            this.$message.success('删除成功')
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
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
