import {Point, StockInfo} from "@/api/request/swagger";

export default {
  data() {
    return {
      //按钮数据
      btnlist:[

        {
          title:'导出',
          method:this.export
        }
      ],
      // 查询表单
      formSearchData: {
        reset: true, //重置
        expendShow: false, //展开
        value: {
          ProductCode: null, //对应输入框的value字段
          LPN: null,
          BindStateEnum: null,
          RegionId: null,
          GroundShelfType: null,
          ContainerCode: null,
          timer: [],
        },
        tableSearch: [
          {
            label: "损益单号",
            value: "LPN",
            inputType: "text",
          },
         
          // {
          //   label: "容器编码",
          //   value: "ContainerCode",
          //   inputType: "text",
            // inputType: "select",
            // children: [],
            // tempBoxData: [],
            // //自定义指令
            // loadmores: {
            //   fn: this.loadmoreGX,
            //   SELECTWRAP_DOM_index: 0,
            //   flage: 'RoadWayId',
            // },
          // },
        //   {
        //     label: "任务状态",
        //     value: "BindStateEnum",
        //     inputType: "select",
        //     children: this.SET_enumsSelect({
        //       keyword: "bindStateEnum",
        //     }),
        //   },
          {
            label: "损益来源",
            value: "ProductCode",
            inputType: "text",
          },
          {
            label: "盘点单号",
            value: "ProductCode",
            inputType: "text",
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
      // 表格数据
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
        columns: [
          {
            label: '',
            minWidth: '',
            type: 'selection',
            show: true
          },
          {
            prop: "orginalBillNo",
            label: "损益单号",
            minWidth: "200",
            sortable: false,
            show: true,
          },
          {
            prop: "containerShapeTypeDesc",
            label: "损益来源",
            minWidth: "100",
            sortable: false,
            show: true,
          },
          {
            prop: "containerCode",
            label: "关联盘点单号",
            minWidth: "300",
            sortable: false,
            show: true,
          },

          {
            prop: "groundShelfTypeDesc",
            label: "公司",
            minWidth: "100",
            sortable: false,
            show: true,
          },
          {
            prop: "regionName",
            label: "仓库",
            minWidth: "100",
            sortable: false,
            show: true,
          },
          {
            prop: "totalQty",
            label: "单据状态",
            minWidth: "100",
            sortable: false,
            show: true,
          },
        
          {
            prop: "orderCode",
            label: "零件详情",
            minWidth: "",
            fixed: 'right',
            sortable: false,
            show: true,
            renderSlot:true,
            // render: m => {
            //   return <span style="color: #1682e6;cursor: pointer;"
            //                onClick={this.details} >详情</span>
            // }
          },
          {
            prop: "createUser",
            label: "创建人",
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
      detailsform: {
        outerVisible: false,
        title: "详情",
        row:{},
        requestData: {
          flage: "add",
          url: Point.point,
          fn: this.getTable,
        },

      },
    }
  }
}
