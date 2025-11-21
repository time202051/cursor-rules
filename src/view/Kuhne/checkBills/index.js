import {Point, StockInfo} from "@/api/request/swagger";

export default {
  data() {
    return {
      //按钮数据
      btnlist:[

        {
          title:'导出',
          method:this.export
        }
      ],
      // 查询表单
      formSearchData: {
        reset: true, //重置
        expendShow: true, //展开
        value: {
          ProductCode: null, //对应输入框的value字段
          LPN: null,
          Statem: null,
          BineEnum:null,
          RegionId: null,
          GroundShelfType: null,
          ContainerCode: null,
          timer: [],
        },
        tableSearch: [
          {
            label: "盘点单号",
            value: "LPN",
            inputType: "text",
          },
         
          // {
          //   label: "容器编码",
          //   value: "ContainerCode",
          //   inputType: "text",
            // inputType: "select",
            // children: [],
            // tempBoxData: [],
            // //自定义指令
            // loadmores: {
            //   fn: this.loadmoreGX,
            //   SELECTWRAP_DOM_index: 0,
            //   flage: 'RoadWayId',
            // },
          // },
          {
            label: "盘点类型",
            value: "Statem",
            inputType: "select",
            children: []
          },
          {
            label: "单据状态",
            value: "BineEnum",
            inputType: "select",
            children:[]
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
            label: "批次",
            value: "btch",
            inputType: "text",
          },
          {
            label: "库存锁定属性",
            value: "spec",
            inputType: "text",
          },
        ],
      },
      // 表格数据
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
            label: '',
            minWidth: '',
            type: 'selection',
            show: true
          },
          {
            prop: "orginalBillNo",
            label: "盘点状态",
            minWidth: "200",
            sortable: false,
            show: true,
          },
          {
            prop: "containerShapeTypeDesc",
            label: "盘点单号",
            minWidth: "100",
            sortable: false,
            show: true,
          },
          {
            prop: "containerCode",
            label: "盘点类型",
            minWidth: "200",
            sortable: false,
            show: true,
          },

          {
            prop: "groundShelfTypeDesc",
            label: "公司编码",
            minWidth: "100",
            sortable: false,
            show: true,
          },
          {
            prop: "regionName",
            label: "仓库",
            minWidth: "100",
            sortable: false,
            show: true,
          },
          {
            prop: "totalQty",
            label: "区域",
            minWidth: "120",
            sortable: false,
            show: true,
          },

          {
            prop: "orderCode",
            label: "盘点明细",
            minWidth: "",
            fixed: 'right',
            sortable: false,
            show: true,
            renderSlot:true,
            // render: m => {
            //   return <span style="color: #1682e6;cursor: pointer;"
            //                onClick={this.details} >详情</span>
            // }
          },
          {
            prop: "createUser",
            label: "创建人",
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
        title: "盘点制单",
        model: [

          {
            label: "零件编码",
            type: "input",
            prop: "productCode",
          },
          {
            label: "库位编码",
            type: "input",
            prop: "cargoLocationCode",
          },
          {
            label: "工单号",
            type: "input",
            prop: "orderCode",
          },
          {
            label: "CYCLENO",
            type: "input",
            prop: "cycleno",
          },
          {
            label: "数量",
            type: "number",
            prop: "qty",
            props: {
              precision: 0,
              min: 1
            },
          },
          {
            label: "流水号",
            type: "input",
            prop: "serialNo",
          }, {
            label: "托盘",
            type: "select",
            child: this.traylist,
            prop: "trayId",
          },
        ],
        rules: {
          pointCode: [{required: true, message: "必填", trigger: "blur"}],
          pointName: [{required: true, message: "必填", trigger: "blur"}],
        },
        value: {
          productCode: "",
          cargoLocationCode: "",
          orderCode: "",
          cycleno: "",
          qty: '',
          serialNo: "",
          trayId: "",
        },
        requestData: {
          flage: "add",
          url: Point.point,
          fn: this.getTable,
        },
      },
      detailsform: {
        outerVisible: false,
        // dialogFormVisible: false,
        title: "详情",
        row:{},
        requestData: {
          flage: "add",
          url: Point.point,
          fn: this.getTable,

        },

      },
    }
  }
}
