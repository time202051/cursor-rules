<template>
  <div>
    <div class="header"> 层 ：
      <div class="headerBox">
        <div v-for="i in layerNum"
             :class="{headerBoxItemClass: i == active}"
             @click="layerClick(i)">{{ i }}
        </div>
      </div>
    </div>
    <div class="mapBox">
      <div class="scaleX"
           v-if="this.warehouseFlage == 'YC'">
        <div v-for="(item,index) in 43"
             :style="{'top': item * 35 +5 +'px'}"
             class="boxitem scaleXItem"
        >
          {{ item }}
        </div>
      </div>
      <div v-if="this.warehouseFlage == 'YC'"
           class="roadWayCode">
        <div v-for="(item,index) in list "
             :key="index"
             class="roadWayCodeBox">
          <div class="roadway0">
            <div class="roadway0Item">
              <div class="boxitem">3</div>
              <itemTemplate :obj="item.objList0.bigLeftListIn"></itemTemplate>
            </div>
            <div class="roadway0Item">
              <div class="boxitem">1</div>
              <itemTemplate :obj="item.objList0.bigLeftListOut"></itemTemplate>
            </div>
            <div class="roadway "></div>
            <div class="roadway0Item">
              <div class="boxitem">2</div>
              <itemTemplate :obj="item.objList0.bigRightListOut"></itemTemplate>
            </div>
            <div class="roadway0Item">
              <div class="boxitem">4</div>
              <itemTemplate :obj="item.objList0.bigRightListIn"></itemTemplate>
            </div>
          </div>
        </div>
        <div style="width: 800px;">
          <div style="display: flex;margin-top: 10px">
            <span style="font-size: 16px">空闲：</span>
            <div style="    width: 30px;
                  height: 30px;
                  border: 1px solid #ccc;"></div>
          </div>
          <div style="display: flex;margin-top: 10px">
            <span style="font-size: 16px">有货：</span>
            <div style="    width: 30px;
                  height: 30px;
                  border: 1px solid #ccc;"
                 class="green"></div>
          </div>
          <div style="display: flex;margin-top: 10px">
            <span style="font-size: 16px">占用：</span>
            <div style="    width: 30px;
                  height: 30px;
                  border: 1px solid #ccc;"
                 class="greenBorderRed"></div>
          </div>
          <div style="display: flex;margin-top: 10px">
            <span style="font-size: 16px">禁用：</span>
            <div style="    width: 30px;
                  height: 30px;
                  border: 1px solid #ccc;"
                 class="enable"></div>
          </div>
        </div>
      </div>
      <div v-if="this.warehouseFlage == 'CP'"
           style=" display: flex;">
        <div style="width: 50px;">
          <div style="width: 30px;
              height: 30px;
              margin: 10px;border: 1px solid #ccc;display: flex;
              justify-content: center;
              align-items: center;
              font-size: 14px;"
               v-for="(item,index) in max+1"
          >
            {{ index }}
          </div>
        </div>
        <Alley
          ref="Alley"
          v-for="(data,dataindex) in CPlist"
          :CPlist="data"
          :key="dataindex"
          :total-row="max"/>
        <div style="width: 100px;">
          <div style="display: flex;margin-top: 10px">
            <span style="font-size: 16px">空闲：</span>
            <div style="    width: 30px;
                  height: 30px;
                  border: 1px solid #ccc;"></div>
          </div>
          <div style="display: flex;margin-top: 10px">
            <span style="font-size: 16px">有货：</span>
            <div style="    width: 30px;
                  height: 30px;
                  border: 1px solid #ccc;"
                 class="green"></div>
          </div>
          <div style="display: flex;margin-top: 10px">
            <span style="font-size: 16px">占用：</span>
            <div style="    width: 30px;
                  height: 30px;
                  border: 1px solid #ccc;"
                 class="greenBorderRed"></div>
          </div>
          <div style="display: flex;margin-top: 10px">
            <span style="font-size: 16px">禁用：</span>
            <div style="    width: 30px;
                  height: 30px;
                  border: 1px solid #ccc;"
                 class="enable"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {warehouse} from '@/api/request/swagger'
import minxin from './index.js'
import itemTemplate from './template/item'
import Alley from './template/location-alley'

