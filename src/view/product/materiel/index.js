import { Matter, Product } from "@/api/request/swagger";
export default {
  data() {
    return {
      // 查询表单
      formSearchData: {
        reset: true,
        expendShow: true,
        value: {
          ProductCode: null,
          ProductName: null,
          ProductClassId: null,
          ProductLevel: null,
          ProductType: null,
          Sequence: null,
          Enabled: null,
          timer: [],
        },
        tableSearch: [
          {
            label: "零件编码",
            value: "ProductCode",
            inputType: "text",
          },
          {
            label: "零件分类",
            value: "ProductClassId",
            inputType: "select",
            children: [],
          },
          {
            label: "状态",
            value: "Enabled",
            inputType: "select",
            children: [
              { key: true, value: "启用" },
              { key: false, value: "禁用" },
            ],
          },
          {
            label: "创建时间",
            value: "timer",
            inputType: "picker",
            props: {
              type: "datetimerange",
              startPlaceholder: "开始时间",
              endPlaceholder: "结束时间",
              placeholder: "选择时间范围",
              format: "yyyy/MM/dd HH:mm:ss",
              valueFormat: "yyyy-MM-dd HH:mm:ss",
            },
          },
          {
            label: "存货类别",
            value: "ProductType",
            inputType: "select",
            children: this.SET_enumsSelect({
              keyword: "productTypeEnum",
            }),
          },
          {
            label: "ABC标识",
            value: "ProductLevel",
            inputType: "select",
            children: this.SET_enumsSelect({
              keyword: "productLevelEnum",
            }),
          },
          {
            label: "出库策略",
            value: "Sequence",
            inputType: "select",
            children: this.SET_enumsSelect({
              keyword: "productSeqEnum",
            }),
          },
          {
            label: "零件名称",
            value: "ProductName",
            inputType: "text",
          },
        ],
      },
      tableData: {
        loading: false,
        emptyImg: true,
        options: {
          entityName: "Product",
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
            prop: "productCode",
            label: "零件编码",
            minWidth: "150",
            sortable: false,
            show: true,
          },
          {
            prop: "productName",
            label: "零件名称",
            minWidth: "250",
            sortable: false,
            show: true,
          },
          {
            prop: "productTypeDesc",
            label: "存货类别",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "productClassName",
            label: "零件分类",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "spec",
            label: "规格型号",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "sequenceDesc",
            label: "出库策略",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "basicUnitName",
            label: "基础单位",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "packagingRate",
            label: "包装率",
            minWidth: "",
            sortable: false,
            show: true,
            renderSlot: true,
          },
          {
            prop: "completeUnitName",
            label: "整件单位",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "grossWeight",
            label: "毛重",
            minWidth: "",
            sortable: false,
            show: true,
            renderSlot: true,
          },
          {
            prop: "netWeight",
            label: "净重",
            minWidth: "",
            sortable: false,
            show: true,
            renderSlot: true,
          },
          {
            prop: "periodOfValidity",
            label: "保质期",
            minWidth: "",
            sortable: false,
            show: true,
            renderSlot: true,
          },
          {
            prop: "volume",
            label: "体积",
            minWidth: "",
            sortable: false,
            show: true,
            renderSlot: true,
          },
          {
            prop: "maxInventory",
            label: "最大库存量",
            minWidth: "",
            sortable: false,
            show: true,
            renderSlot: true,
          },
          {
            prop: "secureInventory",
            label: "安全库存量",
            minWidth: "",
            sortable: false,
            show: true,
            renderSlot: true,
          },
          {
            prop: "productLevelDesc",
            label: "ABC标识",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "color",
            label: "颜色",
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
            prop: "enabledDesc",
            label: "状态",
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
          {
            prop: "details",
            label: "详情",
            width: 80,
            fixed: "right",
            sortable: false,
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
      detailsform: {
        dialogFormVisible: false,
        title: "详情",
        row: {},
        // requestData: {
        //   flage: "add",
        //   url: Point.point,
        //   fn: this.getTable,
        // },
      },
      form: {
        dialogFormVisible: false,
        title: "",
        width: "80%",
        ownerList: [],
        model: [
          {
            label: "零件编码",
            type: "input",
            prop: "productCode",
          },
          {
            label: "零件名称",
            type: "input",
            prop: "productName",
          },
          {
            label: "零件分类",
            type: "select",
            prop: "productClassId",
            child: [],
          },
          {
            label: "基础单位",
            type: "select",
            prop: "basicUnitId",
            child: [],
          },
          {
            label: "包装率",
            type: "number",
            prop: "packagingRate",
            props: {
              precision: 2,
            },
          },
          {
            label: "整件单位",
            type: "select",
            prop: "completeUnitId",
            child: [],
          },
          {
            label: "规格型号",
            type: "input",
            prop: "spec",
          },
          {
            label: "保质期",
            type: "number",
            prop: "periodOfValidity",
            props: {
              precision: 0,
            },
          },
          {
            label: "ABC标识",
            type: "select",
            prop: "productLevel",
            child: this.SET_enumsSelect({
              keyword: "productLevelEnum",
            }),
          },
          {
            label: "存货类别",
            type: "select",
            prop: "productType",
            child: this.SET_enumsSelect({
              keyword: "productTypeEnum",
            }),
          },
          {
            label: "体积",
            type: "number",
            prop: "volume",
            props: {
              precision: 2,
            },
          },
          {
            label: "颜色",
            type: "input",
            prop: "color",
          },
          {
            label: "毛重",
            type: "number",
            prop: "grossWeight",
            props: {
              precision: 2,
            },
          },
          {
            label: "净重",
            type: "number",
            prop: "netWeight",
            props: {
              precision: 2,
            },
          },
          {
            label: "零件属性",
            type: "select",
            prop: "attribute",
            child: this.SET_enumsSelect({
              keyword: "attributeTypeEnum",
            }),
          },
          {
            label: "是否缠膜",
            type: "select",
            prop: "isWrapFilm",
            child: [
              { key: true, value: "是" },
              { key: false, value: "否" },
            ],
          },
          {
            label: "出库策略",
            type: "select",
            prop: "sequence",
            child: this.SET_enumsSelect({
              keyword: "productSeqEnum",
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
          },
        ],
        rules: {
          productCode: [{ required: true, message: "必填", trigger: "blur" }],
          productName: [{ required: true, message: "必填", trigger: "blur" }],
          productClassId: [
            { required: true, message: "必填", trigger: "change" },
          ],
          basicUnitId: [{ required: true, message: "必填", trigger: "blur" }],
          packagingRate: [{ required: true, message: "必填", trigger: "blur" }],
          productType: [{ required: true, message: "必填", trigger: "change" }],
          sequence: [{ required: true, message: "必填", trigger: "change" }],
          ownerId: [{ required: true, message: "必填", trigger: "change" }],
        },
        value: {
          productCode: "", //零件编码
          productName: "", //零件名称
          productClassId: "", //零件分类
          basicUnitId: "", //基础单位
          packagingRate: "", //包装率
          completeUnitId: "", //整件单位
          spec: "", //规格型号
          periodOfValidity: 0, //保质期
          productLevel: "", //ABC标识
          productType: "", //存货类别
          sequence: "", //出库策略
          volume: "", //体积
          color: "", //颜色
          grossWeight: 0, //毛重
          netWeight: 0, //净重
          attribute: "", //零件属性
          isWrapFilm: false, //是否缠膜
          enabled: true, //状态
          remark: "", //备注
          ownerId: "", //货主选择
          isBatch: false, //批次管理
          isValidity: false, //效期管理
          isDisassemble: false, //拆零管理
          isSerial: false, //序列号管理
          isInspection: false, //质检信息
          packingCount: "", //托包装数量
          isToOldKxZt:false,//是否送整托区
          emptyBoxNewToOldRegin:0,//是否送整托区

        },
        requestData: {
          flage: "add",
          url: Matter.handleProduct,
          fn: this.getTable,
        },
      },
    };
  },
};
