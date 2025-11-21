import { warehouse } from "@/api/request/swagger";
export default {
    data() {
        return {
            // 查询表单
            formSearchData: {
                reset: true,
                expendShow: true,
                value: {
                    Code: null,//编码
                    enabled: null,//启用状态
                    loadStatus: null,//承载状态
                    usageStatus: null,//使用状态
                    locationType: null,//容器形态
                    areaId: null,
                    regionId: null,
                },
                tableSearch: [
                    {
                        label: "编码",
                        value: "Code",
                        inputType: "text",
                    },

                    {
                        label: "容器形态",
                        value: "locationType",
                        inputType: "select",
                        children: this.SET_enumsSelect({
                            keyword: "containerShapeTypeEunm",
                        }),
                    },
                    {
                        label: "使用状态",
                        value: "usageStatus",
                        inputType: "select",
                        children: this.SET_enumsSelect({
                            keyword: "usageStatusEnum",
                        }),
                    },
                    {
                        label: "承载状态",
                        value: "loadStatus",
                        inputType: "select",
                        children: this.SET_enumsSelect({
                            keyword: "loadStatusEnum",
                        }),
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
                        prop: "containerShapeTypeDesc",
                        label: "容器形态",
                        minWidth: "",
                        sortable: false,
                        show: true,
                    },
                    {
                        prop: "usageStatusDesc",
                        label: "使用状态",
                        minWidth: "",
                        sortable: false,
                        show: true,
                    },
                    {
                        prop: "loadStatusDesc",
                        label: "承载状态",
                        minWidth: "",
                        sortable: false,
                        show: true,
                        render: function(row) {
                          return h => {
                            const tagType = row.loadStatus===0 ? 'info' : 'success';
                            return h('el-tag', {
                              props: { type: tagType }
                            }, row.loadStatusDesc);
                          };
                        }
                    },
                    {
                        prop: "enabledText",
                        label: "启用状态",
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
                      label: "编码",
                      type: "input",
                      prop: "code",
                    },
                    {
                        label: "容器形态",
                        type: "select",
                        prop: "containerShapeType",
                        child: this.SET_enumsSelect({
                            keyword: "containerShapeTypeEunm",
                        }),
                    },
                    {
                        label: "使用状态",
                        type: "select",
                        prop: "usageStatus",
                        child: this.SET_enumsSelect({
                            keyword: "usageStatusEnum",
                        }),
                        clearable: false
                    },
                    {
                        label: "承载状态",
                        type: "select",
                        prop: "loadStatus",
                        child: this.SET_enumsSelect({
                            keyword: "loadStatusEnum",
                        }),
                        clearable: false
                    },

                    {
                        label: "启用状态",
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
                    containerShapeType: [{ required: true, message: "必填", trigger: "blur" }],
                    loadStatus: [{ required: true, message: "必填", trigger: "blur" }],
                    usageStatus: [{ required: true, message: "必填", trigger: "blur" }],
                },
                value: {
                    code: "",
                    containerShapeType: "",
                    loadStatus: "",
                    usageStatus: "",
                    remark:'',
                    enabled: true,
                },
                requestData: {
                    flage: "add",
                    url: warehouse.container,
                    fn: this.getTable,
                },
            },
        }
    }
}
