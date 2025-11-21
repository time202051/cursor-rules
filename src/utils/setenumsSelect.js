/**
 *
 * @param {*} data 表单下拉框child的调用的方法 传入一个对象 必传keyword
 * @returns
 */
export function SET_enumsSelect(data) {
  if (data.keyword) {
    let wms = JSON.parse(localStorage.getItem('wms'))
    let SET_enumsSelect = null
    if (wms) SET_enumsSelect = wms.SET_enumsSelect
    let obj = SET_enumsSelect;
    let arr = [];
    for (const key in obj) {
      if (data.keyword == key) {
        arr = obj[key];
      }
    }
    return arr.enums;
  }
}
/**
 *
 * @param {*} keyword  关键字 表单value对应的prop
 * @param {*} handleData  需要处理数据
 * @param {*} list   接口返回的数据
 * @param {*} config  配置字段  { type: "类型", prop: "prop", children: "下拉框数据" },
 * @returns
 */
export function Handle_Select(obj) {
  let data = obj.handleData
  data.forEach((item, i) => {
    if ((item[obj.config.type] == "select" || item[obj.config.type] == "treeSelect") && item[obj.config.prop] == obj.keyword) {
      data[i][obj.config.children] = obj.list;
    }
  });
  return data
}
