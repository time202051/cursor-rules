import { IdentityRole } from '@/api/request/swagger';
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
                tableSearch: [
                    {
                        label: '查询条件',
                        value: 'Code',
                        inputType: 'text'
                    }
                ]
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
                columns: [
                    {
                        label: '',
                        minWidth: '',
                        type: 'selection',
                        show: true
                    },
                    {
                        prop: 'name',
                        label: '角色名',
                        minWidth: '',
                        sortable: false,
                        show: true
                    },
                    {
                        prop: 'description',
                        label: '描述',
                        minWidth: '',
                        sortable: false,
                        show: true,
                        // render: m => {
                        //     if (m.description == '333') {
                        //         return <span style="color: red;">{m.description}</span>
                        //     } else {
                        //         return m.description
                        //     }
                        // }
                    },
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
                systemAllList: [],
                menusTreeAllList: [],
                defaultMenusTreeAllList: [],
                model: [
                    {
                        label: '角色名',
                        type: 'input',
                        prop: 'name'
                    },
                    {
                        label: '角色描述',
                        type: 'textarea',
                        prop: 'description',
                    },
                ],
                rules: {
                    name: [{ required: true, message: '必填', trigger: 'blur' }],
                },
                value: {
                    name: '',
                    description: '',
                },
                requestData: {
                    flage: 'add',
                    url: IdentityRole.identityRole,
                    fn: this.getTable
                }
            }
        };
    }
};
