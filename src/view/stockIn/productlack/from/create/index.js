import { Point } from "@/api/request/swagger";
export default {
  data() {
    return {
      ZJorder: {
        multipleSelection: [],
        tableData: {
          loading: false,
          emptyImg: true,
          options: {
            selection: true, //多选框
            index: null, //序号
            headTool: false, //开启头部工具栏
            refreshBtn: false, //开启表格头部刷新按钮
            downloadBtn: false, //开启表格头部下载按钮
          }, //序号和复选框
          rows: [], //表数据
          columns: [
            {
              prop: "productCode",
              label: "零件编码",
              minWidth: "200",
              sortable: false,
              show: true,
            },
            {
              prop: "productName",
              label: "零件名称",
              minWidth: "",
              sortable: false,
              show: true,
            },
            {
              prop: "",
              label: "零件批次",
              minWidth: "",
              sortable: false,
              show: true,
            },
            {
              prop: "",
              label: "供应商批次",
              minWidth: "",
              sortable: false,
              show: true,
            },
            {
              prop: "",
              label: "收货日期",
              minWidth: "",
              sortable: false,
              show: true,
            },
            {
              prop: "",
              label: "立库库存",
              minWidth: "",
              sortable: false,
              show: true,
            },
            {
              prop: "",
              label: "IQC库存",
              minWidth: "",
              sortable: false,
              show: true,
            },
            {
              prop: "number",
              label: "质检申请数量",
              minWidth: "",
              show: true,
              renderSlot: true,
            },
            {
              prop: "",
              label: "预计箱数",
              minWidth: "100",
              show: true,
            },
            {
              prop: "ways",
              label: "质检方式",
              minWidth: "",
              show: true,
              renderSlot: true,
            },
          ], //表头
          operates: [], //表格里面的操作按钮
          tableHeightDiff: 520,
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
          width: "55%",
          model: [
            {
              label: "零件编码",
              type: "selectRemoteMethod",
              prop: "productCode",
              child: [],
              loading: false,
              remoteMethod: this.remoteMethod,
              tempBoxData: [],
              //自定义指令
              loadmores: {
                fn: this.loadmoreGX,
                SELECTWRAP_DOM_index: 0,
                flage: "productCode",
              },
            },
            {
              label: "零件名称",
              type: "input",
              prop: "productName",
              disabled: true,
            },
            {
              label: "零件批次",
              type: "input",
              prop: "productBatch",
            },
            {
              label: "供应商批次",
              type: "input",
              prop: "supplierBatch",
            },
            {
              label: "收货日期",
              type: "date",
              prop: "productDate",
              props: {
                format: "yyyy/MM/dd",
                valueFormat: "yyyy-MM-dd",
              },
            },
            {
              label: "参考号",
              type: "input",
              prop: "code",
            },
            {
              label: "上架库区",
              type: "select",
              prop: "areaId",
              child: [],
            },
            {
              label: "数量",
              type: "number",
              prop: "qty",
              props: {
                precision: 0,
                min: 1,
              },
            },
          ],
          rules: {
            productCode: [{ required: true, message: "必填", trigger: "blur" }],
            productBatch: [
              { required: true, message: "必填", trigger: "blur" },
            ],
            qty: [{ required: true, message: "必填", trigger: "blur" }],
            boxCode: [{ required: true, message: "必填", trigger: "blur" }],
          },
          value: {
            productCode: "",
            productName: "",
            productBatch: "",
            supplierBatch: "",
            productDate: "",
            code: "",
            areaId: "",
            qty: "",
            boxCode: "", //箱号
            remark: "", //备注
            liveBoxCode: "", //已添加箱号
          },
          requestData: {},
        },
      },
    };
  },
};
