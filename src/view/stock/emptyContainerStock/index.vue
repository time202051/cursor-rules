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
      @tableRowClassName='tableRowClassName'
      @SelectionChange="SelectionChange"
      @handleSizeChange="handleSizeChange"
      @handleindexChange="handleindexChange"
    >
    </MyTable>
    <dialogTemplate :form="form"> </dialogTemplate>
  </div>
</template>

<script>
import {
  warehouse,
  PublicAggregate,
  Point,
  Stock,
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
    };
  },
  methods: {
    getTable() {
      let timer = this.formSearchData.value.timer;
      this.formSearchData.value.BeginInTime = timer ? timer[0] : "";
      this.formSearchData.value.EndInTime = timer ? timer[1] : "";
      this.get({
        url: Stock.stockHistoryPages,
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
    tableRowClassName({row,index}) {
      if (row.pointEnabled===false) {
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
            // url: Point.station + "/" + data[0].id,
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

    //  启用/关闭点位
    enableOrDisable() {
      // let data = this.tableData.rows;
       let data = this.multipleSelection;
      var  arrIds=[];
      if(data&&data.length>0){
        data.forEach(el => {
           arrIds.push(el.pointId) 
        });
      }
      // if (data.length == 0 || data.length > 1)
      //   return this.$message.info("请选择一条数据");
      this.$confirm("此操作将变更点位状态, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.post({
            //  url:Point.changeEnable,
              data:arrIds,
             
          // url:Point.changeEnable+ "/" + data[0].pointId,
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
        // console.log(data)
    },


       //  exprot() {
    //   this.$message({
    //     type: "info",
    //     message: "上传信息",
    //   });
    // },

    
    // 导出按钮
    exprot() {
      let timer = this.formSearchData.value.timer;
      this.formSearchData.value.beginTime = timer ? timer[0] : "";
      this.formSearchData.value.endTime = timer ? timer[1] : "";
      this.post({
        url: Stock.exportStockHistory,
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
  },
};
</script>

<style lang="scss" scoped>
// ::v-deep .redrow{
//   background:#fde6e6 !important;
// }
</style>>

