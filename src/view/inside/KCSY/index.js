import {Point, StockInfo} from "@/api/request/swagger";

export default {
  data() {
    return {
      //按钮数据
      btnlist: [
        {
          title: "导出",
          method: this.export,
        },
      ],
      // 查询表单
      formSearchData: {
        reset: true, //重置
        expendShow: false, //展开
        value: {
          timer: [],
        },
        tableSearch: [
          {
            label: "损益单号",
            value: "StockChangeNo",
            inputType: "text",
          },
          {
            label: "损益来源",
            value: "ChangeFrom",
            inputType: "select",
            children: this.SET_enumsSelect({
              keyword: "changeFrom",
            }),
          },
          {
            label: "盘点单号",
            value: "ILTBillNo",
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
            label: "",
            minWidth: "",
            type: "selection",
            show: true,
          },
          {
            prop: "stockChangeNo",
            label: "损益单号",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "changeFromDesc",
            label: "损益来源",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "iLTBillNo",
            label: "关联盘点单号",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "organizationUnitName",
            label: "公司",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "warehouseName",
            label: "仓库",
            minWidth: "",
            sortable: false,
            show: true,
          },
          // {
          //   prop: "stockChangeStateEnumDesc",
          //   label: "单据状态",
          //   minWidth: "",
          //   sortable: false,
          //   show: true,
          // },
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
          {
            prop: "orderCode",
            label: "详情",
            minWidth: "",
            sortable: false,
            show: true,
            fixed: "right",
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
          url: Point.point,
          fn: this.getTable,
        },
      },
    };
  }
}
