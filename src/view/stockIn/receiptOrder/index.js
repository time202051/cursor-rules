export default {
  data() {
    return {
      // 查询表单
      formSearchData: {
        reset: true, //重置
        expendShow: true, //展开
        value: {
          BillNo: null, //对应输入框的value字段
          OrginalBillNo: null,
          StockInOrderState: null,
          timer: [],
          OrderBusinessType: null,
          SupplierCode: null,
          CreateUserCode:null
        },
        tableSearch: [
          {
            label: "通知单号",
            value: "BillNo",
            inputType: "text",
          },
          {
            label: "来源单号",
            value: "OrginalBillNo",
            inputType: "text",
          },
          {
            label: "单据状态",
            value: "StockInOrderState",
            inputType: "select",
            children: this.SET_enumsSelect({
              keyword: "stockInOrderStateEnum",
            }),
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
              format: "yyyy/MM/dd HH:mm:ss",
            },
          },
          {
            label: "业务类型",
            value: "OrderBusinessType",
            inputType: "select",
            children: this.SET_enumsSelect({
              keyword: "stockInBusinessTypeEnum",
            }),
          },
          {
            label: "供应商编码",
            value: "SupplierCode",
            inputType: "text",
          },
          {
            label: "创建人",
            value: "CreateUserCode",
            inputType: "text",
          },
          {
            label: "零件编号",
            value: "ProdcutCode",
            inputType: "text",
          },
        ],
      },
      // 表格数据
      tableData: {
        loading: false,
        emptyImg: true,
        options: {
          entityName:"StockIn",
          selection: true, //多选框
          index: null, //序号
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
            label: "序号",
            width: "60",
            type: "index",
            show: true,
          },
          {
            prop: "billNo",
            label: "收货订单号",
            minWidth: "200",
            sortable: false,
            show: true,
          },
          {
            prop: "orginalBillNo",
            label: "来源单号",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "company",
            label: "公司",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "warehouse",
            label: "仓库",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "stockInEnumDesc",
            label: "业务类型",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "supplierCode",
            label: "供应商编码",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "supplierName",
            label: "供应商名称",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "inOrderStateEnumDesc",
            label: "单据状态",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "remark",
            label: "单据备注",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "createUser",
            label: "创建人",
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
          {
            prop: "details",
            label: "详情",
            minWidth: "",
            sortable: false,
            show: true,
            fixed: "right",
            renderSlot: true,
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
      detailsform: {
        outerVisible: false,
        title: "详情",
        row: {},
        requestData: {
          flage: "add",
          fn: this.getTable,
        },
      },
    };
  },
};
