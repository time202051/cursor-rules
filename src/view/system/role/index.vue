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
    <tabsDialogTemplate :form="form"> </tabsDialogTemplate>
  </div>
</template>

<script>
import {
  IdentityRole,
  permission,
  WebSystemPermission,
} from "@/api/request/swagger";
import tabsDialogTemplate from "./dialog/index.vue";
import minxin from "./index.js";
export default {
  name: "roleManagement",
  mixins: [minxin],
  mounted() {
    this.getTable();
    // console.log(this.hasBtn(this));
  },
  data() {
    return {
      multipleSelection: [],
    };
  },
  components: {
    tabsDialogTemplate,
  },
  methods: {
    getTable() {
      this.get({
        url: IdentityRole.identityRole,
        data: {
          Page: this.paginations.page,
          MaxResultCount: this.paginations.limit,
          code: this.formSearchData.value.code,
        },
      }).then((res) => {
        this.tableData.rows = res.result.items;
        this.paginations.total = res.result.totalCount;
        this.tableData.emptyImg = true;
      });
    },
    //获取权限分配
    permission() {
      this.get({
        url: permission.permission,
        isLoading: false,
        data: {
          providerName: "R",
        },
      }).then((res) => {
        let data = res.result.groups[0].permissions;
        console.log(
          this.buildTree(data, "name", "parentName", (item) => !item.parentName)
        );
      });
    },
    buildTree(array, id_key, parentId_key, isRoot) {
      if (!!!array) return [];
      let idsObj = array.reduce(
        (pre, cur) => Object.assign(pre, { [cur[id_key]]: cur }),
        {}
      );
      return Object.values(idsObj).reduce((pre, cur) => {
        let parent = idsObj[cur[parentId_key]];
        if (!isRoot(cur, parent)) {
          !!!parent.children && (parent.children = []);
          let children = parent.children;
          !children.includes(cur) && children.push(cur);
        } else {
          pre.push(cur);
        }
        return pre;
      }, []);
    },
    SelectionChange(row) {
      this.multipleSelection = row;
    },
    handleSearch(from) {
      this.permission();
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
    all(providerKey = null) {
      return new Promise((resolve, reject) => {
        let menusTreeAll = new Promise((resolve, reject) => {
          this.get({
            url: IdentityRole.menusTreeAll,
            isLoading: false,
            data: { providerKey: providerKey,  providerName: "R", },
          }).then((res) => {
            resolve(res.result);
          });
        });
        let systemAll = new Promise((resolve, reject) => {
          this.get({
            url: WebSystemPermission.systemAll,
            isLoading: false,
            data: { providerKey: providerKey,  providerName: "R", },
          }).then((res) => {
            resolve(res.result);
          });
        });
        return Promise.all([menusTreeAll, systemAll])
          .then((res) => {
            resolve(res);
          })
          .catch((e) => {
            console.log("error", e);
          });
      });
    },
    update() {
      let data = this.multipleSelection;
      if (data.length == 0 || data.length > 1)
        return this.$message.info("请选择一条数据");
      this.all(data[0].name).then((res) => {
        this.form.systemAllList = res[1];
        this.form.menusTreeAllList = res[0];
        this.form.value = {
          id: data[0].id,
          name: data[0].name,
          description: data[0].description,
          roleNames: [],
        };
        this.form.requestData.flage = "update";
        this.form.dialogFormVisible = true;
        // console.log("success:", res);
      });
    },
    create() {
      this.all().then((res) => {
        this.form.systemAllList = res[1];
        this.form.menusTreeAllList = res[0];
        this.form.dialogFormVisible = true;
        this.form.requestData.flage = "add";
        this.form.value = {
          description: "",
          name: "",
        };
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
            url: IdentityRole.identityRole + "/" + data[0].id,
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
    improt() {
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
