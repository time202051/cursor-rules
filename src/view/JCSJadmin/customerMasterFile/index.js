import { Basic } from "@/api/request/swagger";
export default {
  data() {
    return {
      // 查询表单
      formSearchData: {
        reset: true,
        expendShow: false,
        value: {
          ShipperName: null,
          ShipperCode: null,
          Contacts: null,
          priorityLayer: null,
          timer: [],
        },
        tableSearch: [
          {
            label: "客户编码",
            value: "ShipperCode",
            inputType: "text",
          },
          {
            label: '出库区域',
            value: 'priorityLayer',
            inputType: 'select',
            children: this.SET_enumsSelect({
              keyword: 'priorityLayerEnum'
            })
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
        ],
      },
      tableData: {
        loading: false,
        emptyImg: true,
        options: {
          entityName:"Shipper",
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
            prop: "shipperCode",
            label: "客户编码",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "orgCode",
            label: "公司编码",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "priorityLayerDesc",
            label: "出库区域",
            minWidth: "",
            sortable: false,
            show: true,
            render: function(row) {
              return h => {
                if (row.priorityLayerDesc === null || row.priorityLayerDesc === '') {
                  return '';
                }
                const tagType = row.priorityLayerDesc.indexOf('应急') > 0 ? "warning" : "success";
                return h('el-tag', {
                  props: {type: tagType}
                }, row.priorityLayerDesc);
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
            prop: "creationTime",
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
        width: "65%", //弹出框宽度
        model: [
          {
            label: "客户编码",
            type: "input",
            prop: "shipperCode",
          },
          {
            label: "归属公司",
            type: "select",
            prop: "orgId",
            child: [],
          },
          {
            label: "出库区域",
            type: "select",
            prop: "priorityLayer",
            child: this.SET_enumsSelect({
              keyword: "priorityLayerEnum",
            }),
          },
          // {
          //   label: "联系人",
          //   type: "input",
          //   prop: "contacts",
          // },
          // {
          //   label: "联系人电话",
          //   type: "input",
          //   prop: "telephone",
          // },
          // {
          //   label: "经度",
          //   type: "number",
          //   prop: "longitude",
          //   props: {
          //     precision: 2,
          //     min: 0,
          //   },
          // },
          // {
          //   label: "纬度",
          //   type: "number",
          //   prop: "latitude",
          //   props: {
          //     precision: 2,
          //     min: 0,
          //   },
          // },
          // {
          //   label: "语言",
          //   type: "input",
          //   prop: "language",
          // },
          // {
          //   label: "周转箱管理",
          //   type: "switch",
          //   prop: "isTurnoverNox",
          // },
          {
            label: "状态",
            type: "switch",
            prop: "enabled",
          },
          // {
          //   label: "地址",
          //   type: "textarea",
          //   prop: "address",
          // },
          {
            label: "备注",
            type: "textarea",
            prop: "remark",
          },
        ],
        rules: {
          priorityLayer: [{ required: true, message: "必填", trigger: "blur" }],
          shipperCode: [{ required: true, message: "必填", trigger: "blur" }],
          // shipperName: [{ required: true, message: "必填", trigger: "blur" }],
          orgId: [{ required: true, message: "必填", trigger: "blur" }],
          telephone: [
            { required: false, message: "必填", trigger: "blur" },
            {
              pattern: /^1[3|5|7|8|9]\d{9}$/,
              message: "手机号格式不正确",
              trigger: "blur",
            },
          ],
        },
        value: {
          priorityLayer:"",
          shipperCode: "",
          shipperName: "",
          shipperSimpleName: "",
          orgId: "",
          contacts: "",
          telephone: "",
          longitude: "",
          latitude: "",
          language: "",
          isTurnoverNox: true,
          enabled: true,
          address: "",
          remark: "",
        },
        requestData: {
          flage: "add",
          url: Basic.handleCustomer,
          fn: this.getTable,
        },
      },
    };
  },
};
