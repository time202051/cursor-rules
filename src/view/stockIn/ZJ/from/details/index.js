import { InBound } from "@/api/request/swagger";
export default {
  data() {
    return {
      //质检单信息
      ZJOrder: {
        multipleSelection: [],
        // 查询表单
        formSearchData: {
          reset: true, //重置
          expendShow: true, //展开
          value: {
            ProductCode: null, //对应输入框的value字段
            ProductName:null,
            ItemBatch: null,
            SupplierBatch:null,
            ReferenceCode:null,
            ContainerCode:null,
            SubtrayCode:null,
            QualityCheckTaskState: null,
            QualityCheckResult: null,
          },
          tableSearch: [
            {
              label: "零件编码",
              value: "ProductCode",
              inputType: "text",
            },
            {
              label: "零件名称",
              value: "ProductName",
              inputType: "text",
            },
            {
              label: "零件批次",
              value: "ItemBatch",
              inputType: "text",
            },
            {
              label: "供应商批次",
              value: "SupplierBatch",
              inputType: "text",
            },
            {
              label: "参考号",
              value: "ReferenceCode",
              inputType: "text",
            },
            {
              label: "母托盘码",
              value: "ContainerCode",
              inputType: "text",
            },
            {
              label: "子托盘码",
              value: "SubtrayCode",
              inputType: "text",
            },
            {
              label: "状态",
              value: "QualityCheckTaskState",
              inputType: "select",
              children: this.SET_enumsSelect({
                keyword: "qualityCheckTaskStateEnum",
              }),
            },
            {
              label: "质检结果",
              value: "QualityCheckResult",
              inputType: "select",
              children: this.SET_enumsSelect({
                keyword: "qualityCheckResultEnum",
              }),
            },
          ],
        },
        tableData: {
          loading: false,
          emptyImg: true,
          options: {
            entityName:"QualityCheckOrderSDetail",
            selection: true, //多选框
            index: null, //序号
            headTool: false, //开启头部工具栏
            refreshBtn: false, //开启表格头部刷新按钮
            downloadBtn: false, //开启表格头部下载按钮
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
              prop: "",
              label: "序号",
              type: "index",
              sortable: false,
              show: true,
              width: 60,
            },
            {
              prop: "productCode",
              label: "零件编码",
              minWidth: "200",
              show: true,
            },
            {
              prop: "productName",
              label: "零件名称",
              minWidth: "",
              show: true,
            },
            {
              prop: "qualityCheckTaskStateDesc",
              label: "明细状态",
              minWidth: "120",
              show: true,
            },
            {
              prop: "productBatch",
              label: "零件批次",
              minWidth: "",
              show: true,
            },
            {
              prop: "supplierBatch",
              label: "供应商批次",
              minWidth: "",
              show: true,
            },
            {
              prop: "receivingTime",
              label: "收货日期",
              minWidth: "150",
              show: true,
            },
            {
              prop: "referenceCode",
              label: "参考号",
              minWidth: "",
              show: true,
            },
            {
              prop: "qualityCheckQty",
              label: "质检数量",
              minWidth: "120",
              show: true,
            },
            {
              prop: "qualityCheckBoxQty",
              label: "质检箱数",
              minWidth: "120",
              show: true,
            },
            {
              prop: "qualityCheckResultDesc",
              label: "质检结果",
              minWidth: "120",
              show: true,
            },
            {
              prop: "containerCode",
              label: "母托盘码",
              minWidth: "",
              show: true,
            },
            {
              prop: "subtrayCode",
              label: "子托盘码",
              minWidth: "",
              show: true,
            },
            {
              prop: "taskNo",
              label: "关联任务号",
              minWidth: "200",
              show: true,
            },
            {
              prop: "compeltedTime",
              label: "质检完成时间",
              minWidth: "150",
              show: true,
            },
            {
              prop: "remark",
              label: "明细备注",
              minWidth: "",
              show: true,
            },
          ], //表头
          operates: [], //表格里面的操作按钮
          tableHeightDiff: 400,
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
              label: "质检结果",
              type: "radio",
              prop: "qualityCheckResult",
              child: [
                { value: "通过", key: 1 },
                { value: "不通过", key: 2 },
              ],
            },
          ],
          rules: {},
          value: {
            qualityCheckResult: 1,
          },
          requestData: {
            flage: "zjDetail",
            url: InBound.submitZJOrderDetailResult,
            fn: this.getTable,
          },
        },
      },
    };
  },
};
