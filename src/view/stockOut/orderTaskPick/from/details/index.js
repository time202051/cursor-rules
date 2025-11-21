export default {
  data() {
    return {
      multipleSelection: [],
      tableData: {
        loading: false,
        emptyImg: true,
        options: {
          selection: true, //多选框
          index: null, //序号
          headTool: false, //开启头部工具栏
          refreshBtn: false, //开启表格头部刷新按钮
          downloadBtn: false, //开启表格头部下载按钮
          headerCellClassName: this.cellClass,
        }, //序号和复选框
        rows: [], //表数据
        columns: [
          // {
          //   label: "行号",
          //   width: "80",
          //   type: "index",
          //   show: true,
          // },
          // {
          //   label: "是否只出样件",
          //   width: "100",
          //   type: "selection",
          //   show: true,
          // },
          // {
          //   prop: "lack",
          //   label: "是否缺货",
          //   minWidth: "110",
          //   sortable: false,
          //   show: true,
          //   renderSlot: true,
          // },
          {
            prop: "boxCode",
            label: "箱号编码",
            minWidth: "200",
            sortable: false,
            show: true,
          },
          {
            prop: "pickQty",
            label: "箱号数量",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "quality",
            label: "质检状态",
            minWidth: "",
            sortable: false,
            show: true,
          },
          // {
          //   prop: "productName",
          //   label: "零件名称",
          //   minWidth: "",
          //   sortable: false,
          //   show: true,
          // },
          // {
          //   prop: "basicUnitName",
          //   label: "基本单位",
          //   minWidth: "100",
          //   sortable: false,
          //   show: true,
          // },
          // {
          //   prop: "packagingRate",
          //   label: "包装率",
          //   minWidth: "100",
          //   sortable: false,
          //   show: true,
          // },
          // {
          //   prop: "completeUnitName",
          //   label: "整件单位",
          //   minWidth: "100",
          //   sortable: false,
          //   show: true,
          // },
          // {
          //   prop: "batchNum",
          //   label: "零件批次",
          //   minWidth: "",
          //   sortable: false,
          //   show: true,
          // },
          // {
          //   prop: "batchSupNum",
          //   label: "供应商批次",
          //   minWidth: "",
          //   sortable: false,
          //   show: true,
          // },
          // {
          //   prop: "date",
          //   label: "收货日期",
          //   minWidth: "150",
          //   sortable: false,
          //   show: true,
          // },
          // {
          //   prop: "reference",
          //   label: "参考号",
          //   minWidth: "",
          //   sortable: false,
          //   show: true,
          // },
          // {
          //   prop: "prodline",
          //   label: "产线代码",
          //   minWidth: "",
          //   sortable: false,
          //   show: true,
          // },
          // {
          //   prop: "shelf",
          //   label: "料架号",
          //   minWidth: "",
          //   sortable: false,
          //   show: true,
          // },
          // {
          //   prop: "amount",
          //   label: "订货数量",
          //   minWidth: "110",
          //   sortable: false,
          //   show: true,
          // },
          // {
          //   prop: "actualAmount",
          //   label: "分配数量",
          //   minWidth: "110",
          //   sortable: false,
          //   show: true,
          // },
          // {
          //   prop: "pickCount",
          //   label: "拣货任务数",
          //   minWidth: "110",
          //   sortable: false,
          //   show: true,
          // },
          // {
          //   prop: "pickAmount",
          //   label: "拣货数量",
          //   minWidth: "110",
          //   sortable: false,
          //   show: true,
          // },
          // // {
          // //   prop: "reviewAmount",
          // //   label: "复核数量",
          // //   minWidth: "120",
          // //   sortable: false,
          // //   show: true,
          // // },
          // {
          //   prop: "stockOutAmount",
          //   label: "出库数量",
          //   minWidth: "110",
          //   sortable: false,
          //   show: true,
          // },
          // {
          //   prop: "zdBoxNo",
          //   label: "指定箱号",
          //   minWidth: "100",
          //   sortable: false,
          //   show: true,
          //   renderSlot: "true",
          //   fixed:"right"
          // },
          // // {
          // //   prop: "remark",
          // //   label: "明细备注",
          // //   minWidth: "",
          // //   sortable: false,
          // //   show: true,
          // // },
          // {
          //   prop: "lastModificationTime",
          //   label: "更新时间",
          //   minWidth: "150",
          //   sortable: false,
          //   show: true,
          // },
        ], //表头
        operates: [], //表格里面的操作按钮
        tableHeightDiff: 350,
      },
      paginations: {
        page: 1, //当前位于那页面
        total: 10, //总数
        limit: 20, //一页显示多少条
        pagetionShow: true,
      },
      boxNoForm: {
        dialogFormVisible: false,
        title: "指定箱号",
        row: {},
      },
    };
  },
};
