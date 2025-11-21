<template>
  <div>
    <el-dialog
      title="二维码信息"
      :visible.sync="form.dialogFormVisible"
      width="30%"
    >
      <div ref="qrCodeDiv" class="qrcode"></div>
    </el-dialog>
  </div>
</template>
<script>
import QRCode from "qrcodejs2";
export default {
  name: "QrCode",
  props: {
    form: Object,
  },
  data() {
    return {};
  },
  methods: {
    generateCode() {
      this.$nextTick(() => {
        this.$refs.qrCodeDiv.innerHTML = ""; //二维码清除
        new QRCode(this.$refs.qrCodeDiv, {
          text: this.form.text, //二维码链接，参数是否添加看需求
          width: 120, //二维码宽度
          height: 120, //二维码高度
          colorDark: "#333333", //二维码颜色
          colorLight: "#ffffff", //二维码背景色
          correctLevel: QRCode.CorrectLevel.L, //容错率，L/M/H
        });
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.qrcode{
  width: 120px;
  height: 120px;
  margin: 0 auto;
}
::v-deep .el-dialog__body{
  padding:40px 20px;
}
</style>
