import { Point, StockInfo, StockRemove } from "@/api/request/swagger";

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
          ProductCode: null, //对应输入框的value字段
          LPN: null,
          BindStateEnum: null,
          RegionId: null,
          GroundShelfType: null,
          ContainerCode: null,
          timer: [],
        },
        tableSearch: [
          {
            label: "移位单号",
            value: "RemoveNo",
            inputType: "text",
          },
          {
            label: "移位类型",
            value: "stockRemoveType",
            inputType: "select",
            children: [],
          },
          {
            label: "单据状态",
            value: "StockRemoveState",
            inputType: "select",
            children: this.SET_enumsSelect({
              keyword: "stockRemoveStateEnum",
            }),
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
            prop: "stockRemoveStateDesc",
            label: "单据状态",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "removeNo",
            label: "移位单号",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "stockRemoveTypeDesc",
            label: "移位类型",
            minWidth: "",
            sortable: false,
            show: true,
          },

          {
            prop: "stockRemoveDesc",
            label: "作业类型",
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
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "orderCode",
            label: "操作",
            minWidth: "",
            sortable: false,
            show: true,
            fixed: "right",
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
          fn: this.getTable,
        },
      },
      createform: {
        outerVisible: false,
        title: "",
        model: [
          {
            label: "移位单号",
            type: "input",
            prop: "pointCode",
            readonly: true,
          },
          {
            label: "移位方式",
            prop: "stockRemoveState",
            type: "checkbox",
          },
          {
            label: "作业类型",
            type: "select",
            prop: "stockRemove",
            child: this.SET_enumsSelect({
              keyword: "stockRemove",
            }),
            clearable: false,
          },
          {
            label: "移位类型",
            type: "select",
            prop: "stockRemoveType",
            child: [],
            clearable: false,
          },
          {
            label: "移位备注",
            type: "textarea",
            prop: "remark",
          },
        ],
        rules: {
          // pointCode: [{ required: true, message: "必填", trigger: "blur" }],
          // pointName: [{ required: true, message: "必填", trigger: "blur" }],
        },
        value: {
          pointCode: "保存后自动生成", //移位单号
          stockRemoveState: true, //移位方式
          stockRemove: "", //作业类型
          stockRemoveType: "", //移位类型
          remark: "", //备注
        },
        requestData: {
          flage: "add",
          fn: this.getTable,
        },
      },
    };
  },
};
