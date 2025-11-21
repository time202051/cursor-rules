import { Point } from "@/api/request/swagger";
export default {
    data() {
        return {
            // 查询表单
            formSearchData: {
                reset: true,
                expendShow: false,
                value: {
                    ProductCode: null,
                    LocationCode:null,
                    OrderCode:null,
                    RoadWayCode:null,
                    timer:[],
                },
                tableSearch: [
                    // 物料这个字段都需要是先输入再加载下拉的形式
                    // remoteMethod是固定写法
                    // {
                    //     label: "物料",
                    //     value: "CodeOrName",
                    //     inputType: "selectRemoteMethod",
                    //     children: [],
                    //     loading:false,
                    //     remoteMethod:this.remoteMethod
                    //   },
                    {
                        label: "物料编码",
                        value: "ProductCode",
                        inputType: "text",
                    },
                    {
                        label: "库位编码",
                        value: "LocationCode",
                        inputType: "text",
                    },

                       {
                      label: "巷道编码",
                      value: "RoadWayCode",
                       inputType: "text",
                      // inputType: "select",
                      // children: this.SET_enumsSelect({
                      //   keyword: "enableStatusEnum",
                      // }),
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
                        prop: "productType",
                        label: "物料类别名称",
                        minWidth: "100",
                        sortable: false,
                        show: true,
                    },
                  {
                        prop: "productCode",
                        label: "物料编码",
                        minWidth: "100",
                        sortable: false,
                        show: true,
                    },
                    {
                        prop: "productName",
                        label: "物料名称",
                        minWidth: "300",
                        sortable: false,
                        show: true,
                    },
                    {
                        prop: "rawQty",
                        label: "原始数量",
                        minWidth: "80",
                        sortable: false,
                        show: true,
                    },
                    {
                        prop: "changeQty",
                        label: "变化数量",
                        minWidth: "80",
                        sortable: false,
                        show: true,
                    },
                    {
                        prop: "nowQty",
                        label: "变化后数量",
                        minWidth: "90",
                        sortable: false,
                        show: true,
                    },
                    {
                        prop: "cargoLocationCode",
                        label: "库位编码",
                        minWidth: "100",
                        sortable: false,
                        show: true,
                    },
                  {
                    prop: "endCode",
                    label: "出库终点",
                    minWidth: "100",
                    sortable: false,
                    show: true,
                  },
                    {
                        prop: "unit",
                        label: "单位",
                        minWidth: "80",
                        sortable: false,
                        show: true,
                    },
                    {
                        prop: "roadWayCode",
                        label: "巷道编码",
                        minWidth: "100",
                        sortable: false,
                        show: true,
                    },
                    // {
                    //     prop: "batchNo",
                    //     label: "批号",
                    //     minWidth: "",
                    //     sortable: false,
                    //     show: true,
                    // },
                    {
                        prop: "containerCode",
                        label: "容器编码",
                        minWidth: "100",
                        sortable: false,
                        show: true,
                    },
                    {
                        prop: "containerType",
                        label: "容器类型",
                        minWidth: "100",
                        sortable: false,
                        show: true,
                    },
                    {
                        prop: "originBillNo",
                        label: "来源单号",
                        minWidth: "",
                        show: true,
                    },
                    {
                        prop: "businessType",
                        label: "业务类型",
                        minWidth: "100",
                        show: true,
                    },
                    {
                        prop: "historyTypeDesc",
                        label: "库存流水类别",
                        minWidth: "100",
                        show: true,
                    },
                    {
                        prop: "creationTime",
                        label: "创建时间",
                        minWidth: "",
                        sortable: false,
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
