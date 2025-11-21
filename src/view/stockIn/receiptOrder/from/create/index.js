import { render } from "nprogress";

export default {
  data() {
    return {
      dialogFormVisible: false,
      title: "新增收货订单",
      multipleSelection: [],
      index: 0,
      form: {
        orgId: "", // 公司
        warehouseId: "", // 仓库
        stockInTaskTypeEnum: "", // 业务类型
        supplierCode: "", //供应商编码
        supplierName: "", // 供应商名称
        remark: "", // 单据备注
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
          cellClassName: this.tableCellClassName,
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
            type: "index",
            label: "行号",
            width: "80",
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
            prop: "receivingTime",
            label: "收货日期",
            minWidth: "150",
            show: true,
          },
          {
            prop: "isNoStock",
            label: "是否寄售",
            minWidth: "120",
            show: true,
            renderSlot:true
          },
          {
            prop: "regionName",
            label: "上架库区",
            minWidth: "",
            columnType: "number",
            show: true,
          },
          {
            prop: "referenceCode",
            label: "参考号",
            minWidth: "",
            show: true,
          },
          {
            prop: "remark",
            label: "明细备注",
            minWidth: "",
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
        pagetionShow: false,
      },
      model: [
        {
          label: "公司",
          type: "select",
          prop: "orgId",
          child: [],
        },
        {
          label: "仓库",
          type: "select",
          prop: "warehouseId",
          child: [],
        },
        {
          label: "业务类型",
          type: "select",
          prop: "stockInTaskTypeEnum",
          child: [],
        },
        {
          label: "供应商编码",
          type: "input",
          prop: "supplierCode",
          input: this.supplierCodeInput,
        },
        {
          label: "供应商名称",
          type: "input",
          prop: "supplierName",
        },
        {
          label: "单据备注",
          type: "textarea",
          prop: "remark",
        },
      ],
      rules: {
        orgId: [{ required: true, message: "必填", trigger: "change" }],
        warehouseId: [{ required: true, message: "必填", trigger: "change" }],
        stockInTaskTypeEnum: [
          { required: true, message: "必填", trigger: "change" },
        ],
        supplierCode: [{ required: true, message: "必填", trigger: "blur" }],
      },
    };
  },
};
