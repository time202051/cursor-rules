import { Point, StockInfo } from "@/api/request/swagger";
export default {
  data() {
    return {
      // 查询表单
      formSearchData: {
        reset: true, //重置
        expendShow: true, //展开
        value: {
          DocNo: null, //对应输入框的value字段
          QualityCheckStateType:null,
          QualityCheckState:null,
          timer: [],
        },
        tableSearch: [
          {
            label: "质检单号",
            value: "DocNo",
            inputType: "text",
          },
          {
            label: "质检类型",
            value: "QualityCheckStateType",
            inputType: "select",
            children: this.SET_enumsSelect({
              keyword: "qualityCheckTypeEnum",
            }),
          },
          {
            label: "质检状态",
            value: "QualityCheckState",
            inputType: "select",
            children: this.SET_enumsSelect({
              keyword: "qualityCheckStateEnum",
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
            label: "母托盘码",
            value: "ContainerCode",
            inputType: "text",
          },
          {
            label: "子托盘码",
            value: "SubtrayCode",
            inputType: "text",
          },
        ],
      },
      // 表格数据
      tableData: {
        loading: false,
        emptyImg: true,
        options: {
          entityName:"QualityCheckOrder",
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
            prop: "qualityCheckStateDesc",
            label: "质检状态",
            minWidth: "120",
            sortable: false,
            show: true,
          },
          {
            prop: "docNo",
            label: "质检单号",
            minWidth: "200",
            sortable: false,
            show: true,
          },
          {
            prop: "qualityCheckStateTypeDesc",
            label: "质检类型",
            minWidth: "120",
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
            prop: "warehouseName",
            label: "仓库",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "remark",
            label: "质检备注",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "details",
            label: "质检明细",
            minWidth: "130",
            sortable: false,
            show: true,
            renderSlot: true,
          },
          {
            prop: "qaulityCheckResult",
            label: "质检结果",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "createUser",
            label: "创建人",
            minWidth: "120",
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
        title: "质检单明细",
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
            label: "仓库",
            type: "select",
            prop: "warehouseCode",
            child: [],
            clearable: true,
          },
          {
            label: "货主",
            type: "select",
            prop: "ownerCode",
            child: [],
            clearable: true,
          },
          {
            label: "质检人员",
            type: "select",
            prop: "shipperName",
            child: [],
          },
          {
            label: "质检备注",
            type: "textarea",
            prop: "remark",
          },
        ],
        rules: {},
        value: {
          warehouseCode: "", //仓库
          ownerCode: "", //货主
          shipperName: "", //质检人员
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
