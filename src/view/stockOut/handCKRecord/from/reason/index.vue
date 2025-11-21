<template>
  <div>
    <el-dialog
      :title="form.title"
      :visible.sync="form.dialogFormVisible"
      :close-on-click-modal="false"
      v-el-drag-dialog
      width="55%"
      :show-close="true"
      top="10vh"
      @close="resetForm('form')"
    >
      <el-form
        ref="form"
        :model="formValue"
        :rules="rules"
        label-width="130px"
        style="display: flex; flex-wrap: wrap; margin-bottom: 20px"
      >
        <div class="row">
          <el-form-item label="原因名称" prop="itemText">
            <el-input
              placeholder="请输入原因名称"
              clearable
              v-model="formValue.itemText"
            ></el-input>
          </el-form-item>
          <el-button type="primary" size="small" class="addbtn" @click="addBox"
            >添加</el-button>
            <el-button type="primary" size="small" class="addbtn" @click="exportData"
            >导出</el-button>
        </div>
      </el-form>
      <MyTable
        class="my-table"
        :paginations="paginations"
        :btnlist="[]"
        :emptyImg="tableData.emptyImg"
        :tableData="tableData"
        @handleSizeChange="handleSizeChange"
        @handleindexChange="handleindexChange"
      >
      </MyTable>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('form')">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { OutBound } from "@/api/request/swagger";
import minxin from "./index.js";
export default {
  name: "reasonSetting",
  mixins: [minxin],
  props: {
    form: Object,
  },
  methods: {
    handleSizeChange(val) {
      this.paginations.page = 1;
      this.paginations.limit = val;
      this.getTable();
    },
    handleindexChange(val) {
      this.paginations.page = val;
      this.getTable();
    },
    delete(row) {
      this.del({
        url: OutBound.deleteReason + "/" + row.id,
      }).then((res) => {
        this.getTable();
        this.$message.success("删除成功");
      });
    },
    getTable() {
      this.get({
        url: OutBound.getReasonList,
        isLoading: true,
        data: {
          Page: this.paginations.page,
          MaxResultCount: this.paginations.limit,
        },
      }).then((res) => {
        this.tableData.rows = res.result.items;
        this.paginations.total = res.result.totalCount;
        this.tableData.emptyImg = true;
      });
    },
    addBox() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.post({
            url: `${OutBound.addReason}?itemText=${this.formValue.itemText}`,
            isLoading: true,
          }).then((res) => {
            this.formValue.itemText = "";
            this.getTable();
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
    resetForm(formName) {
      this.$refs[formName] && this.$refs[formName].resetFields();
      this.form.dialogFormVisible = false;
    },
    exportData() {
      this.post({
        url: OutBound.exportReasonList,
        isLoading: true,
        responseType: "blob",
        data: {
          Page: this.paginations.page,
          MaxResultCount: this.paginations.limit,
        },
      }).then((res) => {
        this.fnexsl(res); //fnexsl封装的导出方法
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.row {
  display: flex;
  width: 100%;
  .el-form-item {
    margin-bottom: 0;
    width: 40%;
  }
  .addbtn {
    margin-left: 30px;
  }
  ::v-deep .el-button--small{
    padding:9px 25px;
  }
}
</style>
