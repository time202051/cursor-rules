import {Point} from "@/api/request/swagger";

export default {
  data() {
    return {
      //订单信息
      GLorder:{
        // 查询表单
        formSearchData: {
          reset: true,
          expendShow: true,
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
            timer: [],
          },
          tableSearch: [
            {
              label: "零件编码",
              value: "productCode",
              inputType: "text",
            },
            {
              label: "零件名称",
              value: "productName",
              inputType: "text",
            },
            {
              label: "批次",
              value: "batchNo",
              inputType: "text",
            }, 
            {
              label: "供应商批次",
              value: "supplierBatch",
              inputType: "text",
            }, 
            {
              label: "母托盘编号",
              value: "containerCode",
              inputType: "text",
            }, 
            {
              label: "收货日期",
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
              // minWidth: "300",
              sortable: false,
              show: true,
            },  {
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
              prop: "receiveTime",
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
