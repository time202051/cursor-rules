<template>
  <div>
    <el-dialog
      title="提示"
      :visible.sync="form.dialogFormVisible"
      :close-on-click-modal="false"
      v-el-drag-dialog
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="所属系统" prop="systemId">
          <el-select v-model="form.systemId" placeholder="请选择">
            <el-option
              v-for="(item, index) in fromObj.keyValueList"
              :key="index"
              :label="item.value"
              :value="item.key"
                :disabled='item.disabled'
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型" prop="type">
          <el-select v-model="form.type" placeholder="请选择">
            <el-option
              v-for="(item, index) in fromObj.menuTypeList"
              :key="index"
              :label="item.value"
              :value="item.key"
            
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上级菜单">
          <el-input readonly v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="菜单名称" prop="displayName">
          <el-input v-model="form.displayName"></el-input>
        </el-form-item>
        <el-form-item label="菜单路径" prop="jump">
          <el-input v-model="form.jump"></el-input>
        </el-form-item>
        <el-form-item label="菜单排序">
          <el-input-number
            v-model="form.sort"
            :min="0"
            label="菜单排序"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="菜单图标">
          <el-popover
            placement="bottom-start"
            width="500"
            trigger="click"
            @show="$refs['iconSelect'].reset()"
          >
            <svgIcons ref="iconSelect" @selectedIcon="selectedIcon"></svgIcons>
            <el-input
              slot="reference"
              v-model="form.icon"
              auto-complete="off"
              readonly
              placeholder="点击选择菜单图标"
            ></el-input>
          </el-popover>
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
import { WebMenu } from "@/api/request/swagger";
export default {
  props: {
    form: Object,
    fromObj: Object,
  },
  watch:{
    'fromObj.keyValueList':{
      handler(val){
       
      },
      deep:true
    }
  },
  data() {
    return {
      rules: {
        displayName: [{ required: true, message: "必填", trigger: "blur" }],
        jump: [{ required: true, message: "必填", trigger: "blur" }],
        type: [{ required: true, message: "必填", trigger: "change" }],
        systemId: [{ required: true, message: "必填", trigger: "change" }],
      },
    };
  },
  methods: {
    selectedIcon(name) {
      this.form.icon = name;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.form.flage == "update") {
            this.put({
              url: WebMenu.webMenu + "/" + this.form.parentId,
              data: this.form,
            }).then((res) => {
              this.form.fn();
              this.form.dialogFormVisible = false;
            });
          } else {
            let obj = {
              displayName: this.form.displayName,
              displsortyName: this.form.sort,
              jump: this.form.jump,
              menuType: this.form.type,
              type: this.form.type,
              systemId: this.form.systemId,
              icon: this.form.icon,
              parentId:this.form.parentId
            };
            this.post({ url: WebMenu.webMenu, data: obj }).then((res) => {
              this.form.fn();
              this.form.dialogFormVisible = false;
            });
          }
          this.$message.success('操作成功')
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
  /* background-color: #4a77ac; */
   background: var(--themeColor) !important;
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