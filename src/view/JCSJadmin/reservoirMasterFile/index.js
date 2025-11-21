import { Basic } from "@/api/request/swagger";
export default {
  data() {
    return {
      // 查询表单
      formSearchData: {
        reset: true,
        expendShow: false,
        value: {
          Code: null,
          ReservoirAreaName: null,
          RegionId: null,
          GradeId: null,
        },
        tableSearch: [
          {
            label: "库区编码",
            value: "Code",
            inputType: "text",
          },
          {
            label: "库区名称",
            value: "ReservoirAreaName",
            inputType: "text",
          },
          {
            label: "所属区域",
            value: "RegionId",
            inputType: "select",
            children: [],
          },
          {
            label: "等级",
            value: "GradeId",
            inputType: "select",
            children: [],
          },
        ],
      },
      tableData: {
        loading: false,
        emptyImg: true,
        options: {
          entityName:"Area",
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
            prop: "code",
            label: "库区编码",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "reservoirAreaName",
            label: "库区名称",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "regionName",
            label: "所属区域",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "regionAttributesDesc",
            label: "所属区域属性",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "gradeName",
            label: "等级",
            minWidth: "",
            show: true,
          },
          {
            prop: "enabledDesc",
            label: "状态",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "createdUser",
            label: "创建人",
            minWidth: "",
            show: true,
          },
          {
            prop: "createTime",
            label: "创建时间",
            minWidth: "",
            show: true,
          },
          {
            prop: "remark",
            label: "备注",
            minWidth: "",
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
            label: "库区编码",
            type: "input",
            prop: "code",
          },
          {
            label: "库区名称",
            type: "input",
            prop: "areaName",
          },
          {
            label: "所属区域",
            type: "select",
            prop: "regionId",
            child: [],
          },
          {
            label: "等级",
            type: "select",
            prop: "gradeId",
            child: [],
          },
          {
            label: "状态",
            type: "switch",
            prop: "enabled",
          },
          {
            label: "备注",
            type: "textarea",
            prop: "remark",
          },
        ],
        rules: {
          code: [{ required: true, message: "必填", trigger: "blur" }],
          areaName: [{ required: true, message: "必填", trigger: "blur" }],
          regionId: [{ required: true, message: "必填", trigger: "change" }],
          gradeId: [{ required: true, message: "必填", trigger: "change" }],
        },
        value: {
          code: "",
          areaName: "",
          regionId: "",
          gradeId: "",
          enabled: true,
          remark: "",
        },
        requestData: {
          flage: "add",
          url: Basic.handleArea,
          fn: this.getTable,
        },
      },
    };
  },
};
