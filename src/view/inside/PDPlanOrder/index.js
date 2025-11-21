export default {
  data() {
    return {
      // 查询表单
      formSearchData: {
        reset: true, //重置
        expendShow: true, //展开
        value: {
          ILTPlanDocNo: null, //对应输入框的value字段
          ILTPlanState: null,
          ILTType: null,
          ProductCode: null,
          ProductBatch: null,
          timer: [],
          Quality: null,
        },
        tableSearch: [
          {
            label: "盘点计划单号",
            value: "ILTPlanDocNo",
            inputType: "text",
          },
          {
            label: "盘点状态",
            value: "ILTPlanState",
            inputType: "select",
            children: this.SET_enumsSelect({
              keyword: "iltPlanStateEnum",
            }),
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
            label: "零件编码",
            value: "ProductCode",
            inputType: "text",
          },
          {
            label: "零件批次",
            value: "ProductBatch",
            inputType: "text",
          },
          {
            label: "库存锁定属性",
            value: "Quality",
            inputType: "select",
            children: [
              {
                key: "0",
                value: "隔离",
              },
              { key: "1", value: "正常" },
              { key: "2", value: "待检" },
            ],
          },
          {
            label: "零件属性",
            value: "AttributeType",
            inputType: "select",
            children: this.SET_enumsSelect({
              keyword: "attributeTypeEnum",
            }),
          },
        ],
      },
      // 表格数据
      tableData: {
        loading: false,
        emptyImg: true,
        options: {
          entityName:"ILTPlan",
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
            prop: "iLTPlanStateDesc",
            label: "盘点状态",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "iLTPlanDocNo",
            label: "盘点计划单号",
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
          // {
          //   prop: "",
          //   label: "盘点区域",
          //   minWidth: "",
          //   sortable: false,
          //   show: true,
          // },
          {
            prop: "attributeTypeDesc",
            label: "零件属性",
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
            prop: "productBatch",
            label: "零件批次",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "planStartTime",
            label: "计划开始时间",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "planEndTime",
            label: "计划结束时间",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "remark",
            label: "盘点备注",
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
      createForm: {
        dialogFormVisible: false,
        title: "",
        requestData: {
          flage: "add",
          fn: this.getTable,
        },
      },
    };
  },
};
