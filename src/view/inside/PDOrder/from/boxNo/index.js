export default {
  data() {
    return {
      tableData: {
        loading: false,
        emptyImg: true,
        options: {
          selection: true, //多选框
          index: null, //序号
          headTool: false, //开启头部工具栏
          refreshBtn: false, //开启表格头部刷新按钮
          downloadBtn: false, //开启表格头部下载按钮
        }, //序号和复选框
        rows: [], //表数据
        columns: [
          {
            prop: "boxCode",
            label: "箱号",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "qty",
            label: "箱数",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "isScanText",
            label: "是否扫描",
            minWidth: "",
            sortable: false,
            show: true,
          },
        ], //表头
        operates: [], //表格里面的操作按钮
        tableHeightDiff: 550,
      },
      paginations: {
        page: 1, //当前位于那页面
        total: 10, //总数
        limit: 20, //一页显示多少条
        pagetionShow: true,
      },
    };
  },
};
