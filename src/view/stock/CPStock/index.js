import {StockInfo} from "@/api/request/swagger";

export default {
  data() {
    return {
      // 查询表单
      formSearchData: {
        reset: true, //重置
        expendShow: true, //展开
        value: {
          ProductId: null, //对应输入框的value字段
          LocationCode: null,
          OrderCode: null,
          RoadWayCode: null,
          RoadWayId: null,
          LocationType: null,
          timer: [],
        },
        tableSearch: [
          // 物料这个字段都需要是先输入再加载下拉的形式
          // remoteMethod是固定写法
          {
            label: "物料",
            value: "ProductId",
            inputType: "selectRemoteMethod",
            children: [],
            loading: false,
            remoteMethod: this.remoteMethod,
            tempBoxData: [],
            //自定义指令
            loadmores: {
              fn: this.loadmoreGX,
              SELECTWRAP_DOM_index: 0,
              flage: 'ProductId',
            },
          },

          {
            label: "库位编码",
            value: "LocationCode",
            inputType: "text",
          },
          {
            label: "库位类型",
            value: "LocationType",
            inputType: "select",
            children: this.SET_enumsSelect({
              keyword: "locationTypeEnum",
            }),
          },
          {
            label: "工单号",
            value: "OrderCode",
            inputType: "text",
          },
          {
            label: "巷道编码",
            value: "RoadWayCode",
            inputType: "text",
            // inputType: "select",
            // children: [],
            // tempBoxData: [],
            // //自定义指令
            // loadmores: {
            //   fn: this.loadmoreGX,
            //   SELECTWRAP_DOM_index: 0,
            //   flage: 'RoadWayId',
            // },
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
            prop: "productType",
            label: "物料类别名称",
            minWidth: "100",
            sortable: false,
            show: true,
          },
          {
            prop: "productCode",
            label: "物料编码",
            minWidth: "100",
            sortable: false,
            show: true,
          },
          {
            prop: "productName",
            label: "物料名称",
            minWidth: "300",
            sortable: false,
            show: true,
          },

          {
            prop: "qty",
            label: "可用数量",
            minWidth: "80",
            sortable: false,
            show: true,
          },
          {
            prop: "lockQty",
            label: "锁定数量",
            minWidth: "80",
            sortable: false,
            show: true,
          },
          {
            prop: "totalQty",
            label: "总数量",
            minWidth: "80",
            sortable: false,
            show: true,
          },
          {
            prop: "unit",
            label: "单位",
            minWidth: "80",
            sortable: false,
            show: true,
          },
          {
            prop: "roadWayCode",
            label: "巷道编码",
            minWidth: "100",
            sortable: false,
            show: true,
          },
          {
            prop: "cargoLocationCode",
            label: "库位编码",
            minWidth: "100",
            sortable: false,
            show: true,
          },
          {
            prop: "locationTypeDesc",
            label: "库位类型",
            minWidth: "100",
            sortable: false,
            show: true,
          },
          {
            prop: "trayCode",
            label: "容器编码",
            minWidth: "100",
            sortable: false,
            show: true,
          },
          {
            prop: "orderCode",
            label: "工单号",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "cYCLENO",
            label: "CYCLENO",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "serialNo",
            label: "流水号",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "orderNumber",
            label: "来源单号",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "stockLockStateDesc",
            label: "库存锁定状态",
            minWidth: "100",
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
        title: "",
        model: [

          {
            label: "物料编码",
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
              min:1
            },
          },
          {
            label: "流水号",
            type: "input",
            prop: "serialNo",
          },{
            label: "托盘",
            type: "select",
            child: [],
            prop: "trayId",
          },


        ],
        rules: {
          productCode: [{
            required: true,
            message: "必填",
            trigger: "blur"
          }],
          cargoLocationCode: [{
            required: true,
            message: "必填",
            trigger: "blur"
          }],
          orderCode: [{
            required: true,
            message: "必填",
            trigger: "blur"
          }],
          cycleno: [{
            required: true,
            message: "必填",
            trigger: "blur"
          }],
          qty: [{
            required: true,
            message: "必填",
            trigger: "blur"
          }],
          serialNo: [{
            required: true,
            message: "必填",
            trigger: "blur"
          }],
          trayId: [{
            required: true,
            message: "必填",
            trigger: "blur"
          }],

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
        //弹出层标识
        requestData: {
          flage: "add",
          url: StockInfo.cpStock,
          fn: this.getTable,
        },
      },
    }
  }
}
