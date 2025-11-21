<template>
  <div class="autoTable el-table">
    <table class="table table-bordered" id="hl-tree-table">
      <thead>
        <tr>
          <th v-for="(column,index) in cloneColumns" :key="column.type" :style="tdStyle(column)">
            <label v-if="column.type === 'selection'">
               <el-checkbox
                :indeterminate="isIndeterminateAll"
                v-model="checkAll"
                @change="handleCheckAll"
              />
            </label>
            <label>{{ renderHeader(column, index)}}</label>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item,index) in modelItems"
          :key="`tr-${index}`"
          :class="{'active':item.flag}"
          v-show="show(item)"
        >
          <!-- @click="RowClick(item,$event,index)点击事件需要优化，复选框单元格不要点击事件                     @click="toggle(item)"  v-show="show(item)"-->
          <template v-for="(column,snum) in columns">
            <template v-if="column.type==='selection'">
              <td :class="column.type" :key="`td-${snum}`" :style="tdStyle(column)">
                <label>
                  <el-checkbox
                    :indeterminate="item.isChecked === 2"
                    :value="item.isChecked==1"
                      @change="handleCheckClick(item)"
                  />
                </label>
              </td>
            </template>
            <template v-else>
              <td
                :class="column.type"
                :key="`td-${snum}`"
                :style="tdStyle(column)"
                @click="RowClick(item,$event,index)"
              >
                <div
                  v-if="!column.type"
                  class="treebodycontent"
                  style="width:100%;text-overflow: ellipsis;overflow: hidden;display: -webkit-box;-webkit-box-orient: vertical; -webkit-line-clamp: 2; overflow: hidden;"
                  @mouseenter="handleCellMouseEnter($event,disabled)"
                >
                <label class="cell">
                  <span v-if="snum==iconRow(snum)" @click.stop="toggle(item)"> <!--  v-show="show(item)" @change="handleCheckClick(item)" @click.stop="toggle(item)" -->
                    <i
                      :style="{marginLeft: (item.level - 1) * 13 + 'px'}"
                      v-if="item.child&&item.child.length>0"
                      :class="{'el-icon-caret-right':!item.expanded,'el-icon-caret-bottom':item.expanded }"
                    ></i>
                      <i v-else :style="{marginLeft: (item.level - 1) * 13 + 'px'}"  class="ms-tree-space" ></i>
                  </span>
                  <span
                    v-else
                  >
                    <!-- <i :style="{marginLeft: (item.level - 1) * 13 + 'px'}"  class="ms-tree-space" ></i> -->
                  </span>
                  <span v-if="item.type == 1" > <span v-if="!renderBody(item,column)"></span> <el-tag v-else  size="mini"> {{renderBody(item,column) }}</el-tag></span>
                  <span v-if="item.type != 1">  {{renderBody(item,column) }}</span>

                  </label>
                </div>
              </td>
            </template>
          </template>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { deepClone } from "../../utils/TreeGridClone";
