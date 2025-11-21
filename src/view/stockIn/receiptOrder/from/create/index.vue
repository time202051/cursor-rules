<template>
  <div>
    <el-dialog
      :title="title"
      top="5vh"
      width="85%"
      :visible.sync="dialogFormVisible"
      @open="handleOpen"
    >
      <!--  表单    -->
      <div class="formSearch">
        <el-form
          size="small"
          ref="form"
          :model="form"
          :rules="rules"
          label-width="130px"
          style="display: flex; flex-wrap: wrap"
        >
          <el-form-item
            v-for="(item, index) in model"
            :key="index"
            :label="item.label"
            :prop="item.prop"
            :required="item.required || false"
            :style="{ width: width(item) }"
          >
            <el-input
              v-if="item.type == 'input'"
              v-model="form[item.prop]"
              :placeholder="`请输入${item.label}`"
              :clearable="item.clearable || true"
              @input="item.input"
            ></el-input>
            <el-input
              type="textarea"
              v-if="item.type == 'textarea'"
              :placeholder="`请输入${item.label}`"
              :autosize="item.autosize"
              :clearable="item.clearable || true"
              v-model="form[item.prop]"
            ></el-input>
            <el-select
              v-if="item.type == 'select'"
              v-model="form[item.prop]"
              :placeholder="`请选择${item.label}`"
              :clearable="item.clearable || true"
              :disabled="item.disabled || false"
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
        <span style="color: #1890ff">到货明细信息</span>
      </el-divider>
      <div>
        <!--  按钮  -->
        <div class="btns">
          <el-button type="primary" size="mini" @click="addBoxNo"
            >添加箱号</el-button
          >
          <el-button type="primary" size="mini" @click="add">增行</el-button>
          <el-button type="primary" size="mini" @click="edit">编辑行</el-button>
          <el-button type="primary" size="mini" @click="remove">删行</el-button>
          <!-- <el-button type="primary" size="mini" @click="importBtn"
            >导入</el-button
          > -->
        </div>
        <!--  表格  -->
        <MyTable
          :paginations="paginations"
          :btnlist="[]"
          :emptyImg="tableData.emptyImg"
          :tableData="tableData"
          :multipleSelection="multipleSelection"
          @SelectionChange="SelectionChange"
        >
          <template slot="isNoStock" slot-scope="scope">
            <div>{{ scope.row.isNoStock ? "是" : "否" }}</div>
          </template>
        </MyTable>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onConfirm">确定 </el-button>
      </div>
    </el-dialog>
    <!--新增行-->
    <rowTemplate @addRow="addRow" ref="rowTemplate"></rowTemplate>
    <!--导入-->
    <importExsl :importform="importform"> </importExsl>
    <!--添加箱号-->
    <addBoxNo @boxNoRow="addBoxNoRow" ref="addBoxNoTemplate"></addBoxNo>
  </div>
</template>

