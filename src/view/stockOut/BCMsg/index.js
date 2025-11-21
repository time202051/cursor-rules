import { Point, OutBound } from "@/api/request/swagger";
export default {
  data() {
    return {
      // 查询表单
      formSearchData: {
        reset: true,
        expendShow: true,
        value: {
          WaveNumber: null,
          WaveStateEnum: null,
          WaveType: null,
          timer: [],
          SourceNo: null,
          ProductCode: null,
          Prodline: null,
        },
        tableSearch: [
          {
            label: "关联上游单号",
            value: "SourceNo",
            inputType: "text",
          },
          {
            label: "波次状态",
            value: "WaveStateEnum",
            inputType: "select",
            children: this.SET_enumsSelect({
              keyword: "waveStateEnum",
            }),
          },
          {
            label: "波次类型",
            value: "WaveType",
            inputType: "select",
            children: this.SET_enumsSelect({
              keyword: "waveTypeEnum",
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
            label: "波次号",
            value: "WaveNumber",
            inputType: "text",
          },
          {
            label: "零件编码",
            value: "ProductCode",
            inputType: "text",
          },
          {
            label: "空箱产线",
            value: "Prodline",
            inputType: "text",
          },
        ],
      },
      tableData: {
        loading: false,
        emptyImg: true,
        options: {
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
          // {
          //   prop: "init",
          //   label: "序号",
          //   minWidth: "50",
          //   sortable: false,
          //   show: true,
          // },
          {
            prop: "waveNumber",
            label: "波次号",
            minWidth: "200",
            sortable: false,
            show: true,
          },
          {
            prop: "sourceNo",
            label: "关联上游单号",
            minWidth: "200",
            sortable: false,
            show: true,
          },
          {
            prop: "lack",
            label: "缺货状态",
            minWidth: "120",
            show: true,
            renderSlot: true,
          },
          {
            prop: "waveStateDesc",
            label: "波次状态",
            minWidth: "120",
            sortable: false,
            show: true,
          },
          // {
          //   prop: "remark",
          //   label: "波次描述",
          //   minWidth: "",
          //   sortable: false,
          //   show: true,
          // },
          {
            prop: "waveTypeDesc",
            label: "类型",
            minWidth: "120",
            sortable: false,
            show: true,
          },
          {
            prop: "wavePickingTime",
            label: "波次开始时间",
            minWidth: "160",
            sortable: false,
            show: true,
          },
          {
            prop: "waveEndTime",
            label: "波次完成时间",
            minWidth: "160",
            sortable: false,
            show: true,
          },
          {
            prop: "date",
            label: "发货时间",
            minWidth: "160",
            sortable: false,
            show: true,
          },
          {
            prop: "planTime",
            label: "计划备货时间",
            minWidth: "160",
            show: true,
          },
          {
            prop: "lackDate",
            label: "缺货时间",
            minWidth: "160",
            show: true,
          },
          {
            prop: "waveShipperCount",
            label: "波次客户数量",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "waveOrderCount",
            label: "波次订单数量",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "pickSchedule",
            label: "拣选进度",
            minWidth: "130",
            sortable: false,
            show: true,
          },
          {
            prop: "craeteUserName",
            label: "制单人",
            minWidth: "120",
            sortable: false,
            show: true,
          },
          {
            prop: "creationTime",
            label: "创建时间",
            minWidth: "160",
            show: true,
          },
          {
            prop: "details",
            label: "详情",
            fixed: "right",
            minWidth: "100",
            show: true,
            renderSlot: true,
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
        title: "波次创建",
        model: [
          // {
          //   label: "存货类别",
          //   type: "select",
          //   prop: "pointCode",
          //   child: this.SET_enumsSelect({
          //     keyword: "productTypeEnum",
          //   }),
          //   change:this.productTypeEnumchange
          // },
          // {
          //   label: "test",
          //   type: "select",
          //   prop: "test",
          //   disabled:true,
          //   child: []
          // },

          {
            label: "拣选时间",
            type: "date",
            prop: "pointName",
            props: {
              type: "datetimerange",
              startPlaceholder: "开始时间",
              endPlaceholder: "结束时间",
              defaultTime: ["00:00:00", "23:59:59"],
            },
          },

          {
            label: "备注",
            type: "textarea",
            prop: "remark",
          },
        ],
        rules: {
          // pointCode: [{required: true, message: "必填", trigger: "blur"}],
          pointName: [{ required: true, message: "必填", trigger: "blur" }],
        },
        value: {
          pointCode: "",
          pointName: "",
          remark: "",
          test: "",
        },
        requestData: {
          flage: "add",
          url: Point.point,
          fn: this.getTable,
        },
      },
      orderform: {
        dialogFormVisible: false,
        title: "波次调订单",
        requestData: {
          flage: "add",
          url: Point.point,
          fn: this.getTable,
        },
      },
      BCGoosform: {
        dialogFormVisible: false,
        title: "波次发货处理",
        requestData: {
          flage: "add",
          url: Point.point,
          fn: this.getTable,
        },
      },
      //调整备料时间表单
      adjustTimeForm: {
        dialogFormVisible: false,
        title: "调整备料时间",
        width: "35%",
        model: [
          {
            label: "调整后时间",
            placeholder: "请选择调整后的时间",
            type: "date",
            prop: "planTime",
            props: {
              type: "datetime",
              format: "yyyy/MM/dd HH:mm",
              valueFormat: "yyyy/MM/dd HH:mm",
            },
          },
        ],
        rules: {
          planTime: [{ required: true, message: "必填", trigger: "blur" }],
        },
        value: {
          planTime: "",
        },
        requestData: {
          flage: "add",
          flages: true,
          url: OutBound.adjustTimeBCMsg,
          fn: this.getTable,
          joinData: ["planTime"], //拼接在url后面的字段
        },
      },
      //详情表单
      detailsform: {
        outerVisible: false,
        title: "详情",
        row: {},
        requestData: {
          flage: "add",
          url: Point.point,
          fn: this.getTable,
        },
      },
    };
  },
};
