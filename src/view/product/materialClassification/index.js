import { Point, Product } from "@/api/request/swagger";
export default {
    data() {
        return {
            // 查询表单
            formSearchData: {
                reset: true,
                expendShow: false,
                value: {
                    ProductClassCode: null,
                    ProductClassName: null
 
                },
                tableSearch: [
                    {
                        label: "零件分类编码",
                        value: "ProductClassCode",
                        inputType: "text",
                    },
                    {
                        label: "零件分类名称",
                        value: "ProductClassName",
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
                        prop: "classCode",
                        label: "零件分类编码",
                        minWidth: "",
                        sortable: false,
                        show: true,
                    },
                    {
                        prop: "classLevel",
                        label: "零件分类等级",
                        minWidth: "",
                        sortable: false,
                        show: true,
                    },
                    {
                        prop: "parentClass",
                        label: "上级分类编码",
                        minWidth: "",
                        sortable: false,
                        show: true,
                    },
                    {
                        prop: "className",
                        label: "零件分类名称",
                        minWidth: "",
                        sortable: false,
                        show: true,
                    },
                    // {
                    //     prop: "enabledText",
                    //     label: "状态",
                    //     minWidth: "",
                    //     sortable: false,
                    //     show: true,
                    // },
                    
                    {
                        prop: "createdUser",
                        label: "创建人",
                        minWidth: "",
                        sortable: false,
                        show: true,
                    },
                    {
                        prop: "createTime",
                        label: "创建时间",
                        minWidth: "",
                        show: true,
                    },
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
                titleAdd: true,
                title: "",
                model: [

                    {
                        label: "零件分类编码",
                        type: "input",
                        prop: "classCode",
                    },
                   
                    {
                        label: "零件分类名称",
                        type: "input",
                        prop: "className",
                    },
                        {
                        label: "上级分类编码",
                        type: "select",
                        prop: "parentCode",
                        child: [],
                        // clearable: false
                        change:this.parentCodeEnumChange
                    },
                
                    // {
                    //     label: "分类等级",
                    //     type: "select",
                    //     prop: "classLevel",
                    //     disabled:true,
                    //     child: [],
                    // },
                    {
                        label: "分类等级",
                        type: "input",
                        prop: "classLevel",
                        disabled:true,
                        //  readonly: true,//不可填
                    },

               
               
                ],
                rules: {
                    classCode: [{ required: true, message: "必填", trigger: "blur" }],
                    className: [{ required: true, message: "必填", trigger: "blur" }],
                    // parentCode: [{ required: true, message: "必填", trigger: "blur" }],
                    // classLevel: [{ required: true, message: "必填", trigger: "blur" }],
                },
                value: {
                    classCode: "",
                    className: "",
                    parentCode: "",
                    classLevel: 1,
                    compareKey:"",
                    // parentClass:"",
                    // {
                    //     "classCode": "string",
                    //     "className": "string",
                    //     "parentCode": "string",
                    //     "classLevel": 0
                    //   }
                    
                    // remark: "",
                    // enabled: true,
                },
                requestData: {
                    flage: "add",
                    url:Product.productClass,
                    fn: this.getTable,
                },
            },
        }
    },
    
}
