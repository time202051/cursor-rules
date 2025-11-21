export default {
  data() {
    return {
      tableData: {
        loading: false,
        emptyImg: true,
        options: {
          selection: true, //多选框
          index: null, //序号
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
            prop: "pickQty",
            label: "数量",
            minWidth: "120",
            sortable: false,
            show: true,
          },
          {
            prop: "qualityDesc",
            label: "质检状态",
            minWidth: "150",
            sortable: false,
            show: true,
          }
        ], //表头
        operates: [], //表格里面的操作按钮
        tableHeightDiff: 500,
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
