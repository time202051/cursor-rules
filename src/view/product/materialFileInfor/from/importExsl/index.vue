<template>
  <div class="dialogfrom">
    <el-dialog
      :title="importform.title || '提示'"
      :visible.sync="importform.dialogFormVisible"
      :close-on-click-modal="false"
      v-el-drag-dialog
      :width="importform.width || '45%'"
    >
      <div class="from">
        <el-upload
          class="upload-demo"
          ref="upload"
          drag
          accept=".xls, .xlsx"
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
          <!-- <el-button type="primary" @click="download('formInlines')">下载模板</el-button> -->
          <el-button type="primary" @click="submitForm('formInlines')"
            >确定</el-button
          >
          <el-button @click="resetFields()"
            >取消</el-button
          >
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { Point } from "@/api/request/swagger";
// import exls from "@/components/exls/exls";
export default {
  props: {
    projectLists: Array,
    importform: Object,
  },
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
      Commonmethod.downloadesxl({}, (res) => {
        // exls(res);
      });
    },
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
              this.fileList=[]
            this.$message.success("操作成功");
          })
          .catch((err) => {
            if (err.error) {
              this.fileList=[]
              this.$message.error(err.error.message);
            }
          });
      }
      this.$refs.upload.submit();
    },
    resetFields() {
        this.fileList=[]
          this.importform.dialogFormVisible = false;
           this.$message({
            type: "info",
            message: "已取消操作",
          });
    },
    beforeUpload(file) {
      ////  debugger;
    },
    importChange(file, fileList) {
      ////  debugger;

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
      layer.msg("别贪心！一次只能上传一个哦~");
    },
    uploadSectionFile(param) {},
    //清除文件
    handleRemove(file, fileList) {
      ////  debugger;
      // return layer.confirm(`确定移除 ${ file.name }？`,
      //           function (index, layero) {
      //             layer.msg('删除成功')
      //           }
      //       );
    },
    handlePreview(file) {
      // console.log(file);
    },
  },
};
</script>

<style lang='scss' scoped >
v-deep .el-upload .el-upload--text {
  width: 100% !important;
  margin: 0px auto !important;
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