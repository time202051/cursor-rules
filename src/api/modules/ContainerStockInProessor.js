/**
 * ⚠️  警告：此文件由脚本自动生成，请勿手动编辑！
 * ��  swagger更新后请重新运行生成脚本
 * 服务地址：http://192.168.101.27:5006
*/

import { api } from "@/api/request/sendRuest"
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
export const postContainerstockinproessorExecutestockin = (body, options = {}) => {
 return api({
  url: `/api/app/container-stock-in-proessor/execute-stock-in`,
  method: "post",
  data: body,
  ...options
 });
};

