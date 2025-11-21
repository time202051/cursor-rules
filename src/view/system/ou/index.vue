<template>
  <div>
    <div style="padding: 10px" class="btnbox">
      <el-form class="demo-form-inline">
        <el-form-item>
          <el-button
            v-for="(btn, index) in this.hasBtn(this)"
            :key="index"
            size="small"
            :type="btn.types ? btn.types : 'primary'"
            @click="btn.method"
            >{{ btn.title }}</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div style="padding: 0px 10px 10px 10px;">
      <TreeGrid
        :columns="columns"
        :modelItemss="modelItemss"
        @on-selections-change="select"
      ></TreeGrid>
    </div>
    <dialogTemplate :form="form"> </dialogTemplate>
  </div>
</template>

<script>
import { OrganizationUnit } from "@/api/request/swagger";
import minxin from "./index.js";
export default {
  // name: "ouManagement",
  mixins: [minxin],
  mounted() {
    this.getTable();
  },
  data() {
    return {
      //表格配置数据
      columns: [
        {
          title: "组织名称",
          key: "title",
          // sortable: true,
          width: "150",
        },
        {
          title: "组织编码",
          key: "code",
          sortable: true,
          width: "150",
        },
      ],
      modelItemss: [],
      multipleSelection: [],
    };
  },
  methods: {
    getTable() {
      this.modelItemss = [];
      this.multipleSelection = [];
      this.get({
        url: OrganizationUnit.listTree,
      }).then((res) => {
        this.arrayToTree(res.result, 0, null);
        console.log(this.modelItemss, "modelItemss");
      });
    },
    //挑选按钮
    select(items) {
      this.multipleSelection = items;
    },
    //筛选出选中的值
    filter() {
      return this.modelItemss.filter((v) => {
        let multipleSelection = this.multipleSelection[0]
          ? v.id == this.multipleSelection[0].id
            ? this.multipleSelection
            : false
          : false;
        return multipleSelection;
      });
    },
    getSelect() {
      //所属区域下拉
      this.get({
        url: OrganizationUnit.regionSelect,
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
      let onlevels = data[0].length == 0 ? "无上级组织" : data[0].onlevels;
      this.form.value = {
        onlevels: onlevels,
        parentId: data[0].parentId,
        displayName: data[0].title,
        id: data[0].id,
      };
      this.form.requestData.flage = "update";
      this.form.dialogFormVisible = true;
    },
    create() {
      this.form.dialogFormVisible = true;
      let data =
        this.multipleSelection.length > 0 ? this.multipleSelection[0] : [];
      let onlevels = data.length == 0 ? "无上级组织" : data.title;
      let parentId = data.length == 0 ? "" : data.id;
      this.form.requestData.flage = "add";
      this.form.value = {
        onlevels: onlevels,
        displayName: "",
        parentId: parentId,
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
            url: OrganizationUnit.organizationUnit + "/" + data[0].id,
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
    // 数据处理 增加自定义属性监听
    arrayToTree(data, level, parent) {
      if (data instanceof Array) {
        data.forEach((item) => {
          this.arrayToTree(item, level, parent);
        });
      } else {
        // data.data.enabledText = data.data.enabled ? "是" : "否";
        data.parent = parent;
        data.level = level;
        if (typeof data.expanded === "undefined") {
          data.expanded = false;
        }
        if (data.child === undefined || data.child.length === 0) {
          data.expanded = true;
        }
        if (typeof data.show === "undefined") {
          data.isShow = true;
        }
        if (typeof data.isChecked === "undefined") {
          data.isChecked = 0;
        }
        if (typeof data.flag === "undefined") {
          data.flag = false;
        }
        this.modelItemss.push(data);
        // this.modelItems=this.multipleSelectiondata;
        if (data.child && data.child.length) {
          let checkedAll = Boolean;
          let hasChecked = false;

          data.child.forEach((item) => {
            item.onlevels = data.title;
            if (item.isChecked === 0) {
              checkedAll = false;
            } else {
              hasChecked = true;
            }
          });
          //初始化 checkedAll 为0 //全选
          if (checkedAll) {
            data.isChecked = 0;
          } else if (!hasChecked) {
            data.isChecked = 0;
          } else {
            data.isChecked = 2;
          }
          this.arrayToTree(data.child, level + 1, data);
        }
      }
    },
  },
};
</script>
<style lang='scss'>
.btnbox {
  .upload-demo {
    display: -webkit-inline-box;
    margin-left: 10px;
  }
  .el-form-item {
    margin-bottom: 0px;
  }
  padding: 10px 10px 0px 10px;
}
</style>
