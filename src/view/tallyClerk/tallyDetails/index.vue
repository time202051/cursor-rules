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
      @tableRowClassName="tableRowClassName"
      @SelectionChange="SelectionChange"
      @handleSizeChange="handleSizeChange"
      @handleindexChange="handleindexChange"
    >
    </MyTable>
    <dialogTemplate
      ref="dialogTemplate"
      :form="form"
      @submitForm="submitForm"
      @resetForm="resetForm"
    >
    </dialogTemplate>
  </div>
</template>

<script>
import {
  warehouse,
  PublicAggregate,
  Point,
  Stock,
  Arrange,
} from "@/api/request/swagger";
import minxin from "./index.js";
export default {
  name: "stockManagement",
  mixins: [minxin],
  mounted() {
    this.getTable();
    // this.getSelect();
    // console.log(this.hasBtn(this));
  },
  data() {
    return {
      multipleSelection: [],
      timer: null, // 定时器
      // enabled:null
    };
  },

  methods: {
    getTable() {
      //   let timer = this.formSearchData.value.timer;
      //   this.formSearchData.value.BeginInTime = timer ? timer[0] : "";
      //   this.formSearchData.value.EndInTime = timer ? timer[1] : "";
      this.get({
        url: Arrange.arrangeStockPages,
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

    tableRowClassName({ row, index }) {
      if (row.pointEnabled === false) {
        return "redrow";
      }
    },
    getSelect() {
      //翻包工位下拉
      // this.get({
      //   url: Point.regionSelect,
      // }).then((res) => {
      //   this.Handle_Select({
      //     keyword: "StationId",
      //     handleData: this.formSearchData.tableSearch,
      //     list: res.result,
      //     config: { type: "inputType", prop: "prop", children: "children" },
      //   });
      // });
      //所属区域下拉
      this.get({
        url: warehouse.regionSelect,
      }).then((res) => {
        this.Handle_Select({
          keyword: "regionId",
          handleData: this.form.model,
          list: res.result,
          config: { type: "type", prop: "prop", children: "child" },
        });
      });
      //等级下拉
      //   this.get({
      //     url: PublicAggregate.rankSelect,
      //   }).then((res) => {
      //     this.Handle_Select({
      //       keyword: "rankId",
      //       handleData: this.form.model,
      //       list: res.result,
      //       config: { type: "type", prop: "prop", children: "child" },
      //     });
      //   });
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
    update() {
      let data = this.multipleSelection;
      if (data.length == 0 || data.length > 1)
        return this.$message.info("请选择一条数据");
      this.form.value = { ...data[0] };
      this.form.requestData.flage = "update";
      this.form.dialogFormVisible = true;
    },
    create() {
      this.form.dialogFormVisible = true;
      this.form.value = {
        stationCode: "",
        regionId: "",
        stationName: "",
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
            url: Point.station + "/" + data[0].id,
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

    // 一键理货 一进来先掉没有状态的开关接口，并给状态赋值
    keyTally() {
      this.form.requestData.flage = "autoArrange";
      this.post({
        url: Arrange.buttonStatus,
      }).then((res) => {
        this.form.dialogFormVisible = true;
        this.form.value.enabled = res.result;
      });
    },

    // 控制定时器任务
    
    gettimer() {
      // true======>
      // 修改开关状态后再调一次开关接口，并传参给后台
      this.post({
        url: Arrange.buttonStatus + "?isOn=" + this.form.value.enabled,
      }).then((res) => {
      // 如果开关是true执行定时器任务，每十分钟刷新一次接口
        if (this.form.value.enabled === true) {
          this.autoArrange();
          this.timer = setInterval(this.autoArrange, 30000);
        } else {
            // 如果是false则定时器销毁
            // debugger
          clearInterval(this.timer);
          this.timer = null;
        
        }
        this.form.dialogFormVisible = false;
        this.$refs.dialogTemplate.closeD();
      });
      // false======>
    },
    // 一键理货按钮接口
    autoArrange() {
      this.post({
        url: Arrange.autoArrange,
        isLoading: false,
      }).then((res) => {
        this.getTable();
      });
    },
    // 弹窗确定按钮
    submitForm() {
      this.gettimer();
    },

    // 弹窗取消按钮
    resetForm() {
      this.form.dialogFormVisible = false;
    },

    // // 开启/关闭一键理货
    // keyTally() {
    //   let data = this.multipleSelection;
    // //   if (data.length == 0 || data.length > 1)
    // //     return this.$message.info("请选择一条数据");
    //   this.$confirm("此操作将变更理货状态, 是否继续?", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning",
    //   })
    //     .then(() => {
    //       this.post({
    //         url: Arrange.autoArrange,
    //       }).then((res) => {
    //         this.getTable();
    //         this.$message.success("操作成功");
    //       });
    //     })
    //     .catch(() => {
    //       this.$message({
    //         type: "info",
    //         message: "已取消操作",
    //       });
    //     });
    //   // console.log(data)
    // },

    //  exprot() {
    //   this.$message({
    //     type: "info",
    //     message: "上传信息",
    //   });
    // },
    // 定时器销毁
    destroyed() {
      clearInterval(this.timer);
      this.timer = null;
      // console.log("xiaohui ");
    },

    // 导出按钮
    exprot() {
      // let timer = this.formSearchData.value.timer;
      // this.formSearchData.value.BeginInTime = timer ? timer[0] : "";
      // this.formSearchData.value.EndInTime = timer ? timer[1] : "";
      this.post({
        url: Stock.exportStock,
        isLoading: true,
        responseType: "blob",
        // data: Object.assign(this.formSearchData.value, {
        //   Page: this.paginations.page,
        //   MaxResultCount: this.paginations.limit,
        // }),
      }).then((res) => {
        this.fnexsl(res); //fnexsl封装的导出方法
      });
    },
  },
};
</script>

<style lang="scss" scoped>
// ::v-deep .redrow{
//   background:#fde6e6 !important;
// }
</style>>

