export default {
  data() {
    return {
      formValue: {
        itemText: "",
      },
      rules: {
        itemText: [{ required: true, message: "必填", trigger: "blur" }],
      },
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
            prop: "itemValue",
            label: "代码",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "itemText",
            label: "名称",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "createdUser",
            label: "创建人",
            minWidth: "",
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
        ], //表头
        operates: [{ label: "删除", method: this.delete }], //表格里面的操作按钮
        tableHeightDiff: 500,
      },
      paginations: {
        page: 1, //当前位于那页面
        total: 10, //总数
        limit: 20, //一页显示多少条
        pagetionShow: true,
      },
    };
  },
};
