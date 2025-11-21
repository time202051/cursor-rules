import {
  IdentityUser
} from '@/api/request/swagger';
export default {
  data() {
    return {
      // 查询表单
      formSearchData: {
        reset: true,
        expendShow: false,
        value: {
          Code: null
        },
        tableSearch: [{
          label: '查询条件',
          value: 'Code',
          inputType: 'text'
        }]
      },
      tableData: {
        loading: false,
        emptyImg: true,
        options: {
          selection: false, //多选框
          index: null, //序号
          headTool: true, //开启头部工具栏
          refreshBtn: true, //开启表格头部刷新按钮
          downloadBtn: true //开启表格头部下载按钮
        }, //序号和复选框
        rows: [], //表数据
        columns: [{
            label: '',
            minWidth: '',
            type: 'selection',
            show: true
          },
          {
            prop: 'userName',
            label: '用户名',
            minWidth: '',
            sortable: false,
            show: true
          },
          {
            prop: 'name',
            label: '名称',
            minWidth: '',
            sortable: false,
            show: true
          },
          {
            prop: 'email',
            label: '邮箱',
            minWidth: '',
            sortable: false,
            show: true
          },
          {
            prop: 'phoneNumber',
            label: '手机号',
            minWidth: '',
            sortable: false,
            show: true
          },

          {
            prop: 'isActiveText',
            label: '活动状态',
            minWidth: '',
            sortable: false,
            show: true
          }
        ], //表头
        operates: [], //表格里面的操作按钮
        tableHeightDiff: 300
      },
      paginations: {
        page: 1, //当前位于那页面
        total: 10, //总数
        limit: 20, //一页显示多少条
        pagetionShow: true
      },
      form: {
        dialogFormVisible: false,
        tabsFormFlage: true,
        title: '',
        roleNameList: [],
        model: [{
            label: '用户名',
            type: 'input',
            prop: 'userName'
          },
          {
            label: '密码',
            type: 'input',
            prop: 'password',
          },
          {
            label: '名称',
            type: 'input',
            prop: 'name'
          },
          {
            label: '所属组织',
            type: 'treeSelect',
            prop: 'organizationUntiId',
            child: [],
            props: {
              value: "id", // ID字段名
              label: "title", // 显示名称
              children: "child", // 子级字段名
              placeholder: '请选择所属组织'
            }
          },
          {
            label: '手机号码',
            type: 'input',
            prop: 'phoneNumber'
          },
          {
            label: '邮箱',
            type: 'input',
            prop: 'email'
          },
          {
            label: '活动状态',
            type: 'switch',
            prop: 'isActive'
          },

        ],
        rules: {
          userName: [{
            required: true,
            message: '必填',
            trigger: 'blur'
          }],
          password: [{
            required: true,
            message: '必填',
            trigger: 'blur'
          }],
          name: [{
            required: true,
            message: '必填',
            trigger: 'blur'
          }],
          // email: [{
          //   required: true,
          //   message: '必填',
          //   trigger: 'blur'
          // }],
          organizationUntiId: [{
            required: true,
            message: '必填',
            trigger: 'blur'
          }],
        },
        value: {
          id: '',
          userName: '',
          password: '',
          name: '',
          organizationUntiId: '',
          phoneNumber: '',
          email: '',
          isActive: true,
          roleNames: []
        },
        requestData: {
          flage: 'add',
          url: IdentityUser.identityUser,
          fn: this.getTable
        }
      }
    };
  }
};
