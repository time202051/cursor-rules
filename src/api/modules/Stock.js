/**
 * ⚠️  警告：此文件由脚本自动生成，请勿手动编辑！
 * ��  swagger更新后请重新运行生成脚本
 * 服务地址：http://192.168.101.27:5006
*/

import { api } from "@/api/request/sendRuest"
/**
 * 获取库存分页数据信息
 * @param {Object} params - 请求参数
 * @param {string} [params.Code] - PDA参数
 * @param {string} [params.ProductId] - 物料Id
 * @param {string} [params.ProductCode] - 物料编码
 * @param {string} [params.ContainerCode] - 容器编码
 * @param {string} [params.CargoLocationCode] - 库位编码
 * @param {string} [params.RegionCode] - 区域编码
 * @param {string} [params.WarehouseId] - 仓库
 * @param {string} [params.ProductBatch] - 物料批次
 * @param {string} [params.SupplierBatch] - 供应商批次
 * @param {number} [params.InformationEnum] - 箱号状态
 * @param {string} [params.BoxCode] - 临时箱码
 * @param {number} [params.ProductType] - 存货类别
 * @param {string} [params.CabinetNumber] - 隔板号
 * @param {string} [params.ContainerId] - 容器id
 * @param {string} [params.RoadWayId] - 巷道id
 * @param {string} [params.CreateTimeBegin] - 创建时间开始
 * @param {string} [params.CreateTimeEnd] - 创建时间结束
 * @param {string} [params.ReceivingTime] - 收货日期
 * @param {string} [params.ReferenceCode] - 参考号
 * @param {string} [params.SubtrayCode] - 子容器号
 * @param {Array} [params.SubtrayCodes] - 子容器号List
 * @param {boolean} [params.IsNoStock] - 是否寄售库存
 * @param {string} [params.RegionId] - 区域id
 * @param {string} [params.Remark] - 备注
 * @param {string} [params.SortBy] - 排序字段
 * @param {string} [params.Sorting] - 
 * @param {number} [params.Page] - 
 * @param {string} [params.BeginTime] - 
 * @param {string} [params.EndTime] - 
 * @param {number} [params.SkipCount] - 
 * @param {number} [params.MaxResultCount] - 
*/
export const getStockStockpages = (params, options = {}) => {
 return api({
  url: `/api/app/stock/stock-pages`,
  method: "get",
  params,
  ...options
 });
};

/**
 * 冻结库存
 * @param {Array<string>} body - 数组类型的入参
*/
export const postStockFreezestock = (body, options = {}) => {
 return api({
  url: `/api/app/stock/freeze-stock`,
  method: "post",
  data: body,
  ...options
 });
};

/**
 * 解冻库存
 * @param {Array<string>} body - 数组类型的入参
*/
export const postStockUnfreezestock = (body, options = {}) => {
 return api({
  url: `/api/app/stock/un-freeze-stock`,
  method: "post",
  data: body,
  ...options
 });
};

/**
 * VMI隔离/放行
 * @param {Object} params - 请求参数
 * @param {number} [params.type] - 类型
 * @param {Array<string>} body - 数组类型的入参
*/
export const postStockChangevmistock = (params, body, options = {}) => {
 return api({
  url: `/api/app/stock/change-vmi-stock`,
  method: "post",
  params,
  data: body,
  ...options
 });
};

/**
 * VMI隔离/放行
 * @param {Object} params - 请求参数
 * @param {number} [params.type] - 类型
 * @param {Array<string>} body - 数组类型的入参
*/
export const postStockChangevmistatus = (params, body, options = {}) => {
 return api({
  url: `/api/app/stock/change-vmi-status`,
  method: "post",
  params,
  data: body,
  ...options
 });
};

/**
 * 获取库存流水分页数据信息
 * @param {Object} params - 请求参数
 * @param {string} [params.Remark] - 备注
 * @param {number} [params.productType] - 物料属性
 * @param {string} [params.ProductCode] - 物料编码
 * @param {string} [params.ContainerCode] - 容器编码
 * @param {string} [params.BatchNo] - 物料批次
 * @param {string} [params.OrginalBillNo] - 来源单号
 * @param {number} [params.HistoryType] - 库存流水类型
 * @param {string} [params.CargoLocationCode] - 库位
 * @param {string} [params.BoxCode] - 箱号
 * @param {string} [params.SubtrayCode] - 子托盘号
 * @param {string} [params.RegionId] - 作业区域
 * @param {string} [params.Sorting] - 
 * @param {number} [params.Page] - 
 * @param {string} [params.BeginTime] - 
 * @param {string} [params.EndTime] - 
 * @param {number} [params.SkipCount] - 
 * @param {number} [params.MaxResultCount] - 
*/
export const getStockStockhistorypages = (params, options = {}) => {
 return api({
  url: `/api/app/stock/stock-history-pages`,
  method: "get",
  params,
  ...options
 });
};

