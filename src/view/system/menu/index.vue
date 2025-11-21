<template>
  <div>
    <div style="padding: 10px" class="btnbox">
      <el-form
        ref="form"
        :model="form"
        label-width="80px"
        style="display: flex"
      >
        <!-- <el-form-item label="所属系统">
          <el-select clearable v-model="form.name" placeholder="请选择">
            <el-option
              :label="item.label"
              :value="item.value"
              v-for="(item, index) in formList"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label-width="10px">
          <el-button type="primary" size="small" @click="onSubmit"
            >查询</el-button
          >
        </el-form-item> -->
      </el-form>
    </div>
    <div style="padding: 10px" class="btnbox">
      <el-form class="demo-form-inline">
        <el-form-item>
          <el-button
            type="primary"
            size="small"
            v-for="(item, index) in btnlist"
            :key="index"
            @click="item.method"
            >{{ item.title }}</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div style="padding: 0px 10px 10px 10px">
      <TreeGrid
        :columns="columns"
        :modelItemss="modelItemss"
        @on-selections-change="select"
      ></TreeGrid>
    </div>
    <fromTemplate :form="form" :fromObj="fromObj"></fromTemplate>
  </div>
</template>

<script>
import { WebMenu } from "@/api/request/swagger";
import fromTemplate from "./from/index.vue";
export default {
  name: "menuManagement",
  components: { fromTemplate },
  data() {
    return {
      btnlist: [
        {
          title: "添加",
          method: this.add,
        },
        {
          title: "编辑",
          method: this.update,
        },
        {
          title: "删除",
          method: this.delete,
        },
      ],
      formList: [
        {
          label: "欧力德手持设备系统",
          value: "欧力德手持设备系统",
        },
        {
          label: "欧力德配置管理中心",
          value: "欧力德配置管理中心",
        },
        {
          label: "欧力德仓库管理系统",
          value: "欧力德仓库管理系统",
        },
      ],
      form: {
        name: "",
      },
      //表格配置数据
      columns: [
        {
          title: "菜单名称",
          key: "title",
          // sortable: true,
          width: "150",
        },
        {
          title: "菜单编码",
          key: "code",
          sortable: true,
          width: "150",
        },
        {
          title: "菜单类型",
          key: "typeDesc",
          width: "150",
        },
        {
          title: "菜单路径",
          key: "jump",
          // sortable: true,
          width: "150",
        },
        {
          title: "菜单系统",
          key: "systemDisplayName",
          width: "150",
        },
        {
          title: "菜单图标",
          key: "icon",
          width: "150",
        },
        // {
        //   title: "菜单排序",
        //   key: "sort",
        //   // sortable: true,
        //   width: "150",
        // },
      ],
      modelItemss: [],
      multipleSelection: [],
      form: {
        dialogFormVisible: false,
        formLabelWidth: "120px",
        displayName: "",
        jump: "",
        icon: "",
        sort: "",
        type: "",
        systemId: "",
        title: "",
      },
      fromObj: {
        config: this.getTabel(),
        keyValueList: [],
        menuTypeList: [
          {
            value: "菜单",
            key: 0,
          },
          {
            value: "按钮",
            key: 1,
          },
        ],
      },
      fromList: [
        {
          type: "input",
          label: "tesr",
          prop: "name",
        },
        {
          type: "select",
          label: "select1",
          prop: "name",
          child: [
            {
              label: "123",
              value: 123,
            },
          ],
        },
        {
          type: "input",
          label: "tesr",
          prop: "name",
        },

        {
          type: "select",
          label: "select1",
          prop: "name",
          child: [
            {
              label: "123",
              value: 123,
            },
          ],
        },
        {
          type: "date",
          label: "date",
          prop: "date",
        },
      ],
    };
  },
  mounted() {
    this.getTabel();
    this.keyValueList("");
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    keyValueList(compareKey) {
      return new Promise((resolve, reject) => {
        this.get({
          url: WebMenu.keyValueList,
          data: {
            compareKey: compareKey,
          },
        }).then((res) => {
          this.fromObj.keyValueList = res.result;
          resolve(res);
        });
      });
    },
    getTabel() {
      this.get({
        url: WebMenu.listTree,
        isLoading: true,
      }).then((res) => {
        this.modelItemss = [];
        this.multipleSelection = [];
        this.arrayToTree(res.result, 0, null);
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
    add() {
      console.log(this.multipleSelection);
      let data = this.multipleSelection;
      let parentId = data.length > 0 ? data[0].id : "";
      let title = data.length > 0 ? data[0].title : "无上级菜单";
      let systemId = data.length > 0 ? data[0].systemId : "";
      this.keyValueList(systemId).then((res) => {
        this.fromObj.keyValueList = res.result;
        this.fromObj.keyValueList.forEach((item) => {
          if (!systemId) return (item.disabled = false);
          if (!item.isSelected) {
            item.disabled = true;
          } else {
            item.disabled = false;
          }
        });
        this.form = {
          dialogFormVisible: true,
          displayName: "",
          jump: "",
          icon: "",
          sort: "",
          type: 0,
          systemId: systemId,
          title: title,
          flage: "add",
          fn: this.getTabel,
        };
        if (parentId) this.form.parentId = parentId;
      });
    },
    update() {
      if (this.multipleSelection.length == 0)
        return this.$message.warning("请选择一条数据");
      let data = this.multipleSelection[0];
      let onlevels = data.length == 0 ? "无上级菜单" : data.onlevels;
      this.form = {
        dialogFormVisible: true,
        displayName: data.title,
        jump: data.jump,
        icon: data.icon,
        sort: data.sort,
        type: data.type,
        systemId: this.multipleSelection[0].systemId,
        title: onlevels,
        parentId: data.id,
        flage: "update",
        fn: this.getTabel,
      };
      if (this.form.systemId) {
        this.fromObj.keyValueList.forEach((item) =>
          this.form.systemId !== item.key
            ? (item.disabled = true)
            : (item.disabled = false)
        );
      }
      console.log(this.fromObj.keyValueList);
    },
    delete() {
      if (this.multipleSelection.length == 0)
        return this.$message.warning("请选择一条数据");
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.del({
            url: WebMenu.webMenu + "/" + this.multipleSelection[0].id,
          }).then((res) => {
            this.getTabel();
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 数据处理 增加自定义属性监听
    arrayToTree(data, level, parent) {
      // debugger;
      if (data instanceof Array) {
        data.forEach((item) => {
          this.arrayToTree(item, level, parent);
        });
      } else {
        // data.data.enabledText = data.data.enabled ? "是" : "否";
        data.parent = parent;
        // debugger
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
