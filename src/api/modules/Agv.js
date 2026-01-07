/**
 * ⚠️  警告：此文件由脚本自动生成，请勿手动编辑！
 * ��  swagger更新后请重新运行生成脚本
 * 服务地址：http://192.168.101.27:5006
*/

import { api } from "@/api/request/sendRuest"
/**
 * Agv任务完成反馈兼容PC端
 * @param {Object} body - 请求参数
 * @param {string} [body.taskCode] - 
 * @param {string} [body.method] - 
 * @param {string} [body.callCode] - 
 * @param {string} [body.currentCallCode] - 
*/
export const postApiOpenAgvAGVcallback = (body, options = {}) => {
 return api({
  url: `/api/open/agv/AGV-callback`,
  method: "post",
  data: body,
  ...options
 });
};

/**
 * Agv任务完成反馈
 * @param {Object} body - 请求参数
 * @param {string} [body.robotTaskCode] - 
 * @param {string} [body.singleRobotCode] - 
 * @param {Object} [body.extra] - 
*/
export const postApiOpenAgvCallback = (body, options = {}) => {
 return api({
  url: `/api/open/agv/callback`,
  method: "post",
  data: body,
  ...options
 });
};

