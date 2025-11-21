import { warehouse, PublicAggregate } from "@/api/request/swagger";
export default {
    data() {
        return {
            // 查询表单
            formSearchData: {
                reset: true,
                expendShow: false,
                value: {
                    Id: null,
                    Code: null,
                    RegionId: null,
                    Enabled: null,
                    // code: null,
                    // enabled: null,
                    // loadStatus: null,
                    // usageStatus: null,
                    // locationType: null,
                    // areaId: null,
                    // regionId: null,
                },
                tableSearch: [
                    {
                        label: "巷道编码",
                        value: "Code",
                        inputType: "text",
                    },

                    {
                        label: "启用状态",
                        value: "enabled",
                        inputType: "select",
                        children: this.SET_enumsSelect({
                            keyword: "enableStatusEnum",
                        }),
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
                    prop: "code",
                    label: "巷道编码",
                    minWidth: "",
                    sortable: false,
                    show: true,
                },
                {
                    prop: "name",
                    label: "巷道名称",
                    minWidth: "",
                    sortable: false,
                    show: true,
                },
                {
                    prop: "taskCount",
                    label: "通道任务数",
                    minWidth: "",
                    sortable: false,
                    show: true,
                },
                {
                    prop: "taskThreshold",
                    label: "通道任务数阈值",
                    minWidth: "",
                    sortable: false,
                    show: true,
                },
                {
                    prop: "hasSpecialText",
                    label: "是否有小库位",
                    minWidth: "",
                    sortable: false,
                    show: true,
                },
                {
                    prop: "enabledText",
                    label: "可用状态",
                    minWidth: "",
                    sortable: false,
                    show: true,
                },
                {
                    prop: "remark",
                    label: "备注",
                    minWidth: "",
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
                        label: "巷道编码",
                        type: "input",
                        prop: "code",
                    },
                    {
                        label: "巷道名称",
                        type: "input",
                        prop: "name",
                    },
                    // {
                    //     label: "通道任务数",
                    //     type: "input",
                    //     prop: "taskCount",
                    // },
                    {
                        label: "通道任务阈值",
                        type: "number",
                        prop: "taskThreshold",
                        readonly: true,//不可填
                        props: {
                            precision: 0,
                            // step:0
                        }
                    },

                    {
                        label: "是否有小库位",
                        type: "switch",
                        prop: "hasSpecial",
                    },
                    // {
                    //     label: "区域ID",
                    //     type: "input",
                    //     prop: "regionId",
                    // },
              
                 
                    {
                        label: "启用",
                        type: "switch",
                        prop: "enabled",
                    },

                    {
                        label: "备注",
                        type: "textarea",
                        prop: "remark",
                    },
                ],
                rules: {
                    code: [{ required: true, message: "必填", trigger: "blur" }],
                    name: [{ required: true, message: "必填", trigger: "blur" }],
                    taskCount: [{ required: true, message: "必填", trigger: "blur" }],
                    taskThreshold: [{ required: true, message: "必填", trigger: "blur" }],
                    regionId: [{ required: true, message: "必填", trigger: "blur" }],
                    regionDisplayName: [{ required: true, message: "必填", trigger: "blur" }],
                    hasSpecial: [{ required: true, message: "必填", trigger: "blur" }],

                },
                value: {
                    code: "",
                    name: "",
                    // taskCount: "",
                    taskThreshold: "",
                    // regionId: "",
                    hasSpecial: true,
                    remark: "",
                    enabled: true,
                },
                requestData: {
                    flage: "add",
                    url: warehouse.roadWay,
                    fn: this.getTable,

                },
            },
        }
    }
}
