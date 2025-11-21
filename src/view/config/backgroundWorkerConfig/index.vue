<template>
  <div>
    <FormSearch
      :form-search-data="formSearchData"
      @handleSearch="handleSearch"
      @handleReset="handleReset"
    />
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
    <dialogTemplate :form="form"> </dialogTemplate>


    <el-dialog
       title="提示"
       :visible.sync="dialogVisible"
       width="30%"
        >

  <!-- 判断选中状态值，如果是值为'1008',则打开下匹配库运行模式 -->
  <div v-if='rowObj'>
    
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <!-- 下拉框 -->
  <el-form-item label="匹配库存运行模式">
    <el-select v-model="formInline.region" placeholder="匹配库存运行模式" >
      <el-option 
      v-for='item,index in list'
      :key='index'
      :label="item.value"
       :value="item.key">
       </el-option>
    </el-select>
  </el-form-item>
  
</el-form>
  </div>
  <!-- 判断选中行状态值取反，值不为1008的，走这边操作 -->
  <div v-if='!rowObj'>此操作将变更任务状态, 是否继续?</div>

  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="onSubmit">确 定</el-button>
  </span>
</el-dialog>

    
  </div>
</template>

<script>
import { warehouse, PublicAggregate, Point ,config} from "@/api/request/swagger";
import minxin from "./index.js";
export default {
  name: "configstationManagement",
  mixins: [minxin],
  mounted() {
    this.getTable();
    // this.getSelect();
    console.log(this.hasBtn(this));
  },
  data() {
    return {
      multipleSelection: [],
        dialogVisible: false,
        // 标识
        rowObj:false,
        // 下拉框定义
        formInline:{
          region:''
        },

        list: this.SET_enumsSelect({
                            keyword: "runModeEnum",
                        }),

    };
  },
  methods: {
    getTable() {
      this.get({
        url: config.backgroundWorkerConfigPages,
        isLoading:true,
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
    handleDeatils(){
      this.$message.error("测试表格数据");
    },
    update() {
      let data = this.multipleSelection;
      if (data.length == 0 || data.length > 1)
        return this.$message.info("请选择一条数据");
      this.form.value = { ...data[0] };
      this.form.requestData.flage = "update";
      this.form.dialogFormVisible = true;
    },
    create() {
      this.form.dialogFormVisible = true;
      this.form.requestData.flage = "add";
      this.form.value = {
        boxModel: "",
        pointCode: "",
        businessType: "",
        remark: "",
        // enabled: true,
      };
    },
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
            url: Point.pointConfig + "/" + data[0].id,
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
    // 按钮变更任务状态
    changingTaskStatus() {
      // 赋值
       let data = this.multipleSelection;
      if (data.length == 0 || data.length > 1)
        return this.$message.info("请选择一条数据");
      this.rowObj=data[0].jobCode=="1008"?true:false;
      this.formInline.region=data[0].runmodeenum
       this.dialogVisible=true      
    },
    // 点击确定的方法，掉接口，
    onSubmit(){
         this.post({
          url: config.changedBackgroundWorkerConfigEnabled + "?bwid=" + this.multipleSelection[0].id,
      data:{
        // 带参数传给后端，一个是bwid,一个是runmodeenum
         "bwid": this.multipleSelection[0].id,
         "runmodeenum":this.formInline.region
        }
          }).then((res) => {
            this.getTable();
            this.$message.success("操作成功");
             this.dialogVisible=false  
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
