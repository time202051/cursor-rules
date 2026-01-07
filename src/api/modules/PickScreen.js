/**
 * ⚠️  警告：此文件由脚本自动生成，请勿手动编辑！
 * ��  swagger更新后请重新运行生成脚本
 * 服务地址：http://192.168.101.27:5006
*/

import { api } from "@/api/request/sendRuest"
/**
 * 获取用户工作台信息(每5秒拉一次)
*/
export const getPickscreenOnlinestagginfodto = (options = {}) => {
 return api({
  url: `/api/app/pick-screen/online-stagg-info-dto`,
  method: "get",
  ...options
 });
};

/**
 * 无描述
*/
export const getPickscreenOnliestaging = (options = {}) => {
 return api({
  url: `/api/app/pick-screen/onlie-staging`,
  method: "get",
  ...options
 });
};

/**
 * 获取波次拣选任务
 * @param {Object} params - 请求参数
 * @param {string} [params.containerCode] - 
*/
export const getPickscreenPickallocationtask = (params, options = {}) => {
 return api({
  url: `/api/app/pick-screen/pick-allocation-task`,
  method: "get",
  params,
  ...options
 });
};

/**
 * 获取容器任务进度
 * @param {Object} params - 请求参数
 * @param {string} [params.containerCode] - 
*/
export const getPickscreenContainertaskprocessing = (params, options = {}) => {
 return api({
  url: `/api/app/pick-screen/container-task-processing`,
  method: "get",
  params,
  ...options
 });
};

/**
 * 获取拣选
 * @param {Object} params - 请求参数
 * @param {string} [params.PickCargoLocationId] - 拣选货位id
 * @param {string} [params.Sorting] - 
 * @param {number} [params.Page] - 
 * @param {string} [params.BeginTime] - 
 * @param {string} [params.EndTime] - 
 * @param {number} [params.SkipCount] - 
 * @param {number} [params.MaxResultCount] - 
*/
export const getPickscreenPickcargolocationinput = (params, options = {}) => {
 return api({
  url: `/api/app/pick-screen/pick-cargo-location-input`,
  method: "get",
  params,
  ...options
 });
};

/**
 * 获取未拣选任务行汇总
 * @param {Object} params - 请求参数
 * @param {string} [params.PickCargoLocationId] - 拣选货位id
 * @param {string} [params.Sorting] - 
 * @param {number} [params.Page] - 
 * @param {string} [params.BeginTime] - 
 * @param {string} [params.EndTime] - 
 * @param {number} [params.SkipCount] - 
 * @param {number} [params.MaxResultCount] - 
*/
export const getPickscreenNotpickcargolocation = (params, options = {}) => {
 return api({
  url: `/api/app/pick-screen/not-pick-cargo-location`,
  method: "get",
  params,
  ...options
 });
};

/**
 * 分页获取波次拣选序列号
 * @param {Object} params - 请求参数
 * @param {string} [params.WaveAllocationKey] - 波次分配主键
 * @param {string} [params.Sorting] - 
 * @param {number} [params.Page] - 
 * @param {string} [params.BeginTime] - 
 * @param {string} [params.EndTime] - 
 * @param {number} [params.SkipCount] - 
 * @param {number} [params.MaxResultCount] - 
*/
export const getPickscreenPickserialnumberpages = (params, options = {}) => {
 return api({
  url: `/api/app/pick-screen/pick-serial-number-pages`,
  method: "get",
  params,
  ...options
 });
};

/**
 * 获取分播格口信息
*/
export const getPickscreenPickcargolocationinfo = (options = {}) => {
 return api({
  url: `/api/app/pick-screen/pick-cargo-location-info`,
  method: "get",
  ...options
 });
};

/**
 * 无描述
 * @param {Object} body - 请求参数
 * @param {string} [body.wavePickAllocationId] - 拣选分配任务主键
 * @param {string} [body.serialNumber] - 序列号
*/
export const postPickscreenScanserialnumber = (body, options = {}) => {
 return api({
  url: `/api/app/pick-screen/scan-serial-number`,
  method: "post",
  data: body,
  ...options
 });
};

/**
 * 缺货提交
 * @param {Object} body - 请求参数
 * @param {string} [body.wavePickAllocationId] - 拣选分配任务主键
 * @param {string} [body.serialNumber] - 序列号
*/
export const postPickscreenOutofstockpick = (body, options = {}) => {
 return api({
  url: `/api/app/pick-screen/out-of-stock-pick`,
  method: "post",
  data: body,
  ...options
 });
};

/**
 * 原料拣选单获取
 * @param {Object} params - 请求参数
 * @param {string} [params.ContainerCode] - 
*/
export const postPickscreenRawmaterialpickinfo = (params, options = {}) => {
 return api({
  url: `/api/app/pick-screen/raw-material-pick-info`,
  method: "post",
  params,
  ...options
 });
};

