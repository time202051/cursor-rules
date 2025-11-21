<template>
  <div>
    <MyTable
      :paginations="paginations"
      :btnlist="btnlist"
      :emptyImg="tableData.emptyImg"
      :tableData="tableData"
    >
    </MyTable>
  </div>
</template>

<script>
import { WebSystem } from "@/api/request/swagger";
export default {
  computed: {
    btnlist() {
      return this.hasBtn(this);
    },
  },
  mounted() {
    console.log(this.btnlist);
    this.getTable()
  },
  data() {
    return {
      tableData: {
        loading: false,
        emptyImg: true,
        options: {
          selection: null, //多选框
          index: null, //序号
          headTool: true, //开启头部工具栏
          refreshBtn: true, //开启表格头部刷新按钮
          downloadBtn: true, //开启表格头部下载按钮
        }, //序号和复选框
        rows: [
         
        ], //表数据
        columns: [
          {
            prop: "name",
            label: "标识",
            minWidth: "",
            sortable: true,
            show: true,
          },
          {
            prop: "displayName",
            label: "配置系统",
            minWidth: "",
            sortable: true,
            show: true,
          },
          {
            prop: "creationTimeText",
            label: "创建时间",
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
      from: {},
    };
  },
  methods: {
    getTable() {
      this.get({
        url: WebSystem.WebSystem,
        data: {
          Page: this.paginations.page,
          MaxResultCount: this.paginations.limit,
        },
      }).then(res=>{
        this.tableData.rows=res.result.items;
        this.paginations.total=res.result.totalCount;
         this.tableData.emptyImg=true;

      });
    },
    update() {},
    create() {},
    delete() {},
  },
};
</script>

<style>
</style>
