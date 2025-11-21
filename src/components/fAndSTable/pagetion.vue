<!--
 * @Description: 
 * @Autor: gaoxue
 * @Date: 2021-10-09 16:49:45
 * @LastEditors: gaoxue
 * @LastEditTime: 2021-10-09 16:49:46
-->
<template>
  <div>
    <el-pagination
      class="el-pagination-box"
      v-if="total > 0"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="curPage"
      :page-sizes.sync="pageSizes"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>
<script>
export default {
    name:'pagetionTemplate',
  props: {
    positionsflage: Boolean,
    curr_page: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      default: 0
    },
    page_size: {
      type: Number,
      default: 5
    },
    pageSizes: {
      type: Array
    }
  },
  data() {
    return {
      type: "",
      // pageSizes: [10, 20, 30, 40, 50,60],
      // 当前页数据操作需要传到父组件，直接操作传过来的curr_page，vue会警告，所以在这里转一下
      pageSize: this.page_size,
      curPage: this.curr_page
    };
  },
  mounted() {},
  methods: {
    handleSizeChange(val) {
      // debugger;
      this.pageSize = val;

      // 给第一页添加状态
      this.curPage = 1;
      let dataPage = {
        curPage: 1,
        pageSize: this.pageSize
      };
      this.$emit("change", dataPage);
    },
    handleCurrentChange(val) {
      this.curPage = val;
      let dataPage = {
        curPage: this.curPage,
        pageSize: this.pageSize
      };
      this.$emit("change", dataPage);
    },
    // 首尾页事件
    goFirLas(event) {
      var evt = window.event || event;
      var target = evt.srcElement ? evt.srcElement : evt.target;
      if (target.offsetLeft == 0 && target.offsetHeight > 23) {
        // 当前页处于第一页不触发首页事件
        if (!(this.curPage == 1)) {
          this.handleCurrentChange(1);
        }
      } else if (target.offsetLeft > 0 && target.offsetHeight > 23) {
        // 当前页处于最后一页不触发尾页事件
        if (!(this.curPage == Math.ceil(this.total / this.pageSize))) {
          this.handleCurrentChange(Math.ceil(this.total / this.pageSize));
        }
      }
    }
  },
  watch: {
    curPage: {
      deep: true,
      handler: function(val) {
        this.curPage = val;
      }
    },
    positionsflage: {
      deep: true,
      handler: function(val) {
        if (this.positionsflage) {
          // debugger;
          this.pageSize = 10;
          this.curPage = 1;
        }
      }
    }
  }
};
</script>
 