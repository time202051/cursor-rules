import { Job } from '@/api/request/swagger'
export default {
  data() {
    return {
      // 查询表单
      formSearchData: {
        reset: true,
        expendShow: true,
        value: {
          IsUnFinished: true,
          TaskNo: null,
          TaskType: null,
          TaskStatus: null,
          ContainerCode: null,
          CargoLocationCode: null,
          PutCargoLocationCode: null,
          PointCode: null,
          RobotCode: null,
          InteractionSystem: 101,
          timer: []
        },
        tableSearch: [
          {
            label: '任务号',
            value: 'TaskNo',
            inputType: 'text'
          },
          {
            label: '任务类型',
            value: 'TaskType',
            inputType: 'select',
            children: this.SET_enumsSelect({
              keyword: 'taskBusinessTypeEnum'
            })
          },
          {
            label: '任务状态',
            value: 'TaskStatus',
            inputType: 'select',
            children: this.SET_enumsSelect({
              keyword: 'taskStatusEnum'
            })
          },
          {
            label: '容器编码',
            value: 'ContainerCode',
            inputType: 'text'
          },
          {
            label: '原始库位',
            value: 'CargoLocationCode',
            inputType: 'text'
          },
          {
            label: '目标库位',
            value: 'PutCargoLocationCode',
            inputType: 'text'
          },
          {
            label: '库位编码',
            value: 'PointCode',
            inputType: 'text'
          },
          {
            label: 'AGV车号',
            value: 'RobotCode',
            inputType: 'text'
          },
          {
            label: '仅未完成',
            value: 'IsUnFinished',
            inputType: 'select',
            children: [
              { key: true, value: '是' },
              { key: false, value: '否' }
            ]
          },
          {
            label: '任务用时(min)',
            value: 'TaskDuration',
            inputType: 'text'
          },
          {
            label: '创建时间',
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
          }
        ]
      },
      tableData: {
        loading: false,
        emptyImg: true,
        options: {
          entityName:"AGVBusinessTask",
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
            prop: 'taskNo',
            label: '任务号',
            minWidth: '200',
            sortable: false,
            show: true
          },
          {
            prop: 'interactionSystemDesc',
            label: '交互系统',
            minWidth: '120',
            sortable: false,
            show: true
          },
          {
            prop: 'taskStatusDesc',
            label: '任务状态',
            minWidth: '120',
            sortable: false,
            show: true
          },
          {
            prop: 'taskNatureDesc',
            label: '出入性质',
            minWidth: '120',
            sortable: false,
            show: true
          },
          {
            prop: 'taskTypeDesc',
            label: '任务类型',
            minWidth: '',
            sortable: false,
            show: true
          },
          {
            prop: 'region',
            label: '任务区域',
            minWidth: '180',
            sortable: false,
            show: true
          },
          {
            prop: 'robotCode',
            label: 'AGV车号',
            minWidth: '',
            sortable: false,
            show: true
          },
          {
            prop: 'containerType',
            label: '容器类型',
            minWidth: '180',
            sortable: false,
            show: true
          },
          {
            prop: 'containerCode',
            label: '容器编码',
            minWidth: '',
            sortable: false,
            show: true
          },
          {
            prop: 'getCargoLocationCode',
            label: '原始库位',
            minWidth: '',
            sortable: false,
            show: true
          },
          {
            prop: 'putCargoLocationCode',
            label: '目标库位',
            minWidth: '',
            sortable: false,
            show: true
          },
          {
            prop: 'finalPutCargoLocationCode',
            label: '最终位置',
            minWidth: '',
            sortable: false,
            show: true
          },
          {
            prop: 'priorty',
            label: '优先级',
            minWidth: '120',
            sortable: false,
            show: true
          },
          {
            prop: 'creationTime',
            label: '任务创建时间',
            minWidth: '160',
            sortable: false,
            show: true
          },
          {
            prop: 'downTaskTime',
            label: '任务下达时间',
            minWidth: '160',
            sortable: false,
            show: true
          },
          {
            prop: 'comletedTime',
            label: '任务完成时间',
            minWidth: '160',
            sortable: false,
            show: true
          },
          {
            prop: 'taskDuration',
            label: '任务用时(min)',
            minWidth: '160',
            sortable: false,
            show: true
          },
          {
            prop: 'requestCount',
            label: '发送次数',
            minWidth: '120',
            sortable: false,
            show: true
          },
          {
            prop: 'taskReponseDesc',
            label: '响应结果',
            minWidth: '130',
            sortable: false,
            show: true
          },
          {
            prop: 'remark',
            label: '备注',
            minWidth: '',
            sortable: false,
            show: true
          }
        ], // 表头
        operates: [], // 表格里面的操作按钮
        tableHeightDiff: 300
      },
      paginations: {
        page: 1, // 当前位于那页面
        total: 10, // 总数
        limit: 100, // 一页显示多少条
        pagetionShow: true
      },
      form: {
        dialogFormVisible: false,
        title: '',
        model: [
          {
              label: "任务完成步骤",
              type: "select",
              prop: "method",
              clearable:true,
          },
        ],
        rules: {
          method: [{ required: true, message: '必填', trigger: 'blur' }]
        },
        value: {
          method: ''
        },
        requestData: {
          methodsType: 'post',
          url: Job.finishRCSTask,
          fn: this.getTable
        }
      },
      formPriorty: {
        dialogFormVisible: false,
        title: "设置优先级",
        width: "35%",
        model: [
          {
            label: "优先级",
            type: 'number',
            prop: 'priorty',
            placeholder: '',
            props:{
              min:0,
            }

          },
        ],
        rules: {
          priorty: [{ required: true, message: "必填", trigger: "blur" }],
        },
        value: { },
        requestData: {
          url: Job.changePriorty ,
          fn: this.getTable,
        },
      },
    }
  }
}
