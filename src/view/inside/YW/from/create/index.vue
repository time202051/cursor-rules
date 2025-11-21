<template>
  <div>
    <el-dialog
      :title="form.title || '详情'"
      top="5vh"
      width="90%"
      :visible.sync="form.outerVisible"
      @close="closeD"
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
              :placeholder="
                item.readonly
                  ? item.placeholder || item.label
                  : `请输入${item.placeholder || item.label}`
              "
              :clearable="item.clearable || true"
              :readonly="item.readonly || false"
            ></el-input>
            <el-input-number
              v-if="item.type == 'number'"
              v-model="form.value[item.prop]"
              :placeholder="`请输入${item.placeholder || item.label}`"
              :clearable="item.clearable || true"
              :readonly="item.readonly || false"
              :min="item.props.min || 0"
              v-bind="item.props || {}"
            ></el-input-number>
            <el-input
              type="textarea"
              v-if="item.type == 'textarea'"
              :placeholder="`请输入${item.placeholder || item.label}`"
              :autosize="item.autosize"
              :clearable="item.clearable || true"
              v-model="form.value[item.prop]"
            ></el-input>
            <!-- <el-switch
              class="tableScopeSwitch"
              v-if="item.type == 'switch'"
              active-text="整盘"
              inactive-text="整托"
              v-model="form.value[item.prop]"
            ></el-switch> -->
            <el-checkbox
              v-if="item.type == 'checkbox'"
              v-model="form.value[item.prop]"
              >整盘/整托移动</el-checkbox
            >
            <el-date-picker
              type="date"
              placeholder="请选择日期"
              v-if="item.type == 'date'"
              v-model="form.value[item.prop]"
              style="width: 100%"
              :clearable="item.clearable || true"
            ></el-date-picker>
            <Tree-select
              v-if="item.type == 'treeSelect'"
              v-model="form.value[item.prop]"
              v-bind="item.props || {}"
              :options="item.child"
              @getValue="item.change && item.change(form.value[item.prop])"
            />
            <el-select
              v-if="item.type == 'select'"
              v-model="form.value[item.prop]"
              :placeholder="`请选择${item.placeholder || item.label}`"
              :clearable="'clearable' in item ? item.clearable : true"
              @change="
                item.change
                  ? item.change(form.value[item.prop])
                  : selectChange(item, form.value[item.prop])
              "
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
        <span style="color: #1890ff">移位明细信息</span>
      </el-divider>
      <!--  表格  -->
      <div>
        <!--  按钮  -->
        <!-- <div style="padding: 5px; box-sizing: border-box">
          <el-button type="primary" size="mini" icon="el-icon-plus"></el-button>
        </div>
       -->
        <div class="rQcode">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="审批人">
              <el-input
                v-if="form.value.stockRemove != 2"
                v-model="formInline.code"
                :placeholder="
                  form.value.stockRemoveType == 0
                    ? '请输入容器编码/原库位编码'
                    : '请输入容器编码'
                "
                @keyup.enter.native="onSubmit"
                class="code"
              ></el-input>
              <div v-if="form.value.stockRemove == 2" style="display: flex">
                <el-input
                  v-model="formInline.containerCode"
                  placeholder="请输入空托盘编码"
                ></el-input>
                <el-input
                  style="margin-left: 10px"
                  v-model="formInline.num"
                  placeholder="请输入数量"
                  class="inputNumber"
                  @keyup.native="
                    formInline.num = test(formInline.num) ? formInline.num : ''
                  "
                ></el-input>
              </div>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">添加</el-button>
              <el-button type="primary" @click="delempty">清除</el-button>
            </el-form-item>
          </el-form>
        </div>
        <!--  表格  -->
        <!-- {{ options }} -->
        <div class="tablebox">
          <el-table
            border
            :data="BCorder.tableData.rows"
            style="width: 100%"
            ref="tableRef"
            height="400"
            @selection-change="SelectionChange"
          >
            <template v-for="item in BCorder.tableData.columns">
              <el-table-column
                :key="item.prop"
                :label="item.label"
                :fixed="item.fixed || false"
                :width="item.width"
                :prop="item.prop"
                :min-width="item.minWidth || '150px'"
                :show-overflow-tooltip="item.overHidden==undefined? true: false"
                :sortable="item.sortable || false"
                :type="item.type || 'normal'"
              >
                <template v-if="item.columnType == 'autocomplete'">
                  <el-select
                    v-model="BCorder.tableData.rows[item.prop]"
                    filterable
                    remote
                    clearable
                    reserve-keyword
                    placeholder="请输入关键词"
                    :remote-method="remoteMethod"
                    :loading="loading"
                  >
                    <el-option
                      v-for="(items, indexs) in options"
                      :key="indexs"
                      :label="items.name"
                      :value="items.code"
                    >
                    </el-option>
                  </el-select>
                </template>
                <template v-if="item.columnType == 'input'">
                  <el-input
                    size="mini"
                    v-model="BCorder.tableData.rows[item.prop]"
                    :placeholder="'请输入' + item.label"
                  ></el-input>
                </template>
                <!-- <template v-if="item.columnType == 'date'">
                  <el-date-picker
                    size="mini"
                    style="width: 100%"
                    v-model="BCorder.tableData.rows[item.prop]"
                    type="date"
                    placeholder="选择日期"
                  >
                  </el-date-picker>
                </template>
                <template v-if="item.columnType == 'number'">
                  <el-input-number
                    size="mini"
                    v-model="BCorder.tableData.rows[item.prop]"
                    :min="1"
                    :placeholder="'请输入' + item.label"
                  ></el-input-number>
                </template> -->
              </el-table-column>
            </template>
            <div slot="empty" class="empty">
              <img
                src="@/assets/logo/nodata.jpg"
                v-if="BCorder.tableData.rows.length == 0"
              />
            </div>
          </el-table>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onConfirm" :disabled="isDisabled"
          >确定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import index from "./index";