/**
 * 库存导出
 * @param {Object} body - 请求参数
 * @param {number} [body.maxResultCount] - 
 * @param {string} [body.sorting] - 
 * @param {number} [body.page] - 
 * @param {string} [body.beginTime] - 
 * @param {string} [body.endTime] - 
 * @param {number} [body.skipCount] - 
 * @param {string} [body.code] - PDA参数
 * @param {string} [body.productId] - 物料Id
 * @param {string} [body.productCode] - 物料编码
 * @param {string} [body.containerCode] - 容器编码
 * @param {string} [body.cargoLocationCode] - 库位编码
 * @param {string} [body.regionCode] - 区域编码
 * @param {string} [body.warehouseId] - 仓库
 * @param {string} [body.productBatch] - 物料批次
 * @param {string} [body.supplierBatch] - 供应商批次
 * @param {number} [body.informationEnum] - 质检状态
 * @param {string} [body.boxCode] - 临时箱码
 * @param {number} [body.productType] - 存货类别
 * @param {string} [body.cabinetNumber] - 隔板号
 * @param {string} [body.containerId] - 容器id
 * @param {string} [body.roadWayId] - 巷道id
 * @param {string} [body.createTimeBegin] - 创建时间开始
 * @param {string} [body.createTimeEnd] - 创建时间结束
 * @param {string} [body.receivingTime] - 收货日期
 * @param {string} [body.referenceCode] - 参考号
 * @param {string} [body.subtrayCode] - 子容器号
 * @param {Array} [body.subtrayCodes] - 子容器号List
 * @param {boolean} [body.isNoStock] - 是否寄售库存
 * @param {string} [body.regionId] - 区域id
 * @param {string} [body.remark] - 备注
 * @param {string} [body.sortBy] - 排序字段
*/
export const postStockExportstock = (body, options = {}) => {
 return api({
  url: `/api/app/stock/export-stock`,
  method: "post",
  data: body,
  ...options
 });
};

/**
 * 库存导出》导出详情装箱单
 * @param {Object} body - 请求参数
 * @param {number} [body.maxResultCount] - 
 * @param {string} [body.sorting] - 
 * @param {number} [body.page] - 
 * @param {string} [body.beginTime] - 
 * @param {string} [body.endTime] - 
 * @param {number} [body.skipCount] - 
 * @param {string} [body.code] - PDA参数
 * @param {string} [body.productId] - 物料Id
 * @param {string} [body.productCode] - 物料编码
 * @param {string} [body.containerCode] - 容器编码
 * @param {string} [body.cargoLocationCode] - 库位编码
 * @param {string} [body.regionCode] - 区域编码
 * @param {string} [body.warehouseId] - 仓库
 * @param {string} [body.productBatch] - 物料批次
 * @param {string} [body.supplierBatch] - 供应商批次
 * @param {number} [body.informationEnum] - 质检状态
 * @param {string} [body.boxCode] - 临时箱码
 * @param {number} [body.productType] - 存货类别
 * @param {string} [body.cabinetNumber] - 隔板号
 * @param {string} [body.containerId] - 容器id
 * @param {string} [body.roadWayId] - 巷道id
 * @param {string} [body.createTimeBegin] - 创建时间开始
 * @param {string} [body.createTimeEnd] - 创建时间结束
 * @param {string} [body.receivingTime] - 收货日期
 * @param {string} [body.referenceCode] - 参考号
 * @param {string} [body.subtrayCode] - 子容器号
 * @param {Array} [body.subtrayCodes] - 子容器号List
 * @param {boolean} [body.isNoStock] - 是否寄售库存
 * @param {string} [body.regionId] - 区域id
 * @param {string} [body.remark] - 备注
 * @param {string} [body.sortBy] - 排序字段
*/
export const postStockExportstockpacking = (body, options = {}) => {
 return api({
  url: `/api/app/stock/export-stock-packing`,
  method: "post",
  data: body,
  ...options
 });
};

/**
 * 库存流水导出
 * @param {Object} body - 请求参数
 * @param {number} [body.maxResultCount] - 
 * @param {string} [body.sorting] - 
 * @param {number} [body.page] - 
 * @param {string} [body.beginTime] - 
 * @param {string} [body.endTime] - 
 * @param {number} [body.skipCount] - 
 * @param {string} [body.remark] - 备注
 * @param {number} [body.productType] - 存货类别
 * @param {string} [body.productCode] - 物料编码
 * @param {string} [body.containerCode] - 容器编码
 * @param {string} [body.batchNo] - 物料批次
 * @param {string} [body.orginalBillNo] - 来源单号
 * @param {number} [body.historyType] - 库存流水类别
 * @param {string} [body.cargoLocationCode] - 库位
 * @param {string} [body.boxCode] - 箱号
 * @param {string} [body.subtrayCode] - 子托盘号
 * @param {string} [body.regionId] - 作业区域
*/
export const postStockExportstockhistory = (body, options = {}) => {
 return api({
  url: `/api/app/stock/export-stock-history`,
  method: "post",
  data: body,
  ...options
 });
};

