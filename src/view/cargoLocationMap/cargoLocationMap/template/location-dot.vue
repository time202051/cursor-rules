<template>
  <div class="location__dot">
    <el-tooltip placement="top"
                :open-delay="500"
                v-if="isBig">
      <div class="__big"
           :class="[{use: bigUse},val.data[0].className]"
           @dblclick="test(val.data[0])"

      >
<!--        {{val.data[0].floorNum}}-->
      </div>
      <div slot="content">
        <div>
          货位信息：{{ val.data[0].code }}<br/>
          层：{{ val.data[0].layerNum }}<br/>
          排：{{ val.data[0].floorNum }}<br/>
          列：{{ val.data[0].columnNum }}<br/>
          是否启用：{{ val.data[0].enabledText }}<br/>
        </div>
      </div>
      <div v-if="topUse"
           slot="content">
        topUse
      </div>
    </el-tooltip>
    <el-tooltip placement="top"
                :open-delay="500"
                v-if="isSmall">
      <div class="__small">
        <div class="__small_top"
             :class="[{use: topUse},val.data[0].className]" @dblclick="test(val.data[0])"></div>
        <div class="__small_bottom"
             :class="[{use: bottomUse},val.data[1].className]" @dblclick="test(val.data[1])"></div>
      </div>
      <div slot="content">
        <div>
          货位信息：{{ val.data[0].code }}<br/>
          层：{{ val.data[0].layerNum }}<br/>
          排：{{ val.data[0].floorNum }}<br/>
          列：{{ val.data[0].columnNum }}<br/>
          是否启用：{{ val.data[0].enabledText }}<br/>
          <div style="width: 100%;
    height: 1px;
    margin: 10px 0px;
    border: 1px solid #ccc;"></div>
          <div>
            货位信息：{{ val.data[1].code }}<br/>
            层：{{ val.data[1].layerNum }}<br/>
            排：{{ val.data[1].floorNum }}<br/>
            列：{{ val.data[1].columnNum }}<br/>
            是否启用：{{ val.data[1].enabledText }}<br/>
          </div>
        </div>
      </div>
    </el-tooltip>
  </div>
</template>
<script>
export default {
  props: {
    isBig: Boolean,
    bigUse: Boolean,
    isSmall: Boolean,
    topUse: Boolean,
    bottomUse: Boolean,
    val: Object
  },
 methods:{
   test(val){
     console.log(val)
   }
   ,
 }
}
</script>
<style lang="scss"
       scoped>
$use-border: 1px solid orangered;
$use-background: orange;

.green {
  background: #00ff7f !important;
  border: 1px solid #ccc !important;
}

.enable {
  background: #ebebeb !important;
  border: 1px solid #ccc !important;
}

.whiteBorderRed {
  background: white !important;
  border: 1px solid red !important;
}

.greenBorderRed {
  background: #00ff7f !important;
  border: 1px solid red !important;
}

.location__dot {
  width: 30px;
  height: 30px;
  margin: 10px;

  .__small {
    height: 100%;
    width: 100%;

    div {
      width: 100%;
      height: 50%;
      border: 1px solid #ccc;

      &.use {
        border: $use-border;
        background: $use-background;
      }

      &.__small_top {
        border-bottom-width: 0;
      }
    }
  }

  .__big {
    width: 100%;
    height: 100%;
    border: 1px solid #ccc;

    &.use {
      border: $use-border;
      background: $use-background;
    }
  }

}
</style>
