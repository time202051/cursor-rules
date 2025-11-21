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
      :emptyImg="tableData.emptyImg"
      :tableData="tableData"
      :multipleSelection="multipleSelection"
      @SelectionChange="SelectionChange"
      @handleSizeChange="handleSizeChange"
      @handleindexChange="handleindexChange"
    >
      <template slot="details" slot-scope="scope">
        <span style="color: #1682e6; cursor: pointer" @click="details(scope)">
          查看
        </span>
         <span style="color: #1682e6; cursor: pointer;margin-left:10px" @click="pickDetails(scope)">
          拣选任务
        </span>
      </template>
    </MyTable>
    <detailsdialogTemplate
      ref="detailsdialogTemplate"
      :form="detailsform"
    ></detailsdialogTemplate>
    <pickDetailsdialogTemplate
      ref="pickDetailsdialogTemplate"
      :form="pickDetailsform"
    ></pickDetailsdialogTemplate>
    
    <dialogTemplate :form="adjustTimeForm"></dialogTemplate>
  </div>
</template>
<script>
import { OutBound } from "@/api/request/swagger";
import minxin from "./index.js";
import detailsdialogTemplate from "./from/details/index.vue";
import pickDetailsdialogTemplate from "./from/pickDetails/index.vue";

export default {
  name: "CKOrderManagement",
  mixins: [minxin],
  components: { detailsdialogTemplate ,pickDetailsdialogTemplate},
  mounted() {
    this.getTable();
  },
  data() {
    return {
      multipleSelection: [],
    };
  },
  methods: {
    getTable() {
      let query = this.formSearchData.value;
      query.BeginTime = query.timer?.[0];
      query.EndTime = query.timer?.[1];
      query.ArrivalBeginTime = query.arrivalTimer?.[0];
      query.ArrivalEndTime = query.arrivalTimer?.[1];
      this.get({
        url: OutBound.getCKOrderList,
        isLoading: true,
        data: Object.assign(query, {
          Page: this.paginations.page,
          MaxResultCount: this.paginations.limit,
        }),
      }).then((res) => {
        this.tableData.rows = res.result.items;
        this.paginations.total = res.result.totalCount; //是否传了分页
        this.tableData.emptyImg = true;
      });
    },
    ordAlloc(){
      // 订单分配
      let data = this.multipleSelection;
      if (data.length == 0 || data.length > 1)
        return this.$message.info("请选择一条数据");
      this.$confirm("是否订单分配?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.post({
            url: OutBound.allotBCMsg + "/" + data[0].id,
          }).then((res) => {
            this.getTable();
            this.$message.success("操作成功");
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作",
          });
        });
    },
    manualFinishBtn(){
      // 强制完成
      let data = this.multipleSelection;
      if (data.length == 0 || data.length > 1)
        return this.$message.info("请选择一条数据");
      this.$confirm("是否强制完成?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.post({
            url: OutBound.manualFinish + "/" + data[0].id,
          }).then((res) => {
            this.getTable();
            this.$message.success("操作成功");
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作",
          });
        });
    },
    pushTask(){
      // 任务下发
      this.$confirm("是否任务下发?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.post({
            url: OutBound.taskDownBCMsg,
          }).then((res) => {
            this.getTable();
            this.$message.success("操作成功");
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作",
          });
        });
    },
    editBackupTime(){
      // 调整备料时间
      let data = this.multipleSelection;
      if (data.length == 0 || data.length > 1)
        return this.$message.info("请选择一条数据");
      this.adjustTimeForm.dialogFormVisible = true;
      this.adjustTimeForm.value.planTime = "";
      this.adjustTimeForm.requestData.url = `${OutBound.adjustTimeBCMsg}/${data[0].id}`;
    },
    SelectionChange(row) {
      this.multipleSelection = row;
    },
    handleSearch(from) {
      var self = this;
      self.formSearchData.value = { ...from };
      self.paginations.page = 1;
      this.getTable();
    },
    handleReset() {
      for (let key in this.formSearchData.value) {
        this.formSearchData.value[key] = null;
      }
      this.paginations.page = 1;
    },
    handleSizeChange(val) {
      this.paginations.page = 1;
      this.paginations.limit = val;
      this.getTable();
    },
    handleindexChange(val) {
      this.paginations.page = val;
      this.getTable();
    },
    details(row) {
      console.log(this.detailsform);
      this.detailsform.row = row.row;
      setTimeout(() => {
        this.$refs.detailsdialogTemplate.getTable();
        this.detailsform.dialogFormVisible = true;
      }, 10);
    },
    pickDetails(row) {
      
      console.log(this.pickDetailsform);
      this.pickDetailsform.row = row.row;
      setTimeout(() => {
        this.$refs.pickDetailsdialogTemplate.getTable();
        this.pickDetailsform.dialogFormVisible = true;
      }, 10);
    },
    export() {
      let query = this.formSearchData.value;
      query.BeginTime = query.timer?.[0];
      query.EndTime = query.timer?.[1];
      query.ArrivalBeginTime = query.arrivalTimer?.[0];
      query.ArrivalEndTime = query.arrivalTimer?.[1];
      this.post({
        url: OutBound.exportCKOrder,
        isLoading: true,
        responseType: "blob",
        data: Object.assign(query, {
          Page: this.paginations.page,
          MaxResultCount: this.paginations.limit,
        }),
      }).then((res) => {
        this.fnexsl(res); //fnexsl封装的导出方法
      });
    },
      //导出详情
    exportDetail() {
       let query = this.formSearchData.value;
      query.BeginTime = query.timer?.[0];
      query.EndTime = query.timer?.[1];
      query.ArrivalBeginTime = query.arrivalTimer?.[0];
      query.ArrivalEndTime = query.arrivalTimer?.[1];
      this.post({
        url: OutBound.exportStockOutDetail,
        isLoading: true,
        responseType: "blob",
        data: Object.assign(query, {
          Page: this.paginations.page,
          MaxResultCount: this.paginations.limit,
        }),
      }).then((res) => {
        this.fnexsl(res); //fnexsl封装的导出方法
      });
    },
  },
};
</script>
<style></style>