/**
 * 立库库存转移到空状态记录
 * @param {Object} params - 请求参数
 * @param {string} [params.BoxCode] - 箱号
 * @param {string} [params.SubtrayCode] - 子容器编号
 * @param {string} [params.CargoLocationCode] - 原库位号
 * @param {string} [params.ContainerCode] - 原托盘号
 * @param {string} [params.Sorting] - 
 * @param {number} [params.Page] - 
 * @param {string} [params.BeginTime] - 
 * @param {string} [params.EndTime] - 
 * @param {number} [params.SkipCount] - 
 * @param {number} [params.MaxResultCount] - 
*/
export const getStockStocktransferemptyrecordpaged = (params, options = {}) => {
 return api({
  url: `/api/app/stock/stock-transfer-empty-record-paged`,
  method: "get",
  params,
  ...options
 });
};

/**
 * 获取质检分页数据
 * @param {Object} params - 请求参数
 * @param {string} [params.ContainerCode] - 
 * @param {string} [params.ProductCode] - 
 * @param {string} [params.BoxCode] - 
 * @param {string} [params.SubCode] - 
 * @param {number} [params.Type] - 
 * @param {string} [params.Sorting] - 
 * @param {number} [params.Page] - 
 * @param {string} [params.BeginTime] - 
 * @param {string} [params.EndTime] - 
 * @param {number} [params.SkipCount] - 
 * @param {number} [params.MaxResultCount] - 
*/
export const getStockVmireturnpages = (params, options = {}) => {
 return api({
  url: `/api/app/stock/vmi-return-pages`,
  method: "get",
  params,
  ...options
 });
};

/**
 * 手动调账
 * @param {Object} body - 请求参数
 * @param {string} [body.boxCode] - 
 * @param {number} [body.newQty] - 
*/
export const postStockChangeboxqty = (body, options = {}) => {
 return api({
  url: `/api/app/stock/change-box-qty`,
  method: "post",
  data: body,
  ...options
 });
};

/**
 * 按照物料编码归类查找库存
 * @param {Object} params - 请求参数
 * @param {string} [params.Remark] - 备注
 * @param {number} [params.productType] - 物料属性
 * @param {string} [params.ProductCode] - 物料编码
 * @param {string} [params.ProductName] - 物料名称
 * @param {boolean} [params.IsNoStock] - 是否寄售库存
 * @param {string} [params.SortBy] - 
 * @param {string} [params.Sorting] - 
 * @param {number} [params.Page] - 
 * @param {string} [params.BeginTime] - 
 * @param {string} [params.EndTime] - 
 * @param {number} [params.SkipCount] - 
 * @param {number} [params.MaxResultCount] - 
*/
export const getStockStockpagesbyproductcode = (params, options = {}) => {
 return api({
  url: `/api/app/stock/stock-pages-by-product-code`,
  method: "get",
  params,
  ...options
 });
};

/**
 * 按物料编码查看库存明细
 * @param {Object} params - 请求参数
 * @param {string} [params.ProductCode] - 
 * @param {string} [params.Sorting] - 
 * @param {number} [params.Page] - 
 * @param {string} [params.BeginTime] - 
 * @param {string} [params.EndTime] - 
 * @param {number} [params.SkipCount] - 
 * @param {number} [params.MaxResultCount] - 
*/
export const getStockStockdetailpagesbyproductcode = (params, options = {}) => {
 return api({
  url: `/api/app/stock/stock-detail-pages-by-product-code`,
  method: "get",
  params,
  ...options
 });
};

/**
 * 按物料导出库存
 * @param {Object} body - 请求参数
 * @param {number} [body.maxResultCount] - 
 * @param {string} [body.sorting] - 
 * @param {number} [body.page] - 
 * @param {string} [body.beginTime] - 
 * @param {string} [body.endTime] - 
 * @param {number} [body.skipCount] - 
 * @param {string} [body.remark] - 备注
 * @param {number} [body.productType] - 存货类别
 * @param {string} [body.productCode] - 物料编码
 * @param {string} [body.productName] - 物料名称
 * @param {boolean} [body.isNoStock] - 是否寄售库存
 * @param {string} [body.sortBy] - 
*/
export const postStockExportstockbyproductcode = (body, options = {}) => {
 return api({
  url: `/api/app/stock/export-stock-by-product-code`,
  method: "post",
  data: body,
  ...options
 });
};

/**
 * 零件存货属性下拉框
 * @param {Object} params - 请求参数
 * @param {number} [params.compareKey] - 
*/
export const getStockProducttype = (params, options = {}) => {
 return api({
  url: `/api/app/stock/product-type`,
  method: "get",
  params,
  ...options
 });
};

