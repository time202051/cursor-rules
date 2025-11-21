<template>
  <div>
    <el-dialog :title="form.title || '提示'" :visible.sync="form.dialogFormVisible" :close-on-click-modal="false"
               v-el-drag-dialog :width="form.width || '45%'" top="8vh">
      <el-tabs type="border-card">
        <el-tab-pane label="用户信息">
          <div class="treeClass">
            <el-form ref="form" :model="form.value" :rules="form.rules" label-width="110px"
                     style="display: flex; flex-wrap: wrap">
              <el-form-item v-for="(item, index) in form.model" :key="index" :label="item.label" :prop="item.prop"
                            :required="item.required || false" :style="{ width: width(item) }">
                <el-input v-if="item.type == 'input'" v-model="form.value[item.prop]"
                          :placeholder="`请输入${item.placeholder || item.label}`"
                          :clearable="item.clearable || true"></el-input>
                <el-input type="textarea" v-if="item.type == 'textarea'" :placeholder="`请输入${item.placeholder || item.label}`"
                          :clearable="item.clearable || true" v-model="form.value[item.prop]"></el-input>
                <TreeSelect v-if="item.type == 'treeselect'" clearable v-model="form.value[item.prop]"
                            :options="item.child" :props="item.props"    @getValue="getValue($event)"></TreeSelect>
                <el-switch v-if="item.type == 'switch'" v-model="form.value[item.prop]"></el-switch>
                <el-date-picker type="date" placeholder="请选择日期" v-if="item.type == 'date'"
                                v-model="form.value[item.prop]" style="width: 100%" :clearable="item.clearable || true">
                </el-date-picker>
                <el-select v-if="item.type == 'select'" v-model="form.value[item.prop]"

                           :placeholder="`请选择${item.placeholder || item.label}`"
                           :clearable="item.clearable" @change="
                    item.change
                      ? item.change(form.value[item.prop])
                      : selectChange(item, form.value[item.prop])
                  ">
                  <el-option v-for="(jtem, jindex) in item.child" :key="jindex" :label="jtem.value" :value="jtem.key">
                  </el-option>
                </el-select>
                <div v-if="item.type == 'inputSpecial'">
                  <el-col :span="6">
                    <el-form-item :prop="item.layerprop">
                      <el-input :clearable="item.clearable || true" v-model="form.value[item.layerprop]"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col class="line" style="text-align: center" :span="3">-</el-col>
                  <el-col :span="6">
                    <el-form-item :prop="item.rowprop">
                      <el-input :clearable="item.clearable || true" v-model="form.value[item.rowprop]"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col class="line" style="text-align: center" :span="3">-</el-col>
                  <el-col :span="6">
                    <el-form-item :prop="item.columnprop">
                      <el-input :clearable="item.clearable || true" v-model="form.value[item.columnprop]"></el-input>
                    </el-form-item>
                  </el-col>
                </div>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
        <!-- <el-tab-pane label="权限分配">
          <el-tree
            class="treeClass"
            :props="{
              children: 'children',
              label: 'label',
            }"
            :data="treeData"
            show-checkbox
          >
          </el-tree>
        </el-tab-pane> -->
        <el-tab-pane label="菜单/按钮权限分配">
          <el-tree class="treeClass" :props="propsData" highlight-current :data="form.menusTreeAllList"
                   :default-checked-keys="defaultMenusTreeAllList" show-checkbox node-key="id" ref="tree"
                   @check-change="handleCheckChange" :default-expand-all="true" :check-strictly="checkStrictly">
          </el-tree>
        </el-tab-pane>
        <el-tab-pane label="系统分配">
          <el-transfer class="treeClass" v-model="form.value.roleNames" :data="form.systemAllList"
                       :titles="['可用系统', '已选系统']" :props="transferConfig" @change="rightCheckChange"
                       :right-default-checked="defaultRightCheckedList"></el-transfer>
          <!-- @change="rightCheckChange" -->
        </el-tab-pane>
      </el-tabs>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('form')">取 消</el-button>
        <el-button type="primary" @click="submitForm('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
/**
 * 参数
 *  dialogFormVisible:false,//弹窗显示
 *  title:'',//标题
 *  width:'',//弹窗宽度
 *  tabsFormFlage:true,//标签页弹框标识
 model:[{
 label: "test",
 type: "input",
 prop: "code",
 }],//表单数据
 rules:[],//表单规则
 value:{},//双向绑定的值
 requestData:{},//接口地址及传参的数据
 */
