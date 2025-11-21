import { warehouse } from "@/api/request/swagger";

export default {
    data() {
        return {
            // 查询表单
            formSearchData: {
                reset: true,
                expendShow: true,
                value: {
                    Code: null,
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
                        value: "Code",
                        inputType: "text",
                    },
                    {
                        label: "区域",
                        value: "regionId",
                        inputType: "select",
                        children: [],
                        change: this.regionChange

                    },
                    {
                        label: "库区",
                        value: "areaId",
                        inputType: "select",
                        children: [],

                    },
                    {
                        label: "货位类型",
                        value: "locationType",
                        inputType: "select",
                        children: this.SET_enumsSelect({
                            keyword: "locationTypeEnum",
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
                columns: [{
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
                    prop: "locationTypeDesc",
                    label: "货位类型",
                    minWidth: "",
                    sortable: false,
                    show: true,
                },
                {
                    prop: "floorNum",
                    label: "层",
                    minWidth: "",
                    sortable: false,
                    show: true,
                },
                {
                    prop: "columnNum",
                    label: "排",
                    minWidth: "",
                    sortable: false,
                    show: true,
                },
                {
                    prop: "layerNum",
                    label: "列",
                    minWidth: "",
                    sortable: false,
                    show: true,
                },
                {
                    prop: "allowBlendItemText",
                    label: "是否允许混放",
                    minWidth: "",
                    sortable: false,
                    show: true,
                },
                {
                    prop: "regionCode",
                    label: "区域编码",
                    minWidth: "",
                    sortable: false,
                    show: true,
                },
                {
                    prop: "areaCode",
                    label: "库区编码",
                    minWidth: "",
                    sortable: false,
                    show: true,
                },
                {
                    prop: "roadWayCode",
                    label: "巷道编码",
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
                        label: "层/排/列",
                        type: "inputSpecial",
                        layerprop: "layerNum",
                        rowprop: "floorNum",
                        columnprop: "columnNum",
                        required: true,
                    },
                    {
                        label: "货位类型",
                        type: "select",
                        prop: "locationType",
                        child: this.SET_enumsSelect({
                            keyword: "locationTypeEnum",
                        }),
                    },
                    {
                        label: "所属区域",
                        type: "select",
                        prop: "regionId",
                        child: [],
                        clearable: false
                    },
                    {
                        label: "所属库区",
                        type: "select",
                        prop: "areaId",
                        child: [],
                        clearable: false
                    },
                    {
                        label: "巷道/货架",
                        type: "select",
                        prop: "roadWayId",
                        child: [],
                        clearable: false
                    },
                    // {
                    //   label: "test",
                    //   type: "input",
                    //   prop: "code",
                    // },

                    {
                        label: "允许混放",
                        type: "switch",
                        prop: "allowBlendItem",
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
                    layerNum: [{ required: true, message: "必填", trigger: "blur" }],
                    floorNum: [{ required: true, message: "必填", trigger: "blur" }],
                    columnNum: [{ required: true, message: "必填", trigger: "blur" }],
                    locationType: [{ required: true, message: "必填", trigger: "blur" }],
                    regionId: [{ required: true, message: "必填", trigger: "blur" }],
                    areaId: [{ required: true, message: "必填", trigger: "blur" }],
                    roadWayId: [{ required: true, message: "必填", trigger: "blur" }],
                },
                value: {
                    layerNum: "",
                    floorNum: "",
                    columnNum: "",
                    locationType: "",
                    regionId: "",
                    areaId: "",
                    roadWayId: "",
                    remark: "",
                    allowBlendItem: true,
                    enabled: true,
                },

                requestData: {
                    flage: "add",
                    url: warehouse.cargoLocation,
                    fn: this.getTable,
                },
            },
        }
    }
}
