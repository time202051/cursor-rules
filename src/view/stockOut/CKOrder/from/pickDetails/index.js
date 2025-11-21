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
          entityName:"StockOutDetail",
        }, //序号和复选框
        rows: [], //表数据
        columns: [
          {
            label: "",
            minWidth: "",
            type: "selection",
            show: true,
          },
          {
            prop: "stockOutBillNo",
            label: "出库单号",
            width:150,
            sortable: false,
            show: true,
          },
          {
            prop: "pickTaskCode",
            label: "拣选任务号",
            width:150,
            sortable: false,
            show: true,
          },
          {
            prop: "lackStatusText",
            label: "缺货标识",
            width:80,
            sortable: false,
            show: true,
          },
          {
            prop: "isWholeText",
            label: "是否整托",
            width:80,
            sortable: false,
            show: true,
          },
          {
            prop: "wavePickTaskStateDesc",
            label: "任务状态",
            width:80,
            sortable: false,
            show: true,
          },
          {
            prop: "downTaskText",
            label: "任务下发",
            width:80,
            sortable: false,
            show: true,
          },
          {
            prop: "taskStatusDesc",
            label: "WCS任务状态",
            width:100,
            sortable: false,
            show: true,
          },
          {
            prop: "taskFinishedTime",
            label: "WCS任务完成时间",
            width:140,
            sortable: false,
            show: true,
          },
          {
            prop: "ownerCode",
            label: "货主",
            width:80,
            sortable: false,
            show: true,
          },
          {
            prop: "roadWayCode",
            label: "巷道编码",
            sortable: false,
            show: true,
          },
          {
            prop: "pickCargoLocationCode",
            label: "拣选位",
            sortable: false,
            show: true,
          },
          {
            prop: "pickContainerCode",
            label: "拣选容器",
            sortable: false,
            show: true,
          },
           {
            prop: "pickSubtrayCode",
            label: "子托盘号",
            width:120,
            sortable: false,
            show: true,
          },
          {
            prop: "productCode",
            label: "零件编码",
            width:120,
            sortable: false,
            show: true,
          },
          {
            prop: "productName",
            label: "零件名称",
            sortable: false,
            show: true,
          },
          {
            prop: "needQty",
            label: "要货数量",
            // prop: "needQty",
            // label: "要货数量",
            width:105,
            sortable: false,
            show: true,
          },
          {
            prop: "qty",
            label: "分配数量",
            width:80,
            sortable: false,
            show: true,
          },
          {
            prop: "pickQty",
            label: "已拣数量",
            width:80,
            sortable: false,
            show: true,
          },
          {
            prop: "batchNum",
            label: "零件批次",
            sortable: false,
            show: true,
          },
          {
            prop: "batchSupNum",
            label: "供应商批次",
            sortable: false,
            show: true,
          },
          {
            prop: "sendDate",
            label: "发货日期",
            width:140,
            sortable: false,
            show: true,
          },
          {
            prop: "reference",
            label: "参考号",
            sortable: false,
            show: true,
          },
          {
            prop: "shelf",
            label: "料架号",
            sortable: false,
            show: true,
          },
          {
            prop: "prodline",
            label: "产线代码",
            sortable: false,
            show: true,
          },
          {
            prop: "stageCode",
            label: "拣选工作台",
            width:90,
            sortable: false,
            show: true,
          },
          {
            prop: "creationTime",
            label: "创建时间",
            width:140,
            sortable: false,
            show: true,
          },
          {
            prop: "pickDate",
            label: "拣选时间",
            width:140,
            sortable: false,
            show: true,
          },
          {
            prop: "boxTypeDesc",
            label: "箱型",
            width:100,
            sortable: false,
            show: true,
          },
          // {
          //   prop: "",
          //   label: "拣选位",
          //   minWidth: "150",
          //   sortable: false,
          //   show: true,
          // },
          // {
          //   prop: "pickContainerCode",
          //   label: "拣选容器",
          //   minWidth: "150",
          //   sortable: false,
          //   show: true,
          // },
          // {
          //   prop: "pickQty",
          //   label: "实际拣选数量",
          //   minWidth: "150",
          //   sortable: false,
          //   show: true,
          // },
          // {
          //   prop: "createUser",
          //   label: "拣选人",
          //   minWidth: "150",
          //   sortable: false,
          //   show: true,
          // },
          // {
          //   prop: "",
          //   label: "拣选完成时间",
          //   minWidth: "150",
          //   sortable: false,
          //   show: true,
          // },
          // {
          //   prop: "",
          //   label: "关联任务号",
          //   minWidth: "150",
          //   sortable: false,
          //   show: true,
          // },
          // {
          //   prop: "",
          //   label: "客户名称",
          //   minWidth: "150",
          //   sortable: false,
          //   show: true,
          // },
          // {
          //   prop: "",
          //   label: "客户编码",
          //   minWidth: "150",
          //   sortable: false,
          //   show: true,
          // },
          // {
          //   prop: "",
          //   label: "制单人",
          //   minWidth: "150",
          //   sortable: false,
          //   show: true,
          // },
          // {
          //   prop: "creationTime",
          //   label: "创建时间",
          //   width:140,
          //   sortable: false,
          //   show: true,
          // },
          // {
          //   prop: "",
          //   label: "指定箱号",
          //   minWidth: "150",
          //   sortable: false,
          //   show: true,
          // },
          // {
          //   prop: "details",
          //   label: "详情",
          //   minWidth: "",
          //   fixed: "right",
          //   sortable: false,
          //   show: true,
          //   renderSlot: true,
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
