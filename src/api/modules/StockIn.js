/**
 * ⚠️  警告：此文件由脚本自动生成，请勿手动编辑！
 * ��  swagger更新后请重新运行生成脚本
 * 服务地址：http://192.168.101.27:5006
*/

import { api } from "@/api/request/sendRuest"
/**
 * 获取供应商名称
 * @param {Object} params - 请求参数
 * @param {string} [params.supplierCode] - 
*/
export const getStockinSuppliername = (params, options = {}) => {
 return api({
  url: `/api/app/stock-in/supplier-name`,
  method: "get",
  params,
  ...options
 });
};

/**
 * 新增收货订单
 * @param {Object} body - 请求参数
 * @param {Object} [body.extraProperties] - 
 * @param {string} [body.orgId] - 公司
 * @param {string} [body.warehouseId] - 仓库
 * @param {number} [body.stockInTaskTypeEnum] - 业务类型枚举
 * @param {string} [body.supplierCode] - 供应商编码
 * @param {string} [body.supplierName] - 供应商名称
 * @param {string} [body.remark] - 单据备注
 * @param {Array} [body.details] - 收货单明细
*/
export const postStockin = (body, options = {}) => {
 return api({
  url: `/api/app/stock-in/stock-in`,
  method: "post",
  data: body,
  ...options
 });
};

/**
 * 编辑收货订单
 * @param {Object} params - 请求参数
 * @param {string} params.stockInId - 
 * @param {Object} body - 请求参数
 * @param {Object} [body.extraProperties] - 
 * @param {string} [body.orgId] - 公司
 * @param {string} [body.warehouseId] - 仓库
 * @param {number} [body.stockInTaskTypeEnum] - 业务类型枚举
 * @param {string} [body.supplierCode] - 供应商编码
 * @param {string} [body.supplierName] - 供应商名称
 * @param {string} [body.remark] - 单据备注
 * @param {Array} [body.details] - 收货单明细
*/
export const putStockinByStockInId = (stockInId, body, options = {}) => {
 return api({
  url: `/api/app/stock-in/stock-in/${stockInId}`,
  method: "put",
  data: body,
  ...options
 });
};

/**
 * 删除收货订单
 * @param {Object} params - 请求参数
 * @param {string} params.stockInId - 
*/
export const deleteStockinByStockInId = (stockInId, options = {}) => {
 return api({
  url: `/api/app/stock-in/stock-in/${stockInId}`,
  method: "del",
  ...options
 });
};

/**
 * 收货订单分页
 * @param {Object} params - 请求参数
 * @param {string} [params.StockInId] - 入库单Id
 * @param {string} [params.BillNo] - 通知单号
 * @param {string} [params.OrginalBillNo] - 来源单号
 * @param {string} [params.ProdcutCode] - 物料描述
 * @param {number} [params.StockInOrderState] - 订单状态
 * @param {number} [params.OrderBusinessType] - 业务类型
 * @param {string} [params.ProductBatch] - 物料批次
 * @param {string} [params.CreateUserId] - 创建人
 * @param {Array} [params.BoxCodes] - 入库明细箱码集合
 * @param {string} [params.BoxCode] - 箱号
 * @param {string} [params.SupplierId] - 
 * @param {string} [params.SupplierCode] - 供应商编码
 * @param {Array} [params.SubtrayCodes] - 子容器号List
 * @param {string} [params.ProductName] - 零件名称
 * @param {string} [params.SupplierBatch] - 供应商批次
 * @param {string} [params.ReferenceCode] - 参考号
 * @param {string} [params.SubtrayCode] - 子托盘号
 * @param {string} [params.CreateUserCode] - 创建人
 * @param {string} [params.ContainerId] - 
 * @param {string} [params.Sorting] - 
 * @param {number} [params.Page] - 
 * @param {string} [params.BeginTime] - 
 * @param {string} [params.EndTime] - 
 * @param {number} [params.SkipCount] - 
 * @param {number} [params.MaxResultCount] - 
*/
export const getStockinStockinpages = (params, options = {}) => {
 return api({
  url: `/api/app/stock-in/stock-in-pages`,
  method: "get",
  params,
  ...options
 });
};

