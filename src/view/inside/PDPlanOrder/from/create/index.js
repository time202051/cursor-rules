export default {
  data() {
    return {
      multipleSelection: [],
      formSearchData: {
        value: {
          warehouseId: null,
          planStartTime: null,
          planEndTime: null,
          iltType: null,
          remark: null,
          RegionId: null,
          ProductLevel: null,
          ProductBatch: null,
          ProductCode: null,
          // AreaId: null,
          ProductType: null,
          SupplierBatch: null,
        },
        msg: [
          {
            label: "仓库编码",
            value: "warehouseId",
            inputType: "select",
            children: [],
            clearable: true,
          },
          {
            label: "计划开始时间",
            value: "planStartTime",
            inputType: "date",
          },
          {
            label: "计划结束时间",
            value: "planEndTime",
            inputType: "date",
          },
          {
            label: "盘点类型",
            value: "iltType",
            inputType: "select",
            children: this.SET_enumsSelect({
              keyword: "iltTypeEnum",
            }),
            clearable: true,
          },
          {
            label: "备注",
            value: "remark",
            inputType: "textarea",
          },
        ],
        detail: [
          {
            label: "盘点区域",
            value: "RegionId",
            inputType: "select",
            children: [],
            disabled:true
          },
          {
            label: "ABC分类",
            value: "ProductLevel",
            inputType: "select",
            children: this.SET_enumsSelect({
              keyword: "productLevelEnum",
            }),
          },
          {
            label: "零件批次",
            value: "ProductBatch",
            inputType: "input",
          },
          {
            label: "零件编码",
            value: "ProductCode",
            inputType: "input",
          },
          // {
          //   label: "盘点库区",
          //   value: "AreaId",
          //   inputType: "select",
          //   children: [],
          // },
          {
            label: "零件属性",
            value: "ProductType",
            inputType: "select",
            children: this.SET_enumsSelect({
              keyword: "attributeTypeEnum",
            }),
          },
          {
            label: "供应商批次",
            value: "SupplierBatch",
            inputType: "input",
          },
        ],
      },
      tableData: {
        loading: false,
        emptyImg: true,
        options: {
          selection: true, //多选框
          index: null, //序号
          headTool: false, //开启头部工具栏
          refreshBtn: false, //开启表格头部刷新按钮
          downloadBtn: false, //开启表格头部下载按钮
        }, //序号和复选框
        rows: [], //表数据
        columns: [
          {
            label: "",
            minWidth: "",
            type: "selection",
            show: true,
          },
          {
            prop: "productCode",
            label: "零件编码",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "productName",
            label: "零件名称",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "ownerCode",
            label: "货主编码",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "productBatch",
            label: "零件批次",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "supplierBatch",
            label: "供应商批次",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "receivingTime",
            label: "收货日期",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "referenceCode",
            label: "参考号",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "stockQty",
            label: "库存数量",
            minWidth: "",
            show: true,
          },
          {
            prop: "boxCount",
            label: "关联箱数",
            minWidth: "",
            show: true,
          },
        ], //表头
        operates: [], //表格里面的操作按钮
        tableHeightDiff: 500,
      },
      paginations: {
        page: 1, //当前位于那页面
        total: 10, //总数
        limit: 20, //一页显示多少条
        pagetionShow: true,
      },
    };
  },
};
