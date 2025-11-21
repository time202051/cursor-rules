<template>
  <div class="main-content">
    <div id="sample">
      <div class="row g-3 draw-container">
        <div class="col-2 meta-container">
          <div class="tabs">
            <div class="tab">
              <input type="radio"
                     id="rd1"
                     name="rd"
                     checked="true"/>
              <label class="tab-label"
                     for="rd1">堆垛机</label>
              <div class="tab-content">
                <div
                  id="myPaletteSmall"
                  style="width: 140px; height: 340px"
                ></div>
              </div>
            </div>
            <div class="tab">
              <input type="radio"
                     id="rd2"
                     name="rd"/>
              <label class="tab-label"
                     for="rd2">输送线</label>
              <div class="tab-content">
                <div
                  id="myPaletteTall"
                  style="width: 140px; height: 340px"
                ></div>
              </div>
            </div>
            <div class="tab">
              <input type="radio"
                     id="rd3"
                     name="rd"/>
              <label class="tab-label"
                     for="rd3">RGV</label>
              <div class="tab-content">
                <div
                  id="myPaletteWide"
                  style="width: 140px; height: 340px"
                ></div>
              </div>
            </div>
            <div class="tab">
              <input type="radio"
                     id="rd4"
                     name="rd"/>
              <label class="tab-label"
                     for="rd4">其它设备</label>
              <div class="tab-content">
                <div
                  id="myPaletteBig"
                  style="width: 140px; height: 340px"
                ></div>
              </div>
            </div>
            <div class="tab">
              <input type="radio"
                     id="rd5"
                     name="rd"/>
              <label class="tab-label"
                     for="rd5">文本</label>
              <div class="tab-content">
                <div
                  id="myPaletteText"
                  style="width: 140px; height: 340px"
                ></div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-10 canvas-container">
          <div id="myDiagramDiv"
               class="canvas"></div>
        </div>
        <div class="col inspector-container">
          <div id="myInspectorDiv"
               class="inspector"></div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div class="map-list-tab">
            <div class="row align-items-center">
              <div class="col">
                <div class="floor-list"
                     id="mapListDom">
                  <!-- <button
                    type="button"
                    class="btn floor-list-items btn-secondary btn-success"
                    data-index="1"
                  >
                    楼层1
                  </button> -->
                </div>
              </div>
              <div class="col-2">
                <div class="input-group">
                  <input
                    type="number"
                    id="inputFloorValue"
                    class="form-control"
                    placeholder="楼层序号"
                    aria-describedby="button-addon2"
                  />
                  <button
                    class="btn btn-outline-secondary"
                    type="button"
                    id="button-addon2"
                    @click="addNewMap()"
                  >
                    新增
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="draw-btn-list">
        <div class="row">
          <div class="col">
            <button
              type="button"
              class="btn btn-outline-primary"
              @click="clearMap()"
            >
              清空
            </button>
            <button
              type="button"
              class="btn btn-outline-primary"
              @click="saveMap()"
            >
              保存
            </button>
            <!-- <button
              type="button"
              class="btn btn-outline-primary"
              @click="generateCode()"
            >
              生成地图
            </button> -->
          </div>
          <div class="col"
               style="text-align: right">
            <button
              type="button"
              class="btn btn-outline-primary"
              @click="exportMap()"
            >
              导出
            </button>
            <button
              type="button"
              class="btn btn-outline-primary"
              @click="importMap()"
            >
              导入
            </button>
          </div>
        </div>
      </div>
      <div class="row"
           style="padding: 10px 0">
        <div class="col">
          <pre id="savedModel"
               style="display: none"></pre>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import go from 'gojs'
import common from './js/common.js' //在export default前
import convert from './js/convert.js' //在export default前
import example from './js/example.js' //在export default前
import extend from './js/extend.js' //在export default前
import index from './js/index.js' //在export default前
const $ = go.GraphObject.make;
export default {

  data() {
    return {
      originalMapDataJson: '',//gojs原始对象
      exportMapDataJson: null,// 导出配置
      importMapDataJson: null,// 导入配置
      floorItems: {},//平面图数组
      currentFloor: 1,//当前楼层
    }
  },
  mixins: [common, convert, example, extend, index],
  mounted() {
  },
  methods: {}
}
</script>
<style scoped>
@import "./gojs/DataInspector.css";
@import './styles/extend.css';
@import './styles/origin.css';
</style>

