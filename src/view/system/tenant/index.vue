<template>
  <div>
    <MyTable
      :paginations="paginations"
      :btnlist="btnlist"
      :emptyImg="tableData.emptyImg"
      :tableData="tableData"
      :multipleSelection="multipleSelection"
      @SelectionChange="SelectionChange"
    >
    </MyTable>
    <fromTemplate :form="form"></fromTemplate>
  </div>
</template>

<script>
import { Tenant } from "@/api/request/swagger";
import fromTemplate from "./from/index.vue";
export default {
  name: "tenantManagement",
  components: { fromTemplate },
  computed: {
    btnlist() {
      return this.hasBtn(this);
    },
  },
  mounted() {
    console.log(this.btnlist);
    this.getTable();
  },
  data() {
    return {
      input:'',
      multipleSelection: [],
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
            prop: "name",
            label: "租户名",
            minWidth: "",
            show: true,
          },
        ], //表头
        operates: [], //表格里面的操作按钮
        tableHeightDiff: 300,
      },
      paginations: {
        page: 1, //当前位于那页面
        total: 0, //总数
        limit: 20, //一页显示多少条
        pagetionShow: false,
      },
      form: {},
    };
  },
  methods: {
    getTable() {
      this.get({
        url: Tenant.all,
        data: {
          Page: this.paginations.page,
          MaxResultCount: this.paginations.limit,
        },
      }).then((res) => {
        this.tableData.rows = res.result;
        // this.paginations.total = res.result.totalCount;
        this.tableData.emptyImg = true;
      });
    },
    update() {
      let data = this.multipleSelection;
      if (data.length == 0 || data.length > 1)
        return this.$message.info("请选择一条数据");
      this.form = {
        dialogFormVisible: true,
        name: data[0].name,
        id: data[0].id,
        flage: "update",
        fn: this.getTable,
      };
    },
    create() {
      this.form = {
        dialogFormVisible: true,
        name: "",
        flage: "add",
        fn: this.getTable,
      };
    },
    delete() {
      let data = this.multipleSelection;
      if (data.length == 0 || data.length > 1)
        return this.$message.info("请选择一条数据");
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.del({
            url: Tenant.tenant + "/" + data[0].id,
          }).then((res) => {
            this.getTable();
            this.$message.success("删除成功");
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    SelectionChange(row) {
      this.multipleSelection = row;
    },
  },
};
</script>

<style>
</style>
