import { warehouse } from "@/api/request/swagger";
export default {
  data() {
    return {
      // 查询表单
      formSearchData: {
        reset: true,
        expendShow: false,
        value: {
          code: null,
          enabled: null,
        },
        tableSearch: [
          {
            label: "编码",
            value: "code",
            inputType: "text",
          },
          //   {
          //     label: "启用状态",
          //     value: "enabled",
          //     inputType: "select",
          //     children: this.SET_enumsSelect({
          //       keyword: "enableStatusEnum",
          //     }),
          //   },
        ],
      },
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
        columns: [ {
          label: "",
          minWidth: "",
          type: 'selection',
          show: true,
      },
          {
            prop: "regionCode",
            label: "编码",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "regionName",
            label: "名称",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "enabledText",
            label: "启用状态",
            minWidth: "",
            sortable: false,
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
            label: "编码",
            type: "input",
            prop: "code",
          },
          {
            label: "名称",
            type: "input",
            prop: "dsiplayName",
          },

          {
            label: "启用状态",
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
          dsiplayName: [{ required: true, message: "必填", trigger: "blur" }],
        },
        value: {
          code: "",
          dsiplayName: "",
          remark: "",
          enabled: true,
        },
        requestData: {
          flage: "add",
          url: warehouse.region,
          fn: this.getTable,
        },
      },
    }
  }
}