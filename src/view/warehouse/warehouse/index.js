import { Product, Tenant } from "@/api/request/swagger";
export default {
    data() {
        return {
            // 查询表单
            formSearchData: {
                reset: true,
                expendShow: false,
                value: {
                    Code: null,
                    Name: null,
                },
                tableSearch: [
                    {
                        label: "仓库编码",
                        value: "Code",
                        inputType: "text",
                    },
                    {
                        label: "仓库名称",
                        value: "Name",
                        inputType: "text",
                    },
                    // {
                    //     label: "启用状态",
                    //     value: "Enabled",
                    //     inputType: "select",
                    //     children: this.SET_enumsSelect({
                    //       keyword: "enableStatusEnum",
                    //     }),
                    //   },
                ],
            },
            tableData: {
                loading: false,
                emptyImg: true,
                options: {
                    selection: true, //多选框
                    index: null, //序号
                    headTool: true, //开启头部工具栏
                    refreshBtn: true, //开启表格头部刷新按钮
                    downloadBtn: true, //开启表格头部下载按钮
                }, //序号和复选框
                rows: [], //表数据
                columns: [{
                    label: "",
                    minWidth: "",
                    type: 'selection',
                    show: true,
                },
                {
                    prop: "concurrencyStamp",
                    label: "仓库编码",
                    minWidth: "",
                    sortable: false,
                    show: true,
                },
                {
                    prop: "name",
                    label: "仓库名称",
                    minWidth: "",
                    sortable: false,
                    show: true,
                },
                {
                    prop: "id",
                    label: "ID",
                    minWidth: "",
                    sortable: false,
                    show: true,
                },
                    // {
                    //     prop: "boxType",
                    //     label: "创建人",
                    //     minWidth: "",
                    //     sortable: false,
                    //     show: true,
                    // },
                    // {
                    //     prop: "pointEnabledText",
                    //     label: "启用",
                    //     minWidth: "",
                    //     sortable: false,
                    //     show: true,
                    // },

                    // {
                    //     prop: "creationTime",
                    //     label: "创建时间",
                    //     minWidth: "",
                    //     sortable: false,
                    //     show: true,
                    // },

                ], //表头
                operates: [], //表格里面的操作按钮
                tableHeightDiff: 300,
            },
            paginations: {
                page: 1, //当前位于那页面
                total: 10, //总数
                limit: 20, //一页显示多少条
                pagetionShow: true,
            },
            form: {
                dialogFormVisible: false,
                title: "",
                model: [

                    {
                        label: "仓库编码",
                        type: "input",
                        prop: "concurrencyStamp",
                        // readonly: true,//不可填
                    },
                    {
                        label: "仓库名称",
                        type: "input",
                        prop: "name",
                        // readonly: true,//不可填
                    },
                    {
                        label: "ID",
                        type: "input",
                        prop: "id",
                        // readonly: true,//不可填
                    },
                    // {
                    //     label: "创建人",
                    //     type: "input",
                    //     prop: "boxType",
                    //     readonly: true,//不可填
                    // },
                    {
                        label: "启用状态",
                        type: "switch",
                        prop: "enabled",
                    },
                    {
                        label: "备注",
                        type: "input",
                        prop: "remark",
                        // readonly: true,//不可填
                    },
                    // {   
                    //     label: "创建时间",
                    //     prop: "creationTime",
                    //     type: "input",
                    //     readonly: true,//不可填

                    // },

                ],
                rules: {
                    // concurrencyStamp: [{ required: true, message: "必填", trigger: "blur" }],
                    // name: [{ required: true, message: "必填", trigger: "blur" }],
                    // id: [{ required: true, message: "必填", trigger: "blur" }],

                },
                value: {
                    concurrencyStamp: "",
                    name: "",
                    id: "",
                    enabled: true,
                    TenantName: "",
                    remark: "",


                },
                requestData: {

                    flage: "add",
                    url: Tenant.tenant,
                    fn: this.getTable,

                },
            },
        }
    }
}
