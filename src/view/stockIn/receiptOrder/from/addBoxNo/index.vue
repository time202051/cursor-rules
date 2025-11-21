<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      v-el-drag-dialog
      width="55%"
      :show-close="true"
      top="10vh"
      @close="resetForm"
      @open="handleOpen('form')"
    >
      <div style="position: relative">
        <el-form
          ref="form"
          :model="form"
          :rules="rules"
          label-width="130px"
          class="myform"
        >
          <el-form-item label="箱号" prop="boxCode">
            <el-input
              placeholder="请输入箱号"
              clearable
              v-model="form.boxCode"
            ></el-input>
          </el-form-item>
          <el-form-item label="箱数量" prop="boxQty">
            <el-input-number
              placeholder="请输入箱数量"
              :min="1"
              :precision="0"
              v-model="form.boxQty"
            ></el-input-number>
          </el-form-item>
        </el-form>
        <el-button type="primary" size="small" class="addbtn" @click="create"
          >添加</el-button
        >
      </div>
      <MyTable
        class="my-table"
        :paginations="{}"
        :btnlist="[]"
        :emptyImg="tableData.emptyImg"
        :tableData="tableData"
      >
      </MyTable>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import minxin from "./index.js";
export default {
  mixins: [minxin],
  methods: {
    //删除按钮
    delete(row, index) {
      this.tableData.rows.splice(index, 1);
    },
    //添加按钮
    create() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (
            this.tableData.rows.filter((item) => {
              return item.boxCode == this.form.boxCode;
            }).length
          ) {
            return this.$message.warning("该箱号已存在！");
          }
          this.tableData.rows.push({
            boxCode: this.form.boxCode,
            boxQty: this.form.boxQty,
          });
          this.form.boxCode = "";
          this.form.boxQty = undefined;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.form.resetFields();
      this.dialogFormVisible = false;
      this.$emit("boxNoRow",this.tableData.rows);
    },
    handleOpen(formName) {
      this.$nextTick(() => {
        this.$refs[formName].clearValidate();
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.myform {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
  width: 100%;
  .el-form-item {
    margin-bottom: 0;
    width: 40%;
  }
}
.addbtn {
  position: absolute;
  top: 0;
  right: 10px;
}
::v-deep .addbtn.el-button--small {
  padding: 9px 25px;
}
</style>
