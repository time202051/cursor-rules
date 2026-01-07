<!--
  Filename: productionOrder.vue
  name: productionOrder
  Created Date: 12/8/2025, 3:42:23 PM
  Author: weixin_45890414
-->
<template>
  <div class="ol-container">
    <ol-search
      :url="swaggerUrl.getWorkmanagerWorkorderlist"
      :form-search-data="formSearchData"
      @handleSearch="handleSearch"
      @handleReset="handleReset"
    />
    <ol-table
      :url="swaggerUrl.getWorkmanagerWorkorderlist"
      :paginations="paginations"
      :btnlist="this.hasBtn(this)"
      :empty-img="tableData.emptyImg"
      :table-data="tableData"
      :multiple-selection="multipleSelection"
      @SelectionChange="SelectionChange"
      @handleSizeChange="handleSizeChange"
      @handleindexChange="handleindexChange"
    />
    <el-dialog
      title="详情"
      :visible.sync="formConfig.dialogVisible"
      width="80%"
    >
      <DetailList
        v-if="formConfig.dialogVisible"
        :data="formConfig.tableData"
      />
    </el-dialog>
    <importExsl :importform="importform" @refresh="init" />
  </div>
</template>
<script>
import {
  getWorkmanagerWorkorderlist,
  postWorkmanagerOrderdetails,
  getWorkmanagerOrderdetails,
  postWorkmanagerImportworkorder,
  postWorkmanagerWorkorder,
  postWorkmanagerExecuteById,
} from "@/api/modules";
import { WorkManager } from "@/api/swagger";
import DetailList from "./components/detailList.vue";
import importExsl from "./components/importExsl/index.vue";

export default {
  name: "ProductionOrder",
  components: {
    DetailList,
    importExsl,
  },
  data() {
    return {
      swaggerUrl: WorkManager,
      multipleSelection: [],
      // 查询表单
      formSearchData: {
        reset: true, // 重置
        expendShow: true, // 展开
        value: {},
        tableSearch: [],
      },
      // 表格数据
      tableData: {
        loading: false,
        emptyImg: true,
        options: {
          selection: true, // 多选框
          index: null, // 序号
          headTool: true, // 开启头部工具栏
          refreshBtn: true, // 开启表格头部刷新按钮
          downloadBtn: true, // 开启表格头部下载按钮
        }, // 序号和复选框
        rows: [], // 表数据
        columns: [],
        operatesAttrs: {},
        operates: [
          {
            label: "详情",
            method: (row, index) => this.detail(row, index),
            fixed: true,
          },
        ], // 表格里面的操作按钮
        tableHeightDiff: 330,
      },
      paginations: {
        page: 1, // 当前位于那页面
        total: 10, // 总数
        limit: 30, // 一页显示多少条
        pagetionShow: true,
      },
      formConfig: {
        tableData: [],
        dialogVisible: false,
      },
      importform: {
        dialogFormVisible: false,
        url: WorkManager.postWorkmanagerImportworkorder,
      },
    };
  },
  created() {
    this.init();
  },
  methods: {
    async init() {
      const params = {
        ...this.formSearchData.value,
        Page: this.paginations.page,
        MaxResultCount: this.paginations.limit,
      };
      const { result: { items = [], totalCount = 0 } = {} } =
        await getWorkmanagerWorkorderlist(params, {
          isLoading: true,
        });
      this.tableData.rows = items;
      this.paginations.total = totalCount;
      this.tableData.emptyImg = true;
    },
    handleSearch(from) {
      this.formSearchData.value = { ...from };
      this.paginations.page = 1;
      this.init();
    },
    handleReset() {
      for (let key in this.formSearchData.value) {
        this.formSearchData.value[key] = null;
      }
      this.paginations.page = 1;
    },
    SelectionChange(row) {
      this.multipleSelection = row;
    },
    handleSizeChange(val) {
      this.paginations.page = 1;
      this.paginations.limit = val;
      this.init();
    },
    handleindexChange(val) {
      this.paginations.page = val;
      this.init();
    },
    onCancel() {
      this.formConfig.dialogVisible = false;
    },
    async detail(row) {
      this.formConfig.tableData = row.details;
      this.formConfig.dialogVisible = true;
    },
    importOrder() {
      this.importform.dialogFormVisible = true;
      this.init();
    },
    async orderExecutive() {
      if (this.multipleSelection.length != 1)
        return this.$message.error("请选择一条数据");
      const row = this.multipleSelection[0];
      postWorkmanagerExecuteById(row.id).then((res) => {
        if (res.code != 200) return;
        this.$message.success("操作成功");
        this.init();
      });
    },
    export() {
      const timer = this.formSearchData.value.createdTime;
      this.formSearchData.value.BeginTime = timer ? timer[0] : "";
      this.formSearchData.value.EndTime = timer ? timer[1] : "";
      this.post({
        url: WorkManager.postWorkmanagerExpotrworkorder,
        isLoading: true,
        responseType: "blob",
        data: Object.assign(this.formSearchData.value, {
          Page: this.paginations.page,
          MaxResultCount: this.paginations.limit,
        }),
      }).then((res) => {
        this.fnexsl(res);
      });
    },
  },
};
</script>
