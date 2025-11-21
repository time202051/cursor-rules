<template>
  <div>
    <el-form
      class="formBox"
      :rules="rightRules"
      ref="form"
      :model="form"
      label-width="80px"
    >
      <el-form-item label="报表名称" prop="queryName">
        <el-input v-model="form.queryName"></el-input>
      </el-form-item>

      <el-form-item label="报表编码" prop="queryCode">
        <!-- :readonly="readonly" -->
        <el-input v-model="form.queryCode"></el-input>
      </el-form-item>
      <el-form-item class="formBtn">
        <el-button type="primary" size="mini" @click="onSubmit('form')"
          >保存</el-button
        >
        <el-button size="mini" @click="resetTable('form')">重置</el-button>
      </el-form-item>
    </el-form>
    <div class="tabsBox">
      <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="查询条件配置" name="first">
<!--          <div>-->
<!--            <el-button type="primary" size="mini" @click="add('form')">-->
<!--              <i class="el-icon-plus"></i>-->
<!--              添加-->
<!--            </el-button>-->
<!--            <el-button type="primary" size="mini" @click="edit('form')">-->
<!--              <i class="el-icon-edit"></i>-->
<!--              修改-->
<!--            </el-button>-->
<!--          </div>-->
          <div >
            <!-- 表格 -->
            <my-table
              :paginations="paginations"
              :btnlist="[{
                title:'添加',
                icon:'el-icon-plus',
                method:this.add
              },{
                title:'修改',
                icon:'el-icon-edit',
                method:this.edit
              }]"
              :emptyImg="tableData.emptyImg"
              :tableData="tableData"
              :multipleSelection="multipleSelection"
              @SelectionChange="SelectionChange"
              @handleSizeChange="handleSizeChange"
              @handleindexChange="handleindexChange"
            ></my-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="查询表格配置" name="second">
<!--          <div>-->
<!--            <el-button type="primary" size="mini" @click="addTable('form')">-->
<!--              <i class="el-icon-plus"></i>-->
<!--              添加-->
<!--            </el-button>-->
<!--            <el-button type="primary" size="mini" @click="editTable('form')">-->
<!--              <i class="el-icon-edit"></i>-->
<!--              修改-->
<!--            </el-button>-->
<!--          </div>-->
          <div >
            <!-- 表格 -->
            <my-table
              :paginations="paginationsTable"
              :btnlist="[{
                title:'添加',
                icon:'el-icon-plus',
                method:this.addTable
              },{
                title:'修改',
                icon:'el-icon-edit',
                method:this.editTable
              }]"
              :emptyImg="tableDataTable.emptyImg"
              :tableData="tableDataTable"
              @SelectionChange="SelectionTableChange"
              @handleSizeChange="handleSizeTableChange"
              @handleindexChange="handleindexTableChange"
            ></my-table>

<!--            <renderTable-->
<!--              ref="renderTable"-->
<!--              :paginations="paginationsTable"-->
<!--              :btnlist="[]"-->
<!--              :emptyImg="tableDataTable.emptyImg"-->
<!--              :tableData="tableDataTable"-->
<!--              @SelectionChange="SelectionTableChange"-->
<!--              @handleSizeChange="handleSizeTableChange"-->
<!--              @handleindexChange="handleindexTableChange"-->
<!--            ></renderTable>-->
          </div>
        </el-tab-pane>
        <el-tab-pane label="查询脚本" name="third">
          <el-input
            type="textarea"
            :autosize="{ minRows: 20 }"
            placeholder="请输入脚本"
            v-model="form.querySQL"
          >
          </el-input>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 增加编辑 -->
    <rightFromTemplate
      v-show="false"
      ref="rightFrom"
      id="rightFrom"
      :fromDataFn="fromDataFn"
      :fromData="fromData"
      @dataFn="dataFn"
    ></rightFromTemplate>
    <rightTableFromTemplate
      v-show="false"
      ref="rightTableFromTemplate"
      id="rightTableFromTemplate"
      :fromDataFn="fromDataFn"
      :fromData="fromData"
      @dataFnTable="dataFnTable"
    ></rightTableFromTemplate>
  </div>
