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
      :empty-img="tableData.emptyImg"
      :table-data="tableData"
      :multiple-selection="multipleSelection"
      @SelectionChange="SelectionChange"
      @handleSizeChange="handleSizeChange"
      @handleindexChange="handleindexChange"
    >
      <template slot="details" slot-scope="scope">
        <div style="color: #1682e6; cursor: pointer" @click="details(scope)">
          查看
        </div>
      </template>
    </MyTable>
<!--    <div class="countAll">库存数量汇总: <span style="color: #ff0303;font-weight: bold;"> {{countAll}}</span></div>-->
    <detailsdialogTemplate
      ref="detailsdialogTemplate"
      :form="detailsform"
    ></detailsdialogTemplate>
  </div>
</template>

<script>
import { Reserve, Basic } from "@/api/request/swagger";
import minxin from "./index.js";
import detailsdialogTemplate from "./from/details/index.vue";
export default {
  name: "realTimeInventoryManagement",
  components: { detailsdialogTemplate },
  mixins: [minxin],
  data() {
    return {
      multipleSelection: [],
    };
  },
   computed: {
      countAll() {
        return this.tableData.rows.reduce((sum, item) => sum + item.totalQty, 0);
      }
  },
  mounted() {
    this.getTable();
    this.getSelect();
  },
  methods: {
    getTable() {
      this.get({
        url: Reserve.getRealTimeStockList,
        isLoading: true,
        data: Object.assign(this.formSearchData.value, {
          Page: this.paginations.page,
          MaxResultCount: this.paginations.limit,
          BeginTime: this.formSearchData.value.timer?.[0],
          EndTime: this.formSearchData.value.timer?.[1],
        }),
      }).then((res) => {
        this.tableData.rows = res.result.items;
        this.paginations.total = res.result.totalCount;
        this.tableData.emptyImg = true;
      });
    },
    getSelect() {
      // 仓库下拉数据
      this.get({
        url: Basic.selectWarehouseList,
      }).then((res) => {
        this.Handle_Select({
          keyword: "WarehouseId",
          handleData: this.formSearchData.tableSearch,
          list: res.result,
          config: { type: "inputType", prop: "value", children: "children" },
        });
      });
      // 区域下拉数据
      this.get({
        url: Basic.selectRegionList,
        isLoading: false,
      }).then((res) => {
        this.Handle_Select({
          keyword: "RegionId",
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
    // 详情页弹出层
    details(row) {
      this.detailsform.row = row.row;
      setTimeout(() => {
        this.$refs.detailsdialogTemplate.getTable();
        this.detailsform.outerVisible = true;
      }, 10);
    },
    // 库存冻结
    inventoryFreeze() {
      const data = this.multipleSelection;
      if (data.length == 0) return this.$message.info("请选择一条或多条数据");
      this.$confirm("此操作将冻结库存, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.post({
            url: Reserve.freezeStock,
            data: data.map((item) => item.stockId),
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
    // 取消冻结
    unfreeze() {
      const data = this.multipleSelection;
      if (data.length == 0) return this.$message.info("请选择一条或多条数据");
      // if(data.stockState !="冻结") return this.$message.info("库存状态非冻结状态,不可取消")
      this.$confirm("此操作将取消冻结库存, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.post({
            url: Reserve.unFreezeStock,
            data: data.map((item) => item.stockId),
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
    //隔离
    separate() {
      const data = this.multipleSelection;
      if (data.length == 0) return this.$message.info("请至少选择一条数据");
      this.$confirm("是否确认隔离?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.post({
            url: `${Reserve.handleVMIStock}?type=1`,
            data: data.map((item) => item.id),
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
    //放行
    pass() {
      const data = this.multipleSelection;
      if (data.length == 0) return this.$message.info("请至少选择一条数据");
      this.$confirm("是否确认放行?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.post({
            url: `${Reserve.handleVMIStock}?type=2`,
            data: data.map((item) => item.id),
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
    // 导出按钮
    export() {
      this.post({
        url: Reserve.exportRealTimeStock,
        isLoading: true,
        responseType: "blob",
        data: Object.assign(this.formSearchData.value, {
          Page: this.paginations.page,
          MaxResultCount: this.paginations.limit,
          BeginTime: this.formSearchData.value.timer?.[0],
          EndTime: this.formSearchData.value.timer?.[1],
        }),
      }).then((res) => {
        this.fnexsl(res); // fnexsl封装的导出方法
      });
    },
    exportPacking(){
      // 导出详情
      this.post({
        url: Reserve.exportstockpacking,
        isLoading: true,
        responseType: "blob",
        data: Object.assign(this.formSearchData.value, {
          Page: this.paginations.page,
          MaxResultCount: this.paginations.limit,
          BeginTime: this.formSearchData.value.timer?.[0],
          EndTime: this.formSearchData.value.timer?.[1],
        }),
      }).then((res) => {
        this.fnexsl(res); // fnexsl封装的导出方法
      });
    }
  },
};
</script>
<style>
.countAll{
    width: 200px;
    position: relative;
    top: -26px;
    left: 780px;
    font-size: 20px;
}

</style>
