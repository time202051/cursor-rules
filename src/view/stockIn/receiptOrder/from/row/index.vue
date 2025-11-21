<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      v-el-drag-dialog
      :width="width || '45%'"
      :show-close="true"
      top="18vh"
      @close="dialogFormVisible = false"
      @open="handleOpen('form')"
    >
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="130px"
        style="display: flex; flex-wrap: wrap"
      >
        <el-form-item
          v-for="(item, index) in model"
          :key="index"
          :label="item.label"
          :prop="item.prop"
          :required="item.required || false"
          :style="{ width: item.type == 'textarea' ? '100%' : '50%' }"
        >
          <el-input
            v-if="item.type == 'input'"
            v-model="form[item.prop]"
            :placeholder="`请输入${item.placeholder || item.label}`"
            :clearable="item.clearable || true"
            :readonly="item.readonly || false"
            :disabled="item.disabled || false"
          ></el-input>
          <el-date-picker
            type="date"
            placeholder="请选择日期"
            v-if="item.type == 'date'"
            v-model="form[item.prop]"
            v-bind="item.props"
            style="width: 100%"
            :clearable="item.clearable || true"
          ></el-date-picker>
          <el-input
            type="textarea"
            v-if="item.type == 'textarea'"
            :placeholder="`请输入${item.placeholder || item.label}`"
            :autosize="item.autosize"
            :clearable="item.clearable || true"
            v-model="form[item.prop]"
            :maxlength="item.length || ''"
          ></el-input>
          <el-select
            v-if="item.type == 'select'"
            v-model="form[item.prop]"
            :placeholder="`请选择${item.placeholder || item.label}`"
            :clearable="'clearable' in item ? item.clearable : true"
            :disabled="item.disabled || false"
            @change="
              item.change
                ? item.change(form[item.prop])
                : selectChange(item, form[item.prop])
            "
          >
            <el-option
              v-for="(jtem, jindex) in item.child"
              :key="jindex"
              :label="jtem.value"
              :value="jtem.key"
            ></el-option>
          </el-select>
          <el-select
            v-else-if="item.type === 'selectRemoteMethod'"
            v-el-select-all="item.loadmores"
            v-model="form[item.prop]"
            filterable
            remote
            clearable
            reserve-keyword
            :placeholder="`请输入至少3位关键字`"
            :remote-method="item.remoteMethod"
            :loading="item.loading"
            @change="productCodeChange"
          >
            <el-option
              v-for="option in item.child"
              :key="option.key"
              :label="option.keyValue"
              :value="option.key"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定 </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import index from "./index";
import { InBound, Matter, Basic } from "@/api/request/swagger";
export default {
  name: "rowTemplate",
  mixins: [index],
  directives: {
    "el-select-all": {
      bind(el, binding, vnode) {
        // console.log(binding.value)
        const _that = vnode.context; // 当前vue对象
        const SELECTWRAP_DOM = el.querySelector(
          ".el-select-dropdown .el-select-dropdown__wrap"
        );
        SELECTWRAP_DOM.addEventListener("scroll", function () {
          // console.log(SELECTWRAP_DOM.scrollHeight) // 文档内容的实际高度
          // console.log(SELECTWRAP_DOM.scrollTop) // 滚动条滚动高度
          // console.log(SELECTWRAP_DOM.clientHeight) // 可视窗口高度
          // CONDITION  //滚动条到底了
          const CONDITION =
            SELECTWRAP_DOM.scrollHeight - SELECTWRAP_DOM.scrollTop - 2 <=
            SELECTWRAP_DOM.clientHeight;
          if (CONDITION) {
            binding.value.SELECTWRAP_DOM_index += 10;
            binding.value.fn();
          }
        });
      },
      unbind(el, binding, vnode) {
        // 解除事件监听
        const _that = vnode.context; // 当前vue对象
        const SELECTWRAP_DOM = el.querySelector(
          ".el-select-dropdown .el-select-dropdown__wrap"
        );
        if (SELECTWRAP_DOM) {
          SELECTWRAP_DOM.removeEventListener("scroll", function () {
            binding.value.SELECTWRAP_DOM_index = 0;
          });
        }
      },
    },
  },
  data(){
    return{
      regionList:[]
    }
  },
  mounted() {
    this.getSelect();
  },
  methods: {
    //零件编码的选择事件
    productCodeChange(params) {
      this.form.productName = this.model[0].child.filter((item) => {
        return item.key == params;
      })?.[0]?.value;
    },
    getSelect() {
      //货主的下拉数据
      this.get({
        url: Matter.selectOwnerList,
      }).then((res) => {
        this.Handle_Select({
          keyword: "ownerId",
          handleData: this.model,
          list: res.result,
          config: {
            type: "type",
            prop: "prop",
            children: "child",
          },
        });
      });
      //库区的下拉数据
      this.get({
        url: Basic.selectRegionList,
      }).then((res) => {
        this.Handle_Select({
          keyword: "regionId",
          handleData: this.model,
          list: res.result,
          config: {
            type: "type",
            prop: "prop",
            children: "child",
          },
        });
        this.regionList = res.result.filter(item=>{
          return item.value.includes("立库");
        })
      });
    },
    selectChange(obj, val) {
      let arr = obj.child.filter((item) => {
        return item.key == val;
      });
      if (obj.prop == "ownerId") {
        this.form.ownerName = arr[0].value;
      } else if (obj.prop == "regionId") {
        this.form.regionName = arr[0].value;
      }
    },
    //确定按钮
    submitForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.dialogFormVisible = false;
          this.$emit("addRow", this.form);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleOpen(formName) {
      this.$nextTick(() => {
        this.$refs[formName].clearValidate();
      });
    },
    remoteMethod(query) {
      if (query !== "") {
        if (query.length < 3) return false;
        this.model[0].loading = true;
        this.model[0].loadmores.SELECTWRAP_DOM_index = 0;
        this.get({
          url: InBound.getProductInfo,
          data: {
            keyword: query,
          },
        }).then((res) => {
          res.result = res.result.map((item) => {
            return {
              ...item,
              keyValue: item.key + "(" + item.value + ")",
            };
          });
          this.model[0].loading = false;
          let index = this.model[0].loadmores.SELECTWRAP_DOM_index;
          this.model[0].tempBoxData = res.result;
          this.model[0].child = res.result.slice(index, index + 10);
        });
      } else {
        this.model[0].tempBoxData = [];
        this.model[0].child = [];
      }
    },
    loadmoreGX() {
      let obj = this.model[0];
      if (obj.loadmores.flage == "productCode") {
        let addData = [];
        let index = obj.loadmores.SELECTWRAP_DOM_index;
        let data = obj.child;
        addData = obj.tempBoxData.slice(index, index + 10);
        this.model[0].child = data.concat(addData);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep .el-divider--horizontal {
  margin-top: 0;
}
</style>
