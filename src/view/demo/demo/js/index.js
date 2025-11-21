// General Parameters for this app, used during initialization
import go from 'gojs'
import Inspector from '../gojs/DataInspector.js'

var AllowTopLevel = true;
var CellSize = new go.Size(35, 35);

const isSizeShow = (node, propName) => {
  const types = ["AREA_TIPS", "COV"];
  const nodeType = node.data.devType;
  return types.includes(nodeType);
};

const isTitleShow = (node, propName) => {
  const types = ["AREA_TIPS"];
  const nodeType = node.data.devType;
  return !types.includes(nodeType);
};

const isCodeShow = (node, propName) => {
  const types = ["AREA_TIPS"];
  const nodeType = node.data.devType;
  return !types.includes(nodeType);
};

const isDirectionShow = (node, propName) => {
  const direction = ["left", "right", "up", "down"];
  const types = ["SRM", "RGV"];
  const nodeType = node.data.devType;
  return types.includes(nodeType) ? direction : false;
};

const isTitlePositionShow = (node, propName) => {
  const direction = ["left", "right", "center", "top", "bottom"];
  const types = ["SRM", "RGV", "COV"];
  const nodeType = node.data.devType;
  return types.includes(nodeType) ? direction : false;
};

const isModeShow = (node, propName) => {
  const types = ["COV", "SRM", "RGV", "RGV_TRACK"];
  const mode = ["vertical", "horizontal"];
  const nodeType = node.data.devType;
  return types.includes(nodeType) ? mode : false;
};
const isMoveStepShow = (node, propName) => {
  const types = ["SRM", "RGV"];
  const movestep = ["1", "2"];
  const nodeType = node.data.devType;
  return types.includes(nodeType) ? movestep : false;
};
export default {
  data() {
    return {}
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      //if (window.goSamples) goSamples();  // init for these samples -- you don't need to call this
      var $ = go.GraphObject.make;
      var mySelf = this;
      mySelf.myDiagram = $(go.Diagram, "myDiagramDiv", {
        grid: $(
          go.Panel,
          "Grid",
          {gridCellSize: CellSize},
          $(go.Shape, "LineH", {stroke: "lightgray"}),
          $(go.Shape, "LineV", {stroke: "lightgray"})
        ),
        // support grid snapping when dragging and when resizing
        "draggingTool.isGridSnapEnabled": true, //栅格对齐
        "draggingTool.gridSnapCellSpot": go.Spot.Center, // 居中时,栅格对齐
        "resizingTool.isGridSnapEnabled": true, //缩放栅格时，栅格对齐
        // For this sample, automatically show the state of the diagram's model on the page
        ModelChanged: function (e) {
          if (e.isTransactionFinished) {
            const json = mySelf.myDiagram.model.toJson();
            mySelf.originalMapDataJson = JSON.parse(json);
            document.getElementById("savedModel").textContent = json;
          }
        },
        "animationManager.isEnabled": false,
        "undoManager.isEnabled": true,
      });

      // Regular Nodes represent items to be put onto racks.
      // Nodes are currently resizable, but if that is not desired, just set resizable to false.
      mySelf.myDiagram.nodeTemplate = $(
        go.Node,
        "Auto",
        {
          resizable: false,
          resizeObjectName: "SHAPE",
          // because the gridSnapCellSpot is Center, offset the Node's location
          locationSpot: new go.Spot(0, 0, CellSize.width / 2, CellSize.height / 2),
          // provide a visual warning about dropping anything onto an "item"
          mouseDragEnter: function (e, node) {
            e.handled = true;
            //node.findObject("SHAPE").fill = "red";
            e.diagram.currentCursor = "not-allowed";
            highlightGroup(node.containingGroup, false);
          },
          mouseDragLeave: function (e, node) {
            node.updateTargetBindings();
          },
          mouseDrop: function (e, node) {
            // disallow dropping anything onto an "item"
            node.diagram.currentTool.doCancel();
          },
          doubleClick: function (e, node) {
            console.log(node);
          },
        },
        // always save/load the point that is the top-left corner of the node, not the location
        new go.Binding("position", "pos", go.Point.parse).makeTwoWay(
          go.Point.stringify
        ),
        new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(
          go.Size.stringify
        ),
        $(
          go.Picture,
          {
            margin: 0,
            width: CellSize.width - 2,
            height: CellSize.height - 2,
            // height: 68,
            background: "#44CCFF",
            imageStretch: go.GraphObject.UniformToFill,
          },

          new go.Binding("source", "url")
        ),
        $(
          go.TextBlock,
          {
            font: "bold 10px ",
            isMultiline: false, // don't allow newlines in text
            editable: true, // allow in-place editing by user
            // define a tooltip for each node that displays the color as text
            toolTip: $(
              "ToolTip",
              $(go.TextBlock, {margin: 4}, new go.Binding("text", "type"))
            ), // end of Adornment
          },
          new go.Binding("text", "name").makeTwoWay()
        )
      ); // end Node

      mySelf.myDiagram.addDiagramListener("externalobjectsdropped", function (e) {
        e.subject.each(function (n) {
          //得到从Palette拖过来的节点
          /**
           n["text"] = "2222";
           n.background="url(images/cangwei.png)";
           **/
          if (n.data.type === "区域标注") {
            console.log(n);
            n.resizable = true;
            n.width = 120;
            n.height = 35;
            n.background = "rgba(0,0,0,0.3)";
            n.mb = "rgba(0,0,0,0.3)";
          }
        });
      });

      // Groups represent racks where items (Nodes) can be placed.
      // Currently they are movable and resizable, but you can change that
      // if you want the racks to remain "fixed".
      // Groups provide feedback when the user drags nodes onto them.

      function highlightGroup(grp, show) {
        if (!grp) return false;
        // check that the drop may really happen into the Group
        var tool = grp.diagram.toolManager.draggingTool;
        grp.isHighlighted = show && grp.canAddMembers(tool.draggingParts);
        return grp.isHighlighted;
      }

      var groupFill = "rgba(128,128,128,0.2)"; // 画布背景
      var groupStroke = "gray"; // 画布边框
      var dropFill = "rgba(128,255,255,0.2)"; // 拖拽时的画布背景
      var dropStroke = "red"; // 拖拽时画布边框

      mySelf.myDiagram.groupTemplate = $(
        go.Group,
        {
          layerName: "Background",
          resizable: true,
          resizeObjectName: "SHAPE",
          // because the gridSnapCellSpot is Center, offset the Group's location
          locationSpot: new go.Spot(0, 0, CellSize.width / 2, CellSize.height / 2),
        },
        // always save/load the point that is the top-left corner of the node, not the location
        new go.Binding("position", "pos", go.Point.parse).makeTwoWay(
          go.Point.stringify
        ),
        {
          // what to do when a drag-over or a drag-drop occurs on a Group
          mouseDragEnter: function (e, grp, prev) {
            if (!highlightGroup(grp, true)) e.diagram.currentCursor = "not-allowed";
            else e.diagram.currentCursor = "";
          },
          mouseDragLeave: function (e, grp, next) {
            highlightGroup(grp, false);
          },
          mouseDrop: function (e, grp) {
            var ok = grp.addMembers(grp.diagram.selection, true);
            if (!ok) grp.diagram.currentTool.doCancel();
          },
        },
        $(
          go.Shape,
          "Rectangle", // the rectangular shape around the members
          {
            name: "SHAPE",
            fill: groupFill,
            stroke: groupStroke,
            minSize: new go.Size(CellSize.width * 2, CellSize.height * 2),
          },
          new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(
            go.Size.stringify
          ),
          new go.Binding("fill", "isHighlighted", function (h) {
            return h ? dropFill : groupFill;
          }).ofObject(),
          new go.Binding("stroke", "isHighlighted", function (h) {
            return h ? dropStroke : groupStroke;
          }).ofObject()
        )
      );

      // decide what kinds of Parts can be added to a Group
      mySelf.myDiagram.commandHandler.memberValidation = function (grp, node) {
        if (grp instanceof go.Group && node instanceof go.Group) return false; // cannot add Groups to Groups
        // but dropping a Group onto the background is always OK
        return true;
      };

      // what to do when a drag-drop occurs in the Diagram's background
      mySelf.myDiagram.mouseDragOver = function (e) {
        if (!AllowTopLevel) {
          // OK to drop a group anywhere or any Node that is a member of a dragged Group
          var tool = e.diagram.toolManager.draggingTool;
          if (
            !tool.draggingParts.all(function (p) {
              return (
                p instanceof go.Group ||
                (!p.isTopLevel && tool.draggingParts.contains(p.containingGroup))
              );
            })
          ) {
            e.diagram.currentCursor = "not-allowed";
          } else {
            e.diagram.currentCursor = "";
          }
        }
      };

      mySelf.myDiagram.mouseDrop = function (e) {
        if (AllowTopLevel) {
          // when the selection is dropped in the diagram's background,
          // make sure the selected Parts no longer belong to any Group
          if (
            !e.diagram.commandHandler.addTopLevelParts(e.diagram.selection, true)
          ) {
            e.diagram.currentTool.doCancel();
          }
        } else {
          // disallow dropping any regular nodes onto the background, but allow dropping "racks",
          // including any selected member nodes
          if (
            !e.diagram.selection.all(function (p) {
              return (
                p instanceof go.Group ||
                (!p.isTopLevel && p.containingGroup.isSelected)
              );
            })
          ) {
            e.diagram.currentTool.doCancel();
          }
        }
      };

      // start off with four "racks" that are positioned next to each other
      mySelf.myDiagram.model = new go.GraphLinksModel([
        {
          layerTitle: "设备监控系统",
          key: "G1",
          devType: "AREA_TIPS",
          isGroup: true,
          pos: "0 0",
          size: "1500 800",
        },
      ]);
      // this sample does not make use of any links

      // initialize the first Palette
      mySelf.myPaletteSmall = $(go.Palette, "myPaletteSmall", {
        // share the templates with the main Diagram
        nodeTemplate: mySelf.myDiagram.nodeTemplate,
        groupTemplate: mySelf.myDiagram.groupTemplate,
      });

      var green = "#B2FF59";
      var blue = "#81D4FA";
      var yellow = "#FFEB3B";

      // specify the contents of the Palette
      mySelf.myPaletteSmall.model = new go.GraphLinksModel([
        {
          key: "STORE",
          color: green,
          url: require("../images/cangwei.png"),
          type: "货位",
          devType: "SHELVES",
          title: "货位",
        },
        {
          key: "STACK1",
          color: yellow,
          url: require("../images/stacker_1.png"),
          type: "堆垛机水平",
          title: "堆垛机",
          mode: "horizontal",
          devType: "SRM",
          movestep: 1,
          direction: "right",
          maxMoveStep: 53,
          titlePosition: "left",
        },
        {
          key: "STACK2",
          color: yellow,
          url: require("../images/stacker_2.png"),
          title: "堆垛机",
          type: "堆垛机垂直",
          mode: "vertical",
          devType: "SRM",
          movestep: 1,
          direction: "down",
          maxMoveStep: 53,
          titlePosition: "left",
        },
      ]);

      mySelf.myPaletteTall = $(go.Palette, "myPaletteTall", {
        // share the templates with the main Diagram
        nodeTemplate: mySelf.myDiagram.nodeTemplate,
        groupTemplate: mySelf.myDiagram.groupTemplate,
      });

      // specify the contents of the Palette
      mySelf.myPaletteTall.model = new go.GraphLinksModel([
        {
          key: "CONV1",
          color: yellow,
          url: require("../images/convey_1.png"),
          devType: "COV",
          type: "输送线水平",
          mode: "horizontal",
          title: "输送线",
          titlePosition: "top",
          size: "34 34",
        },
        {
          key: "CONV2",
          color: yellow,
          url: require("../images/convey_2.png"),
          type: "输送线垂直",
          devType: "COV",
          mode: "vertical",
          title: "输送线",
          titlePosition: "left",
          size: "34 34",
        },
        {
          key: "CONV11",
          color: yellow,
          url: require("../images/conveys_left.png"),
          devType: "COV",
          mode: "horizontal",
          type: "输送线水平左",
          title: "输送线",
          titlePosition: "top",
          size: "34 34",
        },
        {
          key: "CONV12",
          color: yellow,
          url: require("../images/conveys_right.png"),
          type: "输送线水平右",
          devType: "COV",
          mode: "horizontal",
          title: "输送线",
          titlePosition: "top",
          size: "34 34",
        },
        {
          key: "CONV21",
          color: yellow,
          url: require("../images/conveys_up.png"),
          type: "输送线垂直上",
          title: "输送线",
          devType: "COV",
          mode: "vertical",
          titlePosition: "left",
          size: "34 34",
        },
        {
          key: "CONV22",
          color: yellow,
          url: require("../images/conveys_down.png"),
          type: "输送线垂直下",
          devType: "COV",
          title: "输送线",
          mode: "vertical",
          titlePosition: "left",
          size: "34 34",
        },
        {
          key: "CONV13",
          color: yellow,
          url: require("../images/conveys_double2.png"),
          type: "输送线水平双向",
          mode: "horizontal",
          devType: "COV",
          title: "输送线",
          titlePosition: "top",
          size: "34 34",
        },
        {
          key: "CONV23",
          color: yellow,
          url: require("../images/conveys_double1.png"),
          type: "输送线垂直双向",
          devType: "COV",
          mode: "vertical",
          title: "输送线",
          titlePosition: "top",
          size: "34 34",
        },
      ]);

      // initialize the third Palette, of wide items
      mySelf.myPaletteWide = $(go.Palette, "myPaletteWide", {
        // share the templates with the main Diagram
        nodeTemplate: mySelf.myDiagram.nodeTemplate,
        groupTemplate: mySelf.myDiagram.groupTemplate,
      });

      // specify the contents of the Palette
      mySelf.myPaletteWide.model = new go.GraphLinksModel([
        {
          key: "RGV2",
          color: blue,
          url: require("../images/rgv_2.png"),
          devType: "RGV",
          type: "RGV垂直",
          mode: "vertical",
          maxMoveStep: 53,
          title: "RGV",
          direction: "down",
          movestep: 1,
          titlePosition: "left",
        },
        {
          key: "RGV1",
          color: blue,
          url: require("../images/rgv_1.png"),
          devType: "RGV",
          type: "RGV水平",
          mode: "horizontal",
          maxMoveStep: 53,
          title: "RGV",
          direction: "right",
          movestep: 1,
          titlePosition: "left",
        },
        {
          key: "RGVROAD1",
          color: blue,
          devType: 'RGV_TRACK',
          url: require("../images/rgv_track_1.png"),
          type: "RGV轨道水平",
          mode: "horizontal",
          title: "RGV轨道",
        },
        {
          key: "RGVROAD2",
          color: blue,
          devType: "RGV_TRACK",
          url: require("../images/rgv_track_2.png"),
          type: "RGV轨道垂直",
          mode: "vertical",
          title: "RGV轨道",
        },
      ]);

      // initialize the fourth Palette, of big items
      mySelf.myPaletteBig = $(go.Palette, "myPaletteBig", {
        // share the templates with the main Diagram
        nodeTemplate: mySelf.myDiagram.nodeTemplate,
        groupTemplate: mySelf.myDiagram.groupTemplate,
      });

      // specify the contents of the Palette
      mySelf.myPaletteBig.model = new go.GraphLinksModel([
        {
          key: "CODER1",
          color: yellow,
          url: require("../images/coder.png"),
          type: "叠盘机",
          title: "叠盘机",
          devType: "CODER",
          titlePosition: "top",
        },
        {
          key: "WATER1",
          color: yellow,
          url: require("../images/box_water.png"),
          type: "水箱",
          title: "水箱",
          devType: "WATER",
          titlePosition: "top",
        },
        {
          key: "HOIST1",
          color: yellow,
          url: require("../images/hoist.png"),
          type: "提升机",
          title: "提升机",
          devType: "HOIST",
          titlePosition: "top",
        },
        {
          key: "CHARGE",
          color: yellow,
          url: require("../images/discharge.png"),
          type: "拆盘机",
          title: "拆盘机",
          devType: "CHARGE",
          titlePosition: "top",
        },
        {
          key: "WALL",
          color: yellow,
          url: require("../images/wall.png"),
          type: "墙体",
          devType: "WALL",
          title: "墙体",
          titlePosition: "top",
        },
        {
          key: "WRAPPING",
          color: yellow,
          url: require("../images/wrapping.png"),
          type: "缠膜机",
          title: "缠膜机",
          devType: "WRAPPING",
          titlePosition: "top",
        },
        {
          key: "SCANER",
          color: yellow,
          url: require("../images/bcr_1.png"),
          type: "扫码器",
          title: "扫码器",
          devType: "SCANER",
          titlePosition: "top",
        },
      ]);

      mySelf.myPaletteText = $(go.Palette, "myPaletteText", {
        // share the templates with the main Diagram
        nodeTemplate: $(
          go.Node,
          "Auto",
          $(go.Shape, "Rectangle", {
            name: "SHAPE",
            fill: "lightgreen",
          }),
          $(go.TextBlock, {margin: 5}, new go.Binding("text", "name"))
        ),
        groupTemplate: mySelf.myDiagram.groupTemplate,
      });

      mySelf.myPaletteText.model = new go.GraphLinksModel([
        {
          key: "TEXT",
          name: "文字标注",
          color: yellow,
          type: "区域标注",
          title: "文字标注",
          devType: "AREA_TIPS",
          fontSize: 16,
          hasBorder: false,
          size: "32 32",
        },
      ]);

      new Inspector("myInspectorDiv", mySelf.myDiagram, {
        // allows for multiple nodes to be inspected at once
        multipleSelection: true,
        // max number of node properties will be shown when multiple selection is true
        showSize: 4,
        // when multipleSelection is true, when showAllProperties is true it takes the union of properties
        // otherwise it takes the intersection of properties
        showAllProperties: true,

        // uncomment this line to only inspect the named properties below instead of all properties on each object:
        includesOwnProperties: true,

        properties: {
          code: {show: isCodeShow},
          title: {show: isTitleShow},
          name: {show: false},

          devType: {
            readOnly: true,
          },
          movestep: {
            show: isMoveStepShow,
          },
          titlePosition: {
            type: "select",
            show: isTitlePositionShow,
            choices: isTitlePositionShow,
          },
          direction: {
            type: "select",
            show: isDirectionShow,
            choices: isDirectionShow,
          },
          mode: {
            show: isModeShow,
            readOnly: true,
          },
          // key would be automatically added for nodes, but we want to declare it read-only also:
          key: {show: false},
          type: {show: false},
          // color would be automatically added for nodes, but we want to declare it a color also:
          group: {show: false},
          isGroup: {show: false},
          url: {show: false},
          color: {show: false},
          size: {show: isSizeShow},
        },
      });
    }
  }
}

