export default {
  data() {
    return {
      multipleSelection: [],
      // 查询表单
      formSearchData: {
        reset: true, //重置
        expendShow: false, //展开
        value: {
          ProductCode: null, //对应输入框的value字段
          ProductBatch: null,
        },
        tableSearch: [
          {
            label: "零件编码",
            value: "ProductCode",
            inputType: "text",
          },
          {
            label: "零件批次",
            value: "ProductBatch",
            inputType: "text",
          },
        ],
      },
      tableData: {
        loading: false,
        emptyImg: true,
        options: {
          entityName:"PackingInformation",
          selection: true, //多选框
          index: null, //序号
          headTool: false, //开启头部工具栏
          refreshBtn: false, //开启表格头部刷新按钮
          downloadBtn: false, //开启表格头部下载按钮
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
            prop: "rhcode",
            label: "原因码",
            minWidth: "100",
            sortable: false,
            show: true,
          },
          {
            prop: "boxCode",
            label: "箱编号",
            minWidth: "200",
            sortable: false,
            show: true,
          },
          {
            prop: "containecode",
            label: "容器编码",
            minWidth: "130",
            sortable: false,
            show: true,
          },
          {
            prop: "subtrayCode",
            label: "子容器编码",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "productCode",
            label: "零件编码",
            minWidth: "200",
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
            prop: "batch",
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
            prop: "receivingTime",
            label: "收货日期",
            minWidth: "150",
            sortable: false,
            show: true,
          },
          {
            prop: "referenceCode",
            label: "参考号",
            minWidth: "130",
            sortable: false,
            show: true,
          },
          {
            prop: "qty",
            label: "箱装数量",
            minWidth: "100",
            sortable: false,
            show: true,
          },
          {
            prop: "qualityDesc",
            label: "质检状态",
            minWidth: "120",
            sortable: false,
            show: true,
          },
          {
            prop: "informationEnumDesc",
            label: "库存状态",
            minWidth: "120",
            sortable: false,
            show: true,
          },
          {
            prop: "isSampleText",
            label: "是否样件",
            minWidth: "100",
            sortable: false,
            show: true,
          },
          {
            prop: "stockInTime",
            label: "入库时间",
            minWidth: "150",
            sortable: false,
            show: true,
          },
          {
            prop: "stockOutTime",
            label: "出库时间",
            minWidth: "150",
            sortable: false,
            show: true,
          },
        ], // 表头
        operates: [], //表格里面的操作按钮
        tableHeightDiff: 400,
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
