import { ConfigInfo } from "@/api/request/swagger";
export default {
    data() {
        return {
            // 查询表单
            formSearchData: {
                reset: true,
                expendShow: false,
                value: {
                    EntranceCode: null,
                    BusinessTypeCode: null,
                },
                tableSearch: [
                    {
                        label: "出入口编码",
                        value: "EntranceCode",
                        inputType: "text",
                    },
                    {
                        label: "业务类型编码",
                        value: "BusinessTypeCode",
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
                columns: [
                    {
                        label: "",
                        minWidth: "",
                        type: 'selection',
                        show: true,
                    },
                    {
                        prop: "entranceCode",
                        label: "出入口编码",
                        minWidth: "",
                        sortable: false,
                        show: true,
                    },
                    {
                        prop: "entranceName",
                        label: "出入口名称",
                        minWidth: "",
                        sortable: false,
                        show: true,
                    },
                    {
                        prop: "businessTypeCode",
                        label: "业务类型编码",
                        minWidth: "",
                        sortable: false,
                        show: true,
                    },
                    {
                        prop: "businessTypeName",
                        label: "业务类型名称",
                        minWidth: "",
                        sortable: false,
                        show: true,
                    },
                    // {
                    //     prop: "creationTime",
                    //     label: "创建时间",
                    //     minWidth: "",
                    //     sortable: false,
                    //     show: true,
                    //     render: m => {
                    //         return (
                    //             <span>
                    //                 <span  onClick={this.handleDeatils} style="color: red;">{m.creationTime}</span>
                    //             </span>
                    //         )
                    //     }
                    // },
                    // {
                    //     prop: "enabledText",
                    //     label: "启用状态",
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
            form: {
                dialogFormVisible: false,
              
                title: "",
                model: [
                    {
                        label: "出入口编码",
                        type: "input",
                        prop: "entranceCode",
                    },
                    {
                        label: "业务类型编码",
                        type: "input",
                        prop: "businessTypeCode",
                    },
                    
                    // {
                    //     label: "业务类型",
                    //     type: "select",
                    //     prop: "businessType",
                    //     clearable:true,
                    //     child: this.SET_enumsSelect({
                    //         keyword: "businessTypeEnum",
                    //     }),
                    // },
                   
                    // {
                    //     label: "启用",
                    //     type: "switch",
                    //     prop: "enabled",
                    // },

                    // {
                    //     label: "备注",
                    //     type: "textarea",
                    //     prop: "remark",
                    // },
                ],
                rules: {
                    entranceCode: [{ required: true, message: "必填", trigger: "blur" }],
                    businessTypeCode: [{ required: true, message: "必填", trigger: "blur" }],
                },
                value: {
                    entranceCode: "",
                    businessTypeCode: "",
                    // businessType: "",
                    remark: "",
                    enabled: true,
                },
                requestData: {
                    flage: "add",
                    url: ConfigInfo.entrancebusinessconfig,
                    fn: this.getTable,
                    // specialFn:true,
                },
            },
        }
    }
}
