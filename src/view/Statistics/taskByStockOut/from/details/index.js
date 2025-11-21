
export default {
  data() {
    return {
      innerVisible: false,
      TSOdatails: {
        multipleSelection: [],
        tableData: {
          loading: false,
          emptyImg: true,
          options: {
            selection: false, //多选框
            index: null, //序号
            headTool: false, //开启头部工具栏
            refreshBtn: false, //开启表格头部刷新按钮
            downloadBtn: false, //开启表格头部下载按钮
            entityName:"ConsolidineRecordDetail"
          }, //序号和复选框
          rows: [], //表数据
          columns: [
            // {
            //   label: "",
            //   minWidth: "",
            //   type: "selection",
            //   show: true,
            // },
            // {
            //   prop: "",
            //   label: "行号",
            //   width:"60",
            //   show: true,
            //   type:"index"
            // },
            {
              prop: "dateTimeStr",
              label: "需求时间",
              minWidth: "200",
              sortable: false,
              show: true,
            },
            {
              prop: "creationTime",
              label: "创建时间",
              minWidth: "",
              sortable: false,
              show: true,
            },
            {
              prop: "productCode",
              label: "零件号",
              minWidth: "",
              sortable: false,
              show: true,
            },
            {
              prop: "reamrk",
              label: "原因",
              minWidth: "",
              sortable: false,
              show: true,
            },
            {
              prop: "needCount",
              label: "需求次数",
              minWidth: "",
              sortable: false,
              show: true,
            },
          
          ], //表头
          operates: [], //表格里面的操作按钮
          tableHeightDiff: 350,
        },
        paginations: {
          page: 1, //当前位于那页面
          total: 10, //总数
          limit: 20, //一页显示多少条
          pagetionShow: false,
        },
      },
    };
  },
};
