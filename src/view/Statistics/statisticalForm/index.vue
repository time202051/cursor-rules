<template>
  <div>
    <el-card
      class="box-card"
      style="
        width: 300px;
        height: 730px;
        padding-top: 4px;
        overflow-y: scroll;
        position: fixed;
      "
    >
      <el-tree
        :data="data"
        node-key="id"
        :props="defaultProps"
        default-expand-all
        :highlight-current="true"
        @node-click="handleNodeClick"
      >
      </el-tree>
    </el-card>

    <el-container style="padding-left: 315px">
      <el-main>
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
      </el-main>
    </el-container>
  </div>
</template>
<script>
import { warehouse } from "@/api/request/swagger";
import minxin from "./index.js";
export default {
  mixins: [minxin],

  data() {
    return {
          multipleSelection: [],
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  mounted() {
    // console.log(this.data, "88");
       this.getTable();
    // this.getSelect();
    // console.log(this.hasBtn(this));
  },

  methods: {
    handleNodeClick(data) {
      console.log(data);
    },
      getTable() {
      this.get({
        url: warehouse.regionPages,
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
    },getSelect() {
      //所属区域下拉
      this.get({
        url: warehouse.regionSelect,
      }).then((res) => {
        this.Handle_Select({
          keyword: "regionId",
          handleData: this.form.model,
          list: res.result,
          config: { type: "type", prop: "prop", children: "child" },
        });
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
    update() {
      let data = this.multipleSelection;
      if (data.length == 0 || data.length > 1)
        return this.$message.info("请选择一条数据");
      this.form.value = {
        code: data[0].regionCode,
        dsiplayName: data[0].regionName,
        id: data[0].id,
        remark: data[0].remark,
        enabled: data[0].enabled,
      };
      this.form.requestData.flage = "update";
      this.form.dialogFormVisible = true;
    },
    create() {
      this.form.dialogFormVisible = true;
      this.form.requestData.flage = "add";
      this.form.value = {
        code: "",
        dsiplayName: "",
        remark: "",
        enabled: true,
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
            url: warehouse.region + "/" + data[0].id,
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
    importBtn() {
      this.$message({
        type: "info",
        message: "上传信息",
      });
    },
  },
};
</script>




<style >
</style>