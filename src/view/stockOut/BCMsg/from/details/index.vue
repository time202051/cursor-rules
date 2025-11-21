<template>
  <div>
    <el-dialog
      title="详情"
      top="1.5vh"
      width="90%"
      :visible.sync="form.outerVisible"
    >
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="波次订单信息" name="order">
          <FormSearch
            :form-search-data="BCorder.formSearchData"
            @handleSearch="handleSearchBCorder"
            @handleReset="handleResetBCorder"
          />
          <MyTable
            :paginations="BCorder.paginations"
            :btnlist="[]"
            :emptyImg="BCorder.tableData.emptyImg"
            :tableData="BCorder.tableData"
            :multipleSelection="BCorder.multipleSelection"
            @SelectionChange="SelectionChangeBCorder"
            @handleSizeChange="handleSizeChangeBCorder"
            @handleindexChange="handleindexChangeBCorder"
            @refreshTableBTN="refreshTableBTNBCorder"
          >
          </MyTable>
        </el-tab-pane>
        <el-tab-pane label="波次拣选信息" name="jx">
          <FormSearch
            :form-search-data="JXtask.formSearchData"
            @handleSearch="handleSearchJXtask"
            @handleReset="handleResetJXtask"
          />
          <MyTable
            :paginations="JXtask.paginations"
            :btnlist="[]"
            :emptyImg="JXtask.tableData.emptyImg"
            :tableData="JXtask.tableData"
            :multipleSelection="JXtask.multipleSelection"
            @SelectionChange="SelectionChangeJXtask"
            @handleSizeChange="handleSizeChangeJXtask"
            @handleindexChange="handleindexChangeJXtask"
            @refreshTableBTN="refreshTableBTNJXtask"
          >
            <template slot="details" slot-scope="scope">
              <div
                style="color: #1682e6; cursor: pointer"
                @click="details(scope)"
              >
                查看
              </div>
            </template>
            <template slot="lack" slot-scope="scope">
              <span>{{ scope.row.lackStatusDesc }} </span>
              <el-tooltip
                effect="dark"
                :content="scope.row.remark"
                placement="top"
                v-if="scope.row.lackStatus"
              >
                <i
                  class="el-icon-warning-outline"
                  style="
                    font-size: 16px;
                    margin-left: 1px;
                    position: relative;
                    top: 1px;
                  "
                ></i>
              </el-tooltip>
            </template>
          </MyTable>
        </el-tab-pane>
        <el-tab-pane
          label="出库进度"
          name="progress"
          v-if="form.row.waveType == 4"
        >
          <div>
            <el-steps direction="vertical" :active="progressList.length">
              <el-step
                v-for="(item, index) in progressList"
                :key="index"
                :title="item.progressEnumDesc"
                :description="item.description"
              ></el-step>
            </el-steps>
          </div>
        </el-tab-pane>
      </el-tabs>
      <!--  拣选任务信息详情  -->
      <el-dialog
        width="75%"
        title="分配详情"
        :visible.sync="innerVisible"
        append-to-body
        top="8vh"
      >
        <MyTable
          :paginations="JXtask.FPdetails.paginations"
          :btnlist="[]"
          :emptyImg="JXtask.FPdetails.tableData.emptyImg"
          :tableData="JXtask.FPdetails.tableData"
          :multipleSelection="JXtask.FPdetails.multipleSelection"
          @SelectionChange="SelectionChangeJXtaskFPdetails"
          @handleSizeChange="handleSizeChangeJXtaskFPdetails"
          @handleindexChange="handleindexChangeJXtaskFPdetails"
          @refreshTableBTNB="refreshTableBTNBJXtaskFPdetails"
        >
          <template slot="jxBoxNo" slot-scope="scope">
            <div
              style="color: #1682e6; cursor: pointer"
              @click="boxNoDetails(scope)"
            >
              详情
            </div>
          </template>
        </MyTable>
        <div slot="footer" class="dialog-footer">
          <el-button @click="innerVisible = false">取 消</el-button>
        </div>
        <!--  拣选箱号详情  -->
        <jxBoxNoDetails
          :form="JXtask.jxBoxNoDetails"
          ref="jxBoxNoDetailsTemplate"
        ></jxBoxNoDetails>
      </el-dialog>
      <div slot="footer" class="dialog-footer">
        <el-button @click="form.outerVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import index from "./index";
