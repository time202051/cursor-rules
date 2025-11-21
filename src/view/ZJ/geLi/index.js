import { Point, StockInfo ,warehouse} from "@/api/request/swagger";

export default {
  data() {
    return {
      // 查询表单
      formSearchData: {
        reset: true, //重置
        expendShow: true, //展开
        value: {
          // ProductCode: null, //对应输入框的value字段
          // LPN: null,
          // BillNo: null,
          // OrginalBillNo: null,
          // StockInBusinessType: [],
          // StockInOrderState: [],
          // ProdcutCode:"",
          // ProductName:"",
          // ProdcutCodes: [],
          // ContainerCode: null,
          timer: [],
        },
        tableSearch: [
          {
            label: '隔离单号',
            value: 'isolationNo',
            inputType: 'text'
          },
          
          {
            label: "单据状态",
            inputType: "select",
            value: "isolationStatus",
            children: [],
          },
          {
            label: "创建时间",
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
           {
            label: "零件编码",
            value: "ProductCode",
            inputType: "text",
          },
          {
            label: "母托盘码",
            value: "ContainerCode",
            inputType: "text",
          },
          {
            label: "子托盘码",
            value: "SubtrayCode",
            inputType: "text",
          },

        ],
      },
      // 表格数据
      tableData: {
        loading: false,
        emptyImg: true,
        options: {
          entityName:"Isolation",
          selection: true, //多选框
          index: null, //序号
          headTool: true, //开启头部工具栏
          refreshBtn: true, //开启表格头部刷新按钮
          downloadBtn: true, //开启表格头部下载按钮
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
            prop: "isolationStatus",
            label: "隔离单状态",
            // minWidth: "200",
            sortable: false,
            show: true,
          },
          {
            prop: "isolationNo",
            label: "隔离订单号",
            minWidth: "200",
            sortable: false,
            show: true,
          },
          {
            prop: "isolationType",
            label: "订单类型",
            minWidth: "200",
            sortable: false,
            show: true,
          },
          {
            prop: "company",
            label: "公司",
            minWidth: "120",
            sortable: false,
            show: true,
          },
          {
            prop: "warehouseName",
            label: "仓库",
            minWidth: "100",
            sortable: false,
            show: true,
          },
          {
            prop: "creater",
            label: "创建人",
            minWidth: "200",
            sortable: false,
            show: true,
          },
          {
            prop: "createTime",
            label: "创建时间",
            // minWidth: "100",
            sortable: false,
            show: true,
          },
          {
            prop: "details",
            label: "隔离单明细",
            // minWidth: "",
            // fixed: 'right',
            sortable: false,
            show: true,
            renderSlot: true,
            // render: m => {
            //   return <span style="color: #1682e6;cursor: pointer;"
            //                onClick={this.details} >详情</span>
            // }
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
      detailsform: {
        outerVisible: false,
        title: "详情",
        row: {},
        requestData: {
          flage: "add",
          // url: Point.point,
          fn: this.getTable,
        },
     },
    }
  }
}
