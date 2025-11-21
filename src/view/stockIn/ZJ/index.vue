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
      <template slot="details" slot-scope="scope">
        <div style="color: #1682e6; cursor: pointer" @click="details(scope)">
          详情
        </div>
      </template>
    </MyTable>
    <detailsdialogTemplate
      ref="detailsdialogTemplate"
      :form="detailsform"
    ></detailsdialogTemplate>
    <createTemplate ref="createTemplate" :form="createform"></createTemplate>
  </div>
</template>
<script>
import { InBound, Basic, Matter } from "@/api/request/swagger";
import detailsdialogTemplate from "./from/details/index.vue";
import createTemplate from "./from/create/index.vue";
import minxin from "./index.js";
export default {
  name:'ZJManagement',
  mixins: [minxin],
  components: { detailsdialogTemplate, createTemplate },
  mounted() {
    this.getTable();
    this.getSelect();
  },
  data() {
    return {
      multipleSelection: [],
      warehouseList: [], //仓库
      ownerList: [], //货主
    };
  },
  methods: {
    getTable() {
      let timer = this.formSearchData.value.timer;
      this.formSearchData.value.BeginTime = timer ? timer[0] : "";
      this.formSearchData.value.EndTime = timer ? timer[1] : "";
      this.get({
        url: InBound.getZJOrderList,
        isLoading: true,
        data: Object.assign(this.formSearchData.value, {
          Page: this.paginations.page,
          MaxResultCount: this.paginations.limit,
        }),
      }).then((res) => {
        this.tableData.rows = res.result.items;
        this.paginations.total = res.result.totalCount; //是否传了分页
        this.tableData.emptyImg = true;
      });
    },
    getSelect() {
      //仓库的下拉数据
      this.get({
        url: Basic.selectWarehouseList,
      }).then((res) => {
        this.warehouseList = res.result;
        this.Handle_Select({
          keyword: "warehouseCode",
          handleData: this.createform.model,
          list: res.result,
          config: {
            type: "type",
            prop: "prop",
            children: "child",
          },
        });
      });
      //货主的下拉数据
      this.get({
        url: Matter.selectOwnerList,
      }).then((res) => {
        this.ownerList = res.result;
        this.Handle_Select({
          keyword: "ownerCode",
          handleData: this.createform.model,
          list: res.result,
          config: {
            type: "type",
            prop: "prop",
            children: "child",
          },
        });
      });
    },
    // 详情页弹出层
    details(row) {
      this.detailsform.row = row.row;
      setTimeout(() => {
        this.$refs.detailsdialogTemplate.getTable();
        this.detailsform.outerVisible = true;
      }, 10);
    },
    make() {
      let value = this.createform.value;
      this.createform.title = "质检制单";
      this.createform.requestData.flage = "add";
      this.createform.outerVisible = true;
      value.warehouseCode = this.warehouseList?.[0]?.key;
      value.ownerCode = this.ownerList?.[0]?.key;
      value.remark = "";
      this.$refs.createTemplate.getTable();
    },
    update() {},
    delete() {},
    SelectionChange(row) {
      this.multipleSelection = row;
    },
    handleSearch(from) {
      var self = this;
      self.formSearchData.value = { ...from };
      self.paginations.page = 1;
      this.getTable();
    },
    handleReset() {
      for (let key in this.formSearchData.value) {
        this.formSearchData.value[key] = null;
      }
      this.paginations.page = 1;
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
    //任务下达按钮
    task() {
      const data = this.multipleSelection;
      if (data.length == 0) {
        return this.$message.info("请至少选择一条数据");
      }
      if (
        data.filter((item) => {
          return item.qualityCheckState != 0;
        }).length
      ) {
        return this.$message.warning("只能任务下发质检状态是待确认的单据！");
      }
      this.$confirm("此操作将下发数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.post({
            url: InBound.taskXFZJOrder,
            data: {
              ids: data.map((item) => {
                return item.id;
              }),
            },
          }).then((res) => {
            this.getTable();
            this.$message.success("操作成功");
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消任务下发",
          });
        });
    },
    export() {
      let timer = this.formSearchData.value.timer;
      this.formSearchData.value.BeginTime = timer ? timer[0] : "";
      this.formSearchData.value.EndTime = timer ? timer[1] : "";
      this.post({
        url: InBound.exportMPDetail,
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
<style></style>
