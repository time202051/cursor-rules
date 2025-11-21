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
          RegionName: null,
          RegionAttributes: null,
        },
        tableSearch: [
          {
            label: "区域编码",
            value: "Code",
            inputType: "text",
          },
          {
            label: "区域名称",
            value: "RegionName",
            inputType: "text",
          },
          {
            label: "区域属性",
            value: "RegionAttributes",
            inputType: "select",
            children: [],
          },
        ],
      },
      tableData: {
        loading: false,
        emptyImg: true,
        options: {
          entityName: "Region",
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
            prop: "regionCode",
            label: "区域编码",
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
            prop: "enabledDesc",
            label: "状态",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "regionAttributesName",
            label: "区域属性",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "warehouseName",
            label: "归属仓库",
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
            prop: "tsjList",
            label: "提升机",
            minWidth: "",
            show: true,
            renderSlot: true,
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
            label: "区域编码",
            type: "input",
            prop: "regionCode",
          },
          {
            label: "区域名称",
            type: "input",
            prop: "regionName",
          },
          {
            label: "区域属性",
            type: "select",
            prop: "regionAttributes",
            child: [],
          },
          {
            label: "归属仓库",
            type: "select",
            prop: "warehouseId",
            child: [],
          },
          {
            label: "归属中心",
            type: "select",
            prop: "regionCenter",
            child: this.SET_enumsSelect({
              keyword: "regionCenterEnum",
            }),
          },
          {
            label: "状态",
            type: "switch",
            prop: "enabled",
          },
          {
            label: "提升机",
            type: "checkbox",
            prop: "tsjList",
            width: "100%",
            child:[
              {key: 1, value: "1号"},
              {key: 3, value: "3号"},
              {key: 7, value: "7号"},
              {key: 8, value: "8号"},
            ]
          },
        ],
        rules: {
          regionCode: [{ required: true, message: "必填", trigger: "blur" }],
          regionName: [{ required: true, message: "必填", trigger: "blur" }],
          regionAttributes: [
            { required: true, message: "必填", trigger: "change" },
          ],
          warehouseId: [{ required: true, message: "必填", trigger: "change" }],
          regionCenter: [{ required: true, message: "必填", trigger: "change" }],
        },
        value: {
          regionCenter:"",
          regionCode: "",
          regionName: "",
          regionAttributes: "",
          warehouseId: "",
          enabled: true,
          tsjList: [],
        },
        requestData: {
          flage: "add",
          url: Basic.handleRegion,
          fn: this.getTable,
        },
      },
    };
  },
};
