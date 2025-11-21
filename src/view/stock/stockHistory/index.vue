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
  </div>
</template>

<script>
import { StockInfo,Product } from "@/api/request/swagger";
import minxin from "./index.js";
export default {
  // name: "stockHistoryManagement",
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
      this.formSearchData.value.StartTime = timer ? timer[0] : "";
      this.formSearchData.value.EndTime = timer ? timer[1] : "";
      this.get({
        url: StockInfo.stockhistorypages,
        isLoading:true,
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
     /**
       * 关键字下拉框方法  remoteMethod(val)
       */
      // 物料remoteMethod的方法，后续只需要更换url地址，如下标有变化，把下标[0]换成相对应的即可
      // remoteMethod(query) {
      //   this.formSearchData.tableSearch[0].loading = true;
      //   if (query !== "") {
      //     this.get({
      //       url: Product.productSelect,
      //       data: {
      //         productCode: query
      //       }
      //     }).then((res) => {
      //       this.formSearchData.tableSearch[0].loading = false;
      //       setTimeout(() => {
      //         this.formSearchData.tableSearch[0].children = res.result;
      //       }, 100);
      //     });
      //   } else {
      //     this.formSearchData.tableSearch[0].children = [];
      //   }
      // },

    SelectionChange(row) {
      this.multipleSelection = row;
    },
    handleSearch(from) {
      var self = this;
      self.formSearchData.value = { ...from };
      self.paginations.page = 1;
        this.getTable(console.log(111));
    },
    handleReset() {  for (let key in this.formSearchData.value) {
          this.formSearchData.value[key]= null
        }
        this.paginations.page = 1;},
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
   exprot() {
      let timer = this.formSearchData.value.timer;
      this.formSearchData.value.BeginInTime = timer ? timer[0] : "";
      this.formSearchData.value.EndInTime = timer ? timer[1] : "";
      this.post({
        url: StockInfo.exportStockHistory,
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

<style>
</style>
