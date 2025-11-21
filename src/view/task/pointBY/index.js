export default {
  data() {
    return {
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
            prop: "taskNo",
            label: "任务编号",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "getCargoLocationCode",
            label: "起始区域",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "putCargoLocationCode",
            label: "目的产线",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "currentPositionCode",
            label: "目前所在地",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "remark",
            label: "备注",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "action",
            label: "操作",
            minWidth: "",
            sortable: false,
            show: true,
            renderSlot: true,
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
        dialogVisible: false,
        title: "",
        width: "60%",
        requestData: {
          fn: this.getTable,
          params: null,
        },
      },
    };
  },
};
