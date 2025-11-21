import { Product, warehouse } from "@/api/request/swagger";
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
                        label: "业务编码",
                        value: "Code",
                        inputType: "text",
                    },
                    {
                        label: "业务名称",
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
                    prop: "code",
                    label: "业务编码",
                    minWidth: "",
                    sortable: false,
                    show: true,
                },
                {
                    prop: "name",
                    label: "业务名称",
                    minWidth: "",
                    sortable: false,
                    show: true,
                }, 
                {
                    prop: "typeDesc",
                    label: "出入库方式",
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

                // {
                //     prop: "areaUser",
                //     label: "创建人",
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
                        label: "业务编码",
                        type: "input",
                        prop: "code",
                        // readonly: true,//不可填
                    },
                    {
                        label: "业务名称",
                        type: "input",
                        prop: "name",
                        // readonly: true,//不可填
                    },
                    // {
                    //     label: "出入库方式",
                    //     type: "select",
                    //     prop: "locationTypeDesc",
                    //     child: [],
                    //     clearable: false
                    // },

                    {
                        label: "出入库方式",
                        type: "select",
                        prop: "type",
                        child: this.SET_enumsSelect({
                            keyword: "businessTypeEnum",
                        }),
                        clearable: false
                    },


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
                    // {
                    //     label: "创建时间",
                    //     prop: "creationTime",
                    //     type: "input",
                    //     readonly: true,//不可填

                    // },
                    // {
                    //     label: "最大码托数",
                    //     type: "number",
                    //     prop: "maxPalletCount",
                    //     readonly: false,//可填
                    // },


                ],
                rules: {
                    code: [{ required: true, message: "必填", trigger: "blur" }],
                    name: [{ required: true, message: "必填", trigger: "blur" }],
                    type: [{ required: true, message: "必填", trigger: "blur" }],
                    // areaUser: [{ required: true, message: "必填", trigger: "blur" }],

                },
                value: {
                    code: "",
                    name: "",
                    type: "",
                    // enabled: true,
                    remark: "",

                    // maxPalletCount: "",
                    // boxType: "",
                    // creationTime:"",

                },
                requestData : {
                    flage: "add",
                    url: warehouse.businessType,
                    fn: this.getTable,
                  },
            },
        }
    }
}
