<template>
  <div class="SelectMudel">
    <el-select
      v-model="obj.model"
      v-bind="obj.props || {}"
      :placeholder="`请选择${obj.placeholder}`"
      :clearable='obj.clearable'
      :disabled='obj.disabled'
    >
      <el-option
        v-for="item,index in obj.list"
        :key="index"
        :label="obj.config.label"
        :value="obj.config.value"
      >
      </el-option>
    </el-select>

     <el-input
      v-model="item.value"
      :placeholder="`请输入内容${item.placeholder}`"
      v-bind="item.props || {}"
      style="width: 200px"
      :maxlength="item.maxlength"
      :clearable="item.clearable"
      :disabled="item.disabled"
    ></el-input>

     <el-date-picker
      v-model="datesPicer.value"
      placeholder="选择时间"
       v-bind="datesPicer.props.date"
      type="daterange"
       start-placeholder="开始日期"
      end-placeholder="结束日期"
      :clearable="datesPicer.clearable"
      :default-time="['00:00:00', '23:59:59']"
    >
    </el-date-picker>
  </div>
</template>
 
<script>
export default {
  name: "sltopn",
  props: {
    obj: Object,
    item:Object,
    datesPicer:Object
  },
  data() {
    return {
   
    };
  },
  methods: {
   
  },

  
 
};
</script>