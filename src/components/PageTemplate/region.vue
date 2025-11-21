<template>
  <div>
    <PageTemplate :pageOBJ="pageOBJ"></PageTemplate>
  </div>
</template>

<script>
import { warehouse } from "@/api/request/swagger";
export default {
  name: "",
  mounted() {
    console.log(this.pageOBJ);
  },
  data() {
    return {
      pageOBJ: {
        btnlist: this.hasBtn(this),//按钮数据
        formSearchData: {
          reset: true,
          expendShow: false,
          value: {
            code: null,
          },
          tableSearch: [
            {
              label: "编码",
              value: "code",
              inputType: "text",
            },
          ],
        },
        tableData: {
          loading: false,
          emptyImg: true,
          options: {
            selection: true, //多选框
            index: null, //序号
            headTool: true, //开启头部工具栏
            refreshBtn: true, //开启表格头部刷新按钮
            downloadBtn: true, //开启表格头部下载按钮
          }, //序号和复选框
          rows: [], //表数据
          columns: [
            {
              prop: "code",
              label: "编码",
              minWidth: "",
              sortable: false,
              show: true,
            },
            {
              prop: "displayName",
              label: "描述",
              minWidth: "",
              sortable: false,
              show: true,
            },
            {
              prop: "fileName",
              label: "文件名称",
              minWidth: "",
              sortable: false,
              show: true,
            },
            {
              prop: "fileSize",
              label: "文件大小",
              minWidth: "",
              sortable: false,
              show: true,
            },
            {
              prop: "remark",
              label: "备注",
              minWidth: "",
              show: true,
            },
          ], //表头
          operates: [], //表格里面的操作按钮
          tableHeightDiff: 300,
        },
        paginations: {
          page: 1, //当前位于那页面
          total: 10, //总数
          limit: 20, //一页显示多少条
          pagetionShow: true,
        },
      },
      multipleSelection: [],
    };
  },
  mounted(){
    this.getTable()
  },
  methods: {
     getTable() {
      this.get({
        url: warehouse.regionPages,
        data: {
          Page: this.pageOBJ.paginations.page,
          MaxResultCount: this.pageOBJ.paginations.limit,
          code:this.pageOBJ.formSearchData.value.code
        },
      }).then((res) => {
        this.pageOBJ.tableData.rows = res.result.items;
        this.pageOBJ.paginations.total = res.result.totalCount;
        this.pageOBJ.tableData.emptyImg = true;
      });
    },
    SelectionChange(row) {
      this.multipleSelection = row;
    },
    handleSearch(from) {
      var self = this;
      self.formSearchData.value = { ...from };
      self.paginations.page = 1;
    },
    handleReset() {},
    update() {},
    create() {},
    delete() {},
  },
};
</script>

<style>
</style>