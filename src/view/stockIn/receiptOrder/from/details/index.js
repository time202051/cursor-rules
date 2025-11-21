export default {
  data() {
    return {
      //收货订单信息
      SHOrder: {
        multipleSelection: [],
        // 查询表单
        formSearchData: {
          reset: true, //重置
          expendShow: true, //展开
          value: {
            ProdcutCode: null, //对应输入框的value字段
            ProductName:null,
            ProductBatch: null,
            SupplierBatch:null,
            ReferenceCode:null,
            SubtrayCode:null,
            BoxCode:null
          },
          tableSearch: [
            {
              label: "零件编码",
              value: "ProdcutCode",
              inputType: "text",
            },
            {
              label: "零件名称",
              value: "ProductName",
              inputType: "text",
            },
            {
              label: "零件批次",
              value: "ProductBatch",
              inputType: "text",
            },
            {
              label: "供应商批次",
              value: "SupplierBatch",
              inputType: "text",
            },
            {
              label: "参考号",
              value: "ReferenceCode",
              inputType: "text",
            },
            {
              label: "子托盘编码",
              value: "SubtrayCode",
              inputType: "text",
            },
            {
              label: "箱号",
              value: "BoxCode",
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
            headTool: false, //开启头部工具栏
            refreshBtn: false, //开启表格头部刷新按钮
            downloadBtn: false, //开启表格头部下载按钮
            entityName:"StockInDetail",
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
              prop: "",
              label: "序号",
              minWidth: "50",
              type: "index",
              sortable: false,
              show: true,
              width: 60,
            },
            {
              prop: "productCode",
              label: "零件编码",
              minWidth: "",
              show: true,
            },
            {
              prop: "productName",
              label: "零件名称",
              minWidth: "",
              show: true,
            },
            {
              prop: "qty",
              label: "到货数量",
              minWidth: "",
              show: true,
            },
            {
              prop: "receiveQty",
              label: "实际数量",
              minWidth: "",
              show: true,
            },
            {
              prop: "unit",
              label: "基本单位",
              minWidth: "",
              show: true,
            },
            {
              prop: "specsNum",
              label: "规格型号",
              minWidth: "",
              show: true,
            },
            {
              prop: "productBatch",
              label: "零件批次",
              minWidth: "",
              show: true,
            },
            {
              prop: "supplierBatch",
              label: "供应商批次",
              minWidth: "",
              show: true,
            },
            {
              prop: "subtrayCode",
              label: "子托盘编码",
              minWidth: "",
              show: true,
            },
            {
              prop: "boxCode",
              label: "箱号",
              minWidth: "",
              show: true,
            },
            {
              prop: "isNoStockText",
              label: "是否寄售",
              minWidth: "",
              show: true,
            },
            {
              prop: "referenceCode",
              label: "参考号",
              minWidth: "",
              show: true,
            },
            {
              prop: "ownerCode",
              label: "货主编码",
              minWidth: "",
              show: true,
            },
            {
              prop: "remark",
              label: "明细备注",
              minWidth: "",
              show: true,
            },
            {
              prop: "receivingTime",
              label: "到货日期",
              minWidth: "",
              show: true,
            },
          ], //表头
          operates: [], //表格里面的操作按钮
          tableHeightDiff: 400,
        },
        paginations: {
          page: 1, //当前位于那页面
          total: 10, //总数
          limit: 20, //一页显示多少条
          pagetionShow: true,
        },
      },
    };
  },
};
