<template>
  <div class="dialogfrom">
    <el-dialog
      :title="importform.title || '导入'"
      :visible.sync="importform.dialogFormVisible"
      :close-on-click-modal="false"
      :before-close="handleClose"
      v-el-drag-dialog
      :show-close="true"
      :width="importform.width || '35%'"
    >
      <div class="from">
        <el-upload
          class="upload-demo"
          ref="upload"
          drag
          accept=".xls,.xlsx"
          :action="UploadUrl()"
          :limit="1"
          :on-exceed="fileExceed"
          :before-upload="beforeUpload"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-change="importChange"
          :http-request="uploadSectionFile"
          :file-list="fileList"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将文件拖到此处，或
            <em>点击上传</em>
          </div>
          <div class="el-upload__tip" slot="tip"></div>
        </el-upload>
      </div>
      <div class="frombutton" style="margin-bottom: 10px">
        <div class="btn">
          <el-button type="primary" @click="download('formInlines')"
            >下载模板</el-button
          >
          <el-button type="primary" @click="submitForm('formInlines')"
            >确定</el-button
          >
          <el-button @click="resetFields()">取消</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { Matter} from "@/api/request/swagger";
// import exls from "@/components/exls/exls";
export default {
  props: {
    projectLists: Array,
    importform: Object,
    // fileList:{
    //   type: Array,
    //   defalut: [],
    // },

    // tempUrl:{
    //     type:string
    //   },
  },
  mounted() {},
  data() {
    return {
      projectListsprojectListsdata: [],
      //暂存有flage标识的数据
      projectIdFlag: [],
      fileList: [],
    };
  },
  watch: {
    projectLists: {
      handler(newVal, oldVal) {
        if (newVal) {
          if (newVal) {
            newVal.forEach((item) => {
              if (item.flag == true) this.projectIdFlag = item;
            });
            this.arrDe_duplication(newVal);
          }
        }
      },
      deep: true,
    },
  },
  mounted() {},
  methods: {
    //下载模板
    download() {
      const formData = new FormData(); //FormData对象，添加参数只能通过append('key', value)的形式添加
      formData.append("file", this.fileList.file); //添加文件对象
      formData.append("uploadType", this.rulesType);
      this.post({
        url: this.importform.downUrl,
        responseType: "blob",
      })
        .then((res, er) => {
          this.fnexsl(res); //fnexsl封装的导出方法
          this.$message.success("下载成功");
        })
        .catch((err) => {
          if (err.error) {
            this.$message.error(err.error.message);
          }
        });
    },
    // 上传文件
    UploadUrl: function () {
      // 因为action参数是必填项，我们使用二次确认进行文件上传时，直接填上传文件的url会因为没有参数导致api报404，所以这里将action设置为一个返回为空的方法就行，避免抛错
      return window.global_config.baseURL + this.importform.url;
    },
    arrDe_duplication(arr) {
      if (arr instanceof Array) {
        var obj = {};
        this.projectListsdata = arr.reduce(function (item, next) {
          obj[next.projectId]
            ? ""
            : (obj[next.projectId] = true && item.push(next)) || item.flag;
          return item;
        }, []);
      }
    },
    submitForm() {
      if (this.fileList.length == 0) {
        this.$message.success("请选择需要导入的模板！");
        return;
      } else {
        var form = new FormData();
        form.append("file", this.fileList[0]);
        this.post({
          url: this.importform.url,
          data: form,
          isLoading: true,
        })
          .then((res) => {
            this.fileList = [];
            this.importform.dialogFormVisible = false;
            this.$message.success("导入成功");
            this.$emit('refresh'); 
          })
          .catch((err) => {
            if (err.error) {
              this.fileList = [];
              this.$message.error(err.error.message);
            }
          });
      }
      this.$refs.upload.submit();
    },
    // 取消
    resetFields() {
      this.fileList = [];
      this.importform.dialogFormVisible = false;
      this.$message({
        type: "info",
        message: "已取消操作",
      });
    },
    beforeUpload(file) {},
    importChange(file, fileList) {
      if (this.fileList.length >= 1) {
        for (let i = 0; i < this.fileList.length; i++) {
          console.log(this.fileList[i]);
        }
      }
      this.fileList.push(file.raw);
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    fileExceed() {
      this.$message({
        type: "info",
        message: "别贪心！一次只能上传一个哦~",
      });
    },
    uploadSectionFile(param) {},
    //清除文件
    handleRemove(file, fileList) {
      this.fileList = [];
      // this.importform.dialogFormVisible = false;
      this.$message({
        type: "info",
        message: "已删除文件,请重新上传",
      });
      ////  debugger;
      // return layer.confirm(`确定移除 ${ file.name }？`,
      //           function (index, layero) {
      //             layer.msg('删除成功')
      //           }
      //       );
    },
    // 弹窗右上角的×
    handleClose() {
      this.fileList = [];
      this.importform.dialogFormVisible = false;
      this.$message({
        type: "info",
        message: "已取消操作",
      });
    },
    handlePreview(file) {
      // console.log(file);
    },
  },
};
</script>

<style lang="scss" scoped>
v-deep .el-upload .el-upload--text {
  width: 100% !important;
  margin: 0px auto !important;
}
.el-dialog__header {
  background-color: #4a77ac;
  padding: 10px;
  // padding-bottom: none;
  .el-dialog__title,
  .el-dialog__headerbtn i {
    color: white;
  }
}
v-deep .el-upload-dragger {
  // width:320px;

  .el-icon-upload {
    color: #409eff;
    margin: 20px 0 15px;
  }

  .el-upload__text {
    margin-bottom: 10px;
  }
}
// @import "../../../../../assets/style/from/from.less";
</style>
