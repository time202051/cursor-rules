<template>
    <div>
      <FormSearch :form-search-data="formSearchData"
                  @handleSearch="handleSearch"
                  @handleReset="handleReset"/>
      <MyTable :paginations="paginations"
              :btnlist="this.hasBtn(this)"
               :emptyImg="tableData.emptyImg"
               :tableData="tableData"
               :multipleSelection="multipleSelection"
               @SelectionChange="SelectionChange"
               @handleSizeChange="handleSizeChange"
               @handleindexChange="handleindexChange"
      >
          <template slot="details"
                    slot-scope="scope">
            <div style="color: #1682e6;cursor: pointer;"
                 @click="details(scope)"
            >详情
            </div>
          </template>
       
      </MyTable>
      <ADDdialogTemplate :form="form"></ADDdialogTemplate>
      <detailsdialogTemplate ref="detailsdialogTemplate"
                             :form="detailsform"></detailsdialogTemplate>
    </div>
  </template>

  <script>
  import {StockIn, warehouse} from "@/api/request/swagger";
  import minxin from "./index.js";
  import ADDdialogTemplate from './from/add/index.vue';
  import detailsdialogTemplate from "./from/details/index.vue"
  
  export default {
    name: "sonTemplate",
    mixins: [minxin],
    components: {detailsdialogTemplate,ADDdialogTemplate},
    mounted() {
      this.getTable();
      this.getSelect()
    },
    data() {
      return {
        multipleSelection: [],
        traylist: [],
        importForm: {
          dialogFormVisible: false,
        },
      };
    },
    methods: {
      getTable() {
        let timer = this.formSearchData.value.timer;
        this.formSearchData.value.BeginTime = timer ? timer[0] : "";
        this.formSearchData.value.EndTime = timer ? timer[1] : "";
        this.get({
          url: StockIn.bindrecordpages,
          isLoading: true,
          data: Object.assign(this.formSearchData.value, {
            Page: this.paginations.page,
            MaxResultCount: this.paginations.limit,
          }),
        }).then((res) => {
          this.tableData.rows = res.result.items;
          this.paginations.total = res.result.totalCount; //是否传了分页
          this.tableData.emptyImg = true;
        });
      },
      getSelect() {
        this.get({
          url: warehouse.regionSelect,
        }).then((res) => {
            this.Handle_Select({
              keyword: "RegionId",
              handleData: this.formSearchData.tableSearch,
              list: res.result,
              config: {
                type: "inputType",
                prop: "value",
                children: "children"
              },
            });
            });
      },
  
      /**
       * 关键字下拉框方法  remoteMethod(val)
       */
      // 零件remoteMethod的方法，后续只需要更换url地址，如下标有变化，把下标[0]换成相对应的即可
      remoteMethod(query) {
        if (query !== "") {
          if (query.length < 3) return false
          this.formSearchData.tableSearch[0].loading = true;
          this.get({
            url: Product.productSelect,
            data: {
              ProductCode: query
            }
          }).then((res) => {
            this.formSearchData.tableSearch[0].loading = false;
            let index = this.formSearchData.tableSearch[0].loadmores.SELECTWRAP_DOM_index
            this.formSearchData.tableSearch[0].tempBoxData = res.result;
            this.formSearchData.tableSearch[0].children = res.result.slice(index, index + 10);
          });
        } else {
          this.formSearchData.tableSearch[0].tempBoxData = [];
          this.formSearchData.tableSearch[0].children = [];
        }
      },
      /**
       * 滚动下拉
       * 1.表单结构 ：{
                        label: "巷道",
                        value: "RoadWayId",
                        inputType: "select",
                        children: [],
                        tempBoxData: [],
                        //自定义指令
                        loadmores: {
                          fn: this.loadmoreGX,
                          SELECTWRAP_DOM_index: 0,
                          flage: 'RoadWayId',  // 防止也个页面多个滚动下拉的标识
                        },
                      }
       * 2.进页面调用接口赋值 ：
       getSelect() {
            this.get({
              url: warehouse.roadWaySelect,
            }).then((res) => {
              this.Handle_Select({
                keyword: "RoadWayId",  //关键字
                handleData: this.formSearchData.tableSearch, //需要处理的数据list
                list: res.result, //接口返回的数据
                config: {     //配置文件
                  type: "inputType",    看上面  1. 表单结构
                  prop: "value",
                  children: "tempBoxData"  // 需要赋值的对象
                },
              });
              let index = this.formSearchData.tableSearch[3].loadmores.SELECTWRAP_DOM_index
              this.formSearchData.tableSearch[3].children = res.result.slice(index, index + 10);
            });
          }
       * 3. loadmoreGX() 滚动下拉方法
       *
       */
      loadmoreGX() {
        let obj = this.formSearchData.tableSearch[0];
        if (obj.loadmores.flage == "ProductId") {
          let addData = [];
          let index = obj.loadmores.SELECTWRAP_DOM_index;
          let data = obj.children;
          addData = obj.tempBoxData.slice(index, index + 10);
          this.formSearchData.tableSearch[0].children = data.concat(addData);
        }
      },
      SelectionChange(row) {
        this.multipleSelection = row;
      },
      handleSearch(from) {
        var self = this;
        self.formSearchData.value = {...from};
        self.paginations.page = 1;
        this.getTable(console.log(111));
      },
      handleReset() {
        for (let key in this.formSearchData.value) {
          this.formSearchData.value[key] = null
        }
        this.paginations.page = 1;
      },
      handleSizeChange(val) {
        this.paginations.page = 1;
        this.paginations.limit = val;
        this.getTable();
      },
      handleindexChange(val) {
        this.paginations.page = val;
        this.getTable();
      },
  
      details(row) {
        this.detailsform.row = row.row
        setTimeout(() => {
          this.$refs.detailsdialogTemplate.getTable()
          this.detailsform.outerVisible = true;
        }, 10)
  
      },
      update() {
        let data = this.multipleSelection;
        if (data.length == 0 || data.length > 1)
          return this.$message.info("请选择一条数据");
         
        this.form.requestData.flage = "update";
        this.form.model = [
          {
            label: "盘点方式",
            type: "select",
            prop: "productCode",
            child: [],
          },
          // {
          //   label: "公司",
          //   type: "select",
          //   prop: "cargoLocationCode",
          //   child: [],
          // },
          // {
          //   label: "仓库",
          //   type: "select",
          //   prop: "orderCode",
          //   child: [],
          // },
          {
            label: "区域",
            type: "select",
            prop: "qty",
            child: [],
          },
          {
            label: "盘点库区",
            type: "select",
            prop: "serialNo",
            child: [],
          },
          {
            label: "工作台选择",
            type: "select",
            prop: "trayId",
            child: [],
          },
        
        ]
        this.form.value = {
          productCode: "",
          // cargoLocationCode: "",
          // orderCode: "",
          cycleno: "",
          qty: '',
          serialNo: "",
          trayId: "",
        };
  
        this.form.dialogFormVisible = true;
      },
      submitForm() {
        this.put({
          url: this.form.requestData.url,
          data: this.form.value,
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
      resetForm() {
        this.form.dialogFormVisible = false;
      },
      // 盘点制单
      prepare() {
        let data = this.multipleSelection;
        if (data.length == 0 || data.length > 1)
          return this.$message.info("请选择一条数据");
        this.form.dialogFormVisible = true;
        this.form.requestData.flage = "update";
        this.form.model = [
  
        {
            label: "盘点方式",
            type: "select",
            prop: "productCode",
            child: [],
          },
          // {
          //   label: "公司",
          //   type: "select",
          //   prop: "cargoLocationCode",
          //   child: [],
          // },
          // {
          //   label: "仓库",
          //   type: "select",
          //   prop: "orderCode",
          //   child: [],
          // },
          {
            label: "区域",
            type: "select",
            prop: "qty",
            child: [],
          },
          {
            label: "盘点库区",
            type: "select",
            prop: "serialNo",
            child: [],
          },
          {
            label: "工作台选择",
            type: "select",
            prop: "trayId",
            child: [],
          },
        ]
        this.form.value = {
          productCode: "",
          // cargoLocationCode: "",
          // orderCode: "",
          cycleno: "",
          qty: '',
          serialNo: "",
          trayId: "",
        };
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
            url: StockInfo.cpStock + "/" + data[0].id,
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
      // 盘点制单
    //  prepare(){
    //     let data = this.multipleSelection;
    //   if (data.length == 0 || data.length > 1)
    //     return this.$message.info("请选择一条数据");
    //     this.get({
    //     // url: warehouse.regionById + "/" + data[0].id,
    // })
    //   .then((res) => {
    //     this.form.value={...res.result,
    //       warehouseName: res.result.warehouseId
    //     }

    //   this.form.requestData.flage = "update";
    //   this.form.dialogFormVisible = true;
    //   });

    //   },
      // 盘点中止
      suspend(){
        let data = this.multipleSelection;
      if (data.length==0) return this.$message.info("请选择一条或多条数据");
       this.$confirm("此操作将中止盘点, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.post({
            // url:BusinessTask.resetTask,
            data:data.map(item=>item.id),
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

      // 任务下发
      taskSend(){
        let data = this.multipleSelection;
      if (data.length==0) return this.$message.info("请选择一条或多条数据");
       this.$confirm("此操作将下发任务, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.post({
            // url:BusinessTask.resetTask,
            data:data.map(item=>item.id),
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
      import() {
        this.importForm.dialogFormVisible = true;
      },
      export() {
        let timer = this.formSearchData.value.timer;
        this.formSearchData.value.BeginTime = timer ? timer[0] : "";
        this.formSearchData.value.EndTime = timer ? timer[1] : "";
        this.post({
        //   url: StockIn.exportbindrecord,
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
      /**
       * 滚动下拉
       * 先调用接口 给下拉框赋值 GetRegionSelect()
       * 滚动到一定地步添加数据 loadmoreGX()
       */
      // GetRegionSelect() {
      //   this.get({
      //     url: warehouse.regionSelect,
      //   }).then((res) => {
      //     this.formSearchData.tableSearch[0].tempBoxData = res.result;
      //     let index =
      //       this.formSearchData.tableSearch[0].loadmores.SELECTWRAP_DOM_index;
      //     this.formSearchData.tableSearch[0].children = res.result.slice(
      //       index,
      //       index + 10
      //     );
      //   });
      // },
      // //下拉框滚动下拉加载方法
      // loadmoreGX() {
      //   let RegionIdList = this.formSearchData.tableSearch[0];
      //   if (RegionIdList.loadmores.flage == "ProductCode") {
      //     let addData = [];
      //     let index = RegionIdList.loadmores.SELECTWRAP_DOM_index;
      //     let data = RegionIdList.children;
      //     addData = RegionIdList.tempBoxData.slice(index, index + 10);
      //     this.formSearchData.tableSearch[0].children = data.concat(addData);
      //   }
      // },
    },
  };
  </script>
  <style>
  </style>
  