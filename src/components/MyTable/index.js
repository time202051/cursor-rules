import { AGV ,AuditLogging} from "@/api/request/swagger";
export default {
  data() {
    return {
      // 查询表单
      formSearchDataTemp: {
        reset: true,
        expendShow: true,
        value: {
          UserName: null,
          Method: null,
          ChangeType: null,
          ChangeField: null,
          // WarehouseId: null,
          // ProductBatch: null,
          // SupplierBatch: null,
          // InformationEnum: null,
          // BoxCode: null,
          // ProductType: null,
          // SubtrayCode: null,
          timer: [],
          // IsNoStock: null,
          // remark: null,
        },
        tableSearch: [
          {
            label: "修改人",
            value: "UserName",
            inputType: "text",
          },
          {
            label: "方法",
            value: "Method",
            inputType: "text",
          },
          {
            label: "变更类型",
            value: "ChangeType",
            inputType: "text",
          },
          {
            label: "变更字段",
            value: "ChangeField",
            inputType: "text",
          },
          // {
          //   label: "所属区域",
          //   value: "RegionId",
          //   inputType: "select",
          //   children:[]
          // },
          // {
          //   label: "仓库",
          //   value: "WarehouseId",
          //   inputType: "select",
          //   children: [],
          // },
          // {
          //   label: "零件批次",
          //   value: "ProductBatch",
          //   inputType: "text",
          // },
          // {
          //   label: "供应商批次",
          //   value: "SupplierBatch",
          //   inputType: "text",
          // },
          // {
          //   label: "质检状态",
          //   value: "InformationEnum",
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
          // {
          //   label: "箱编号",
          //   value: "BoxCode",
          //   inputType: "text",
          // },
          // {
          //   label: "零件存货属性",
          //   value: "ProductType",
          //   inputType: "select",
          //   children: this.SET_enumsSelect({
          //     keyword: "productTypeEnum",
          //   }),
          // },
          // {
          //   label: "子容器编码",
          //   value: "SubtrayCode",
          //   inputType: "text",
          // },
          {
            label: "变更时间",
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
          //   label: "是否零售",
          //   value: "IsNoStock",
          //   inputType: "select",
          //   children: [
          //     { key: true, value: "是" },
          //     { key: false, value: "否" },
          //   ],
          // },
          // {
          //   label: "备注",
          //   value: "remark",
          //   inputType: "text",
          // },
        ],
      },
      tableDataTemp: {
        loading: false,
        emptyImg: true,
        options: {
          // entityName:"Stock",
          selection: false, // 多选框
          index: null, // 序号
          headTool: false, // 开启头部工具栏
          refreshBtn: false, // 开启表格头部刷新按钮
          downloadBtn: false, // 开启表格头部下载按钮
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
            prop: "tableName",
            label: "表名",
            width:100,
            sortable: false,
            show: true,
          },
          {
            prop: "userName",
            label: "修改人",
            width:100,
            sortable: false,
            show: true,
          },
          {
            prop: "changeTime",
            label: "变更时间",
            width:140,
            sortable: false,
            show: true,
          },
          {
            prop: "rcsStatus",
            label: "任务状态",
            width:100,
            sortable: false,
            show: false,
          },
          {
            prop: "method",
            label: "方法",
            sortable: false,
            show: true,
          },
          {
            prop: "changeType",
            label: "变更类型",
           width:100,
            sortable: false,
            show: true,
          },
          {
            prop: "details",
            label: "变更信息",
            width:100,
            // minWidth: "120",
            // fixed: "right",
            sortable: false,
            show: true,
            renderSlot: true,
          },
          // {
          //   prop: "minPackageQty",
          //   label: "最小包装",
          //   minWidth: "120",
          //   sortable: false,
          //   show: true,
          // },
          // {
          //   prop: "unitCode",
          //   label: "最小单位",
          //   minWidth: "120",
          //   sortable: false,
          //   show: true,
          // },
          // {
          //   prop: "productBatch",
          //   label: "零件批次",
          //   minWidth: "",
          //   sortable: false,
          //   show: true,
          // },
          // {
          //   prop: "supplierBatch",
          //   label: "供应商批次",
          //   minWidth: "",
          //   sortable: false,
          //   show: true,
          // },
          // {
          //   prop: "receivingTime",
          //   label: "收货日期",
          //   minWidth: "160",
          //   sortable: false,
          //   show: true,
          // },
          // {
          //   prop: "referenceCode",
          //   label: "参考号",
          //   minWidth: "",
          //   sortable: false,
          //   show: true,
          // },
          // {
          //   prop: "expirationTime",
          //   label: "保质期",
          //   minWidth: "160",
          //   sortable: false,
          //   show: true,
          // },
          // {
          //   prop: "supplier",
          //   label: "供应商",
          //   minWidth: "",
          //   sortable: false,
          //   show: true,
          // },
          // {
          //   prop: "company",
          //   label: "公司",
          //   minWidth: "",
          //   sortable: false,
          //   show: true,
          // },
          // {
          //   prop: "warehouse",
          //   label: "仓库",
          //   minWidth: "",
          //   sortable: false,
          //   show: true,
          // },
          // {
          //   prop: "area",
          //   label: "库区",
          //   minWidth: "",
          //   sortable: false,
          //   show: true,
          // },
          // {
          //   prop: "cargoLocationCode",
          //   label: "库位编码",
          //   minWidth: "",
          //   sortable: false,
          //   show: true,
          // },
          // {
          //   prop: "containerType",
          //   label: "容器类型",
          //   minWidth: "180",
          //   sortable: false,
          //   show: true,
          // },
          // {
          //   prop: "containerCode",
          //   label: "容器编码",
          //   minWidth: "",
          //   sortable: false,
          //   show: true,
          // },
          // {
          //   prop: "subtrayCode",
          //   label: "子容器编码",
          //   minWidth: "",
          //   sortable: false,
          //   show: true,
          // },
          // {
          //   prop: "state",
          //   label: "状态",
          //   minWidth: "",
          //   sortable: false,
          //   show: true,
          // },
          // {
          //   prop: "waveNumber",
          //   label: "波次号",
          //   minWidth: "200",
          //   sortable: false,
          //   show: true,
          // },
          // {
          //   prop: "remark",
          //   label: "备注",
          //   minWidth: "",
          //   sortable: false,
          //   show: true,
          // },
          // {
          //   prop: "details",
          //   label: "详情",
          //   minWidth: "120",
          //   fixed: "right",
          //   sortable: false,
          //   show: true,
          //   renderSlot: true,
          // },
        ], // 表头
        operates: [], // 表格里面的操作按钮
        tableHeightDiff: 300,
      },
      paginationsTemp: {
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
      multipleSelectionTemp:[],
      btnTemp:Object,
      TableName:null,
      EntityId:null,
      dialogVisible: false,
    };
  },
  mounted() {
    // console.log(this.hasBtn(this))
    const newArr = this.hasBtn(this).filter(item => item.title === "hello");
    this.btnTemp =  newArr
    //根据实体名称显示表格列
    if(this.tableData.options.entityName=="BusinessTask"||this.tableData.options.entityName=="AGVBusinessTask"){
      this.tableDataTemp.columns.forEach(e=>{
        if(e.prop=="rcsStatus"){
          e.show = true
        }
      })
    }
  },
  methods:{
    handleClose() {
      this.dialogVisible = false;
      this.formSearchDataTemp.value = {
        EntityId:null,
        TableName:null,
        UserName: null,
        Method: null,
        ChangeType: null,
        ChangeField: null,
        timer:[]
      }

    },
    detailsTemp(row){
      console.log(row)
    },
    viewEntity(entityName) {
      // 追踪实体
      if(this.selectActive.length>1) {
        this.$message.info("最多选择一条数据");
        return
      }
      // this.dialogVisible = true;
      this.formSearchDataTemp.value.TableName = entityName;
      if (this.selectActive.length > 0) {
        if (entityName === "Pick") {
          this.formSearchDataTemp.value.EntityId = this.selectActive[0].pickId;
        } else {
          this.formSearchDataTemp.value.EntityId = this.selectActive[0].id;
        }
      }
      this.getTableTemp();
    },
    getTableTemp(){
      this.get({
        url:AuditLogging.entitychangepages,
        isLoading: true,
        data: Object.assign(this.formSearchDataTemp.value, {

          Page: this.paginationsTemp.page,
          MaxResultCount: this.paginationsTemp.limit,
          StartTime: this.formSearchDataTemp.value.timer?.[0],
          EndTime: this.formSearchDataTemp.value.timer?.[1],
        }),
      }).then(res=>{

        this.tableDataTemp.rows = res.result.items;
        this.paginationsTemp.total = res.result.totalCount;
        this.tableDataTemp.emptyImg = true;
        this.dialogVisible = true;
      })
    },
    handleSearchTemp(from){
      this.formSearchDataTemp.value = { ...from };
      this.paginationsTemp.page = 1;
      this.getTableTemp();
    },
    handleResetTemp(){

    },
    SelectionChangeTemp(row){
      this.multipleSelectionTemp = row;
    },
    handleSizeChangeTemp(val){
      this.paginationsTemp.page = 1;
      this.paginationsTemp.limit = val;
      this.getTableTemp();
    },
    handleindexChangeTemp(val){
      this.paginationsTemp.page = val;
      this.getTableTemp();
    }
  }
};
