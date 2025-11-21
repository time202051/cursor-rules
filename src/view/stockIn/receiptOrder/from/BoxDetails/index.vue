<template>
  <div>
    <el-dialog
      title="箱号详情"
      :visible.sync="form.dialogFormVisible"
      :close-on-click-modal="false"
      v-el-drag-dialog
      :width="form.width || '45%'"
      :show-close="true"
      top="20vh"
    >
      <el-table
        :data="getTableData"
        :cell-class-name="tableCellClassName"
        class="table"
      >
        <el-table-column prop="box" label="箱号"></el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="form.dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="boxConfirm">确 定 </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "BoxDetailsTemplate",
  props: {
    form: Object,
  },
  computed: {
    getTableData() {
      if (this.form.tableData.length) {
        return this.form.tableData.map((item) => {
          return {
            box: item,
          };
        });
      }
      return [];
    },
  },
  data() {
    return {};
  },
  methods: {
    handleClick(val) {
      this.form.tableData = this.form.tableData.filter((item, index) => {
        return index != val.index;
      });
    },
    tableCellClassName({ row, column, rowIndex, columnIndex }) {
      row.index = rowIndex;
      column.index = columnIndex;
    },
    boxConfirm() {
      this.$emit("getBoxTableData", this.form.tableData);
      this.form.dialogFormVisible = false;
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep .table.el-table {
  td {
    padding: 0px;
    div {
      line-height: 28px;
      font-size: 12px;
    }
  }
  th {
    padding: 0px;
    background: #f5f7fa;
    div {
      line-height: 28px;
      font-weight: 400;
      color: #333;
      font-size: 12px;
    }
  }
}
</style>
