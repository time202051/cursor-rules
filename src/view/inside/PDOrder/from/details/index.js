export default {
  data() {
    return {
      // 查询表单
      formSearchData: {
        reset: true, //重置
        expendShow: true, //展开
        value: {
          ProductCode: null,
          ProductName: null,
          ProductBatch: null,
          SupplierBatch: null,
          ReferenceCode: null,
          ContainerCode: null,
          SubtrayCode: null,
          timer: null,
        },
        tableSearch: [
          {
            label: "零件编码",
            value: "ProductCode",
            inputType: "text",
          },
          {
            label: "零件名称",
            value: "ProductName",
            inputType: "text",
          },
          {
            label: "零件批次",
            value: "ProductBatch",
            inputType: "text",
          },
          {
            label: "供应商批次",
            value: "SupplierBatch",
            inputType: "text",
          },
          {
            label: "参考号",
            value: "ReferenceCode",
            inputType: "text",
          },
          {
            label: "母托盘码",
            value: "ContainerCode",
            inputType: "text",
          },
          {
            label: "子托盘码",
            value: "SubtrayCode",
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
              valueFormat: "yyyy-MM-dd HH:mm:ss",
            },
          },
        ],
      },
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
            label: "行号",
            width: "80",
            type: "index",
            show: true,
          },
          {
            prop: "iLTResultDesc",
            label: "明细状态",
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
            prop: "productName",
            label: "零件名称",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "unit",
            label: "单位",
            minWidth: "120",
            sortable: false,
            show: true,
          },
          {
            prop: "stockQty",
            label: "账面数量",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "realQty",
            label: "实盘数量",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "productBatch",
            label: "批次",
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
            prop: "containerCode",
            label: "母托盘码",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "subtrayCode",
            label: "子托盘码",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "checkCargoLocationCode",
            label: "盘点支架",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "iLTCompeltedTime",
            label: "盘点完成时间",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "iLTUser",
            label: "操作人",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "boxNos",
            label: "箱号",
            minWidth: "",
            sortable: false,
            show: true,
            renderSlot: true,
          },
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
        title: "箱号详情",
        row: {},
        requestData: {
          flage: "add",
          fn: this.getTable,
        },
      },
    };
  },
};
