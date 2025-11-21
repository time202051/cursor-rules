import { AGV } from "@/api/request/swagger";
export default {
  data() {
    return {
      // 查询表单
      formSearchData: {
        reset: true,
        expendShow: true,
        value: {
          TaskNo: null,
          StartCode:null,
          OriginalBillNo: null,
          endCode: null,
          BoxTypeCode: null,
          // CargoLocationCode: null,
          TaskType: null,
          // EntranceCode: null,
          TaskStatus:null,
          timer: [],
        },
        tableSearch: [
          {
            label: "任务号",
            value: "TaskNo",
            inputType: "text",
          },
           {
            label: "来源单号",
            value: "OriginalBillNo",
            inputType: "text",
          },
             {
            label: "任务类型",
            value: "TaskType",
            inputType: "select",
            children: [],
        },
          // {
          //   label: "任务类型",
          //   value: "TaskType",
          //   inputType: "select",
          //   children: this.SET_enumsSelect({
          //     keyword: "stackerTaskTypeEnum",
          //   }),
          // },
          {
            label: "任务状态",
            value: "TaskStatus",
            inputType: "select",
            children: this.SET_enumsSelect({
              keyword: "stackerTaskStatusEnum",
            }),
          },
        //   {
        //     label: "容器类型",
        //     value: "BoxName",
        //     inputType: "select",
        //     children: [],
        // },

          {
            label: "容器编码",
            value: "BoxTypeCode",
            inputType: "text",
          },
          {
            label: "起点",
            value: "StartCode",
            inputType: "text",
          },
          {
            label: "终点",
            value: "endCode",
            inputType: "text",
          },

          // {
          //   label: "出入口",
          //   value: "EntranceCode",
          //   inputType: "text",
          // },
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
          headTool: true, //开启头部工具栏
          refreshBtn: true, //开启表格头部刷新按钮
          downloadBtn: true, //开启表格头部下载按钮
        }, //序号和复选框
        rows: [], //表数据
        columns: [{
          label: "",
          minWidth: "",
          type: 'selection',
          show: true,
        },
        {
          prop: "taskNo",
          label: "任务号",
          // minWidth: "",
          minWidth: "120",
          sortable: false,
          show: true,
        },

        {
          prop: "originalBillNo",
          label: "来源单号",
          minWidth: "150",
          sortable: false,
          show: true,
        },
        {
          prop: "taskTypeDesc",
          label: "任务类型",
          minWidth: "100",
          sortable: false,
          show: true,
        },
        {
          prop: "businessType",
          label: "业务类型",
          minWidth: "100",
          sortable: false,
          show: true,
        },
      //   {
      //     prop: "boxName",
      //     label: "容器类型",
      //     minWidth: "",
      //     sortable: false,
      //     show: true,
      // },
        {
          prop: "boxTypeCode",
          label: "容器编码",
          minWidth: "100",
          sortable: false,
          show: true,
        },
        // {
        //   prop: "startEntranceCode",
        //   label: "入库口",
        //   minWidth: "80",
        //   sortable: false,
        //   show: true,
        // },
        {
          prop: "startCode",
          label: "起点",
          minWidth: "100",
          sortable: false,
          show: true,
        },
        {
          prop: "startType",
          label: "起点类型",
          minWidth: "100",
          sortable: false,
          show: true,
        },
          {
          prop: "endCode",
          label: "终点",
          minWidth: "100",
          sortable: false,
          show: true,
        },
        {
          prop: "endType",
          label: "终点类型",
          minWidth: "100",
          sortable: false,
          show: true,
        },

        {
          prop: "roadWayCode",
          label: "巷道编码",
          minWidth: "80",
          sortable: false,
          show: true,
        },


        {
          prop: "layer",
          label: "层",
          minWidth: "50",
          sortable: false,
          show: true,
        },


        {
          prop: "level",
          label: "任务优先级",
          minWidth: "90",
          sortable: false,
          show: true,
        },
        {
          prop: "taskStatusDesc",
          label: "任务状态",
          minWidth: "100",
          sortable: false,
          show: true,
        },
        {
          prop: "warehouseTypeDesc",
          label: "仓库",
          minWidth: "100",
          sortable: false,
          show: true,
        },



        {
          prop: "completeTime",
          label: "完成时间",
          minWidth: "",
          sortable: false,
          show: true,
        },

        {
          prop: "creationTime",
          label: "创建时间",
          minWidth: "",
          sortable: false,
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
        model: [

          {
            label: "仓库",
            type: "input",
            prop: "warehouseTypeDesc",
            readonly: true,//不可填

          },
          {
            label: "任务号",
            type: "input",
            prop: "taskNo",
            readonly: true,//不可填

          },
          {
            label: "可用巷道",
            type: "input",
            prop: "layers",

            // readonly: true,//不可填

          },

          // {
          //   label: "入库口",
          //   type: "input",
          //   prop: "EntranceCode",
          // },

        ],
        rules: {
          // taskNo: [{ required: true, message: "必填", trigger: "blur" }],
          layers: [{ required: true, message: "必填", trigger: "blur" }],
          // EntranceCode: [{ required: true, message: "必填", trigger: "blur" }],
          // method: [{ required: true, message: "必填", trigger: "blur" }],
        },
        value:{
          warehouseTypeDesc:"",
          taskNo:"",
          layers:'',
          // EntranceCode:"",
        },

        // value: {
        //   taskCode: "",
        //   method: "end",
        //   cache:"true"
        // },
        requestData: {
          flage: "add",
          fn: this.getTable,
          // flages:true  //特殊页面   弹框标识 flages 参数接在url 后面
        },
      },
    }
  }
}
