import {
  Product
} from "@/api/request/swagger";
export default {
  data() {
    return {
      TreeSelectIds:"",
      // 查询表单
      formSearchData: {
        reset: true,
        expendShow: false,
        value: {
          code: null,
          TypeId: null,
          TreeSelectIds: null,
          DisplayName:null,
          Enabled: null,
        },
        tableSearch: [{
            label: "物料编码",
            value: "code",
            inputType: "text",
          },
          {
            label: "物料类别名称",
            value: "TypeId",
            inputType: "select",
            // inputType: "treeSelect",
            children: [],
            // props: {
            //   value: "key", // ID字段名
            //   label: "value", // 显示名称
            //   children: "child", // 子级字段名
            // }
          },
        //   {
        //     label: "物料类别名称",
        //     value: "DisplayName",
        //     inputType: "select",
        //     children: [],
        //     change: this.regionChange
        // },
          // {
          //   label: "启用状态",
          //   value: "Enabled",
          //   inputType: "select",
          //   children: this.SET_enumsSelect({
          //     keyword: "enableStatusEnum",
          //   }),
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
          prop: "code",
          label: "物料编码",
          minWidth: "",
          sortable: false,
          show: true,
        },
        {
          prop: "displayName",
          label: "物料名称",
          minWidth: "250",
          sortable: false,
          show: true,
        },
        {
          prop: "productTypeCode",
          label: "物料类别编码",
          minWidth: "",
          sortable: false,
          show: true,
        },
        {
          prop: "productTypeDispalyName",
          label: "物料类别名称",
          minWidth: "",
          sortable: false,
          show: true,
        },
        {
          prop: "unitDisplayName",
          label: "单位",
          minWidth: "80",
          sortable: false,
          show: true,
        },
        {
          prop: "maxCount",
          label: "最大库存",
          minWidth: "80",
          sortable: false,
          show: true,
        },
        {
          prop: "minCount",
          label: "最小库存",
          minWidth: "80",
          sortable: false,
          show: true,
        },
        {
          prop: "itemModel",
          label: "规格型号",
          minWidth: "400",
          sortable: false,
          show: true,
        },
        {
          prop: "enabledText",
          label: "是否可用",
          minWidth: "80",
          sortable: false,
          show: true,
        },
        {
          prop: "remark",
          label: "备注",
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
            label: "物料编码",
            type: "input",
            prop: "code",

            readonly: false, //不可填
          },
          {
            label: "物料名称",
            type: "input",
            prop: "displayName",

            readonly: false, //不可填
          },
          {
            label: "物料类别名称",
            type: "select",
            prop: "productTypeId",
            child: [],
          },

          {
            label: "规格型号",
            type: "input",
            prop: "itemModel",
            readonly: false, //可填
          },
          {
            label: "单位",
            type: "select",
            child: [],
            prop: "unitId",
            readonly: false, //不可填
          },
          {
            label: "最大库存",
            type: "number",
            prop: "maxCount",
            props:{
              precision:0,
              // step:0
          },
            readonly: false, //不可填
          },
          {
            label: "最小库存",
            type: "number",
            prop: "minCount",
            props:{
              precision:0,
              // step:0
          },
            readonly: false, //不可填
          },
          {
            label: "是否可用",
            type: "switch",
            prop: "enabled",
            // readonly: false, //可填
          },

          {
            label: "备注",
            type: "textarea",
            prop: "remark",
          },
        ],
        rules: {
          code: [{
            required: true,
            message: "必填",
            trigger: "blur"
          }],
          displayName: [{
            required: true,
            message: "必填",
            trigger: "blur"
          }],
          productTypeId: [{
            required: true,
            message: "必填",
            trigger: "blur"
          }],

          maxCount: [{
            required: true,
            message: "必填",
            trigger: "blur"
          }],
          unitId: [{
            required: true,
            message: "必填",
            trigger: "blur"
          }],
          minCount: [{
            required: true,
            message: "必填",
            trigger: "blur"
          }],
        },
        value: {
          code: "",
          displayName: "",
          productTypeId: "",
          itemModel: "",
          unitId: "",
          maxCount: "",
          minCount: "",
          remark: "",
          enabled: true,

        },
        requestData: {
          flage: "add",
          url: Product.product,
          fn: this.getTable,
        },
      },
    }
  }
}
