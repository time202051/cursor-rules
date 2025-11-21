export default {
  data() {
    return {
      title: "添加箱号",
      dialogFormVisible: false,
      multipleSelection: [],
      tableData: {
        loading: false,
        emptyImg: true,
        options: {
          selection: true, //多选框
          index: null, //序号
        }, //序号和复选框
        rows: [], //表数据
        columns: [
          {
            prop: "boxCode",
            label: "箱号",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "boxQty",
            label: "箱数量",
            minWidth: "",
            sortable: false,
            show: true,
          },
        ], //表头
        operates: [{ label: "删除", method: this.delete }], //表格里面的操作按钮
        tableHeightDiff: 500,
      },
      form: {
        boxCode: "",
        boxQty: undefined,
      },
      rules: {
        boxCode: [{ required: true, message: "必填", trigger: "blur" }],
        boxQty: [{ required: true, message: "必填", trigger: "blur" }],
      },
    };
  },
};
