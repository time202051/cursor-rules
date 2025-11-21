import {Point} from "@/api/request/swagger";

export default {
  data() {
    return {
      //波次订单信息
      BCorder:{
        multipleSelection:[],
        // 查询表单
        formSearchData: {
          reset: true,
          expendShow: true,
          value: {
            PointCode: null,
            PointName: null,
            StationId: null,
            Region: null,
            UserState: null,

            LoadState: null,
            Enabled: null,
            Ascription: null,
            tunnelId: null,
            StockOutStationId: null,

          },
          tableSearch: [

            {
              label: "出货单号",
              value: "PointCode",
              inputType: "text",
            },
            {
              label: "要货方编码",
              value: "PointCode",
              inputType: "text",
            },  {
              label: "仓库编码",
              value: "PointCode",
              inputType: "text",
            },

            {
              label: "单据状态",
              value: "Enabled",
              inputType: "select",
              children: this.SET_enumsSelect({
                keyword: "enableStatusEnum",
              }),
            }, {
              label: "订单类型",
              value: "Enabled",
              inputType: "select",
              children: this.SET_enumsSelect({
                keyword: "enableStatusEnum",
              }),
            },{
              label: "要货日期",
              value: "Enabled",
              inputType: "select",
              children: this.SET_enumsSelect({
                keyword: "enableStatusEnum",
              }),
            },
            {
              label: "创建时间",
              value: "timer",
              inputType: "picker",
              props: {
                type: 'datetimerange',
                startPlaceholder: "开始时间",
                endPlaceholder: "结束时间",
                placeholder: "选择时间范围",
                valueFormat: 'yyyy-MM-dd HH:mm:ss',
              }
            },


          ],
        },
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
              prop: "productName",
              label: "物料名称",
              minWidth: "300",
              sortable: false,
              show: true,
            },  {
              prop: "productCode",
              label: "物料编码",
              minWidth: "",
              sortable: false,
              show: true,
            },
            {
              prop: "productBatch",
              label: "物料批次",
              minWidth: "",
              sortable: false,
              show: true,
            },
            {
              prop: "bindStateEnumDesc",
              label: "码盘状态",
              minWidth: "",
              sortable: false,
              show: true,
            },

            // {
            //   prop: "tempBoxCode",
            //   label: "临时箱号",
            //   minWidth: "",
            //   sortable: false,
            //   show: true,
            // },
            {
              prop: "qty",
              label: "码盘数量",
              minWidth: "",
              sortable: false,
              show: true,
            },
            {
              prop: "creationTime",
              label: "创建时间",
              minWidth: "",
              show: true,
            },
          ], //表头
          operates: [], //表格里面的操作按钮
          tableHeightDiff: 350,
        },
        paginations: {
          page: 1, //当前位于那页面
          total: 10, //总数
          limit: 20, //一页显示多少条
          pagetionShow: true,
        },
        form: {
          dialogFormVisible: false,
          title: "波次创建",
          model: [

            {
              label: "波次号",
              type: "input",
              prop: "pointCode",
              readonly: true,

            },
            {
              label: "拣选时间",
              type: "date",
              prop: "pointName",
              props: {
                type: 'datetimerange',
                startPlaceholder: '开始时间',
                endPlaceholder: '结束时间',
                defaultTime: ['00:00:00', '23:59:59']
              }
            },

            {
              label: "备注",
              type: "textarea",
              prop: "remark",
            },
          ],
          rules: {
            pointCode: [{required: true, message: "必填", trigger: "blur"}],
            pointName: [{required: true, message: "必填", trigger: "blur"}],
          },
          value: {
            pointCode: "",
            pointName: "",
            remark: "",
          },
          requestData: {
            flage: "add",
            url: Point.point,
            fn: this.getTable,
          },
        },
      },

    }
  },

}
