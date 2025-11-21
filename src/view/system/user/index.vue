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
import { IdentityUser, OrganizationUnit,identity } from "@/api/request/swagger";
import tabsDialogTemplate from "./dialog/index.vue";
import minxin from "./index.js";
export default {
  name: "userManagement",
  mixins: [minxin],
  mounted() {
    this.getTable();
    this.getSelect();
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
        url: IdentityUser.identityUser,
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
    getSelect() {
      this.get({
        url: OrganizationUnit.listTree,
        isLoading: false,
      }).then((res) => {
        this.Handle_Select({
          keyword: "organizationUntiId",
          handleData: this.form.model,
          list: res.result,
          config: { type: "type", prop: "prop", children: "child" },
        });
        console.log(res.result);
      });
      this.get({
        url: IdentityUser.assignableRoles,
        isLoading: false,
        data: { id_canBeNull: "" },
      }).then((res) => {
        this.form.roleNameList = res.result;
      });
      console.log(this.form.model);
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
      this.get({
        url: IdentityUser.assignableRoles,
        isLoading: false,
        data: { id_canBeNull: data[0].id },
      }).then((res) => {
        let arr = [];
        res.result.forEach((item) => {
          if (item.isUserRole) arr.push(item.name);
        });
        this.form.model = this.form.model.filter(
          (items) => items.prop != "password"
        );
        this.form.value = { ...data[0] };
        this.form.value = {
          id: data[0].id,
          userName: data[0].userName,
          password: data[0].password,
          name: data[0].name,
          organizationUntiId: data[0].ouId,
          phoneNumber: data[0].phoneNumber,
          email: data[0].email,
          isActive: data[0].isActive,
          roleNames: arr,
        };

        this.form.roleNameList = res.result;
        this.form.requestData.flage = "update";
        this.form.dialogFormVisible = true;
      });
    },
    create() {
      this.form.dialogFormVisible = true;
      this.form.value = {
        id: "",
        userName: "",
        password: "",
        name: "",
        organizationUntiId: "",
        phoneNumber: "",
        email: "",
        isActive: true,
        roleNames: [],
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
            url: IdentityUser.identityUser + "/" + data[0].id,
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
    resetPassword() {
      let data = this.multipleSelection;
      if (data.length == 0 || data.length > 1) {
        return this.$message.info("请选择一条数据");
      }
      this.$confirm("是否重置密码?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.post({
            url: identity.resetpassword + "/" + data[0].id,
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
    improt() {
      this.$message({
        type: "info",
        message: "上传信息",
      });
    },
  },
};
</script>

<style></style>
