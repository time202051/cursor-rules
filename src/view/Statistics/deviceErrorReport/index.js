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
            label: '日期',
            value: 'Date',
            inputType: 'date'
          },
          {
            label: '小时',
            value: 'Code',
            inputType: 'text'
          } ,{
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
            label: '',
            minWidth: '',
            type: 'selection',
            show: true
          },{
              prop: 'reportType',
              label: '报表类型',
              minWidth: '130',
              sortable: false,
              show: true
            },
            {
              prop: 'deviceNo',
              label: '设备号',
              minWidth: '130',
              sortable: false,
              show: true
            },
            {
              prop: 'deviceName',
              label: '设备名称',
              minWidth: '130',
              sortable: false,
              show: true
            },
            {
              prop: 'date',
              label: '日期',
              minWidth: '200',
              sortable: false,
              show: true
            },
            {
              prop: 'outboundCount',
              label: '出库执行总数',
              minWidth: '130',
              sortable: false,
              show: true
            },
            {
              prop: 'outboundTimeConsuming',
              label: '出库任务执行耗时',
              minWidth: '130',
              sortable: false,
              show: true
            },
            {
              prop: 'inboundCount',
              label: '入库任务总数',
              minWidth: '130',
              sortable: false,
              show: true
            },
            {
              prop: 'inboundTimeConsuming',
              label: '入库任务执行耗时',
              minWidth: '130',
              sortable: false,
              show: true
            },
            {
              prop: 'moveCount',
              label: '移库任务总数',
              minWidth: '130',
              sortable: false,
              show: true
            },
            {
              prop: 'moveTimeConsuming',
              label: '移库任务执行耗时',
              minWidth: '130',
              sortable: false,
              show: true
            },
            {
              prop: 'positionCount',
              label: '位移任务总数',
              minWidth: '130',
              sortable: false,
              show: true
            },
            {
              prop: 'positionTimeConsuming',
              label: '位移任务总数', 
              minWidth: '130',
              sortable: false,
              show: true
            },
            {
              prop: 'taskCount',
              label: '任务总数',
              minWidth: '130',
              sortable: false,
              show: true
            },
            {
              prop: 'faultCount',
              label: '故障次数',
              minWidth: '130',
              sortable: false,
              show: true
            },
            {
              prop: 'faultTake',
              label: '故障耗时',
              minWidth: '130',
              sortable: false,
              show: true
            }
          ]
          , // 表头
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
