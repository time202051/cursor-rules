<template>
  <div>
    <FormSearch
      :form-search-data="formSearchData"
      @handleSearch="handleSearch"
      @handleReset="handleReset"
    />
    <MyTable
      :paginations="paginations"
      :btnlist="hasBtns"
      :emptyImg="tableData.emptyImg"
      :tableData="tableData"
      :multipleSelection="multipleSelection"
      @SelectionChange="SelectionChange"
      @handleSizeChange="handleSizeChange"
      @handleindexChange="handleindexChange"
    >
      <template slot="details" slot-scope="scope">
        <div style="color: #1682e6; cursor: pointer" @click="details(scope)">
          查看
        </div>
      </template>
      <template slot="lack" slot-scope="scope">
        <span>{{ scope.row.lackStatusDesc }} </span>
        <el-tooltip
          effect="dark"
          :content="scope.row.remark"
          placement="top"
          v-if="scope.row.lackStatus"
        >
          <i
            class="el-icon-warning-outline"
            style="
              font-size: 16px;
              margin-left: 1px;
              position: relative;
              top: 1px;
            "
          ></i>
        </el-tooltip>
      </template>
    </MyTable>
    <detailsdialogTemplate
      ref="detailsdialogTemplate"
      :form="detailsform"
    ></detailsdialogTemplate>
    <dialogTemplate :form="adjustTimeForm"></dialogTemplate>
  </div>
</template>
<script>
import { Point, OutBound, warehouse } from "@/api/request/swagger";
import minxin from "./index.js";
import detailsdialogTemplate from "./from/details/index.vue";
export default {
  name: "pointManagement",
  mixins: [minxin],
  mounted() {
    this.getTable();
    // this.getSelect();
  },
  computed: {
    hasBtns() {
      let arr = this.hasBtn(this);
      return arr.filter((item) => {
        return (
          item.title == "波次分配" ||
          item.title == "任务下发" ||
          item.title == "调整备料时间"
        );
      });
    },
  },
  components: {
    detailsdialogTemplate,
  },
  data() {
    return {
      multipleSelection: [],
    };
  },
  methods: {
    getTable() {
      let timer = this.formSearchData.value.timer;
      this.formSearchData.value.BeginTime = timer ? timer[0] : "";
      this.formSearchData.value.EndTime = timer ? timer[1] : "";
      this.get({
        url: OutBound.getBCMsgList,
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
    details(row) {
      this.detailsform.row = row.row;
      this.$refs.detailsdialogTemplate.activeName = "order";
      this.detailsform.outerVisible = true;
      this.$nextTick((_) => {
        this.$refs.detailsdialogTemplate.getTable();
      });
    },
    //调整备料时间
    adjustTime() {
      let data = this.multipleSelection;
      if (data.length == 0 || data.length > 1)
        return this.$message.info("请选择一条数据");
      this.adjustTimeForm.dialogFormVisible = true;
      this.adjustTimeForm.value.planTime = "";
      this.adjustTimeForm.requestData.url = `${OutBound.adjustTimeBCMsg}/${data[0].id}`;
    },
    // 创建
    create() {
      this.form.dialogFormVisible = true;
      this.form.requestData.flage = "add";
      this.form.value = {
        pointCode: "",
        pointName: "",
        remark: "",
        test: "",
      };
    },
    productTypeEnumchange(val) {
      this.get({
        url: warehouse.regionSelect,
        isLoading: false,
      }).then((res) => {
        this.Handle_Select({
          keyword: "test",
          handleData: this.form.model,
          list: res.result,
          config: { type: "type", prop: "prop", children: "child" },
        });

        this.form.value.test = res.result[0].key;
      });
    },
    //调订单
    dOrder() {
      this.orderform.dialogFormVisible = true;
    },
    //波次发货
    BCGoos() {
      this.BCGoosform.dialogFormVisible = true;
    },
    //波次分配
    BCAllot() {
      let data = this.multipleSelection;
      if (data.length == 0 || data.length > 1)
        return this.$message.info("请选择一条数据");
      this.$confirm("是否波次分配?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.post({
            url: OutBound.allotBCMsg + "/" + data[0].id,
          }).then((res) => {
            this.getTable();
            this.$message.success("操作成功");
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作",
          });
        });
    },
    //任务下发
    taskDown() {
      this.$confirm("是否任务下发?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.post({
            url: OutBound.taskDownBCMsg,
          }).then((res) => {
            this.getTable();
            this.$message.success("操作成功");
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作",
          });
        });
    },
    //反分配
    reverseOrder() {
      let data = this.multipleSelection;
      if (data.length == 0 || data.length > 1)
        return this.$message.info("请选择一条数据");
      this.$confirm("是否反分配?", "提示", {
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
    // 波次关闭
    BCEnd() {
      let data = this.multipleSelection;
      if (data.length == 0 || data.length > 1)
        return this.$message.info("请选择一条数据");
      this.$confirm("是否波次关闭?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.del({
            url: Point.point + "/" + data[0].id,
          }).then((res) => {
            this.getTable();
            this.$message.success("分配成功");
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消分配",
          });
        });
    },
    // 波次删除
    BCDel() {
      let data = this.multipleSelection;
      if (data.length == 0 || data.length > 1)
        return this.$message.info("请选择一条数据");
      this.$confirm("是否波次删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.del({
            url: Point.point + "/" + data[0].id,
          }).then((res) => {
            this.getTable();
            this.$message.success("分配成功");
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消分配",
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
      this.importform.url = Point.importPoint;
    },
    // 导入库区按钮
    importBtn() {
      // this.UploadFrom.url =
      //   window.global_config.baseURL + Point.importPointArea;
      this.importform.dialogFormVisible = true;
      this.importform.url = Point.importPointArea;
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
<style></style>
