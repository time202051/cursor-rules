export default {
  data() {
    return {
      // 查询表单
      formSearchData: {
        reset: true, //重置
        expendShow: true, //展开
        value: {
          DocPlanNo: null, //对应输入框的value字段
          DocNo: null,
          Warehouse: null,
          ProductCode: null,
          OwnerCode: null,
          ProductBatch: null,
          SupplierBatch: null,
          BoxCode: null,
          SubtrayCode: null,
          ContainerCode: null,
          IltType: null,
          CargoLocation: null,
          timer: [],
        },
        tableSearch: [
          {
            label: "盘点计划单号",
            value: "DocPlanNo",
            inputType: "text",
          },
          {
            label: "盘点单号",
            value: "DocNo",
            inputType: "text",
          },
          {
            label: "盘点结果",
            value: "IltType",
            inputType: "select",
            children: this.SET_enumsSelect({
              keyword: "iltCheckResultEnum",
            }),
          },
          {
            label: "仓库",
            value: "Warehouse",
            inputType: "text",
          },
          {
            label: "零件编码",
            value: "ProductCode",
            inputType: "text",
          },
          {
            label: "货主编码",
            value: "OwnerCode",
            inputType: "text",
          },
          {
            label: "物料批次",
            value: "ProductBatch",
            inputType: "text",
          },
          {
            label: "供应商批次",
            value: "SupplierBatch",
            inputType: "text",
          },
          {
            label: "箱编码",
            value: "BoxCode",
            inputType: "text",
          },
          {
            label: "子容器编码",
            value: "SubtrayCode",
            inputType: "text",
          },
          {
            label: "母容器编码",
            value: "ContainerCode",
            inputType: "text",
          },
          {
            label: "盘点工位",
            value: "CargoLocation",
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
              format: "yyyy/MM/dd HH:mm:ss",
            },
          },
        ],
      },
      // 表格数据
      tableData: {
        loading: false,
        emptyImg: true,
        options: {
          entityName:"CheckRecord",
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
            prop: "docPlanNo",
            label: "盘点计划单号",
            minWidth: "200",
            sortable: false,
            show: true,
          },
          {
            prop: "docNo",
            label: "盘点单号",
            minWidth: "200",
            sortable: false,
            show: true,
          },
          {
            prop: "iltTypeDesc",
            label: "盘点结果",
            minWidth: "120",
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
            prop: "ownerCode",
            label: "货主编码",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "ownerName",
            label: "货主名称",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "productBatch",
            label: "物料批次",
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
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "boxCode",
            label: "箱编码",
            minWidth: "",
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
            prop: "containerCode",
            label: "母容器编码",
            minWidth: "130",
            sortable: false,
            show: true,
          },
          {
            prop: "amount",
            label: "数量",
            minWidth: "120",
            sortable: false,
            show: true,
          },
          {
            prop: "cargoLocation",
            label: "盘点工位",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "creationTime",
            label: "创建时间",
            minWidth: "150",
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
      detailsform: {
        outerVisible: false,
        title: "详情",
        row: {},
        requestData: {
          flage: "add",
          fn: this.getTable,
        },
      },
      createform: {
        outerVisible: false,
        title: "",
        model: [
          {
            label: "移位单号",
            type: "input",
            prop: "pointCode",
            readonly: true,
          },
          {
            label: "移位方式",
            prop: "stockRemoveState",
            type: "checkbox",
          },
          {
            label: "作业类型",
            type: "select",
            prop: "stockRemove",
            child: this.SET_enumsSelect({
              keyword: "stockRemove",
            }),
            clearable: false,
          },
          {
            label: "移位类型",
            type: "select",
            prop: "stockRemoveType",
            child: [],
            clearable: false,
          },
          {
            label: "移位备注",
            type: "textarea",
            prop: "remark",
          },
        ],
        rules: {
          // pointCode: [{ required: true, message: "必填", trigger: "blur" }],
          // pointName: [{ required: true, message: "必填", trigger: "blur" }],
        },
        value: {
          pointCode: "保存后自动生成", //移位单号
          stockRemoveState: true, //移位方式
          stockRemove: "", //作业类型
          stockRemoveType: "", //移位类型
          remark: "", //备注
        },
        requestData: {
          flage: "add",
          fn: this.getTable,
        },
      },
    };
  },
};
