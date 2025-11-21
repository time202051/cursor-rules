
export default {
  methods:{
    editText(e, node) {
      console.log("editText");
      console.log(node);
      var obj = node.findObject("TEXTBLOCK");
      console.log(obj);
    },
    generateCode() {
      //{"mapType":"room","x":5,"y":19,"code":"1"}
      // 堆垛机 mapType, code, x, y, count_num, movestep
      // 输送线 mapType, code, x, y,
      // RGV mapType, code, x, y, idnumber
      // myDiagram.model.toJson();
      var nodes = myDiagram.model.nodeDataArray;
      var newNode = new Array();
      for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        newNode[i] = new Object();
        var maptype;
        var x;
        var y;
        var code;
        var pos = node.pos.split(" ");

        // newNode[i]["code"] = node.key;
        newNode[i]["code"] = node.code || "";
        newNode[i]["x"] = parseInt(pos[0]) / 35;
        newNode[i]["y"] = parseInt(pos[1]) / 35;
        newNode[i]["idnumber"] = node.key;
        newNode[i]["title"] = node.title;

        if (node["type"] == "货位") {
          newNode[i]["mapType"] = "room";
          if (node.code != null) newNode[i]["code"] = node.code + "";
          else newNode[i]["code"] = "";
        }
        if (node["type"] == "堆垛机水平") {
          newNode[i]["mapType"] = "s1-1";
          newNode[i]["count_num"] = 53;
          newNode[i]["movestep"] = 1;
        }
        if (node["type"] == "输送线水平双向") {
          newNode[i]["mapType"] = "c1-5";
        }
        if (node["type"] == "输送线垂直双向") {
          newNode[i]["mapType"] = "c2-5";
        }
        if (node["type"] == "输送线水平左") {
          newNode[i]["mapType"] = "c1-1";
        }
        if (node["type"] == "输送线水平右") {
          newNode[i]["mapType"] = "c1-2";
        }
        if (node["type"] == "输送线垂直上") {
          newNode[i]["mapType"] = "c2-3";
        }
        if (node["type"] == "输送线垂直下") {
          newNode[i]["mapType"] = "c2-4";
        }
        if (node["type"] == "RGV水平") {
          newNode[i]["mapType"] = "rgv-1";
          newNode[i]["idnumber"] = node.key;
        }
        if (node["type"] == "RGV垂直") {
          newNode[i]["mapType"] = "rgv-2";
          newNode[i]["idnumber"] = node.key;
        }
        if (node["type"] == "RGV轨道水平") {
          newNode[i]["mapType"] = "guidao-1";
        }
        if (node["type"] == "RGV轨道垂直") {
          newNode[i]["mapType"] = "guidao-2";
        }
      }
      console.log(newNode);
      const content = JSON.stringify(newNode);
      document.getElementById("savedModel").textContent = content;
    }
  }
}
