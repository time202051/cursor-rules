
import { warehouse } from "@/api/request/swagger";
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
                        label: "容器编码",
                        value: "Code",
                        inputType: "text",
                    },
                    {
                        label: "容器名称",
                        value: "Name",
                        inputType: "text",
                    },
                    // {
                    //     label: "库区",
                    //     value: "areaId",
                    //     inputType: "select",
                    //     children: [],

                    // },
                    // {
                    //     label: "货位类型",
                    //     value: "locationType",
                    //     inputType: "select",
                    //     children: this.SET_enumsSelect({
                    //         keyword: "locationTypeEnum",
                    //     }),
                    // },
                    // {
                    //     label: "使用状态",
                    //     value: "usageStatus",
                    //     inputType: "select",
                    //     children: this.SET_enumsSelect({
                    //         keyword: "usageStatusEnum",
                    //     }),
                    // },
                    // {
                    //     label: "承载状态",
                    //     value: "loadStatus",
                    //     inputType: "select",
                    //     children: this.SET_enumsSelect({
                    //         keyword: "loadStatusEnum",
                    //     }),
                    // },
                    // {
                    //     label: "启用状态",
                    //     value: "enabled",
                    //     inputType: "select",
                    //     children: this.SET_enumsSelect({
                    //         keyword: "enableStatusEnum",
                    //     }),
                    // },
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
                    label: "容器编码",
                    minWidth: "",
                    sortable: false,
                    show: true,
                },
                {
                    prop: "name",
                    label: "容器名称",
                    minWidth: "",
                    sortable: false,
                    show: true,
                },
                {
                    prop: "traySizeDesc",
                    label: "库位型号",
                    minWidth: "",
                    sortable: false,
                    show: true,
                },

                {
                    prop: "length",
                    label: "长",
                    minWidth: "",
                    sortable: false,
                    show: true,
                },
                {
                    prop: "wide",
                    label: "宽",
                    minWidth: "",
                    sortable: false,
                    show: true,
                },
                {
                    prop: "high",
                    label: "高",
                    minWidth: "",
                    sortable: false,
                    show: true,
                },
                // {
                //     prop: "enabledText",
                //     label: "是否可用",
                //     minWidth: "",
                //     sortable: false,
                //     show: true,
                // },


                {
                    prop: "remark",
                    label: "备注",
                    minWidth: "",
                    show: true,
                },

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
                model: [{
                    label: "容器编码",
                    type: "input",
                    prop: "code",
                },
                {
                    label: "容器名称",
                    type: "input",
                    prop: "name",
                },


                {
                    label: "库位型号",
                    type: "select",
                    prop: "traySize",
                    child: this.SET_enumsSelect({
                        keyword: "traySizeEnum",
                    }),
                    clearable: false
                },
                {
                    label: "长",
                    type: "number",
                    prop: "length",
                    readonly: true,//不可填
                    props: {
                        precision: 0,
                        // step:0
                    }
                },
                {
                    label: "宽",
                    type: "number",
                    prop: "wide",
                    readonly: true,//不可填
                    props: {
                        precision: 0,
                        // step:0
                    }
                },
                {
                    label: "高",
                    type: "number",
                    prop: "high",
                    readonly: true,//不可填
                    props: {
                        precision: 0,
                        // step:0
                    }
                },

                //  {
                //     label: "长/宽/高",
                //     type: "inputSpecial",
                //     layerprop: "layerNum",
                //     rowprop: "heightNum",
                //     columnprop: "columnNum",
                //     required: true,
                // },



                // {
                //     label: "启用状态",
                //     type: "switch",
                //     prop: "enabled",
                // },


                {
                    label: "备注",
                    type: "textarea",
                    prop: "remark",
                },

                ],
                rules: {
                    code: [{ required: true, message: "必填", trigger: "blur" }],
                    name: [{ required: true, message: "必填", trigger: "blur" }],
                    traySizeDesc: [{ required: true, message: "必填", trigger: "blur" }],
                    traySize: [{ required: true, message: "必填", trigger: "blur" }],
                    length: [{ required: true, message: "必填", trigger: "blur" }],
                    wide: [{ required: true, message: "必填", trigger: "blur" }],
                    high: [{ required: true, message: "必填", trigger: "blur" }],
                    // enabledText: [{ required: true, message: "必填", trigger: "blur" }],
                    // areaUser: [{ required: true, message: "必填", trigger: "blur" }],
                    // enabled: [{ required: true, message: "必填", trigger: "blur" }],

                },
                value: {
                    code: '',
                    name: '',
                    traySize: "",
                    length: "",
                    wide: "",
                    high: "",
                    // enabled: true,
                    // enabled:true,
                    remark: '',
                    // areaUser:"",

                },
                requestData: {
                    flage: "add",
                    url: warehouse.tray,
                    fn: this.getTable,

                },
            },
        }
    }
}