<template>
  <div>
    <el-dialog
      :title="form.title"
      :visible.sync="form.dialogFormVisible"
      width="83%"
      top="10vh"
    >
      <div class="wrapper">
        <!--可指定清单-->
        <div style="width: 50%" class="left">
          <h3 class="title">可指定清单</h3>
          <div class="tip">
            <span>已经指定/尾数需求：</span>
            <span
              >{{ alreadyAssign.assignBoxCount }}/{{
                form.row.packingCount
              }}</span
            >
          </div>
          <FormSearch
            :form-search-data="canAssign.formSearchData"
            @handleSearch="handleSearch"
            @handleReset="handleReset"
            class="cansearch"
          />
          <MyTable
            :paginations="canAssign.paginations"
            :btnlist="[]"
            :emptyImg="canAssign.tableData.emptyImg"
            :tableData="canAssign.tableData"
            @handleSizeChange="handleSizeChange($event, 'canAssign')"
            @handleindexChange="handleindexChange($event, 'canAssign')"
            :multipleSelection="canAssign.multipleSelection"
            @SelectionChange="SelectionChange($event, 'canAssign')"
            class="table"
          >
          </MyTable>
          <!--按钮-->
          <div
            style="text-align: right; margin-top: 8px"
            v-if="form.row.taskStatus == 0"
          >
            <el-button type="primary" @click="submit">提交</el-button>
          </div>
        </div>
        <!--已指定箱号-->
        <div style="width: 50%" class="right">
          <h3 class="title">已指定箱号</h3>
          <MyTable
            :paginations="alreadyAssign.paginations"
            :btnlist="[]"
            :emptyImg="alreadyAssign.tableData.emptyImg"
            :tableData="alreadyAssign.tableData"
            @handleSizeChange="handleSizeChange($event, 'alreadyAssign')"
            @handleindexChange="handleindexChange($event, 'alreadyAssign')"
            :multipleSelection="alreadyAssign.multipleSelection"
            @SelectionChange="SelectionChange($event, 'alreadyAssign')"
          >
          </MyTable>
          <!--按钮-->
          <div
            style="text-align: right; margin-top: 8px"
            v-if="form.row.taskStatus == 0"
          >
            <el-button type="primary" @click="cancelAssign">取消指定</el-button>
          </div>
        </div>
      </div>
      <!-- <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('form')">取 消</el-button>
      </div> -->
    </el-dialog>
  </div>
</template>
<script>
import { OutBound } from "@/api/request/swagger";
import minxin from "./index.js";
export default {
  mixins: [minxin],
  props: {
    form: Object,
  },
  methods: {
    handleSizeChange(val, params) {
      this[params].paginations.page = 1;
      this[params].paginations.limit = val;
      params == "canAssign"
        ? this.getCanAssignTable()
        : this.getAlreadyAssignTable();
    },
    handleindexChange(val, params) {
      this[params].paginations.page = val;
      params == "canAssign"
        ? this.getCanAssignTable()
        : this.getAlreadyAssignTable();
    },
    handleReset(from) {
      from.Qty = undefined;
    },
    handleSearch(from) {
      var self = this;
      self.canAssign.formSearchData.value = { ...from };
      self.canAssign.paginations.page = 1;
      this.getCanAssignTable();
    },
    SelectionChange(row, params) {
      this[params].multipleSelection = row;
    },
    getCanAssignTable() {
      this.get({
        url: OutBound.getCanAssignList,
        isLoading: true,
        data: Object.assign(this.canAssign.formSearchData.value, {
          Page: this.canAssign.paginations.page,
          MaxResultCount: this.canAssign.paginations.limit,
          ProductCode: this.form.row.productCode,
          BatchNum: this.form.row.batchNum,
          OnwerCode: this.form.row.onwerCode,
        }),
      }).then((res) => {
        this.canAssign.tableData.rows = res.result.items;
        this.canAssign.paginations.total = res.result.totalCount;
        this.canAssign.tableData.emptyImg = true;
      });
    },
    getAlreadyAssignTable() {
      this.get({
        url: OutBound.getAlreadyAssignList,
        isLoading: true,
        data: {
          Page: this.alreadyAssign.paginations.page,
          MaxResultCount: this.alreadyAssign.paginations.limit,
          StockOutDetailId: this.form.row.id,
        },
      }).then((res) => {
        this.alreadyAssign.tableData.rows = res.result?.pagedResult?.items;
        this.alreadyAssign.paginations.total =
          res.result?.pagedResult?.totalCount;
        this.alreadyAssign.assignBoxCount = res.result?.assignBoxCount;
        this.alreadyAssign.tableData.emptyImg = true;
      });
    },
    //提交
    submit() {
      if (this.canAssign.multipleSelection.length == 0) {
        return this.$message.info("请至少选择一条数据");
      }
      this.post({
        url: OutBound.settingAssignBox,
        isLoading: true,
        data: {
          StockOutDetailId: this.form.row.id,
          packingInformationIds: this.canAssign.multipleSelection.map(
            (item) => {
              return item.id;
            }
          ),
        },
      }).then((res) => {
        this.getCanAssignTable();
        this.getAlreadyAssignTable();
      });
    },
    //取消指定
    cancelAssign() {
      if (this.alreadyAssign.multipleSelection.length == 0) {
        return this.$message.info("请至少选择一条数据");
      }
      this.del({
        url: OutBound.cancelAssignBox,
        isLoading: true,
        data: {
          boxIds: this.alreadyAssign.multipleSelection.map((item) => {
            return item.id;
          }),
        },
      }).then((res) => {
        this.getCanAssignTable();
        this.getAlreadyAssignTable();
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.wrapper {
  display: flex;
  .title {
    border-bottom: 1px solid #aaa;
    padding-bottom: 10px;
    width: calc(100% + 30px);
    margin: 0;
    padding-left: 25px;
    font-weight: normal;
    font-size: 18px;
  }
  .left {
    border-right: 1px solid #aaa;
    padding-right: 30px;
    position: relative;
    .tip {
      color: #1890ff;
      position: absolute;
      top: 5px;
      right: 60px;
      font-size: 16px;
    }
  }
  .right {
    padding-left: 30px;
    .title {
      margin-left: -30px;
    }
  }
}
.cansearch {
  ::v-deep .table-header {
    border: none;
    padding-top: 15px;
  }
  ::v-deep .el-form-item {
    width: 38%;
  }
  ::v-deep .el-form-item .el-form-item__label {
    width: 25% !important;
  }
  ::v-deep .el-form-item .el-form-item__content {
    width: 75% !important;
  }
  ::v-deep .fromBtn {
    width: 20%;
    text-align: center;
  }
}
.table {
  ::v-deep .btnbox {
    display: none;
  }
}
</style>
