import { Point,OutBound } from "@/api/request/swagger";
export default {
  data() {
    return {
      // 查询表单
      formSearchData: {
        reset: true, // 重置
        expendShow: true, // 展开
        value: {
          BillNo: null, // 对应输入框的value字段
          OrderState: null,
          ShipperCode: null,
          Type: null,
          WarehouseName: null,
          timer: [],
          arrivalTimer: [],
          WarehouseCode: null,
          IsUnFinished: true
        },
        tableSearch: [
          {
            label: "出货单号",
            value: "BillNo",
            inputType: "text",
          },
          {
            label: "上游单号",
            value: "SourceNo",
            inputType: "text",
          },
          {
            label: "单据状态",
            value: "OrderState",
            inputType: "select",
            children: this.SET_enumsSelect({
              keyword: "orderStateEnum",
            }),
          },
          {
            label: "要货方编码",
            value: "ShipperCode",
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
            label: "订单类型",
            value: "Type",
            inputType: "select",
            children: this.SET_enumsSelect({
              keyword: "businessTypeEnums",
            }),
          },
          {
            label: "要货日期",
            value: "arrivalTimer",
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
            label: "仓库编码",
            value: "WarehouseCode",
            inputType: "text",
          },
          {
            label: "仓库名称",
            value: "WarehouseName",
            inputType: "text",
          },
          {
            label: "零件编码",
            value: "ProductCode",
            inputType: "text",
          },
          {
            label: '仅未完成',
            value: 'IsUnFinished',
            inputType: 'select',
            children: [
              {
                key: true,
                value: '是'
              },
              {
                key: false,
                value: '否'
              }
            ]
          },
        ],
      },
      // 表格数据
      tableData: {
        loading: false,
        emptyImg: true,
        options: {
          selection: true, // 多选框
          index: null, // 序号
          headTool: true, // 开启头部工具栏
          refreshBtn: true, // 开启表格头部刷新按钮
          downloadBtn: true, // 开启表格头部下载按钮
          entityName:"StockOut",
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
            prop: "oderStateDesc",
            label: "单据状态",
            minWidth: "120",
            sortable: false,
            show: true,
          },
          {
            prop: "billNo",
            label: "出库订单号",
            minWidth: "150",
            sortable: false,
            show: true,
          },
          {
            prop: "sourceNo",
            label: "上游单号",
            minWidth: "100",
            sortable: false,
            show: true,
          },
          {
            prop: "typeDesc",
            label: "订单类型",
            minWidth: "130",
            sortable: false,
            show: true,
          },
          {
            prop: "remark",
            label: "订单备注",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "shipperCode",
            label: "要货方",
            minWidth: "150",
            sortable: false,
            show: true,
          },
          {
            prop: "stageCodeStr",
            label: "工作台",
            minWidth: "150",
            sortable: false,
            show: true,
            render: function(row) {
              return h => {
                if (row.stageCodeStr === null || row.stageCodeStr === "") {
                  return '';
                }
                const stageCodes = row.stageCodeStr.split(',').map(code => code.trim()).sort();;
                const tags = stageCodes.map(code => h('el-tag', {props: {type: 'success'}}, code.trim()));
                return h('div', {}, tags);
              };
            }
          },
          {
            prop: "planTime",
            label: "备货开始时间",
            minWidth: "",
            sortable: false,
            show: true,
            render: function(row) {
              return h => {
                if (row.planTime === null || row.planTime === '') {
                  return '';
                }
                const tagType = new Date(row.planTime) > new Date() ? "danger" : "success";
                return h('el-tag', {
                  props: {type: tagType}
                }, row.planTime);
              };
            }
          },
          {
            prop: "arrivalDate",
            label: "发货时间",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "craeteUserName",
            label: "创建人",
            minWidth: "120",
            sortable: false,
            show: true,
          },
          {
            prop: "createTime",
            label: "创建时间",
            minWidth: "150",
            sortable: false,
            show: true,
          },
          {
            prop: "completeDate",
            label: "完成时间",
            minWidth: "150",
            sortable: false,
            show: true,
          },
          {
            prop: "details",
            label: "详情",
            minWidth: "",
            fixed: "right",
            sortable: false,
            show: true,
            renderSlot: true,
          },
        ], // 表头
        operates: [], // 表格里面的操作按钮
        tableHeightDiff: 300,
      },
      paginations: {
        page: 1, // 当前位于那页面
        total: 10, // 总数
        limit: 100, // 一页显示多少条
        pagetionShow: true,
      },
      detailsform: {
        dialogFormVisible: false,
        title: "出库订单详情",
        row: {},
        requestData: {
          flage: "add",
          url: Point.point,
          fn: this.getTable,
        },
      },
      pickDetailsform: {
        dialogFormVisible: false,
        title: "订单拣选任务",
        row: {},
        requestData: {
          flage: "add",
          url: Point.point,
          fn: this.getTable,
        },
      },
      //调整备料时间表单
      adjustTimeForm: {
        dialogFormVisible: false,
        title: "调整备料时间",
        width: "35%",
        model: [
          {
            label: "调整后时间",
            placeholder: "请选择调整后的时间",
            type: "date",
            prop: "planTime",
            props: {
              type: "datetime",
              format: "yyyy/MM/dd HH:mm",
              valueFormat: "yyyy/MM/dd HH:mm",
            },
          },
        ],
        rules: {
          planTime: [{ required: true, message: "必填", trigger: "blur" }],
        },
        value: {
          planTime: "",
        },
        requestData: {
          flage: "add",
          flages: true,
          url: OutBound.adjustTimeBCMsg,
          fn: this.getTable,
          joinData: ["planTime"], //拼接在url后面的字段
        },
      },
    };
  },
};
