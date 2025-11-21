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
    </MyTable>
    <dialogTemplate :form="accountForm"></dialogTemplate>

  </div>
</template>

<script>
import { getThreeDaysAgo } from "@/utils/getTime.js";
import { Reserve } from "@/api/request/swagger";
import minxin from "./index.js";
export default {
  name: "ZXMsgManagement",
  mixins: [minxin],
  mounted() {
    this.formSearchData.value.timer = getThreeDaysAgo();
    this.getTable();
  },
  data() {
    return {
      multipleSelection: [],
    };
  },
  methods: {
    getTable() {
      this.get({
        url: Reserve.getZXMsgList,
        isLoading: true,
        data: Object.assign(this.formSearchData.value, {
          Page: this.paginations.page,
          MaxResultCount: this.paginations.limit,
          BeginTime: this.formSearchData.value.timer?.[0],
          EndTime: this.formSearchData.value.timer?.[1],
        }),
      }).then((res) => {
        this.tableData.rows = res.result.items;
        this.paginations.total = res.result.totalCount;
        this.tableData.emptyImg = true;
      });
    },
    // 手动调帐
    accountBtn() { 
       let data = this.multipleSelection;
      if (data.length == 0 ||data.length > 1 ) return this.$message.info("请选择一条数据");
      this.accountForm.dialogFormVisible = true;
      this.accountForm.requestData.flage = "add";
      this.accountForm.value = {
        boxCode :data[0].boxCode,
        newQty: 20,
      };
    },
// 更新质检信息
     boxQualityBtn() {
      let data = this.multipleSelection;
      if (data.length == 0 ||data.length > 1 ) return this.$message.info("请选择一条数据");
      this.$confirm("是否更新质检信息?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
      .then(() => {
        this.put({
          url: Reserve.boxQuality + "?subtrayCode=" + data[0].subtrayCode,
       
        }).then((res) => {
          this.getTable();
          this.$message.success('操作成功');
        });
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "已取消操作",
        });
      });
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
    handleReset(from) {
      from.timer = getThreeDaysAgo();
      this.formSearchData.value = { ...from };
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
    // 导出按钮
    export() {
      this.post({
        url: Reserve.exportZXMsg,
        isLoading: true,
        responseType: "blob",
        data: Object.assign(this.formSearchData.value, {
          Page: this.paginations.page,
          MaxResultCount: this.paginations.limit,
          BeginTime: this.formSearchData.value.timer?.[0],
          EndTime: this.formSearchData.value.timer?.[1],
        }),
      }).then((res) => {
        this.fnexsl(res); //fnexsl封装的导出方法
      });
    },
  },
};
</script>
