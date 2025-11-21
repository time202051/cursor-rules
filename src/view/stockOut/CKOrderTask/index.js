import { AGV } from "@/api/request/swagger";
export default {
  data() {
    return {
      // 查询表单
      formSearchData: {
        reset: true,
        expendShow: true,
        value: {
          timer: [],
        },
        tableSearch: [
          {
            label: "来源单号",
            value: "SourceNo",
            inputType: "text",
          },
          {
            label: "单据类型",
            value: "Type",
            inputType: "select",
            children: this.SET_enumsSelect({
              keyword: "businessTypeEnums",
            }),
          },
          {
            label: "单据状态",
            value: "OderState",
            inputType: "select",
            children: this.SET_enumsSelect({
              keyword: "orderStateEnum",
            }),
          },
          {
            label: "任务状态",
            value: "WavePickTaskState",
            inputType: "select",
            children: this.SET_enumsSelect({
              keyword: "wavePickTaskStateEnum",
            }),
          },
          {
            label: "零件号",
            value: "ProductCode",
            inputType: "text",
          },
          {
            label: "任务耗时(分)",
            value: "TaskDuration",
            inputType: "number",
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
      tableData: {
        loading: false,
        emptyImg: true,
        options: {
          // entityName:"Stock",
          selection: true, // 多选框
          index: true, // 序号
          headTool: true, // 开启头部工具栏
          refreshBtn: true, // 开启表格头部刷新按钮
          downloadBtn: true, // 开启表格头部下载按钮
        }, // 序号和复选框
        rows: [], // 表数据
        columns: [
          {
            prop: "sourceNo",
            label: "来源单号",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "typeDesc",
            label: "单据类型",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "oderStateDesc",
            label: "单据状态",
            minWidth: "100",
            sortable: false,
            show: true,
          },
          {
            prop: "productCode",
            label: "零件号",
            minWidth: "100",
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
          {
            prop: "needTime",
            label: "需求时间",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "comletedTime",
            label: "完成时间",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "billDuration",
            label: "单据耗时(分)",
            minWidth: "100",
            sortable: false,
            show: true,
          },
          {
            prop: "lackStatusText",
            label: "是否缺货",
            minWidth: "80",
            sortable: false,
            show: true,
          },

           {
            prop: "isWholeText",
            label: "是否整托",
            minWidth: "80",
            sortable: false,
            show: true,
          },
           {
            prop: "wavePickTaskStateDesc",
            label: "拣货单状态",
            minWidth: "100",
            sortable: false,
            show: true,
          },
           {
            prop: "roadWayCode",
            label: "出库巷道",
            minWidth: "",
            sortable: false,
            show: true,
          },
           {
            prop: "containerCode",
            label: "容器号",
            minWidth: "",
            sortable: false,
            show: true,
          },
           {
            prop: "wcsCreationTime",
            label: "wcs任务创建时间",
            minWidth: "",
            sortable: false,
            show: true,
          },
           {
            prop: "wcsDownTaskTime",
            label: "wcs任务下发时间",
            minWidth: "",
            sortable: false,
            show: true,
          },
           {
            prop: "wcsStartTime",
            label: "wcs任务开始时间",
            minWidth: "",
            sortable: false,
            show: true,
          },
           {
            prop: "wcsComletedTime",
            label: "wcs任务结束时间",
            minWidth: "",
            sortable: false,
            show: true,
          },
           {
            prop: "agvComletedTime",
            label: "agv任务结束时间",
            minWidth: "",
            sortable: false,
            show: true,
          },
           {
            prop: "pickDate",
            label: "拣选时间",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "taskDuration",
            label: "任务耗时(分)",
            minWidth: "",
            sortable: false,
            show: true,
          },
           {
            prop: "putCargoLocationCode",
            label: "拣选位置",
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
      detailsform: {
        outerVisible: false,
        title: "详情",
        row: {},
        requestData: {
          flage: "add",
          fn: this.getTable,
        },
      },
      form: {
        dialogFormVisible: false,
        title: "",
        carCodes: [],
        model: [
          {
            label: "小车编码",
            type: "checkbox",
            prop: "carCodes",
          },
        ],
        rules: {
          // taskCode: [{ required: true, message: "必填", trigger: "blur" }],
          // method: [{ required: true, message: "必填", trigger: "blur" }],
        },
        value: {
          carCodes: [],
          // taskCode:"",
          // method: "end",
          // cache:"true"
        },
        requestData: {
          flage: "add",
          url: AGV.callback,
          fn: this.getTable,
          flages: true, // 特殊页面   弹框标识 flages 参数接在url 后面
        },
      },
    };
  },
};
