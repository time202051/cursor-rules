/**
 * ⚠️  警告：此文件由脚本自动生成，请勿手动编辑！
 * ��  swagger更新后请重新运行生成脚本
 * 服务地址：http://192.168.101.27:5006
*/

import { api } from "@/api/request/sendRuest"
/**
 * 获取生产订单
 * @param {Object} params - 请求参数
 * @param {string} [params.WorkOrderNo] - 生产订单
 * @param {number} [params.Status] - 订单状态
 * @param {string} [params.ProductCode] - 成品编码
 * @param {string} [params.Sorting] - 
 * @param {number} [params.Page] - 
 * @param {string} [params.BeginTime] - 
 * @param {string} [params.EndTime] - 
 * @param {number} [params.SkipCount] - 
 * @param {number} [params.MaxResultCount] - 
*/
export const getWorkmanagerWorkorderlist = (params, options = {}) => {
 return api({
  url: `/api/app/work-manager/work-order-list`,
  method: "get",
  params,
  ...options
 });
};

/**
 * 生产订单明细
 * @param {Object} params - 请求参数
 * @param {string} [params.ID] - 
*/
export const getWorkmanagerOrderdetails = (params, options = {}) => {
 return api({
  url: `/api/app/work-manager/order-details`,
  method: "get",
  params,
  ...options
 });
};

/**
 * 导出
 * @param {Object} body - 请求参数
 * @param {number} [body.maxResultCount] - 
 * @param {string} [body.sorting] - 
 * @param {number} [body.page] - 
 * @param {string} [body.beginTime] - 
 * @param {string} [body.endTime] - 
 * @param {number} [body.skipCount] - 
 * @param {string} [body.workOrderNo] - 生产订单
 * @param {number} [body.status] - 单据类型
 * @param {string} [body.productCode] - 成品编码
*/
export const postWorkmanagerExpotrworkorder = (body, options = {}) => {
 return api({
  url: `/api/app/work-manager/expotr-work-order`,
  method: "post",
  data: body,
  ...options
 });
};

/**
 * 生产订单导入
*/
export const postWorkmanagerImportworkorder = (options = {}) => {
 return api({
  url: `/api/app/work-manager/import-work-order`,
  method: "post",
  ...options
 });
};

/**
 * 接口创建生产订单
 * @param {Array<string>} body - 数组类型的入参
*/
export const postWorkmanagerWorkorder = (body, options = {}) => {
 return api({
  url: `/api/app/work-manager/work-order`,
  method: "post",
  data: body,
  ...options
 });
};

/**
 * 生产订单导入模板下载
*/
export const postWorkmanagerDownworkordertemplate = (options = {}) => {
 return api({
  url: `/api/app/work-manager/down-workorder-template`,
  method: "post",
  ...options
 });
};

/**
 * 订单执行
 * @param {Object} params - 请求参数
 * @param {string} params.Id - 
*/
export const postWorkmanagerExecuteById = (Id, options = {}) => {
 return api({
  url: `/api/app/work-manager/execute/${Id}`,
  method: "post",
  ...options
 });
};

/**
 * 根据产线获取生产订单未完工状态
 * @param {Object} params - 请求参数
 * @param {string} [params.station] - 
*/
export const getWorkmanagerOrderbystage = (params, options = {}) => {
 return api({
  url: `/api/app/work-manager/order-by-stage`,
  method: "get",
  params,
  ...options
 });
};

/**
 * 生产订单上料
 * @param {Object} params - 请求参数
 * @param {string} params.Id - 
*/
export const getWorkmanagerUpmaterialById = (Id, options = {}) => {
 return api({
  url: `/api/app/work-manager/up-material/${Id}`,
  method: "get",
  ...options
 });
};

/**
 * 完工下线扫描下料口 （入库口点位）
 * @param {Object} params - 请求参数
 * @param {string} [params.locationCode] - 
*/
export const getWorkmanagerScanlocation = (params, options = {}) => {
 return api({
  url: `/api/app/work-manager/scan-location`,
  method: "get",
  params,
  ...options
 });
};

