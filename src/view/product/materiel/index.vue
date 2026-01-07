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
      <template slot="packagingRate" slot-scope="scope">
        <span>{{ scope.row.packagingRate | formatNumberFilter }}</span>
      </template>
      <template slot="grossWeight" slot-scope="scope">
        <span>{{ scope.row.grossWeight | formatNumberFilter }}</span>
      </template>
      <template slot="netWeight" slot-scope="scope">
        <span>{{ scope.row.netWeight | formatNumberFilter }}</span>
      </template>
      <template slot="periodOfValidity" slot-scope="scope">
        <span>{{ scope.row.periodOfValidity | formatNumberFilter }}</span>
      </template>
      <template slot="volume" slot-scope="scope">
        <span>{{ scope.row.volume | formatNumberFilter }}</span>
      </template>
      <template slot="maxInventory" slot-scope="scope">
        <span>{{ scope.row.maxInventory | formatNumberFilter }}</span>
      </template>
      <template slot="secureInventory" slot-scope="scope">
        <span>{{ scope.row.secureInventory | formatNumberFilter }}</span>
      </template>
      <template slot="details" slot-scope="scope">
        <div style="color: #1682e6; cursor: pointer" @click="details(scope)">
          查看
        </div>
      </template>
    </MyTable>
    <createTemplate :form="form" ref="createTemplate"></createTemplate>
    <importExsl :importform="importform"> </importExsl>
     <detailsdialogTemplate
      ref="detailsdialogTemplate"
      :form="detailsform"
    ></detailsdialogTemplate>
  </div>
</template>

<script>
import { Product, Matter } from "@/api/request/swagger";
import createTemplate from "./from/create/index.vue";
import minxin from "./index.js";
import importExsl from "./from/importExsl/index.vue";
import detailsdialogTemplate from "./from/details/index.vue";
export default {
  name: "materielManagement",
  mixins: [minxin],
  mounted() {
    this.getTable();
    this.getSelect();

  },
  components: { importExsl, createTemplate,detailsdialogTemplate },
  data() {
    return {
      importform: {
        dialogFormVisible: false,
        url: Matter.importProduct,
      },
      multipleSelection: [],
    };
  },
  methods: {
    details(row) {
      this.detailsform.row = row.row;
      setTimeout(() => {
        this.$refs.detailsdialogTemplate.getTable();
        this.detailsform.dialogFormVisible = true;
      }, 10);
    },
    getTable() {
      let timer = this.formSearchData.value.timer;
      this.formSearchData.value.BeginTime = timer ? timer[0] : "";
      this.formSearchData.value.EndTime = timer ? timer[1] : "";
      this.get({
        url: Matter.getProductList,
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
      //零件分类下拉数据
      this.get({
        url: Matter.selectProductTypeList,
        isLoading: false,
      }).then((res) => {
        this.Handle_Select({
          keyword: "productClassId",
          handleData: this.form.model,
          list: res.result,
          config: { type: "type", prop: "prop", children: "child" },
        });
        this.Handle_Select({
          keyword: "ProductClassId",
          handleData: this.formSearchData.tableSearch,
          list: res.result,
          config: { type: "inputType", prop: "value", children: "children" },
        });
      });
      //基础单位下拉数据
      this.get({
        url: Matter.selectBasicUnitList,
        isLoading: false,
      }).then((res) => {
        this.Handle_Select({
          keyword: "basicUnitId",
          handleData: this.form.model,
          list: res.result,
          config: { type: "type", prop: "prop", children: "child" },
        });
        this.Handle_Select({
          keyword: "completeUnitId",
          handleData: this.form.model,
          list: res.result,
          config: { type: "type", prop: "prop", children: "child" },
        });
      });
      //货主选择下拉数据
      this.get({
        url: Matter.selectOwnerList,
        isLoading: false,
      }).then((res) => {
        this.form.ownerList = res.result;
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
      this.form.title = "编辑零件";
      this.get({
        url: Matter.getProductInfo + "/" + data[0].id,
      }).then((res) => {
        this.form.value = { ...res.result }; //赋返回值的所有
        this.form.value.productId = res.result.id;
        this.form.requestData.flage = "update";
        this.form.dialogFormVisible = true;
      });
    },
    // 创建
    create() {
      this.form.dialogFormVisible = true;
      this.form.requestData.flage = "add";
      this.form.title = "新增零件";
      this.form.value = {
        productCode: "", //零件编码
        productName: "", //零件名称
        productClassId: "", //零件分类
        basicUnitId: "", //基础单位
        packagingRate: 0, //包装率
        completeUnitId: "", //整件单位
        spec: "", //规格型号
        periodOfValidity: 0, //保质期
        productLevel: "", //ABC标识
        productType: "", //存货类别
        sequence: "", //出库策略
        volume: 0, //体积
        color: "", //颜色
        grossWeight: 0, //毛重
        netWeight: 0, //净重
        attribute:"",//零件属性
        isWrapFilm:false,//是否缠膜
        enabled: true, //状态
        remark: "", //备注
        ownerId: "", //货主选择
        isBatch: false, //批次管理
        isValidity: false, //效期管理
        isDisassemble: false, //拆零管理
        isSerial: false, //序列号管理
        isInspection: false, //质检信息
        packingCount: 0, //托包装数量
        isToOldKxZt:false,//是否送整托区
        emptyBoxNewToOldRegin:0,//是否送整托区
      };
      if (this.form.ownerList.length) {
        this.form.value.ownerId = this.form.ownerList[0].key;
      }
    },
    // 导出按钮
    export() {
      let timer = this.formSearchData.value.timer;
      this.formSearchData.value.BeginTime = timer ? timer[0] : "";
      this.formSearchData.value.EndTime = timer ? timer[1] : "";
      this.post({
        url: Matter.exportProduct,
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
    // 导入按钮
    importBtn() {
      // this.UploadFrom.url =
      //   window.global_config.baseURL + Point.importPointArea;
      this.importform.dialogFormVisible = true;
      this.getTable();
    },
    delete() {
      let data = this.multipleSelection;
      if (data.length != 1) return this.$message.info("请选择一条数据");
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.del({
            url: Product.product + "/" + data[0].id,
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
  },
};
</script>

<style></style>
