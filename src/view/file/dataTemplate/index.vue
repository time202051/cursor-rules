<template>
  <div>
    <FormSearch
      :form-search-data="formSearchData"
      @handleSearch="handleSearch"
      @handleReset="handleReset"
    />
    <MyTable
      :paginations="paginations"
      :btnlist="btnlist"
      :emptyImg="tableData.emptyImg"
      :tableData="tableData"
      :multipleSelection="multipleSelection"
      @SelectionChange="SelectionChange"
       @handleSizeChange="handleSizeChange"
      @handleindexChange="handleindexChange"
    >
    </MyTable>
    <fromTemplate :form="form"></fromTemplate>
       
  </div>
</template>

<script>
import { PublicAggregate } from "@/api/request/swagger";
import fromTemplate from "./from/index.vue";
export default {
  components: { fromTemplate ,},
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
      multipleSelection: [],
      form: {},
      // 查询表单
      formSearchData: {
        reset: true,
        expendShow: false,
        value: {
          code: null,
        },
        tableSearch: [
          {
            label: "编码",
            value: "code",
            inputType: "text",
          },
          //   {
          //     label: "工位编码",
          //     value: "PackingStationCod24e",
          //     inputType: "text",
          //   },
          //   {
          //     label: "工位名称",
          //     value: "PackingStationNa3me",
          //     inputType: "text",
          //   },
          //   {
          //     label: "所属区域",
          //     value: "1",
          //     type: "selectTEMP",
          //     children: [],
          //     tempBoxData: [],
          //     // 自定义指令
          //     loadmores: {
          //       fn: this.loadmoreGX,
          //       SELECTWRAP_DOM_index: 0,
          //       flage: "RegionId",
          //     },
          //   },
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
        columns: [
          {
            prop: "code",
            label: "编码",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "displayName",
            label: "描述",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "fileName",
            label: "文件名称",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "fileSize",
            label: "文件大小",
            minWidth: "",
            sortable: false,
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
      from: {},
    };
  },
  methods: {
    getTable() {
      this.get({
        url: PublicAggregate.dataTemplatePages,
        isLoading:true,
        data: {
          Page: this.paginations.page,
          MaxResultCount: this.paginations.limit,
          code:this.formSearchData.value.code
        },
      }).then((res) => {
        this.tableData.rows = res.result.items;
        this.paginations.total = res.result.totalCount;
        this.tableData.emptyImg = true;
      });
    },
    SelectionChange(row) {
      this.multipleSelection = row;
    },
    handleSearch(from) {
       var self = this;
      self.formSearchData.value = { ...from };
      self.paginations.page = 1;
      this.getTable()
    },
    handleReset() {},
     handleSizeChange(val) {
      this.paginations.page = 1;
      this.paginations.limit = val;
      this.getTable();
    },
    handleindexChange(val) {
      this.paginations.page = val;
      this.getTable();
    },
    update() {
       let data = this.multipleSelection;
      if (data.length == 0 || data.length > 1)
        return this.$message.info("请选择一条数据");
      this.form = {
        dialogFormVisible: true,
        code: data[0].code,
        displayName: data[0].displayName,
        remark: data[0].remark,
        id: data[0].id,
        flage: "update",
        fn: this.getTable,
      };
    },
    create() {
      this.form = {
        dialogFormVisible: true,
        code: "",
        displayName: "",
        remark: "",
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
            url: PublicAggregate.dataTemplate + "/" + data[0].id,
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
    upload() {
     this.$message({
            type: "info",
            message: "上传信息",
          });
    },
  },
};
</script>

<style>
</style>
