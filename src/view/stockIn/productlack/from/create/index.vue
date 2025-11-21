<template>
  <div>
    <el-dialog
      :title="form.title"
      top="3vh"
      width="90%"
      :visible.sync="form.outerVisible"
      @open="handleOpen('form')"
    >
      <!--  表单    -->
      <div class="formSearch">
        <el-form
          size="small"
          ref="form"
          :model="form.value"
          :rules="form.rules"
          label-width="130px"
          style="display: flex; flex-wrap: wrap"
        >
          <el-form-item
            v-for="(item, index) in form.model"
            :key="index"
            :label="item.label"
            :prop="item.prop"
            :required="item.required || false"
            :style="{ width: width(item) }"
          >
            <el-input
              v-if="item.type == 'input'"
              v-model="form.value[item.prop]"
              :placeholder="`请输入${item.label}`"
            ></el-input>
            <el-input
              v-if="item.type == 'textarea'"
              type="textarea"
              :placeholder="`请输入${item.label}`"
              v-model="form.value[item.prop]"
            ></el-input>
            <el-select
              v-if="item.type == 'select'"
              v-model="form.value[item.prop]"
              :placeholder="`请选择${item.label}`"
            >
              <el-option
                v-for="(jtem, jindex) in item.child"
                :key="jindex"
                :label="jtem.value"
                :value="jtem.key"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <el-divider content-position="left">
        <span style="color: #1890ff">可质检清单</span>
      </el-divider>
      <div>
        <!--  按钮  -->
        <div class="search">
          <el-input
            v-model="search"
            placeholder="输入编码、名称、批次号"
            clearable
          ></el-input>
        </div>
        <!--  表格  -->
        <MyTable
          :paginations="ZJorder.paginations"
          :btnlist="[]"
          :emptyImg="ZJorder.tableData.emptyImg"
          :tableData="ZJorder.tableData"
          :multipleSelection="ZJorder.multipleSelection"
          @SelectionChange="SelectionChange"
          @handleSizeChange="handleSizeChange"
          @handleindexChange="handleindexChange"
          class="zj-table"
        >
          <template slot="ways" slot-scope="scope">
            <el-select v-model="scope.row.way" class="special">
              <el-option label="全检" :value="0"></el-option>
              <el-option label="质检" :value="1"></el-option>
            </el-select>
          </template>
          <template slot="number" slot-scope="scope">
            <el-input-number
              v-model="scope.row.applyNum"
              :min="1"
              class="special"
            ></el-input-number>
          </template>
        </MyTable>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button  @click="onCancel">取消</el-button>
        <el-button type="primary" @click="onConfirm">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import index from "./index";
