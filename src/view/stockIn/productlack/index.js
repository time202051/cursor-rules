import { Point, StockInfo } from "@/api/request/swagger";
export default {
  data() {
    return {
      // 查询表单
      formSearchData: {
        reset: true, //重置
        expendShow: true, //展开
        value: {},
        tableSearch: [
          {
            label: "版本",
            value: "Version",
            inputType: "text",
          },
          {
            label: "仓库编码",
            value: "WarehouseCode",
            inputType: "text",
          },
          {
            label: "货主",
            value: "OwnerCode",
            inputType: "text",
          },
          {
            label: "零件号",
            value: "ProductCode",
            inputType: "text",
          },
          {
            label: "缺料日期",
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
          entityName:"ProductLack",
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
            prop: "version",
            label: "版本",
            minWidth: "120",
            sortable: false,
            show: true,
          },
          {
            prop: "warehouseCode",
            label: "仓库编码",
            minWidth: "80",
            sortable: false,
            show: true,
          },
          {
            prop: "ownerCode",
            label: "货主",
            minWidth: "80",
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
            prop: "shortAgeDate",
            label: "缺料日期",
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
