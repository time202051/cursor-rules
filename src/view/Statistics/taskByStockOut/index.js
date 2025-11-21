export default {
  data() {
    return {
      // 查询表单
      formSearchData: {
        reset: true,
        expendShow: false,
        value: {
          timer: [],
        },
        tableSearch: [
          {
            label: '时间',
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
        ]
      },
      tableData: {
        loading: false,
        emptyImg: true,
        options: {
          selection: false, // 多选框
          index: null, // 序号
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
            prop: 'timeStr',
            label: '时间段',
            minWidth: '',
            sortable: false,
            show: true
          },
          {
            prop: 'totalOrderCount',
            label: '订单数',
            minWidth: '',
            sortable: false,
            show: true
          },
          {
            prop: 'totalFinishOrderCount',
            label: '完成订单数',
            minWidth: '',
            sortable: false,
            show: true
          },
          {
            prop: 'finishPickCount',
            label: '完成拣选数',
            minWidth: '',
            sortable: false,
            show: true
          },
          {
            prop: 'finishRate',
            label: '完成拣选率',
            minWidth: '',
            sortable: false,
            show: true
          },
          {
            prop: 'cpOrderCount',
            label: '成品订单数',
            minWidth: '',
            sortable: false,
            show: true
          },
          {
            prop: 'cpFinishCount',
            label: '完成成品订单数',
            minWidth: '',
            sortable: false,
            show: true
          },
          {
            prop: 'cpFinishRate',
            label: '成品完成率',
            minWidth: '',
            sortable: false,
            show: true
          },
          {
            prop: 'yclOrderCount',
            label: '原材料订单数',
            minWidth: '',
            sortable: false,
            show: true
          },
          {
            prop: 'yclFinishCount',
            label: '完成原材料订单数',
            minWidth: '',
            sortable: false,
            show: true
          },
          {
            prop: 'yclFinishRate',
            label: '原材料完成率',
            minWidth: '',
            sortable: false,
            show: true
          },
          {
            prop: 'kxOrderCount',
            label: '空箱订单数',
            minWidth: '',
            sortable: false,
            show: true
          },
          {
            prop: 'kxFinishCount',
            label: '完成空箱订单数',
            minWidth: '',
            sortable: false,
            show: true
          },
          {
            prop: 'kxFinishRate',
            label: '空箱完成率',
            minWidth: '',
            sortable: false,
            show: true
          },
          {
            prop: 'startTime',
            label: '开始时间',
            minWidth: '140',
            sortable: false,
            show: true
          },
          {
            prop: 'endTime',
            label: '结束时间',
            minWidth: '140',
            sortable: false,
            show: true
          },
            {
            prop: 'details',
            label: '详情',
            minWidth: '',
            fixed: 'right',
            sortable: false,
            show: true,
            renderSlot: true
          },

        ], // 表头
        operates: [], // 表格里面的操作按钮
        tableHeightDiff: 300
      },
      paginations: {
        page: 1, // 当前位于那页面
        total: 10, // 总数
        limit: 40, // 一页显示多少条
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
