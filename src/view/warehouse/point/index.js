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
                },
                tableSearch: [
                    {
                        label: "编码",
                        value: "PointCode",
                        inputType: "text",
                    },
                    {
                        label: "名称",
                        value: "PointName",
                        inputType: "text",
                    },
                    {
                        label: "区域",
                        value: "Region",
                        inputType: "select",
                        children: this.SET_enumsSelect({
                            keyword: "regionEnum",
                        }),
                    },
                    {
                        label: "所属工位",
                        value: "StationId",
                        inputType: "select",
                        children: [],
                    },
                    {
                        label: "点位归属",
                        value: "Ascription",
                        inputType: "select",
                        children: this.SET_enumsSelect({
                            keyword: "ascription",
                        }),
                    },
                    {
                        label: "使用状态",
                        value: "UserState",
                        inputType: "select",
                        children: this.SET_enumsSelect({
                            keyword: "usageStatusEnum",
                        }),
                    },
                    {
                        label: "承载状态",
                        value: "LoadState",
                        inputType: "select",
                        children: this.SET_enumsSelect({
                            keyword: "loadStatusEnum",
                        }),
                    },
                    {
                        label: "启用状态",
                        value: "Enabled",
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
                columns: [
                    {
                        label: "",
                        minWidth: "",
                        type: 'selection',
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
                        prop: "pointName",
                        label: "点位名称",
                        minWidth: "",
                        sortable: false,
                        show: true,
                    },
                    {
                        prop: "regionName",
                        label: "所属区域",
                        minWidth: "",
                        sortable: false,
                        show: true,
                    },
                    {
                        prop: "stationName",
                        label: "所属工位",
                        minWidth: "",
                        sortable: false,
                        show: true,
                    },
                    {
                        prop: "x",
                        label: "X",
                        minWidth: "",
                        sortable: false,
                        show: true,
                    },
                    {
                        prop: "y",
                        label: "Y",
                        minWidth: "",
                        sortable: false,
                        show: true,
                    },
                    {
                        prop: "userStateDesc",
                        label: "使用状态",
                        minWidth: "",
                        sortable: false,
                        show: true,
                    },
                    {
                        prop: "loadStateDesc",
                        label: "载货状态",
                        minWidth: "",
                        sortable: false,
                        show: true,
                    },
                    {
                        prop: "ascriptionDesc",
                        label: "点位归属",
                        minWidth: "",
                        sortable: false,
                        show: true,
                    },
                    {
                        prop: "inOutDesc",
                        label: "点位出入状态",
                        minWidth: "",
                        sortable: false,
                        show: true,
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
                        label: "点位编码",
                        type: "input",
                        prop: "pointCode",
                    },
                    {
                        label: "点位编码",
                        type: "input",
                        prop: "pointName",
                    },
                    {
                        label: "X",
                        type: "input",
                        prop: "x",
                    },
                    {
                        label: "Y",
                        type: "input",
                        prop: "y",
                    },
                    {
                        label: "所属区域",
                        type: "select",
                        prop: "regionId",
                        child: [],
                    },
                    {
                        label: "所属工位",
                        type: "select",
                        prop: "stationId",
                        child: [],
                        clearable: false
                    },

                    {
                        label: "点位归属",
                        type: "select",
                        prop: "ascription",
                        child: this.SET_enumsSelect({
                            keyword: "ascription",
                        }),
                        clearable: false
                    },

                    {
                        label: "点位出入状态",
                        type: "select",
                        prop: "inOut",
                        child: this.SET_enumsSelect({
                            keyword: "inOutEnum",
                        }),
                        clearable: false
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
                    // remark: [{ required: true, message: "必填", trigger: "blur" }],
                    // stationId: [{ required: true, message: "必填", trigger: "blur" }],
                    x: [{ required: true, message: "必填", trigger: "blur" }],
                    y: [{ required: true, message: "必填", trigger: "blur" }],
                    // ascription: [{ required: true, message: "必填", trigger: "blur" }],
                    inOut: [{ required: true, message: "必填", trigger: "blur" }],
                },
                value: {
                    pointCode: "",
                    pointName: "",
                    regionId: "",
                    stationId: "",
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
