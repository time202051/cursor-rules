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
          :style="{ width: item.type == 'textarea' ? '100%' : '25%' }"
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
          <span style="color: #1890ff">零件策略配置</span>
        </el-divider>
        <el-form-item label="货主选择" style="width: 25%" prop="ownerId">
          <el-select
            placeholder="请选择货主"
            clearable
            v-model="form.value.ownerId"
          >
            <el-option
              v-for="(jtem, jindex) in form.ownerList"
              :key="jindex"
              :label="jtem.value"
              :value="jtem.key"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="批次管理" style="width: 25%">
          <el-select
            placeholder="请选择批次管理"
            clearable
            v-model="form.value.isBatch"
          >
            <el-option label="是" :value="true"></el-option>
            <el-option label="否" :value="false"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="效期管理" style="width: 25%">
          <el-select
            placeholder="请选择效期管理"
            clearable
            v-model="form.value.isValidity"
          >
            <el-option label="是" :value="true"></el-option>
            <el-option label="否" :value="false"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="拆零管理" style="width: 25%">
          <el-select
            placeholder="请选择拆零管理"
            clearable
            v-model="form.value.isDisassemble"
          >
            <el-option label="是" :value="true"></el-option>
            <el-option label="否" :value="false"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="序列号管理" style="width: 25%">
          <el-select
            placeholder="请选择序列号管理"
            clearable
            v-model="form.value.isSerial"
          >
            <el-option label="是" :value="true"></el-option>
            <el-option label="否" :value="false"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="质检信息" style="width: 25%">
          <el-select
            placeholder="请选择质检信息"
            clearable
            v-model="form.value.isInspection"
          >
            <el-option label="免检" :value="true"></el-option>
            <el-option label="待检" :value="false"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="箱SNP" style="width: 25%">
          <el-input-number
            v-model="form.value.packingCount"
            placeholder="请输入箱SNP"
            :min="0"
            :precision="0"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="是否送整托区" style="width: 25%">
          <el-select
            placeholder="请选择"
            clearable
            v-model="form.value.emptyBoxNewToOldRegin"
          >
            <el-option label="接驳区" :value="0"></el-option>
            <el-option label="整托一区" :value="1"></el-option>
            <el-option label="整托二区" :value="2"></el-option>
            <el-option label="整托三区" :value="3"></el-option>
          </el-select>
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
/**
 * 参数
 *  dialogFormVisible:false,//弹窗显示
 *  title:'',//标题
 *  width:'',//弹窗宽度
 model:[{
 label: "test",
 type: "input",
 prop: "code",
 }],//表单数据
 rules:[],//表单规则
 value:{},//双向绑定的值
 requestData:{},//接口地址及传参的数据
 */
export default {
  name: "dialogTemplate",
  props: {
    form: Object,
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
             * flage == "autoArrange"
             * 弹框方法不用内部  用外部方法
             */
            if (this.form.requestData.flage == "autoArrange") {
              return this.$emit("submitForm", "form");
            }
            /**
             * 默认请求地址
             */
            let url = this.form.requestData.url;
            /**
             * task 页面路径名字
             * 特殊页面   弹框标识 flages 参数接在url 后面
             */
            if (this.form.requestData.flages) {
              url =
                this.form.requestData.url +
                "?taskCode=" +
                this.form.value.taskCode +
                "&method=" +
                this.form.value.method;
            }
            /**
             * 弹框可能是get请求
             */
            if (
              this.form.requestData.methodsType &&
              this.form.requestData.methodsType == "get"
            ) {
              return this.get({
                url: url,
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
              url: url,
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
    closeD(formName) {
      this.form.dialogFormVisible = false;
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