import {
  IdentityRole,
  permission,
  WebSystemPermission,
} from "@/api/request/swagger";
export default {
  // name: "tabsDialog",
  props: {
    form: Object,
  },
  computed: {
    width() {
      return function(item) {
        if (this.form.model.length > 8 && item.type != "textarea") {
          return "50%";
        } else {
          return "100%";
        }
      };
    },
  },
  watch: {
    "form.menusTreeAllList": {
      handler(newVal, oldVal) {
        if (newVal) {
          this.defaultMenusTreeAllList = [];
          this.setDefaultChecked();
        }
        
      },
      deep: true,
    },
    "form.systemAllList": {
      handler(newVal, oldVal) {
        if (newVal) {
          this.transferDefaultCheckedList();
        }
      },
      deep: true,
    },
  },
  data() {
    return {
      checkStrictly:false,
      propsData: {
        children: "child",
        label: "title"
      },
      transferConfig: {
        key: "id",
        label: "displayName",
      },
      treeData: [{
        label: "一级 1",
        children: [],
      }, ],
      count: 0,
      treeListData: [],
      systemIds: [],
      menuIds: [],
      defaultMenusTreeAllList: [],
      defaultRightCheckedList: [],
    };
  },
  methods: {
    selectChange(obj, val) {
      let temp = {
        obj: obj,
        val: val,
      };
      this.$emit("selectChange", temp);
    },
    // 取值
    getValue(value) {
      this.form.value.organizationUntiId = value;
    },
    /**
     * 设置默认checkbox高亮 //菜单默认高亮
     */
    setDefaultChecked() {
       this.checkStrictly = true; 
      this.$nextTick(() => {
        this.$refs.tree.setCheckedKeys(this.hadleTREE(this.form.menusTreeAllList)); //  一个选中的数组element Ui的东西，关键是看$nextTick的用法
        this.checkStrictly = false 
      });
    },
    hadleTREE(data) {
      data.forEach((item) => {
        if (item.isGranted) {
          this.defaultMenusTreeAllList.push(item.id);
        }
        if (item.child.length > 0) {
          this.hadleTREE(item.child);
        }
      });
      return this.defaultMenusTreeAllList;
    },
    /**
     * 设置默认穿梭框菜单默认高亮
     */
    transferDefaultCheckedList() {
      this.$nextTick(() => {
        this.form.systemAllList.forEach((item) => {
          if (item.isGranted) {
            this.form.value.roleNames.push(item.id);
          }
        });
        this.systemIds = this.form.value.roleNames; //默认值
        this.defaultRightCheckedList = this.form.value.roleNames;
        return this.form.value.roleNames;
      });
    },
    handleCheckChange(data, checked, indeterminate) {},
    rightCheckChange(key, direction, list) {
      this.systemIds = key;
    },
    all(data) {
      return new Promise((resolve, reject) => {
        let webMenuPermission = new Promise((resolve, reject) => {
          this.put({
            url: IdentityRole.webMenuPermission +
              "?providerKey=" +
              data.name +
              "&providerName=R",
            isLoading: false,
            data: {
              providerKey: data.name,
              providerName: "R",
              menuIds: data.menuIds,
            },
          }).then((res) => {
            resolve(res);
          }).catch((e) => {
            console.log('webMenuPermission接口')
            return this.$message.error(e);
          });
        });
        let websystemPermission = new Promise((resolve, reject) => {
          this.put({
            url: WebSystemPermission.websystemPermission +
              "?providerKey=" +
              data.name +
              "&providerName=R",
            isLoading: false,
            data: {
              providerKey: data.name,
              providerName: "R",
              systemIds: data.systemIds,
            },
          }).then((res) => {
            resolve(res);
          }).catch((e) => {
            console.log('websystemPermission接口')
            return this.$message.error(e);
          });
        });

        let identityRole;
        if (data.flage == "add") {
          identityRole = new Promise((resolve, reject) => {
            this.post({
              url: IdentityRole.identityRole,
              isLoading: false,
              data: {
                name: data.name,
                description: data.description,
              },
            }).then((res) => {
              resolve(res);
            }).catch((e) => {
              console.log('添加修改接口')
              return this.$message.error(e);
            });
          });
        } else {
          identityRole = new Promise((resolve, reject) => {
            this.put({
              url: IdentityRole.identityRole + "/" + data.id,
              isLoading: false,
              data: {
                name: data.name,
                id: data.id,
                description: data.description,
                menuIds: data.menuIds,
                systemIds: data.systemIds,
              },
            }).then((res) => {
              resolve(res);
            }).catch((e) => {
              console.log('添加修改接口')
              return this.$message.error(e);
            });
          });
        }
        //全部请求
        return Promise.all([
          webMenuPermission,
          websystemPermission,
          identityRole,
        ])
          .then((res) => {
            resolve(res);
          })
          .catch((e) => {
            return this.$message.error(e);
          });
      });

    },
    submitForm(formName) {
      let checkedKeys = this.$refs.tree.getCheckedKeys(); //选中
      let hafCheckedKeys = this.$refs.tree.getHalfCheckedKeys(); //半选中
      this.menuIds = checkedKeys.concat(hafCheckedKeys);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let obj = {
            name: this.form.value.name,
            description: this.form.value.description,
            menuIds: this.menuIds,
            systemIds: this.systemIds ,
            flage: "add",
          };
          // console.log(this.systemIds,'systemIds')
          // console.log(this.defaultRightCheckedList,'this.defaultRightCheckedList')
          // return false;
          if (this.form.requestData.flage == "update") {
            obj.id = this.form.value.id;
            obj.flage = "update";
          }
          this.all(obj).then((res) => {
            this.form.requestData.fn();
            this.form.dialogFormVisible = false;
            this.$message({
              type: "success",
              message: "操作成功!",
            });
          }).catch((e) => {
            console.log('最后报错')
            return this.$message.error(e);
          });
          return false;
        } else {
          this.$message.error("角色名 必填项不能为空!");
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.form.dialogFormVisible = false;
    },
  },
};
</script>

<style lang='scss' scoped>
.el-dialog__header {
  background-color: #4a77ac;
  padding: 10px;

  // padding-bottom: none;
  .el-dialog__title,
  .el-dialog__headerbtn i {
    color: white;
  }
}

.el-select,
.el-input-number {
  width: 100% !important;
}

.activeWidth {
  width: 50% !important;
}

.treeClass {
  height: 400px !important;
  overflow-y: auto;
}
</style>
