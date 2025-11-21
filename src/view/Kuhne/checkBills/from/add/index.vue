<template>
    <div>
      <el-dialog
        :title="form.title || '提示'"
        :visible.sync="form.dialogFormVisible"
        :close-on-click-modal="false"
        v-el-drag-dialog
        :width="form.width || '45%'"
        :show-close="false"
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
              :placeholder=" item.readonly ? (item.placeholder || item.label) :(`请输入${item.placeholder || item.label}`)"
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

            <el-switch
              v-if="item.type == 'switch'"
              v-model="form.value[item.prop]"
            ></el-switch>

            <el-date-picker
              :type="item.props.type||'date'"
              placeholder="请选择日期"
              v-if="item.type == 'date'"
              v-model="form.value[item.prop]"
              v-bind="item.props || {}"
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
              :clearable="item.clearable || true"
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

            <div v-if="item.type == 'inputSpecial'">
              <el-col :span="6">
                <el-form-item :prop="item.layerprop">
                  <el-input
                    :clearable="item.clearable || true"
                    v-model="form.value[item.layerprop]"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col class="line" style="text-align: center" :span="3">-</el-col>
              <el-col :span="6">
                <el-form-item :prop="item.rowprop">
                  <el-input
                    :clearable="item.clearable || true"
                    v-model="form.value[item.rowprop]"
                  ></el-input
                ></el-form-item>
              </el-col>
              <el-col class="line" style="text-align: center" :span="3">-</el-col>
              <el-col :span="6"
                ><el-form-item :prop="item.columnprop">
                  <el-input
                    :clearable="item.clearable || true"
                    v-model="form.value[item.columnprop]"
                  ></el-input
                ></el-form-item>
              </el-col>
            </div>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="resetForm('form')">取 消</el-button>
          <el-button
            v-if="form.requestData.methodsType != 'get'"
            type="primary"
            @click="submitForm('form')"
          >确 定</el-button
          >
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
    computed: {
      width() {
        return function (item) {
          if (this.form.model.length > 10 && item.type != "textarea") {
            return "33%";
          } else if(this.form.model.length > 8 && this.form.model.length <= 10 && item.type != "textarea"){
             return "50%";
          }
          else {
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
            /**
             * 翻包工位配置 特殊处理业务
             */
            if (this.form.requestData.specialFn) {
              if (!this.form.value.businessType && !this.form.value.boxModel) {
                return this.$message.error("业务类型和空容器型号必填一个");
              }
            }
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
      closeD() {
        this.form.dialogFormVisible = false;
      },
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

  <style lang='scss'>
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
