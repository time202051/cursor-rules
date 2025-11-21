import { Point ,Reserve} from "@/api/request/swagger";
export default {
  data() {
    return {
      // 查询表单
      formSearchData: {
        reset: true,
        expendShow: true,
        value: {
          timer: [],
        },
        tableSearch: [
          // {
          //   label: "异常编码",
          //   value: "ErrorNumber",
          //   inputType: "text",
          // },
          {
            label: "关联订单号",
            value: "SourceNo",
            inputType: "text",
          },
          {
            label: "位置",
            value: "PointCode",
            inputType: "text",
          },
          {
            label: "状态",
            value: "ContainerOutStatus",
            inputType: "select",
            children: [
              {key: 1, value: "在途"},
              {key: 2, value: "已到达"}
            ],
          },
          {
            label: "发生时间",
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
          // {
          //   label: "是否尾箱",
          //   value: "TailBox",
          //   inputType: "select",
          //   children: [
          //     { key: true, value: "是" },
          //     { key: false, value: "否" },
          //   ],
          // },

          {
            label: "母托盘",
            value: "ContainerCode",
            inputType: "text",
          },
          {
            label: "子托盘",
            value: "SubTrayCode",
            inputType: "text",
          },
          {
            label: "零件编码",
            value: "ProductCode",
            inputType: "text",
          },

          // {
          //   label: "质检状态",
          //   value: "Quality",
          //   inputType: "select",
          //   children: [
          //     {
          //       key: "0",
          //       value: "隔离",
          //     },
          //     { key: "1", value: "正常" },
          //     { key: "2", value: "待检" },
          //   ],
          // },
        ],
      },
      tableData: {
        loading: false,
        emptyImg: true,
        options: {
          // entityName:"PackingInformation",
          // selection: true, // 多选框
          selection: false, // 多选框
          index: null, // 序号
          headTool: true, // 开启头部工具栏
          refreshBtn: true, // 开启表格头部刷新按钮
          downloadBtn: true, // 开启表格头部下载按钮
        }, // 序号和复选框
        rows: [], // 表数据
        columns: [
          // {
          //   label: "",
          //   minWidth: "",
          //   type: "selection",
          //   show: true,
          // },
          {
            prop: "serialNumber",
            label: "记录流水",
            minWidth: "80px",
            sortable: false,
            show: true,
          },
          {
            prop: "containerOutStatusDesc",
            label: "状态",
            minWidth: "50px",
            sortable: false,
            show: true,
          },
          {
            prop: "containerCode",
            label: "母托盘码",
            minWidth: "80px",
            sortable: false,
            show: true,
          },
          {
            prop: "subTrayCode",
            label: "子托盘码",
            minWidth: "100px",
            sortable: false,
            show: true,
          },
          {
            prop: "pointCode",
            label: "位置",
            minWidth: "80px",
            sortable: false,
            show: true,
          },
          {
            prop: "sourceNo",
            label: "关联订单号",
            minWidth: "120",
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
            prop: "creationTime",
            label: "立库出库时间",
            minWidth: "80",
            sortable: false,
            show: true,
          },{
            prop: "taskStatusDesc",
            label: "任务状态",
            minWidth: "50",
            sortable: false,
            show: true,
          },{
            prop: "comletedTime",
            label: "任务完成时间",
            minWidth: "80",
            sortable: false,
            show: true,
          },

        ], // 表头
        operates: [], // 表格里面的操作按钮
        tableHeightDiff: 300,
      },


      paginations: {
        page: 1, // 当前位于那页面
        total: 10, // 总数
        limit: 20, // 一页显示多少条
        pagetionShow: true,
      },
      //  accountForm: {
      //   dialogFormVisible: false,
      //   title: "手动调帐",
      //   model: [
      //     {
      //       label: "箱数量",
      //       type: "number",
      //       prop: "workbenche",
      //       props: {
      //         precision: 2,
      //         min:1
      //       },
      //     },
      //   ],
      //   rules: {
      //     workbenche: [{ required: true, message: "必填", trigger: "blur" }],
      //   },
      //   value: {
      //     id:null,
      //     workbenche:20
      //   },
      //   requestData: {
      //     flage: "add",
      //     url: Reserve.removeBindingApi,
      //     fn: this.getTable,
      //   },
      // },

    };
  },
};
