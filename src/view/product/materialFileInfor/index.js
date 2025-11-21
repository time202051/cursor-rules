import { Point } from "@/api/request/swagger";
export default {
    data() {
        return {
            // 查询表单
            formSearchData: {
                reset: true,
                expendShow: true,
                value: {
                    PointCode: null,
                    PointName: null,
                    StationId: null,
                    Region: null,
                    UserState: null,
                
                    LoadState: null,
                    Enabled: null,
                    Ascription: null,
                    tunnelId:null,
                    StockOutStationId:null,

                },
                tableSearch: [
                    {
                        label: "物料编码",
                        value: "PointCode",
                        inputType: "text",
                    },
                    {
                        label: "物料类别",
                        value: "PointName",
                        inputType: "text",
                    },
                    {
                        label: "状态",
                        value: "Enabled",
                        inputType: "select",
                        children: this.SET_enumsSelect({
                            keyword: "enableStatusEnum",
                        }),
                    },
                    {
                        label: "创建时间",
                        value: "timer",
                        inputType: "picker",
                        props: {
                            type: 'datetimerange',
                            startPlaceholder: "开始时间",
                            endPlaceholder: "结束时间",
                            placeholder: "选择时间范围",
                            valueFormat: 'yyyy-MM-dd HH:mm:ss',
                        }
                    },
                    {
                        label: "创建人",
                        value: "user",
                        inputType: "text",
                    },
                    {
                        label: "存货类别",
                        value: "Region",
                        inputType: "select",
                        children: this.SET_enumsSelect({
                            keyword: "regionEnum",
                        }),
                    },
                    {
                        label: "ABC类别",
                        value: "StockOutStationId",
                        inputType: "select",
                        children: [],
                    },
                    {
                        label: "物料名称",
                        value: "PointN",
                        inputType: "text",
                    },
                    // {
                    //     label: "通道",
                    //     value: "tunnelId",
                    //     inputType: "select",
                    //     children: [],
                    // },
                    // {
                    //     label: "所属工位",
                    //     value: "StationId",
                    //     inputType: "select",
                    //     children: [],
                    // },
                    // {
                    //     label: "点位归属",
                    //     value: "Ascription",
                    //     inputType: "select",
                    //     children: this.SET_enumsSelect({
                    //         keyword: "ascription",
                    //     }),
                    // },
                    // {
                    //     label: "使用状态",
                    //     value: "UserState",
                    //     inputType: "select",
                    //     children: this.SET_enumsSelect({
                    //         keyword: "usageStatusEnum",
                    //     }),
                    // },
                    // {
                    //     label: "承载状态",
                    //     value: "LoadState",
                    //     inputType: "select",
                    //     children: this.SET_enumsSelect({
                    //         keyword: "loadStatusEnum",
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
                columns: [
                    {
                        label: "",
                        minWidth: "",
                        type: 'selection',
                        show: true,
                    },
                    {
                        prop: "init",
                        label: "序号",
                        minWidth: "50",
                        sortable: false,
                        show: true,
                    },
                    {
                        prop: "pointCode",
                        label: "物料编码",
                        minWidth: "",
                        sortable: false,
                        show: true,
                    },
                    {
                        prop: "pointName",
                        label: "物料名称",
                        minWidth: "",
                        sortable: false,
                        show: true,
                    },
                    {
                        prop: "pointSizeDesc",
                        label: "存货类别",
                        minWidth: "",
                        sortable: false,
                        show: true,
                    },
                    
                    {
                        prop: "regionName",
                        label: "物料分类",
                        minWidth: "",
                        sortable: false,
                        show: true,
                    },
                    {
                        prop: "areaName",
                        label: "规格型号",
                        minWidth: "",
                        sortable: false,
                        show: true,
                    },
                 

                    {
                        prop: "stationName",
                        label: "基本计量单位",
                        minWidth: "",
                        sortable: false,
                        show: true,
                    },
                    {
                        prop: "stockOutStationName",
                        label: "包装率",
                        minWidth: "",
                        sortable: false,
                        show: true,
                    },
                    {
                        prop: "tunnelName",
                        label: "整件单位",
                        minWidth: "",
                        sortable: false,
                        show: true,
                    },
                    
                    
                    // {
                    //     prop: "batch",
                    //     label: "批次管理",
                    //     minWidth: "",
                    //     sortable: false,
                    //     show: true,
                    // },
                    // {
                    //     prop: "y",
                    //     label: "效期管理",
                    //     minWidth: "",
                    //     sortable: false,
                    //     show: true,
                    // },
                  // {
                    //     prop: "userStateDesc",
                    //     label: "捆包拆零管理",
                    //     minWidth: "",
                    //     sortable: false,
                    //     show: true,
                    // },  
                    //    {
                    //     prop: "userStateDesc",
                    //     label: "序列号管理",
                    //     minWidth: "",
                    //     sortable: false,
                    //     show: true,
                    // }, 
                    {
                        prop: "loadStateDesc",
                        label: "质检管理",
                        minWidth: "",
                        sortable: false,
                        show: true,
                    },
                    {
                        prop: "loadStateDesc",
                        label: "拆零拣选",
                        minWidth: "",
                        sortable: false,
                        show: true,
                    },


                    {
                        prop: "userStateDesc",
                        label: "毛重",
                        minWidth: "",
                        sortable: false,
                        show: true,
                    },
                    {
                        prop: "loadStateDesc",
                        label: "净重",
                        minWidth: "",
                        sortable: false,
                        show: true,
                    },
                    {
                        prop: "loadStateDesc",
                        label: "重量单位",
                        minWidth: "",
                        sortable: false,
                        show: true,
                    },
                    {
                        prop: "ascriptionDesc",
                        label: "托最大装箱数",
                        minWidth: "",
                        sortable: false,
                        show: true,
                    },
                    {
                        prop: "inOutDesc",
                        label: "保质期",
                        minWidth: "",
                        sortable: false,
                        show: true,
                    },

                    {
                        prop: "ascriptionDesc",
                        label: "最大库存量",
                        minWidth: "",
                        sortable: false,
                        show: true,
                    },
                    {
                        prop: "inOutDesc",
                        label: "安全库存量",
                        minWidth: "",
                        sortable: false,
                        show: true,
                    },
                    {
                        prop: "ABC",
                        label: "ABC标识",
                        minWidth: "",
                        sortable: false,
                        show: true,
                    },


                    {
                        prop: "color",
                        label: "颜色",
                        minWidth: "",
                        sortable: false,
                        show: true,
                    },
                    {
                        prop: "inOutDesc",
                        label: "货主编码",
                        minWidth: "",
                        sortable: false,
                        show: true,
                    },
                    {
                        prop: "ABC",
                        label: "货主名称",
                        minWidth: "",
                        sortable: false,
                        show: true,
                    },
                    {
                        prop: "ABC",
                        label: "物料形态",
                        minWidth: "",
                        sortable: false,
                        show: true,
                    },
                    {
                        prop: "createUser",
                        label: "创建人",
                        minWidth: "",
                        show: true,
                    },
                    {
                        prop: "createTime",
                        label: "创建时间",
                        minWidth: "",
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
                titleAdd: true,
                model: [

                    {
                        label: "物料编码",
                        type: "input",
                        prop: "pointCode",
                    },
                    {
                        label: "物料名称",
                        type: "input",
                        prop: "pointName",
                    },
                    {
                        label: "分类编码",
                        type: "input",
                        prop: "pointName",
                    },
                    {
                        label: "最小单位",
                        type: "input",
                        prop: "pointName",
                    },
                    {
                        label: "包装率",
                        type: "input",
                        prop: "pointName",
                    },   {
                        label: "整件单位",
                        type: "input",
                        prop: "pointName",
                    },
                    {
                        label: "包装规格",
                        type: "input",
                        prop: "pointName",
                    },
                    // {
                    //     label: "点位出入状态",
                    //     type: "select",
                    //     prop: "inOut",
                    //     child: this.SET_enumsSelect({
                    //         keyword: "inOutEnum",
                    //     }),
                    //     clearable: false
                    // },
                    // {
                    //     label: "点位尺寸",
                    //     type: "select",
                    //     prop: "pointSize",
                    //     child: this.SET_enumsSelect({
                    //         keyword: "pointSizeEnum",
                    //     }),
                    // },
                    
                    // {
                    //     label: "点位归属",
                    //     type: "select",
                    //     prop: "ascription",
                    //     child: this.SET_enumsSelect({
                    //         keyword: "ascription",
                    //     }),
                    //     clearable: false
                    // },

                  
                    // {
                    //     label: "点位尺寸",
                    //     type: "number",
                    //     prop: "PointSize",
                    //     props:{
                    //         precision:0,
                    //         // step:0
                    //     },
                    // },
                    
                    {
                        label: "保质期",
                        type: "input",
                        prop: "x",
                    },
                    {
                        label: "ABC类型",
                        type: "select",
                        prop: "regionId",
                        child: [],
                    },
                    {
                        label: "存货类型",
                        type: "select",
                        prop: "regionId",
                        child: [],
                    },
                     {
                        label: "颜色",
                        type: "input",
                        prop: "stockOutStationId",
                    },
                 
                   

                    // 备件工位
                    // {
                    //     label: "备件工位",
                    //     type: "select",
                    //     prop: "stockOutStationId",
                    //     child: [],
                    //     clearable: false
                    // },
                   
                   
                  
                    {
                        label: "体积",
                        type: "input",
                        prop: "tunnelId",
                    },
                    {
                        label: "毛重",
                        type: "input",
                        prop: "tunnelId",
                    },
                    {
                        label: "净重",
                        type: "input",
                        prop: "tunnelId",
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
                    pointCode: [{ required: true, message: "必填", trigger: "blur" }],
                    pointName: [{ required: true, message: "必填", trigger: "blur" }],
                    regionId: [{ required: true, message: "必填", trigger: "blur" }],
                    // tunnelId: [{ required: true, message: "必填", trigger: "blur" }],
                    // stockOutStationId: [{ required: true, message: "必填", trigger: "blur" }],
                    x: [{ required: true, message: "必填", trigger: "blur" }],
                    y: [{ required: true, message: "必填", trigger: "blur" }],
                    // areaId: [{ required: true, message: "必填", trigger: "blur" }],
                    // stationId: [{ required: true, message: "必填", trigger: "blur" }],
                    // ascription: [{ required: true, message: "必填", trigger: "blur" }],
                    PointSize: [{ required: true, message: "必填", trigger: "blur" }],
                    inOut: [{ required: true, message: "必填", trigger: "blur" }],
                },
                value: {
                    pointCode: "",
                    pointName: "",
                    regionId: "",
                    stationId: "",
                    tunnelId:"",
                    stockOutStationId:"",
                    PointSize:"",
                    areaId:"",//所属库区
                    x: "",
                    y: "",
                    ascription: "",
                    inOut: "",
                    remark: "",
                    enabled: true,
                },
                requestData: {
                    flage: "add",
                    url: Point.point,
                    fn: this.getTable,
                },
            },
        }
    },
    
}
