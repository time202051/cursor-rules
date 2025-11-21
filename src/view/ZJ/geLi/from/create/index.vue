<template>
  <div>
    <el-dialog title="隔离通知单创建" top="0vh" width="90%" :visible.sync="innerVisible">
      <FormSearch :form-search-data="GLorder.formSearchData" @handleSearch="handleSearch" @handleReset="handleReset" />
      <MyTable :paginations="GLorder.paginations" :btnlist="[]" :emptyImg="GLorder.tableData.emptyImg" ref="tabft"
        :tableData="GLorder.tableData" :multipleSelection="multipleSelection" @SelectionChange="SelectionChange"
        @handleSizeChange="handleSizeChange" @handleindexChange="handleindexChange">
      </MyTable>
      <div slot="footer" class="dialog-footer">
        <el-button @click="innerVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAdd">创建并隔离</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import index from './index'
import { warehouse} from '@/api/request/swagger'
export default {
  mixins: [index],
  props: {
    form: Object,
  },
  computed: {},
  data() {
    return {
      innerVisible: false,
      multipleSelection: [],
    };
  },
  methods: {
    handleReset() {
    },
    handleSearch(v) {
      this.GLorder.formSearchData.value = v
      this.GLorder.paginations.page = 1;
      this.getTable();
    },
    getTable() {
      let timer = this.GLorder.formSearchData.value.timer;
      this.GLorder.formSearchData.value.receiveTimeStart = timer ? timer[0] : "";
      this.GLorder.formSearchData.value.receiveTimeEnd = timer ? timer[1] : "";
      this.post({
        url: warehouse.isolationPacking,
        isLoading: true,
        data: Object.assign(this.GLorder.formSearchData.value, {
          Page: this.GLorder.paginations.page,
          MaxResultCount: this.GLorder.paginations.limit
        })
      }).then((res) => {
        this.GLorder.tableData.rows = res.result.items
        this.GLorder.paginations.total = res.result.totalCount
      })
    },
    SelectionChange(v) {
      this.multipleSelection = v
    },
    handleSizeChange(val) {
      this.GLorder.paginations.page = 1;
      this.GLorder.paginations.limit = val;
      this.getTable();
    },
    handleindexChange(val) {
      this.GLorder.paginations.page = val;
      this.getTable();
    },
    submitAdd() {
      if(this.multipleSelection.length==0||!this.multipleSelection){
        return this.$message.info('请选择一条数据')
      }
      this.post({
        url: warehouse.isolationCreate,
        data:{
          boxCode: this.multipleSelection.map(i=>i.boxCode)
        }
      }).then((res) => {
        this.$message.success('创建成功')
        this.innerVisible = false
       this.$emit("refresh")

      })
    },
  },
};
</script>
<style lang='scss' scoped>
::v-deep .el-dialog__body {
  padding: 10px !important;
}

::v-deep .el-tabs--border-card>.el-tabs__content {
  padding: 0px 0px 0px 0px !important;
}

.el-dialog__header {
  background-color: #4a77ac;
  padding: 10px;

  // padding-bottom: none;
  .el-dialog__title,
  .el-dialog__headerbtn i {
    color: white;
  }
}

.el-select,
.el-input-number {
  width: 100% !important;
}

.activeWidth {
  width: 50% !important;
}
</style>