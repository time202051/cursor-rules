<template>
  <div>
    <el-dialog
      :title="form.title"
      top="2vh"
      width="90%"
      :close-on-click-modal="false"
      :visible.sync="form.dialogFormVisible"
      @close="onClose"
    >
      <el-divider content-position="left" class="msg">
        <span style="color: #1890ff">单据信息</span>
      </el-divider>
      <!--  表单  -->
      <div class="formSearch">
        <el-form
          size="small"
          label-width="130px"
          style="display: flex; flex-wrap: wrap"
        >
          <el-form-item
            v-for="(item, index) in formSearchData.msg"
            :key="index"
            :label="item.label"
            :style="{ width: width(item) }"
          >
            <el-input
              v-if="item.inputType == 'input'"
              v-model="formSearchData.value[item.value]"
              :placeholder="`请输入${item.label}`"
              :clearable="item.clearable || true"
            ></el-input>
            <el-date-picker
              type="datetime"
              format="yyyy/MM/dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              :placeholder="`请选择${item.label}`"
              v-if="item.inputType == 'date'"
              v-model="formSearchData.value[item.value]"
              :clearable="item.clearable || true"
              style="width: 100%"
            ></el-date-picker>
            <el-select
              v-if="item.inputType == 'select'"
              v-model="formSearchData.value[item.value]"
              :placeholder="`请选择${item.label}`"
              :clearable="!item.clearable || false"
            >
              <el-option
                v-for="(jtem, jindex) in item.children"
                :key="jindex"
                :label="jtem.value"
                :value="jtem.key"
              ></el-option>
            </el-select>
            <el-input
              type="textarea"
              v-if="item.inputType == 'textarea'"
              :placeholder="`请输入${item.label}`"
              :autosize="item.autosize"
              :clearable="item.clearable || true"
              v-model="formSearchData.value[item.value]"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <el-divider content-position="left" class="detail">
        <span style="color: #1890ff">盘点清单明细</span>
      </el-divider>
      <div class="formSearch">
        <!--  表单  -->
        <el-form
          size="small"
          label-width="130px"
          style="display: flex; flex-wrap: wrap"
        >
          <el-form-item
            v-for="(item, index) in formSearchData.detail"
            :key="index"
            :label="item.label"
            style="width: 25%"
          >
            <el-input
              v-if="item.inputType == 'input'"
              v-model="formSearchData.value[item.value]"
              :placeholder="`请输入${item.label}`"
              :clearable="item.clearable || true"
            ></el-input>
            <el-select
              v-if="item.inputType == 'select'"
              v-model="formSearchData.value[item.value]"
              :placeholder="`请选择${item.label}`"
              :clearable="!item.clearable || false"
              :disabled="item.disabled"
            >
              <el-option
                v-for="(jtem, jindex) in item.children"
                :key="jindex"
                :label="jtem.value"
                :value="jtem.key"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <!--  按钮  -->
        <div class="obtain">
          <el-button type="primary" size="small" @click="getDifferentList"
            >获取</el-button
          >
        </div>
      </div>
      <MyTable
        :paginations="paginations"
        :btnlist="[]"
        :empty-img="tableData.emptyImg"
        :table-data="tableData"
        :multiple-selection="multipleSelection"
        @SelectionChange="SelectionChange"
        @handleSizeChange="handleSizeChange"
        @handleindexChange="handleindexChange"
        class="pd-table"
        ref="mytable"
      >
      </MyTable>
      <div slot="footer" class="dialog-footer">
        <el-button @click="onClose">取消</el-button>
        <el-button type="primary" @click="allZD">所有行制单</el-button>
        <el-button type="primary" @click="aloneZD">单页制单</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import index from "./index";
