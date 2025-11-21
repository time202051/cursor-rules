export default {
  data() {
    return {
      multipleSelection: [],
      // 查询表单
      formSearchData: {
        reset: true, //重置
        expendShow: false, //展开
        value: {
          ProductCode: null, //对应输入框的value字段
          ProductBatch: null,
        },
        tableSearch: [
          {
            label: "零件编码",
            value: "ProductCode",
            inputType: "text",
          },
          {
            label: "零件批次",
            value: "ProductBatch",
            inputType: "text",
          },
        ],
      },
      tableData: {
        loading: false,
        emptyImg: true,
        options: {
          // entityName:"PackingInformation",
          selection: true, //多选框
          index: true, //序号
          headTool: false, //开启头部工具栏
          refreshBtn: false, //开启表格头部刷新按钮
          downloadBtn: false, //开启表格头部下载按钮
        }, //序号和复选框
        rows: [], //表数据
        columns: [
          // {
          //   label: "",
          //   minWidth: "",
          //   type: "selection",
          //   show: true,
          // },

            {
            prop: "stockStateDesc",
            label: "库存状态",
            minWidth: "80",
            sortable: false,
            show: true,
          },
           {
            prop: "productCode",
            label: "零件编码",
            minWidth: "160",
            sortable: false,
            show: true,
          },
          {
            prop: "productName",
            label: "零件名称",
            minWidth: "200",
            sortable: false,
            show: true,
          },
           {
            prop: "minPackageQty",
            label: "最小包装",
            minWidth: "80",
            sortable: false,
            show: true,
          },
          {
            prop: "unitCode",
            label: "最小单位",
            minWidth: "80",
            sortable: false,
            show: true,
          },
          {
            prop: "batch",
            label: "批次",
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
            prop: "receiveTime",
            label: "收货日期",
            minWidth: "160",
            sortable: false,
            show: true,
          },
          {
            prop: "reference",
            label: "参考号",
            minWidth: "",
            sortable: false,
            show: true,
          },
          // {
          //   prop: "expirationTime",
          //   label: "保质期",
          //   minWidth: "160",
          //   sortable: false,
          //   show: true,
          // },
          {
            prop: "supplier",
            label: "供应商",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "company",
            label: "公司",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "warehouseCode",
            label: "仓库",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "regionCode",
            label: "库区",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "cargoLocationCode",
            label: "库位编码",
            minWidth: "",
            sortable: false,
            show: true,
          },
          // {
          //   prop: "containerType",
          //   label: "容器类型",
          //   minWidth: "180",
          //   sortable: false,
          //   show: true,
          // },
          {
            prop: "containerCode",
            label: "容器编码",
            minWidth: "",
            sortable: false,
            show: true,
          },
          // {
          //   prop: "subtrayCode",
          //   label: "子容器编码",
          //   minWidth: "",
          //   sortable: false,
          //   show: true,
          // },
          {
            prop: "totalQty",
            label: "库存数量",
            minWidth: "80",
            sortable: false,
            show: true,
          },
          {
            prop: "avaliableQty",
            label: "可用数量",
            minWidth: "80",
            sortable: false,
            show: true,
          },
        




        ], // 表头
        operates: [], //表格里面的操作按钮
        tableHeightDiff: 400,
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
