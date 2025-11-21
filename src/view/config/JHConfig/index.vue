<template>
  <div class="container">
    <div class="containerPading">
      <fieldset class="bootstrap-elem-field">
        <legend>拆叠盘机空框出库</legend>
        <el-form :inline="true" ref="frombarcode" class="demo-form-inline">
          <el-form-item label="业务配置：" prop="barcode">
            <el-radio v-model="radio" label="1" border>入库暂存</el-radio>
            <el-radio v-model="radio" label="2" border>出库下线</el-radio>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="setClick(1)">设置</el-button>
          </el-form-item>
        </el-form>
      </fieldset>
    </div>
  </div>
</template>
<script>
import { ConfigInfo } from "@/api/request/swagger";
export default {
  data() {
    return {
      radio: "",
    };
  },
  mounted() {
    this.fn();
  },
  methods: {
    // 进入页面掉查询接口，并给radio赋值
    fn() {
      this.get({
        url: ConfigInfo.emptyOut,
        isLoading: true,
      }).then((res) => {
        // radio后端返的是数字，要转成字符串形式，加个toString()
        this.radio = res.result.containerOutType.toString();
      });
    },
    // 设置功能按钮
    setClick(flage = 1) {
      this.$confirm("此操作将修改出库方式, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.put({
            url: ConfigInfo.emptyOut + "?input=" +this.radio ,
          }).then((res) => {
            this.fn();
            this.$message.success("操作成功");
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
<style scoped  lang='scss'>
.container {
  padding: 10px;
}
.el-form {
  padding: 0px 10px;
}
.el-form-item {
  margin-top: 15px;
}

.bootstrap-elem-field {
  margin-bottom: 10px;
  border-radius: 8px;
  padding: 0;
  border-width: 1px;
  border-style: solid;
  border-color: #3b3b3b;
}
.bootstrap-elem-field legend {
  margin-left: 20px;
  padding: 0 10px;
  font-size: 20px;
  font-weight: 600;
  border-bottom: none;
  width: auto;
}
.bootstrap-field-box {
  padding: 10px 15px;
}
</style>
