import { warehouse } from "@/api/request/swagger";
// roadwaylistforview
export default {
  components: {},
  data() {
    return {
      roadways: null,
      finalResult: null,
      finalResultDs: null,
      roadWayName:null,
      choseroadwayidx:0,
      columnNumMax:0,
    };
  },
  mounted() {
    this.get({
      url: warehouse.roadwaylistforview,
      isLoading: false,
      // data: Object.assign(this.formSearchData.value, {
      //   Page: this.paginations.page,
      //   MaxResultCount: this.paginations.limit,
      // }),
    }).then((res) => {
      this.roadways = res.result;
      this.roadwayActive(this.roadways[0],0)
    });
  },
  methods: {
    roadwayActive(item,index) {
      // console.log(item)
      this.choseroadwayidx = index
      this.roadWayName = item.roadWayName
      this.get({
        url: warehouse.cargolistforview + `/${item.id}`,
        isLoading: true,
        // data: Object.assign(this.formSearchData.value, {
        //   Page: this.paginations.page,
        //   MaxResultCount: this.paginations.limit,
        // }),
      }).then((res) => {
        // this.result
        this.columnNumMax = Math.max(...res.result.cargoList.map(item => item.columnNum));
        // this.columnNumMax = 10
        // console.log(this.columnNumMax)
        // 数据处理
        const floors = {};
        res.result.cargoList.forEach((item) => {
          const floorNum = item.floorNum;
          if (!floors[floorNum]) {
            floors[floorNum] = [];
          }
          floors[floorNum].push(item);
        });
        // 对 floorNum 分组进行排序
        const sortedFloors = Object.entries(floors).sort(([a], [b]) => a - b);

        // 在每一排中用 layerNum 分组并排序
        const layers = {};
        
        sortedFloors.forEach(([floorNum, floorItems]) => {
          const floorLayerGroups = {};
          floorItems.forEach((item) => {
            const layerNum = item.layerNum;
            if (!floorLayerGroups[layerNum]) {
              floorLayerGroups[layerNum] = [];
            }
            floorLayerGroups[layerNum].push(item);
          });
          // 对 layerNum 分组进行排序
          const sortedFloorLayers = Object.entries(floorLayerGroups).sort(
            ([a], [b]) => a - b
          );
          layers[floorNum] = sortedFloorLayers;
        });

        // 在每一层中用 columnNum 列分组并排序
        const columns = {};
        for (const floorNum in layers) {
          const floorLayers = layers[floorNum];
          const floorColumns = {};
          floorLayers.forEach(([layerNum, layerItems]) => {
            const layerColumnGroups = {};
            layerItems.forEach((item) => {
              const columnNum = item.columnNum;
              if (!layerColumnGroups[columnNum]) {
                layerColumnGroups[columnNum] = [];
              }
              layerColumnGroups[columnNum].push(item);
            });
            // 对 columnNum 分组进行排序
            const sortedLayerColumns = Object.entries(layerColumnGroups).sort(
              ([a], [b]) => a - b
            );
            floorColumns[layerNum] = sortedLayerColumns;
          });
          columns[floorNum] = floorColumns;
        }

        // 在每一列中通过 childColumnNum 排序
        const finalResult = {};
        for (const floorNum in columns) {
          const floorColumns = columns[floorNum];
          const floorFinal = {};
          for (const layerNum in floorColumns) {
            const layerColumns = floorColumns[layerNum];
            const layerFinal = {};
            layerColumns.forEach(([columnNum, columnItems]) => {
              // 对 childColumnNum 进行排序
              const sortedColumnItems = columnItems.sort(
                (a, b) => a.childColumnNum - b.childColumnNum
              );
              layerFinal[columnNum] = sortedColumnItems;
            });
            floorFinal[layerNum] = layerFinal;
          }
          finalResult[floorNum] = floorFinal;
        }

        const valuesArray = Object.values(finalResult);
        console.log(valuesArray);
        this.finalResult = valuesArray;
        this.finalResultDs= this.finalResult.map(x=>Object.keys(x).map(i1=>Object.keys(x[i1]).filter(i2=>x[i1][i2].length==1).map(i2=>x[i1][i2][0])).sort((a,b)=>b.length-a.length)[0]).sort((a,b)=>b.length-a.length)[0]
      });
    },
    numfn(v) {
      // console.log(v)
      // layer["1"][0].layerNum
      // console.log(String(1).padStart(2, '0'))
    },
  },
};
