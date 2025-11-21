import { Basic } from "@/api/request/swagger";
export default {
  data() {
    return {
      // 查询表单
      formSearchData: {
        reset: true,
        expendShow: false,
        value: {
          Code: null,
        },
        tableSearch: [
          {
            label: "通道编码",
            value: "Code",
            inputType: "text",
          },
        ],
      },
      tableData: {
        loading: false,
        emptyImg: true,
        options: {
          selection: true, // 多选框
          index: null, // 序号
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
            prop: "code",
            label: "通道编码",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "roadWayName",
            label: "通道名称",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "",
            label: "通道类型",
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
            prop: "creatorName",
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
            prop: "remark",
            label: "备注",
            minWidth: "",
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
        titleAdd: false,
        title: "",
        model: [
          {
            label: "通道编码",
            type: "input",
            prop: "code",
          },
          {
            label: "通道名称",
            type: "input",
            prop: "roadWayName",
          },
          {
            label: "通道类型",
            type: "select",
            prop: "",
            child: [],
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
            length: 250,
          },
        ],
        rules: {
          //通道编码、通道名称、通道类型必填
          code: [{ required: true, message: "必填", trigger: "blur" }],
          roadWayName: [{ required: true, message: "必填", trigger: "blur" }],
        },
        value: {
          code: "",
          roadWayName: "",
          enabled: true,
          remark: "",
          freeBits: 0,
        },
        requestData: {
          flage: "add",
          // url: Basic.handleRoadwayList,
          fn: this.getTable,
        },
      },
    };
  },
};
