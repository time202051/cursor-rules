import { Basic } from '@/api/request/swagger'
export default {
  data() {
    return {
      // 查询表单
      formSearchData: {
        reset: true,
        expendShow: true,
        value: {
          BoxCode: null,
          SubtrayCode: null,
          ContainerCode: null,
          CargoLocationCode: null,
          timer: []
        },
        tableSearch: [
          {
            label: '箱号',
            value: 'BoxCode',
            inputType: 'text'
          },
          {
            label: '子托盘号',
            value: 'SubtrayCode',
            inputType: 'text'
          },
          {
            label: '原母托盘号',
            value: 'ContainerCode',
            inputType: 'text'
          },
          {
            label: '原库位号',
            value: 'CargoLocationCode',
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
          entityName:"StockTransferEmptyRecord",
          selection: true, // 多选框
          index: null, // 序号
          headTool: true, // 开启头部工具栏
          refreshBtn: true, // 开启表格头部刷新按钮
          downloadBtn: true // 开启表格头部下载按钮
        }, // 序号和复选框
        rows: [], // 表数据
        columns: [
          // {
          //   label: "",
          //   minWidth: "",
          //   type: "selection",
          //   show: true,
          // },
          {
            prop: 'boxCode',
            label: '箱号',
            minWidth: '',
            sortable: false,
            show: true
          },
          {
            prop: 'subtrayCode',
            label: '子托盘号',
            minWidth: '',
            sortable: false,
            show: true
          },
          {
            prop: 'containerCode',
            label: '原母托盘号',
            minWidth: '',
            sortable: false,
            show: true
          },
          {
            prop: 'cargoLocationCode',
            label: '原库位号',
            minWidth: '',
            sortable: false,
            show: true
          },
          {
            prop: 'operationUser',
            label: '操作人',
            minWidth: '',
            show: true
          },
          {
            prop: 'creationTime',
            label: '操作时间',
            minWidth: '',
            show: true
          }
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
        model: [
          {
            label: '区域编码',
            type: 'input',
            prop: 'regionCode'
          },
          {
            label: '区域名称',
            type: 'input',
            prop: 'regionName'
          },
          {
            label: '区域属性',
            type: 'select',
            prop: 'regionAttributes',
            child: []
          },
          {
            label: '归属仓库',
            type: 'select',
            prop: 'warehouseId',
            child: []
          },
          {
            label: '状态',
            type: 'switch',
            prop: 'enabled'
          },
          {
            label: '备注',
            type: 'textarea',
            prop: 'remark'
          }
        ],
        rules: {
          regionCode: [{ required: true, message: '必填', trigger: 'blur' }],
          regionName: [{ required: true, message: '必填', trigger: 'blur' }],
          regionAttributes: [
            { required: true, message: '必填', trigger: 'change' }
          ],
          warehouseId: [{ required: true, message: '必填', trigger: 'change' }]
        },
        value: {
          regionCode: '',
          regionName: '',
          regionAttributes: '',
          warehouseId: '',
          enabled: true,
          remark: ''
        },
        requestData: {
          flage: 'add',
          url: Basic.handleRegion,
          fn: this.getTable
        }
      }
    }
  }
}
