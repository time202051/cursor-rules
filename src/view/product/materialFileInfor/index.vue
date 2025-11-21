<template>
  <div>
    <FormSearch
      :form-search-data="formSearchData"
      @handleSearch="handleSearch"
      @handleReset="handleReset"
    />
    <MyTable
      :paginations="paginations"
      :btnlist="this.hasBtn(this)"
      :emptyImg="tableData.emptyImg"
      :tableData="tableData"
      :multipleSelection="multipleSelection"
      @SelectionChange="SelectionChange"
      @handleSizeChange="handleSizeChange"
      @handleindexChange="handleindexChange"
    >
    </MyTable>
    <dialogTemplate :form="form"> </dialogTemplate>
    <SingleImageUpload :form="UploadFrom"> </SingleImageUpload>
    <importExsl :importform="importform"> </importExsl>
  </div>
</template>

<script>
import { warehouse, PublicAggregate, Point ,} from "@/api/request/swagger";
import minxin from "./index.js";
import importExsl from "./from/importExsl/index.vue"
export default {
  name: "pointManagement",
  mixins: [minxin],
  mounted() {
    // this.getTable();
    // this.getSelect();
    
  },
  components:{importExsl},
  data() {
    return {
      UploadFrom: {
        dialogFormVisible: false,
      },
      importform:{
         dialogFormVisible: false,
         url: Point.importPointArea
      },
      multipleSelection: [],
    };
  },
  methods: {
    getTable() {
      this.get({
        url: Point.pointPages,
        isLoading: true,
        data: Object.assign(this.formSearchData.value, {
          Page: this.paginations.page,
          MaxResultCount: this.paginations.limit,
        }),
      }).then((res) => {
        this.tableData.rows = res.result.items;
        this.paginations.total = res.result.totalCount;
        this.tableData.emptyImg = true;
      });
    },
    getSelect() {
      //创建所属区域下拉
      this.get({
        url: warehouse.regionSelect,
        isLoading: false,
      }).then((res) => {
        this.Handle_Select({
          keyword: "regionId",
          handleData: this.form.model,
          list: res.result,
          config: { type: "type", prop: "prop", children: "child" },
        });
      });
      //创建所属库区下拉
      this.get({
        url: warehouse.areaSelect,
        isLoading: false,
      }).then((res) => {
        this.Handle_Select({
          keyword: "areaId",
          handleData: this.form.model,
          list: res.result,
          config: { type: "type", prop: "prop", children: "child" },
        });
      });
      //所属工位下拉
      this.get({
        url: Point.stationSelect,
        isLoading: false,
      }).then((res) => {
        this.Handle_Select({
          keyword: "stationId",
          handleData: this.form.model,
          list: res.result,
          config: { type: "type", prop: "prop", children: "child" },
        });
        this.Handle_Select({
          keyword: "StationId",
          handleData: this.formSearchData.tableSearch,
          list: res.result,
          config: { type: "inputType", prop: "value", children: "children" },
        });
      });

          this.get({
        url: Point.stockOutStationSelect,
        isLoading: false,
      }).then((res) => {
        this.Handle_Select({
          keyword: "stockOutStationId",
          handleData: this.form.model,
          list: res.result,
          config: { type: "type", prop: "prop", children: "child" },
        });
        this.Handle_Select({
          keyword: "StockOutStationId",
          handleData: this.formSearchData.tableSearch,
          list: res.result,
          config: { type: "inputType", prop: "value", children: "children" },
        });
      });
                 //通道编码下拉
      this.get({
        url: Point.tunnelSelect,
        isLoading: false,
      }).then((res) => {
        this.Handle_Select({
          keyword: "tunnelId",
          handleData: this.form.model,
          list: res.result,
          config: { type: "type", prop: "prop", children: "child" },
        });
        this.Handle_Select({
          keyword: "tunnelId",
          handleData: this.formSearchData.tableSearch,
          list: res.result,
          config: { type: "inputType", prop: "value", children: "children" },
        });
      });
    },
    SelectionChange(row) {
      this.multipleSelection = row;
    },
    handleSearch(from) {
      var self = this;
      self.formSearchData.value = { ...from };
      self.paginations.page = 1;
      this.getTable();
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
    // 编辑
    update() {
      let data = this.multipleSelection;
      if (data.length == 0 || data.length > 1)
        return this.$message.info("请选择一条数据");
      this.form.value = { ...data[0] };
      this.form.requestData.flage = "update";
      this.form.dialogFormVisible = true;
    },
    // 创建
    create() {
      this.form.dialogFormVisible = true;
      this.form.requestData.flage = "add";
      this.form.value = {
        pointCode: "",
        pointName: "",
        regionId: "",
        stationId: "",
        tunnelId: "",
        stockOutStationId: "",
        PointSize: "",
        areaId: "", //所属库区
        x: "",
        y: "",
        ascription: "",
        inOut: "",
        remark: "",
        enabled: true,
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
            url: Point.point + "/" + data[0].id,
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
     // 导出按钮
    exprot() {
      // let timer = this.formSearchData.value.timer;
      // this.formSearchData.value.BeginInTime = timer ? timer[0] : "";
      // this.formSearchData.value.EndInTime = timer ? timer[1] : "";
      this.get({
        url: Point.exprotPick,
        isLoading: true,
        responseType: "blob",
        data: Object.assign(this.formSearchData.value, {
          Page: this.paginations.page,
          MaxResultCount: this.paginations.limit,
        }),
      }).then((res) => {
        this.fnexsl(res); //fnexsl封装的导出方法
      });
    },
    // exprot(){},
    // 导入按钮
    importArea() {
        //  this.$message({
        //     type: "info",
        //     message: "已取消操作",
        //   });
      // this.UploadFrom.url =
      //   window.global_config.baseURL + Point.importPointArea;
      this.importform.dialogFormVisible = true;
      this.importform.url=Point.importPoint

    },

    // 导入库区按钮
    importBtn() {
          
      // this.UploadFrom.url =
      //   window.global_config.baseURL + Point.importPointArea;
      this.importform.dialogFormVisible = true;
      this.importform.url=Point.importPointArea
      // this.UploadFrom.url = window.global_config.baseURL + Point.importPoint;
      // this.UploadFrom.dialogFormVisible = true;
      // this.form.UploadFrom.url = "";
        // this.$message({
        //     type: "info",
        //     message: "已取消操作",
        //   });

    
    },
  },
};
</script>

<style>
</style>
