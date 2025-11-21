<template>
  <div>
    <el-dialog
      :title="form.title"
      :visible.sync="form.dialogFormVisible"
      :close-on-click-modal="false"
      v-el-drag-dialog
      :width="form.width || '45%'"
      :show-close="true"
      top="5vh"
      @close="resetForm('form')"
      @open="handleOpen('form')"
    >
      <el-form
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
            :disabled="item.disabled || false"
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
            :maxlength="item.length || ''"
          ></el-input>
          <el-switch
            v-if="item.type == 'switch'"
            class="switchStyle"
            active-text="启用"
            inactive-text="禁用"
            v-model="form.value[item.prop]"
          ></el-switch>
          <el-select
            v-if="item.type == 'select'"
            v-model="form.value[item.prop]"
            :placeholder="`请选择${item.placeholder || item.label}`"
            :clearable="'clearable' in item ? item.clearable : true"
            :disabled="item.disabled || false"
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
        <el-divider content-position="right">
          <span style="color: #1890ff">库位策略配置</span>
        </el-divider>
        <el-form-item label="固定容器类型" style="width: calc(100% / 3)">
          <el-select
            placeholder="请选择固定容器类型"
            clearable
            v-model="form.value.containerTypeId"
          >
            <el-option
              v-for="(jtem, jindex) in form.containerTypeList"
              :key="jindex"
              :label="jtem.value"
              :value="jtem.key"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="是否支持缠膜"
          style="width: calc(100% / 3); padding-left: 5%"
        >
          <el-switch
            v-model="form.value.allowBlendItem"
            class="switchStyle"
            active-text="启用"
            inactive-text="禁用"
          ></el-switch>
        </el-form-item>
        <el-form-item label="是否允许混放批次" style="width: calc(100% / 3)">
          <el-switch
            v-model="form.value.isMixingBatch"
            class="switchStyle"
            active-text="启用"
            inactive-text="禁用"
          ></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('form')">取 消</el-button>
        <el-button
          v-if="form.requestData.methodsType != 'get'"
          type="primary"
          @click="submitForm('form')"
          >确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "dialogTemplate",
  props: {
    form: Object,
  },
  computed: {
    width() {
      return function (item) {
        if (item.type != "textarea") {
          return "calc(100% / 3)";
        } else {
          return "100%";
        }
      };
    },
  },
  data() {
    return {};
  },
  methods: {
    selectChange(obj, val) {
      let temp = {
        obj: obj,
        val: val,
      };
      this.$emit("selectChange", temp);
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.form.requestData.flage == "update") {
            this.put({
              url: this.form.requestData.url + "/" + this.form.value.id,
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
          } else {
            /**
             * 弹框可能是get请求
             */
            if (
              this.form.requestData.methodsType &&
              this.form.requestData.methodsType == "get"
            ) {
              return this.get({
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
            }
            /**
             * 弹框可能是post请求
             * 默认
             */
            this.post({
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
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.form.dialogFormVisible = false;
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
// v-deep.el-dialog__close
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
</style>