import { StockIn, warehouse, Stock } from "@/api/request/swagger";

export default {
  mixins: [index],
  props: {
    form: Object,
  },
  computed: {
    width() {
      return function (item) {
        if (this.form.model.length > 0 && item.type != "textarea") {
          return "25%";
        } else {
          return "100%";
        }
      };
    },
  },
  watch: {
    "BCorder.tableData.rows": {
      handler(newVal, oldVal) {
        if (this.BCorder.tableData.rows.length) {
          this.isDisabled = false;
        } else {
          this.isDisabled = true;
        }
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {},
  data() {
    return {
      formInline: {},
      innerVisible: false,
      multipleSelection: [],
      options: [],
      loading: false,
      list: [
        {
          code: "code001",
          id: "code001",
          name: "长宁区新渔路144号",
          jbdw: "基本单位",
          wuliaopici: "批次",
          bzbl: "包装比率",
          zjdw: "整件单位",
          bzq: "180",
          lydh: "123123",
        },
        {
          code: "998",
          id: "998",
          name: "长宁区新渔路154号",
          jbdw: "基本单位16",
          wuliaopici: "批次15",
          bzbl: "包装比率14",
          zjdw: "整件单位13",
          bzq: "18012",
          lydh: "123123321",
        },
      ],
      isDisabled: false,
    };
  },
  methods: {
    closeD() {
      this.formInline = {};
      this.BCorder.tableData.rows = [];
    },
    //校验空容器移位，数量输入框只能输入正整数
    test(num){
      num = num.toString()
      var reg = /^((?!0)\d{1,9})$/
      if (!num.match(reg)) {
        return false
      } else {
        return true
      }
    },
    //清除
    delempty() {
      let data = this.multipleSelection;
      if (data.length == 0) return this.$message.info("请选择一条数据");
      this.BCorder.tableData.rows = this.BCorder.tableData.rows.filter(
        (item) => {
          return !data
            .map((item) => item.containerCode)
            .includes(item.containerCode);
        }
      );
      this.formInline = {};
    },
    //确认
    onConfirm() {
      let dataList = this.BCorder.tableData.rows.map((item) => {
        return {
          ...item,
          stockRemoveDetail: 0, //明细状态
          RemoveNo: this.form.value.pointCode, //移位单号
          Remark: this.form.value.remark, //备注
          stockRemoveType: this.form.value.stockRemoveType, //移位类型
          stockRemove: this.form.value.stockRemove, //作业类型
        };
      });
      this.post({
        url: Stock.confirmStockRemove,
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
    },
    //添加
    onSubmit() {
      if (
        this.form.value.stockRemove == 1 ||
        this.form.value.stockRemove == 3
      ) {
        if (!this.formInline.code) {
          if (this.form.value.stockRemoveType == 0) {
            return this.$message.warning("请输入容器编码或原库位编码");
          } else {
            return this.$message.warning("请输入容器编码");
          }
        }
        this.get({
          url: Stock.stockRemove,
          data: {
            code: this.formInline.code,
            stockRemoveType: this.form.value.stockRemoveType,
            stockRemove: this.form.value.stockRemove,
          },
          isLoading: true,
        }).then((res) => {
          if (res.result.items.length) {
            res.result.items = res.result.items.map((item) => {
              return {
                ...item,
                warehouseName: item.warehouse,
                desRegionName: item.desRegion,
                regionName: item.region,
              };
            });
          }
          if (res.result.items.length && this.BCorder.tableData.rows.length) {
            if (
              this.BCorder.tableData.rows.filter((item) => {
                return item.containerCode == res.result.items[0].containerCode;
              }).length
            ) {
              res.result.items = [];
            }
          }
          this.BCorder.tableData.rows = [
            ...res.result.items,
            ...this.BCorder.tableData.rows,
          ];
          this.BCorder.paginations.total = res.result.totalCount;
        });
      } else if (this.form.value.stockRemove == 2) {
        //空容器移位
        if (
          !this.formInline.containerCode ||
          isNaN(parseFloat(this.formInline.num))
        ) {
          return this.$message.warning("请输入空托盘编码和数量");
        }
        this.get({
          url: Stock.stockEmptyRemove,
          data: {
            containerCode: this.formInline.containerCode,
            num: this.formInline.num,
            stockRemove: this.form.value.stockRemoveType,
          },
          isLoading: true,
        }).then((res) => {
          if (res.result.items.length) {
            res.result.items = res.result.items.map((item) => {
              return {
                ...item,
                warehouseName: item.warehouse,
                desRegionName: item.desRegion,
                regionName: item.region,
              };
            });
          }
          if (res.result.items.length && this.BCorder.tableData.rows.length) {
            if (
              this.BCorder.tableData.rows.filter((item) => {
                return item.containerCode == res.result.items[0].containerCode;
              }).length
            ) {
              res.result.items = [];
            }
          }
          this.BCorder.tableData.rows = [
            ...res.result.items,
            ...this.BCorder.tableData.rows,
          ];
          this.BCorder.paginations.total = res.result.totalCount;
        });
      }
    },
    getTable() {
      this.get({
        url: StockIn.bindcontainerinfo,
        data: {
          OrginalBillNo: this.form.row.orginalBillNo,
          ContainerCode: this.form.row.containerCode,
          Page: this.BCorder.paginations.page,
          MaxResultCount: this.BCorder.paginations.limit,
        },
        isLoading: true,
      }).then((res) => {
        this.BCorder.tableData.rows = res.result.items;
        this.BCorder.paginations.total = res.result.totalCount;
      });
    },
    selectChange(obj, val) {
      this.BCorder.tableData.rows = [];
      this.formInline = {};
    },
    getSelect() {
      this.get({
        url: warehouse.regionSelect,
      }).then((res) => {
        this.Handle_Select({
          keyword: "RegionId",
          handleData: this.formSearchData.tableSearch,
          list: res.result,
          config: {
            type: "inputType",
            prop: "value",
            children: "children",
          },
        });
        // let index = this.formSearchData.tableSearch[3].loadmores.SELECTWRAP_DOM_index
        // this.formSearchData.tableSearch[3].children = res.result.slice(index, index + 10);
      });
    },
    remoteMethod(query) {
      if (query !== "") {
        this.loading = true;
        let arr = this.list.filter((item) => {
          return item.code.indexOf(query) > -1;
        });
        let _that = this;
        _that.$nextTick(() => {
          _that.$set(_that, "options", arr);
        });
        _that.loading = false;
      } else {
        this.options = [];
      }
    },
    handleSelect(item) {
      console.log(item);
    },
    handleReset() {},
    handleSearch() {},
    SelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      this.BCorder.paginations.page = 1;
      this.BCorder.paginations.limit = val;
      this.getTable();
    },
    handleindexChange(val) {
      this.BCorder.paginations.page = val;
      this.getTable();
    },
    submitForm() {},
    resetForm(formName) {
      if (this.form.requestData.flage == "autoArrange") {
        return this.$emit("resetForm");
      }
      this.$refs[formName].resetFields();
      this.form.dialogFormVisible = false;
    },
  },
};
</script>
<style lang="scss" scoped>
/*在谷歌下移除input[number]的上下箭头*/
::v-deep .inputNumber input::-webkit-outer-spin-button,
::v-deep .inputNumber input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
  margin: 0;
}
/*在谷歌下移除input[number]的上下箭头*/
::v-deep .inputNumber input {
  -moz-appearance: textfield;
}
.code {
  ::v-deep .el-input__inner {
    width: 240px !important;
  }
}

::v-deep .el-dialog__body {
  padding: 10px !important;
}

::v-deep .el-tabs--border-card > .el-tabs__content {
  padding: 0px 0px 0px 0px !important;
}

.el-dialog__header {
  background-color: #4a77ac;
  padding: 10px;
  // padding-bottom: none;
  .el-dialog__title,
  .el-dialog__headerbtn i {
    color: white;
  }
}

.el-select,
.el-input-number {
  width: 100% !important;
}

.activeWidth {
  width: 50% !important;
}

.tablebox {
  //margin-top: 10px;
  //padding: 10px;
  box-sizing: border-box;
}

::v-deep .el-table {
  td {
    padding: 2px;

    div {
      line-height: 28px;
      font-size: 12px;
    }
  }

  th {
    padding: 0px;
    background: #f5f7fa;
    // background-color: #F2F2F2;
    div {
      line-height: 28px;
      font-weight: 400;
      // color: #606266;
      color: #333;
      font-size: 12px;
    }
  }
}
::v-deep .el-switch__label {
  position: absolute !important;
  display: none;
  color: #fff;
}
::v-deep .el-switch__label--right {
  z-index: 1;
  right: 20px;
  color: #fff;
  font-size: 12px;
}
::v-deep .el-switch__label--left {
  z-index: 1;
  right: 0px;
  color: #fff;
  font-size: 12px;
}
::v-deep .el-switch__label.is-active {
  display: block;
}
::v-deep .el-switch .el-switch__core,
.el-switch .el-switch__label {
  width: 60px !important;
}
::v-deep .el-table .cell {
  //padding-left: 0px
}

.formSearch {
  .el-form-item {
    margin-bottom: 15px;
  }
}

.tableScopeSwitch .el-switch__label {
  position: absolute;
  display: none;
  color: #fff;
}
/*打开时文字位置设置*/
.tableScopeSwitch .el-switch__label--right {
  z-index: 1;
  right: 6px; /*不同场景下可能不同，自行调整*/
}
/*关闭时文字位置设置*/
.tableScopeSwitch .el-switch__label--left {
  z-index: 1;
  left: 6px; /*不同场景下可能不同，自行调整*/
}
/*显示文字*/
.tableScopeSwitch .el-switch__label.is-active {
  display: block;
}
.tableScopeSwitch.el-switch .el-switch__core,
.el-switch .el-switch__label {
  width: 75px !important; /*开关按钮的宽度大小*/
}
::v-deep.rQcode {
  display: flex;
  justify-content: end;
  .el-form-item__label {
    display: none;
  }
  .el-input__inner {
    width: 200px;
  }
}
</style>