/**
 * 判断托盘是否有货
 * @param {Object} params - 请求参数
 * @param {string} [params.ContainerCode] - 
*/
export const postPickscreenCheckcontainerstatus = (params, options = {}) => {
 return api({
  url: `/api/app/pick-screen/check-container-status`,
  method: "post",
  params,
  ...options
 });
};

/**
 * 3楼原材料出库拣选
 * @param {Object} body - 请求参数
 * @param {string} [body.containerCode] - 母托盘号
 * @param {string} [body.taskNo] - 拣选单号
 * @param {string} [body.subtrayCode] - 子托盘码
 * @param {string} [body.locNo] - 缓存架编号
 * @param {Array} [body.boxCode] - 箱号
*/
export const postPickscreenRawmaterialpick = (body, options = {}) => {
 return api({
  url: `/api/app/pick-screen/raw-material-pick`,
  method: "post",
  data: body,
  ...options
 });
};

/**
 * 完成拣选
 * @param {Object} params - 请求参数
 * @param {string} [params.taskNo] - 
*/
export const postPickscreenFinishpick = (params, options = {}) => {
 return api({
  url: `/api/app/pick-screen/finish-pick`,
  method: "post",
  params,
  ...options
 });
};

/**
 * 无描述
 * @param {Object} params - 请求参数
 * @param {string} [params.taskNo] - 
*/
export const postPickscreenFinishpickmanual = (params, options = {}) => {
 return api({
  url: `/api/app/pick-screen/finish-pick-manual`,
  method: "post",
  params,
  ...options
 });
};

/**
 * 完成拣选后回立体库
 * @param {Object} params - 请求参数
 * @param {string} [params.SubTrayCode] - 
*/
export const postPickscreenRawmatbacklTK = (params, options = {}) => {
 return api({
  url: `/api/app/pick-screen/raw-mat-back-lTK`,
  method: "post",
  params,
  ...options
 });
};

/**
 * 获取隔离单信息
 * @param {Object} body - 请求参数
 * @param {string} [body.regionCode] - 区域编码
 * @param {string} [body.containerCode] - 母托盘编码
 * @param {string} [body.locationNo] - 库位编号
 * @param {string} [body.productCode] - 物料编码
 * @param {string} [body.isolationNo] - 拣选单号
 * @param {number} [body.quality] - 质检状态
*/
export const postPickscreenFindisolationinfo = (body, options = {}) => {
 return api({
  url: `/api/app/pick-screen/find-isolation-info`,
  method: "post",
  data: body,
  ...options
 });
};

/**
 * 隔离出库类型下拉框
 * @param {Object} params - 请求参数
 * @param {string} [params.compareKey] - 
*/
export const postPickscreenFindisolationouttype = (params, options = {}) => {
 return api({
  url: `/api/app/pick-screen/find-isolation-out-type`,
  method: "post",
  params,
  ...options
 });
};

/**
 * 隔离物料出库
 * @param {Object} body - 请求参数
 * @param {string} [body.containerCode] - 托盘号
 * @param {string} [body.locationCode] - 库位编号
 * @param {string} [body.outReson] - 出库原因
*/
export const postPickscreenIsolatedout = (body, options = {}) => {
 return api({
  url: `/api/app/pick-screen/isolated-out`,
  method: "post",
  data: body,
  ...options
 });
};

/**
 * 无描述
 * @param {Object} body - 请求参数
 * @param {string} [body.containerCode] - 
*/
export const postPickscreenStockcontainerdetails = (body, options = {}) => {
 return api({
  url: `/api/app/pick-screen/stock-container-details`,
  method: "post",
  data: body,
  ...options
 });
};

/**
 * 隔离结果录入获取信息
 * @param {Object} params - 请求参数
 * @param {string} [params.containerCode] - 
*/
export const postPickscreenFindisolationqualityinfo = (params, options = {}) => {
 return api({
  url: `/api/app/pick-screen/find-isolation-quality-info`,
  method: "post",
  params,
  ...options
 });
};

/**
 * 无描述
*/
export const postPickscreenFindreasoncode = (options = {}) => {
 return api({
  url: `/api/app/pick-screen/find-reason-code`,
  method: "post",
  ...options
 });
};

/**
 * 质检结果录入
 * @param {Object} body - 请求参数
 * @param {string} [body.isolationNo] - 隔离单号
 * @param {string} [body.containerCode] - 
 * @param {string} [body.batchNo] - 
 * @param {string} [body.productName] - 
 * @param {string} [body.reasonCode] - 
 * @param {number} [body.isOutLTK] - 是否出库0=不出库，1=出库
 * @param {Array} [body.boxInfos] - 
*/
export const postPickscreenConfirmqualityresult = (body, options = {}) => {
 return api({
  url: `/api/app/pick-screen/confirm-quality-result`,
  method: "post",
  data: body,
  ...options
 });
};

