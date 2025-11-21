<template>
  <div class="dialogbox dialogfrom">
    <div class="from">
      <el-form :model="fromData" ref="form_Data" :rules="rules">
        <el-row>
          <el-col>
            <el-form-item label="显示文本" prop="queryLabel">
              <el-input
                clearable
                v-model="fromData.queryLabel"
                auto-complete="off"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="字段名" prop="queryField">
              <el-input
                clearable
                v-model="fromData.queryField"
                auto-complete="off"
                placeholder="请输入"
              >
                <template slot="prepend">query</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="字段类型" prop="inputType">
              <el-select
                v-model="fromData.inputType"
                placeholder="请选择"
                :clearable="true"
                @focus="setMinWidthEmpty"
                class="select"
              >
                <el-option
                  v-for="item in fromDataFn.typeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  :style="{ 'min-width': minWidth + 2 + 'px' }"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="数据源" prop="dataSource">
              <el-input
                clearable
                v-model="fromData.dataSource"
                auto-complete="off"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="默认值" prop="defaultValue">
            <el-input
              clearable
              v-model="fromData.defaultValue"
              auto-complete="off"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <!-- <el-form-item label="启用" prop="enabled">
            <el-switch v-model="fromData.enabled" style></el-switch>
          </el-form-item> -->
        </el-row>
      </el-form>
      <!-- <div>
        <span v-for="(item, index) in datas" :key="index"
          >{{ item.name }}/</span
        >
      </div> -->
    </div>

    <div class="frombutton">
      <div class="btn">
        <el-button type="primary" @click="submitForm('form_Data')"
          >确定</el-button
        >
        <!-- <el-button @click="resetForm('form_Data')">重置</el-button> -->
        <el-button @click="cancel('form_Data')">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {AutoReport} from "@/api/request/swagger";

// import {
//   usualInput,
//   usualInputNumber,
//   usualTextarea,
// } from "@/util/validater.js";
export default {
  data() {
    return {
      rules: {
        inputType: [
          {
            required: true,
            message: "必填项",
            trigger: "blur",
          },
        ],
        queryLabel: [
          {
            required: true,
            message: "必填项",
            trigger: "blur",
          },
        ],
        queryField: [
          {
            required: true,
            message: "必填项",
            trigger: "blur",
          },
        ],
      },
      minWidth: "",
      datas: [],
      obj: {},
    };
  },
  name: "addModify",
  props: {
    fromData: Object,
    fromDataFn: Object,
  },
  watch: {},
  methods: {
    //设置宽度最小值
    setMinWidthEmpty(val) {
      this.minWidth = val.srcElement.clientWidth;
      //无数据情况下
      var mpty = document.getElementsByClassName("el-select-dropdown__empty");
      if (mpty.length > 0) {
        mpty[0].style["min-width"] = val.srcElement.clientWidth + 2 + "px";
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((v) => {
        if (v) {
          if (this.fromData.action == "add") {
            this.obj = { ...this.fromData };
            this.obj.flageID = this.obj.queryLabel + "flage";
            this.obj.queryField = "query" + this.obj.queryField;
            let flag = false;
            let datas = this.datas;
            if (datas.length == 0) {
              datas.push(this.obj);
              this.$refs.form_Data.resetFields();
              flag = true;
            } else {
              flag = true;
              datas.push(this.obj);
              this.$refs.form_Data.resetFields();
            }
            const filterList = datas.reduce((pre, cur) => {
              if (!pre.map((e) => e.queryField).includes(cur.queryField)) {
                pre.push(cur);
              }
              return pre;
            }, []);
            let obj = {
              action: "add",
              rows: filterList,
            };
            // console.log(this.datas, "查询配置");
            flag && this.$emit("dataFn", obj); // 这个是不是在添加到 dat ？yes 试试 好了哒
          } else {
            let obj1 = { ...this.fromData };
            if (!(obj1.queryField.substring(0, 5) == "query")) {
             obj1.queryField = "query" + this.fromData.queryField;
            }
            let obj = {
              action: "edit",
              fromObj: obj1,
            };
            // console.log(this.fromData, "this.obj");
            this.$emit("dataFn", obj);
          }
        }
      });
    },
    typeListChange(val) {
      this.fromData.type = val.value;
      this.fromData.typeName = val.label;
    },
    //取消
    cancel() {
      layer.closeAll();
      this.$refs.form_Data.resetFields();
    },

    resetForm(formName = "form_Data") {
      this.$refs[formName].resetFields();
    },
  },
};
// this.post({
//   defaultUrl: "url",
//   data: datas,
// }).then((res, er) => {
// layer.msg(msg + "成功");
// layer.closeAll("page");
// if (typeof this.fromData.fn == "function") {
//   this.fromData.fn();
// }
// });
</script>

<style lang='scss'  scoped>
.el-select {
  width: 100%;
}
//@import "../../../../../../assets/style/from/from.less";
.textareastyle {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  font-size: 14px;
  color: #606266;
  display: flex;
  padding: 10px;
  span {
    width: 50px;
  }
}
.frombutton {
  padding: 5px 0px 10px 0px !important;
}
</style>
