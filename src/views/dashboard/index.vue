<template>
  <div style="height: 100%; width: 100%">
    <!-- 状态 -->
    <div style="display: flex; margin-top: 20px">
      <span style="font-size: 30px">空货位 </span> :
      <div
        class="class_b_item_A"
        style="width: 30px; height: 30px; border-radius: 4px"
      ></div>
      <span style="font-size: 30px; margin: 0 0 0 20px">锁定 </span> :
      <div
        class="class_b_item_B"
        style="
          width: 30px;
          height: 30px;
          border-radius: 4px;
          padding-right: 5px;
        "
      ></div>
      <span style="font-size: 30px; margin: 0 0 0 20px">锁定 </span> :
      <div
        class="class_b_item_D"
        style="width: 30px; height: 30px; border-radius: 4px"
      ></div>
      <span style="font-size: 30px; margin: 0 0 0 20px">有货 </span> :
      <div
        class="class_b_item_C"
        style="width: 30px; height: 30px; border-radius: 4px"
      ></div>
    </div>
    <!-- 统计数据 -->
    <div style="font-size: 45px; margin-top: 20px">
      <span style="margin-right: 20px"
        >{{ listData.statistics.pointCount }}
      </span>
      <span style="margin-right: 20px">{{
        listData.statistics.loadCount
      }}</span>
      <span style="margin-right: 20px">{{
        listData.statistics.lockCount
      }}</span>
      <span style="margin-right: 20px">{{
        listData.statistics.percentage
      }}</span>
    </div>
    <!--  点位数据-->

    <div
      style="
        display: flex;
        box-sizing: border-box;
        padding: 5px;
        height: 100%;
        width: 100%;
      "
    >
      <div
        class="box"
        v-for="(item, index) in listData.points"
        :key="index"
        :style="boxClass()"
      >
        <div class="class_t">{{ item.title }}</div>

        <!-- areaCode -->
        <div
          class="class_b"
          v-for="(jtem, jndex) in item.data"
          :key="jndex"
          :style="class_b_item()"
        >
          <!-- <div class="class_h" >
          <p style="margin: 0px !importent">
                库区号:{{ jtem.areaCode }}
              </p>
        </div> -->

          <!-- 鼠标悬浮显示的内容 -->
          <el-tooltip effect="dark" placement="right" :open-delay="300">
            <div class="class_b_item" :class="boxstyle(jtem)">
              <!-- <p style="margin: 0px !importent; font-size: 1px">
                {{ jtem.areaCode }}
              </p> -->
            </div>
            <div slot="content">
              <p style="margin: 0px !importent">
                点位编码:{{ jtem.pointCode }}
              </p>
              <p style="margin: 0px !importent">
                零件编码:{{ jtem.productCode }}
              </p>
              <p style="margin: 0px !importent">数量:{{ jtem.qty }}</p>
            </div>
          </el-tooltip>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Point } from "@/api/request/swagger";
// import minxin from './index.js'
export default {
  //  mixins: [minxin],
  data() {
    return {
      timer: null, // 定时器
      listData: {
        // 统计数据
        statistics: {},
        // 点位数据
        points: [],
      },
    };
  },
  mounted() {
    // 定时器任务，每分钟刷新一次接口
    this.timer = setInterval(this.getTable, 60 * 1000);
    this.getTable();
  },
  methods: {
    boxClass() {
      let style = {};
      let num = 100 / this.listData.points.length;
      style["width"] = num + "%";
      return style;
    },
    class_b_item() {
      let style = {}; // let data = []; // this.data.forEach((element) => { //  data.push(element.data.length); // }); // let max = Math.max.apply(null, data)-1; // let num = 100 / (max );
      let num = 100 / this.listData.points.length;
      style["height"] = num + 4 + "%";
      return style;
    },
    getTable() {
      this.get({
        url: Point.pointMap,
        isLoading: true,
      }).then((res) => {
        this.listData = res.result;
      });
    },

    boxstyle(item) {
      // 背景默认白色，边框默认黑色，loadState=1背景绿色，enabled=false边框红色加粗
      // loadState=1并且enabled=false那就绿色背景加上红色边框
      // if (item.level == "A") {
      //   return "class_b_item_F";
      // } else if (item.level == "B") {
      //   return "class_b_item_H";
      // } else if (item.level == "C") {
      //   return "class_b_item_J";
      // } else {
      //   return "class_b_item_A";
      // }
      if (item.loadState == 1 && item.enabled == false) {
        return "class_b_item_D";
      }
      if (item.loadState == 1) {
        return "class_b_item_C";
      } else if (item.enabled == false) {
        return "class_b_item_B";
      } else {
        return "class_b_item_A";
      }
    },
  },
  // 定时器销毁
  destroyed() {
    clearInterval(this.timer);
    this.timer = null;
    // console.log("xiaohui ");
  },
};
</script>

<style lang="scss" scoped>
.box {
  text-align: center;
  margin-left: 5px;
  .class_t {
    font-size: 16px;
    margin: 10px 0px;
  }
  .class_h {
    margin-top: 10px;
  }
  .class_b {
    margin-bottom: 5px;
    .class_b_item {
      // margin-bottom: 5px;
      width: 100%;
      height: 100%;
      // width: 30px;
      // height: 30px;
      background-color: rgb(254, 255, 254);
      border: 1px solid #ccc;
      color: black;
      font-size: 14px;
      border-radius: 4px;
      display: inline-block;
      line-height: 30px;
      white-space: nowrap;
      cursor: pointer;
      text-align: center;
    }
  }
}
.class_b_item_A {
  background-color: rgb(254, 255, 254) !important;
  border: 3px solid rgb(165, 163, 163) !important;
  color: black !important;
}
.class_b_item_B {
  background-color: rgb(255, 255, 255) !important;
  border: 3px solid #b95042 !important;
  color: #ffffff !important;
}
.class_b_item_C {
  background-color: #14d55e !important;
  border: 1px solid transparent !important;
  color: #ffffff !important;
}
.class_b_item_D {
  background-color: #14d55e !important;
  border: 3px solid #b95042 !important;
  color: #ffffff !important;
}
// .class_b_item_F {
//   background-color: #d51414 !important;
//   border: 3px solid #cbc8c8 !important;
//   color: #ffffff !important;
// }
// .class_b_item_H {
//   background-color: #f2790e !important;
//   border: 3px solid #cbc8c8 !important;
//   color: #ffffff !important;
// }
// .class_b_item_J {
//   background-color: #d1e333 !important;
//   border: 3px solid #cbc8c8 !important;
//   color: #ffffff !important;
// }
</style>