export default {
  name: 'cargoLocationMap',
  mixins: [minxin],
  components: {
    itemTemplate, Alley
  },
  data() {
    return {
      list: [],//处理的格子数据
      maxRow: 0,//最大列
      layerNum: 19, //总共层数
      active: 1,//点击事件 添加样式标识
      warehouseFlage: 'YC',//仓库标识
      CPlist: [],
      max: 0

    }
  },
  mounted() {
    let wms = JSON.parse(localStorage.getItem('wms'))
    this.warehouseFlage = wms.warehouseFlage
    this.layerNum = wms.warehouseFlage == 'YC' ? 19 : 21
    this.getMap()

  },

  methods: {
    getClass(obj) {
      let msg = "";
      if (obj.enabled) {
        if (obj.usageStatus == 0 && obj.loadStatus == 1) msg = 'green'; //绿色背景无边框
        if (obj.usageStatus != 0 && obj.loadStatus == 0) msg = 'whiteBorderRed'; //边框颜色
        if (obj.usageStatus != 0 && obj.loadStatus == 1) msg = 'greenBorderRed'; //背景
        if (obj.usageStatus == 0 && obj.loadStatus == 0) msg = 'empty'; //背景
      } else {
        msg = 'enable'; //置灰
      }
      return msg
    },
    layerClick(layer) {
      this.active = layer
      this.getMap(layer)
    },
    getMap(layer = 1) {
      this.post({
        url: warehouse.map + '?layer=' + layer,
        isLoading: true,
        data: {layer: layer}
      }).then(res => {
        this.max = Math.max(...res.result.map(item => item.columnNum))
        if (this.warehouseFlage == 'YC') return this.YCResult(res)
        res.result.forEach(item => {
          // if (item.code == "1-1-2-1-1") {
          //   item.enabled = true
          //   item.loadStatus = 1
          //   item.usageStatus = 0
          // }
          // if (item.code == "1-1-2-1-2") {
          //   item.enabled = false
          //   item.loadStatus = 0
          //   item.usageStatus = 4
          // }
          item.className = this.getClass(item)
        })
        if (this.warehouseFlage == 'CP') return this.CPResult(res.result)
      })
    },
    CPResult(res) {
      this.group(res)

    },
    factory(obj, type, item) {
      const columnNum = (item.columnNum - 1)
      let temp = null
      if (!obj[type]) obj[type] = []
      temp = obj[type]
      if (!temp[columnNum]) {
        temp[columnNum] = {
          columnNum,   // 位置
          isBig: false,
          isSmall: false,
          bigUse: false,
          topUse: false,
          bottomUse: false,
          useList: [],
          data: [
            // 原始数据
          ]
        }
      }
      const uiData = temp[columnNum]
      this.use(uiData, item)
      uiData.isBig = this.isBig(uiData, item)
      uiData.isSmall = !uiData.isBig
      uiData.bigUse = this.bigUse(uiData)
      uiData.topUse = this.topUse(uiData)
      uiData.bottomUse = this.bottomUse(uiData)
      uiData.data.push(item)

    },
    use(uiData, item) {
      if (item.usageStatus !== 0) {
        uiData.useList.push(item)
      }
    },
    isBig(uiData, item) {
      if (uiData.isBig) return true
      return item.aBsize === '0'
    },
    bigUse(uiData) {
      return (uiData.isBig && uiData.useList.length > 0)
    },
    topUse(uiData) {
      if (uiData.isBig) return false
      return uiData.useList.length > 0
    },
    bottomUse(uiData) {
      if (uiData.isBig) return false
      return uiData.useList.length > 1
    },
    group(arr) {
      let group = arr.reduce((pre, item) => {
        const code = item.roadWayCode // 巷道编号
        if (!pre[code]) pre[code] = {} //
        const x = pre[code] // 巷道数据

        const roadWay = item.roadWayDirectionName.toUpperCase() // 过道左 or 过道右
        const type = item.locationTypeName.toUpperCase()  // W=外, L=里, D=?
        if (!x[roadWay]) x[roadWay] = {}
        this.factory(x[roadWay], type, item)
        x.dotSize = Object.keys(x).map(x_num => {
          /*
           * x = 巷道
           * x_num = 巷道数据 LEFT/RIGHT/dotSize
           */
          // 返回每个巷道的列数
          return Object.keys(x[x_num]).length
        }).reduce((a, b) => a + b)  // 巷道大小
        Object.keys(pre).reduce((start, x2) => {
          pre[x2].start = start
          return pre[x2].dotSize + start
        }, 1)
        return pre
      }, {})
      this.CPlist = group;
      // console.log(group, 'group')
    },
  },
}
</script>
<style scoped>
@import url('./index.scss');

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
  border: 1px solid red !important;
}
</style>
