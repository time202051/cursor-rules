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
        <div style="color: #1682e6; cursor: pointer" @click="details(scope)">
          查看
        </div>
      </template>
    </MyTable>
    <detailsdialogTemplate
      ref="detailsdialogTemplate"
      :form="detailsform"
    ></detailsdialogTemplate>
    
    <createTemplate ref="createTemplate"></createTemplate>
    
    <importExsl :importform="importform" @refresh="getTable"> </importExsl>
  </div>
</template>
<script>
import { InBound } from "@/api/request/swagger";
import minxin from "./index.js";
import importExsl from "./from/importExsl/index.vue";
import detailsdialogTemplate from "./from/details/index.vue";
import createTemplate from "./from/create/index.vue";
export default {
  name: "receiptOrderManagement",
  mixins: [minxin],
  components: { importExsl,detailsdialogTemplate, createTemplate },
  mounted() {
    this.getTable();

  },
  data() {
    return {
      importform: {
        dialogFormVisible: false,
        url:InBound.importStockIn,
        downUrl:InBound.exportStockInTemplate
      },
      multipleSelection: [],
    };
  },
  methods: {
    getTable() {
      let timer = this.formSearchData.value.timer;
      this.formSearchData.value.BeginTime = timer ? timer[0] : "";
      this.formSearchData.value.EndTime = timer ? timer[1] : "";
      this.get({
        url: InBound.getSHOrderList,
        isLoading: true,
        data: Object.assign(this.formSearchData.value, {
          Page: this.paginations.page,
          MaxResultCount: this.paginations.limit,
        }),
      }).then((res) => {
        this.tableData.rows = res.result.items;
        this.paginations.total = res.result.totalCount; //是否传了分页
        this.tableData.emptyImg = true;
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
    // 详情页弹出层
    details(row) {
      this.detailsform.row = row.row;
      setTimeout(() => {
        this.$refs.detailsdialogTemplate.getTable();
        this.detailsform.outerVisible = true;
      }, 10);
    },
    //新增到货通知单
    create() {
      this.$refs.createTemplate.dialogFormVisible = true;
      this.$refs.createTemplate.form.orgId =
        this.$refs.createTemplate.companyList?.[0]?.key;
      this.$refs.createTemplate.form.warehouseId =
        this.$refs.createTemplate.warehouseList?.[0]?.key;
      this.$refs.createTemplate.form.stockInTaskTypeEnum = "";
      this.$refs.createTemplate.form.supplierCode = "";
      this.$refs.createTemplate.form.supplierName = "";
      this.$refs.createTemplate.form.remark = "";
      this.$refs.createTemplate.tableData.rows = [];
    },
    delete() {
      let data = this.multipleSelection;
      if (data.length == 0 || data.length > 1)
        return this.$message.info("请选择一条数据");
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.del({
            url: InBound.handleSHOrder + "/" + data[0].id,
          }).then((res) => {
            this.getTable();
            this.$message.success("删除成功");
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //完成收货
    finish() {
      let data = this.multipleSelection;
      if (data.length == 0 || data.length > 1)
        return this.$message.info("请选择一条数据");
      this.$confirm("此操作将完成收货, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.post({
            url: InBound.finishSHOrder + "/" + data[0].id,
          }).then(() => {
            this.getTable();
            this.$message.success("完成收货成功");
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消完成收货",
          });
        });
    },
    //导出
    export() {
      let value = this.formSearchData.value;
      value.BeginTime = value.timer?.[0];
      value.EndTime = value.timer?.[1];
      this.post({
        url: InBound.exportSHOrder,
        isLoading: true,
        responseType: "blob",
        data: Object.assign(value, {
          Page: this.paginations.page,
          MaxResultCount: this.paginations.limit,
        }),
      }).then((res) => {
        this.fnexsl(res); //fnexsl封装的导出方法
      });
    },
    //导出详情
    exportDetail() {
      let value = this.formSearchData.value;
      value.BeginTime = value.timer?.[0];
      value.EndTime = value.timer?.[1];
      this.post({
        url: InBound.exportStockInDetail,
        isLoading: true,
        responseType: "blob",
        data: Object.assign(value, {
          Page: this.paginations.page,
          MaxResultCount: this.paginations.limit,
        }),
      }).then((res) => {
        this.fnexsl(res); //fnexsl封装的导出方法
      });
    },
    // 导入按钮
    importBtn() {
      this.importform.dialogFormVisible = true;
      this.getTable();
    },
  },
};
</script>
<style></style>
