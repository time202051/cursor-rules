/**
 * ⚠️  警告：此文件由脚本自动生成，请勿手动编辑！
 * ��  swagger更新后请重新运行生成脚本
 * 服务地址：http://192.168.101.27:5006
*/

import { api } from "@/api/request/sendRuest"
/**
 * 获取设备报警信息
 * @param {Object} params - 请求参数
 * @param {number} [params.Page] - 
 * @param {number} [params.Limit] - 
 * @param {string} [params.StartTime] - 
 * @param {string} [params.EndTime] - 
 * @param {string} [params.DeviceNo] - 
 * @param {number} [params.DeviceType] - 
 * @param {string} [params.Content] - 
 * @param {number} [params.DeviceFaultType] - 
*/
export const getStatisticsDevicealarmpages = (params, options = {}) => {
 return api({
  url: `/api/app/statistics/device-alarm-pages`,
  method: "get",
  params,
  ...options
 });
};

/**
 * 导出设备报警信息
 * @param {Object} body - 请求参数
 * @param {number} [body.page] - 
 * @param {number} [body.limit] - 
 * @param {string} [body.startTime] - 
 * @param {string} [body.endTime] - 
 * @param {string} [body.deviceNo] - 
 * @param {number} [body.deviceType] - 
 * @param {string} [body.content] - 
 * @param {number} [body.deviceFaultType] - 
*/
export const postStatisticsExportdevicealarms = (body, options = {}) => {
 return api({
  url: `/api/app/statistics/export-device-alarms`,
  method: "post",
  data: body,
  ...options
 });
};

/**
 * 根据巷道获取任务数及库位数
 * @param {Object} params - 请求参数
 * @param {string} [params.StartTime] - 
 * @param {string} [params.EndTime] - 
*/
export const getStatisticsTaskbyroadway = (params, options = {}) => {
 return api({
  url: `/api/app/statistics/task-by-road-way`,
  method: "get",
  params,
  ...options
 });
};

/**
 * 导出巷道获取任务数及库位数
 * @param {Object} body - 请求参数
 * @param {string} [body.startTime] - 
 * @param {string} [body.endTime] - 
*/
export const postStatisticsExporttaskbyroadway = (body, options = {}) => {
 return api({
  url: `/api/app/statistics/export-task-by-road-way`,
  method: "post",
  data: body,
  ...options
 });
};

/**
 * 根据类型获取任务量
 * @param {Object} params - 请求参数
 * @param {string} [params.StartTime] - 
 * @param {string} [params.EndTime] - 
*/
export const getStatisticsTaskbytype = (params, options = {}) => {
 return api({
  url: `/api/app/statistics/task-by-type`,
  method: "get",
  params,
  ...options
 });
};

/**
 * 导出类型获取任务量
 * @param {Object} body - 请求参数
 * @param {string} [body.startTime] - 
 * @param {string} [body.endTime] - 
*/
export const postStatisticsExporttaskbytype = (body, options = {}) => {
 return api({
  url: `/api/app/statistics/export-task-by-type`,
  method: "post",
  data: body,
  ...options
 });
};

/**
 * 获取库位使用情况
*/
export const getStatisticsTraycount = (options = {}) => {
 return api({
  url: `/api/app/statistics/tray-count`,
  method: "get",
  ...options
 });
};

/**
 * 导出库位使用情况
*/
export const postStatisticsExporttraycount = (options = {}) => {
 return api({
  url: `/api/app/statistics/export-tray-count`,
  method: "post",
  ...options
 });
};

/**
 * 获取设备任务执行效率
 * @param {Object} params - 请求参数
 * @param {string} [params.Time] - 
 * @param {number} [params.DeviceType] - 
 * @param {string} [params.DeviceName] - 
*/
export const getStatisticsDevicetask = (params, options = {}) => {
 return api({
  url: `/api/app/statistics/device-task`,
  method: "get",
  params,
  ...options
 });
};

/**
 * 导出设备任务执行效率
 * @param {Object} body - 请求参数
 * @param {string} [body.time] - 
 * @param {number} [body.deviceType] - 
 * @param {string} [body.deviceName] - 
*/
export const postStatisticsExportdevicetask = (body, options = {}) => {
 return api({
  url: `/api/app/statistics/export-device-task`,
  method: "post",
  data: body,
  ...options
 });
};

/**
 * 获取运行效率历史报表
 * @param {Object} params - 请求参数
 * @param {string} [params.Sorting] - 
 * @param {number} [params.Page] - 
 * @param {string} [params.BeginTime] - 
 * @param {string} [params.EndTime] - 
 * @param {number} [params.SkipCount] - 
 * @param {number} [params.MaxResultCount] - 
*/
export const getStatisticsRunstatistics = (params, options = {}) => {
 return api({
  url: `/api/app/statistics/run-statistics`,
  method: "get",
  params,
  ...options
 });
};

/**
 * 导出运行效率历史报表
 * @param {Object} body - 请求参数
 * @param {number} [body.maxResultCount] - 
 * @param {string} [body.sorting] - 
 * @param {number} [body.page] - 
 * @param {string} [body.beginTime] - 
 * @param {string} [body.endTime] - 
 * @param {number} [body.skipCount] - 
*/
export const postStatisticsExportrunstatistics = (body, options = {}) => {
 return api({
  url: `/api/app/statistics/export-run-statistics`,
  method: "post",
  data: body,
  ...options
 });
};

/**
 * 出库订单报表
 * @param {Object} params - 请求参数
 * @param {string} [params.StartTime] - 
 * @param {string} [params.EndTime] - 
*/
export const getStatisticsStockoutstatistics = (params, options = {}) => {
 return api({
  url: `/api/app/statistics/stock-out-statistics`,
  method: "get",
  params,
  ...options
 });
};

/**
 * 出库订单报表导出
 * @param {Object} body - 请求参数
 * @param {string} [body.startTime] - 
 * @param {string} [body.endTime] - 
*/
export const postStatisticsExportstockoutstatistics = (body, options = {}) => {
 return api({
  url: `/api/app/statistics/export-stock-out-statistics`,
  method: "post",
  data: body,
  ...options
 });
};

/**
 * 出库订单报表详情
 * @param {Object} params - 请求参数
 * @param {string} [params.StartTime] - 
 * @param {string} [params.EndTime] - 
*/
export const getStatisticsStockoutstatisticsdetail = (params, options = {}) => {
 return api({
  url: `/api/app/statistics/stock-out-statistics-detail`,
  method: "get",
  params,
  ...options
 });
};

/**
 * 导出出库订单报表详情
 * @param {Object} body - 请求参数
 * @param {string} [body.startTime] - 
 * @param {string} [body.endTime] - 
*/
export const postStatisticsExportstockoutstatisticsdetail = (body, options = {}) => {
 return api({
  url: `/api/app/statistics/export-stock-out-statistics-detail`,
  method: "post",
  data: body,
  ...options
 });
};

