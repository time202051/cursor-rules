import { Basic } from "@/api/request/swagger";
export default {
  data() {
    return {
      // 查询表单
      formSearchData: {
        reset: true,
        expendShow: true,
        value: {
          StagingCode: null,
          StagingName: null,
          StockOutBillNo: null,
          SourceNo: null,
          StagingType: null,
          Enabled:null
        },
        tableSearch: [
          {
            label: "工作台编码",
            value: "StagingCode",
            inputType: "text",
          },
          {
            label: "工作台名称",
            value: "StagingName",
            inputType: "text",
          },
          {
            label: "工作台类型",
            value: "StagingType",
            inputType: "select",
            children: this.SET_enumsSelect({
              keyword: "stagingTypeEnum",
            }),
          },
          {
            label: "出库单号",
            value: "StockOutBillNo",
            inputType: "text",
          },
          {
            label: "上游单号",
            value: "SourceNo",
            inputType: "text",
          },
          {
            label: "工作台状态",
            value: "Enabled",
            inputType: "select",
            children: this.SET_enumsSelect({
              keyword: "enableStatusEnum",
            }),
          },
        ],
      },
      tableData: {
        loading: false,
        emptyImg: true,
        options: {
          entityName:"Staging",
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
            prop: "stagingCode",
            label: "工作台编码",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "stagingName",
            label: "工作台名称",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "point",
            label: "关联点位",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "enabledDesc",
            label: "状态",
            minWidth: "",
            sortable: false,
            show: true,render: function(row) {
              return h => {
                const tagType = row.enabled ? 'success' : 'danger';
                return h('el-tag', {
                  props: { type: tagType }
                }, row.enabledDesc);
              };
            }
          },
          {
            prop: "usageStatusDesc",
            label: "使用状态",
            minWidth: "",
            sortable: false,
            show: true,
            render: function(row) {
              return h => {
                const tagType = row.usageStatus===0 ? 'success' : 'danger';
                return h('el-tag', {
                  props: { type: tagType }
                }, row.usageStatusDesc);
              };
            }
          },
          {
            prop: "stagingTypeDesc",
            label: "工作台类型",
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
            prop: "stockOutBillNo",
            label: "出库单号",
            minWidth: "180",
            sortable: false,
            show: true,
          },
          {
            prop: "sourceNo",
            label: "上游单号",
            minWidth: "180",
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
        model: [
          {
            label: "工作台编码",
            type: "input",
            prop: "stagingCode",
          },
          {
            label: "工作台名称",
            type: "input",
            prop: "stagingName",
          },
          {
            label: "工作台类型",
            type: "select",
            prop: "stagingType",
            child: this.SET_enumsSelect({
              keyword: "stagingTypeEnum",
            }),
          },
          {
            label: "区域",
            type: "select",
            prop: "regionId",
            child: [],
          },
          {
            label: "关联点位",
            type: "input",
            prop: "point",
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
          stagingCode: [{ required: true, message: "必填", trigger: "blur" }],
          stagingName: [{ required: true, message: "必填", trigger: "blur" }],
          stagingType: [{ required: true, message: "必填", trigger: "blur" }],
          // point: [{ required: true, message: "必填", trigger: "blur" }],
          regionId: [{ required: true, message: "必填", trigger: "change" }],
        },
        value: {
          stagingCode: "",
          stagingName: "",
          stagingType: "",
          regionId: "",
          point: "",
          enabled: true,
          remark: "",
        },
        requestData: {
          flage: "add",
          url: Basic.handleWorkBench,
          fn: this.getTable,
        },
      },
    };
  },
};
