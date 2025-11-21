import { Point } from "@/api/request/swagger";
export default {
    data() {
        return {
            // 查询表单
            formSearchData: {
                reset: true,
                expendShow: false,
                value: {
                    StationCode: null,
                    StationName: null,
                    RegionId: null,
                    Enabled: null,
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
                        value: "RegionId",
                        inputType: "select",
                        children: this.SET_enumsSelect({
                            keyword: "regionEnum",
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
                        prop: "stationCode",
                        label: "包装工位编码",
                        minWidth: "",
                        sortable: false,
                        show: true,
                    },
                    {
                        prop: "stationName",
                        label: "包装工位名称",
                        minWidth: "",
                        sortable: false,
                        show: true,
                    },
                    {
                        prop: "regionCode",
                        label: "所属区域",
                        minWidth: "",
                        sortable: false,
                        show: true,
                    },
                    {
                        prop: "creationTimeText",
                        label: "创建时间",
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
                    producationBatchCode: "",
        productCode: "",
        date: "",
        customerId: "",
        qualityRank: "",
        remark: "",
        enabled: true,
                },
                requestData: {
                    flage: "add",
                    url: Product.batch,
                    fn: this.getTable,
                },
            },
        }
    }
}
