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
    <!-- <dialogTemplate :form="form" > </dialogTemplate> -->

      <dialogTemplate :form="form" 
    @submitForm="submitForm"
      @resetForm="resetForm"> </dialogTemplate>
   
   
    <!-- <SingleImageUpload :form="UploadFrom"> </SingleImageUpload> -->
    <!-- <importExsl :importform="importform"> </importExsl> -->
  </div>
</template>

<script>
import { warehouse, PublicAggregate, Product } from "@/api/request/swagger";
import minxin from "./index.js";
// import importExsl from "./from/importExsl/index.vue"
export default {
  name: "pointManagement",
  mixins: [minxin],
  mounted() {
    this.getTable();
    // this.getSelect();
    // console.log(this.hasBtn(this));
  },
//   components:{importExsl},
  data() {
    return {
    //   UploadFrom: {
    //     dialogFormVisible: false,
    //   },
    //   importform:{
    //      dialogFormVisible: false,
    //      url: Point.importPointArea
    //   },
      multipleSelection: [],
    };
  },
  methods: {
    getTable() {
      this.get({
        url: Product.productClassPages,
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
    //   //创建零件分类下拉
      // this.get({
      //   url: warehouse.gradeSelect,
      //   isLoading: false,
      // }).then((res) => {
      //   this.Handle_Select({
      //     keyword: "classLevel",
      //     handleData: this.form.model,
      //     list: res.result,
      //     config: { type: "type", prop: "prop", children: "child" },
      //   });
      // });
      // 创建零件分类下拉
      this.get({
        url: Product.productClassSelect,
        isLoading: false,
      }).then((res) => {
        this.Handle_Select({
          keyword: "parentCode",
          handleData: this.form.model,
          list: res.result,
          config: { type: "type", prop: "prop", children: "child" },
        });
      });
    },
         // 上级分类编码联动等级方法
    parentCodeEnumChange(val){
      this.get({
        data:{
          compareKey:val
        },
        url:Product.productClassSubLevel,
        isLoading:false,
      }).then((res) => {

        // this.form.value.compareKey = res.result
        this.form.value.classLevel = res.result

      });
       // this.form.value.classLevel = val

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
    submitForm() {
      this.form.dialogFormVisible = false;
     
    },
      // 编辑
      update() {
      this.form.model = [
        {
          label: "零件分类编码",
          type: "input",
          prop: "classCode",
        },
    
        {
          label: "上级分类编码",
          type: "input",
          prop: "parentCode",
          // child: this.getSelect,
          disabled: true,
          // clearable: false
          // change:this.parentCodeEnumChange
        },

        {
          label: "零件分类名称",
          type: "input",
          prop: "className",
          disabled:true,
          //  readonly: true,//不可填
        },
      ];
      this.form.value = {
        classCode: "",
        className: "",
        parentCode: "",
        classLevel: "",
        id:"",
      };
      let data = this.multipleSelection;
      if (data.length == 0 || data.length > 1)
        return this.$message.info("请选择一条数据");
        this.get({
        url: Product.productClassById + "/" + data[0].id,
    })
      .then((res) => {
        this.form.dialogFormVisible = true;
        // this.form.value={...res.result,
        //   // parentClass: res.result.parentCode,
        // }
        // res.result.parentClass把值赋给弹窗里的parentCode
        this.form.value.parentCode= res.result.parentClass;
        this.form.value.classCode=res.result.classCode;
        this.form.value.className=res.result.className;
        this.form.value.classLevel= res.result.classLevel;
        this.form.value.id =res.result.id;
  
           this.form.requestData = {
            flage: "update",
            url: Product.productClass,
            fn: this.getTable,
          };

      // this.form.requestData.flage = "update";
      // this.form.dialogFormVisible = true;
      });
    },
  
    // 创建
    create() {
      this.form.requestData.flage = "add";
      this.form.model = [
        {
          label: "零件分类编码",
          type: "input",
          prop: "classCode",
        },
        {
          label: "零件分类名称",
          type: "input",
          prop: "className",
        },
        {
          label: "上级分类编码",
          type: "select",
          prop: "parentCode",
          child:this.getSelect(),
          // clearable: false
          change: this.parentCodeEnumChange
        },
        {
          label: "分类等级",
          type: "input",
          prop: "classLevel",
          disabled: true,
          //  readonly: true,//不可填
        },
      ],
      this.form.value = {
        classCode: "",
        className: "",
        parentCode: "",
        classLevel: 1,
        compareKey:"",
        // parentClass:"",
      };
      this.form.dialogFormVisible = true;

    },
    delete() {
      let data = this.multipleSelection;
      if (data.length == 0 || data.length > 1)
        return this.$message.info("请选择一条数据");
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.del({
            url: Product.productClass + "/" + data[0].id,
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
     // 导出按钮
    exprot() {
      // let timer = this.formSearchData.value.timer;
      // this.formSearchData.value.BeginInTime = timer ? timer[0] : "";
      // this.formSearchData.value.EndInTime = timer ? timer[1] : "";
      this.post({
        url: Product.exportProductClass,
        isLoading: true,
        responseType: "blob",
        data: Object.assign(this.formSearchData.value, {
          Page: this.paginations.page,
          MaxResultCount: this.paginations.limit,
        }),
      }).then((res) => {
        this.fnexsl(res); //fnexsl封装的导出方法
      });
    },


  },
};
</script>

<style>
</style>
