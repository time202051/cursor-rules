import {StockInfo} from "@/api/request/swagger";

export default {
  data() {
    return {
      // 查询表单
      formSearchData: {
        reset: true, //重置
        expendShow: true, //展开
        value: {
          Productld: null, //对应输入框的value字段
          LocationCode: null,
          BatchNo: null,
          RoadWayName: null,
          StockLockState: null,
          LocationType: null,
          timer: [],
        },
        tableSearch: [

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
            label: "锁定状态",
            value: "StockLockState",
            inputType: "select",
            children: this.SET_enumsSelect({
              keyword: "stockLockStateEnum",
            }),
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
            label: "库位编码",
            value: "LocationCode",
            inputType: "text",
          },
          {
            label: "批号",
            value: "BatchNo",
            inputType: "text",
          },
          {
            label: "巷道编码",
            value: "RoadWayName",
            inputType: "text",
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
            prop: "containerCode",
            label: "容器编码",
            minWidth: "100",
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
            prop: "supplierCode",
            label: "供应商编码",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "productionTime",
            label: "生产日期",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "batchNo",
            label: "批号",
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
            label: "批次",
            type: "input",
            prop: "batchNo",
          },
          {
            label: "供应商",
            type: "input",
            prop: "supplierCode",
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
            label: "生产日期",
            type: "input",
            prop: "productionTime",
          },
        ],
        rules: {
          productCode: [{required: true, message: "必填", trigger: "blur"}],
          cargoLocationCode: [{required: true, message: "必填", trigger: "blur"}],
          batchNo: [{required: true, message: "必填", trigger: "blur"}],
          supplierCode: [{required: true, message: "必填", trigger: "blur"}],
          qty: [{required: true, message: "必填", trigger: "blur"}],
          productionTime: [{required: true, message: "必填", trigger: "blur"}],
        },
        value: {
          productCode: "",
          cargoLocationCode: "",
          batchNo: "",
          supplierCode: "",
          qty: 1,
          productionTime: "",
        },
        //弹出层标识
        requestData: {
          flage: "add",
          url: StockInfo.ycStock,
          fn: this.getTable,
        },
      },
    }
  }
}
