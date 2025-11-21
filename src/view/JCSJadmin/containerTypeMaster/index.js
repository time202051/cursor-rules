import { Basic } from "@/api/request/swagger";
export default {
  data() {
    return {
      // 查询表单
      formSearchData: {
        reset: true,
        expendShow: false,
        value: {
          ContainerTypeCode: null,
          ContainerTypeName: null,
        },
        tableSearch: [
          {
            label: "容器类型编码",
            value: "ContainerTypeCode",
            inputType: "text",
          },
          {
            label: "容器类型名称",
            value: "ContainerTypeName",
            inputType: "text",
          },
        ],
      },
      tableData: {
        loading: false,
        emptyImg: true,
        options: {
          entityName:"ContainerType",
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
            prop: "containerTypeCode",
            label: "容器类型编码",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "containerTypeName",
            label: "容器类型名称",
            minWidth: "200",
            sortable: false,
            show: true,
          },
          {
            prop: "lang",
            label: "长",
            minWidth: "",
            sortable: false,
            show: true,
            renderSlot: true,
          },
          {
            prop: "width",
            label: "宽",
            minWidth: "",
            sortable: false,
            show: true,
            renderSlot: true,
          },
          {
            prop: "height",
            label: "高",
            minWidth: "",
            sortable: false,
            show: true,
            renderSlot: true,
          },
          {
            prop: "isPileUpDesc",
            label: "是否允许入叠盘",
            minWidth: "",
            sortable: false,
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
            label: "容器类型编码",
            type: "input",
            prop: "containerTypeCode",
          },
          {
            label: "容器类型名称",
            type: "input",
            prop: "containerTypeName",
          },
          {
            label: "长",
            type: "number",
            prop: "lang",
            props: {
              precision: 2,
            },
          },
          {
            label: "宽",
            type: "number",
            prop: "width",
            props: {
              precision: 2,
            },
          },
          {
            label: "高",
            type: "number",
            prop: "height",
            props: {
              precision: 2,
            },
          },
          {
            label: "状态",
            type: "switch",
            prop: "enabled",
          },
          {
            label: "是否允许自动叠盘",
            type: "switch",
            prop: "isPileUp",
          },
          {
            label: "备注",
            type: "textarea",
            prop: "remark",
          },
        ],
        rules: {
          containerTypeCode: [
            { required: true, message: "必填", trigger: "blur" },
          ],
          containerTypeName: [
            { required: true, message: "必填", trigger: "blur" },
          ],
        },
        value: {
          containerTypeCode: "",
          containerTypeName: "",
          lang: "",
          width: "",
          height: "",
          isPileUp: true,
          enabled: true,
          remark: "",
        },
        requestData: {
          flage: "add",
          url: Basic.handleContainerType,
          fn: this.getTable,
        },
      },
    };
  },
};
