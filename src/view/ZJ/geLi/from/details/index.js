import {Point} from "@/api/request/swagger";

export default {
  data() {
    return {
      //订单信息
      DetailsOrder:{
        // 查询表单
        formSearchData: {
          reset: true,
          expendShow: false,
          value: {
            // ProductClassCode: null,
            // ProductCode: null,
            // StationId: null,
            // Region: null,
            // UserState: null,
            // LoadState: null,
            // Enabled: null,
            // Ascription: null,
            // tunnelId: null,
            // StockOutStationId: null,

          },
          tableSearch: [
            {
              label: "零件编码",
              value: "ProductCode",
              inputType: "text",
            }, 
            {
              label: "零件名称",
              value: "ProductName",
              inputType: "text",
            }, 
            {
              label: "批次",
              value: "batchNo",
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
          }, //序号和复选框
          rows: [], //表数据
          columns: [

            {
              label: '',
              minWidth: '',
              type: 'selection',
              show: true
            },
            {
              prop: "boxCode",
              label: "箱号",
              sortable: false,
              show: true,
            }, 
            {
              prop: "isQualified",
              label: "是否合格",
              // minWidth: "300",
              sortable: false,
              show: true,
            }, 
            {
              prop: "reasonCode",
              label: "原因码",
              // minWidth: "300",
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
              prop: "productName",
              label: "零件名称",
              minWidth: "",
              sortable: false,
              show: true,
            },
            {
              prop: "batchNo",
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
              prop: "stockTime",
              label: "收货日期",
              minWidth: "",
              sortable: false,
              show: true,
            },
            {
              prop: "subTrayCode",
              label: "子托盘号",
              minWidth: "",
              sortable: false,
              show: true,
            },
            {
              prop: "containerCode",
              label: "母托盘号",
              minWidth: "",
              sortable: false,
              show: true,
            },
            {
              prop: "isOutLTK",
              label: "是否处理库",
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

    }
  },

}
