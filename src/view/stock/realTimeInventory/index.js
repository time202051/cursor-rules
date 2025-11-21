import { AGV } from "@/api/request/swagger";
export default {
  data() {
    return {
      // 查询表单
      formSearchData: {
        reset: true,
        expendShow: true,
        value: {
          ProductCode: null,
          ContainerCode: null,
          CargoLocationCode: null,
          RegionId: null,
          WarehouseId: null,
          ProductBatch: null,
          SupplierBatch: null,
          InformationEnum: null,
          BoxCode: null,
          ProductType: null,
          SubtrayCode: null,
          timer: [],
          IsNoStock: null,
          remark: null,
        },
        tableSearch: [
          {
            label: "零件编码",
            value: "ProductCode",
            inputType: "text",
          },
          {
            label: "容器编码",
            value: "ContainerCode",
            inputType: "text",
          },
          {
            label: "库位编码",
            value: "CargoLocationCode",
            inputType: "text",
          },
          {
            label: "所属区域",
            value: "RegionId",
            inputType: "select",
            children:[]
          },
          {
            label: "仓库",
            value: "WarehouseId",
            inputType: "select",
            children: [],
          },
          {
            label: "零件批次",
            value: "ProductBatch",
            inputType: "text",
          },
          {
            label: "供应商批次",
            value: "SupplierBatch",
            inputType: "text",
          },
          {
            label: "质检状态",
            value: "InformationEnum",
            inputType: "select",
            children: [
              {
                key: "0",
                value: "隔离",
              },
              { key: "1", value: "正常" },
              { key: "2", value: "待检" },
            ],
          },
          {
            label: "箱编号",
            value: "BoxCode",
            inputType: "text",
          },
          {
            label: "零件存货属性",
            value: "ProductType",
            inputType: "select",
            children: this.SET_enumsSelect({
              keyword: "productTypeEnum",
            }),
          },
          {
            label: "子容器编码",
            value: "SubtrayCode",
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
            label: "是否寄售",
            value: "IsNoStock",
            inputType: "select",
            children: [
              { key: true, value: "是" },
              { key: false, value: "否" },
            ],
          },
          {
            label: "备注",
            value: "remark",
            inputType: "text",
          },
        ],
      },
      tableData: {
        loading: false,
        emptyImg: true,
        options: {
          entityName:"Stock",
          selection: true, // 多选框
          index: null, // 序号
          headTool: true, // 开启头部工具栏
          refreshBtn: true, // 开启表格头部刷新按钮
          downloadBtn: true, // 开启表格头部下载按钮
        }, // 序号和复选框
        rows: [], // 表数据
        columns: [
          {
            label: "",
            minWidth: "",
            type: "selection",
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
            minWidth: "180",
            sortable: false,
            show: true,
          },
          {
            prop: "productTypeDesc",
            label: "零件存货属性",
            minWidth: "180",
            sortable: false,
            show: true,
          },
          {
            prop: "totalQty",
            label: "库存数量",
            minWidth: "120",
            sortable: false,
            show: true,
          },
          {
            prop: "lockQty",
            label: "占用数量",
            minWidth: "120",
            sortable: false,
            show: true,
          },
          {
            prop: "region",
            label: "区域",
            minWidth: "180",
            sortable: false,
            show: true,
          },
          {
            prop: "minPackageQty",
            label: "最小包装",
            minWidth: "120",
            sortable: false,
            show: true,
          },
          {
            prop: "unitCode",
            label: "最小单位",
            minWidth: "120",
            sortable: false,
            show: true,
          },
          {
            prop: "productBatch",
            label: "零件批次",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "supplierBatch",
            label: "供应商批次",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "receivingTime",
            label: "收货日期",
            minWidth: "160",
            sortable: false,
            show: true,
          },
          {
            prop: "referenceCode",
            label: "参考号",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "expirationTime",
            label: "保质期",
            minWidth: "160",
            sortable: false,
            show: true,
          },
          {
            prop: "supplier",
            label: "供应商",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "company",
            label: "公司",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "warehouse",
            label: "仓库",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "area",
            label: "库区",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "roadWayCode",
            label: "巷道编码",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "cargoLocationCode",
            label: "库位编码",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "containerType",
            label: "容器类型",
            minWidth: "180",
            sortable: false,
            show: true,
          },
          {
            prop: "containerCode",
            label: "容器编码",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "subtrayCode",
            label: "子容器编码",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "state",
            label: "状态",
            minWidth: "",
            sortable: false,
            show: true,
            render: function(row) {
              return h => {
                if (row.state === null || row.state === "") {
                  return '';
                }
                const states = row.state.split(',');
                const tags = states.map(code => {
                  let tagType;
                  switch (code.trim()) {
                    case '正常':
                      tagType = 'success';
                      break;
                    case '待检':
                      tagType = 'info';
                      break;
                    case '隔离':
                      tagType = 'danger';
                      break;
                    default:
                      tagType = 'default'; // 默认类型
                      break;
                  }
                  return h('el-tag', {props: {type: tagType}}, code.trim());
                });
                return h('div', {}, tags);
              };
            }
          },
          // {
          //   prop: "waveNumber",
          //   label: "波次号",
          //   minWidth: "200",
          //   sortable: false,
          //   show: true,
          // },
          {
            prop: "remark",
            label: "备注",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "details",
            label: "详情",
            minWidth: "120",
            fixed: "right",
            sortable: false,
            show: true,
            renderSlot: true,
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
      detailsform: {
        outerVisible: false,
        title: "详情",
        row: {},
        requestData: {
          flage: "add",
          fn: this.getTable,
        },
      },
      form: {
        dialogFormVisible: false,
        title: "",
        carCodes: [],
        model: [
          {
            label: "小车编码",
            type: "checkbox",
            prop: "carCodes",
          },
        ],
        rules: {
          // taskCode: [{ required: true, message: "必填", trigger: "blur" }],
          // method: [{ required: true, message: "必填", trigger: "blur" }],
        },
        value: {
          carCodes: [],
          // taskCode:"",
          // method: "end",
          // cache:"true"
        },
        requestData: {
          flage: "add",
          url: AGV.callback,
          fn: this.getTable,
          flages: true, // 特殊页面   弹框标识 flages 参数接在url 后面
        },
      },
    };
  },
};
