<template>
  <div>
    <el-tooltip  placement="top" :open-delay="500" v-for="(item,index) in obj" :key="index">
      <div
        :style="{'top': item.top+'px'}"
        :class="item.className"
        class="item boxitem"
        @dblclick="test(item)"
      >
      </div>
      <div slot="content">
        货位信息：{{item.code}}<br/>
        层：{{item.layerNum}}<br/>
        排：{{item.floorNum}}<br/>
        列：{{item.columnNum}}<br/>
        是否启用：{{item.enabledText}}<br/>
      </div>
    </el-tooltip>
  </div>
</template>
<script>

export default {
  name: "itemMap",
  props:{
    obj:Array,
  },
  methods:{
    test(val){
      console.log(val)
    }
  }
}
</script>
<style scoped>
.green {
  background: #00ff7f;
  border: 1px solid #ccc;
}

.enable {
  background: #ebebeb;
  border: 1px solid #ccc;
}

.whiteBorderRed {
  background: white;
  border: 1px solid red;
}

.greenBorderRed {
  background: #00ff7f;
  border: 1px solid red;
}

</style>
