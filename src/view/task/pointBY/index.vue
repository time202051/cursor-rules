<template>
  <div>
    <header>
      <span>任务类型：多产线抽检</span>
      <!-- <span>当前产线：S234</span> -->
    </header>
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
      <template slot="action" slot-scope="scope">
        <div
          v-if="scope.row.agvTaskType && scope.row.agvTaskType.includes('ZD')"
          style="color: #1682e6; cursor: pointer"
          @click="continueAction(scope.row)"
        >
          继续执行
        </div>
      </template>
    </MyTable>
    <autoTemplate :form="form" />
  </div>
</template>
<script>
import minxin from './index.js'
import autoTemplate from './from/auto/index.vue'
import { Job } from '@/api/request/swagger'
export default {
  components: { autoTemplate },
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
    // 继续执行按钮
    continueAction(params) {
      this.$confirm('请确认agv在当前点位中?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.post({
            url: Job.continueAgvTask,
            isLoading: true,
            data: {
              TaskNo: params.taskNo
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
    hand() {
      this.form.dialogVisible = true
      this.form.title = '手动执行'
      this.form.requestData.params = true
    },
    auto() {
      this.form.dialogVisible = true
      this.form.title = '自动执行'
      this.form.requestData.params = false
    },
    refresh() {
      this.paginations.page = 1
      this.getTable()
    },
    getTable() {
      this.get({
        url: Job.getTaskList,
        isLoading: true,
        data: {
          Page: this.paginations.page,
          MaxResultCount: this.paginations.limit,
          InteractionSystem: 101,
          TaskType: 37,
          PatrolTaskStatus: 0
        }
      }).then((res) => {
        this.tableData.rows = res.result.items
        this.paginations.total = res.result.totalCount
        this.tableData.emptyImg = true
      })
    },
    SelectionChange(row) {
      this.multipleSelection = row
    },
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
<style lang="scss" scoped>
header {
  font-weight: 600;
  height: 38px;
  line-height: 38px;
  font-size: 18px;
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  border-bottom: 1px #ccc solid;
  padding: 0 46px;
}
</style>