/**
 * 呼叫空托盘
 * @param {Object} params - 请求参数
 * @param {string} [params.workerOrder] - 
 * @param {string} [params.locationCode] - 
*/
export const getWorkmanagerCallcontainer = (params, options = {}) => {
 return api({
  url: `/api/app/work-manager/call-container`,
  method: "get",
  params,
  ...options
 });
};

/**
 * 生产报工
 * @param {Object} params - 请求参数
 * @param {string} [params.workerOrder] - 
 * @param {string} [params.locationCode] - 
 * @param {string} [params.user] - 
 * @param {number} [params.qty] - 
*/
export const getWorkmanagerSubmitreport = (params, options = {}) => {
 return api({
  url: `/api/app/work-manager/submit-report`,
  method: "get",
  params,
  ...options
 });
};

/**
 * 根据产线获取生产领料单
 * @param {Object} params - 请求参数
 * @param {string} [params.station] - 
*/
export const getWorkmanagerMaterialpicks = (params, options = {}) => {
 return api({
  url: `/api/app/work-manager/material-picks`,
  method: "get",
  params,
  ...options
 });
};

/**
 * 扫描容器号获取生产领料单
 * @param {Object} params - 请求参数
 * @param {string} [params.station] - 
*/
export const getWorkmanagerMaterialpicksbylocationorcontainer = (params, options = {}) => {
 return api({
  url: `/api/app/work-manager/material-picks-by-locationor-container`,
  method: "get",
  params,
  ...options
 });
};

/**
 * 生产领料（扣料）
 * @param {Object} params - 请求参数
 * @param {string} [params.JxCode] - 
 * @param {number} [params.qty] - 
*/
export const getWorkmanagerPicking = (params, options = {}) => {
 return api({
  url: `/api/app/work-manager/picking`,
  method: "get",
  params,
  ...options
 });
};

/**
 * 余量暂存
 * @param {Object} params - 请求参数
 * @param {string} [params.JxCode] - 
*/
export const getWorkmanagerReturnmargin = (params, options = {}) => {
 return api({
  url: `/api/app/work-manager/return-margin`,
  method: "get",
  params,
  ...options
 });
};

/**
 * 余量回库
 * @param {Object} params - 请求参数
 * @param {string} [params.JxCode] - 
*/
export const getWorkmanagerReturnmargininstock = (params, options = {}) => {
 return api({
  url: `/api/app/work-manager/return-margin-in-stock`,
  method: "get",
  params,
  ...options
 });
};

/**
 * 无描述
 * @param {Object} params - 请求参数
 * @param {string} [params.regionCode] - 
*/
export const getWorkmanagerEmptylocation = (params, options = {}) => {
 return api({
  url: `/api/app/work-manager/empty-location`,
  method: "get",
  params,
  ...options
 });
};

/**
 * 根据容器类型获取当前吊具区存在的容器个数
 * @param {Object} params - 请求参数
 * @param {string} [params.ID] - 
*/
export const getWorkmanagerContainernum = (params, options = {}) => {
 return api({
  url: `/api/app/work-manager/container-num`,
  method: "get",
  params,
  ...options
 });
};

/**
 * 呼叫生产空箱（吊具区）
 * @param {Object} params - 请求参数
 * @param {string} [params.locationCode] - 
 * @param {string} [params.ID] - 
 * @param {number} [params.qty] - 
*/
export const getWorkmanagerCallworkemptybox = (params, options = {}) => {
 return api({
  url: `/api/app/work-manager/call-work-empty-box`,
  method: "get",
  params,
  ...options
 });
};

/**
 * 绑定生产吊具区空箱子
 * @param {Object} params - 请求参数
 * @param {string} [params.locationCode] - 
 * @param {string} [params.ID] - 
*/
export const getWorkmanagerBandworkemptybox = (params, options = {}) => {
 return api({
  url: `/api/app/work-manager/band-work-empty-box`,
  method: "get",
  params,
  ...options
 });
};

