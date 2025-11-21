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
          RoadWayName: null,
        },
        tableSearch: [
          {
            label: "巷道编码",
            value: "Code",
            inputType: "text",
          },
          {
            label: "巷道名称",
            value: "RoadWayName",
            inputType: "text",
          },
        ],
      },
      tableData: {
        loading: false,
        emptyImg: true,
        options: {
          entityName:"RoadWay",
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
            label: "巷道编码",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "roadWayName",
            label: "巷道名称",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "maxCount",
            label: "任务阈值",
            minWidth: "",
            sortable: false,
            show: true,
            renderSlot:true
          },
          {
            prop: "reserveCount",
            label: "预留位数",
            minWidth: "",
            sortable: false,
            show: true,
            renderSlot:true
          },
     {
            prop: "inEnabledDesc",
            label: "入库状态",
            minWidth: "80px",
            sortable: false,
            show: true,
            render: function(row) {
              return h => {
                const tagType = row.inEnabled ? 'success' : 'danger';
                return h('el-tag', {
                  props: { type: tagType }
                }, row.inEnabledDesc);
              };

            }
          },    {
            prop: "outEnabledDesc",
            label: "出库状态",
            minWidth: "80px",
            sortable: false,
            show: true,
            render: function(row) {
              return h => {
                const tagType = row.outEnabled ? 'success' : 'danger';
                return h('el-tag', {
                  props: { type: tagType }
                }, row.outEnabledDesc);
              };
            }
          },        {
            prop: "enabledDesc",
            label: "状态",
            minWidth: "80px",
            sortable: false,
            show: true,
            render: function(row) {
              return h => {
                const tagType = row.enabled ? 'success' : 'danger';
                return h('el-tag', {
                  props: { type: tagType }
                }, row.enabledDesc);
              };
            }
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
            label: "巷道编码",
            type: "input",
            prop: "code",
          },
          {
            label: "巷道名称",
            type: "input",
            prop: "roadWayName",
          },
          {
            label: "任务阈值",
            type: "number",
            prop: "maxCount",
            props: {
              precision: 0,
              min: 1,
            },
          },
          {
            label: "预留位数",
            type: "number",
            prop: "reserveCount",
            props: {
              precision: 0,
              min: 1,
            },
          },
          {
            label: "入库状态",
            type: "switch",
            prop: "inEnabled",
            change:(val)=>{             
                this.form.value.enabled= val || this.form.value.outEnabled ;            
            }
          },
          {
            label: "出库状态",
            type: "switch",
            prop: "outEnabled",
            change:(val)=>{             
              this.form.value.enabled= val || this.form.value.inEnabled ;
            }
          },
          {
            label: "状态",
            type: "switch",
            prop: "enabled",
            change:(val)=>{
              if(!val)
              {
                this.form.value.inEnabled=false;
                this.form.value.outEnabled=false;
              }
            }
          },
          {
            label: "备注",
            type: "textarea",
            prop: "remark",
          },
        ],
        rules: {
          code: [{ required: true, message: "必填", trigger: "blur" }],
          roadWayName: [{ required: true, message: "必填", trigger: "blur" }],
          maxCount: [{ required: true, message: "必填", trigger: "blur" }],
          reserveCount: [{ required: true, message: "必填", trigger: "blur" }],
        },
        value: {
          code: "",
          roadWayName: "",
          maxCount: "",
          reserveCount: "",
          enabled: true,
          inEnabled: true,
          outEnabled: true,
          remark: "",
        },
        requestData: {
          flage: "add",
          url: Basic.handleRoadway,
          fn: this.getTable,
        },
      },
    };
  },
};
