export default {
  data() {
    return {
      // 查询表单
      formSearchData: {
        reset: true,
        expendShow: false,
        value: {
          Time: '',
        },
        tableSearch: [
            {
            label: '设备类型',
            value: 'Devicetype',
            inputType: 'select',
            children: [
              { key: 1, value: '核心设备' },
              { key: 2, value: '非核心设备' }
            ]
          },
           {
            label: '设备名称',
            value: 'DeviceName',
            inputType: 'text'
          },
          {
            label: '时间',
            value: 'Time',
            inputType: 'picker',
            props: {
              type: 'date',
              placeholder: '选择时间',
              format: 'yyyy/MM/dd',
              valueFormat: 'yyyy-MM-dd',
              clearable:false
            }
          },
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
          // {
          //   label: '',
          //   minWidth: '',
          //   type: 'selection',
          //   show: true
          // },
          {
            prop: 'date',
            label: '日期',
            minWidth: '',
            sortable: false,
            show: true
          },
          {
            prop: 'deviceName',
            label: '设备名称',
            minWidth: '',
            sortable: false,
            show: true
          },
          {
            prop: 'stockOutTaskTotal',
            label: '出库任务总量',
            minWidth: '',
            sortable: false,
            show: true
          },
          {
            prop: 'stockOutTaskElapsedTime',
            label: '出库任务总耗时',
            minWidth: '',
            sortable: false,
            show: true
          },
          {
            prop: 'stockInTaskTotal',
            label: '入库任务总量',
            minWidth: '',
            sortable: false,
            show: true
          },
          {
            prop: 'stockInTaskElapsedTime',
            label: '入库任务总耗时',
            minWidth: '',
            sortable: false,
            show: true
          },
          {
            prop: 'moveStockTaskTotal',
            label: '移库任务总量',
            minWidth: '',
            sortable: false,
            show: true
          },
          {
            prop: 'moveStockTaskElapsedTime',
            label: '移库任务总耗时',
            minWidth: '',
            sortable: false,
            show: true
          },
          {
            prop: 'displacementTaskTotal',
            label: '位移任务总量',
            minWidth: '',
            sortable: false,
            show: true
          },
          {
            prop: 'displacementTaskElapsedTime',
            label: '位移任务总耗时',
            minWidth: '',
            sortable: false,
            show: true
          },
          {
            prop: 'total',
            label: '任务总数',
            minWidth: '',
            sortable: false,
            show: true
          },
          {
            prop: 'faultTotal',
            label: '故障总次数',
            minWidth: '',
            sortable: false,
            show: true
          },
          {
            prop: 'faultElapsedTime',
            label: '故障总耗时',
            minWidth: '',
            sortable: false,
            show: true
          },
          {
            prop: 'workTimeTotal',
            label: '工作时间',
            minWidth: '',
            sortable: false,
            show: true
          },
          {
            prop: 'validWorkTimeTotal',
            label: '实际工作时间',
            minWidth: '',
            sortable: false,
            show: true
          },
          {
            prop: 'freeTimeTotal',
            label: '空闲时间',
            minWidth: '',
            sortable: false,
            show: true
          },
          {
            prop: 'avgRecoverTime',
            label: '平均故障恢复时间',
            minWidth: '',
            sortable: false,
            show: true
          },
          {
            prop: 'faultInterval',
            label: '平均故障间隔',
            minWidth: '',
            sortable: false,
            show: true
          },
          {
            prop: 'deviceType',
            label: '设备类型',
            minWidth: '',
            sortable: false,
            show: true
          },

        ], // 表头
        operates: [], // 表格里面的操作按钮
        tableHeightDiff: 300
      },
      paginations: {
        pagetionShow: false
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
            readonly: true
          },
          {
            label: '请求参数',
            type: 'json',
            prop: 'requestParamters',
            autosize: { minRows: 2, maxRows: 5 },
            readonly: true
          },
          {
            label: '响应结果',
            type: 'json',
            prop: 'reponseResult',
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
