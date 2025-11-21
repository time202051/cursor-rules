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
      <template slot="height" slot-scope="scope">
        <span>{{ scope.row.height | formatNumberFilter }}</span>
      </template>
      <template slot="layerNum" slot-scope="scope">
        <span>{{ scope.row.layerNum | formatNumberFilter }}</span>
      </template>
      <template slot="floorNum" slot-scope="scope">
        <span>{{ scope.row.floorNum | formatNumberFilter }}</span>
      </template>
      <template slot="columnNum" slot-scope="scope">
        <span>{{ scope.row.columnNum | formatNumberFilter }}</span>
      </template>
      <template slot="childColumnNum" slot-scope="scope">
        <span>{{ scope.row.childColumnNum | formatNumberFilter }}</span>
      </template>
    </MyTable>
    <createTemplate ref="createTemplate" :form="form"></createTemplate>

    <dialogTemplate :form="takeOutForm"></dialogTemplate>
    <dialogTemplate :form="upLocationForm"></dialogTemplate>
  </div>
</template>

<script>
import { Basic } from "@/api/request/swagger";
import createTemplate from "./from/create/index.vue";
import minxin from "./index.js";
export default {
  name: "locationMasterFileManagement",
  mixins: [minxin],
  components: { createTemplate },
  mounted() {
    this.getTable();
    this.getSelect();


  },
  data() {
    return {
      multipleSelection: [],
    };
  },
  methods: {
    getTable() {
      this.get({
        url: Basic.getLocationList,
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
      //库区下拉数据
      this.get({
        url: Basic.selectAreaList,
        isLoading: false,
      }).then((res) => {
        this.Handle_Select({
          keyword: "areaId",
          handleData: this.form.model,
          list: res.result,
          config: { type: "type", prop: "prop", children: "child" },
        });
        this.Handle_Select({
          keyword: "AreaId",
          handleData: this.formSearchData.tableSearch,
          list: res.result,
          config: { type: "inputType", prop: "value", children: "children" },
        });
      });
      // 工作台下拉数据
      this.get({
        url: Basic.selectWorkBenchList,
        isLoading: false,
      }).then((res) => {
        this.Handle_Select({
          keyword: "stagingId",
          handleData: this.form.model,
          list: res.result,
          config: { type: "type", prop: "prop", children: "child" },
        });
      });
      // 区域下拉数据
      this.get({
        url: Basic.selectRegionList,
        isLoading: false,
      }).then((res) => {
        this.Handle_Select({
          keyword: "RegionId",
          handleData: this.formSearchData.tableSearch,
          list: res.result,
          config: { type: "inputType", prop: "value", children: "children" },
        });
      });
      // 多深度通道下拉数据
      this.get({
        url: Basic.selectDepthChannelList,
        isLoading: false,
      }).then((res) => {
        this.Handle_Select({
          keyword: "depthWayId",
          handleData: this.form.model,
          list: res.result,
          config: { type: "type", prop: "prop", children: "child" },
        });
      });
      // 巷道下拉数据
      this.get({
        url: Basic.selectRoadwayList,
        isLoading: false,
      }).then((res) => {
        this.Handle_Select({
          keyword: "roadWayId",
          handleData: this.form.model,
          list: res.result,
          config: { type: "type", prop: "prop", children: "child" },
        });
        this.Handle_Select({
          keyword: "RoadWayId",
          handleData: this.formSearchData.tableSearch,
          list: res.result,
          config: { type: "inputType", prop: "value", children: "children" },
        });
      });
      // 容器类型下拉数据
      this.get({
        url: Basic.selectContainerTypeList,
        isLoading: false,
      }).then((res) => {
        this.form.containerTypeList = res.result;
      });
      //所属仓库下拉数据
      this.get({
        url: Basic.selectWarehouseList,
        isLoading: false,
      }).then((res) => {
        this.Handle_Select({
          keyword: "Warehouseld",
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
      this.form.title = "编辑库位";
      this.form.value = { ...data[0]};
    },
    // 创建
    create() {
      this.form.dialogFormVisible = true;
      this.form.requestData.flage = "add";
      this.form.title = "新增库位";
      this.form.value = {
        warehouseLocationCode: "", //库位编码
        warehouseLocationName: "", //库位名称
        areaId: "", //库区
        usageStatus: "", //使用状态
        loadStatus: "", //载货状态
        locationType: "", //库位类型
        layerNum: 0, //层
        floorNum: 0, //排
        columnNum: 0, //列
        childColumnNum: 0, //子列
        roadWayId: "", //巷道编码
        height: 0, //库位高度
        depthWayId: "", //多深度通道
        stagingId: "", //工作台编码
        enabled: true, //状态
        aGVLargePoint: "", //AGV大点位
        aGVMiddlePoint: "", //AGV中点位
        aGVSmallPoint: "", //AGV小点位
        iPAddress: "", //通讯IP地址
        remark: "", //备注
        containerTypeId: "", //容器类型
        allowBlendItem: false, //是否允许混放产品
        isMixingBatch: true, //是否允许混放批次
      };
    },
    // 强制呼出
    takeOutBtn() {
      let data = this.multipleSelection;
      if (data.length == 0 || data.length > 1)  return this.$message.info("请选择一条数据");
      this.takeOutForm.dialogFormVisible = true;
      this.takeOutForm.requestData.flage = "add";
      this.takeOutForm.value = {
        startCode:data[0].warehouseLocationCode,
        endCode: "",
      };
    },
     // 批量释放
    batchFreeBtn() {
       let data = this.multipleSelection;
       if (data.length == 0  ) return this.$message.info("请选择至少一条数据");
       this.post({
            url: Basic.batchfreePoint,
            data: {
              pointCodes: data.map(i=>i.warehouseLocationCode)
            }
          }).then((res) => {
            this.getTable();
            this.$message.success("操作成功");
          });
    },
     // 批量设置库位
    upLocationBtn() {
       let data = this.multipleSelection;
       if (data.length == 0  ) return this.$message.info("请选择至少一条数据");
       this.upLocationForm.dialogFormVisible = true;
      this.upLocationForm.requestData.flage = "add";
      this.upLocationForm.value = {
         locationType: 0,
         list:data.map(item => {
           return {
             cargoLocationId: item.id,
             cargoLocationCode: item.warehouseLocationCode
           }
         })
      };
      
    },
    // 导出按钮
    export() {
      this.post({
        url: Basic.exportLocation,
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

<style lang="scss"></style>
