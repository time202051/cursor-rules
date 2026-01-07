/**
 * ⚠️  警告：此文件由脚本自动生成，请勿手动编辑！
 * ��  swagger更新后请重新运行生成脚本
 * 服务地址：http://192.168.101.27:5006
*/

import { api } from "@/api/request/sendRuest"
/**
 * 扫描物料编码
 * @param {Object} params - 请求参数
 * @param {string} [params.materialCode] - 
*/
export const postRawmaterialstockinprocessorScanmaterialcode = (params, options = {}) => {
 return api({
  url: `/api/app/raw-material-stock-in-processor/scan-material-code`,
  method: "post",
  params,
  ...options
 });
};

/**
 * 能否使用
 * @param {Object} params - 请求参数
 * @param {string} [params.code] - 
*/
export const postRawmaterialstockinprocessorIscontacneruse = (params, options = {}) => {
 return api({
  url: `/api/app/raw-material-stock-in-processor/is-contacner-use`,
  method: "post",
  params,
  ...options
 });
};

/**
 * 提交组盘记录
 * @param {Object} body - 请求参数
 * @param {Array} [body.detials] - 明细
 * @param {number} [body.inErea] - 收货类型枚举
 * @param {string} [body.containerCode] - 托盘号
 * @param {string} [body.creatUser] - 创建人
*/
export const postRawmaterialstockinprocessorSubmit = (body, options = {}) => {
 return api({
  url: `/api/app/raw-material-stock-in-processor/submit`,
  method: "post",
  data: body,
  ...options
 });
};

/**
 * 无描述
 * @param {Object} body - 请求参数
 * @param {string} [body.scanCode] - 页面眉头扫描（按箱扫时此参数必填）
 * @param {Array} [body.codes] - 获取信息时传的参数
 * @param {string} body.containerCode - 母托编码
 * @param {string} [body.agvPoint] - 成品AGV点位
 * @param {boolean} [body.isScanBoxCode] - 是否按箱扫描
 * @param {number} [body.height] - 高度
 * @param {boolean} [body.isPda] - 
 * @param {boolean} [body.isToNppPoint] - 
*/
export const postRawmaterialstockinprocessorExecutestockin = (body, options = {}) => {
 return api({
  url: `/api/app/raw-material-stock-in-processor/execute-stock-in`,
  method: "post",
  data: body,
  ...options
 });
};