import { Basic, Inventory } from "@/api/request/swagger";
export default {
  mixins: [index],
  props: {
    form: Object,
  },
  mounted() {
    this.getSelect();
    this.formSearchData.value.iltType = this.SET_enumsSelect({
      keyword: "iltTypeEnum",
    }).filter((item) => {
      return item.value.includes("VMI");
    })?.[0].key;
  },
  data() {
    return {
      warehouseList: [], //仓库
      areaList: [], //库区
      regionList: [], //区域
      list: [], //所有数据
    };
  },
  computed: {
    width() {
      return function (item) {
        if (item.inputType != "textarea") {
          return "25%";
        } else {
          return "50%";
        }
      };
    },
  },
  methods: {
    SelectionChange(row) {
      this.multipleSelection = row;
    },
    handleSizeChange(val) {
      this.paginations.page = 1;
      this.paginations.limit = val;
      this.getTableList();
    },
    handleindexChange(val) {
      this.paginations.page = val;
      this.getTableList();
    },
    //获取按钮
    getDifferentList() {
      this.getTableList();
      this.getAllList();
    },
    getTableList() {
      this.getList({
        Page: this.paginations.page,
        MaxResultCount: this.paginations.limit,
        isLoading: true,
      }).then((res) => {
        this.tableData.rows = res.result.items;
        this.paginations.total = res.result.totalCount;
        this.tableData.rows.forEach((row) => {
          this.$nextTick(() => {
            this.$refs.mytable.$refs.tableRef.toggleRowSelection(row);
          });
        });
        this.multipleSelection = [...this.tableData.rows];
      });
    },
    getAllList() {
      this.getList({
        Page: 1,
        MaxResultCount: 9999,
        isLoading: false,
      }).then((res) => {
        this.list = res.result.items;
      });
    },
    getSelect() {
      // 仓库下拉数据
      this.get({
        url: Basic.selectWarehouseList,
      }).then((res) => {
        this.warehouseList = res.result;
        this.Handle_Select({
          keyword: "warehouseId",
          handleData: this.formSearchData.msg,
          list: res.result,
          config: { type: "inputType", prop: "value", children: "children" },
        });
        this.formSearchData.value.warehouseId = res.result?.[0]?.key;
      });
      //区域下拉数据
      this.get({
        url: Basic.selectRegionList,
      }).then((res) => {
        this.regionList = res.result;
        this.Handle_Select({
          keyword: "RegionId",
          handleData: this.formSearchData.detail,
          list: res.result,
          config: { type: "inputType", prop: "value", children: "children" },
        });
        this.formSearchData.value.RegionId = res.result.filter((item) => {
          return item.value.includes("立库");
        })?.[0].key;
      });
      //库区下拉数据
      // this.get({
      //   url: Basic.selectAreaList,
      // }).then((res) => {
      //   this.areaList = res.result;
      //   this.Handle_Select({
      //     keyword: "AreaId",
      //     handleData: this.formSearchData.detail,
      //     list: res.result,
      //     config: { type: "inputType", prop: "value", children: "children" },
      //   });
      //   this.formSearchData.value.AreaId = res.result?.[0]?.key;
      // });
    },
    //单页制单
    aloneZD() {
      if (!this.multipleSelection.length) {
        return this.$message.info("当前页至少选择一条数据！");
      }
      let arr = this.multipleSelection.map((item) => {
        return {
          productId: item.productId,
          ownerId: item.ownerId,
          productCode: item.productCode,
          productBatch: item.productBatch,
          supplierBatch: item.supplierBatch,
          receivingTime: item.receivingTime,
          referenceCode: item.referenceCode,
        };
      });
      this.ZD(arr).then((res) => {
        this.$message.success("操作成功");
        this.onClose();
        this.form.requestData.fn();
      });
    },
    //所有行制单
    allZD() {
      if (!this.list.length) {
        return this.$message.info("暂无数据无法进行制单！");
      }
      let arr = this.list.map((item) => {
        return {
          productId: item.productId,
          ownerId: item.ownerId,
          productCode: item.productCode,
          productBatch: item.productBatch,
          supplierBatch: item.supplierBatch,
          receivingTime: item.receivingTime,
          referenceCode: item.referenceCode,
        };
      });
      this.ZD(arr).then((res) => {
        this.$message.success("操作成功");
        this.onClose();
        this.form.requestData.fn();
      });
    },
    ZD(list) {
      let { warehouseId, planStartTime, planEndTime, iltType, remark } =
        this.formSearchData.value;
      return new Promise((resolve, reject) => {
        this.post({
          url: Inventory.handleInventPlanOrder,
          isLoading: true,
          data: {
            warehouseId,
            planStartTime,
            planEndTime,
            iltType,
            remark,
            details: list, //数组
          },
        })
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    getList(obj) {
      return new Promise((resolve, reject) => {
        let {
          warehouseId,
          RegionId,
          ProductLevel,
          ProductBatch,
          ProductCode,
          // AreaId,
          ProductType,
          SupplierBatch,
        } = this.formSearchData.value;
        this.get({
          url: Inventory.getInventoryStockList,
          data: {
            WahoureId: warehouseId,
            RegionId,
            ProductLevel,
            ProductBatch,
            ProductCode,
            // AreaId,
            ProductType,
            SupplierBatch,
            Page: obj.Page,
            MaxResultCount: obj.MaxResultCount,
          },
          isLoading: obj.isLoading,
        })
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    onClose() {
      this.form.dialogFormVisible = false;
      this.tableData.rows = [];
      this.list = [];
      this.multipleSelection = [];
      this.formSearchData.value = {
        warehouseId: null,
        planStartTime: null,
        planEndTime: null,
        iltType: null,
        remark: null,
        RegionId: null,
        ProductLevel: null,
        ProductBatch: null,
        ProductCode: null,
        // AreaId: null,
        ProductType: null,
        SupplierBatch: null,
      };
      this.formSearchData.value.warehouseId = this.warehouseList?.[0]?.key;
      this.formSearchData.value.iltType = this.SET_enumsSelect({
        keyword: "iltTypeEnum",
      }).filter((item) => {
        return item.value.includes("VMI");
      })?.[0].key;
      this.formSearchData.value.RegionId = this.regionList?.filter((item) => {
          return item.value.includes("立库");
        })?.[0].key;;
      // this.formSearchData.value.AreaId = this.areaList?.[0]?.key;
    },
  },
};
</script>
<style lang="scss">
.pd-table .btnbox {
  display: none;
}
.pd-table .tablebox {
  margin-top: 0;
  padding: 12px 0 10px;
}
</style>
<style lang="scss" scoped>
::v-deep .el-dialog__body {
  padding: 30px 20px 0;
}
.formSearch {
  margin-top: 13px;
  position: relative;
  ::v-deep .el-form-item--small.el-form-item {
    margin-bottom: 8px;
  }
}
::v-deep .msg.el-divider--horizontal {
  margin-top: 0;
  margin-bottom: 20px;
}
::v-deep .detail.el-divider--horizontal {
  margin-top: 12px;
  margin-bottom: 0;
}
/**获取按钮 */
.obtain {
  position: absolute;
  right: 0;
  bottom: 8px;
  ::v-deep .el-button--small {
    padding: 9px 25px;
  }
}
</style>
