<template>
  <div>
    <FormSearch
      :form-search-data="formSearchData"
      @handleSearch="handleSearch"
      @handleReset="handleReset"

    />
    <!--  :tableSearchSlice="9"  默认展开9条数据 -->
    <MyTable
      :paginations="paginations"
      :btnlist="this.hasBtn(this)"
      :emptyImg="tableData.emptyImg"
      :tableData="tableData"
      :multipleSelection="multipleSelection"
      @SelectionChange="SelectionChange"
      @handleSizeChange="handleSizeChange"
      @handleindexChange="handleindexChange"
    >
    </MyTable>
    <dialogTemplate
      :form="form"
      @submitForm="submitForm"
      @resetForm="resetForm"
    >
    </dialogTemplate>
  </div>
</template>

<script>
import { AGV, Stacker, Task } from "@/api/request/swagger";
import minxin from "./index.js";
export default {
  name: "warehouseregionManagement",
  mixins: [minxin],
  mounted() {
    this.getTable();
    this.getSelect();
    // console.log(this.hasBtn(this));
  },
  data() {
    return {
      multipleSelection: [],
    };
  },
  methods: {
    getTable() {
      let timer = this.formSearchData.value.timer;
      this.formSearchData.value.StartTime = timer ? timer[0] : "";
      this.formSearchData.value.EndTime = timer ? timer[1] : "";
      this.get({
        url: Stacker.GetWmstasklist,
        isLoading: true,
        data: Object.assign(this.formSearchData.value, {
          Page: this.paginations.page,
          MaxResultCount: this.paginations.limit,
        }),
      }).then((res) => {
        this.tableData.rows = res.result.items;
        this.paginations.total = res.result.totalCount;
        this.tableData.emptyImg = true;
      });
    },
    getSelect() {
      //任务类型下拉
      this.get({
        url: Task.taskType,
      }).then((res) => {
        this.Handle_Select({
          keyword: "TaskType",
          handleData: this.formSearchData.tableSearch,
          list: res.result,
          config: { type: "inputType", prop: "value", children: "children" },
        });
      });




      //所属区域下拉
      // this.get({
      //   url: ILT.regionSelect,
      // }).then((res) => {
      //   this.Handle_Select({
      //     keyword: "regionId",
      //     handleData: this.form.model,
      //     list: res.result,
      //     config: { type: "type", prop: "prop", children: "child" },
      //   });
      // });
      //等级下拉
      //   this.get({
      //     url: PublicAggregate.rankSelect,
      //   }).then((res) => {
      //     this.Handle_Select({
      //       keyword: "rankId",
      //       handleData: this.form.model,
      //       list: res.result,
      //       config: { type: "type", prop: "prop", children: "child" },
      //     });
      //   });
    },
    SelectionChange(row) {
      this.multipleSelection = row;
    },
    handleSearch(from) {
      var self = this;
      self.formSearchData.value = { ...from };
      self.paginations.page = 1;
      this.getTable();
    },
    handleReset() {},
    handleSizeChange(val) {
      this.paginations.page = 1;
      this.paginations.limit = val;
      this.getTable();
    },
    handleindexChange(val) {
      this.paginations.page = val;
      this.getTable();
    },
    resetForm() {
      this.form.dialogFormVisible = false;


    },
    submitForm(form) {
      let data = {
        ...this.form.value,
      };
      //解构赋值
      // 正则，0-9的数字，如果是多个数字用逗号隔开，注意是英文下的逗号
      if (!/^[0-9]+(,[0-9]+)*$/.test(data.layers)) {
        return this.$message({
          type: "error",
          message: "请输入正确格式：1,2,3,4  ( 注：逗号是英文格式)",
        });
      }
      let arrold = data.layers.split(",");
      // arrold.map()返回一个装有layers的新数组，parseInt() 解析字符串，返回整数
      let arrnew = arrold.map((item) => parseInt(item));
      data.layers = arrnew;
      this.post({
        url: this.form.requestData.url,
        data: data,
        isLoading: true,
      }).then((res) => {
        this.form.requestData.fn();
        this.form.dialogFormVisible = false;
        this.$message({
          type: "success",
          message: "操作成功!",
        });
      });
    },
    //申请巷道
    applyFor() {

       this.form.model = [
        {
          label: "仓库",
          type: "input",
          prop: "warehouseTypeDesc",
          readonly: true, //不可填
        },

        {
          label: "任务号",
          type: "input",
          prop: "taskNo",
          readonly: true, //不可填
        },
        {
          label: "可用通道",
          type: "input",
          prop: "layers",
          // readonly: true,//不可填
        },
        // {
        //   label: "入库口",
        //   type: "input",
        //   prop: "EntranceCode",
        // },
      ];
      this.form.value = {
        warehouseTypeDesc: "",
        taskNo: "",
        layers: "",
        // EntranceCode: "",
      };

      let data = this.multipleSelection;
      if (data.length == 0 || data.length > 1)
        return this.$message.info("请选择一条数据");
      this.form.dialogFormVisible = true;
      this.form.value.taskNo = data[0].taskNo;
      this.form.value.warehouseType = data[0].warehouseType;
      this.form.value.warehouseTypeDesc = data[0].warehouseTypeDesc;
      this.form.requestData = {

        // 标识
        flage: "autoArrange",
        url: Stacker.applyRoadWay,
        fn: this.getTable,
      };
    },
    // 申请库位
    cargo() {
      this.form.model = [
        {
          label: "仓库",
          type: "input",
          prop: "warehouseTypeDesc",
          readonly: true, //不可填
        },

        {
          label: "任务号",
          type: "input",
          prop: "taskNo",
          readonly: true, //不可填
        },
        {
          label: "可用层",
          type: "input",
          prop: "layers",
          // readonly: true,//不可填
        },
        // {
        //   label: "入库口",
        //   type: "input",
        //   prop: "EntranceCode",
        // },
      ];
      this.form.value = {
        warehouseTypeDesc: "",
        taskNo: "",
        layers: "",
        // EntranceCode: "",
      };
      //  选中一条数据
      let data = this.multipleSelection;
      if (data.length == 0 || data.length > 1)
        return this.$message.info("请选择一条数据");
        // 打开弹窗
      this.form.dialogFormVisible = true;
      // 赋值
      this.form.value.taskNo = data[0].taskNo;
      // this.form.value.layers =  [parseInt(data[0].layer)];
      this.form.value.warehouseType = data[0].warehouseType;
      this.form.value.warehouseTypeDesc = data[0].warehouseTypeDesc;

      this.form.requestData = {
          flage: "autoArrange",
        url: Stacker.applyLocation,
        fn: this.getTable,
      };
    },
    // 任务完成
    taskYES() {
      let data = this.multipleSelection;
      if (data.length == 0 || data.length > 1)
        return this.$message.info("请选择一条数据");
      this.$confirm("此操作将完成该任务, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.post({
            url: Stacker.wcstaskConfirm,
            data: {
              taskNo: data[0].taskNo,
              warehouseType: data[0].warehouseType,
              // method: "end",
              // cache: "true"
            },
          }).then((res) => {
            this.getTable();
            this.$message.success("操作成功");
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作",
          });
        });
    },

    // taskYES() {
    //   let data = this.multipleSelection;
    //   if (data.length == 0 || data.length > 1)
    //     return this.$message.info("请选择一条数据");
    //   this.form.dialogFormVisible = true;
    //   this.form.value = {
    //     taskCode: data[0].taskNo,
    //     method: "end",
    //   };

    // },
    // 任务取消
    taskEND() {
      let data = this.multipleSelection;
      if (data.length == 0 || data.length > 1)
        return this.$message.info("请选择一条数据");
      this.$confirm("此操作将永久取消该任务, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
      .then(() => {
        this.post({
          url: Task.cancel ,
          data:{
            taskNo: data[0].taskNo
          }
        }).then((res) => {
          this.getTable();
          this.$message.success("操作成功");
        });
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "已取消操作",
        });
      });
    },
    // 任务置顶
    taskTOP() {
      let data = this.multipleSelection;
      if (data.length == 0 || data.length > 1)
        return this.$message.info("请选择一条数据");
      this.$confirm("此操作将永久置顶该任务, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.post({
            url: AGV.tasktop + "/" + data[0].taskNo,
          }).then((res) => {
            this.getTable();
            this.$message.success("操作成功");
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作",
          });
        });
    },
    // 任务补发
    Resend() {
      let data = this.multipleSelection;
      if (data.length == 0 || data.length > 1)
        return this.$message.info("请选择一条数据");
      this.$confirm("此操作将永久补发该任务, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.post({
            url: AGV.Resend + "/" + data[0].taskNo,
          }).then((res) => {
            this.getTable();
            this.$message.success("操作成功");
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作",
          });
        });
    },
    // create() {
    //   this.form.dialogFormVisible = true;
    //   this.form.value = {
    //     code: "",
    //     dsiplayName: "",
    //     remark: "",
    //     enabled: true,
    //   };
    // },
    delete() {
      let data = this.multipleSelection;
      if (data.length == 0 || data.length > 1)
        return this.$message.info("请选择一条数据");
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.del({
            url: Point.station + "/" + data[0].id,
          }).then((res) => {
            this.getTable();
            this.$message.success("删除成功");
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    exprot() {
      this.$message({
        type: "info",
        message: "上传信息",
      });
    },
  },
};
</script>

<style>
</style>