/**
 * 收货订单导出
 * @param {Object} body - 请求参数
 * @param {number} [body.maxResultCount] - 
 * @param {string} [body.sorting] - 
 * @param {number} [body.page] - 
 * @param {string} [body.beginTime] - 
 * @param {string} [body.endTime] - 
 * @param {number} [body.skipCount] - 
 * @param {string} [body.stockInId] - 入库单Id
 * @param {string} [body.billNo] - 通知单号
 * @param {string} [body.orginalBillNo] - 来源单号
 * @param {string} [body.prodcutCode] - 物料描述
 * @param {number} [body.stockInOrderState] - 入库订单状态
 * @param {number} [body.orderBusinessType] - 业务类型枚举
 * @param {string} [body.productBatch] - 物料批次
 * @param {string} [body.createUserId] - 创建人
 * @param {Array} [body.boxCodes] - 入库明细箱码集合
 * @param {string} [body.boxCode] - 箱号
 * @param {string} [body.supplierId] - 
 * @param {string} [body.supplierCode] - 供应商编码
 * @param {Array} [body.subtrayCodes] - 子容器号List
 * @param {string} [body.productName] - 零件名称
 * @param {string} [body.supplierBatch] - 供应商批次
 * @param {string} [body.referenceCode] - 参考号
 * @param {string} [body.subtrayCode] - 子托盘号
 * @param {string} [body.createUserCode] - 创建人
 * @param {string} [body.containerId] - 
*/
export const postStockinExportstockin = (body, options = {}) => {
 return api({
  url: `/api/app/stock-in/export-stock-in`,
  method: "post",
  data: body,
  ...options
 });
};

/**
 * 完成收货
 * @param {Object} params - 请求参数
 * @param {string} params.stockInId - 
*/
export const postStockinFinishstockinByStockInId = (stockInId, options = {}) => {
 return api({
  url: `/api/app/stock-in/finish-stock-in/${stockInId}`,
  method: "post",
  ...options
 });
};

/**
 * 收货单导入
*/
export const postStockinImportstockin = (options = {}) => {
 return api({
  url: `/api/app/stock-in/import-stock-in`,
  method: "post",
  ...options
 });
};

/**
 * 收货单导入模板下载
*/
export const postStockinDownstockintemplate = (options = {}) => {
 return api({
  url: `/api/app/stock-in/down-stock-in-template`,
  method: "post",
  ...options
 });
};

/**
 * 收货订单详情分页
 * @param {Object} params - 请求参数
 * @param {string} [params.StockInId] - 入库单Id
 * @param {string} [params.BillNo] - 通知单号
 * @param {string} [params.OrginalBillNo] - 来源单号
 * @param {string} [params.ProdcutCode] - 物料描述
 * @param {number} [params.StockInOrderState] - 订单状态
 * @param {number} [params.OrderBusinessType] - 业务类型
 * @param {string} [params.ProductBatch] - 物料批次
 * @param {string} [params.CreateUserId] - 创建人
 * @param {Array} [params.BoxCodes] - 入库明细箱码集合
 * @param {string} [params.BoxCode] - 箱号
 * @param {string} [params.SupplierId] - 
 * @param {string} [params.SupplierCode] - 供应商编码
 * @param {Array} [params.SubtrayCodes] - 子容器号List
 * @param {string} [params.ProductName] - 零件名称
 * @param {string} [params.SupplierBatch] - 供应商批次
 * @param {string} [params.ReferenceCode] - 参考号
 * @param {string} [params.SubtrayCode] - 子托盘号
 * @param {string} [params.CreateUserCode] - 创建人
 * @param {string} [params.ContainerId] - 
 * @param {string} [params.Sorting] - 
 * @param {number} [params.Page] - 
 * @param {string} [params.BeginTime] - 
 * @param {string} [params.EndTime] - 
 * @param {number} [params.SkipCount] - 
 * @param {number} [params.MaxResultCount] - 
*/
export const getStockinStockindetailpages = (params, options = {}) => {
 return api({
  url: `/api/app/stock-in/stock-in-detail-pages`,
  method: "get",
  params,
  ...options
 });
};

