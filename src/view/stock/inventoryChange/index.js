import { Point } from '@/api/request/swagger'
export default {
  data() {
    return {
      // 查询表单
      formSearchData: {
        reset: true,
        expendShow: true,
        value: {
          ProductCode: null,
          ContainerCode: null,
          BatchNo: null,
          HistoryType: null,
          SubtrayCode:null,
          BoxCode:null,
          timer:[],
        },
        tableSearch: [
          {
            label: "零件编码",
            value: "ProductCode",
            inputType: "text",
          },
          {
            label: "容器编码",
            value: "ContainerCode",
            inputType: "text",
          },
          {
            label: "零件批次",
            value: "BatchNo",
            inputType: "text",
          },
          {
              label: "创建时间",
              value: "timer",
              inputType: "picker",
              props: {
                  type: 'datetimerange',
                  startPlaceholder: "开始时间",
                  endPlaceholder: "结束时间",
                  placeholder: "选择时间范围",
                  valueFormat: 'yyyy-MM-dd HH:mm:ss',
              }
          },
          {
            label: "作业类型",
            value: "HistoryType",
            inputType: "select",
            children: this.SET_enumsSelect({
              keyword: "historyTypeEnum",
            }),
          },
           {
            label: "零件存货属性",
            value: "ProductType",
            inputType: "select",
            children: this.SET_enumsSelect({
              keyword: "productTypeEnum",
            }),
          },
          {
            label: "子托盘编码",
            value: "SubtrayCode",
            inputType: "text",
          },
          {
            label: "箱编号",
            value: "BoxCode",
            inputType: "text",
          },
        ],
      },
      tableData: {
        redRow: true, // 当前行变红，一个标识
        loading: false,
        emptyImg: true,
        options: {
          entityName:"StockHistory",
          selection: true, // 多选框
          selection: false, // 多选框
          index: true, // 序号
          headTool: true, // 开启头部工具栏
          refreshBtn: true, // 开启表格头部刷新按钮
          downloadBtn: true, // 开启表格头部下载按钮
        }, // 序号和复选框
        rows: [], // 表数据
        columns: [
          {
            label: "",
            minWidth: "",
            type: "selection",
            show: true,
          },
          {
            prop: "historyTypeDesc",
            label: "作业类型",
            minWidth: "120",
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
            prop: "minPackageQty",
            label: "最小包装数",
            minWidth: "120",
            sortable: false,
            show: true,
          },
          {
            prop: "unitCode",
            label: "最小单位",
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
            prop: "receivingTime",
            label: "收货日期",
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
            prop: "regionName",
            label: "作业库区",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "cargoLocationCode",
            label: "库位编码",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "containerType",
            label: "容器类型",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "containerCode",
            label: "容器编码",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "subtrayCode",
            label: "子托盘",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "boxCode",
            label: "箱号",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "changeQty",
            label: "变动数量",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "createUser",
            label: "操作人",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "creationTime",
            label: "操作时间",
            minWidth: "",
            sortable: false,
            show: true,
          },
        ], // 表头
        operates: [], // 表格里面的操作按钮
        tableHeightDiff: 300,
      },
      paginations: {
        page: 1, // 当前位于那页面
        total: 10, // 总数
        limit: 20, // 一页显示多少条
        pagetionShow: true,
      },
      form: {
        dialogFormVisible: false,
        title: "",
        model: [
          {
            label: "编码",
            type: "input",
            prop: "stationCode",
          },
          {
            label: "名称",
            type: "input",
            prop: "stationName",
          },
          {
            label: "所属区域",
            type: "select",
            prop: "regionId",
            child: [],
          },
          {
            label: "启用",
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
          stationCode: [{ required: true, message: "必填", trigger: "blur" }],
          stationName: [{ required: true, message: "必填", trigger: "blur" }],
          regionId: [{ required: true, message: "必填", trigger: "blur" }],
        },
        value: {
          stationCode: "",
          regionId: "",
          stationName: "",
          remark: "",
          enabled: true,
        },
        requestData: {
          flage: "add",
          url: Point.station,
          fn: this.getTable,
        },
      },
    };
  }
}
