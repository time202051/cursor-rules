<template>
  <div>
    <el-dialog
      title="提示"
      :visible.sync="form.dialogFormVisible"
      :close-on-click-modal="false"
      v-el-drag-dialog
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="编码" prop="code">
          <el-input v-model="form.code"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="displayName">
          <el-input v-model="form.displayName"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
            <el-input type="textarea" v-model="form.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('form')">取 消</el-button>
        <el-button type="primary" @click="submitForm('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { PublicAggregate } from "@/api/request/swagger";
export default {
  props: {
    form: Object,
    fromObj: Object,
  },
  data() {
    return {
      rules: {
        code: [{ required: true, message: "必填", trigger: "blur" }],
        displayName: [{ required: true, message: "必填", trigger: "blur" }],
        // type: [{ required: true, message: "必填", trigger: "blur" }],
        // systemId: [{ required: true, message: "必填", trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let obj = {
            name: this.form.name,
            id: this.form.id,
          };
          if (this.form.flage == "update") {
            this.put({
              url: PublicAggregate.dataTemplate + "/" + this.form.id,
              data:  this.form,
            }).then((res) => {
              this.form.fn();
              this.form.dialogFormVisible = false;
            });
          } else {
            this.post({ url: PublicAggregate.dataTemplate, data:  this.form }).then((res) => {
              this.form.fn();
              this.form.dialogFormVisible = false;
            });
          }
          this.$message({
            type: "success",
            message: "操作成功!",
          });
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
  },
};
</script>

<style lang='scss'>
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
</style>