<template>
  <div>
    <el-dialog
      title="设置"
      :visible.sync="isSetting"
      :close-on-click-modal="false"
      v-el-drag-dialog
      width="20%"
      @close="handleClose()"
    >
      <el-form :model="settingForm" :rules="rules" ref="settingForm" label-width="100px" class="settingForm">
        <el-form-item label="应用名称" prop="applicationName">
          <el-input type="input" v-model="settingForm.applicationName"></el-input>
        </el-form-item>
        <el-form-item label="总开关" prop="isEnabled">
          <el-tooltip content="启用或禁用审计系统的总开关.如果值为 fa1se,则不使用其他选项." placement="top-start">
            <i class="el-icon-question"></i>
          </el-tooltip>
          <el-switch v-model="settingForm.isEnabled"></el-switch>
        </el-form-item>
        <el-form-item label="隐藏错误" prop="hideErrors">
          <el-tooltip
            content="在保存审计日志对象时如果发生任何错误,审计日志系统会将错误隐藏并写入常规日志.如果保存审计日志对系统非常重要那么将其设置为 fa1se 以便在隐藏错误时抛出异常."
            placement="top-start">
            <i class="el-icon-question"></i>
          </el-tooltip>
          <el-switch v-model="settingForm.hideErrors"></el-switch>
        </el-form-item>
        <el-form-item label="记录匿名" prop="isEnabledForAnonymousUsers">
          <el-tooltip
            content="如果只想为经过身份验证的用户记录审计日志,请设置为 fa1se.如果为匿名用户保存审计日志,你将看到这些用户的 userid 值为 nu11."
            placement="top-start">
            <i class="el-icon-question"></i>
          </el-tooltip>
          <el-switch v-model="settingForm.isEnabledForAnonymousUsers"></el-switch>
        </el-form-item>
        <el-form-item label="仅异常" prop="alwaysLogOnException">
          <el-tooltip
            content="如果设置为 true,将始终在异常/错误情况下保存审计日志,不检査其他选项(IsEnabled 除外它完全禁用了审计日志)."
            placement="top-start">
            <i class="el-icon-question"></i>
          </el-tooltip>
          <el-switch v-model="settingForm.alwaysLogOnException"></el-switch>
        </el-form-item>
        <el-form-item label="记录Get请求" prop="isEnabledForGetRequests">
          <el-tooltip
            content="HTTP GET请求通常不应该在数据库进行任何更改,审计日志系统不会为GET请求保存审计日志对象.将此值设置为 true 可为GET请求启用审计日志系统."
            placement="top-start">
            <i class="el-icon-question"></i>
          </el-tooltip>
          <el-switch v-model="settingForm.isEnabledForGetRequests"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('settingForm')">提交</el-button>
        <el-button @click="resetForm('settingForm')">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<style>
.settingForm i {
  margin-right: 10px;
}

.settingForm label {
  padding-right: 2px;
}
</style>
<script>
import {
  AuditLogging
} from "@/api/request/swagger";

export default {
  props: {
    isSetting: Boolean,
    settingForm: {
      hideErrors: false,
      isEnabled: false,
      applicationName: '',
      isEnabledForAnonymousUsers: false,
      alwaysLogOnException: false,
      isEnabledForGetRequests: false,
    }
  },
  data() {
    return {
      rules: {
        applicationName: [
          {required: true, message: '请填写应用名称', trigger: 'blur'}
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.put({
            url: AuditLogging.submitAuditLogSetting,
            data: this.settingForm,
            isLoading: true,
          }).then((res) => {
            this.handleClose();
            this.$message({
              type: "success",
              message: "设置成功!",
            });
          });
        } else {
          this.$message({
            type: "error",
            message: "设置失败!",
          });
          return false;
        }
      });
    },
    resetForm(formName) {
      this.handleClose();
      this.$refs[formName].resetFields();
    },
    handleClose() {
      this.$emit('close');
    }
  }
}
</script>