// import { Basicapi } from "@/api/cngfigrequestAddress/config";
// import { sendRequest, GetDictionarys } from "@/api/utils/http";
import Tooltip from 'tooltip.js'
export default {
  name: "TreeGrid",
  props: {
    columns: Array,//表头
    // 内容
    modelItemss: {
      type: Array,
      default: function() {
        return [];
      }
    },
    Dictionarytype:String
    // expandAll: {
    //   type: Boolean,
    //   default: false
    // }
  },
  data() {
    return {
      disabled:false,//提示框
      checkAll: false,
      cloneColumns: [], //处理后的表头数据
      modelItems:[],//修改好的数据
      tdsWidth: 0, //td总宽
      timer: false, //控制监听时长
      dataLength: 0, //树形数据长度
      multipleSelection: [], //批量删除
      romid: ""
    };
  },
  watch: {
    modelItemss: {
      handler(newValue, oldValue) {
        this.modelItems = newValue;
      },
      deep: true
    },
    //监听从父级传过来的值

    columns: {
      //这是vue的规定写法，当你watch的值发生变化的时候，就会触发这个handler，这是vue内部帮你做的事情。
      handler() {
        this.cloneColumns = this.makeColumns();
      },
      deep: true
    }
  },
  computed: {
    //检测是不是全选
    isCheckedAll() {
      return (
        Boolean(this.modelItems.length) &&
        this.modelItems.every(({ isChecked }) => isChecked === 1)
      );
    },
    isIndeterminateAll() {
      return (
        this.modelItems.some(({ isChecked }) => isChecked === 0) &&
        this.modelItems.some(({ isChecked }) => isChecked !== 0)
      );
    },

  },
  mounted() {
    this.cloneColumns = this.makeColumns();
    this.modelItems=this.renderBodydata();
    console.log(this.modelItems,'this.modelItems')
  },
  methods: {
//文本超出显示提示框
handleCellMouseEnter(event,disabled){
    this.disabled=!disabled
     var cell=event.target.querySelector(".cell");
   if(cell.innerText.length>32 && cell.offsetWidth>150){
       new Tooltip(cell, {
      placement:"top", // or bottom, left, right, and variations
      html: true,
      title: cell.innerText,
      // theme: 'light',
    //  activeClass: 'my-tooltip-active',
    // triggerClass: 'my-tooltip-toggle-btn'
    });
   }
},
    //处理内容
    renderBodydata(){
    let TreeGridbodycontent=deepClone(this.modelItemss);
    // console.log(TreeGridbodycontent,'TreeGridbodycontent')
    return TreeGridbodycontent
    },
    // 有无多选框折叠位置优化
    iconRow(snum) {
      if(snum==0){
        return 0
      }
      return false
      // if (this.columns[snum].type == "selection") {
      //   return 0;
      // }
      // return 1;
    },
    // 设置td宽度,td的align
    tdStyle(column) {
      var style = {};
      if (column.align) {
        style["text-align"] = column.align;
      }
      if (column.width) {
        style["width"] = column.width+"px";
      }
      if (column.type) {
        style["width"] =column.width+'px';
      }
      return style;
    },
    //点击某一单元格高亮显示
    RowClick(item, $event, index) {
      item.flag=!item.flag
        this.modelItems.forEach((v,index)=>{
          // console.log(v,'v')
          // console.log(item,'item')
          if(v.id==item.id){
            v.flag= item.flag;
          }else{
             v.flag=false;
          }
        this.$set(this.modelItems,index,v)
        })
        // console.log(item,'item')
      this.$emit("on-selections-change",this.modelItems.filter(({ flag }) => flag == true))
    },
    multipleSelectionAction(value){
     if( value=="DeleteDictionary"){
       this.multipleSelection=this.modelItems.filter(({ flag }) => flag == true);
       if( this.multipleSelection.length>1) return this.$message.error("不支持多删");
       if(this.multipleSelection.length==0) return this.$message.error("请选择数据");
       let _that=this;
        this.$confirm('此操作删除此条数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          sendRequest({
        url: Basicapi.DeleteDictionary,
        method: "post",
        isLoading: true,
        data:{id:this.multipleSelection[0].id},
        success: function(res) {
        _that.$message.success("删除成功");
         _that.$emit("updata");
          // _that.initDatas(_that.parentId);
        },
        failed: function() {
            layer.msg(res.error.message)
        },
        error: function(res) {
          layer.msg(res.error.message)
        }
      });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
     }
    },
    // 处理表头数据
    makeColumns() {
      let columns = deepClone(this.columns);
      this.tdsWidth = 0;
      columns.forEach((column, index) => {
        column._index = index;
        column._width = column.width ? column.width : "";
        column._sortType = "normal";
        this.tdsWidth += column.width ? parseFloat(column.width) : 0;
      });
      return columns;
    },
    //  隐藏显示
    show(item) {
      return (
        item.level === 0 ||
        (item.parent && this.findNodeLike(item.parent).expanded && item.isShow)
      );
    },
    toggle(item) {
      const expanded = item.expanded;
      item.expanded = !expanded;
      if (item.child) {
        if (expanded) {
          this.close(item.child);
        } else {
          this.open(item.child);
        }
      }
      this.$forceUpdate();
    },
    findNodeLike(node) {
      let nodeLike = node;
      const items = this.modelItems;
      for (let i = 0, length = items.length; i < length; i++) {
        if (node.id === items[i].id) {
          nodeLike = items[i];
        }
      }
      return nodeLike;
    },
    findIndex(node) {
      return this.modelItems.findIndex(({ id }) => id === node.id);
    },
    open(items) {
      items.forEach(child => {
        this.modelItems.splice(this.findIndex(child), 1, {
          ...child,
          isShow: true
        });
        if (child.child && child.expanded) {
          this.open(child.child);
        }
      });
    },
    close(items) {
      items.forEach(child => {
        this.modelItems.splice(this.findIndex(child), 1, {
          ...child,
          isShow: false
        });
        if (child.child) {
          this.close(child.child);
        }
      });
    },
    //点击check勾选框,判断是否有children节点 如果有就一并勾选
    handleCheckClick(data, column) {
      if (data.parent == null) {
        this.setNode(data, data.isChecked !== 0 ? 0 : 1);
      } else {
        this.setNode(data, data.isChecked !== 0 ? 0 : 1);
        this.setParent(data, data.isChecked == 1 ? 1 : 0);
      }
      //判断所有子级全选
      if (this.modelItems.every(v => v.isChecked == 1)) {
        this.checkAll = true;
      } else {
        this.checkAll = false;
      }

    //   let flag = data.isChecked == 1 ? true : false;
    //  if (flag) {
    //            this.$emit("on-selections-change", data);
    //  }else{
    //     this.$emit("on-selections-change",{});
    //    }
      //父级显示
    },
    setNodes(item, checked, data) {
      if (item.id != data.id) {
        if (item.child) {
          item.child.forEach((item, index) => {
            this.setNodes(item, checked, data);
          });
        }
      } else {
        //优化父级被选中孩子也要被选中
        item.isChecked=checked
        this.modelItems.splice(this.findIndex(data), 1, {
          ...data,
          isChecked:checked
        })
       Object.assign(data, { ...data, isChecked: checked });
        if (item.child && data.child.length) {
          item.child.forEach((item, index) => {
            this.isCheckedall(item, checked);
          });
        }
      }
    },
    setNode(data, checked) {
      if (Array.isArray(this.modelItems)) {
        this.modelItems.forEach((item, index) => {
          this.setNodes(item, checked, data);
        });
      }
    },
    //循环父级
    // setParents(items, isChecked) {
    //   // if(items.child){
    //   // items.child.forEach((item, index) => {
    //   //     this.isCheckedall(item, isChecked);
    //   //   });
    //   // }
    //   if (items.parent.child.every(v => v.isChecked == 0)) {
    //     this.modelItems[this.findIndex(items.parent)].isChecked = 0;
    //   } else if (items.parent.child.every(v => v.isChecked == 1)) {
    //     this.modelItems[this.findIndex(items.parent)].isChecked = 1;
    //   } else {
    //     this.modelItems[this.findIndex(items.parent)].isChecked = 2;
    //   }
    //   if (items.parent.parent) {
    //     this.setParents(items.parent);
    //   }
    // },
    setParent(data) {
      if(data.parent){
        if (Array.isArray(this.modelItems)) {
        this.modelItems.forEach((item, index) => {
            const siblings = this.modelItems.filter(
            ({ parent }) => (parent && parent.id) === data.parent.id
          );
         if(siblings.every(v=>v.isChecked==1)){
           data.parent.isChecked=1
           this.modelItems[this.findIndex(data.parent)].isChecked=1;
         }else if(siblings.every(v=>v.isChecked==0)){
            data.parent.isChecked=0
              this.modelItems[this.findIndex( data.parent)].isChecked=0;
         }else{
            data.parent.isChecked=2
            this.modelItems[this.findIndex( data.parent)].isChecked=2;
         }
        });
      }
      if (data.parent.parent) {
          this.setParent(data.parent);
        }
      }
    },
    //全选事件
    isCheckedall(data, Checked) {
      if (Array.isArray(data)) {
        data.forEach((item, index) => {
          this.isCheckedall(item, Checked);
        });
      } else {
        this.modelItems[this.findIndex(data)].isChecked = Checked;
        data.isChecked = Checked;
        if (data.child) {
          data.child.forEach(v => {
            this.isCheckedall(v, Checked);
          });
        }
      }
    },
    //checkbox 全选 选择事件
    handleCheckAll(checked) {
      let isChecked = checked ? 1 : 0;
      let items = this.modelItems;
      items.map(item => {
        items.splice(this.findIndex(item), 1, {
          ...item,
          isChecked
        });
      });
      this.isCheckedall(this.modelItems, isChecked);
      this.modelItems = items;
      this.$emit(
        "on-selections-change",
        deepClone(this.modelItems).filter(({ flag }) => flag == true)
      );
    },

    // 返回表头
    renderHeader(column, $index) {
      if ("renderHeader" in this.columns[$index]) {
        return this.columns[$index].renderHeader(column, $index);
      } else {
        return column.title || "#";
      }
    },

    // 返回内容
    renderBody(row, column, index) {
      // console.log(row)
      return row[column.key];
    }
    // type(obj) {
    //   var toString = Object.prototype.toString;
    //   var map = {
    //     "[object Boolean]": "boolean",
    //     "[object Number]": "number",
    //     "[object String]": "string",
    //     "[object Function]": "function",
    //     "[object Array]": "array",
    //     "[object Date]": "date",
    //     "[object RegExp]": "regExp",
    //     "[object Undefined]": "undefined",
    //     "[object Null]": "null",
    //     "[object Object]": "object"
    //   };
    //   return map[toString.call(obj)];
    // }
  }
};
</script>
<style lang='scss' scoped>
.el-table__body tr.current-row > td {
  /* background: #f57878 !important; */
}
.autoTable {
  overflow: auto;
  width: 100%;
  max-height: e("calc(100vh - 180px)");
  height:600px;
}

