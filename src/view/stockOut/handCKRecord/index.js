export default {
  data() {
    return {
      // 查询表单
      formSearchData: {
        reset: true, //重置
        expendShow: true, //展开
        value: {
          ContainerCode: null,
          SubtrayCode: null,
          Reason: null,
          timer: [],
        },
        tableSearch: [
          {
            label: "母托盘号",
            value: "ContainerCode",
            inputType: "text",
          },
          {
            label: "子托盘号",
            value: "SubtrayCode",
            inputType: "text",
          },
          {
            label: "原因代码",
            value: "Reason",
            inputType: "text",
          },
          {
            label: "零件编码",
            value: "ProductCode",
            inputType: "text",
          },
          {
            label: "创建时间",
            value: "timer",
            inputType: "picker",
            props: {
              type: "datetimerange",
              startPlaceholder: "开始时间",
              endPlaceholder: "结束时间",
              placeholder: "选择时间范围",
              format: "yyyy/MM/dd HH:mm:ss",
              valueFormat: "yyyy-MM-dd HH:mm:ss",
            },
          },
        ],
      },
      // 表格数据
      tableData: {
        loading: false,
        emptyImg: true,
        options: {
          entityName:"StockOutHistory",
          selection: true, //多选框
          index: true, //序号
          headTool: true, //开启头部工具栏
          refreshBtn: true, //开启表格头部刷新按钮
          downloadBtn: true, //开启表格头部下载按钮
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
            prop: "billNo",
            label: "出库流水号",
            minWidth: "200",
            sortable: false,
            show: true,
          },
          {
            prop: "statusDesc",
            label: "状态",
            minWidth: "120",
            sortable: false,
            show: true,
          },
          {
            prop: "containerCode",
            label: "母托盘号",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "subtrayCode",
            label: "子托盘号",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "boxCode",
            label: "箱号",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "productCode",
            label: "零件编码",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "productBatch",
            label: "零件批次",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "supplierBatch",
            label: "供应商批次",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "getCargoLocationCode",
            label: "出库库位",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "putCargoLocationCode",
            label: "目标库位",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "qty",
            label: "数量",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "completeDate",
            label: "出库完成时间",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "reason",
            label: "出库原因",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "taskNo",
            label: "关联任务号",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "createUserName",
            label: "操作员",
            minWidth: "",
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
      reasonForm: {
        dialogFormVisible: false,
        title: "原因设置",
      },
    };
  },
};
