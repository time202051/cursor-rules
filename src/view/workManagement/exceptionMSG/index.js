import { AGV, AuditLogging } from "@/api/request/swagger";
export default {
    data() {
        return {
            // 查询表单
            formSearchData: {
                reset: true,
                expendShow: true,
                value: {
                    userName: null,
                    clientIpAddress: null,
                    hasException: [],
                    url: null,
                    timer: [],

                },
                tableSearch: [
                    {
                        label: "用户名",
                        value: "userName",
                        inputType: "text",
                    },
                    {
                        label: "IP地址",
                        value: "clientIpAddress",
                        inputType: "text",
                    },
                    {
                        label: "是否有异常",
                        value: "hasException",
                        inputType: "select",
                        children: [
                            {
                                key: true,
                                value: "是"
                            },
                            {
                                key: false,
                                value: "否"
                            }
                        ],
                    },

                    {
                        label: "请求接口",
                        value: "url",
                        inputType: "text",
                    },


                    {
                        label: "创建时间",
                        value: "timer",
                        inputType: "picker",
                        props: {
                            type: 'datetimerange',
                            startPlaceholder: "开始时间",
                            endPlaceholder: "结束时间",
                            placeholder: "选择时间范围",
                            valueFormat: 'yyyy-MM-dd HH:mm:ss',
                        }
                    },
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
                    prop: "userName",
                    label: "操作用户",
                    minWidth: "",
                    sortable: false,
                    show: true,
                },
                {
                    prop: "clientName",
                    label: "客户端名称",
                    minWidth: "",
                    sortable: false,
                    show: true,
                },
                {
                    prop: "url",
                    label: "请求接口",
                    minWidth: "",
                    sortable: false,
                    show: true,
                },
                {
                    prop: "httpMethod",
                    label: "请求方式",
                    minWidth: "",
                    sortable: false,
                    show: true,
                },
                {
                    prop: "exceptions",
                    label: "异常信息",
                    minWidth: "",
                    sortable: false,
                    show: true,
                },
                {
                    prop: "browserInfo",
                    label: "浏览器信息",
                    minWidth: "",
                    sortable: false,
                    show: true,
                },
                {
                    prop: "executionTime",
                    label: "执行时间",
                    minWidth: "",
                    sortable: false,
                    show: true,
                },
                {
                    prop: "executionDuration",
                    label: "执行时长",
                    minWidth: "",
                    sortable: false,
                    show: true,
                },
                {
                    prop: "httpStatusCode",
                    label: "请求状态码",
                    minWidth: "",
                    sortable: false,
                    show: true,
                },
                {
                    prop: "clientIpAddress",
                    label: "调用方IP",
                    minWidth: "",
                    sortable: false,
                    show: true,
                },
                {
                    prop: "comments",
                    label: "备注",
                    minWidth: "",
                    sortable: false,
                    show: true,
                },

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
                        label: "命名空间",
                        type: "input",
                        prop: "serviceName",
                        readonly: true,
                    },
                    {
                        label: "方法名",
                        type: "input",
                        prop: "methodName",
                        readonly: true,

                    },
                    {
                        label: "数据包",
                        type: "textarea",
                        prop: "parameters",
                        autosize: { minRows: 10, maxRows: 20 },
                        readonly: true, //不可填

                    },
                ],
                rules: {
                    // serviceName: [{ required: true, message: "必填", trigger: "blur" }],
                    // methodName: [{ required: true, message: "必填", trigger: "blur" }],
                    // parameters: [{ required: true, message: "必填", trigger: "blur" }],
                },
                value: {
                    serviceName: '',
                    methodName: '',
                    parameters: ''


                },
                requestData: {
                    flage: "add",
                    fn: this.getTable,
                    methodsType: "get",
                    // flage:false,
                    url: AuditLogging.auditLogAction
                },
            },
        }
    }
}