table {
  width: 100%;
  border-spacing: 0;
  border-collapse: collapse;
  word-break: break-all;
  text-overflow: ellipsis;
  color: #909399;
  table-layout: fixed;
}

.table-bordered {
  /* border: 1px solid #ebebeb; */
}

.table > tbody > tr > td,
.table > tbody > tr > th,
.table > thead > tr > td,
.table > thead > tr > th {
  /* border-top: 1px solid #e7eaec; */
  line-height: 1.42857;
  padding: 8px;
  vertical-align: middle;
}

.table-bordered > tbody > tr > td,
.table-bordered > tbody > tr > th,
.table-bordered > tfoot > tr > td,
.table-bordered > tfoot > tr > th,
.table-bordered > thead > tr > td,
.table-bordered > thead > tr > th {
 /* border: 1px solid #e7e7e7; */
 border:1px solid #dfe6ec;
}

.table > thead > tr > th {
  /* border-bottom: 1px solid #ddd; */
}

.table-bordered > thead > tr > td,
.table-bordered > thead > tr > th {
  /* background-color: #f5f5f6; */
}

#hl-tree-table > tbody > tr {
  /* background-color: #fbfbfb; */
}

#hl-tree-table > tbody > .child-tr {
  /* background-color: #ffff; */
}
/* 设置内容宽度 */
#hl-tree-table > tbody > .treebodycontent {
  display: block;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
#hl-tree-table > tbody > .active {
  background: #F4F6Fc !important;
  color: #7881c2;
}

#hl-tree-table > tbody > .active1 {

}
// .selection{
//   display: none;
// }

.ms-tree-space {
  position: relative;
  top: 1px;
  display: inline-block;
  font-style: normal;
  font-weight: 400;
  line-height: 1;
  width: 14px;
  height: 14px;
}

.ms-tree-space::before {
  content: "";
}

#hl-tree-table th > label {
  margin: 0px 10px;
}
.treebodycontent {
  padding-left: 10px;
}
.tooltip{
  background: black;
    color: white;
}
</style>
