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
          ContainerName: null,
          ContainerTypeId: null,
          RegionId: null,
          UsageStatus: null,
          LoadStatus: null,
          IsBindCargo:null,
          CargoLocationCode:null
        },
        tableSearch: [
          {
            label: "容器编码",
            value: "Code",
            inputType: "text",
          },
          {
            label: "容器名称",
            value: "ContainerName",
            inputType: "text",
          },
          {
            label: "容器类型",
            value: "ContainerTypeId",
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
            label: "使用状态",
            value: "UsageStatus",
            inputType: "select",
            children: this.SET_enumsSelect({
              keyword: "usageStatusEnum",
            }),
          },
          {
            label: "承载状态",
            value: "LoadStatus",
            inputType: "select",
            children: this.SET_enumsSelect({
              keyword: "loadStatusEnum",
            }),
          },
          {
            label: "绑定库位",
            value: "IsBindCargo",
            inputType: "select",
            children: [
              {
                key: true,
                value: '是'
              },
              {
                key: false,
                value: '否'
              }
            ]
          },
          {
            label: "容器库位",
            value: "CargoLocationCode",
            inputType: "text",
          },
        ],
      },
      tableData: {
        loading: false,
        emptyImg: true,
        options: {
          entityName:"Container",
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
            label: "容器编码",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "containerName",
            label: "容器名称",
            minWidth: "",
            sortable: false,
            show: true
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
            minWidth: "180",
            sortable: false,
            show: true,
          },
          {
            prop: "containerShapeTypeDesc",
            label: "容器属性",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "usageStatusDesc",
            label: "容器使用状态",
            minWidth: "",
            color:true,
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
            prop: "loadStatusDesc",
            label: "承载状态",
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
            prop: "locationCode",
            label: "库位编码",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "cargoLocationName",
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
            prop: "maxvolume",
            label: "最大体积",
            minWidth: "",
            sortable: false,
            show: true,
            renderSlot: true,
          },
          {
            prop: "maxWeight",
            label: "最大重量",
            minWidth: "",
            sortable: false,
            show: true,
            renderSlot: true,
          },
          {
            prop: "maxCount",
            label: "最大数量",
            minWidth: "",
            sortable: false,
            show: true,
            renderSlot: true,
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
        titleAdd: true,
        width: "65%",
        model: [
          {
            label: "容器编码",
            type: "input",
            prop: "code",
          },
          {
            label: "容器名称",
            type: "input",
            prop: "containerName",
          },
          {
            label: "容器类型",
            type: "select",
            prop: "containerTypeId",
            child: [],
          },
          {
            label: "容器属性",
            type: "select",
            prop: "containerShapeType",
            child: this.SET_enumsSelect({
              keyword: "containerShapeTypeEunm",
            }),
          },
          {
            label: "所属区域",
            type: "select",
            prop: "regionId",
            child: [],
          },
          {
            label: "最大体积",
            type: "number",
            prop: "maxvolume",
            props: {
              precision: 2,
              // step:0
            },
          },
          {
            label: "最大重量",
            type: "number",
            prop: "maxWeight",
            props: {
              precision: 2,
              // step:0
            },
          },
          {
            label: "最大数量",
            type: "number",
            prop: "maxCount",
            props: {
              min: 0,
              precision: 0,
              // step:0
            },
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
          containerName: [{ required: true, message: "必填", trigger: "blur" }],
          containerTypeId: [
            { required: true, message: "必填", trigger: "change" },
          ],
          containerShapeType: [
            { required: true, message: "必填", trigger: "change" },
          ],
          // araeId: [{ required: true, message: "必填", trigger: "blur" }],
        },
        value: {
          code: "",
          containerName: "",
          containerTypeId: "", //容器类型
          containerShapeType: "", //容器属性
          regionId: "", //区域
          maxvolume: 0,
          maxWeight: 0,
          maxCount: 0,
          enabled: true,
          remark: "",
        },
        requestData: {
          flage: "add",
          url: Basic.handleContainer,
          fn: this.getTable,
        },
      },
    };
  },
};
