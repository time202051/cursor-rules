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
      <template slot="lang" slot-scope="scope">
        <span>{{ scope.row.lang | formatNumberFilter }}</span>
      </template>
      <template slot="width" slot-scope="scope">
        <span>{{ scope.row.width | formatNumberFilter }}</span>
      </template>
      <template slot="height" slot-scope="scope">
        <span>{{ scope.row.height | formatNumberFilter }}</span>
      </template>
      <template slot="maxvolume" slot-scope="scope">
        <span>{{ scope.row.maxvolume | formatNumberFilter }}</span>
      </template>
      <template slot="maxWeight" slot-scope="scope">
        <span>{{ scope.row.maxWeight | formatNumberFilter }}</span>
      </template>
      <template slot="maxCount" slot-scope="scope">
        <span>{{ scope.row.maxCount | formatNumberFilter }}</span>
      </template>
    </MyTable>
    <dialogTemplate :form="form"></dialogTemplate>
    <printTemplate v-show="false" class="printDiv"> </printTemplate>
    <div v-show="false" id="barcodeBox">
      <div
        v-for="item in multipleSelection"
        :key="item.code"
        style="page-break-after: always; margin: 0px auto"
      >
        <img :id="'L' + item.code" src="" alt="" />
      </div>
    </div>
  </div>
</template>
<script>
import { Basic } from "@/api/request/swagger";
import minxin from "./index.js";
import JsBarcode from "jsbarcode";
import printTemplate from "./print/index.vue";
export default {
  name: "containerMasterManagement",
  mixins: [minxin],
  mounted() {
    this.getTable();
    this.getSelect();

  },
  components: { printTemplate },
  data() {
    return {
      newCode: "",
      multipleSelection: [],
    };
  },
  methods: {
    getTable() {
      this.get({
        url: Basic.getContainerList,
        isLoading: true,
        data: Object.assign(this.formSearchData.value, {
          Page: this.paginations.page,
          MaxResultCount: this.paginations.limit,
        }),
      }).then((res) => {
        this.tableData.rows = res.result.items;
        this.paginations.total = res.result.totalCount;
        this.tableData.emptyImg = true;
      });
    },
    getSelect() {
      //容器类型下拉数据
      this.get({
        url: Basic.selectContainerTypeList,
        isLoading: false,
      }).then((res) => {
        this.Handle_Select({
          keyword: "containerTypeId",
          handleData: this.form.model,
          list: res.result,
          config: { type: "type", prop: "prop", children: "child" },
        });
        this.Handle_Select({
          keyword: "ContainerTypeId",
          handleData: this.formSearchData.tableSearch,
          list: res.result,
          config: { type: "inputType", prop: "value", children: "children" },
        });
      });
      //区域下拉数据
      this.get({
        url: Basic.selectRegionList,
        isLoading: false,
      }).then((res) => {
        this.Handle_Select({
          keyword: "regionId",
          handleData: this.form.model,
          list: res.result,
          config: { type: "type", prop: "prop", children: "child" },
        });
        this.Handle_Select({
          keyword: "RegionId",
          handleData: this.formSearchData.tableSearch,
          list: res.result,
          config: { type: "inputType", prop: "value", children: "children" },
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
    // 编辑
    update() {
      let data = this.multipleSelection;
      if (data.length == 0 || data.length > 1)
        return this.$message.info("请选择一条数据");
      this.form.requestData.flage = "update";
      this.form.dialogFormVisible = true;
      this.form.title = "编辑容器";
      this.form.value = {
        code: data[0].code,
        containerName: data[0].containerName,
        containerTypeId: data[0].containerTypeId, //容器类型
        containerShapeType: data[0].containerShapeType, //容器属性
        regionId: data[0].regionId, //区域
        maxvolume: data[0].maxvolume,
        maxWeight: data[0].maxWeight,
        maxCount: data[0].maxCount,
        enabled: data[0].enabled,
        remark: data[0].remark,
        id: data[0].id,
      };
    },
    // 创建
    create() {
      this.form.dialogFormVisible = true;
      this.form.requestData.flage = "add";
      this.form.title = "新增容器";
      this.form.value = {
        code: "",
        containerName: "",
        containerTypeId: "", //容器类型
        containerShapeType: "", //容器属性
        regionId: "", //区域
        maxvolume: 0,
        maxWeight: 0,
        maxCount: 0,
        enabled: true,
        remark: "",
      };
    },
    // 打印
    print() {
      let data = this.multipleSelection;
      if (data.length == 0) return this.$message.info("请选择数据");
      data.forEach((item) => {
        JsBarcode("#L" + item.code, item.code, {
          format: "CODE128", //条形码的格式
          width: 2, //线宽
          height: 70, //条码高度
          lineColor: "#000", //线条颜色
          displayValue: true, //是否显示文字
          margin: 2, //设置条形码周围的空白区域
          text: item.code, //覆盖显示的文本
          // fontOptions:"bold",//使文字加粗体或变斜体
          font: "fantasy", //设置文本的字体
          textAlign: "center", //设置文本的水平对齐方式
          textPosition: "bottom", //设置文本的垂直位置
          textMargin: 2, //设置条形码和文本之间的间距
          fontSize: 15, //设置文本的大小
        });
      });
      setTimeout(() => {
        $("#barcodeBox").show();
        $("#barcodeBox").jqprint();
        $("#barcodeBox").hide();
      }, 2000);
    },
    // 导出按钮
    export() {
      this.post({
        url: Basic.exportContainer,
        isLoading: true,
        responseType: "blob",
        data: Object.assign(this.formSearchData.value, {
          Page: this.paginations.page,
          MaxResultCount: this.paginations.limit,
        }),
      }).then((res) => {
        this.fnexsl(res); //fnexsl封装的导出方法
      });
    },
  },
};
</script>
<style></style>
