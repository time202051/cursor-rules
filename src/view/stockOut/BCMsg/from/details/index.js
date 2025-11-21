import { Point } from "@/api/request/swagger";
export default {
  data() {
    return {
      // 波次订单信息
      BCorder: {
        multipleSelection: [],
        // 查询表单
        formSearchData: {
          reset: true,
          expendShow: true,
          value: {
            BillNo: null,
            OrderState: null,
            WarehouseName:null,
            timer: [],
            arrivalTimer: [],
            ShipperCode: null,
            WarehouseCode: null,
          },
          tableSearch: [
            {
              label: "出库单号",
              value: "BillNo",
              inputType: "text",
            },
            {
              label: "单据状态",
              value: "OrderState",
              inputType: "select",
              children: this.SET_enumsSelect({
                keyword: "orderStateEnum",
              }),
            },
            {
              label: "仓库名称",
              value: "WarehouseName",
              inputType: "text",
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
                valueFormat: "yyyy-MM-dd HH:mm:ss",
                format: "yyyy/MM/dd HH:mm:ss",
              },
            },
            {
              label: "要货日期",
              value: "arrivalTimer",
              inputType: "picker",
              props: {
                type: "datetimerange",
                startPlaceholder: "开始时间",
                endPlaceholder: "结束时间",
                placeholder: "选择时间范围",
                valueFormat: "yyyy-MM-dd HH:mm:ss",
                format: "yyyy/MM/dd HH:mm:ss",
              },
            },
            {
              label: "客户编码",
              value: "ShipperCode",
              inputType: "text",
            },
            {
              label: "仓库编码",
              value: "WarehouseCode",
              inputType: "text",
            },
          ],
        },
        tableData: {
          loading: false,
          emptyImg: true,
          options: {
            selection: true, // 多选框
            index: null, // 序号
            headTool: false, // 开启头部工具栏
            refreshBtn: false, // 开启表格头部刷新按钮
            downloadBtn: false, // 开启表格头部下载按钮
          }, // 序号和复选框
          rows: [], // 表数据
          columns: [
            {
              label: "序号",
              minWidth: "",
              type: "index",
              show: true,
            },
            {
              prop: "billNo",
              label: "出库订单号",
              minWidth: "200",
              sortable: false,
              show: true,
            },
            {
              prop: "sourceNo",
              label: "关联上游单号",
              minWidth: "200",
              sortable: false,
              show: true,
            },
            {
              prop: "warehouseName",
              label: "仓库",
              minWidth: "",
              sortable: false,
              show: true,
            },
            {
              prop: "typeDesc",
              label: "订单类型",
              minWidth: "130",
              sortable: false,
              show: true,
            },
            {
              prop: "shipperCode",
              label: "客户编码",
              minWidth: "",
              sortable: false,
              show: true,
            },
            {
              prop: "shipperName",
              label: "客户名称",
              minWidth: "",
              sortable: false,
              show: true,
            },
            {
              prop: "arrivalDate",
              label: "要货日期",
              minWidth: "150",
              sortable: false,
              show: true,
            },
            {
              prop: "stagingName",
              label: "工作台",
              minWidth: "",
              sortable: false,
              show: true,
            },
            {
              prop: "regionName",
              label: "出货区域",
              minWidth: "",
              sortable: false,
              show: true,
            },
            {
              prop: "craeteUserName",
              label: "制单人",
              minWidth: "120",
              show: true,
            },
            {
              prop: "creationTime",
              label: "创建时间",
              minWidth: "150",
              show: true,
            },
          ], // 表头
          operates: [], // 表格里面的操作按钮
          tableHeightDiff: 350,
        },
        paginations: {
          page: 1, // 当前位于那页面
          total: 10, // 总数
          limit: 20, // 一页显示多少条
          pagetionShow: true,
          refresh: false,
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
      // 拣选任务
      JXtask: {
        multipleSelection: [],
        // 查询表单
        formSearchData: {
          reset: true,
          expendShow: true,
          value: {
            TaskStatus: null,
            LackStatus: null,
            ProductCode: null,
            timer: [],
            TaskCode:null,
            OwnerCode:null
          },
          tableSearch: [
            {
              label: "任务状态",
              value: "TaskStatus",
              inputType: "select",
              children: this.SET_enumsSelect({
                keyword: "stockOutDetailTaskStateEnum",
              }),
            },
            {
              label: "缺货标识",
              value: "LackStatus",
              inputType: "select",
              children: [
                { key: true, value: "是" },
                { key: false, value: "否" },
              ],
            },
            {
              label: "零件编码",
              value: "ProductCode",
              inputType: "text",
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
                valueFormat: "yyyy-MM-dd HH:mm:ss",
                format: "yyyy/MM/dd HH:mm:ss",
              },
            },
            {
              label: "拣选任务号",
              value: "TaskCode",
              inputType: "text",
            },
            {
              label: "客户编码",
              value: "OwnerCode",
              inputType: "text",
            }
          ],
        },
        tableData: {
          loading: false,
          emptyImg: true,
          options: {
            selection: true, // 多选框
            index: true, // 序号
            headTool: false, // 开启头部工具栏
            refreshBtn: false, // 开启表格头部刷新按钮
            downloadBtn: false, // 开启表格头部下载按钮
          }, // 序号和复选框
          rows: [], // 表数据
          columns: [
            {
              prop: "taskStatusDesc",
              label: "任务状态",
              minWidth: "130",
              sortable: false,
              show: true,
            },
            {
              prop: "lack",
              label: "缺货标识",
              minWidth: "120",
              sortable: false,
              show: true,
              renderSlot: true,
            },
            {
              prop: "ownerName",
              label: "货主",
              minWidth: "",
              sortable: false,
              show: true,
            },
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
              prop: "amount",
              label: "要货数量",
              minWidth: "120",
              sortable: false,
              show: true,
            },
            {
              prop: "actualAmount",
              label: "分配数量",
              minWidth: "120",
              sortable: false,
              show: true,
            },
            {
              prop: "batchNum",
              label: "零件批次",
              minWidth: "",
              sortable: false,
              show: true,
            },
            {
              prop: "batchSupNum",
              label: "供应商批次",
              minWidth: "",
              sortable: false,
              show: true,
            },
            {
              prop: "date",
              label: "收货日期",
              minWidth: "160",
              sortable: false,
              show: true,
            },
            {
              prop: "reference",
              label: "参考号",
              minWidth: "",
              sortable: false,
              show: true,
            },
            {
              prop: "shelf",
              label: "料架号",
              minWidth: "",
              sortable: false,
              show: true,
            },
            {
              prop: "prodline",
              label: "产线代码",
              minWidth: "",
              sortable: false,
              show: true,
            },
            {
              prop: "stagingName",
              label: "拣选工作台",
              minWidth: "",
              sortable: false,
              show: true,
            },
            {
              prop: "createUserName",
              label: "制单人",
              minWidth: "120",
              sortable: false,
              show: true,
            },
            {
              prop: "creationTime",
              label: "创建时间",
              minWidth: "160",
              show: true,
            },
            {
              prop: "details",
              label: "分配详情",
              minWidth: "100",
              fixed: "right",
              renderSlot: true,
              show: true,
            },
          ], // 表头
          operates: [], // 表格里面的操作按钮
          tableHeightDiff: 350,
        },
        paginations: {
          page: 1, // 当前位于那页面
          total: 10, // 总数
          limit: 20, // 一页显示多少条
          pagetionShow: true,
          refresh: false,
        },
        FPdetails: {
          id: "",
          multipleSelection: [],
          tableData: {
            loading: false,
            emptyImg: true,
            options: {
              selection: true, // 多选框
              index: true, // 序号
              headTool: false, // 开启头部工具栏
              refreshBtn: false, // 开启表格头部刷新按钮
              downloadBtn: false, // 开启表格头部下载按钮
            }, // 序号和复选框
            rows: [], // 表数据
            columns: [
              {
                prop: "jxBoxNo",
                label: "拣选箱号",
                sortable: false,
                minWidth: "100",
                show: true,
                renderSlot:true
              },
              {
                prop: "billNo",
                label: "拣选任务号",
                minWidth: "200",
                sortable: false,
                show: true,
              },
              {
                prop: "wavePickTaskStateDesc",
                label: "任务状态",
                minWidth: "120",
                sortable: false,
                show: true,
              },
              {
                prop: "ownerCode",
                label: "货主编码",
                minWidth: "",
                sortable: false,
                show: true,
              },
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
                prop: "batchNum",
                label: "零件批次",
                minWidth: "",
                sortable: false,
                show: true,
              },
              {
                prop: "aSRSTaskNo",
                label: "关联ASRS任务号",
                minWidth: "200",
                sortable: false,
                show: true,
              },
              {
                prop: "containerTypeDesc",
                label: "拣选容器类型",
                minWidth: "",
                sortable: false,
                show: true,
              },
              {
                prop: "containerCode",
                label: "拣选容器编码",
                minWidth: "",
                sortable: false,
                show: true,
              },
              {
                prop: "subtrayCode",
                label: "拣选子容器号",
                minWidth: "",
                sortable: false,
                show: true,
              },
              {
                prop: "shipperCode",
                label: "客户编码",
                minWidth: "",
                sortable: false,
                show: true,
              },
              {
                prop: "shipperName",
                label: "客户名称",
                minWidth: "",
                sortable: false,
                show: true,
              },
              {
                prop: "cargoLocationName",
                label: "分配库位",
                minWidth: "",
                sortable: false,
                show: true,
              },
              {
                prop: "qty",
                label: "分配数量",
                minWidth: "100",
                sortable: false,
                show: true,
              },
              {
                prop: "stagingName",
                label: "拣选工作台",
                minWidth: "",
                sortable: false,
                show: true,
              },
              {
                prop: "stagingCargoLocationName",
                label: "拣选库位",
                minWidth: "",
                sortable: false,
                show: true,
              },
              {
                prop: "pickQty",
                label: "实际拣货数量",
                minWidth: "130",
                sortable: false,
                show: true,
              },
              {
                prop: "createUserName",
                label: "拣选人",
                minWidth: "120",
                sortable: false,
                renderPerson: true,
                show: true,
              },
              {
                prop: "pickDate",
                label: "拣选时间",
                minWidth: "150",
                sortable: false,
                show: true,
              },
              {
                prop: "creationTime",
                label: "创建时间",
                minWidth: "150",
                sortable: false,
                show: true,
              },
            ], // 表头
            operates: [], // 表格里面的操作按钮
            tableHeightDiff: 350,
          },
          paginations: {
            page: 1, // 当前位于那页面
            total: 10, // 总数
            limit: 20, // 一页显示多少条
            pagetionShow: true,
            refresh: false,
          },
        },
        jxBoxNoDetails:{
          dialogFormVisible:false,
          title:"拣选箱号详情",
          row:{}
        }
      },
    };
  },
};
