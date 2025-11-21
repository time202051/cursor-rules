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
              type: 'daterange',
              startPlaceholder: '开始时间',
              endPlaceholder: '结束时间',
              placeholder: '选择时间范围',
              format: 'yyyy/MM/dd',
              valueFormat: 'yyyy-MM-dd'
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
            prop: '日期DayText',
            label: '日期',
            minWidth: '160',
            sortable: false,
            show: true
          },
          {
            prop: '入库',
            label: '入库',
            minWidth: '',
            sortable: false,
            show: true
          },
          {
            prop: '出库',
            label: '出库',
            minWidth: '',
            sortable: false,
            show: true
          },
          {
            prop: '入出总数',
            label: '入出总数',
            minWidth: '',
            sortable: false,
            show: true
          },
          {
            prop: '原材料入库',
            label: '原材料入库',
            minWidth: '',
            sortable: false,
            show: true
          },
          {
            prop: '原材料入库异常',
            label: '原材料入库异常',
            minWidth: '',
            sortable: false,
            show: true
          },
          {
            prop: '原材料异常比例',
            label: '原材料异常比例',
            minWidth: '',
            sortable: false,
            show: true
          },
          {
            prop: '成品入库',
            label: '成品入库',
            minWidth: '',
            sortable: false,
            show: true
          },
          {
            prop: '成品入库异常',
            label: '成品入库异常',
            minWidth: '',
            sortable: false,
            show: true
          },
          {
            prop: '成品异常比例',
            label: '成品异常比例',
            minWidth: '',
            sortable: false,
            show: true
          },
          {
            prop: '空箱入库',
            label: '空箱入库',
            minWidth: '',
            sortable: false,
            show: true
          },

          {
            prop: '空箱入库异常',
            label: '空箱入库异常',
            minWidth: '',
            sortable: false,
            show: true
          },
          {
            prop: '空箱异常比例',
            label: '空箱异常比例',
            minWidth: '',
            sortable: false,
            show: true
          },
          {
            prop: '空箱整出',
            label: '空箱整出',
            minWidth: '',
            sortable: false,
            show: true
          },
          {
            prop: '原材料整出',
            label: '原材料整出',
            minWidth: '',
            sortable: false,
            show: true
          },
          {
            prop: '原材料拣选出',
            label: '原材料拣选出',
            minWidth: '',
            sortable: false,
            show: true
          },
          {
            prop: '原材料合托出库',
            label: '原材料合托出库',
            minWidth: '',
            sortable: false,
            show: true
          },
          {
            prop: '原材料出库',
            label: '原材料出库',
            minWidth: '',
            sortable: false,
            show: true
          },
          {
            prop: '拣选比例',
            label: '拣选比例',
            minWidth: '',
            sortable: false,
            show: true
          },
          {
            prop: '整托率',
            label: '整托率',
            minWidth: '',
            sortable: false,
            show: true
          },
          {
            prop: '原材料出库订单',
            label: '原材料出库订单',
            minWidth: '',
            sortable: false,
            show: true
          },
          {
            prop: '订单完成',
            label: '订单完成',
            minWidth: '',
            sortable: false,
            show: true
          },
          {
            prop: '订单取消',
            label: '订单取消',
            minWidth: '',
            sortable: false,
            show: true
          },
          {
            prop: '订单完成率',
            label: '订单完成率',
            minWidth: '',
            sortable: false,
            show: true
          },
          {
            prop: '成品出库',
            label: '成品出库',
            minWidth: '',
            sortable: false,
            show: true
          },
          {
            prop: '成品一楼楼出库',
            label: '成品一楼楼出库',
            minWidth: '',
            sortable: false,
            show: true
          },
          {
            prop: '成品二楼出库',
            label: '成品二楼出库',
            minWidth: '',
            sortable: false,
            show: true
          },
          {
            prop: '成品小托出库',
            label: '成品小托出库',
            minWidth: '',
            sortable: false,
            show: true
          },
          {
            prop: '成品大托出库',
            label: '成品大托出库',
            minWidth: '',
            sortable: false,
            show: true
          },
          {
            prop: '手动呼出',
            label: '手动呼出',
            minWidth: '',
            sortable: false,
            show: true
          },
          {
            prop: '合托回库',
            label: '合托回库',
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
        limit: 40, // 一页显示多少条
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
