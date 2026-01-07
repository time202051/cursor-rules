/**
 * ⚠️  警告：此文件由脚本自动生成，请勿手动编辑！
 * ��  swagger更新后请重新运行生成脚本
 * 服务地址：http://192.168.101.27:5006
*/

import { api } from "@/api/request/sendRuest"
/**
 * 系统接口日志
 * @param {Object} params - 请求参数
 * @param {string} [params.PointName] - 方法名
 * @param {string} [params.UserName] - 操作人
 * @param {string} [params.Url] - Url
 * @param {string} [params.ClientIpAddress] - Ip地址
 * @param {string} [params.Parameters] - 参数
 * @param {string} [params.StartTime] - 开始日期
 * @param {boolean} [params.HasException] - 是否异常
 * @param {string} [params.Sorting] - 
 * @param {number} [params.Page] - 
 * @param {string} [params.BeginTime] - 
 * @param {string} [params.EndTime] - 
 * @param {number} [params.SkipCount] - 
 * @param {number} [params.MaxResultCount] - 
*/
export const getAuditloggingAuditlogpages = (params, options = {}) => {
 return api({
  url: `/api/app/audit-logging/audit-log-pages`,
  method: "get",
  params,
  ...options
 });
};

/**
 * 导出审计日志
 * @param {Object} body - 请求参数
 * @param {number} [body.maxResultCount] - 
 * @param {string} [body.sorting] - 
 * @param {number} [body.page] - 
 * @param {string} [body.beginTime] - 
 * @param {string} [body.endTime] - 
 * @param {number} [body.skipCount] - 
 * @param {string} [body.pointName] - 方法名
 * @param {string} [body.userName] - 操作人
 * @param {string} [body.url] - Url
 * @param {string} [body.clientIpAddress] - Ip地址
 * @param {string} [body.parameters] - 参数
 * @param {string} [body.startTime] - 开始日期
 * @param {boolean} [body.hasException] - 是否异常
*/
export const postAuditloggingExportauditlog = (body, options = {}) => {
 return api({
  url: `/api/app/audit-logging/export-audit-log`,
  method: "post",
  data: body,
  ...options
 });
};

/**
 * 删除审计日志
 * @param {Object} params - 请求参数
 * @param {Array} [params.auditLogIds] - 
*/
export const deleteAuditloggingOperationlog = (params, options = {}) => {
 return api({
  url: `/api/app/audit-logging/operation-log`,
  method: "del",
  params,
  ...options
 });
};

/**
 * 实体变更日志
 * @param {Object} params - 请求参数
 * @param {string} [params.StartTime] - 开始时间
 * @param {string} [params.EndTime] - 结束时间
 * @param {string} [params.TableName] - 表明
 * @param {string} [params.DisplayName] - 名称
 * @param {string} [params.EntityId] - 实体Id
 * @param {string} [params.UserName] - 修改人
 * @param {string} [params.Method] - 方法
 * @param {string} [params.ChangeType] - 变更类型
 * @param {string} [params.ChangeField] - 变化字段
 * @param {string} [params.Sorting] - 
 * @param {number} [params.Page] - 
 * @param {string} [params.BeginTime] - 
 * @param {number} [params.SkipCount] - 
 * @param {number} [params.MaxResultCount] - 
*/
export const getAuditloggingEntitychangepages = (params, options = {}) => {
 return api({
  url: `/api/app/audit-logging/entity-change-pages`,
  method: "get",
  params,
  ...options
 });
};

/**
 * 后台队列
 * @param {Object} params - 请求参数
 * @param {string} [params.JobName] - 
 * @param {string} [params.JobArgs] - 
 * @param {string} [params.Sorting] - 
 * @param {number} [params.Page] - 
 * @param {string} [params.BeginTime] - 
 * @param {string} [params.EndTime] - 
 * @param {number} [params.SkipCount] - 
 * @param {number} [params.MaxResultCount] - 
*/
export const getAuditloggingBackgroundjobpages = (params, options = {}) => {
 return api({
  url: `/api/app/audit-logging/background-job-pages`,
  method: "get",
  params,
  ...options
 });
};

/**
 * 激活后台job
 * @param {Array<string>} body - 数组类型的入参
*/
export const postAuditloggingActivebackgroundjob = (body, options = {}) => {
 return api({
  url: `/api/app/audit-logging/active-background-job`,
  method: "post",
  data: body,
  ...options
 });
};

/**
 * 移库后台job
 * @param {Object} params - 请求参数
 * @param {Array} [params.ids] - 
*/
export const deleteAuditloggingBackgroundjob = (params, options = {}) => {
 return api({
  url: `/api/app/audit-logging/background-job`,
  method: "del",
  params,
  ...options
 });
};

/**
 * 无描述
*/
export const getAuditloggingAuditloggingsetting = (options = {}) => {
 return api({
  url: `/api/app/audit-logging/audit-logging-setting`,
  method: "get",
  ...options
 });
};

/**
 * 无描述
 * @param {Object} body - 请求参数
 * @param {boolean} [body.hideErrors] - 在保存审计日志对象时如果发生任何错误,审计日志系统会将错误隐藏并写入常规日志.如果保存审计日志对系统非常重要那么将其设置为 fa1se 以便在隐藏错误时抛出异常.
 * @param {boolean} [body.isEnabled] - 启用或禁用审计系统的总开关.如果值为 fa1se,则不使用其他选项.
 * @param {string} [body.applicationName] - 如果有多个应用程序保存审计日志到单一的数据库,使用此属性设置为你的应用程序名称区分不同的应用程序日志.
 * @param {boolean} [body.isEnabledForAnonymousUsers] - 如果只想为经过身份验证的用户记录审计日志,请设置为 fa1se.如果为匿名用户保存审计日志,你将看到这些用户的 userid 值为 nu11.
 * @param {boolean} [body.alwaysLogOnException] - 如果设置为 true,将始终在异常/错误情况下保存审计日志,不检査其他选项(IsEnabled 除外它完全禁用了审计日志).
 * @param {boolean} [body.isEnabledForGetRequests] - HTTP GET请求通常不应该在数据库进行任何更改,审计日志系统不会为GET请求保存审计日志对象.将此值设置为 true 可为GET请求启用审计日志系统.
*/
export const putAuditloggingAuditloggingsetting = (body, options = {}) => {
 return api({
  url: `/api/app/audit-logging/audit-logging-setting`,
  method: "put",
  data: body,
  ...options
 });
};

