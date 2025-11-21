// 导出配置
let exportMapDataJson;

// 导入配置
let importMapDataJson;

//gojs原始对象
let originalMapDataJson;

//平面图数组
let floorItems = {};

//当前楼层
let currentFloor = 1;
export default {

  methods: {
    //初始化对象
    initHistory() {
      this.exportMapDataJson = null;
      this.importMapDataJson = null;
      this.originalMapDataJson = null;
      this.floorItems = {};
      this.clearMap();
    },
    // 生成楼层按钮
    createFloorBtn(mapList, floor) {
      const delBtn = `<i class="bi bi-x-lg floor-del-btn"></i>`;
      const child = `<button type="button" class="btn floor-list-items btn-secondary" data-index="${floor}">楼层${floor}&nbsp;${delBtn}</button>`;
      $("#mapListDom").append(child);
      $("#mapListDom .floor-list-items").on("click", function () {
        const floor = $(this).attr("data-index");
        $(this).addClass("btn-success");
        $(this)
        .siblings()
        .each(function () {
          $(this).removeClass("btn-success");
        });
        this.changeFloorMap(floor);
      });

      // $("#mapListDom .floor-list-items:not(:last-child)").each(function () {
      //   $(this).children("i").remove();
      // });

      $("#mapListDom .floor-del-btn").on("click", function () {
        const floor = $(this).parent().attr("data-index");
        $(this).parent().remove();
        delete this.floorItems[floor];
        this.clearMap();
      });
    },
    //导入地图
    importMap() {
      // 导入前清空
      this.floorItems = {};
      this.clearMap();

      $("#mapListDom .floor-list").empty();

      // 创建一个file input
      let input = document.createElement("input");
      input.type = "file";

      // 绑定onchange事件
      input.onchange = (event) => {
        let files = event.target.files;
        if (!files || !files.length) {
          input = null;
          throw new Error("No files");
        }

        // 当选择文件后，使用FileReader API读取文件，返回数据
        let reader = new FileReader();
        reader.onload = (event) => {
          try {
            let config = JSON.parse(event.target.result);
            this.floorItems = config;
            Object.keys(this.floorItems).forEach((floor) => {
              this.createFloorBtn(this.floorItems, floor);
            });
            return config;
          } catch (e) {
            throw new Error(e);
          }
          input = null;
        };
        reader.readAsText(files[0]);
      };

      // 触发上传文件
      input.click();
    },
    // 导出地图
    exportMap() {
      console.log("当前已导出", this.floorItems);
      this.funDownload(JSON.stringify(this.floorItems), "mapdata.json");
    },
    //通过json生成地图
    generateFromJson(loadedString) {
      var mySelf = this;
      mySelf.myDiagram.model = go.Model.fromJson(loadedString);
    },
    // 生成画布基底
    createGroup() {
      var mySelf = this;
      mySelf.myDiagram.model = new go.GraphLinksModel([
        {key: "G1", isGroup: true, pos: "0 0", size: "1500 800"},
      ]);

    },
    //清空图层
    clearMap() {
      console.log("清空图层");
      var mySelf = this;
      mySelf.myDiagram.clear();
      this.createGroup();
    },

    //保存图层对象
    saveMap() {
      this.floorItems[this.currentFloor] = this.originalMapDataJson;
      console.log("保存", this.floorItems, this.originalMapDataJson);
    },


//切换楼层
    changeFloorMap(floor) {
      console.log(`切换至楼层${floor}`);
      const currentMap = this.floorItems[floor];
      this.currentFloor = floor;
      this.clearMap();
      if (!!currentMap) this.generateFromJson(currentMap);
    },

// 新增楼层
    addNewMap() {
      const floor = $("#inputFloorValue").val();
      $("#inputFloorValue").val("");
      if (floor == "") {
        alert(`请输入有效数值`);
      } else if (Object.keys(this.floorItems).includes(floor)) {
        alert(`楼层${floor}已存在，请重新定义`);
      } else {
        this.saveMap();
        this.clearMap();
        this.currentFloor = floor;
        this.createFloorBtn(this.floorItems, floor);
        $("#mapListDom .floor-list-items")
        .eq(floor - 1)
        .addClass("btn-success")
        .siblings()
        .each(function () {
          $(this).removeClass("btn-success");
        });
      }

      console.log("新增", this.floorItems);
    }
  }
}
