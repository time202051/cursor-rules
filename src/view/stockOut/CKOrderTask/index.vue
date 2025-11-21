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
      <!-- <template slot="details" slot-scope="scope">
        <div style="color: #1682e6; cursor: pointer" @click="details(scope)">
          详情
        </div>
      </template> -->
    </MyTable>
    <!-- <div class="countAll">库存数量汇总: <span style="color: #ff0303;font-weight: bold;"> {{countAll}}</span></div> -->
    <detailsdialogTemplate
      ref="detailsdialogTemplate"
      :form="detailsform"
    ></detailsdialogTemplate>
  </div>
</template>

<script>
import { StockOut, Basic, } from "@/api/request/swagger";
import minxin from "./index.js";
import detailsdialogTemplate from "./from/details/index.vue";
import { get3to3Days } from '@/utils/getTime.js'
export default {
  name: "CKOrderTaskManagement",
  components: { detailsdialogTemplate },
  mixins: [minxin],
  data() {
    return {
      multipleSelection: [],
    };
  },
  //  computed: {
  //     countAll() {
  //       return this.tableData.rows.reduce((sum, item) => sum + item.totalQty, 0);
  //     }
  // },
  mounted() {
    this.formSearchData.value.timer = get3to3Days()

    this.getTable();
    this.getSelect();
  },
  methods: {
    getTable() {
        let timer = this.formSearchData.value.timer;
        this.formSearchData.value.BeginTime = timer ? timer[0] : "";
        this.formSearchData.value.EndTime = timer ? timer[1] : "";
      this.get({
        url: StockOut.stockOutAndPickInfo,
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
     handleReset(from) {
      from.timer = get3to3Days();
      this.formSearchData.value = { ...from }
    },
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
   
    // 导出按钮
    export() {
        let timer = this.formSearchData.value.timer;
        this.formSearchData.value.BeginTime = timer ? timer[0] : "";
        this.formSearchData.value.EndTime = timer ? timer[1] : "";
      this.post({
        url: StockOut.pickInfoExport,
        isLoading: true,
        responseType: "blob",
        data: Object.assign(this.formSearchData.value, {
          Page: this.paginations.page,
          MaxResultCount: this.paginations.limit
        }),
      }).then((res) => {
        this.fnexsl(res); // fnexsl封装的导出方法
      });
    },
  },
};
</script>
<style>

</style>
