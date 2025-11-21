export default {
  data() {
    return {
      canAssign: {
        multipleSelection: [],
        // 查询表单
        formSearchData: {
          reset: true, // 重置
          expendShow: false, // 展开
          value: {
            Qty: null, // 对应输入框的value字段
            BoxCode: null,
          },
          tableSearch: [
            {
              label: "尾数量",
              value: "Qty",
              inputType: "number",
              max: 999,
            },
            {
              label: "箱号",
              value: "BoxCode",
              inputType: "text",
            },
          ],
        },
        //表格数据
        tableData: {
          loading: false,
          emptyImg: true,
          options: {
            selection: true, //多选框
            index: null, //序号
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
              prop: "boxCode",
              label: "箱号",
              minWidth: "150",
              sortable: false,
              show: true,
            },
            {
              prop: "productCode",
              label: "零件编码",
              minWidth: "150",
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
              prop: "batch",
              label: "批次",
              minWidth: "120",
              sortable: false,
              show: true,
            },
            {
              prop: "qty",
              label: "数量",
              minWidth: "100",
              sortable: false,
              show: true,
            },
          ], //表头
          operates: [], //表格里面的操作按钮
          tableHeightDiff: 550,
        },
        paginations: {
          page: 1, //当前位于那页面
          total: 10, //总数
          limit: 20, //一页显示多少条
          pagetionShow: true,
        },
      },
      alreadyAssign: {
        multipleSelection: [],
        assignBoxCount: null,
        tableData: {
          loading: false,
          emptyImg: true,
          options: {
            selection: true, //多选框
            index: null, //序号
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
              prop: "boxCode",
              label: "箱号",
              minWidth: "150",
              sortable: false,
              show: true,
            },
            {
              prop: "productCode",
              label: "零件编码",
              minWidth: "150",
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
              prop: "batch",
              label: "批次",
              minWidth: "120",
              sortable: false,
              show: true,
            },
            {
              prop: "qty",
              label: "数量",
              minWidth: "100",
              sortable: false,
              show: true,
            },
          ], //表头
          operates: [], //表格里面的操作按钮
          tableHeightDiff: 520,
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
