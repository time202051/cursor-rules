/**
 * ⚠️  警告：此文件由脚本自动生成，请勿手动编辑！
 * ��  swagger更新后请重新运行生成脚本
 * 服务地址：http://192.168.101.27:5006
*/

import { api } from "@/api/request/sendRuest"
/**
 * 获取所有枚举信息
*/
export const getPublicenumEnums = (options = {}) => {
 return api({
  url: `/api/app/public-enum/enums`,
  method: "get",
  ...options
 });
};

/**
 * 获取单个枚举
 * @param {Object} params - 请求参数
 * @param {string} [params.key] - 
*/
export const getPublicenumSingleenum = (params, options = {}) => {
 return api({
  url: `/api/app/public-enum/single-enum`,
  method: "get",
  params,
  ...options
 });
};

