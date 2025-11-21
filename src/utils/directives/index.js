// import draggable from './draggable'; // 可拖拽指令
 
// export default app => {
//   app.directive('draggable', draggable)
// }

import drag from './draggable'

const install = function(Vue) {
  Vue.directive('el-drag-dialog', drag)
}

if (window.Vue) {
  window['el-drag-dialog'] = drag
  Vue.use(install);
}

drag.install = install
export default drag