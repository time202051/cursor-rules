import { Point, config } from "@/api/request/swagger";
export default {
    data() {
        return {
            // 查询表单（需传参）
            formSearchData: {
                reset: false, //重置
                expendShow: false,//展开
                value: {
                    jobName: null,
                    jobCode: null,
                    enabledText: null,
                    // enabledText:true
                    // BoxModel: null,
                },
                tableSearch: [
                    // {
                    //     label: "任务编号",
                    //     value: "jobCode",
                    //     inputType: "text",
                    // },
                    // {
                    //     label: "任务名称",
                    //     value: "jobName",
                    //     inputType: "text",
                    // },
                    // {
                    //     label: "启用状态",
                    //     value: "enabledText",
                    //     inputType: "text",
                    // },



                ],
            },
            // 表格数据（展示）
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
                columns: [
                    {
                        label: "",
                        minWidth: "",
                        type: 'selection',
                        show: true,
                    },
                    {
                        prop: "jobCode",
                        label: "任务编号",
                        minWidth: "",
                        sortable: false,
                        show: true,
                    },
                    {
                        prop: "jobName",
                        label: "任务名称",
                        minWidth: "",
                        sortable: false,
                        show: true,
                    },
                    // {
                    //     prop: "bwid",
                    //     label: "id",
                    //     minWidth: "",
                    //     sortable: false,
                    //     show: true,
                    // },
                    {
                        prop: "enabledText",
                        label: "启用状态",
                        minWidth: "",
                        sortable: false,
                        show: true,
                        // 高级函数，可以判断修改表格字段标识
                        render: m => {
                           
                            if(m.jobCode==="1008"){
                                return m.runmodeenumDesc
                            }
                            return m.enabledText
                        }
                    },

                    // {
                    //     prop: "creationTime",
                    //     label: "创建时间",
                    //     minWidth: "",
                    //     sortable: false,
                    //     show: true,
                    // },
                    // {
                    //     prop: "remark",
                    //     label: "备注",
                    //     minWidth: "",
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
            // 弹窗数据
            form: {
                dialogFormVisible: false,

                title: "",
                model: [
                    {
                        label: "点位",
                        type: "input",
                        prop: "pointCode",
                    },

                    {
                        label: "业务类型",
                        type: "select",
                        prop: "businessType",
                        clearable: true,
                        child: this.SET_enumsSelect({
                            keyword: "businessTypeEnum",
                        }),
                    },
                    {
                        label: "空容器型号",
                        type: "input",
                        prop: "boxModel",
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
                    // boxModel: [{ required: true, message: "必填", trigger: "blur" }],
                    pointCode: [{ required: true, message: "必填", trigger: "blur" }],
                },
                value: {
                    jobCode: "",
                    jobName: "",
                    // businessType: "",
                    // remark: "",
                    enabledText: true,
                },
                requestData: {
                    flage: "add",
                    url: Point.pointConfig,
                    fn: this.getTable,
                    specialFn: true,
                },
            },
        }
    }
}
