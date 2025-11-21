export default {
  data() {
    return {
      // 查询表单
      formSearchData: {
        reset: true, //重置
        expendShow: true, //展开
        value: {
          ILTDocNo: null, //对应输入框的value字段
          ILTType: null,
          ILTState: null,
          ProductCode:null,
          ProductName:null,
          ProductBatch:null,
          SupplierBatch:null,
          ReferenceCode:null,
          ContainerCode:null,
          SubtrayCode:null,
          timer:null
        },
        tableSearch: [
          {
            label: "盘点单号",
            value: "ILTDocNo",
            inputType: "text",
          },
          {
            label: "盘点类型",
            value: "ILTType",
            inputType: "select",
            children: this.SET_enumsSelect({
              keyword: "iltTypeEnum",
            }),
          },
          {
            label: "盘点状态",
            value: "ILTState",
            inputType: "select",
            children: this.SET_enumsSelect({
              keyword: "iltStateEnum",
            }),
          },
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
      // 表格数据
      tableData: {
        loading: false,
        emptyImg: true,
        options: {
          entityName:"ILT",
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
            prop: "iLTStateDesc",
            label: "盘点状态",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "docNo",
            label: "盘点单号",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "iLTTypeDesc",
            label: "盘点类型",
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
            prop: "region",
            label: "区域",
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
            prop: "details",
            label: "详情",
            minWidth: "",
            sortable: false,
            show: true,
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
        dialogFormVisible: false,
        title: "盘点单明细详情",
        row: {},
        requestData: {
          flage: "add",
          fn: this.getTable,
        },
      },
    };
  },
};
