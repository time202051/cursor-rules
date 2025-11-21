import { Point, AuditLogging } from "@/api/request/swagger";
export default {
  data() {
    return {
      // 查询表单
      formSearchData: {
        reset: true,
        expendShow: true,
        value: {
          UserName: null,
          PointName: null,
          HasException: null,
          timer: [],
          Url: null,
          ClientIpAddress: null,

          // LoadState: null,
          // Enabled: null,
          // Ascription: null,
          // tunnelId:null,
          // StockOutStationId:null,
        },
        tableSearch: [
          {
            label: "方法名称",
            value: "PointName",
            inputType: "text",
          },
          {
            label: "接口地址",
            value: "Url",
            inputType: "text",
          },
          {
            label: "接口入参",
            value: "Parameters",
            inputType: "text",
          },
          {
            label: "ip地址",
            value: "ClientIpAddress",
            inputType: "text",
          },
          {
            label: "是否出现异常",
            value: "HasException",
            inputType: "select",
            children: [
              {
                key: true,
                value: "是",
              },
              {
                key: false,
                value: "否",
              },
            ],
          },
          {
            label: "操作用户",
            value: "UserName",
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
              format: "yyyy/MM/dd HH:mm:ss",
              valueFormat: "yyyy-MM-dd HH:mm:ss",
            },
          },
          // {
          //     label: "所属区域",
          //     value: "Region",
          //     inputType: "select",
          //     children: this.SET_enumsSelect({
          //         keyword: "regionEnum",
          //     }),
          // },
          // {
          //     label: "备件工位",
          //     value: "StockOutStationId",
          //     inputType: "select",
          //     children: [],
          // },
          // {
          //     label: "通道",
          //     value: "tunnelId",
          //     inputType: "select",
          //     children: [],
          // },
          // {
          //     label: "所属工位",
          //     value: "StationId",
          //     inputType: "select",
          //     children: [],
          // },
          // {
          //     label: "点位归属",
          //     value: "Ascription",
          //     inputType: "select",
          //     children: this.SET_enumsSelect({
          //         keyword: "ascription",
          //     }),
          // },
          // {
          //     label: "使用状态",
          //     value: "UserState",
          //     inputType: "select",
          //     children: this.SET_enumsSelect({
          //         keyword: "usageStatusEnum",
          //     }),
          // },
          // {
          //     label: "承载状态",
          //     value: "LoadState",
          //     inputType: "select",
          //     children: this.SET_enumsSelect({
          //         keyword: "loadStatusEnum",
          //     }),
          // },
          // {
          //     label: "启用状态",
          //     value: "Enabled",
          //     inputType: "select",
          //     children: this.SET_enumsSelect({
          //         keyword: "enableStatusEnum",
          //     }),
          // },
        ],
      },
      tableData: {
        loading: false,
        emptyImg: true,
        options: {
          // entityName:"SysAuditLog",
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
            prop: "methodName",
            label: "方法名称",
            minWidth: "180",
            sortable: false,
            show: true,
          },
          {
            prop: "url",
            label: "接口地址",
            minWidth: "150",
            sortable: false,
            show: true,
          },
          {
            prop: "parameters",
            label: "接口入参",
            minWidth: "300",
            sortable: false,
            show: true,
          },
          {
            prop: "executionDuration",
            label: "执行时长",
            minWidth: "100",
            sortable: false,
            show: true,
          },
          {
            prop: "exceptions",
            label: "异常信息",
            minWidth: "300",
            sortable: false,
            show: true,
          },

          {
            prop: "executionTime",
            label: "执行时间",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "httpStatusCode",
            label: "请求状态码",
            minWidth: "",
            show: true,
          },
          {
            prop: "httpMethod",
            label: "请求方式",
            minWidth: "",
            show: true,
          },
          {
            prop: "clientIpAddress",
            label: "调用方法IP",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "clientName",
            label: "客户端名称",
            minWidth: "",
            sortable: false,
            show: true,
          },

          {
            prop: "browserInfo",
            label: "浏览器信息",
            minWidth: "300",
            sortable: false,
            show: true,
          },


          {
            prop: "comments",
            label: "备注",
            minWidth: "",
            show: true,
          },
          {
            prop: "userName",
            label: "操作用户",
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
      form: {
        dialogFormVisible: false,
        title: "",
        model: [
          {
            label: "方法名",
            type: "input",
            prop: "methodName",
            readonly: true,
            width: "100%",
          },
          {
            label: "接口参数",
            type: "json",
            prop: "parameters",
            readonly: true,
            width: "100%",
          },
          {
            label: "异常",
            type: "textarea",
            prop: "exceptions",
            readonly: true,
          },
          {
            label: "备注",
            type: "textarea",
            prop: "comments",
            readonly: true,
          },
        ],
        rules: {
          // serviceName: [{ required: true, message: "必填", trigger: "blur" }],
          // methodName: [{ required: true, message: "必填", trigger: "blur" }],
          // parameters: [{ required: true, message: "必填", trigger: "blur" }],
        },
        value: {
          // serviceName: "",
          // methodName: "",
          // parameters: "",

          // remark: "",
          // enabled: true,
        },
        requestData: {
          flage: "add",
          fn: this.getTable,
          methodsType: "get",
          // flage:false,
          url: AuditLogging.auditLogAction,
        },
      },
    };
  },
};
