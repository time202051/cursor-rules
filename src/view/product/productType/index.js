import { Product } from "@/api/request/swagger";
export default {
    data() {
        return {
            // 查询表单
            formSearchData: {
                reset: true,
                expendShow: false,
                value: {
                    Code: null,
                    DisplayName: null,
                },
                tableSearch: [
                    {
                        label: "物料类别编码",
                        value: "Code",
                        inputType: "text",
                    },
                    {
                        label: "物料类别名称",
                        value: "DisplayName",
                        inputType: "text",
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
                 label: "物料类别编码",
                 prop: "code", minWidth: "",
                 sortable: false,
                 show: true,

               },
               {
                 label: "物料类别名称",
                 prop: "displayName", minWidth: "",
                 sortable: false,
                 show: true,
               },
            //    {
            //      label: "启用",
            //      prop: "enabledText", minWidth: "",
            //      sortable: false,
            //      show: true,
            //    },
               {
                 label: "备注",
                 prop: "remark",
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
                        label: "物料类别编码",
                        type: "input",
                        prop: "code",
                    },
                    {
                        label: "物料类别名称",
                        type: "input",
                        prop: "displayName",
                    },

                    // {
                    //     label: "启用",
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
                    displayName: [{ required: true, message: "必填", trigger: "blur" }],
                    code: [{ required: true, message: "必填", trigger: "blur" }],
                },
                value: {
                    code: "",
                    displayName: "",
                    // enabled: true,
                    remark: "",
                },
                requestData: {
                    flage: "add",
                    url: Product.productType,
                    fn: this.getTable,
                },
            },
        }
    }
}