</template>

<script>
import rightFromTemplate from "./rightFrom/index.vue";
import rightTableFromTemplate from "./rightTableFrom/index.vue";
import {AutoReport} from "@/api/request/swagger";
import MyTable from '@/components/MyTable'

export default {
  name: "reportConfigRight",
  props: {
    leftFn: Object,
  },
  data() {
    return {
      form: {
        queryName: "",
        queryCode: "",
        querySQL: this.leftFn.treeData.querySQL,
      },
      rightRules: {
        queryName: [
          {
            required: true,
            message: " ",
            trigger: "blur",
          },
        ],
        queryCode: [
          {
            required: true,
            message: " ",
            trigger: "blur",
          },
        ],
      },
      activeName: "first",
      //点击select 获取到的值
      multipleSelection: [], //挑选数据: [],
      emptyImg: false,

      tableData: {
        loading: false,
        toggleRowFlage: false,
        emptyImg: true,
        options: {
          selection: true, //多选框
          index: null, //序号
          headTool: false, //开启头部工具栏
          refreshBtn: false, //开启表格头部刷新按钮
          downloadBtn: false, //开启表格头部下载按钮
        }, //序号和复选框
        rows: [], //表数据
        columns: [
          {
            label: "",
            minWidth: "50",
            type: "selection",
            show: true,
          },
          {
            prop: "queryLabel",
            label: "显示文本",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "queryField",
            label: "字段名",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "inputType",
            label: "字段类型",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "dataSource",
            label: "数据源",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "defaultValue",
            label: "默认值",
            minWidth: "",
            show: true,
          },
          //   {
          //     prop: "remark",
          //     label: "操作",
          //     minWidth: "",
          //     show: true,
          //     render: (m) => {
          //       return (
          //         <span>
          //           <span onClick={this.handleDeatils} style="color: red;">
          //             {操作}
          //           </span>
          //         </span>
          //       );
          //     },
          //   },
        ], //表头
        operates: [
          {
            isShow: true,
            label: "删除",
            method: this.del,
          },
        ], //表格里面的操作按钮
        tableHeightDiff: 350,
      },
      paginations: {
        page: 1, //当前位于那页面
        total: 10, //总数
        limit: 20, //一页显示多少条
        pagetionShow: true,
      },
      tableDataTable: {
        loading: false,
        toggleRowFlage: false,
        emptyImg: true,
        options: {
          selection: true, //多选框
          index: null, //序号
          headTool: false, //开启头部工具栏
          refreshBtn: false, //开启表格头部刷新按钮
          downloadBtn: false, //开启表格头部下载按钮
        }, //序号和复选框
        rows: [], //表数据
        columns: [
          {
            label: "",
            minWidth: "50",
            type: "selection",
            show: true,
          },
          {
            prop: "title",
            label: "表头文本",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "field",
            label: "字段名",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "width",
            label: "列宽",
            minWidth: "",
            sortable: false,
            show: true,
          },
          {
            prop: "sortorder",
            label: "排序",
            minWidth: "",
            sortable: true,
            show: true,
          },
          {
            prop: "show",
            label: "是否可见",
            minWidth: "",
            show: true,
          },
        ], //表头
        operates: [
          {
            isShow: true,
            label: "删除",
            method: this.delTable,
          },
        ], //表格里面的操作按钮
        tableHeightDiff: 350,
      },
      paginationsTable: {
        page: 1, //当前位于那页面
        total: 10, //总数
        limit: 20, //一页显示多少条
        pagetionShow: true,
      },
      fromDataFn: {
        typeList: [
          {
            value: "text",
            label: "文本输入框",
          },
          {
            value: "number",
            label: "数字输入框",
          },
          {
            value: "select",
            label: "下拉列表",
          },
          {
            value: "picker",
            label: "日期输入框",
          },
        ],
      },
      fromData: {},
      minWidth: 0,
      dataList: [], //查询配置数据
      dataTabeList: [], //表格配置数据
      selectionData: [], //查询配置复选框数据
      selectionTableData: [], //表格配置复选框数据
      readonly: false,
      isadd: 1, //1 新增  //0 修改
    };
  },
  methods: {
    resetTable() {
      this.form = {
        queryName: "",
        queryCode: "",
        querySQL: "",
      };
      this.isadd = 1;
      this.readonly = false;
      this.fromData = {};
      this.tableData.rows = [];
      this.tableDataTable.rows = [];
      this.dataList = []; //查询配置数据
      this.dataTabeList = []; //表格配置数据
      this.selectionData = []; //查询配置复选框数据
      this.selectionTableData = []; //表格配置复选框数据
      this.$refs.form.resetFields();
    },
    //设置宽度最小值
    setMinWidthEmpty(val) {
      this.minWidth = val.srcElement.clientWidth;
      //无数据情况下
      var mpty = document.getElementsByClassName("el-select-dropdown__empty");
      if (mpty.length > 0) {
        mpty[0].style["min-width"] = val.srcElement.clientWidth + 2 + "px";
      }
    },
    onSubmit(formName) {
      this.$refs[formName].validate((v) => {
        if (v) {
          this.post({
            defaultUrl: AutoReport.SaveRPTSql,
            isLoading: false,
            data: {
              queryName: this.form.queryName,
              queryCode: this.form.queryCode,
              querySQL: this.form.querySQL,
              rPTQueryFields: this.tableData.rows,
              rPTPageFields: this.tableDataTable.rows,
              isadd: this.isadd, //1 新增  //0 修改
            },
          }).then((res) => {
            //刷新页面 左边接口  右边查询接口
            this.getTable(this.form);
            this.leftFn.fn();
          });
        } else {
          layer.msg("必填项未填写！");
        }
      });
    },
    arrsort(data){
  if(data.length <= 1) {
    return data
}
  var temp;
  let i=0,j=0,len1=data.length,len2=0;
  for(i=0;i<len1;i++){
    for(j=0,len2=data.length-i-1;j<len2;j++){
     if(data[j].sortorder>data[j + 1].sortorder){
      temp=data[j];
      data[j]=data[j + 1];
      data[j + 1]=temp
     }
    }
  }
  return  data
},
    getTable(obj) {
      if (obj.queryCode) {
        this.form.queryCode = obj.queryCode;
        this.form.queryName = obj.queryName;
        this.form.querySQL = obj.querySQL;
        this.readonly = true;
      }
      this.selectionData = []; //查询配置复选框数据
      this.selectionTableData = []; //表格配置复选框数据
      //获取查询结果展示字段
      this.get({
        defaultUrl: AutoReport.RPTQueryFieldByqueryCode,
        isLoading: true,
        data: { queryCode: obj.queryCode || "" },
      }).then((res) => {
        res.result.forEach((item) => {
          if (!item.flageID) item.flageID = item.queryLabel + "flage";
        });

        this.tableData.rows = res.result;
        this.dataList = res.result;

        // this.paginations.total = res.result.length;
      });
      //获取表格查询条件
      this.get({
        defaultUrl: AutoReport.RPTPageFieldByqueryCode,
        isLoading: false,
        data: { queryCode: obj.queryCode || "" },
      }).then((res) => {
        res.result.forEach((item) => {
          item.show = item.visible == 1 ? "显示" : "隐藏";
          if (!item.flageID) item.flageID = item.field + "flage";
        });
        res.result=this.arrsort(res.result)
        this.tableDataTable.rows = res.result;
        this.dataTabeList = res.result;
        //  this.paginationsTable.total = res.result.length;
      });
    },
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    //分页选择
    handleSizeChange(val) {
      this.paginations.limit = val;
      this.GetAreas();
    },
    handleindexChange(val) {
      this.paginations.page = val;
      this.GetAreas();
    },
    SelectionChange(val) {
      this.selectionData = val;
    },
    del(val) {
      let data = [];
      this.tableData.rows.forEach((item) => {
        if (item.id) {
          if (item.id != val.id) {
            data.push(item);
          }
        } else {
          if (item.rowsID != val.rowsID) {
            data.push(item);
          }
        }
      });
      // this.isadd = 0;
      this.tableData.rows = data;
      this.dataList = this.tableData.rows;
      this.selectionData = [];
      this.$refs.renderTable.$refs.tableRef.clearSelection();
    },
    add(formName) {
      this.$refs[formName].validate((v) => {
        if (v) {
          this.fromData = {
            queryField: null,
            queryLabel: null,
            inputType: null,
            dataSource: null,
            defaultValue: null,
            queryCode: this.form.queryCode,
            action: "add",
            dataRows: this.tableData.rows,
          };

          this.dataList = [];
          this.$refs.rightFrom.datas = [];
          this.layeropen({
            title: "增加查询条件配置信息",
            area: "50%",
            id: $("#rightFrom"),
            end: (index, layero) => {
              this.$refs.rightFrom.$refs.form_Data.resetFields();
              this.$refs.rightFrom.$el.style.display = "none";
              layer.close(index);
              return false;
            },
          });
        } else {
          layer.msg("请先输入报表名称和报表编码");
        }
      });
    },
    edit() {
      if (this.selectionData.length == 0 || this.selectionData.length > 1)
        return layer.msg("请选择一条数据！");
      this.tableData.rows.forEach((item, index) => {
        item.rowsID = "rowsID" + index;
      });
      this.fromData = { ...this.selectionData[0] };
      // this.isadd = 0;
      this.fromData.action = "edit";
      this.fromData.queryCode = this.form.queryCode;
      this.layeropen({
        title: "修改查询条件配置信息",
        area: "50%",
        id: $("#rightFrom"),
        end: (index, layero) => {
          this.$refs.rightFrom.$refs.form_Data.resetFields();
          this.$refs.rightFrom.$el.style.display = "none";
          layer.close(index);
          return false;
        },
      });
    },
    dataFn(data) {
      if (data.action == "add") {
        this.dataList = data.rows;
        let dataRows = [...this.tableData.rows].concat(this.dataList);
        dataRows.forEach((item, index) => {
          item.rowsID = "rowsID" + index;
        });
        console.log(dataRows, "dataRows");
        this.$nextTick(() => {
          this.tableData.rows = dataRows.reduce((pre, cur) => {
            if (!pre.map((e) => e.queryField).includes(cur.queryField)) {
              pre.push(cur);
            }
            return pre;
          }, []);
        });
      } else {
        // this.isadd = 0;
        let tempData = [...this.tableData.rows];
        tempData.forEach((item, index) => {
          if (item.rowsID == data.fromObj.rowsID) {
            tempData[index] = { ...data.fromObj };
          }
        });
        this.$nextTick(() => {
          this.tableData.rows = tempData;
          this.dataList = tempData;
        });
        layer.closeAll();
        // layer.msg("操作成功！");
      }
    },
    // ----------------------------------查询表格配置
    handleSizeTableChange(val) {
      this.paginations.limit = val;
      this.GetAreas();
    },
    handleindexTableChange(val) {
      this.paginations.page = val;
      this.GetAreas();
    },
    SelectionTableChange(val) {
      this.selectionTableData = val;
    },
    delTable(val) {
      let data = [];
      this.tableDataTable.rows.forEach((item) => {
        if (item.id) {
          if (item.id != val.id) {
            data.push(item);
          }
        } else {
          if (item.rowsID != val.rowsID) {
            data.push(item);
          }
        }
      });
      this.tableDataTable.rows = data;
      // this.isadd = 0;
      this.dataTabeList = this.tableDataTable.rows;
      this.selectionTableData = [];
    },
    addTable(formName) {
      this.$refs[formName].validate((v) => {
        if (v) {
          this.fromData = {
            title: null,
            field: null,
            width: null,
            sortorder: null,
            visible: 1,
            queryCode: this.form.queryCode,
            dataRows: this.tableData.rows,
            action: "add",
          };
          this.dataTabeList = [];
          this.$refs.rightTableFromTemplate.datas = [];
          this.layeropen({
            title: "增加查询表格配置信息",
            area: "50%",
            id: $("#rightTableFromTemplate"),
            end: (index, layero) => {
              this.$refs.rightTableFromTemplate.$refs.form_Data.resetFields();
              this.$refs.rightTableFromTemplate.$el.style.display = "none";
              layer.close(index);
              return false;
            },
          });
        } else {
          layer.msg("请先输入报表名称和报表编码");
        }
      });
    },
    editTable() {
      if (
        this.selectionTableData.length == 0 ||
        this.selectionTableData.length > 1
      )
        return layer.msg("请选择一条数据！");
      this.tableDataTable.rows.forEach((item, index) => {
        item.rowsID = "rowsID" + index;
      });
      this.fromData = { ...this.selectionTableData[0] };
      this.fromData.action = "edit";
      this.fromData.queryCode = this.form.queryCode;
      // this.isadd = 0;
      this.layeropen({
        title: "修改查询表格配置信息",
        area: "50%",
        id: $("#rightTableFromTemplate"),
        end: (index, layero) => {
          this.$refs.rightTableFromTemplate.$refs.form_Data.resetFields();
          this.$refs.rightTableFromTemplate.$el.style.display = "none";
          layer.close(index);
          return false;
        },
      });
    },
    dataFnTable(data) {
      if (data.action == "add") {
        this.dataTabeList = data.rows;
        let dataRows = [...this.tableDataTable.rows].concat(this.dataTabeList);
        dataRows.forEach((item, index) => {
          item.rowsID = "rowsID" + index;
        });
        console.log(dataRows, "dataRows表格数据");
        this.$nextTick(() => {
          this.tableDataTable.rows = dataRows.reduce((pre, cur) => {
            if (!pre.map((e) => e.field).includes(cur.field)) {
              pre.push(cur);
            }
            return pre;
          }, []);
        });
      } else {
        let tempData = [...this.tableDataTable.rows];
        tempData.forEach((item, index) => {
          if (item.rowsID == data.fromObj.rowsID) {
            tempData[index] = { ...data.fromObj };
          }
        });
        console.log(tempData, "tempData");
        this.$nextTick(() => {
          this.tableDataTable.rows = tempData;
          this.dataTabeList = tempData;
        });

        layer.closeAll();
        // layer.msg("操作成功！");
      }
    },
  },
  components: {
    MyTable,
    rightFromTemplate,
    rightTableFromTemplate,
  },
};
</script>

<style lang="scss" scoped>
@import url("right.scss");

// .editDataBox {
//   /deep/.el-table th {
//     padding: 5px 0 !important;
//   }
//   /deep/.el-input {
//     height: 100%;
//     /deep/.el-input__inner {
//       border: none;
//       border-radius: 0px;
//       height: 100%;
//       width: 100%;
//       padding: 0 5px;
//     }
//   }
//   /deep/.el-table__body td {
//     //   min-height: 38px;
//     padding: 0px;
//     .cell {
//       height: 100%;
//       padding-left: 0px;
//       padding-right: 0px;
//     }
//   }
//   /deep/.el-table__column-filter-trigger {
//     float: right;
//     line-height: 0px;
//     i {
//       font-size: 25px;
//     }
//   }

//   /deep/.el-table__row:hover > td {
//     background-color: #ffffff !important;
//   }

//   /deep/.el-table__row--striped:hover > td {
//     background-color: #fafafa !important;
//   }
//   * {
//     font-family: "Avenir", Helvetica, Arial, sans-serif;
//   }
//   /deep/.el-input__icon {
//     line-height: 0px !important;
//   }
//   /deep/.el-table__cell {
//     padding: 5px 0px !important;
//   }
// }
</style>