/**
 * 解绑
 * @param {Object} params - 请求参数
 * @param {string} [params.locationCode] - 
 * @param {string} [params.ID] - 
*/
export const getWorkmanagerNotbandworkemptybox = (params, options = {}) => {
 return api({
  url: `/api/app/work-manager/not-band-work-empty-box`,
  method: "get",
  params,
  ...options
 });
};

/**
 * 容器类型下拉
*/
export const getWorkmanagerContainertypelist = (options = {}) => {
 return api({
  url: `/api/app/work-manager/container-type-list`,
  method: "get",
  ...options
 });
};

/**
 * 点对点
 * @param {Object} params - 请求参数
 * @param {string} [params.startLocation] - 
 * @param {string} [params.endLocation] - 
*/
export const getWorkmanagerAgvlocationwork = (params, options = {}) => {
 return api({
  url: `/api/app/work-manager/agv-location-work`,
  method: "get",
  params,
  ...options
 });
};

/**
 * 点对区域
 * @param {Object} params - 请求参数
 * @param {string} [params.startLocation] - 
 * @param {string} [params.regionCode] - 
*/
export const getWorkmanagerAgvregionwork = (params, options = {}) => {
 return api({
  url: `/api/app/work-manager/agv-region-work`,
  method: "get",
  params,
  ...options
 });
};

/**
 * 扫描需要释放/占用点位
 * @param {Object} params - 请求参数
 * @param {string} [params.LocationCode] - 
*/
export const getWorkmanagerPointstatus = (params, options = {}) => {
 return api({
  url: `/api/app/work-manager/point-status`,
  method: "get",
  params,
  ...options
 });
};

/**
 * 释放
 * @param {Object} params - 请求参数
 * @param {string} [params.LocationCode] - 
*/
export const getWorkmanagerPointdispose = (params, options = {}) => {
 return api({
  url: `/api/app/work-manager/point-dispose`,
  method: "get",
  params,
  ...options
 });
};

/**
 * 占用
 * @param {Object} params - 请求参数
 * @param {string} [params.LocationCode] - 
 * @param {string} [params.containerCode] - 
*/
export const getWorkmanagerPointoccupy = (params, options = {}) => {
 return api({
  url: `/api/app/work-manager/point-occupy`,
  method: "get",
  params,
  ...options
 });
};

/**
 * 成品入库
 * @param {Object} params - 请求参数
 * @param {string} [params.WorkOrderNo] - 
*/
export const getWorkmanagerProductinstock = (params, options = {}) => {
 return api({
  url: `/api/app/work-manager/product-instock`,
  method: "get",
  params,
  ...options
 });
};

/**
 * 新空容器出库
 * @param {Object} body - 请求参数
 * @param {Array} [body.availableChannelNoList] - 可用巷道
 * @param {Array} [body.disableRoadWayCodes] - 不可用巷道
 * @param {string} [body.pointCode] - 出库点位
 * @param {number} [body.containerType] - 容器类型
 * @param {number} [body.emptyOutType] - 
 * @param {string} [body.productCode] - 件号
 * @param {number} [body.qty] - 数量
 * @param {string} [body.positionCode] - 货位编码,指定库存库位出库
*/
export const postWorkmanagerEmptycontainerout = (body, options = {}) => {
 return api({
  url: `/api/app/work-manager/empty-container-out`,
  method: "post",
  data: body,
  ...options
 });
};

/**
 * 无描述
 * @param {Object} params - 请求参数
 * @param {number} [params.type] - 
 * @param {number} [params.loadEmptyType] - 
 * @param {string} [params.positionCode] - 
 * @param {Array<string>} body - 数组类型的入参
*/
export const postWorkmanagerRecommendemptycargolocation = (params, body, options = {}) => {
 return api({
  url: `/api/app/work-manager/recommend-empty-cargo-location`,
  method: "post",
  params,
  data: body,
  ...options
 });
};

