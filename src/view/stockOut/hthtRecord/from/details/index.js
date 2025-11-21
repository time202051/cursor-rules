import { Point } from "@/api/request/swagger";

export default {
  data() {
    return {
      //合托换托记录
      HTHTrecord: {
        multipleSelection: [],
        tableData: {
          loading: false,
          emptyImg: true,
          options: {
            selection: true, //多选框
            index: true, //序号
            headTool: false, //开启头部工具栏
            refreshBtn: false, //开启表格头部刷新按钮
            downloadBtn: false, //开启表格头部下载按钮
            entityName:"ConsolidineRecordDetail"
          }, //序号和复选框
          rows: [], //表数据
          columns: [
            {
              label: "",
              minWidth: "",
              type: "selection",
              show: true,
            },
            // {
            //   prop: "",
            //   label: "行号",
            //   width:"60",
            //   show: true,
            //   type:"index"
            // },
            {
              prop: "ownerCode",
              label: "货主编码",
              minWidth: "200",
              sortable: false,
              show: true,
            },
            {
              prop: "ownerName",
              label: "货主名称",
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
              prop: "basicUnitName",
              label: "最小单位",
              minWidth: "",
              sortable: false,
              show: true,
            },
            {
              prop: "qty",
              label: "数量",
              minWidth: "",
              sortable: false,
              show: true,
            },
            {
              prop: "containerCode",
              label: "原始托盘码",
              minWidth: "",
              sortable: false,
              show: true,
            },
            {
              prop: "boxCode",
              label: "箱码",
              minWidth: "",
              sortable: false,
              show: true,
            },
            {
              prop: "batchNum",
              label: "零件批次",
              minWidth: "",
              sortable: false,
              show: true,
            },
            {
              prop: "batchSupNum",
              label: "供应商批次",
              minWidth: "",
              sortable: false,
              show: true,
            },
            {
              prop: "date",
              label: "收货日期",
              minWidth: "",
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
};
