import { Basic } from "@/api/request/swagger";
export default {
  data() {
    return {
      // 查询表单
      formSearchData: {
        reset: true,
        expendShow: false,
        value: {
          SupplierCode: null,
          SupplierName: null,
          Contacts: null,
          timer: [],
        },
        tableSearch: [
          {
            label: "供应商编码",
            value: "SupplierCode",
            inputType: "text",
          },
          {
            label: "供应商名称",
            value: "SupplierName",
            inputType: "text",
          },
          {
            label: "联系人",
            value: "Contacts",
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
      tableData: {
        loading: false,
        emptyImg: true,
        options: {
          entityName:"Supplier",
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
            prop: "orgCode",
            label: "公司编码",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "contacts",
            label: "联系人",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "telephone",
            label: "联系电话",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "address",
            label: "地址",
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
            show: true,
          },
          {
            prop: "createTime",
            label: "创建时间",
            minWidth: "",
            show: true,
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
      form: {
        dialogFormVisible: false,
        title: "",
        titleAdd: true,
        model: [
          {
            label: "供应商编码",
            type: "input",
            prop: "supplierCode",
          },
          {
            label: "供应商名称",
            type: "input",
            prop: "supplierName",
          },
          {
            label: "归属公司",
            type: "select",
            prop: "orgId",
            child: [],
            clearable: false,
          },
          {
            label: "联系人",
            type: "input",
            prop: "contacts",
          },
          {
            label: "联系人电话",
            type: "input",
            prop: "telephone",
          },
          {
            label: "状态",
            type: "switch",
            prop: "enabled",
          },
          {
            label: "联系人地址",
            type: "textarea",
            prop: "address",
          },
          {
            label: "备注",
            type: "textarea",
            prop: "remark",
          },
        ],
        rules: {
          supplierCode: [{ required: true, message: "必填", trigger: "blur" }],
          supplierName: [{ required: true, message: "必填", trigger: "blur" }],
          telephone: [
            { required: false, message: "必填", trigger: "blur" },
            {
              pattern: /^1[3|5|7|8|9]\d{9}$/,
              message: "手机号格式不正确",
              trigger: "blur",
            },
          ],
          orgId: [{ required: true, message: "必填", trigger: "change" }],
        },
        value: {
          supplierCode: "",
          supplierName: "",
          orgId: "",
          contacts: "",
          telephone: "",
          address: "",
          enabled: true,
        },
        requestData: {
          flage: "add",
          url: Basic.handleSupplier,
          fn: this.getTable,
        },
      },
    };
  },
};