import BCorder from "./BCorder";
import JXtask from "./JXtask";
import details from "./details";
import jxBoxNoDetails from "../box/index.vue";
import { OutBound } from "@/api/request/swagger";
export default {
  components: { jxBoxNoDetails },
  mixins: [index, BCorder, JXtask, details],
  props: {
    form: Object,
  },
  computed: {},
  data() {
    return {
      innerVisible: false,
      multipleSelection: [],
      progressList: [],
      activeName: "order",
    };
  },
  methods: {
    getTable() {
      this.getWaveOrderTable();
      this.getWavePickTaskTable();
      if (this.form.row.waveType == 4) {
        this.getProgressList();
      }
    },
    //波次订单信息
    getWaveOrderTable() {
      let query = this.BCorder.formSearchData.value;
      query.BeginTime = query.timer?.[0];
      query.EndTime = query.timer?.[1];
      query.ArrivalBeginTime = query.arrivalTimer?.[0];
      query.ArrivalEndTime = query.arrivalTimer?.[1];
      this.get({
        url: OutBound.getCKOrderList,
        isLoading: true,
        data: Object.assign(query, {
          Page: this.BCorder.paginations.page,
          MaxResultCount: this.BCorder.paginations.limit,
          WaveId: this.form.row.id,
        }),
      }).then((res) => {
        this.BCorder.tableData.rows = res.result.items;
        this.BCorder.paginations.total = res.result.totalCount;
        this.BCorder.tableData.emptyImg = true;
      });
    },
    //拣选任务
    getWavePickTaskTable() {
      let timer = this.JXtask.formSearchData.value.timer;
      this.JXtask.formSearchData.value.BeginTime = timer ? timer[0] : "";
      this.JXtask.formSearchData.value.EndTime = timer ? timer[1] : "";
      this.get({
        url: OutBound.getBCJXList,
        isLoading: true,
        data: Object.assign(this.JXtask.formSearchData.value, {
          Page: this.JXtask.paginations.page,
          MaxResultCount: this.JXtask.paginations.limit,
          WaveId: this.form.row.id,
        }),
      }).then((res) => {
        this.JXtask.tableData.rows = res.result.items;
        this.JXtask.paginations.total = res.result.totalCount;
        this.JXtask.tableData.emptyImg = true;
      });
    },
    //出库进度
    getProgressList() {
      this.get({
        url: OutBound.getStockOutProgress,
        isLoading: true,
        data: {
          WaveId: this.form.row.id,
        },
      }).then((res) => {
        res.result =
          res.result?.map((item) => {
            return {
              ...item,
              description: `任务号：${item.taskNo || "无"}，母托盘号：${
                item.containerCode || "无"
              }，所属位置：${item.cargoLocationCode || "无"}，时间：${
                item.progressDate || "无"
              }`,
            };
          }) ?? [];
        this.progressList = res.result;
      });
    },
    //  三级弹出层  （拣选任务信息详情）
    getAllocationList() {
      this.get({
        url: OutBound.getFPDetailList,
        isLoading: true,
        data: {
          Page: this.JXtask.FPdetails.paginations.page,
          MaxResultCount: this.JXtask.FPdetails.paginations.limit,
          StockOutDetailId: this.JXtask.FPdetails.id,
        },
      }).then((res) => {
        this.JXtask.FPdetails.tableData.rows = res.result.items;
        this.JXtask.FPdetails.paginations.total = res.result.totalCount;
        this.JXtask.FPdetails.tableData.emptyImg = true;
      });
    },
    details(row) {
      this.JXtask.FPdetails.id = row.row.id;
      this.innerVisible = true;
      this.getAllocationList();
    },
    boxNoDetails(row) {
      this.JXtask.jxBoxNoDetails.dialogFormVisible = true;
      this.JXtask.jxBoxNoDetails.row = row.row;
      this.$refs.jxBoxNoDetailsTemplate.getTable();
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep .el-dialog__body {
  padding: 10px !important;
}

::v-deep .el-tabs--border-card > .el-tabs__content {
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
::v-deep .el-step__description {
  font-size: 16px;
  padding-bottom: 12px;
  margin-top: 0;
}
::v-deep .el-step__title {
  font-size: 20px;
}
</style>
