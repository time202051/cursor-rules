<template>
  <div>
    <el-dialog title="隔离通知单详情" top="0vh" width="90%" :visible.sync="innerVisible">
      <FormSearch :form-search-data="DetailsOrder.formSearchData" @handleSearch="handleSearch" @handleReset="handleReset" />
      <MyTable :paginations="DetailsOrder.paginations" :btnlist="[]" :emptyImg="DetailsOrder.tableData.emptyImg" ref="tabft"
        :tableData="DetailsOrder.tableData" :multipleSelection="multipleSelection" @SelectionChange="SelectionChange"
        @handleSizeChange="handleSizeChange" @handleindexChange="handleindexChange">
      </MyTable>
      <div slot="footer" class="dialog-footer">
        <el-button @click="innerVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { settings } from 'nprogress';
import index from './index'
import { StockIn, Product ,warehouse} from '@/api/request/swagger'
import { set } from 'nprogress';

export default {
  mixins: [index],
  props: {
    form: Object,
  },
  computed: {},
  data() {
    return {
      isolationNo:null,
      innerVisible: false,
      multipleSelection: [],
    };
  },
  methods: {
    handleReset() {
    },
    handleSearch(v) {
      this.DetailsOrder.formSearchData.value = v
      this.DetailsOrder.paginations.page = 1;
      this.getTable();
    },
    getTable() {
      this.post({
        url: warehouse.isolationDtl,
        isLoading: true,
        data: Object.assign(this.DetailsOrder.formSearchData.value, {
          Page: this.DetailsOrder.paginations.page,
          MaxResultCount: this.DetailsOrder.paginations.limit,
          isolationNo:this.isolationNo
        })
      }).then((res) => {
        this.DetailsOrder.tableData.rows = res.result.items
        this.DetailsOrder.paginations.total = res.result.totalCount
      })
    },
    SelectionChange(v) {
      this.multipleSelection = v
    },
    handleSizeChange(val) {
      this.DetailsOrder.paginations.page = 1;
      this.DetailsOrder.paginations.limit = val;
      this.getTable();
    },
    handleindexChange(val) {
      this.DetailsOrder.paginations.page = val;
      this.getTable();
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