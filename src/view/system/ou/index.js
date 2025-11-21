import { OrganizationUnit } from "@/api/request/swagger";
export default {
    data() {
        return {
            // 查询表单
            formSearchData: {
                reset: true,
                expendShow: false,
                value: {
                    displayCode: null,
                    enabled: null,
                    loadStatus: null,
                    usageStatus: null,
                    locationType: null,
                    areaId: null,
                    regionId: null,
                },
                tableSearch: [
                    {
                        label: "编码",
                        value: "displayCode",
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
                columns: [ {
                    label: "",
                    minWidth: "",
                    type: 'selection',
                    show: true,
                },
                    {
                        prop: "code",
                        label: "编码",
                        minWidth: "",
                        sortable: false,
                        show: true,
                    },
                    {
                        prop: "title",
                        label: "名称",
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
                        label: "上级组织",
                        type: "input",
                        prop: "onlevels",
                        readonly:true,
                    },
                    {
                        label: "名称",
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
                },
                value: {
                    onlevels: "",
                    displayName: "",
                    parentId: "",
                },
                requestData: {
                    flage: "add",
                    url: OrganizationUnit.organizationUnit,
                    fn: this.getTable,
                },
            },
        }
    }
}
