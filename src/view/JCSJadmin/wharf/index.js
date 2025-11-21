import { Point,warehouse} from "@/api/request/swagger";
export default {
    data() {
        return {
          // 查询表单
          formSearchData: {
            reset: true,
            expendShow: false,
            value: {
              CargoCode: null,
              CargoName: null,
              // ReservoirAreaName: null,
              // RegionId: null,
              // GradeId: null,
              Enabled: null,
            },
            tableSearch: [
              {
                label: "码头编码",
                value: "CargoCode",
                inputType: "text",
              },
              {
                label: "码头名称",
                value: "CargoName",
                inputType: "text",
              },

              {
                label: "启用状态",
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
                prop: "cargoCode",
                label: "码头编码",
                minWidth: "",
                sortable: false,
                show: true,
              },
              {
                prop: "cargoName",
                label: "码头名称",
                minWidth: "",
                sortable: false,
                show: true,
              },
              {
                prop: "pointCode",
                label: "点位编码",
                minWidth: "",
                sortable: false,
                show: true,
              },

              {
                prop: "regionName",
                label: "区域名称",
                minWidth: "",
                sortable: false,
                show: true,
              },
              {
                prop: "cargoTerminalTypeDesc",
                label: "码头类型",
                minWidth: "",
                sortable: false,
                show: true,
              },

              // {
              //     prop: "regionName",
              //     label: "关联点位",
              //     minWidth: "",
              //     sortable: false,
              //     show: true,
              // },

              // {
              //     prop: "regionCode",
              //     label: "状态",
              //     minWidth: "",
              //     sortable: false,
              //     show: true,
              // },

              // {
              //     prop: "regionAttributesDesc",
              //     label: "码头类型",
              //     minWidth: "",
              //     sortable: false,
              //     show: true,
              // },

              {
                prop: "enabledText",
                label: "启用状态",
                minWidth: "",
                sortable: false,
                show: true,
              },

              // {
              //     prop: "gradeName",
              //     label: "所属区域",
              //     minWidth: "",
              //     show: true,
              // },
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
            titleAdd: true,
            model: [
              {
                label: "码头编码",
                type: "input",
                prop: "cargoCode",
              },
              {
                label: "码头名称",
                type: "input",
                prop: "cargoName",
              },
              {
                label: "点位",
                type: "select",
                prop: "pointId",
                child: [],
              },

              {
                label: "码头类型",
                type: "select",
                prop: "cargoTerminalType",
                child: this.SET_enumsSelect({
                  keyword: "cargoTerminalTypeEnum",
                }),
                clearable: false,
              },
              {
                label: "所属区域",
                type: "select",
                prop: "regionId",
                child: [],
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
              cargoCode: [{ required: true, message: "必填", trigger: "blur" }],
              // reservoirAreaName: [{ required: true, message: "必填", trigger: "blur" }],
              // pointId: [{ required: true, message: "必填", trigger: "blur" }],
              regionId: [{ required: true, message: "必填", trigger: "blur" }],
              cargoTerminalType: [
                { required: true, message: "必填", trigger: "blur" },
              ],
              cargoName: [{ required: true, message: "必填", trigger: "blur" }],
            },
            value: {
              cargoCode: "",
              cargoName: "",
              pointId: "",
              cargoTerminalType: "",
              enabled: true,
              regionId: "",
              remark: "",
            },
            requestData: {
              flage: "add",
              url: warehouse.cargoTerminal,
              fn: this.getTable,
            },
          },
        };
    },
    
}
