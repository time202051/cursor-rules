<template>
  <div>
    <el-dialog
      :title="form.title || '提示'"
      :visible.sync="form.dialogFormVisible"
      :close-on-click-modal="false"
      v-el-drag-dialog
      :width="form.width || '45%'"
      top="8vh"
    >
      <el-tabs type="border-card">
        <el-tab-pane label="用户信息">
          <div class="treeClass">
            <el-form
              ref="form"
              :model="form.value"
              :rules="form.rules"
              label-width="110px"
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
                  :placeholder="`请输入${item.placeholder || item.label}`"
                  :clearable="item.clearable || true"
                ></el-input>
                <el-input
                  type="textarea"
                  v-if="item.type == 'textarea'"
                  :placeholder="`请输入${item.placeholder || item.label}`"
                  :clearable="item.clearable || true"
                  v-model="form.value[item.prop]"
                ></el-input>
                <TreeSelectfrom
                  v-if="item.type == 'treeSelect'"
                  clearable
                  v-model="form.value[item.prop]"
                  :options="item.child"
                  :props="item.props"
                  @getValue="getValue($event)"
                ></TreeSelectfrom>
                <el-switch
                  v-if="item.type == 'switch'"
                  v-model="form.value[item.prop]"
                ></el-switch>
                <el-date-picker
                  type="date"
                  placeholder="请选择日期"
                  v-if="item.type == 'date'"
                  v-model="form.value[item.prop]"
                  style="width: 100%"
                  :clearable="item.clearable || true"
                ></el-date-picker>
                <el-select
                  v-if="item.type == 'select'"
                  v-model="form.value[item.prop]"
                   :placeholder="`请选择${item.placeholder || item.label}`"
                  :clearable="item.clearable"
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
                  <el-col class="line" style="text-align: center" :span="3"
                    >-</el-col
                  >
                  <el-col :span="6">
                    <el-form-item :prop="item.rowprop">
                      <el-input
                        :clearable="item.clearable || true"
                        v-model="form.value[item.rowprop]"
                      ></el-input
                    ></el-form-item>
                  </el-col>
                  <el-col class="line" style="text-align: center" :span="3"
                    >-</el-col
                  >
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
          </div>
        </el-tab-pane>
        <el-tab-pane label="角色分配">
          <el-transfer
            class="treeClass"
            v-model="form.value.roleNames"
            :data="form.roleNameList"
            :titles="['可用角色', '已选角色']"
            :props="{
              key: 'name',
              label: 'name',
            }"
            @change="rightCheckChange"
          ></el-transfer>
        </el-tab-pane>
      </el-tabs>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('form')">取 消</el-button>
        <el-button type="primary" @click="submitForm('form')">确 定</el-button>
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
 *  tabsFormFlage:true,//标签页弹框标识
    model:[{
            label: "test",
            type: "input",
            prop: "code",
          }],//表单数据
    rules:[],//表单规则
    value:{},//双向绑定的值
    requestData:{},//接口地址及传参的数据
 */
import TreeSelectfrom from "./TreeSelect.vue";
export default {
  // name: "tabsDialog",
  props: {
    form: Object,
  },
  components: {
    TreeSelectfrom,
  },
  computed: {
    width() {
      return function (item) {
        if (this.form.model.length > 8 && item.type != "textarea") {
          return "50%";
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
    // 取值
    getValue(value) {
      this.form.value.organizationUntiId = value;
    },
    rightCheckChange(key, direction, list) {
      // if (direction == "right") {
      //   this.systemIds = key;
      // } else {
      //   this.systemIds = this.form.value.roleNames;
      // }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //翻包工位配置 特殊放出处理业务
          if (this.form.requestData.specialFn) {
            if (!this.form.value.businessType && !this.form.value.boxModel) {
              return this.$message.error("业务类型和空容器型号必填一个");
            }
          }
          if (this.form.requestData.flage == "update") {
            this.put({
              url: this.form.requestData.url + "/" + this.form.value.id,
              data: this.form.value,
            }).then((res) => {
              this.form.requestData.fn();
              this.form.dialogFormVisible = false;
              this.$message({
                type: "success",
                message: "操作成功!",
              });
            });
          } else {
            this.post({
              url: this.form.requestData.url,
              data: this.form.value,
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
          this.$message.error("可用角色 必填项不能为空!");
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.form.dialogFormVisible = false;
    },
  },
};
</script>

<style scoped lang='scss'>
.treeClass {
  height: 420px !important;
}
</style>
