<template>
  <div>
    <el-dialog
      :title="form.title"
      :visible.sync="form.dialogVisible"
      :width="form.width"
      @close="resetForm"
    >
      <div class="main">
        <div class="lf">
          <h4>送至产线</h4>
          <MyTable
            :btnlist="[]"
            :emptyImg="tableData.emptyImg"
            :tableData="tableData"
          >
          </MyTable>
        </div>
        <div class="rt">
          <h4>可选产线</h4>
          <div class="add">
            <el-form
              ref="canProductLineForm"
              :model="canProductLineForm"
              :rules="rules"
              label-width="80px"
              class="form"
            >
              <el-form-item prop="productLine" label="产线编号">
                <el-input
                  clearable
                  v-model="canProductLineForm.productLine"
                  placeholder="请输入产线编号"
                ></el-input>
              </el-form-item>
            </el-form>
            <el-button type="primary" @click="increase">添加</el-button>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定 </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import minxin from "./index.js";
import { Job } from "@/api/request/swagger";
export default {
  mixins: [minxin],
  props: {
    form: Object,
  },
  methods: {
    //确定按钮
    submitForm() {
      if (!this.tableData.rows.length) {
        return this.$message.warning("请先添加一条产线");
      }
      this.post({
        url: `${Job.handleAgvTask}?AtuoBool=${this.form.requestData.params}`,
        isLoading: true,
        data: this.tableData.rows.map((item) => {
          return item.lineCode;
        }),
      }).then((res) => {
        this.form.requestData.fn();
        this.form.dialogVisible = false;
        this.$message({
          type: "success",
          message: "操作成功!",
        });
      });
    },
    //添加按钮
    increase() {
      this.$refs.canProductLineForm.validate((valid) => {
        if (valid) {
          if (
            this.tableData.rows.some((item) => {
              return item.lineCode == this.canProductLineForm.productLine;
            })
          ) {
            this.$message.warning("送至产线已存在该产线编号");
          } else {
            this.tableData.rows.push({
              lineCode: this.canProductLineForm.productLine,
            });
          }
        } else {
        }
      });
    },
    //下移
    moveDown(row, index) {
      if (index + 1 === this.tableData.rows.length) {
        this.$message.warning("已经是最后一条，不可下移");
      } else {
        const downDate = this.tableData.rows[index + 1];
        this.tableData.rows.splice(index + 1, 1);
        this.tableData.rows.splice(index, 0, downDate);
      }
    },
    //上移
    moveUp(row, index) {
      if (index > 0) {
        const upDate = this.tableData.rows[index - 1];
        this.tableData.rows.splice(index - 1, 1);
        this.tableData.rows.splice(index, 0, upDate);
      } else {
        this.$message.warning("已经是第一条，不可上移");
      }
    },
    resetForm() {
      this.$refs.canProductLineForm.resetFields();
      this.form.dialogVisible = false;
      (this.canProductLineForm.productLine = ""), (this.tableData.rows = []);
    },
  },
};
</script>
<style lang="scss" scoped>
.main {
  display: flex;
  h4 {
    font-size: 18px;
    margin: 0;
  }
  .lf {
    width: 60%;
    border-right: 1px solid #333;
    padding-right: 20px;
  }
  .rt {
    width: 40%;
    padding-left: 20px;
    .add {
      margin-top: 10px;
      display: flex;
      .form {
        margin-right: 12px;
        flex: 1;
      }
    }
  }
}
::v-deep .btnbox {
  display: none;
}
::v-deep .tablebox {
  padding: 0;
}
::v-deep .pagebox {
  margin: 0;
}
::v-deep .el-form-item {
  margin-bottom: 0;
}
</style>
