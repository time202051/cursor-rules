import {Point} from "@/api/request/swagger";

export default {
  data() {
    return {
      //波次订单信息
      BCorder: {
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
          rows: [
            //   {
            //   code: "code001",
            //   name: "长宁区新渔路144号",
            //   jbdw: '基本单位',
            //   wuliaopici: '批次',
            //   bzbl: '包装比率',
            //   zjdw: '整件单位',
            //   bzq: '180',
            //   lydh:'123123',
            //   creationTime:'2023-01-09',
            //   creationTi2me:'2023-01-09',
            //   creationTi2me4:'2023-01-09',
            //   creati2onTi2me4:'2023-01-09',
            //   c2reati2onTi2me4:'2023-01-09',
            // }
          ], //表数据
          columns: [
            {
              label: "",
              minWidth: "",
              type: "selection",
              show: true,
            },
            {
              prop: "",
              label: "序号",
              minWidth: "",
              type: "index",
              sortable: false,
              show: true,
              width: "60",
            },
            {
              prop: "productCode",
              label: "零件编码",
              // columnType:'autocomplete',
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
              label: "零件批次",
              // columnType:'input',
              minWidth: "",
              sortable: false,
              show: true,
            },
            {
              prop: "_qty",
              label: "可用数量",
              // columnType:'input',
              minWidth: "100",
              sortable: false,
              show: true,
            },
            {
              prop: "cargoLocationName",
              label: "原始库位",
              minWidth: "100",
              sortable: false,
              show: true,
            },

            {
              prop: "areaName",
              label: "原始库区",
              minWidth: "100",
              sortable: false,
              show: true,
            },
            {
              prop: "region",
              label: "原始区域",
              minWidth: "100",
              sortable: false,
              show: true,
            },
            {
              prop: "desCargoLocationName",
              label: "目标库位",
              minWidth: "",
              columnType: "date",
              show: true,
            },
            {
              prop: "desAreaName",
              label: "目标库区",
              minWidth: "",
              show: true,
            },
            {
              prop: "desRegion",
              label: "目标区域",
              minWidth: "",
              // columnType:'number',
              show: true,
            },
            {
              prop: "warehouse",
              label: "仓库",
              minWidth: "",
              // columnType:'input',
              show: true,
            },
            {
              prop: "ownerName",
              label: "货主",
              minWidth: "120",
              show: true,
            },
          ], //表头
          operates: [], //表格里面的操作按钮
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