/**
 * 收货单详情导出
 * @param {Object} body - 请求参数
 * @param {number} [body.maxResultCount] - 
 * @param {string} [body.sorting] - 
 * @param {number} [body.page] - 
 * @param {string} [body.beginTime] - 
 * @param {string} [body.endTime] - 
 * @param {number} [body.skipCount] - 
 * @param {string} [body.stockInId] - 入库单Id
 * @param {string} [body.billNo] - 通知单号
 * @param {string} [body.orginalBillNo] - 来源单号
 * @param {string} [body.prodcutCode] - 物料描述
 * @param {number} [body.stockInOrderState] - 入库订单状态
 * @param {number} [body.orderBusinessType] - 业务类型枚举
 * @param {string} [body.productBatch] - 物料批次
 * @param {string} [body.createUserId] - 创建人
 * @param {Array} [body.boxCodes] - 入库明细箱码集合
 * @param {string} [body.boxCode] - 箱号
 * @param {string} [body.supplierId] - 
 * @param {string} [body.supplierCode] - 供应商编码
 * @param {Array} [body.subtrayCodes] - 子容器号List
 * @param {string} [body.productName] - 零件名称
 * @param {string} [body.supplierBatch] - 供应商批次
 * @param {string} [body.referenceCode] - 参考号
 * @param {string} [body.subtrayCode] - 子托盘号
 * @param {string} [body.createUserCode] - 创建人
 * @param {string} [body.containerId] - 
*/
export const postStockinExportstockindetail = (body, options = {}) => {
 return api({
  url: `/api/app/stock-in/export-stock-in-detail`,
  method: "post",
  data: body,
  ...options
 });
};

/**
 * 到货通知单详情导出
 * @param {Object} body - 请求参数
 * @param {number} [body.maxResultCount] - 
 * @param {string} [body.sorting] - 
 * @param {number} [body.page] - 
 * @param {string} [body.beginTime] - 
 * @param {string} [body.endTime] - 
 * @param {number} [body.skipCount] - 
 * @param {string} [body.stockInId] - 入库单Id
 * @param {string} [body.billNo] - 通知单号
 * @param {string} [body.orginalBillNo] - 来源单号
 * @param {string} [body.prodcutCode] - 物料描述
 * @param {number} [body.stockInOrderState] - 入库订单状态
 * @param {number} [body.orderBusinessType] - 业务类型枚举
 * @param {string} [body.productBatch] - 物料批次
 * @param {string} [body.createUserId] - 创建人
 * @param {Array} [body.boxCodes] - 入库明细箱码集合
 * @param {string} [body.boxCode] - 箱号
 * @param {string} [body.supplierId] - 
 * @param {string} [body.supplierCode] - 供应商编码
 * @param {Array} [body.subtrayCodes] - 子容器号List
 * @param {string} [body.productName] - 零件名称
 * @param {string} [body.supplierBatch] - 供应商批次
 * @param {string} [body.referenceCode] - 参考号
 * @param {string} [body.subtrayCode] - 子托盘号
 * @param {string} [body.createUserCode] - 创建人
 * @param {string} [body.containerId] - 
*/
export const postStockinExportstockout = (body, options = {}) => {
 return api({
  url: `/api/app/stock-in/export-stock-out`,
  method: "post",
  data: body,
  ...options
 });
};

/**
 * 无描述
 * @param {Object} params - 请求参数
 * @param {string} [params.Containecode] - 母托
 * @param {string} [params.SubtrayCode] - 子托码
 * @param {Array} [params.BoxCodes] - 箱码集合
 * @param {string} [params.BoxCode] - 箱码集合
 * @param {number} [params.InformationEnum] - 状态
 * @param {string} [params.StockId] - 库存Id
 * @param {string} [params.BindRecordId] - 码盘记录Id
 * @param {string} [params.StockInDetailId] - 入库明细Id
 * @param {string} [params.AccurateCode] - 精确编码
 * @param {Array} [params.SubtrayCodes] - 子容器号List
 * @param {string} [params.StockInTask] - 关联订单号
 * @param {number} [params.Quality] - 质检状态
 * @param {string} [params.CargoLocationCode] - 库位编码
 * @param {boolean} [params.TailBox] - 是否尾箱
 * @param {string} [params.Sorting] - 
 * @param {number} [params.Page] - 
 * @param {string} [params.BeginTime] - 
 * @param {string} [params.EndTime] - 
 * @param {number} [params.SkipCount] - 
 * @param {number} [params.MaxResultCount] - 
*/
export const getStockinPackinginformationpages = (params, options = {}) => {
 return api({
  url: `/api/app/stock-in/packing-information-pages`,
  method: "get",
  params,
  ...options
 });
};

