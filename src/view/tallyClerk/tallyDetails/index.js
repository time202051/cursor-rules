import { Point ,Arrange} from "@/api/request/swagger";
export default {
    data() {
        return {
            // 查询表单
            formSearchData: {
                reset: false,
                expendShow: false,
                value: {
                    // ProductCode: null,
                    // Pallet: null,
                    // Batch: null,
                    // PointCode: null,
                    // ProductCodes:[],
                    timer:[],
                },
                tableSearch: [
                    // {
                    //     label: "零件号",
                    //     value: "ProductCode",
                    //     inputType: "text",
                    // },
                    // {
                    //     label: "托盘号",
                    //     value: "Pallet",
                    //     inputType: "text",
                    // },
                    // {
                    //     label: "箱号",
                    //     value: "BoxCode",
                    //     inputType: "text",
                    // },
                    // {
                    //     label: "批次",
                    //     value: "Batch",
                    //     inputType: "text",
                    // },
                    // {
                    //     label: "点位编码",
                    //     value: "PointCode",
                    //     inputType: "text",
                    // },

                    // {
                    //     label: "计划状态",
                    //     value: "State",
                    //     inputType: "select",
                    //     children: this.SET_enumsSelect({
                    //         keyword: "renovatePlanStateEnum",
                    //     }),
                    // },
                    // {
                    //     label: "入库时间",
                    //     value: "timer",
                    //     inputType: "picker",
                    //     props: {
                    //         type: 'datetimerange',
                    //         startPlaceholder: "开始时间",
                    //         endPlaceholder: "结束时间",
                    //         placeholder: "选择时间范围",
                    //         valueFormat: 'yyyy-MM-dd HH:mm:ss',
                    //     }
                    // },
                ],
            },
            tableData: {
                
                redRow:true,//当前行变红，一个标识
                loading: false,
                emptyImg: true,
                options: {
                    // selection: true, //多选框
                    selection: false, //多选框
                    index: null, //序号
                    headTool: true, //开启头部工具栏
                    refreshBtn: true, //开启表格头部刷新按钮
                    downloadBtn: true, //开启表格头部下载按钮
                }, //序号和复选框
                rows: [], //表数据
                columns: [
                    // {
                    //     label: "",
                    //     minWidth: "",
                    //     type: 'selection',
                    //     show: true,
                    // },
                    {
                        prop: "productCode",
                        label: "零件号",
                        minWidth: "",
                        sortable: false,
                        show: true,
                    },
                    {
                        prop: "productDisplayName",
                        label: "零件描述",
                        minWidth: "",
                        sortable: false,
                        show: true,
                    },
                    {
                        prop: "pallet",
                        label: "托盘号",
                        minWidth: "80",
                        sortable: false,
                        show: true,
                    },
                   

                  
                    {
                        prop: "batch",
                        label: "批次",
                        minWidth: "",
                        sortable: false,
                        show: true,
                    },
                    {
                        prop: "renovateStateDesc",
                        label: "翻包类型",
                        minWidth: "",
                        sortable: false,
                        show: true,
                    },
                    {
                        prop: "whetherSuccessRenovateText",
                        label: "是否已翻包",
                        minWidth: "80",
                        sortable: false,
                        show: true,
                    },
                    {
                        prop: "inTime",
                        label: "入库时间",
                        minWidth: "",
                        sortable: false,
                        show: true,
                    },
                    {
                        prop: "qty",
                        label: "可用数量",
                        minWidth: "70",
                        sortable: false,
                        show: true,
                    },
                
                    {
                        prop: "pointEnabledText",
                        label: "点位启用",
                        minWidth: "",
                        sortable: false,
                        show: true,
                    },
                    {
                        prop: "pointCode",
                        label: "点位编码",
                        minWidth: "",
                        sortable: false,
                        show: true,
                    },
                   
                    {
                        prop: "creationTime",
                        label: "创建时间",
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
                        label: "关闭/开启",
                        type: "switch",
                        prop: "enabled",
                    },

                    
                ],
                rules: {
                    stationCode: [{ required: true, message: "必填", trigger: "blur" }],
                    stationName: [{ required: true, message: "必填", trigger: "blur" }],
                    regionId: [{ required: true, message: "必填", trigger: "blur" }],
                },
                value: {
                    enabled: true,
                },
                requestData: {
                    flage: "autoArrange",
                    url: Arrange.autoArrange,
                    fn: this.getTable,
                },
            },
        }
    }
}
