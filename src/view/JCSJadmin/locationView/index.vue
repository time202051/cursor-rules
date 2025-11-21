<template>
  <div>
    <div class="location250424">
      <div class="roadway250424">
        <template v-for="(item, index) in roadways">
          <div>
            <el-button @click="roadwayActive(item, index)"
              :style="{ background: index == choseroadwayidx ? '#42b983' : 'none', color: !item.enabled ? '#FF6347' : (index == choseroadwayidx ? '#fff' : '#333') }">{{
              item.code }}</el-button>

          </div>
        </template>
      </div>


      <div class="view250424">

        <template v-for="(floor, index) in finalResult">

          <div class="head250425" v-if="index == 0">
            <div class="div250425"  v-for="idx in columnNumMax" :class="{
              div25042501: finalResultDs.find(x => x.columnNum === idx) !== undefined && finalResultDs.find(x => x.columnNum === idx).containerTypeCode === '1001',
              div25042502: finalResultDs.find(x => x.columnNum === idx) !== undefined && finalResultDs.find(x => x.columnNum === idx).containerTypeCode === '1002',
            }">
              {{ String(idx).padStart(2, "0") }}
            </div>

          </div>
          <div class="floor250424" :class="{
            left25042401:
              (finalResult.length <= 2 && index < 1) ||
              (finalResult.length > 2 && index < 2),
          }">
            <div class="pai250425">
              第
              <div style="display: inline; writing-mode: horizontal-tb">
                {{ floor["1"]["1"][0].floorNum }}
              </div>
              排
            </div>
            <div v-for="(layer,index2) in floor" class="layer250424">
              <div class="lthead250425">

                {{ String(layer["1"][0].layerNum).padStart(2, "0") }}
              </div>
              <div v-for="col in layer" class="col250424"
                :style="{ width: ((17 * col.length) * (col.some(x => x.containerTypeCode === '1002') ? 1.5 : 1)) + 'px' }">

                <div v-for="cols in col" class="cols250424" :class="[
                  {
                    load250425: cols.loadStatus > 0,
                    use250425: cols.usageStatus > 0,
                    emptym: cols.isLoadEmpty && cols.loadEmptyType == 1,
                    emptyz: cols.isLoadEmpty && cols.loadEmptyType == 0
                  },
                  'use250816' + cols.usageStatus
                ]" style="width: 100%;">
                  <div v-if="!cols.enabled && cols.hasCargo"
                    style="display: flex;justify-content: center;align-items: center;height: 18px;">
                    <i class="el-icon-lock" style="color:red" />
                  </div>
                  <!-- {{ cols.columnNum }} -->
                  <el-tooltip class="item" effect="dark" placement="top" v-if="cols.hasCargo">
                    <div slot="content">
                      库位名称：{{ cols.warehouseLocationName }}<br/>
                      库位编码：{{ cols.warehouseLocationCode }}<br/>
                      承载状态：{{ cols.loadStatusDesc }}<br/>
                      使用状态：{{ cols.usageStatusDesc }}<br/>
                      通道状态：{{ cols.wayTypeDesc }}<br/>
                      是否启用：{{ cols.enabledDesc }}
                    </div>
                    <div style="width: 100%;height: 100%;cursor: pointer;"></div>
                  </el-tooltip>
                  <div v-if="!cols.hasCargo"
                    style="display: flex;justify-content: center;align-items: center;height: 18px;">
                    X
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="
            !(
              (finalResult.length <= 2 && index == 0) ||
              (finalResult.length > 2 && index == 1)
            ) && index + 1 < finalResult.length
          " style="border-bottom: 1px dashed #333; margin: 5px 5px"></div>
          <div v-if="
            (finalResult.length <= 2 && index == 0) ||
            (finalResult.length > 2 && index == 1)
          " style="margin: 5px 0px">
            巷道:{{ roadWayName }}
          </div>
        </template>
      </div>
      <div class="tips">


        <div class="tip">
          <div class="enabled250425"></div>
          <span>禁用</span>
        </div>
        <div class="tip">
          <div class="use2508161"></div>
          <span>入库单占用</span>
        </div>

        <div class="tip">
          <div class="use2508162"></div>
          <span>出库单占用</span>
        </div>

        <div class="tip">
          <div class="use2508163"></div>
          <span>盘点单占用</span>
        </div>

        <div class="tip">
          <div class="use2508164"></div>
          <span>移库单占用</span>
        </div>

        <div class="tip">
          <div class="use2508165"></div>
          <span>空容器业务占用</span>
        </div>

        <div class="tip">
          <div class="use25081610"></div>
          <span>IQC质检占用</span>
        </div>

        <div class="tip">
          <div class="use25081611"></div>
          <span>PDA取货占用</span>
        </div>
        <div class="tip">
          <div class="use25081612"></div>
          <span>拣选回库占用</span>
        </div>
        <div class="tip">
          <div class="use25081617"></div>
          <span>隔离单出库占用</span>
        </div>

        <div class="tip">
          <div class="emptym"></div>
          <span>载母托盘</span>
        </div>
        <div class="tip">
          <div class="emptyz"></div>
          <span>载子托盘</span>
        </div>
        <div class="tip">
          <div class="load250425"></div>
          <span>载货</span>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import minxin from "./index.js";
