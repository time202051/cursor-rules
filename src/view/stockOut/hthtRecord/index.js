import { Point, StockInfo } from '@/api/request/swagger'

export default {
  data() {
    return {
      // 查询表单
      formSearchData: {
        reset: true, // 重置
        expendShow: true, // 展开
        value: {
          ContainerCode: null, // 对应输入框的value字段
          State: null,
          SerialNumber: null,
          timer: [],
          SubContainerCode: null,
          BoxCode: null
        },
        tableSearch: [
          {
            label: '容器编码',
            value: 'ContainerCode',
            inputType: 'text'
          },
          {
            label: '合托状态',
            value: 'State',
            inputType: 'select',
            children: [
              { key: false, value: '已确认' },
              { key: true, value: '己回库' }
            ]
          },
          {
            label: '合托流水号',
            value: 'SerialNumber',
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
              valueFormat: 'yyyy-MM-dd HH:mm:ss',
              format: 'yyyy/MM/dd HH:mm:ss'
            }
          },
          {
            label: '子容器编码',
            value: 'SubContainerCode',
            inputType: 'text'
          },
          {
            label: '箱号',
            value: 'BoxCode',
            inputType: 'text'
          }
        ]
      },
      // 表格数据
      tableData: {
        loading: false,
        emptyImg: true,
        options: {
          entityName:"ConsolidineRecord",
          selection: true, // 多选框
          index: true, // 序号
          headTool: true, // 开启头部工具栏
          refreshBtn: true, // 开启表格头部刷新按钮
          downloadBtn: true // 开启表格头部下载按钮
        }, // 序号和复选框
        rows: [], // 表数据
        columns: [
          {
            label: "",
            minWidth: "",
            type: "selection",
            show: true,
          },
          {
            prop: 'serialNumber',
            label: '合托流水号',
            minWidth: '200',
            sortable: false,
            show: true
          },
          {
            prop: 'statusDesc',
            label: '合托状态',
            minWidth: '120',
            sortable: false,
            show: true
          },
          {
            prop: 'containerCode',
            label: '新容器编码',
            minWidth: '',
            sortable: false,
            show: true
          },
          {
            prop: 'childContainerCode',
            label: '新子容器编码',
            minWidth: '',
            sortable: false,
            show: true
          },
          {
            prop: 'boxNumber',
            label: '绑箱数',
            minWidth: '100',
            sortable: false,
            show: true
          },
          {
            prop: 'skuNumber',
            label: 'SKU数',
            minWidth: '100',
            sortable: false,
            show: true
          },
          {
            prop: 'areaName',
            label: '合托库区',
            minWidth: '',
            sortable: false,
            show: true
          },
          {
            prop: 'stagingName',
            label: '合托工作台',
            minWidth: '',
            sortable: false,
            show: true
          },
          {
            prop: 'cargoLocationName',
            label: '合托库位',
            minWidth: '',
            sortable: false,
            show: true
          },
          {
            prop: 'taskNo',
            label: '关联任务编号',
            minWidth: '200',
            sortable: false,
            show: true
          },
          {
            prop: 'confirmUserName',
            label: '确认人',
            minWidth: '',
            sortable: false,
            show: true
          },
          {
            prop: 'confirmDate',
            label: '确认时间',
            minWidth: '150',
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
          {
            prop: 'crateUserName',
            label: '创建人',
            minWidth: '',
            sortable: false,
            show: true
          },
          {
            prop: 'createTime',
            label: '创建时间',
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
        limit: 20, // 一页显示多少条
        pagetionShow: true
      },
      detailsform: {
        outerVisible: false,
        title: '详情',
        row: {},
        requestData: {
          flage: 'add',
          url: Point.point,
          fn: this.getTable
        }
      }
    }
  }
}
