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
      <template slot="details" slot-scope="scope">
        <div style="color: #1682e6; cursor: pointer" @click="details(scope)">
          详情
        </div>
      </template>
    </MyTable>
    <detailsdialogTemplate
      ref="detailsdialogTemplate"
      :form="detailsform"
    ></detailsdialogTemplate>
    <createTemplate ref="createTemplate" :form="createform"></createTemplate>
  </div>
</template>
<script>
import { StockIn, warehouse, StockRemove, Stock } from "@/api/request/swagger";
import minxin from "./index.js";
import detailsdialogTemplate from "./from/details/index.vue";
import createTemplate from "./from/create/index.vue";

export default {
  name: "sonTemplate",
  mixins: [minxin],
  components: { detailsdialogTemplate, createTemplate },
  mounted() {
    this.getTable();
    this.getSelect();
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
    export() {
      let timer = this.formSearchData.value.timer;
      this.formSearchData.value.BeginTime = timer ? timer[0] : "";
      this.formSearchData.value.EndTime = timer ? timer[1] : "";
      this.post({
        url: StockRemove.exportstockremove,
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
    getTable() {
      let timer = this.formSearchData.value.timer;
      this.formSearchData.value.BeginTime = timer ? timer[0] : "";
      this.formSearchData.value.EndTime = timer ? timer[1] : "";
      this.get({
        url: StockRemove.stockremoveget,
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
      // 移位类型下拉数据
      this.get({
        url: Stock.stockremovetypeselect,
      }).then((res) => {
        this.Handle_Select({
          keyword: "stockRemoveType",
          handleData: this.createform.model,
          list: res.result,
          config: {
            type: "type",
            prop: "prop",
            children: "child",
          },
        });
        this.Handle_Select({
          keyword: "stockRemoveType",
          handleData: this.formSearchData.tableSearch,
          list: res.result,
          config: {
            type: "inputType",
            prop: "value",
            children: "children",
          },
        });
      });
      // 作业类型下拉数据
      this.get({
        url: Stock.stockremoveselect,
      }).then((res) => {
        this.Handle_Select({
          keyword: "stockRemove",
          handleData: this.createform.model,
          list: res.result,
          config: {
            type: "type",
            prop: "prop",
            children: "child",
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
        if (query.length < 3) return false;
        this.formSearchData.tableSearch[0].loading = true;
        this.get({
          url: Product.productSelect,
          data: {
            ProductCode: query,
          },
        }).then((res) => {
          this.formSearchData.tableSearch[0].loading = false;
          let index =
            this.formSearchData.tableSearch[0].loadmores.SELECTWRAP_DOM_index;
          this.formSearchData.tableSearch[0].tempBoxData = res.result;
          this.formSearchData.tableSearch[0].children = res.result.slice(
            index,
            index + 10
          );
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
      self.formSearchData.value = { ...from };
      self.paginations.page = 1;
      this.getTable();
    },
    handleReset() {
      for (let key in this.formSearchData.value) {
        this.formSearchData.value[key] = null;
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
    // 详情页弹出层
    details(row) {
      this.detailsform.row = row.row;
      setTimeout(() => {
        this.$refs.detailsdialogTemplate.getTable();
        this.detailsform.outerVisible = true;
      }, 10);
    },
    createremoveno() {
      this.get({
        url: Stock.createremoveno,
        isLoading: true,
      }).then((res) => {
        this.createform.value.pointCode = res.result;
        this.createform.value.stockRemove = this.createform.model[2].child
          .length
          ? this.createform.model[2].child[0].key
          : "";
        this.createform.value.stockRemoveType = this.createform.model[3].child
          .length
          ? this.createform.model[3].child[0].key
          : "";
        this.createform.value.remark = "";
        this.createform.value.stockRemoveState = true;
        this.createform.title = "新增移位单";
        this.createform.requestData.flage = "add";
        this.createform.outerVisible = true;
      });
    },
    //新增到货通知单
    YWZD() {
      this.createremoveno();
    },
    update() {
      let data = this.multipleSelection;
      if (data.length == 0 || data.length > 1)
        return this.$message.info("请选择一条数据");
      this.form.requestData.flage = "autoArrange";
      this.form.model = [
        {
          label: "数量",
          type: "number",
          prop: "qty",
          props: {
            precision: 0,
            min: 1,
          },
        },
      ];
      this.form.value = {
        qty: data[0].qty ? data[0].qty : "",
        id: data[0].id,
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
    //任务下发
    RWXF() {
      let data = this.multipleSelection;
      if (data.length == 0 || data.length > 1)
        return this.$message.info("请选择一条数据");
      this.$confirm("确定继续操作任务下发吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.post({
            url: `${Stock.taskdown}?removeNo=${data[0].removeNo}&stockRemoveType=${data[0].stockRemoveType}&stockRemove=${data[0].stockRemove}`,
          }).then((res) => {
            this.getTable();
            this.$message.success("操作成功");
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消任务下发",
          });
        });
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
            url: StockRemove.stockRemove + "/" + data[0].id,
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
    import() {
      this.importForm.dialogFormVisible = true;
    },
    exprot() {
      let timer = this.formSearchData.value.timer;
      this.formSearchData.value.BeginTime = timer ? timer[0] : "";
      this.formSearchData.value.EndTime = timer ? timer[1] : "";
      this.post({
        url: StockIn.exportbindrecord,
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
<style></style>