/**
 * 装箱信息导出
 * @param {Object} body - 请求参数
 * @param {number} [body.maxResultCount] - 
 * @param {string} [body.sorting] - 
 * @param {number} [body.page] - 
 * @param {string} [body.beginTime] - 
 * @param {string} [body.endTime] - 
 * @param {number} [body.skipCount] - 
 * @param {string} [body.containecode] - 母托
 * @param {string} [body.subtrayCode] - 子托码
 * @param {Array} [body.boxCodes] - 箱码集合
 * @param {string} [body.boxCode] - 箱码集合
 * @param {number} [body.informationEnum] - 装箱信息状态
 * @param {string} [body.stockId] - 库存Id
 * @param {string} [body.bindRecordId] - 码盘记录Id
 * @param {string} [body.stockInDetailId] - 入库明细Id
 * @param {string} [body.accurateCode] - 精确编码
 * @param {Array} [body.subtrayCodes] - 子容器号List
 * @param {string} [body.stockInTask] - 关联订单号
 * @param {number} [body.quality] - 质检状态
 * @param {string} [body.cargoLocationCode] - 库位编码
 * @param {boolean} [body.tailBox] - 是否尾箱
*/
export const postStockinExportpackinginformation = (body, options = {}) => {
 return api({
  url: `/api/app/stock-in/export-packing-information`,
  method: "post",
  data: body,
  ...options
 });
};

/**
 * 获取物料信息下拉框
 * @param {Object} params - 请求参数
 * @param {string} [params.productCode] - 
 * @param {string} [params.compareKey] - 
*/
export const getStockinProductselect = (params, options = {}) => {
 return api({
  url: `/api/app/stock-in/product-select`,
  method: "get",
  params,
  ...options
 });
};

/**
 * 零件下拉
 * @param {Object} params - 请求参数
 * @param {string} [params.keyword] - 
 * @param {string} [params.compareKey] - 
*/
export const getStockinProductselectwithcodename = (params, options = {}) => {
 return api({
  url: `/api/app/stock-in/product-select-with-code-name`,
  method: "get",
  params,
  ...options
 });
};

/**
 * 获取供应商信息下拉框
 * @param {Object} params - 请求参数
 * @param {string} [params.supplierCode] - 
 * @param {string} [params.compareKey] - 
*/
export const getStockinSupplierselect = (params, options = {}) => {
 return api({
  url: `/api/app/stock-in/supplier-select`,
  method: "get",
  params,
  ...options
 });
};

/**
 * 获取码盘记录明细数据
 * @param {Object} params - 请求参数
 * @param {string} [params.BillNo] - 流水码
 * @param {string} [params.OrginalBillNo] - 流水码
 * @param {string} [params.ContainerCode] - 容器编码
 * @param {string} [params.SubtrayCode] - 子托盘号
 * @param {string} [params.ProductCode] - 物料编码
 * @param {number} [params.BindStateEnum] - 码盘状态
 * @param {string} [params.RegionId] - 上架区域
 * @param {number} [params.GroundShelfType] - 上架类型
 * @param {string} [params.BusinessTaskId] - 任务id
 * @param {string} [params.Sorting] - 
 * @param {number} [params.Page] - 
 * @param {string} [params.BeginTime] - 
 * @param {string} [params.EndTime] - 
 * @param {number} [params.SkipCount] - 
 * @param {number} [params.MaxResultCount] - 
*/
export const getStockinBindrecorddetailpages = (params, options = {}) => {
 return api({
  url: `/api/app/stock-in/bind-record-detail-pages`,
  method: "get",
  params,
  ...options
 });
};

