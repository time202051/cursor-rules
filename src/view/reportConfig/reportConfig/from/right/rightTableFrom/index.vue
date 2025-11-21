<template>
  <div class="dialogbox dialogfrom">
    <div class="from">
      <el-form :model="fromData" ref="form_Data" :rules="rules">
        <el-row>
          <el-col>
            <el-form-item label="表头文本" prop="title">
              <el-input
                clearable
                v-model="fromData.title"
                auto-complete="off"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="字段名" prop="field">
              <el-input
                clearable
                v-model="fromData.field"
                auto-complete="off"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="列宽" prop="width">
              <el-input
                clearable
                v-model="fromData.width"
                auto-complete="off"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="排序" prop="sortorder">
              <el-input
                clearable
                v-model="fromData.sortorder"
                auto-complete="off"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <!-- <el-form-item label="格式化" prop="formatter">
            <el-input
              clearable
              v-model="fromData.formatter"
              auto-complete="off"
              placeholder="请输入"
            ></el-input>
          </el-form-item> -->
          <el-form-item label="是否可见" prop="visible">
            <el-switch
              v-model="fromData.visible"
              :active-value="activeVal"
              :inactive-value="inactiveVal"
              style
            ></el-switch>
          </el-form-item>
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
      activeVal:1,
      inactiveVal:2,
      rules: {
        sortorder: [
          {
            required: true,
            message: "必填项",
            trigger: "blur",
          },
        ],
        title: [
          {
            required: true,
            message: "必填项",
            trigger: "blur",
          },
        ],
        field: [
          {
            required: true,
            message: "必填项",
            trigger: "blur",
          },
        ],
      },
      minWidth: "",
      datas: [],
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
            this.obj.show = this.obj.visible == 1 ? "显示" : "隐藏";
            let flag = false;
            let datas = this.datas;
            if (datas.length == 0) {
              flag = true;
              datas.forEach((item) => {
                item.show = item.visible == 1 ? "显示" : "隐藏";
              });
              datas.push(this.obj);
              this.$refs.form_Data.resetFields();
            } else {
              flag = true;
              datas.push(this.obj);
              this.$refs.form_Data.resetFields();
            }

            const filterList = datas.reduce((pre, cur) => {
              if (!pre.map((e) => e.field).includes(cur.field)) {
                pre.push(cur);
              }
              return pre;
            }, []);
            let obj = {
              action: "add",
              rows: filterList,
            };
            // console.log(datas, "表格配置");
            flag && this.$emit("dataFnTable", obj);
          } else {
            this.fromData.show = this.fromData.visible == 1 ? "显示" : "隐藏";
            this.fromData.flageID = this.fromData.queryLabel + "flage";
            let obj = {
              action: "edit",
              fromObj: this.fromData,
            };
            // console.log(this.fromData, "this.obj");
            this.$emit("dataFnTable", obj);
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
