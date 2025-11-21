
// import reportConfigLeft from './from/left/left'
import reportConfigRight from './from/right/right.vue'
import {AutoReport} from "@/api/request/swagger";

const name = 'reportConfigManagements';
const data = function () {
  return {
    data: [],
    defaultProps: {
      children: "children",
      label: "queryName",
    },
    leftFn: {
      fn: this.GetRPTSqlAll,
      treeData: {}
    },
  };
}
const mounted = function () {
  this.dragControllerDiv();
  this.GetRPTSqlAll();
}
const computed = {

}

const methods = {
  addPlus() {
    this.$refs.reportConfigRightTemplate.resetTable()
  },
  refresh() {
    this.GetRPTSqlAll();
  },
  GetRPTSqlAll() {
    this.get({
      defaultUrl: AutoReport.GetRPTSqlAll,
    }).then((res) => {
      this.data = res.result;
    });
  },
  handleNodeClick(data) {
    this.treeData = data
    this.$refs.reportConfigRightTemplate.isadd = 0;
    this.$refs.reportConfigRightTemplate.getTable(data)
  },
  GetRPTSqlByQueryCode() {
    this.get({
      defaultUrl: AutoReport.GetRPTSqlByQueryCode,
      data: {
        queryCode: data.queryCode
      },
      isLoading: false
    }).then((res) => {

    })
  },
  remove(e, data) {
    this.post({
      defaultUrl: AutoReport.DeleteRPTSql,
      data: { id: data.id },
    }).then((res, er) => {
      this.GetRPTSqlAll();
      this.$refs.reportConfigRightTemplate.resetTable()
    });
  },
  dragControllerDiv() {
    var resize = document.getElementsByClassName("resize");
    var left = document.getElementsByClassName("left");
    var mid = document.getElementsByClassName("mid");
    var box = document.getElementsByClassName("box");
    for (let i = 0; i < resize.length; i++) {
      // 鼠标按下事件
      resize[i].onmousedown = function (e) {
        //颜色改变提醒
        resize[i].style.background = "#818181";
        var startX = e.clientX;
        resize[i].left = resize[i].offsetLeft;
        // 鼠标拖动事件
        document.onmousemove = function (e) {
          var endX = e.clientX;
          var moveLen = resize[i].left + (endX - startX); // （endx-startx）=移动的距离。resize[i].left+移动的距离=左边区域最后的宽度
          var maxT = box[i].clientWidth - resize[i].offsetWidth; // 容器宽度 - 左边区域的宽度 = 右边区域的宽度

          if (moveLen < 200) moveLen = 200; // 左边区域的最小宽度为200px
          if (moveLen > maxT - 800) moveLen = maxT - 800; //右边区域最小宽度为800px

          resize[i].style.left = moveLen; // 设置左侧区域的宽度

          for (let j = 0; j < left.length; j++) {
            left[j].style.width = moveLen + "px";
            mid[j].style.width = box[i].clientWidth - moveLen - 10 + "px";
          }
        };
        // 鼠标松开事件
        document.onmouseup = function (evt) {
          //颜色恢复
          resize[i].style.background = "#d6d6d6";
          document.onmousemove = null;
          document.onmouseup = null;
          resize[i].releaseCapture && resize[i].releaseCapture(); //当你不在需要继续获得鼠标消息就要应该调用ReleaseCapture()释放掉
        };
        resize[i].setCapture && resize[i].setCapture(); //该函数在属于当前线程的指定窗口里设置鼠标捕获
        return false;
      };
    }
  },




};
const components = {
  // reportConfigLeft,
  reportConfigRight
};
export default {
  name: name,
  data: data,
  mounted: mounted,
  // watch: watch,
  methods: methods,
  components: components,
  computed: computed
}
