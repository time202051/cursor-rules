
import { warehouse } from "@/api/request/swagger";
export default {
    data() {
        return {
            // 查询表单
            formSearchData: {
                reset: true,
                expendShow: false,
                value: {
                    Code: null,
                    Name: null,
                    // EntranceType: null,
                    // Code: null,
                    // enabled: null,
                    // loadStatus: null,
                    // usageStatus: null,
                    // locationType: null,
                    // areaId: null,
                    // regionId: null,
                },
                tableSearch: [
                    {
                        label: "出入口编码",
                        value: "Code",
                        inputType: "text",
                    },
                    {
                        label: "出入口名称",
                        value: "Name",
                        inputType: "text",
                    },


                    // {
                    //     label: "出入口类型",
                    //     value: "EntranceType",
                    //     inputType: "select",
                    //     children: this.SET_enumsSelect({
                    //         keyword: "entranceTypeEnum",
                    //     }),
                    // },
                    // {
                    //     label: "使用状态",
                    //     value: "usageStatus",
                    //     inputType: "select",
                    //     children: this.SET_enumsSelect({
                    //         keyword: "usageStatusEnum",
                    //     }),
                    // },
                    // {
                    //     label: "承载状态",
                    //     value: "loadStatus",
                    //     inputType: "select",
                    //     children: this.SET_enumsSelect({
                    //         keyword: "loadStatusEnum",
                    //     }),
                    // },
                    // {
                    //     label: "启用状态",
                    //     value: "enabled",
                    //     inputType: "select",
                    //     children: this.SET_enumsSelect({
                    //         keyword: "enableStatusEnum",
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
                columns: [{
                    label: "",
                    minWidth: "",
                    type: 'selection',
                    show: true,
                },

                {
                    prop: "code",
                    label: "出入口编码",
                    minWidth: "",
                    sortable: false,
                    show: true,
                },
                {
                    prop: "name",
                    label: "出入口名称",
                    minWidth: "",
                    sortable: false,
                    show: true,
                },
                // {
                //     prop: "usageStatusDesc",
                //     label: "使用状态",
                //     minWidth: "",
                //     sortable: false,
                //     show: true,
                // },
                // {
                //     prop: "loadStatusDesc",
                //     label: "承载状态",
                //     minWidth: "",
                //     sortable: false,
                //     show: true,
                // },
                // {
                //     prop: "entranceTypeDesc",
                //     label: "出入口类型",
                //     minWidth: "",
                //     sortable: false,
                //     show: true,
                // },
                // {
                //     prop: "owningWarehouse",
                //     label: "所属仓库",
                //     minWidth: "",
                //     sortable: false,
                //     show: true,
                // },
                // {
                //     prop: "floorNum",
                //     label: "层",
                //     minWidth: "",
                //     sortable: false,
                //     show: true,
                // },
                // {
                //     prop: "layerNum",
                //     label: "列",
                //     minWidth: "",
                //     sortable: false,
                //     show: true,
                // },
                // {
                //     prop: "columnNum",
                //     label: "排",
                //     minWidth: "",
                //     sortable: false,
                //     show: true,
                // },

                {
                    prop: "enabledText",
                    label: "是否可用",
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
                    // {
                    //     prop: "areaUser",
                    //     label: "创建人",
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
                model: [{
                    label: "出入口编码",
                    type: "input",
                    prop: "code",
                },
                {
                    label: "出入口名称",
                    type: "input",
                    prop: "name",
                },

                // {
                //     label: "出入口类型",
                //     type: "select",
                //     prop: "entranceType",
                //     child: this.SET_enumsSelect({
                //         keyword: "entranceTypeEnum",
                //     }),
                // },

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
                    name: [{ required: true, message: "必填", trigger: "blur" }],
                    entranceTypeDesc: [{ required: true, message: "必填", trigger: "blur" }],
                    // entranceType: [{ required: true, message: "必填", trigger: "blur" }],
                    // enabledText: [{ required: true, message: "必填", trigger: "blur" }],
                    // areaUser: [{ required: true, message: "必填", trigger: "blur" }],
                    // enabled: [{ required: true, message: "必填", trigger: "blur" }],

                },
                value: {
                    code: '',
                    name: '',
                    // entranceType: "",
                    enabled: true,
                    remark: '',

                },
                requestData: {

                    flage: "add",
                    url: warehouse.entrance,
                    fn: this.getTable,

                },
            },
        }
    }
}
