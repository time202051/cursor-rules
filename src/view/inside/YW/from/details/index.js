import {Point} from "@/api/request/swagger";

export default {
  data() {
    return {
      //波次订单信息
      BCorder: {
        multipleSelection: [],
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
          tableSearch: [],
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
              prop: "stockRemoveDetailDesc",
              label: "明细状态",
              minWidth: "",
              sortable: false,
              show: true,
            },
            {
              prop: "productCode",
              label: "零件编码",
              minWidth: "",
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
              prop: "productBatch",
              label: "批次",
              minWidth: "",
              sortable: false,
              show: true,
            },
            {
              prop: "productTime",
              label: "收货日期",
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
            },
            {
              prop: "_qty",
              label: "可用数量",
              minWidth: "",
              show: true,
            },
            {
              prop: "factQty",
              label: "移位数量",
              minWidth: "",
              show: true,
            },
            {
              prop: "containerCode",
              label: "容器编码",
              minWidth: "",
              show: true,
            },
            {
              prop: "cargoLocationName",
              label: "原始库位",
              minWidth: "",
              show: true,
            },
            {
              prop: "areaName",
              label: "原始库区",
              minWidth: "",
              show: true,
            },
            {
              prop: "regionName",
              label: "原始区域",
              minWidth: "",
              show: true,
            },
            {
              prop: "desCargoLocationName",
              label: "目标库位",
              minWidth: "",
              show: true,
            },
            {
              prop: "desAreaName",
              label: "目标库区",
              minWidth: "",
              show: true,
            },
            {
              prop: "desRegionName",
              label: "目标区域",
              minWidth: "",
              show: true,
            },
            {
              prop: "warehouseName",
              label: "仓库",
              minWidth: "",
              show: true,
            },
            {
              prop: "ownerName",
              label: "货主",
              minWidth: "",
              show: true,
            },
            {
              prop: "taskno",
              label: "关联任务号",
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
                type: "datetimerange",
                startPlaceholder: "开始时间",
                endPlaceholder: "结束时间",
                defaultTime: ["00:00:00", "23:59:59"],
              },
            },

            {
              label: "备注",
              type: "textarea",
              prop: "remark",
            },
          ],
          rules: {
            pointCode: [{ required: true, message: "必填", trigger: "blur" }],
            pointName: [{ required: true, message: "必填", trigger: "blur" }],
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
    };
  },

}
