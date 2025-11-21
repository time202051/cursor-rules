export default {
  data() {
    return {
      //波次订单信息
      BCorder: {
        multipleSelection: [],
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
              prop: "regionCode",
              label: "区域",
              minWidth: "",
              sortable: false,
              show: true,
            },
            {
              prop: "cargoLationCode",
              label: "库位编码",
              minWidth: "",
              sortable: false,
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
              prop: "productBatch",
              label: "批次",
              minWidth: "",
              sortable: false,
              show: true,
            },
            {
              prop: "_qty",
              label: "账面数量",
              minWidth: "",
              sortable: false,
              show: true,
            },
            {
              prop: "changedQty",
              label: "损益数量",
              minWidth: "",
              sortable: false,
              show: true,
            },
            {
              prop: "unitName",
              label: "单位",
              minWidth: "",
              sortable: false,
              show: true,
            },
          ], //表头
          operates: [], //表格里面的操作按钮
          tableHeightDiff: 350,
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

}
