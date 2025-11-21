<template>
  <div>
    <FormSearch :form-search-data="formSearchData" @handleSearch="handleSearch" @handleReset="handleReset" />
    <MyTable :paginations="paginations" :btnlist="this.hasBtn(this)" :emptyImg="tableData.emptyImg"
      :tableData="tableData" :multipleSelection="multipleSelection" @SelectionChange="SelectionChange"
      @handleSizeChange="handleSizeChange" @handleindexChange="handleindexChange">
      <template slot="details" slot-scope="scope">
        <div style="color: #1682e6;cursor: pointer;" @click="details(scope.row)">查看</div>
      </template>
    </MyTable>
    
    <createTemplate ref="createTemplate" @refresh="getTable()" ></createTemplate>
    <detailsDialog ref="detailsDialog"  ></detailsDialog>
  </div>
</template>
<script>
import { StockIn, warehouse, Product } from "@/api/request/swagger";
import minxin from "./index.js";
import createTemplate from "./from/create/index.vue"
import detailsDialog from "./from/details/index.vue"
export default {
  name:'geLiManagement',
  mixins: [minxin],
  components: { createTemplate,detailsDialog},
  mounted() {
    this.getTable();
    this.getSelect()
    // console.log(1)
  },
  data() {
    return {
      multipleSelection: [],
    };
  },
  methods: {
    getTable() {
      let timer = this.formSearchData.value.timer;
      this.formSearchData.value.startTime = timer ? timer[0] : "";
      this.formSearchData.value.endTime = timer ? timer[1] : "";
      this.post({
        url: warehouse.isolationInfo,
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
      //隔离单状态下拉框
      this.get({
        url: warehouse.isolationStatus,
      }).then((res) => {
        this.Handle_Select({
          keyword: "isolationStatus",
          handleData: this.formSearchData.tableSearch,
          list: res.result,
          config: {
            type: "inputType",
            prop: "value",
            children: "children"
          },
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
    handleReset() {
      for (let key in this.formSearchData.value) {
        this.formSearchData.value[key] = null
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

    details(row) {
        this.$refs.detailsDialog.isolationNo = row.isolationNo;
        this.$refs.detailsDialog.getTable()
        this.$refs.detailsDialog.innerVisible = true;
    },
 
    createBtn() {
        // this.$refs.createTemplate.getTab()
        this.$refs.createTemplate.getTable()
        this.$refs.createTemplate.innerVisible = true;
    },
    updateBtn() {
     
      return this.$message.info("功能确认中");

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
            min: 1
          },
        },
      ]
      this.form.value = {
        qty: data[0].qty ? data[0].qty : '',
        id: data[0].id
      };

      this.form.dialogFormVisible = true;
    },
    
      //取消
    cancelBtn() {
      let data = this.multipleSelection;
      if (data.length == 0 ) return this.$message.info("请至少选择一条数据");
      let PM = data.map(i=>({id: i.id}))
      this.$confirm("此操作将取消该隔离单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
          this.post({
            url: warehouse.isolationCancel,
            data: {
              isolationNos: this.multipleSelection.map(i=>i.isolationNo)
            }
          }).then((res) => {  
            this.getTable();
            this.$message.success("操作成功");
          });
        }).catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
    //任务下发
    taskBtn() {
      return this.$message.info("功能确认中");
      
      let data = this.multipleSelection;
      if (data.length == 0 ) return this.$message.info("请至少选择一条数据");
      let PM = data.map(i=>({id: i.id}))
      this.$confirm("此操作将手动下发该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
          this.post({
            url: StockIn.DiposeStockInAsync,
            data: PM
          }).then((res) => {  
            this.getTable();
            this.$message.success("操作成功");
          });
        }).catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
    exportBtn() {
      return this.$message.info("功能确认中");

      // 导出
      let timer = this.formSearchData.value.timer;
      this.formSearchData.value.BeginStockInTime = timer ? timer[0] : "";
      this.formSearchData.value.EndStockInTime = timer ? timer[1] : "";
      if (this.formSearchData.value.ProdcutCode) {
        this.formSearchData.value.ProdcutCodes = this.formSearchData.value.ProdcutCode.split(/[,，]/).map(code => code.trim()).filter(code => code.length > 0);
      } else {
        this.formSearchData.value.ProdcutCodes = []
      }
      this.post({
        url: StockIn.ExportStockInAsync,
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