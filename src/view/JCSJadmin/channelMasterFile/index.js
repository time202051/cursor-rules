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
          DepthWayName: null,
          Enabled: null,
        },
        tableSearch: [
          {
            label: "通道编码",
            value: "Code",
            inputType: "text",
          },
          {
            label: "通道名称",
            value: "DepthWayName",
            inputType: "text",
          },
          {
            label: "通道状态",
            value: "Enabled",
            inputType: "select",
            children: [
              { key: true, value: "启用" },
              { key: false, value: "禁用" },
            ],
          },
        ],
      },
      tableData: {
        loading: false,
        emptyImg: true,
        options: {
          entityName:"DepthWay",
          selection: true, // 多选框
          index: null, // 序号
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
            prop: "code",
            label: "通道编码",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "depthWayName",
            label: "通道名称",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "wayTypeDesc",
            label: "任务占用状态",
            minWidth: "",
            sortable: false,
            show: true,
            render: function(row) {
              return h => {
                const tagType = row.wayType !== 3 ? 'warning' : 'success';
                return h('el-tag', {
                  props: {type: tagType}
                }, row.wayTypeDesc);
              };
            }
          },
          {
            prop: "wayInSortDesc",
            label: "入库通道规则",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "wayOutSortDesc",
            label: "出库通道规则",
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
      form: {
        dialogFormVisible: false,
        title: "",
        model: [
          {
            label: "通道编码",
            type: "input",
            prop: "code",
          },
          {
            label: "通道名称",
            type: "input",
            prop: "depthWayName",
          },
          {
            label: "通道入库规则",
            type: "select",
            prop: "wayInSort",
            child: this.SET_enumsSelect({
              keyword: "waySortEnum",
            }),
          },
          {
            label: "通道出库规则",
            type: "select",
            prop: "wayOutSort",
            child: this.SET_enumsSelect({
              keyword: "waySortEnum",
            }),
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
            length: 250,
          },
        ],
        rules: {
          code: [{ required: true, message: "必填", trigger: "blur" }],
          depthWayName: [{ required: true, message: "必填", trigger: "blur" }],
          wayInSort: [{ required: true, message: "必填", trigger: "change" }],
          wayOutSort: [{ required: true, message: "必填", trigger: "change" }],
        },
        value: {
          code: "",
          depthWayName: "",
          wayInSort: "",
          wayOutSort: "",
          enabled: true,
          remark: "",
        },
        requestData: {
          flage: "add",
          url: Basic.handleDepthChannel,
          fn: this.getTable,
        },
      },
    };
  },
};
