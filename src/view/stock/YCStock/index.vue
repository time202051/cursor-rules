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
    >>
    </MyTable>
    <dialogTemplate :form="form" @submitForm="submitForm" @resetForm="resetForm"></dialogTemplate>
    <importTemplate :importForm="importForm" :fileList="[]"></importTemplate>
  </div>
</template>

<script>
import {Product, StockInfo} from "@/api/request/swagger";
import minxin from "./index.js";
import  importTemplate from './import/index'
export default {
  // name: "YCStockManagement",
  mixins: [minxin],
  mounted() {
    this.getTable();
    // this.getSelect();
    // console.log(this.hasBtn(this));
  },
  components:{importTemplate},
  data() {
    return {
      multipleSelection: [],
      importForm:{
        dialogFormVisible:false,
      },
    };
  },
  methods: {
    getTable() {

       let timer = this.formSearchData.value.timer;
        this.formSearchData.value.StartTime = timer ? timer[0] : "";
        this.formSearchData.value.EndTime = timer ? timer[1] : "";
      this.get({
        url: StockInfo.ycStockpages,
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
    /**
     * 关键字下拉框方法  remoteMethod(val)
     */
    // 物料remoteMethod的方法，后续只需要更换url地址，如下标有变化，把下标[0]换成相对应的即可
    remoteMethod(query) {

      if (query !== "") {
        if(query.length<3)   return false
        this.formSearchData.tableSearch[0].loading = true;
        this.get({
          url: Product.productSelect,
          data: {
            productCode: query,
          },
        }).then((res) => {
          this.formSearchData.tableSearch[0].loading = false;
          let index = this.formSearchData.tableSearch[0].loadmores.SELECTWRAP_DOM_index
          this.formSearchData.tableSearch[0].tempBoxData = res.result;
          this.formSearchData.tableSearch[0].children = res.result.slice(index, index + 10);
        });
      } else {
        this.formSearchData.tableSearch[0].tempBoxData = [];
        this.formSearchData.tableSearch[0].children = [];
      }
    },
    /** 3. loadmoreGX() 滚动下拉方法
      *
      */
    loadmoreGX() {
  let obj = this.formSearchData.tableSearch[0];
  if (obj.loadmores.flage == "ProductId") {
    let addData = [];
    let index = obj.loadmores.SELECTWRAP_DOM_index;
    let data = obj.children;
    addData = obj.tempBoxData.slice(index, index + 10);
    this.formSearchData.tableSearch[0].children = data.concat(addData);
  }
},
    SelectionChange(row) {
      this.multipleSelection = row;
    },
    // 查询按钮
    handleSearch(from) {
      var self = this;
      self.formSearchData.value = {
        ...from,
      };
      self.paginations.page = 1;
      this.getTable(console.log(111));
    },
    // 重置按钮
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
    update() {
      let data = this.multipleSelection;
      if (data.length == 0 || data.length > 1)
        return this.$message.info("请选择一条数据");
      this.form.requestData.flage = "autoArrange";
      this.form.model = [
        {
          label: "数量",
          type: "number",
          prop: "qty",
          props: {
            precision: 0,
            min:1
          },
        },
      ]
      this.form.value = {
        qty: data[0].qty ? data[0].qty : '',
        id:data[0].id
      };

      this.form.dialogFormVisible = true;
    },
    submitForm(){
      this.put({
        url: this.form.requestData.url,
        data: this.form.value,
        isLoading: true,
      }).then((res) => {
        this.form.requestData.fn();
        this.form.dialogFormVisible = false;
        this.$message({
          type: "success",
          message: "操作成功!",
        });
      });
    },
    resetForm(){
      this.form.dialogFormVisible = false;
    },
    create() {
      this.form.dialogFormVisible = true;
      this.form.requestData.flage = "add";
      this.form.model = [

        {
          label: "物料编码",
          type: "input",
          prop: "productCode",
        },
        {
          label: "库位编码",
          type: "input",
          prop: "cargoLocationCode",
        },
        {
          label: "批次",
          type: "input",
          prop: "batchNo",
        },
        {
          label: "供应商",
          type: "input",
          prop: "supplierCode",
        },
        {
          label: "数量",
          type: "number",
          prop: "qty",
          props: {
            precision: 0,
            min:1
          },
        },
        {
          label: "生产日期",
          type: "input",
          prop: "productionTime",
        },
      ]
      this.form.value = {
        productCode: "",
        cargoLocationCode: "",
        batchNo: "",
        supplierCode: "",
        qty: '',
        productionTime: "",
      };
    },
    unlockstock() {
      let data = this.multipleSelection;
      if (data.length == 0)
        return this.$message.info("请选择数据");
      this.$confirm("是否解锁该库存?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
      .then(() => {
        this.post({
          url: StockInfo.unlockstock,
          data: data.map(item => item.id)
        }).then((res) => {
          this.getTable();
          this.$message.success('操作成功');
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
    exprot() {
      let timer = this.formSearchData.value.timer;
      this.formSearchData.value.BeginInTime = timer ? timer[0] : "";
      this.formSearchData.value.EndInTime = timer ? timer[1] : "";
      this.post({
        url: StockInfo.exportYCStock,
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
    delete() {
      let data = this.multipleSelection;
      if (data.length == 0 || data.length > 1)
        return this.$message.info("请选择一条数据");
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
      .then(() => {
        this.del({
          url:StockInfo.ycStock + "/" + data[0].id,
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
    import() {
      this.importForm.dialogFormVisible = true;
    },
  },
};
</script>
<style>
</style>
