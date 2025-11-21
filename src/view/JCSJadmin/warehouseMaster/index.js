import { Basic } from "@/api/request/swagger";
export default {
  data() {
    return {
      // 查询表单
      formSearchData: {
        reset: true,
        expendShow: false,
        value: {
          WarehouseCode: null,
          WarehouseName: null,
        },
        tableSearch: [
          {
            label: "仓库编码",
            value: "WarehouseCode",
            inputType: "text",
          },
          {
            label: "仓库名称",
            value: "WarehouseName",
            inputType: "text",
          },
        ],
      },
      tableData: {
        loading: false,
        emptyImg: true,
        options: {
          selection: true, //多选框
          index: null, //序号
          headTool: true, //开启头部工具栏
          refreshBtn: true, //开启表格头部刷新按钮
          downloadBtn: true, //开启表格头部下载按钮
          entityName:"Warehouse"
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
            prop: "warehouseCode",
            label: "仓库编码",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "warehouseName",
            label: "仓库名称",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "enabledDesc",
            label: "状态",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "createdUser",
            label: "创建人",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "createTime",
            label: "创建时间",
            minWidth: "",
            show: true,
          },
          {
            prop: "classes",
            label: "班次",
            minWidth: "",
            show: true,
            renderSlot: true,
          },
          {
            prop: "remark",
            label: "备注",
            minWidth: "",
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
      configFrom: {
        dialogFormVisible: false,
        row: {},
      },
      form: {
        dialogFormVisible: false,
        title: "",
        model: [
          {
            label: "仓库编码",
            type: "input",
            prop: "warehouseCode",
          },
          {
            label: "仓库名称",
            type: "input",
            prop: "warehouseName",
          },
          {
            label: "状态",
            type: "switch",
            prop: "enabled",
          },
          {
            label: "备注",
            type: "textarea",
            prop: "remark",
          },
        ],
        rules: {
          warehouseCode: [{ required: true, message: "必填", trigger: "blur" }],
          warehouseName: [{ required: true, message: "必填", trigger: "blur" }],
        },
        value: {
          warehouseCode: "",
          warehouseName: "",
          enabled: true,
          remark: "",
        },
        requestData: {
          flage: "add",
          url: Basic.handleWarehose,
          fn: this.getTable,
        },
      },
    };
  },
};