export default {
  name: "locationViewManagement",
  mixins: [minxin],
  mounted() {

  },
  data() {
    return {};
  },
  methods: {},
};
</script>
<style lang="scss">
.location250424 {
  overflow: auto;
  position: relative;
  height: 100vh;
  display: flex;
}

.roadway250424 {
  padding: 10px;
  /* display: flex; */
}

.tips {
  font-size: 12px;
  display: flex;
  position: sticky;
  top: 20px;
  right: 0;
  margin-top: 20px;
  justify-content: flex-end;
  flex-direction: column-reverse;

  .tip {
    display: flex;
    width: 120px;
    height: 15px;
    margin: 5px;

    div {
      width: 30px;
      height: 100%;
    }

    span {
      margin-left: 4px;
      display: block;
    }

    ;
  }
}

.view250424 {
  /* display: flex; */

  padding: 10px 10px 10px 80px;

  .head250425 {
    display: flex;

    .div250425 {
      /* border:1px solid #333; */
      margin: 1px;
      width: 51px;
      font-size: 12px;
      text-align: center;
    }

    .div25042501 {
      width: 17px;
    }

    .div25042502 {
      width: 25.5px;
    }
  }

  .floor250424 {
    position: relative;

    .lthead250425 {
      width: 40px;
      height: 25.5px;
      position: absolute;
      left: -40px;
      text-align: center;
      font-size: 12px;
      line-height: 25.5px;
      /* top:0px; */
    }

    .pai250425 {
      position: absolute;
      top: 47%;
      left: -70px;
      writing-mode: vertical-rl;
      /* 文字从上到下，从右到左排列 */
    }

    .layer250424 {
      display: flex;

      .col250424 {
        display: flex;
        border: 1px solid #333;
        margin: 1px;
        width: 50px;
        height: 25.5px;

        .cols250424 {
          font-size: 10px;
          position: relative;
          /* width:40px; */
          height: 23.5px;

        }

        .cols250424::after {
          position: absolute;
          content: "";
          display: block;
          width: 1px;
          height: 15.5px;
          border-right: 1px dashed #333;
          top: 2.75px;
          right: 0px;
        }

        .cols250424:last-child::after {
          display: none;
        }

      }
    }
  }

  .left25042401 {
    display: flex;
    flex-direction: column-reverse;
    width: 200px;

    .lthead250425 {
      width: 40px;
      height: 25.5px;
      flex-shrink: 0;
    }

    .layer250424 {
      .col250424 {
        flex-shrink: 0;
        width: 50px;
      }
    }

  }

}

.load250425 {
  background-color: #99CC66;
}

.use2508161 {
  background-color: rgb(247, 0, 255);
}

.use2508162 {
  background-color: #FFBC52;
}

.use2508163 {
  background-color: #9B59B6;
}

.use2508164 {
  background-color: #2ECC71;
}

.use2508165 {
  background-color: #BDC3C7;
}

.use25081610 {
  background-color: rgb(240, 10, 10);
}

.use25081611 {
  background-color: #1ABC9C;
}

.use25081612 {
  background-color: rgb(23, 6, 248);
}

.use25081617 {
  background-color: rgb(238, 122, 109);
}

.enabled250425 {
  background-color: #FF6347;
}

.emptyz {
  background-color: #B3E0FF;
}

.emptym {
  background-color: #3399CC;
}

.rectangle-container {
  position: relative;
}

.rectangle-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 120px;
  height: 80px;
  background: linear-gradient(to bottom left,
      #ffffff 0%,
      #ffffff calc(50% - 1px),
      #e74c3c calc(50% - 1px),
      #ffffff calc(50% + 1px),
      #ffffff calc(50% + 1px),
      #ffffff 100%);
}

.text-above {
  position: absolute;
  bottom: 15%;
  left: 25%;
}

.text-below {
  position: absolute;
  top: 15%;
  right: 25%;
}
</style>
