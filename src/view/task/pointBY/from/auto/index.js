export default {
  data() {
    return {
      tableData: {
        loading: false,
        emptyImg: true,
        options: {
          selection: true, // 多选框
          index: true, // 序号
          headTool: false, // 开启头部工具栏
          refreshBtn: false, // 开启表格头部刷新按钮
          downloadBtn: false, // 开启表格头部下载按钮
        }, // 序号和复选框
        rows: [], // 表数据
        columns: [
          {
            prop: "lineCode",
            label: "产线编号",
            minWidth: "",
            sortable: false,
            show: true,
          },
        ], // 表头
        operates: [
          { label: "上移", size: "medium", method: this.moveUp },
          { label: "下移", size: "medium", method: this.moveDown },
        ], // 表格里面的操作按钮
        tableHeightDiff: 550,
      },
      canProductLineForm: {
        productLine: "",
      },
      rules: {
        productLine: [{ required: true, message: "必填", trigger: "blur" }],
      },
    };
  },
};