<script>
import index from "./index";
import moment from "moment";
import { InBound, Basic } from "@/api/request/swagger";
import common from "@/utils/common.js";
import rowTemplate from "../row/index.vue";
import importExsl from "../importExsl/index.vue";
import addBoxNo from "../addBoxNo/index.vue";
export default {
  mixins: [index],
  components: { rowTemplate, importExsl, addBoxNo },
  computed: {
    width() {
      return function (item) {
        if (item.type != "textarea") {
          return "25%";
        } else {
          return "100%";
        }
      };
    },
  },
  data() {
    return {
      importform: {
        dialogFormVisible: false,
        url: "",
      },
      warehouseList: [],
      companyList: [],
      flage: "add",
    };
  },
  mounted() {
    this.getSelect();
  },
  methods: {
    getSelect() {
      //公司的下拉数据
      this.get({
        url: Basic.selectCompanyList,
      }).then((res) => {
        this.companyList = res.result;
        this.Handle_Select({
          keyword: "orgId",
          handleData: this.model,
          list: res.result,
          config: {
            type: "type",
            prop: "prop",
            children: "child",
          },
        });
      });
      //仓库的下拉数据
      this.get({
        url: Basic.selectWarehouseList,
      }).then((res) => {
        this.warehouseList = res.result;
        this.Handle_Select({
          keyword: "warehouseId",
          handleData: this.model,
          list: res.result,
          config: {
            type: "type",
            prop: "prop",
            children: "child",
          },
        });
      });
      //业务类型的下拉数据
      this.get({
        url: InBound.getSingleEnumList,
        data: {
          key: "StockInBusinessTypeEnum",
        },
      }).then((res) => {
        this.Handle_Select({
          keyword: "stockInTaskTypeEnum",
          handleData: this.model,
          list: res.result,
          config: {
            type: "type",
            prop: "prop",
            children: "child",
          },
        });
      });
    },
    supplierCodeInput: common.debounce(function (e) {
      if (!e.trim()) {
        return;
      } else {
        this.getSupplierName(e);
      }
    }, 1000),
    getSupplierName(params) {
      this.get({
        url: InBound.getSupplierName,
        isLoading: true,
        data: {
          supplierCode: params,
        },
      }).then((res) => {
        this.form.supplierName = res.result;
      });
    },
    SelectionChange(val) {
      this.multipleSelection = val;
    },
    //添加箱号按钮
    addBoxNo() {
      let data = this.multipleSelection;
      if (data.length == 0 || data.length > 1) {
        return this.$message.info("请选择一条数据");
      }
      this.index = data[0]["index"];
      this.$refs.addBoxNoTemplate.tableData.rows =
        this.tableData.rows[this.index].boxInfos || [];
      this.$refs.addBoxNoTemplate.dialogFormVisible = true;
    },
    //增行按钮
    add() {
      this.flage = "add";
      this.$refs.rowTemplate.dialogFormVisible = true;
      this.$refs.rowTemplate.model[0].child = [];
      this.$refs.rowTemplate.model[0].tempBoxData = [];
      this.$refs.rowTemplate.form = {
        productCode: null,
        productName: null,
        productBatch: null,
        supplierBatch: null,
        receivingTime: moment().format("YYYY-MM-DD"), //收货日期
        referenceCode: null,
        regionId: this.$refs.rowTemplate.regionList?.[0].key,
        regionName: this.$refs.rowTemplate.regionList?.[0].value,
        ownerId: null,
        ownerName: null,
        subTrayCode: null,
        quality: null,
        isNoStock: false,
        remark: null,
      };
    },
    //编辑按钮
    edit() {
      let data = this.multipleSelection;
      if (data.length == 0 || data.length > 1) {
        return this.$message.info("请选择一条数据");
      }
      this.flage = "edit";
      this.$refs.rowTemplate.dialogFormVisible = true;
      this.$refs.rowTemplate.form = { ...data[0] };
      this.$refs.rowTemplate.model[0].child = [
        {
          key: data[0].productCode,
          keyValue: `${data[0].productCode}(${data[0].productName})`,
        },
      ];
    },
    //删行按钮
    remove() {
      if (this.multipleSelection.length == 0) {
        return this.$message.info("请至少选择一条数据");
      }
      this.tableData.rows = this.tableData.rows.filter((item) => {
        return !this.multipleSelection
          .map((it) => it.index)
          .includes(item.index);
      });
    },
    //导入
    importBtn() {
      this.importform.dialogFormVisible = true;
    },
    //表格增加、编辑一行数据
    addRow(params) {
      if (this.flage == "add") {
        this.tableData.rows.push(params);
      } else {
        this.$set(this.tableData.rows, params.index, params);
      }
    },
    //表格中某一条增加箱号
    addBoxNoRow(params) {
      this.tableData.rows[this.index]["boxInfos"] = params;
    },
    //确定
    onConfirm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.tableData.rows.length == 0) {
            return this.$message.warning("当前未添加明细数据，无法提交");
          }
          if (this.tableData.rows.some((item) => !item.boxInfos)) {
            return this.$message.warning("明细数据中箱号存在未填");
          }
          let details = this.tableData.rows.map((item) => {
            return {
              ownerId: item.ownerId,
              productCode: item.productCode,
              productName: item.productName,
              productBatch: item.productBatch,
              supplierBatch: item.supplierBatch,
              receivingTime: item.receivingTime,
              referenceCode: item.referenceCode,
              regionId: item.regionId,
              boxInfos: item.boxInfos,
              subTrayCode: item.subTrayCode,
              quality: item.quality,
              isNoStock: item.isNoStock,
              remark: item.remark,
            };
          });
          let dataList = {
            orgId: this.form.orgId,
            warehouseId: this.form.warehouseId,
            stockInTaskTypeEnum: this.form.stockInTaskTypeEnum,
            supplierCode: this.form.supplierCode,
            supplierName: this.form.supplierName,
            remark: this.form.remark,
            details: details,
          };
          this.post({
            url: InBound.addSHOrder,
            data: dataList,
            isLoading: true,
          }).then((res) => {
            this.$parent.getTable();
            this.dialogFormVisible = false;
            this.$message({
              type: "success",
              message: "操作成功!",
            });
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    tableCellClassName({ row, column, rowIndex, columnIndex }) {
      row.index = rowIndex;
      column.index = columnIndex;
    },
    handleOpen() {
      this.$nextTick(() => {
        this.$refs.form.clearValidate();
      });
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep .btnbox {
  display: none;
}
::v-deep .tablebox {
  margin-top: 0;
  padding: 0;
}
.formSearch {
  .el-form-item {
    margin-bottom: 16px;
  }
}
::v-deep .el-divider--horizontal {
  margin: 8px 0;
}
.btns {
  margin: 15px 0;
  text-align: right;
}
::v-deep .el-dialog__footer {
  padding-top: 15px;
  padding-bottom: 25px;
}
::v-deep .el-dialog__body {
  padding-bottom: 0;
}
::v-deep .pagebox {
  margin: 0;
}
</style>
