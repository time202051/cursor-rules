import { BusinessTask } from '@/api/request/swagger'
export default {
  data() {
    return {
      // 查询表单
      formSearchData: {
        reset: true,
        expendShow: false,
        value: {
        },
        tableSearch: [
          {
            label: '任务类型',
            value: 'TaskType',
            inputType: 'select',
            children: this.SET_enumsSelect({
              keyword: 'taskBusinessTypeEnum'
            })
          }
        ]
      },
      tableData: {
        loading: false,
        emptyImg: true,
        options: {
          entityName:"TaskLevel",
          selection: true, // 多选框
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
          },
          {
            prop: 'taskTypeDesc',
            label: '任务类型',
            minWidth: '',
            sortable: false,
            show: true
          },
          {
            prop: 'level',
            label: '优先级',
            minWidth: '',
            sortable: false,
            show: true
          },
          {
            prop: 'creationTime',
            label: '创建时间',
            minWidth: '',
            sortable: false,
            show: true
          },
          {
            prop: 'lastModificationTime',
            label: '最后修改时间',
            minWidth: '',
            sortable: false,
            show: true
          },
          {
            prop: 'lastModificationUserName',
            label: '最后修改人',
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
        limit: 100, // 一页显示多少条
        pagetionShow: true
      },
      formLevel: {
        dialogFormVisible: false,
        title: "设置优先级",
        width: "35%",
        model: [
          {
            label: "优先级",
            type: 'number',
            prop: 'newLevel',
            placeholder: '',
            props:{
              min:0,
            }
          },
        ],
        rules: {
          newLevel: [{ required: true, message: "必填", trigger: "blur" }],
        },
        value: { },
        requestData: {
          url: BusinessTask.changeTaskLevel ,
          fn: this.getTable,
        },
      },
    }
  }
}
