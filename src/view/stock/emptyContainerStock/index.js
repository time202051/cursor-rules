import { Point } from '@/api/request/swagger'
export default {
  data() {
    return {
      // 查询表单
      formSearchData: {
        reset: true,
        expendShow: false,
        value: {
          ProductCode: null,
          ContainerCode: null,
          BatchNo: null,
          // OrginalBillNo: null,
          HistoryType: null,
          // Enabled:null,
          // timer:[],
        },
        tableSearch: [
          {
            label: "库位编码",
            value: "",
            inputType: "text",
          }
        ],
      },
      tableData: {
        redRow: true, // 当前行变红，一个标识
        loading: false,
        emptyImg: true,
        options: {
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
            prop: "",
            label: "库位编码",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "",
            label: "容器类型",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "",
            label: "数量",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "",
            label: "入库时间",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "",
            label: "出库时间",
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
