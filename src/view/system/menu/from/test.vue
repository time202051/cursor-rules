<template>
  <div>
      <!--     :show-close="false"    -->

    <el-dialog
      title="收货地址"
      :visible.sync="form.dialogFormVisible"
    >
      <el-form :model="form">
        <el-form-item
          v-for="(item, index) in fromList"
          :key="index"
          :label="item.label"
          :prop="item.prop"
          :label-width="'120px' || form.formLabelWidth"
        >
          <el-input
            v-if="item.type == 'input'"
            v-model="form[item.prop]"
            :placeholder="'请输入' + item.label"
            autocomplete="off"
            :clearable="true || item.clearable"
          ></el-input>
          <el-select
            v-if="item.type == 'select'"
            v-model="form[item.prop]"
            :placeholder="'请选择' + item.label"
            autocomplete="off"
            :clearable="true || item.clearable"
          >
            <el-option
              v-for="(jtem, jndex) in item.child"
              :key="jndex"
              :label="jtem.label"
              :value="jtem.value"
            ></el-option>
          </el-select>
          <el-date-picker
            v-if="item.type == 'date'"
            :type="item.type"
            v-model="form[item.prop]"
            :placeholder="'请选择日期'"
            autocomplete="off"
            :clearable="true || item.clearable"
            style="width: 100%"
          ></el-date-picker>
          <el-switch
            v-if="item.type == 'switch'"
            v-model="form[item.prop]"
          ></el-switch>
          <el-input
            v-if="item.type == 'textarea'"
            type="textarea"
               :placeholder="'请输入' + item.label"
               :maxlength='item.maxlength'
               :show-word-limit='item.showLimit?item.showLimit:false'
            v-model="form[item.prop]"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="form.dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="form.dialogFormVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import elDragDialog from "@/utils/directives";

export default {
  props: {
    form: Object,
    fromList: Array,
  },
//    directives: {

//   elDragDialog,

//  },
};
</script>

<style lang='scss'>
.el-dialog__header {
  background-color: #4a77ac;
  padding: 10px;
  // padding-bottom: none;
  .el-dialog__title,
  .el-dialog__headerbtn i {
    color: white;
  }
}
</style>