/**
 * 获取码盘记录汇总数据
 * @param {Object} params - 请求参数
 * @param {string} [params.BillNo] - 流水码
 * @param {string} [params.OrginalBillNo] - 流水码
 * @param {string} [params.ContainerCode] - 容器编码
 * @param {string} [params.SubtrayCode] - 子托盘号
 * @param {string} [params.ProductCode] - 物料编码
 * @param {number} [params.BindStateEnum] - 码盘状态
 * @param {string} [params.RegionId] - 上架区域
 * @param {number} [params.GroundShelfType] - 上架类型
 * @param {string} [params.BusinessTaskId] - 任务id
 * @param {string} [params.Sorting] - 
 * @param {number} [params.Page] - 
 * @param {string} [params.BeginTime] - 
 * @param {string} [params.EndTime] - 
 * @param {number} [params.SkipCount] - 
 * @param {number} [params.MaxResultCount] - 
*/
export const getStockinBindrecordpages = (params, options = {}) => {
 return api({
  url: `/api/app/stock-in/bind-record-pages`,
  method: "get",
  params,
  ...options
 });
};

/**
 * 获取物料详情
 * @param {Object} params - 请求参数
 * @param {string} [params.OrginalBillNo] - 来源单号
 * @param {string} [params.ContainerCode] - 容器编码
 * @param {string} [params.Sorting] - 
 * @param {number} [params.Page] - 
 * @param {string} [params.BeginTime] - 
 * @param {string} [params.EndTime] - 
 * @param {number} [params.SkipCount] - 
 * @param {number} [params.MaxResultCount] - 
*/
export const getStockinBindcontainerinfo = (params, options = {}) => {
 return api({
  url: `/api/app/stock-in/bind-container-info`,
  method: "get",
  params,
  ...options
 });
};

/**
 * 码盘记录明细导出
 * @param {Object} body - 请求参数
 * @param {number} [body.maxResultCount] - 
 * @param {string} [body.sorting] - 
 * @param {number} [body.page] - 
 * @param {string} [body.beginTime] - 
 * @param {string} [body.endTime] - 
 * @param {number} [body.skipCount] - 
 * @param {string} [body.billNo] - 流水码
 * @param {string} [body.orginalBillNo] - 流水码
 * @param {string} [body.containerCode] - 容器编码
 * @param {string} [body.subtrayCode] - 子托盘号
 * @param {string} [body.productCode] - 物料编码
 * @param {number} [body.bindStateEnum] - 码盘状态
 * @param {string} [body.regionId] - 上架区域
 * @param {number} [body.groundShelfType] - 上架类型
 * @param {string} [body.businessTaskId] - 任务id
*/
export const postStockinExportbindrecorddetail = (body, options = {}) => {
 return api({
  url: `/api/app/stock-in/export-bind-record-detail`,
  method: "post",
  data: body,
  ...options
 });
};

/**
 * 码盘记录汇总导出
 * @param {Object} body - 请求参数
 * @param {number} [body.maxResultCount] - 
 * @param {string} [body.sorting] - 
 * @param {number} [body.page] - 
 * @param {string} [body.beginTime] - 
 * @param {string} [body.endTime] - 
 * @param {number} [body.skipCount] - 
 * @param {string} [body.billNo] - 流水码
 * @param {string} [body.orginalBillNo] - 流水码
 * @param {string} [body.containerCode] - 容器编码
 * @param {string} [body.subtrayCode] - 子托盘号
 * @param {string} [body.productCode] - 物料编码
 * @param {number} [body.bindStateEnum] - 码盘状态
 * @param {string} [body.regionId] - 上架区域
 * @param {number} [body.groundShelfType] - 上架类型
 * @param {string} [body.businessTaskId] - 任务id
*/
export const postStockinExportbindrecord = (body, options = {}) => {
 return api({
  url: `/api/app/stock-in/export-bind-record`,
  method: "post",
  data: body,
  ...options
 });
};

/**
 * 撤销码盘
 * @param {Object} body - 请求参数
 * @param {string} [body.bindRecordKey] - 码盘主键
 * @param {number} [body.bindCancleType] - 托盘取消枚举
*/
export const postStockinCanclebindrecord = (body, options = {}) => {
 return api({
  url: `/api/app/stock-in/cancle-bind-record`,
  method: "post",
  data: body,
  ...options
 });
};

/**
 * 补发
 * @param {Array<string>} body - 数组类型的入参
*/
export const postStockinResend = (body, options = {}) => {
 return api({
  url: `/api/app/stock-in/re-send`,
  method: "post",
  data: body,
  ...options
 });
};

