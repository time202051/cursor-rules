import { Point, StockInfo } from "@/api/request/swagger";
export default {
  data() {
    return {
      // 查询表单
      formSearchData: {
        reset: true, //重置
        expendShow: true, //展开
        value: {
          BillNo: null, //对应输入框的value字段
          ProductCode: null,
          ContainerCode: null,
          BindStateEnum: null,
          RegionId: null,
          SubtrayCode: null,
          timer: [],
        },
        tableSearch: [
          {
            label: "流水码",
            value: "BillNo",
            inputType: "text",
          },
          {
            label: "零件编码",
            value: "ProductCode",
            inputType: "text",
          },
          {
            label: "容器编码",
            value: "ContainerCode",
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
            },
          },
          {
            label: "码盘状态",
            value: "BindStateEnum",
            inputType: "select",
            children: this.SET_enumsSelect({
              keyword: "bindStateEnum",
            }),
          },
          {
            label: "上架区域",
            value: "RegionId",
            inputType: "select",
            children: [],
          },
          {
            label: "子托盘编码",
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
          entityName:"BindRecord",
          selection: true, //多选框
          index: true, //序号
          headTool: true, //开启头部工具栏
          refreshBtn: true, //开启表格头部刷新按钮
          downloadBtn: true, //开启表格头部下载按钮
        }, //序号和复选框
        rows: [], //表数据
        columns: [
          {
            label: "",
            minWidth: "",
            type: "selection",
            show: true,
          },
          {
            prop: "billNo",
            label: "流水码",
            minWidth: "200",
            sortable: false,
            show: true,
          },
          {
            prop: "bindStateEnumDesc",
            label: "码盘状态",
            minWidth: "120",
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
            prop: "ownerName",
            label: "货主名称",
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
            prop: "batch",
            label: "零件批次",
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
            prop: "containerType",
            label: "容器类型",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "containerCode",
            label: "容器编码",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "bindEnumDesc",
            label: "组盘类型",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "regionCode",
            label: "上架库区",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "cargoLocationCode",
            label: "分配库位",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "roadWayCode",
            label: "分配通道",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "taskNo",
            label: "关联任务编码",
            minWidth: "200",
            sortable: false,
            show: true,
          },
          {
            prop: "remark",
            label: "明细备注",
            minWidth: "",
            sortable: false,
            show: true,
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
            minWidth: "150",
            sortable: false,
            show: true,
          },
          {
            prop: "details",
            label: "详情",
            minWidth: "120",
            fixed: "right",
            sortable: false,
            show: true,
            renderSlot: true,
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
          fn: this.getTable,
        },
      },
    };
  },
};
