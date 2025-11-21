
<template>
  <div class="dialogfrom" ref="exportDsialogbox">
    <el-dialog
      :title="importForm.title || '提示'"
      :visible.sync="importForm.dialogFormVisible"
      :close-on-click-modal="false"
      v-el-drag-dialog
      :width="importForm.width || '45%'"
      :show-close="false"
    >
    <div class="from">
      <el-upload
        class="upload-demo"
        drag
        action="#"
        multiple
        accept=".xls,.xlsx"
        :http-request="uploadHttpRequest"
        ref="uploadfile"
        :file-list="fileList"
        :auto-upload="false"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
    </div>
    <!-- 按钮 -->
      <div slot="footer" class="dialog-footer">

        <el-button @click="importForm.dialogFormVisible=false">取消</el-button>
        <el-button type="primary" @click="submitForm()">确定</el-button>
    </div>
    </el-dialog>
  </div>
</template>
<script>
import { StockInfo } from "@/api/request/swagger";
export default {
  props: {
    importForm:Object,
    fileList:{
      type: Array,
      defalut: [],
    },
  },
  data() {
    return {
      rulesType: [],
      upload: {
        open: false,
        title: '',
        isUploading: false,

      },
    };
  },
  mounted() {},
  methods: {
    uploadHttpRequest(param) {
      const formData = new FormData(); //FormData对象，添加参数只能通过append('key', value)的形式添加
      formData.append("file", param.file); //添加文件对象
      formData.append("uploadType", this.rulesType);
     this.post({
        url:StockInfo.importcPStock,
        data:formData,
      }).then((res, er) => {
        this.importForm.dialogFormVisible=false
        param.onSuccess(); // 上传成功的文件显示绿色的对勾
      })
    },
    submitForm() {
      var self = this;
      this.$refs.uploadfile.submit();
    },
    // submitFormEntry() {
    //   const formData = new FormData(); //FormData对象，添加参数只能通过append('key', value)的形式添加
    //   formData.append("file", this.fileList.file); //添加文件对象
    //
    //   formData.append("uploadType", this.rulesType);
    //   RequestFn.PostRequest({
    //     url:Product.DownLoadModel,
    //     responseType: "blob",
    //   }).then((res, er) => {
    //     layer.msg("下载成功");
    //   });
    // },
    resetForm(fromname) {
      this.$refs.uploadfile.clearFiles();
      this.$emit('resetForms')
      // this.fileList = []; //清空选择的文件列表
      //   this.$refs[fromname].resetFields();
      this.upload.open = false
      this.upload.isUploading = false
    },
  },
};
</script>
<style lang='scss' scoped >
.from {
  width: 60%;
  margin: 0px auto;
  .upload-demo {
    width: 100%;
    .el-upload {
      width: 100%;
      .el-upload-dragger {
        width: 100%;
      }
    }
  }
}

</style>
