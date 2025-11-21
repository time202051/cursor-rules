<script>
import Dot from './location-dot'

export default {
  data() {
    return {
      index:0,
    }
  },
  props: {
    CPlist: Object,     // 巷道数据
    totalRow: Number,  // 总行数

  },
  components: {Dot},
  computed: {
    LEFT_IN_LIST: function () {
      return this.factory(this.CPlist['LEFT']['L'])
    },
    LEFT_OUT_LIST: function () {
      return this.factory(this.CPlist['LEFT']['W'], this.CPlist['LEFT']['D'])
    },
    RIGHT_OUT_LIST: function () {
      return this.factory(this.CPlist['RIGHT']['W'], this.CPlist['RIGHT']['D'])
    },
    RIGHT_IN_LIST: function () {
      return this.factory(this.CPlist['RIGHT']['L'])
    },
    alleyIndex:function (){
      let result = [
        [this.CPlist['LEFT']['L']],
        [this.CPlist['LEFT']['W'], this.CPlist['LEFT']['D']],
        [this.CPlist['RIGHT']['W'], this.CPlist['RIGHT']['D']],
        [this.CPlist['RIGHT']['L']]
      ]
      result = result.map(x => {
        return x.filter(x2 => x2).length
      }).map(x => {
        if (x) {
          return this.CPlist.start + this.index++
        }
      })
      return result
    }
  },
  watch: {
    CPlist: {
      immediate: true,
      deep: true,
      handler() {
        this.index = 0
      }
    }
  },
  methods: {
    /**
     * 获得一个UUID
     * @returns {string}
     */

    guid() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = Math.random() * 16 | 0,
          v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    },
    getData(arr, index) {
      let temp = arr[index]
      if (temp) return temp
      return null
    },
    factory(arr, arr2) {
      arr = arr || arr2
      let result = []
      for (let i = 0; i < this.totalRow; i++) {
        let temp = arr && arr[i]
        if (temp) result.push(temp)
        else result.push({
          columnNum: i,   // 位置
          isBig: false,
          isSmall: false,
          bigUse: false,
          topUse: false,
          bottomUse: false,
          useList: [],
          data: [
            // 原始数据
          ]
        })
      }
      return result
    },

  }
}
</script>
<template>
  <div class="location__alley">
    <div class="__left">
      <div class="__left__in">
        <div  class="YAxis" v-show="alleyIndex[0]">{{alleyIndex[0]}}</div>
        <Dot v-for="(item,index) in LEFT_IN_LIST"
             :key="index+'LEFT_IN_LIST'"
             :id="guid()"
             :is-big="item.isBig"
             :is-small="item.isSmall"
             :big-use="item.bigUse"
             :top-use="item.topUse"
             :bottom-use="item.bottomUse"
             :val="item"
        />
      </div>
      <div class="__left_out">
        <div  class="YAxis" v-show="alleyIndex[1]">{{alleyIndex[1]}}</div>
        <Dot v-for="(item,index) in LEFT_OUT_LIST"
             :key="index+'LEFT_OUT_LIST'"
             :id="guid()"
             :is-big="item.isBig"
             :is-small="item.isSmall"
             :big-use="item.bigUse"
             :top-use="item.topUse"
             :bottom-use="item.bottomUse"
             :val="item"
        />
      </div>
    </div>
    <div class="__right">
      <div class="__right__out">
        <div  class="YAxis" v-show="alleyIndex[2]">{{alleyIndex[2]}}</div>
        <Dot v-for="(item,index) in RIGHT_OUT_LIST"
             :id="guid()"
             :key='index +"RIGHT_OUT_LIST"'
             :is-big="item.isBig"
             :is-small="item.isSmall"
             :big-use="item.bigUse"
             :top-use="item.topUse"
             :bottom-use="item.bottomUse"
             :val="item"
        />
      </div>
      <div class="__right_in">
        <div  class="YAxis" v-show="alleyIndex[3]">{{alleyIndex[3]}}</div>
        <Dot v-for="(item,index) in RIGHT_IN_LIST"
             :id="guid()"
             :key="index  +'RIGHT_IN_LIST'"
             :is-big="item.isBig"
             :is-small="item.isSmall"
             :big-use="item.bigUse"
             :top-use="item.topUse"
             :bottom-use="item.bottomUse"
             :val="item"
        />
      </div>
    </div>
  </div>
</template>
<style lang="scss"
       scoped>
.location__alley {
  width: 300px;
  display: flex;

  .__left,
  .__right {
    display: flex;
    margin: 0 auto;
  }
}

.scaleX {
  position: relative;
  box-sizing: border-box;
  margin-left: 4px;
}

.scaleXItem {
  display: flex;
  justify-content: center;
  align-items: center;
  color: red;
}

.YAxis {
  width: 30px;
  height: 30px;
  margin: 10px;
  border: 1px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
}
</style>
