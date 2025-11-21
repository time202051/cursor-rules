<template>
  <div>
    <el-dialog
      title="班次设置"
      top="5vh"
      width="55%"
      :visible.sync="form.dialogFormVisible"
      @open="handleOpen"
    >
      <!--表单-->
      <el-form
        ref="from"
        :model="from"
        :rules="rules"
        label-width="130px"
        style="display: flex; flex-wrap: wrap"
      >
        <el-form-item label="班次名称" prop="name" style="width: 100%">
          <el-input
            placeholder="请输入班次名称"
            v-model="from.name"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="开始时间" prop="startTime" style="width: 38%">
          <el-time-picker
            v-model="from.startTime"
            value-format="HH:mm"
            format="HH:mm"
            placeholder="开始时间"
            style="width: 100%"
          >
          </el-time-picker>
        </el-form-item>
        <el-form-item label="结束时间" prop="endTime" style="width: 38%">
          <el-time-picker
            v-model="from.endTime"
            value-format="HH:mm"
            format="HH:mm"
            placeholder="结束时间"
            style="width: 100%"
          >
          </el-time-picker>
        </el-form-item>
        <div style="width: 24%; text-align: right">
          <el-button type="primary" @click="add">添加</el-button>
          <el-button type="primary" @click="cut">删除</el-button>
        </div>
      </el-form>
      <el-divider />
      <!--  表格  -->
      <MyTable
        :paginations="{}"
        :btnlist="[]"
        :emptyImg="tableData.emptyImg"
        :tableData="tableData"
        :multipleSelection="multipleSelection"
        @SelectionChange="SelectionChange"
        class="sh-table"
      >
      </MyTable>
    </el-dialog>
  </div>
</template>
<script>
import { Basic } from "@/api/request/swagger";
export default {
  props: {
    form: Object,
  },
  data() {
    return {
      multipleSelection: [],
      from: {
        startTime: "",
        endTime: "",
        name: "",
      },
      rules: {
        startTime: [{ required: true, message: "必填", trigger: "blur" }],
        endTime: [{ required: true, message: "必填", trigger: "blur" }],
        name: [{ required: true, message: "必填", trigger: "blur" }],
      },
      tableData: {
        loading: false,
        emptyImg: true,
        options: {
          selection: true, //多选框
          index: null, //序号
          headTool: false, //开启头部工具栏
          refreshBtn: false, //开启表格头部刷新按钮
          downloadBtn: false, //开启表格头部下载按钮
        }, //序号和复选框
        rows: [], //表数据
        columns: [
          {
            label: "",
            minWidth: "",
            type: "selection",
            show: true,
          },
          {
            prop: "teamName",
            label: "班次名称",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "workStartTime",
            label: "开始时间",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "workEndTime",
            label: "结束时间",
            minWidth: "",
            sortable: false,
            show: true,
          },
        ], //表头
        operates: [], //表格里面的操作按钮
        tableHeightDiff: 550,
      },
    };
  },
  methods: {
    getTable() {
      this.get({
        url: Basic.getClassesList,
        isLoading: true,
        data: Object.assign(this.from, {
          WarehouseId: this.form.row.id,
        }),
      }).then((res) => {
        this.tableData.rows = res.result;
        this.tableData.emptyImg = true;
      });
    },
    SelectionChange(row) {
      this.multipleSelection = row;
    },
    add() {
      this.$refs.from.validate((valid) => {
        if (valid) {
          this.post({
            url: Basic.getClassesList,
            data: {
              warehouseId: this.form.row.id,
              teamName: this.from.name,
              workStartTime: this.from.startTime,
              workEndTime: this.from.endTime,
            },
            isLoading: true,
          }).then((res) => {
            this.from = {
              name: "",
              startTime: "",
              endTime: "",
            };
            this.getTable();
            // this.form.dialogFormVisible = false;
            this.$message({
              type: "success",
              message: "操作成功!",
            });
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    cut() {
      let data = this.multipleSelection;
      if (data.length == 0 || data.length > 1) {
        return this.$message.info("请选择一条数据");
      }
      this.post({
        url: `${Basic.deleteClasses}/${data[0].id}`,
        isLoading: true,
      }).then((res) => {
        this.getTable();
        this.$message({
          type: "success",
          message: "删除成功!",
        });
      });
    },
    handleOpen() {
      this.tableData.rows = [];
      this.from = {
        name: "",
        startTime: "",
        endTime: "",
      };
      this.$nextTick(() => {
        this.$refs.from.clearValidate();
      });
    },
  },
};
</script>
<style scoped lang="scss">
::v-deep .el-divider--horizontal {
  margin: 0;
}
</style>
