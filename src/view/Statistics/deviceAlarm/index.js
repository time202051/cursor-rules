export default {
  data() {
    return {
      // 查询表单
      formSearchData: {
        reset: true,
        expendShow: true,
        value: {
          OperationCode: null,
          OperationDesc: null,
          Creater: null,
          MethodName: null,
          RequestUrl: null,
          RequestIP: null,
          IsError: null,
          timer: [],
          RequestParameters: null,
          ReuqestId: null
        },
        tableSearch: [
          {
            label: '设备号',
            value: 'DeviceNo',
            inputType: 'text'
          },
          {
            label: "设备类型",
            value: "DeviceType",
            inputType: "select",
            children: this.SET_enumsSelect({
              keyword: "alarmDeviceTypeEnum",
            }),
          },
          {
            label: '故障内容',
            value: 'Content',
            inputType: 'text'
          },
          {
            label: "报警类型",
            value: "DeviceFaultType",
            inputType: "select",
            children: this.SET_enumsSelect({
              keyword: "deviceAlarmTypeEnum",
            }),
          },{
            label: "故障时间",
            value: "timer",
            inputType: "picker",
            props: {
              type: "datetimerange",
              startPlaceholder: "开始时间",
              endPlaceholder: "结束时间",
              placeholder: "选择时间范围",
              valueFormat: "yyyy-MM-dd HH:mm:ss",
            },
          }
        ]
      },
      tableData: {
        loading: false,
        emptyImg: true,
        options: {
          selection: false, // 多选框
          index: true, // 序号
          headTool: true, // 开启头部工具栏
          refreshBtn: true, // 开启表格头部刷新按钮
          downloadBtn: true // 开启表格头部下载按钮
        }, // 序号和复选框
        rows: [], // 表数据
        columns: [
          {
            prop: 'code',
            label: '编码',
            minWidth: '50',
            sortable: false,
            show: true
          },
          {
            prop: 'name',
            label: '名称',
            minWidth: '100',
            sortable: false,
            show: true
          },
          {
            prop: 'faultCode',
            label: '故障码',
            minWidth: '50',
            show: true
          },
          {
            prop: 'faultInfo',
            label: '故障信息',
            minWidth: '200',
            sortable: false,
            show: true
          },
          {
            prop: 'faultDate',
            label: '故障时间',
            minWidth: '100',
            show: true
          },
          {
            prop: 'recoverDate',
            label: '故障恢复时间',
            minWidth: '100',
            show: true
          },
          {
            prop: 'dayString',
            label: '日期',
            minWidth: '80',
            sortable: false,
            show: true
          },
          {
            prop: 'elapsedTime',
            label: '持续时间',
            minWidth: '50',
            show: true
          },
          {
            prop: 'deviceTypeDesc',
            label: '设备类型',
            minWidth: '100',
            show: true
          },
          {
            prop: 'deviceFaultTypeDesc',
            label: '报警类型',
            minWidth: '50',
            show: true
          },
        ], // 表头
        operates: [], // 表格里面的操作按钮
        tableHeightDiff: 300
      },
      paginations: {
        page: 1, // 当前位于那页面
        total: 10, // 总数
        limit: 20, // 一页显示多少条
        pagetionShow: true
      },
      form: {
        dialogFormVisible: false,
        title: '',
        width: '55%',
        model: [
         
        ],
        rules: {},
        value: {
          methodName: '',
          requestParamters: '',
          reponseResult: ''
        },
        requestData: {
          flage: 'add',
          fn: this.getTable,
          methodsType: 'get',
          url: ''
        }
      }
    }
  }
}
