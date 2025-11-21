import { Basic } from "@/api/request/swagger";
export default {
  data() {
    return {
      // 查询表单
      formSearchData: {
        reset: true,
        expendShow: true,
        value: {
          Code: null,
          WarehouseLocationName: null,
          AreaId: null,
          RegionId: null,
          LocationType: null,
          LoadStatus: null,
          Enabled: null,
          RoadWayId: null,
          LoadEmptyType: null,
          Warehouseld:null
        },
        tableSearch: [
          {
            label: "库位编码",
            value: "Code",
            inputType: "text",
          },
          {
            label: "库位名称",
            value: "WarehouseLocationName",
            inputType: "text",
          },
          {
            label: "所属库区",
            value: "AreaId",
            inputType: "select",
            children: [],
          },
          {
            label: "所属区域",
            value: "RegionId",
            inputType: "select",
            children: [],
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
            label: "载货状态",
            value: "LoadStatus",
            inputType: "select",
            children: this.SET_enumsSelect({
              keyword: "loadStatusEnum",
            }),
          },
          {
            label: "状态",
            value: "Enabled",
            inputType: "select",
            children: this.SET_enumsSelect({
              keyword: "enableStatusEnum",
            }),
          },
          {
            label: "巷道编码",
            value: "RoadWayId",
            inputType: "select",
            children: [],
          },
          {
            label: "空托类型",
            value: "LoadEmptyType",
            inputType: "select",
            children: this.SET_enumsSelect({
              keyword: "loadEmptyTypeEnum",
            }),
          },
          {
            label: "所属仓库",
            value: "Warehouseld",
            inputType: "select",
            children: [],
          },
          {
            label: "任务占用状态",
            value: "UsageStatus",
            inputType: "select",
            children: this.SET_enumsSelect({
              keyword: "usageStatusEnum",
            }),
          },
          {
            label: "工作台编码",
            value: "StagingCode",
            inputType: "text",
          }
        ],
      },
      tableData: {
        loading: false,
        emptyImg: true,
        options: {
          entityName:"CargoLocation",
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
            prop: "warehouseLocationCode",
            label: "库位编码",
            minWidth: "",
            sortable: false,
            show: true,
            render: function(row) {
              return h => {
                const tagType = row.enabled ? 'success' : 'danger';
                return h('el-tag', {
                  props: { type: tagType }
                }, row.warehouseLocationCode);
              };
            },
          },
          {
            prop: "warehouseLocationName",
            label: "库位名称",
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
            prop: "areaName",
            label: "所属库区",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "locationTypeDesc",
            label: "库位类型",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "containerTypeName",
            label: "托盘类型",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "loadStatusDesc",
            label: "载货状态",
            minWidth: "",
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
            prop: "usageStatuseDesc",
            label: "任务占用状态",
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
            prop: "roadWayCode",
            label: "巷道编码",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "depthWayCode",
            label: "深度通道编码",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "isLoadEmptyText",
            label: "是否承载空托盘",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "loadEmptyTypeDesc",
            label: "空托类型",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "palletQty",
            label: "空托数量",
            minWidth: "",
            sortable: false,
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
            prop: "iPAddress",
            label: "通讯IP地址",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "height",
            label: "库位高度（CM）",
            minWidth: "",
            sortable: false,
            show: true,
            renderSlot: true,
          },
          {
            prop: "layerNum",
            label: "层",
            minWidth: "",
            sortable: false,
            show: true,
            renderSlot: true,
          },
          {
            prop: "floorNum",
            label: "排",
            minWidth: "",
            sortable: false,
            show: true,
            renderSlot: true,
          },
          {
            prop: "columnNum",
            label: "列",
            minWidth: "",
            sortable: false,
            show: true,
            renderSlot: true,
          },
          {
            prop: "childColumnNum",
            label: "子列",
            minWidth: "",
            sortable: false,
            show: true,
            renderSlot: true,
          },
          {
            prop: "allowBlendItemText",
            label: "启用缠膜",
            minWidth: "",
            sortable: false,
            show: true,
            render: function(row) {
              return h => {
                const tagType = row.allowBlendItem ? 'success' : 'danger';
                return h('el-tag', {
                  props: { type: tagType }
                }, row.allowBlendItemText);
              };
            }
          },
          {
            prop: "enabledDesc",
            label: "状态",
            minWidth: "",
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
        width: "70%",
        containerTypeList: [],
        model: [
          {
            label: "库位编码",
            type: "input",
            prop: "warehouseLocationCode",
          },
          {
            label: "库位名称",
            type: "input",
            prop: "warehouseLocationName",
          },
          {
            label: "所属库区",
            type: "select",
            prop: "areaId",
            child: [],
          },
          {
            label: "使用状态",
            type: "select",
            prop: "usageStatus",
            child: this.SET_enumsSelect({
              keyword: "usageStatusEnum",
            }),
          },
          {
            label: "载货状态",
            type: "select",
            prop: "loadStatus",
            child: this.SET_enumsSelect({
              keyword: "loadStatusEnum",
            }),
          },
          {
            label: "库位类型",
            type: "select",
            prop: "locationType",
            child: this.SET_enumsSelect({
              keyword: "locationTypeEnum",
            }),
          },
          {
            label: "层",
            type: "number",
            prop: "layerNum",
            props: {
              precision: 0,
              min: 0,
            },
          },
          {
            label: "排",
            type: "number",
            prop: "floorNum",
            props: {
              precision: 0, //保留几位小数点
              min: 0, //最小数从几开始
            },
          },
          {
            label: "列",
            type: "number",
            prop: "columnNum",
            props: {
              precision: 0,
              min: 0,
            },
          },
          {
            label: "子列",
            type: "number",
            prop: "childColumnNum",
            props: {
              precision: 0,
              min: 0,
            },
          },
          {
            label: "巷道编码",
            type: "select",
            prop: "roadWayId",
            child: [],
          },
          {
            label: "库位高度（CM）",
            type: "number",
            prop: "height",
            props: {
              precision: 0,
              min: 0,
            },
          },
          {
            label: "多深度通道",
            type: "select",
            prop: "depthWayId",
            child: [],
          },
          {
            label: "工作台编码",
            type: "select",
            prop: "stagingId",
            child: [],
          },
          {
            label: "状态",
            type: "switch",
            prop: "enabled",
          },
          {
            label: "AGV大点位",
            prop: "aGVLargePoint",
            type: "input",
          },
          {
            label: "AGV中点位",
            prop: "aGVMiddlePoint",
            type: "input",
          },
          {
            label: "AGV小点位",
            prop: "aGVSmallPoint",
            type: "input",
          },
          {
            label: "通讯IP地址",
            type: "textarea",
            prop: "iPAddress",
          },
          {
            label: "备注",
            type: "textarea",
            prop: "remark",
          },
        ],
        rules: {
          warehouseLocationCode: [
            { required: true, message: "必填", trigger: "blur" },
          ],
          warehouseLocationName: [
            { required: true, message: "必填", trigger: "blur" },
          ],
          areaId: [{ required: true, message: "必填", trigger: "change" }],
          usageStatus: [{ required: true, message: "必填", trigger: "change" }],
          loadStatus: [{ required: true, message: "必填", trigger: "change" }],
          locationType: [{ required: true, message: "必填", trigger: "blur" }],
          layerNum: [{ required: true, message: "必填", trigger: "blur" }],
          floorNum: [{ required: true, message: "必填", trigger: "blur" }],
          columnNum: [{ required: true, message: "必填", trigger: "blur" }],
        },
        value: {
          warehouseLocationCode: "", //库位编码
          warehouseLocationName: "", //库位名称
          areaId: "", //库区
          usageStatus: "", //使用状态
          loadStatus: "", //载货状态
          locationType: "", //库位类型
          layerNum: 0, //层
          floorNum: 0, //排
          columnNum: 0, //列
          childColumnNum: 0, //子列
          roadWayId: "", //巷道编码
          height: 0, //库位高度
          depthWayId: "", //多深度通道
          stagingId: "", //工作台编码
          enabled: true, //状态
          aGVLargePoint: "", //AGV大点位
          aGVMiddlePoint: "", //AGV中点位
          aGVSmallPoint: "", //AGV小点位
          iPAddress: "", //通讯IP地址
          remark: "", //备注
          containerTypeId: "", //容器类型
          allowBlendItem: false, //是否允许混放产品
          isMixingBatch: true, //是否允许混放批次
        },
        requestData: {
          flage: "add",
          url: Basic.handleLocation,
          fn: this.getTable,
        },
      },
      takeOutForm: {
        dialogFormVisible: false,
        title: "强制呼出",
        model: [
          {
            label: '结束点位',
            type: 'input',
            prop: 'endCode',
          },
        ],
        rules: {
          endCode: [{ required: true, message: "必填", trigger: "blur" }],
        },

        value: {},
        requestData: {
          url: Basic.manualTakeOut,
          fn: this.getTable,
        },
      },


      upLocationForm: {
        dialogFormVisible: false,
        title: "批量设置库位",
        model: [
          {
            label: "库位类型",
            type: "select",
            prop: "locationType",
            child: this.SET_enumsSelect({
              keyword: "locationTypeEnum",
            }),
          },
        ],
        rules: {
           locationType: [{ required: true, message: "必填", trigger: "blur" }],
        },

        value: {},
        requestData: {
          url: Basic.updateCargoLocationList,
          fn: this.getTable,
        },
      },
    };
  },
};
