import { Point, warehouse } from "@/api/request/swagger";
export default {
  data() {
    return {
      // 查询表单
      formSearchData: {
        reset: true,
        expendShow: false,
        value: {
          GradeCode: null,
          GradeName: null,
        },
        tableSearch: [
          {
            label: "等级编码",
            value: "GradeCode",
            inputType: "text",
          },
          {
            label: "等级名称",
            value: "GradeName",
            inputType: "text",
          },
          // {
          //     label: "是否启用",
          //     value: "Enabled",
          //     inputType: "select",
          //     children: this.SET_enumsSelect({
          //         keyword: "enableStatusEnum",
          //     }),
          // },
          //  ,
        ],
      },
      tableData: {
        loading: false,
        emptyImg: true,
        options: {
          entityName:"Grade",
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
            prop: "gradeCode",
            label: "等级编码",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "gradeName",
            label: "等级名称",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "priority",
            label: "优先级",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "enabledDesc",
            label: "是否启用",
            minWidth: "",
            sortable: false,
            show: true,
          },

          {
            prop: "createdUser",
            label: "创建人",
            minWidth: "",
            sortable: false,
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
        titleAdd: true,
        model: [
          {
            label: "等级编码",
            type: "input",
            prop: "gradeCode",
          },
          {
            label: "等级名称",
            type: "input",
            prop: "gradeName",
          },
          {
            label: "优先级",
            type: "number",
            prop: "priority",
            props: {
              precision: 0,
              // step:0
            },
          },

          {
            label: "是否启用",
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
          gradeCode: [{ required: true, message: "必填", trigger: "blur" }],
          gradeName: [{ required: true, message: "必填", trigger: "blur" }],
          priority: [{ required: true, message: "必填", trigger: "blur" }],
        },
        value: {
          gradeCode: "",
          gradeName: "",
          priority: "",

          remark: "",
          enabled: true,
        },
        requestData: {
          flage: "add",
          url: warehouse.grade,
          fn: this.getTable,
        },
      },
    };
  },
};
