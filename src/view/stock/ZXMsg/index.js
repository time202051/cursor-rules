import { Point ,Reserve} from "@/api/request/swagger";
export default {
  data() {
    return {
      // 查询表单
      formSearchData: {
        reset: true,
        expendShow: true,
        value: {
          BoxCode: null,
          Containecode: null,
          SubtrayCode: null,
          timer: [],
          TailBox: null,
          InformationEnum: null,
          StockInTask: null,
          CargoLocationCode: null,
          Quality:null
        },
        tableSearch: [
          {
            label: "箱编号",
            value: "BoxCode",
            inputType: "text",
          },
          {
            label: "容器编码",
            value: "Containecode",
            inputType: "text",
          },
          {
            label: "子容器编码",
            value: "SubtrayCode",
            inputType: "text",
          },
          {
            label: "创建时间",
            value: "timer",
            inputType: "picker",
            props: {
              type: "datetimerange",
              startPlaceholder: "开始时间",
              endPlaceholder: "结束时间",
              placeholder: "选择时间范围",
              valueFormat: "yyyy-MM-dd HH:mm:ss",
              format: "yyyy/MM/dd HH:mm:ss",
            },
          },
          {
            label: "是否尾箱",
            value: "TailBox",
            inputType: "select",
            children: [
              { key: true, value: "是" },
              { key: false, value: "否" },
            ],
          },
          {
            label: "库存状态",
            value: "InformationEnum",
            inputType: "select",
            children: this.SET_enumsSelect({
              keyword: "packingInformationEnum",
            }),
          },
          {
            label: "关联订单号",
            value: "StockInTask",
            inputType: "text",
          },
          {
            label: "库位编码",
            value: "CargoLocationCode",
            inputType: "text",
          },
          {
            label: "质检状态",
            value: "Quality",
            inputType: "select",
            children: [
              {
                key: "0",
                value: "隔离",
              },
              { key: "1", value: "正常" },
              { key: "2", value: "待检" },
            ],
          },
        ],
      },
      tableData: {
        redRow: true, // 当前行变红，一个标识
        loading: false,
        emptyImg: true,
        options: {
          entityName:"PackingInformation",
          selection: true, // 多选框
          selection: false, // 多选框
          index: true, // 序号
          headTool: true, // 开启头部工具栏
          refreshBtn: true, // 开启表格头部刷新按钮
          downloadBtn: true, // 开启表格头部下载按钮
        }, // 序号和复选框
        rows: [], // 表数据
        columns: [
          {
            label: "",
            minWidth: "",
            type: "selection",
            show: true,
          },
          {
            prop: "boxCode",
            label: "箱编号",
            minWidth: "200",
            sortable: false,
            show: true,
          },
          {
            prop: "containecode",
            label: "容器编码",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "subtrayCode",
            label: "子容器编码",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "productCode",
            label: "零件编码",
            minWidth: "200",
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
            prop: "qty",
            label: "箱装数量",
            minWidth: "120",
            sortable: false,
            show: true,
          },
          {
            prop: "batch",
            label: "零件批次",
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
            prop: "receivingTime",
            label: "收货日期",
            minWidth: "150",
            sortable: false,
            show: true,
          },
          {
            prop: "referenceCode",
            label: "参考号",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "qualityDesc",
            label: "质检状态",
            minWidth: "120",
            sortable: false,
            show: true,
          },
          {
            prop: "informationEnumDesc",
            label: "库存状态",
            minWidth: "120",
            sortable: false,
            show: true,
          },
          {
            prop: "stockInTime",
            label: "入库时间",
            minWidth: "150",
            sortable: false,
            show: true,
          },
          {
            prop: "stockOutTime",
            label: "出库时间",
            minWidth: "150",
            sortable: false,
            show: true,
          },
          {
            prop: "pickDate",
            label: "拣选时间",
            minWidth: "150",
            sortable: false,
            show: true,
          },
          {
            prop: "sourceNo",
            label: "关联订单号",
            minWidth: "",
            sortable: false,
            show: true,
          },
        ], // 表头
        operates: [], // 表格里面的操作按钮
        tableHeightDiff: 300,
      },

      
      paginations: {
        page: 1, // 当前位于那页面
        total: 10, // 总数
        limit: 20, // 一页显示多少条
        pagetionShow: true,
      },

      accountForm: {
        dialogFormVisible: false,
        title: "手动调帐",
        model: [ 
          {
            label: "箱数量",
            type: "number",
            prop: "newQty",
            props: {
              precision: 2,
              min:1
            },
          },
        ],
        rules: {
          newQty: [{ required: true, message: "必填", trigger: "blur" }],
        },
        value: {
          boxCode:null,
          newQty:20
        },
        requestData: {
          flage: "add",
          url: Reserve.changeBoxQty,
          fn: this.getTable,
        },
      },

    };
  },
};
