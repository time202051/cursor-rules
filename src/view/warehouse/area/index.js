import { warehouse } from "@/api/request/swagger";
export default {
  data() {
    return {
      // 查询表单
      formSearchData: {
        reset: true,
        expendShow: true,
        value: {
          Code: null,
          LocationType: null,
          // RegionId: null,
          RegionCode: null,

          enabled: null,
          loadStatus: null,
          usageStatus: null,
          LayerNum: null,
          RoadWayId: null,
          ColumnNum: null,
          AreaCode: null,
        },
        tableSearch: [{
          label: "库位编码",
          value: "Code",
          inputType: "text",
        },
        {
          label: "库位类型",
          value: "LocationType",
          inputType: "select",
          children: this.SET_enumsSelect({
            keyword: "locationTypeEnum",
          }),
        },

        {
          label: "巷道",
          value: "RoadWayId",
          inputType: "select",
          children: [],
        },

        {
          label: "层",
          value: "LayerNum",
          inputType: "text",
        }, {
          label: "列",
          value: "ColumnNum",
          inputType: "text",
        },
        {
          label: "使用状态",
          value: "UsageStatus",
          inputType: "select",
          children: this.SET_enumsSelect({
            keyword: "usageStatusEnum",
          }),
        },
        {
          label: "载货状态",
          value: "LoadStatus",
          inputType: "select",
          children: this.SET_enumsSelect({
            keyword: "loadStatusEnum",
          }),
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
        columns: [{
          label: "",
          minWidth: "",
          type: 'selection',
          show: true,
        },
        {
          prop: "code",
          label: "库位编码",
          minWidth: "100",
          sortable: false,
          show: true,
        },

        {
          prop: "usageStatusDesc",
          label: "使用状态",
          minWidth: "80",
          sortable: false,
          show: true,
        },
        {
          prop: "loadStatusDesc",
          label: "载货状态",
          minWidth: "80",
          sortable: false,
          show: true,
          render: function(row) {
            return h => {
              const tagType = row.loadStatus===0 ? 'info' : 'success';
              return h('el-tag', {
                props: { type: tagType }
              }, row.loadStatusDesc);
            };
          }
        },
        {
          prop: "enabledText",
          label: "启用状态",
          minWidth: "80",
          sortable: false,
          show: true,
        },
        {
          prop: "roadWayDirectionDesc",
          label: "库位方位",
          minWidth: "100",
          sortable: false,
          show: true,
        },
        {
          prop: "locationTypeDesc",
          label: "库位类型",
          minWidth: "100",
          sortable: false,
          show: true,
        },

        {
          prop: "layerNum",
          label: "层",
          minWidth: "80",
          sortable: false,
          show: true,
        },
        {
          prop: "columnNum",
          label: "列",
          minWidth: "80",
          sortable: false,
          show: true,
        },
        {
          prop: "floorNum",
          label: "排",
          minWidth: "80",
          sortable: false,
          show: true,
        },
        {
          prop: "aBsize",
          label: "扩展位",
          minWidth: "80",
          sortable: false,
          show: true,
        },

        {
          prop: "roadWayCode",
          label: "巷道",
          minWidth: "100",
          sortable: false,
          show: true,
        },
        {
          prop: "remark",
          label: "备注",
          minWidth: "",
          show: true,
        },

          // {
          //     prop: "creationTime",
          //     label: "创建时间",
          //     minWidth: "",
          //     sortable: false,
          //     show: true,
          // },
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
          // {
          //   label: "code",
          //   type: "input",
          //   prop: "aBsize",
          // },


          {
            label: "扩展位",
            type: "input",
            prop: "aBsize",
          },

          {
            label: "库位方位",
            type: "select",
            prop: "roadWayDirection",
            child: this.SET_enumsSelect({
              keyword: "roadWayDirectionEnum",
            }),
            clearable: false
          },


          {
            label: "库位类型",
            type: "select",
            prop: "locationType",
            child: this.SET_enumsSelect({
              keyword: "locationTypeEnum",
            }),
            clearable: false
          },
          // {
          //   label: "使用状态",
          //   prop: "usageStatus",
          //   type: "select",
          //   child: this.SET_enumsSelect({
          //     keyword: "usageStatusEnum",
          //   }),
          // },



          {
            label: "层",
            type: "number",
            prop: "layerNum",
            readonly: true,//不可填
            props: {
              precision: 0,
              // step:0
            }
          },
          {
            label: "排",
            type: "number",
            prop: "floorNum",
            readonly: true,//不可填
            props: {
              precision: 0,
              // step:0
            }
          },
          {
            label: "列",
            type: "number",
            prop: "columnNum",
            readonly: true,//不可填
            props: {
              precision: 0,
              // step:0
            }
          },


          {
            label: "巷道",
            type: "select",
            prop: "roadWayId",
            child: [],
            clearable: false
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
          aBsize: [{
            required: true,
            message: "必填",
            trigger: "blur"
          }],
          layerNum: [{
            required: true,
            message: "必填",
            trigger: "blur"
          }],
          floorNum: [{
            required: true,
            message: "必填",
            trigger: "blur"
          }],
          columnNum: [{
            required: true,
            message: "必填",
            trigger: "blur"
          }],
          roadWayDirection: [{
            required: true,
            message: "必填",
            trigger: "blur"
          }],
          locationType: [{
            required: true,
            message: "必填",
            trigger: "blur"
          }],

          // usageStatus: [{
          //     required: true,
          //     message: "必填",
          //     trigger: "blur"
          //   }],
          // areaCode: [{ required: true, message: "必填", trigger: "blur" }],
          roadWayId: [{
            required: true,
            message: "必填",
            trigger: "blur"
          }],

        },
        value: {
          // code: "",
          layerNum: "",
          floorNum: "",
          columnNum: "",
          aBsize: "",

          // areaId: "",
          roadWayId: "",
          locationType: "",
          roadWayDirection: "",
          remark: "",
          // usageStatusDesc: "",
          enabled: true,
          // locationTypeDesc: "",
          // roadWayDirectionDesc: "",
        },
        requestData: {
          flage: "add",
          url: warehouse.cargoLocation,
          fn: this.getTable,
        },
      },
    }
  }
}
