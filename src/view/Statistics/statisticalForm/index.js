import { warehouse } from "@/api/request/swagger";
export default {
    data() {
        return {
            // 查询表单
            formSearchData: {
                reset: true,
                expendShow: false,
                value: {
                    code: null,
                    enabled: null,
                },
                tableSearch: [
                    {
                        label: "编码",
                        value: "code",
                        inputType: "text",
                    },
                    //   {
                    //     label: "启用状态",
                    //     value: "enabled",
                    //     inputType: "select",
                    //     children: this.SET_enumsSelect({
                    //       keyword: "enableStatusEnum",
                    //     }),
                    //   },
                ],
            },
            // 表格数据
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
                    prop: "regionCode",
                    label: "编码",
                    minWidth: "",
                    sortable: false,
                    show: true,
                },
                {
                    prop: "regionName",
                    label: "名称",
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
            //   弹窗数据
              form: {
                dialogFormVisible: false,
                title: "",
                // 弹窗中的表单内容
                model: [
                  {
                    label: "编码",//接口中的名称
                    type: "input",//类型
                    prop: "code", //参数名，对应下面value的值
                  },
                  {
                    label: "名称",
                    type: "input",
                    prop: "dsiplayName",
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
                  code: [{ required: true, message: "必填", trigger: "blur" }],
                  dsiplayName: [{ required: true, message: "必填", trigger: "blur" }],
                },
                // 双向绑定的值,接口对应的参数名
                value: {
                  code: "",
                  dsiplayName: "",
                  remark: "",
                  enabled: true,
                },
                //弹出层的接口
                requestData: {
                  flage: "add", //标识
                  url: warehouse.region,//添加和修改的接口
                  fn: this.getTable,//fn固定写法，方法名对应
                },
              },

            // 树
            data: [{
                id: 1,
                label: '单据溯源',
                children: [{
                    label: '采购入库单',

                }, {
                    label: '委外加工单',
                }, {
                    label: '采购退货单',
                }, {
                    label: '生产领料单'
                }, {
                    label: '生产退料'
                }, {
                    label: '成品入库单'
                }, {
                    label: '销售计划单'
                }, {
                    label: '客户寄售发货单'
                }, {
                    label: '客户寄售调拨发货'
                }, {
                    label: '销售退货单'
                }
                ],

            }, {
                id: 2,
                label: 'WMS自建单',
                children: [{
                    label: '自建采购退货单',

                }, {
                    label: '委外发料单'
                }, {
                    label: '委外退料单'
                }, {
                    label: '委外成品退货'
                }, {
                    label: '自建杂项入库单'
                }, {
                    label: '自建杂项出库单'
                }, {
                    label: '报废单'
                }]
            }, {
                id: 3,
                label: '到货管理',
                children: [{
                    label: '到货通知单',

                }]
            }, {
                id: 4,
                label: '入库管理',
                children: [{
                    label: '入库单',

                }, {
                    label: '上架记录'
                }, {
                    label: '过账管理'
                }, {
                    label: '收货记录'
                }, {
                    label: '拆箱记录'
                }]
            }, {
                id: 4,
                label: '入库管理',
                children: [{
                    label: '入库单',

                }, {
                    label: '上架记录'
                }, {
                    label: '过账管理'
                }, {
                    label: '收货记录'
                }, {
                    label: '拆箱记录'
                }]
            },
            ],



        };
    },
}



