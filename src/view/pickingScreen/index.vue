<template>
  <div class="container">
    <div class="headerBoxpickScrenn">
      <!--   工作台     -->
      <div class="headerBox_right">
        <span>工作台：<b>{{ userInfo.workbenchCode }}</b></span>
        <span style="margin-left: 20px;">业务员：<b>{{ userInfo.userName }}</b></span>
      </div>
      <!--    料箱编码    -->
      <div style="width: 39%">
        <el-form
          @submit.native.prevent
          :inline="true"
          label-position="right"
          :model="screenFrom"
          :rules="rules"
          label-width="100px"
          ref="screenFrom"
          class="demo-form-inline screenFrom"
          size="large"
        >
          <el-form-item label="料箱编码"
                        prop="containerCode">
            <el-input
              ref="containerCode"
              placeholder="请输入料箱编码"
              v-model="screenFrom.containerCode"
              :clearable="true"
              @keyup.enter.native='containerCodeChange("screenFrom")'
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <!--   按钮   -->
      <div style="width: 20%;">
        <el-button
          class="rightBTN"
          type="primary"
          @click="containerCodeChange('screenFrom')"
        >确认
        </el-button>
        <el-button
          class="rightBTN"
          type="primary"
          @click="resetForm"
        >重置
        </el-button>
        <el-button
          class="rightBTN"
          @click="loginOut"
        >退出
        </el-button>
      </div>
    </div>
    <div class="nav_box">
      <!--   拣选盒子   -->
      <div class="currentTaskBox wh50">
        <div class="wh100">
          <div class="currentTaskBox_div_one bold f24">
            波次号：{{ bcFrom.waveNumber }}
          </div>
          <div class="currentTaskBox_div_two bold f24">
            <div class="currentTaskBox_div_two_div">
              任务号：{{ bcFrom.pickNo }}
            </div>
            <div class="currentTaskBox_div_two_div">
              任务分配序号：{{ bcFrom.sequenceNumber }}
            </div>
          </div>
          <div class="currentTaskBox_div_two bold f24">
            <div class="currentTaskBox_div_two_div">
              隔板标识：{{ bcFrom.cnumber }}
            </div>
            <div class="currentTaskBox_div_two_div">
              编码：{{ bcFrom.productCode }}
            </div>
          </div>
          <div class="currentTaskBox_div_one bold f24">
            名称：{{ bcFrom.productName }}
          </div>
          <div class="currentTaskBox_div_one bold f24">
            分配/实拣：{{ bcFrom.qty }} /
            <span class="currentTaskBox_div_one_span">{{ bcFrom.pickQty }}</span>
          </div>
        </div>
      </div>
      <!--   格子   -->
      <div class="cellBox wh50">
        <div v-if="boxList.length==0"
             class="cellBox_empty">
          <img src="@/assets/logo/nodata.jpg"
               v-if="boxList.length == 0"/>
        </div>
        <div
          v-else
          class="cellBox_gezi"
          v-for="(item,index) in boxList"
          :key="item.cargoLocationCode"
          :id="`id` + (index + 1)"
          v-bind:class="item.className"
        >
          <div class="cellBox_gezi_title cellBox_gezi_div">分播位：{{ item.cargoLocationCode }}</div>
          <div class="cellBox_gezi_title cellBox_gezi_div">{{ item.customerInfo }}</div>
          <div class="f20 bold cellBox_gezi_div">{{ item.taskCount }}/{{ item.taskCompeltedCount }}</div>
        </div>
      </div>
      <!--  序列号table   -->
      <div class="xlBox wh50">
        <div class="xlBox_header">
          <el-form
            :inline="true"
            label-position="right"
            :model="pickSerialNumber.from"
            :rules="pickSerialNumber.rules"
            label-width="100px"
            ref="screenFrom"
            class="demo-form-inline screenFrom"
            size="large"
            @submit.native.prevent
          >
            <el-form-item label="序列号"
                          prop="boxCode">
              <el-input
                ref="serialNumber"
                placeholder="请输入序列号"
                v-model="pickSerialNumber.from.serialNumber"
                :clearable="true"
                @keyup.enter.native='serialNumberChange'
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="xlBox_header">
          <el-table
            :data="pickSerialNumber.table.row"
            border
            style="width: 100%"
            height="250px"
          >
            <el-table-column
              v-for="colm in pickSerialNumber.table.header"
              :key="colm.prop"
              :prop="colm.prop"
              :label="colm.label"
              :width="colm.minWidth">
            </el-table-column>
          </el-table>
          <el-pagination
            style="margin-top: 10px"
            @size-change="handleSerialNumberSizeChange"
            @current-change="handleSerialNumberCurrentChange"
            :page-sizes="[10, 20, 30, 100]"
            :page-size="pickSerialNumber.table.paginations.limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pickSerialNumber.table.paginations.total">
          </el-pagination>
        </div>
        <el-row :gutter="20"
                class="xlBox_header_bottom">
          <el-col :span="16">
            <span class="f24 bold">本次任务：  {{ pickSerialNumber.from.taskCount }}  /
              {{ pickSerialNumber.from.compeltedCount }}</span>
          </el-col>
          <el-col :span="8">
            <el-button
              class="rightBTN"
              type="primary"
              @click="qhClick"
            >缺货提交
            </el-button>
          </el-col>
        </el-row>
      </div>
      <!-- 分配拣选任务信息       -->
      <div class="jxBox wh50">
        <el-row :gutter="20"
                style="margin-left: 0px !important;margin-right: 0px !important;"
                class="jxBox_top">
          <el-col :span="12">
            <span class="20 "
                  style="font-size: 18px;">分配拣选任务信息</span>
          </el-col>
          <el-col :span="12">
            <span class="f20 bold">剩余未拣任务：{{ JX.from.serialNumber }}</span>
          </el-col>
        </el-row>
        <div class="xlBox_header">
          <el-table
            :data="JX.table.row"
            border
            style="width: 100%"
            height="300px"
          >
            <el-table-column
              v-for="colm in JX.table.header"
              :key="colm.prop"
              :prop="colm.prop"
              :label="colm.label"
              :width="colm.minWidth">
            </el-table-column>
          </el-table>
          <el-pagination
            style="margin-top: 10px"
            @size-change="handleJXSizeChange"
            @current-change="handleJXCurrentChange"
            :page-sizes="[10, 20, 30, 100]"
            :page-size="JX.table.paginations.limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="JX.table.paginations.total">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import index from './index'
import http from './minxin/http'

export default {
  name: "pickingScreen",
  mixins: [index, http]
}
</script>
<style lang="scss"
       scoped>
.headerBoxpickScrenn {
  ::v-deep .el-form-item {
    width: 100%;
    margin-bottom: 0px !important;
  }

  ::v-deep .el-form-item__content {
    width: calc(100% - 100px) !important;
  }
}

.xlBox_header {
  ::v-deep .el-form-item {
    width: 100%;
    margin-bottom: 0px !important;
  }

  ::v-deep .el-form-item__content {
    width: calc(100% - 100px) !important;
  }
}

.jxBox_top {
  ::v-deep .el-row {
    margin-left: 0px !important;
    margin-right: 0px !important;
  }
}

.orangered {
  background: #dc3d00 !important;
  border: none;
  color: white;
}

.green {
  background: #03b803 !important;
  border: none;
  color: white;
}

.blue {
  background: #3199ff !important;
  border: none;
  color: white;
}

@import url('./index.scss');
</style>