import { StockIn, warehouse, Product } from "@/api/request/swagger";
export default {
  mixins: [index],
  props: {
    form: Object,
  },
  computed: {
    width() {
      return function (item) {
        if (this.form.model.length > 0 && item.type != "textarea") {
          return "calc(100%/3)";
        } else {
          return "100%";
        }
      };
    },
  },
  data() {
    return {
      search: "",
    };
  },
  methods: {
    SelectionChange() {},
    handleSizeChange(val) {
      this.ZJorder.paginations.page = 1;
      this.ZJorder.paginations.limit = val;
      this.getTable();
    },
    handleindexChange(val) {
      this.ZJorder.paginations.page = val;
      this.getTable();
    },
    getTable() {
      this.ZJorder.tableData.rows = [
        {
          lineId: 1,
          productCode: "00123313",
          productName: "Haier 0020400331J Rev.A",
          unitCode: "ST",
          details: ["0001", "0002", "0003"],
          way: 0,
          applyNum: 1,
        },
        {
          lineId: 2,
          productCode: "0752503169",
          productName: "Midea 0020400331J Rev.A",
          unitCode: "ST",
          details: ["0004", "0008", "0009"],
          way: 1,
          applyNum: 1,
        },
      ];
    },
    //取消
    onCancel(){
      this.search = "";
      this.form.outerVisible = false;
      this.ZJorder.tableData.rows = [];
    },
    //确定
    onConfirm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.SHorder.tableData.rows.length == 0) {
            return this.$message.warning("当前未添加明细数据，无法提交");
          }
          if (this.SHorder.tableData.rows.some((item) => !item.productCode)) {
            return this.$message.warning("明细数据中零件编码存在未填");
          }
          if (this.form.requestData.flage == "update") {
            let dataLists = this.SHorder.tableData.rows.map((item) => {
              return {
                ownerCode: this.form.value.ownerCode, //货主编码
                orderBusinessType: this.form.value.orderBusinessType, //业务类型
                shipperName: this.companyName || this.form.value.companyName, //公司
                warehouseCode: this.form.value.warehouseCode, //仓库
                shipperCode: this.form.value.shipperCode, //供应商编码
                // shipName: this.form.value.shipName, //供应商名称
                remark: this.form.value.remark, //单据备注
                productCode: item.productCode, //零件编码
                productName: item.productName, //零件名称
                productBatch: item.productBatch, //零件批次
                unit: item.unit, //基本单位
                minPackageQty: item.minPackageQty, //包装比率
                completeUnit: item.completeUnit, //整件单位
                productionTime: item.productionTime, //收货日期
                expirationTime: item.expirationTime, //到货日期
                qty: item.qty, //申请数量
                detailRemark: item.detailRemark, //明细备注
                orginalBillNo: item.orginalBillNo, //来源单号
                stockInDetailId: item.id,
              };
            });
            this.put({
              url: StockIn.arrivalGoodsHandle + "/" + this.form.value.id,
              data: dataLists,
              isLoading: true,
            }).then((res) => {
              this.form.requestData.fn();
              this.form.outerVisible = false;
              this.$message({
                type: "success",
                message: "操作成功!",
              });
            });
          } else {
            let dataList = this.SHorder.tableData.rows.map((item) => {
              return {
                ...item,
                ...this.form.value,
                shipperName: this.companyName,
              };
            });
            this.post({
              url: StockIn.arrivalGoodsHandle,
              data: dataList,
              isLoading: true,
            }).then((res) => {
              this.form.requestData.fn();
              this.form.outerVisible = false;
              this.$message({
                type: "success",
                message: "操作成功!",
              });
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    remoteMethod(query) {
      if (query !== "") {
        if (query.length < 3) return false;
        this.SHorder.form.model[0].loading = true;
        this.SHorder.form.model[0].loadmores.SELECTWRAP_DOM_index = 0;
        this.get({
          url: Product.productSelect,
          data: {
            ProductCode: query,
          },
        }).then((res) => {
          this.SHorder.form.model[0].loading = false;
          let index = this.SHorder.form.model[0].loadmores.SELECTWRAP_DOM_index;
          this.SHorder.form.model[0].tempBoxData = res.result;
          this.SHorder.form.model[0].child = res.result.slice(
            index,
            index + 10
          );
        });
      } else {
        this.SHorder.form.model[0].tempBoxData = [];
        this.SHorder.form.model[0].child = [];
      }
    },
    /**
     *loadmoreGX() 滚动下拉方法
     */
    loadmoreGX() {
      let obj = this.SHorder.form.model[0];
      if (obj.loadmores.flage == "productCode") {
        let addData = [];
        let index = obj.loadmores.SELECTWRAP_DOM_index;
        let data = obj.child;
        addData = obj.tempBoxData.slice(index, index + 10);
        this.SHorder.form.model[0].child = data.concat(addData);
      }
    },
    handleOpen(formName) {
      this.$nextTick(() => {
        this.$refs[formName].clearValidate();
      });
    },
  },
};
</script>
<style lang="scss">
.zj-table .btnbox {
  display: none;
}
.zj-table .tablebox {
  margin-top: 0;
  padding: 0 0 10px;
}
</style>
<style lang="scss" scoped>
.formSearch {
  .el-form-item {
    margin-bottom: 8px;
  }
}
.search {
  box-sizing: border-box;
  margin-left: auto;
  margin-bottom: 12px;
  width: 350px;
}
::v-deep .el-divider--horizontal {
  margin: 12px 0;
}
.special {
  ::v-deep .el-input__inner {
    height: 28px;
    line-height:28px;
    margin: 1px 0;
  }
  ::v-deep .el-input-number__decrease,
  ::v-deep .el-input-number__increase {
    line-height: 26px;
    margin: 1px 0;
  }
}
</style>
