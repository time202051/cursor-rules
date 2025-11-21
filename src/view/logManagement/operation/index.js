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
            label: '接口编码',
            value: 'OperationCode',
            inputType: 'text'
          },
          {
            label: '接口描述',
            value: 'OperationDesc',
            inputType: 'text'
          },
          {
            label: '操作人',
            value: 'Creater',
            inputType: 'text'
          },
          {
            label: '接口名称',
            value: 'MethodName',
            inputType: 'text'
          },
          {
            label: '请求地址',
            value: 'RequestUrl',
            inputType: 'text'
          },
          {
            label: '请求IP',
            value: 'RequestIP',
            inputType: 'text'
          },
          {
            label: '是否出现异常',
            value: 'IsError',
            inputType: 'select',
            children: [
              {
                key: true,
                value: '是'
              },
              {
                key: false,
                value: '否'
              }
            ]
          },
          {
            label: '请求时间',
            value: 'timer',
            inputType: 'picker',
            props: {
              type: 'datetimerange',
              startPlaceholder: '开始时间',
              endPlaceholder: '结束时间',
              placeholder: '选择时间范围',
              format: 'yyyy/MM/dd HH:mm:ss',
              valueFormat: 'yyyy-MM-dd HH:mm:ss'
            }
          },
          {
            label: '请求参数',
            value: 'RequestParameters',
            inputType: 'text'
          },
          {
            label: '请求ID',
            value: 'ReuqestId',
            inputType: 'text'
          }
        ]
      },
      tableData: {
        loading: false,
        emptyImg: true,
        options: {
          selection: true, // 多选框
          index: null, // 序号
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
          },
          {
            prop: 'oprationCode',
            label: '接口编码',
            minWidth: '100',
            sortable: false,
            show: true
          },
          {
            prop: 'operationDesc',
            label: '接口描述',
            minWidth: '',
            sortable: false,
            show: true
          },
          {
            prop: 'methodName',
            label: '接口名称',
            minWidth: '200',
            sortable: false,
            show: true
          },
          {
            prop: 'requestUrl',
            label: '请求地址',
            minWidth: '300',
            show: true
          },
          {
            prop: 'creationTime',
            label: '请求时间',
            minWidth: '160',
            sortable: false,
            show: true
          },
          {
            prop: 'requestParamters',
            label: '请求参数',
            minWidth: '300',
            show: true,
            overHidden:false,
            renderSlot: true,
          },
          {
            prop: 'reponseResult',
            label: '响应结果',
            minWidth: '300',
            show: true,
            overHidden:false,
            renderSlot: true,
          },
          {
            prop: 'exceptionMessage',
            label: '异常信息',
            minWidth: '',
            show: true
          },
          {
            prop: 'opertionTimes',
            label: '执行耗时',
            minWidth: '',
            sortable: false,
            show: true
          },
          {
            prop: 'creater',
            label: '操作人',
            minWidth: '',
            sortable: false,
            show: true
          },
          {
            prop: 'requestIP',
            label: '请求IP',
            minWidth: '',
            sortable: false,
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
          {
            label: '接口名称',
            type: 'input',
            prop: 'methodName',
            width: "100%",
            readonly: true
          },
          {
            label: '请求参数',
            type: 'json',
            prop: 'requestParamters',
            width: "100%",
            autosize: { minRows: 2, maxRows: 5 },
            readonly: true
          },
          {
            label: '响应结果',
            type: 'json',
            prop: 'reponseResult',
            width: "100%",
            autosize: { minRows: 8, maxRows: 12 },
            readonly: true
          }
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
