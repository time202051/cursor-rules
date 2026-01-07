<template>
  <div>
    <el-table :data="data" border style="width: 100%" :max-height="500">
      <el-table-column type="index" width="50" label="行号"></el-table-column>
      <el-table-column prop="productCode" label="零件编码"> </el-table-column>
      <el-table-column prop="productName" label="零件名称"> </el-table-column>
      <el-table-column prop="unite" label="基本单位"> </el-table-column>
      <el-table-column prop="pacakger" label="包装率"> </el-table-column>
      <el-table-column prop="pUnite" label="整件单位"> </el-table-column>
      <el-table-column prop="batchNo" label="批次"> </el-table-column>
      <el-table-column prop="spullierBatchNo" label="供应商批次">
      </el-table-column>
      <el-table-column prop="reciveTime" label="收货日期"> </el-table-column>
      <el-table-column prop="referenceNo" label="参考号"> </el-table-column>
      <el-table-column prop="requiredQty" label="需求数量"> </el-table-column>
      <el-table-column prop="distributedQty" label="分配数量">
      </el-table-column>
      <el-table-column prop="pickQty" label="领料数量"> </el-table-column>
      <el-table-column prop="remark" label="明细备注"> </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: "DetailList",
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {};
  },
};
</script>
