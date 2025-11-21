import { Point ,Arrange } from "@/api/request/swagger";
export default {
    data() {
        return {
            // 查询表单
            formSearchData: {
                reset: true,
                expendShow: false,
                value: {
                    OldAreaCode: null,
                    OldCargoLocationCode: null,
                    // BoxCode: null,
                    NewAreaCode: null,
                    NewCargoLocationCode:null,
                    // ProductCodes:[],
                    // timer:[],
                },
                tableSearch: [
                    {
                        label: "原库区编码",
                        value: "OldAreaCode",
                        inputType: "text",
                    },
                    {
                        label: "原库位编码",
                        value: "OldCargoLocationCode",
                        inputType: "text",
                    },
                   
                    {
                        label: "新库区编码",
                        value: "NewAreaCode",
                        inputType: "text",
                    },
                     {
                        label: "新库位编码",
                        value: "NewCargoLocationCode",
                        inputType: "text",
                    },
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
                loading: false,
                emptyImg: true,
                options: {
                    selection: false, //多选框
                    index: null, //序号
                    headTool: true, //开启头部工具栏
                    refreshBtn: true, //开启表格头部刷新按钮
                    downloadBtn: true, //开启表格头部下载按钮
                }, //序号和复选框
                rows: [], //表数据
                columns: [
                 
                    {
                        prop: "productCode",
                        label: "零件编码",
                        minWidth: "",
                        sortable: false,
                        show: true,
                    },
                    {
                        prop: "productDisplayName",
                        label: "产品名称",
                        minWidth: "",
                        sortable: false,
                        show: true,
                    },
                    {
                        prop: "oldAreaCode",
                        label: "原库区编码",
                        minWidth: "",
                        sortable: false,
                        show: true,
                    },
                    {
                        prop: "oldCargoLocationCode",
                        label: "原库位编码",
                        minWidth: "",
                        sortable: false,
                        show: true,
                    },
                    {
                        prop: "newAreaCode",
                        label: "新库区编码",
                        minWidth: "",
                        sortable: false,
                        show: true,
                    },
                    {
                        prop: "newCargoLocationCode",
                        label: "新库位编码",
                        minWidth: "",
                        sortable: false,
                        show: true,
                    },
                    // {
                    //     prop: "unitDisplayName",
                    //     label: "单位名称",
                    //     minWidth: "",
                    //     sortable: false,
                    //     show: true,
                    // },
                    {
                        prop: "containerCode",
                        label: "容器编码",
                        minWidth: "",
                        sortable: false,
                        show: true,
                    },
                    {
                        prop: "batchCode",
                        label: "批号",
                        minWidth: "",
                        sortable: false,
                        show: true,
                    },
                    // {
                    //     prop: "boxCode",
                    //     label: "箱号",
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
                        label: "编码",
                        type: "input",
                        prop: "stationCode",
                    },
                    {
                        label: "名称",
                        type: "input",
                        prop: "stationName",
                    },
                    {
                        label: "所属区域",
                        type: "select",
                        prop: "regionId",
                        child: [],
                    },
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
                    stationCode: [{ required: true, message: "必填", trigger: "blur" }],
                    stationName: [{ required: true, message: "必填", trigger: "blur" }],
                    regionId: [{ required: true, message: "必填", trigger: "blur" }],
                },
                value: {
                    stationCode: "",
                    regionId: "",
                    stationName: "",
                    remark: "",
                    enabled: true,
                },
                requestData: {
                    flage: "add",
                    url: Point.station,
                    fn: this.getTable,
                },
            },
        }
    }
}
