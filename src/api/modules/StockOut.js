/**
 * ⚠️  警告：此文件由脚本自动生成，请勿手动编辑！
 * ��  swagger更新后请重新运行生成脚本
 * 服务地址：http://192.168.101.27:5006
*/

import { api } from "@/api/request/sendRuest"
/**
 * 出库订单导入模板下载
*/
export const postStockoutDownworkordertemplate = (options = {}) => {
 return api({
  url: `/api/app/stock-out/down-workorder-template`,
  method: "post",
  ...options
 });
};

/**
 * 出库订单导入
*/
export const postStockoutImportworkorder = (options = {}) => {
 return api({
  url: `/api/app/stock-out/import-work-order`,
  method: "post",
  ...options
 });
};

/**
 * 接口创建出库单
 * @param {Array<string>} body - 数组类型的入参
*/
export const postStockoutWorkorder = (body, options = {}) => {
 return api({
  url: `/api/app/stock-out/work-order`,
  method: "post",
  data: body,
  ...options
 });
};

/**
 * 分配出库
 * @param {Object} params - 请求参数
 * @param {string} [params.guid] - 
*/
export const getStockoutPickoutstock = (params, options = {}) => {
 return api({
  url: `/api/app/stock-out/pick-out-stock`,
  method: "get",
  params,
  ...options
 });
};

/**
 * 合托换托信息导出
 * @param {Object} body - 请求参数
 * @param {number} [body.maxResultCount] - 
 * @param {string} [body.sorting] - 
 * @param {number} [body.page] - 
 * @param {string} [body.beginTime] - 
 * @param {string} [body.endTime] - 
 * @param {number} [body.skipCount] - 
 * @param {string} [body.containerCode] - 容器编码
 * @param {boolean} [body.state] - 状态
 * @param {string} [body.serialNumber] - 流水号
 * @param {string} [body.subContainerCode] - 子容器编码
 * @param {string} [body.boxCode] - 箱号
*/
export const postStockoutExportconsolidinerecord = (body, options = {}) => {
 return api({
  url: `/api/app/stock-out/export-consolidine-record`,
  method: "post",
  data: body,
  ...options
 });
};

/**
 * 出库信息导出
 * @param {Object} body - 请求参数
 * @param {number} [body.maxResultCount] - 
 * @param {string} [body.sorting] - 
 * @param {number} [body.page] - 
 * @param {string} [body.beginTime] - 
 * @param {string} [body.endTime] - 
 * @param {number} [body.skipCount] - 
 * @param {string} [body.billNo] - 出货单号
 * @param {string} [body.sourceNo] - 上游单号
 * @param {number} [body.orderState] - 单据状态
 * @param {string} [body.shipperCode] - 客户编码
 * @param {number} [body.type] - 业务类型
 * @param {string} [body.arrivalBeginTime] - 开始时间
 * @param {string} [body.arrivalEndTime] - 结束时间
 * @param {string} [body.warehouseName] - 仓库
 * @param {string} [body.warehouseCode] - 仓库编码
 * @param {string} [body.waveId] - 波次
 * @param {boolean} [body.isUnFinished] - 仅未完成
 * @param {string} [body.productCode] - 零件编码
*/
export const postStockoutExportstock = (body, options = {}) => {
 return api({
  url: `/api/app/stock-out/export-stock`,
  method: "post",
  data: body,
  ...options
 });
};

/**
 * 出库信息明细导出
 * @param {Object} body - 请求参数
 * @param {number} [body.maxResultCount] - 
 * @param {string} [body.sorting] - 
 * @param {number} [body.page] - 
 * @param {string} [body.beginTime] - 
 * @param {string} [body.endTime] - 
 * @param {number} [body.skipCount] - 
 * @param {string} [body.billNo] - 出货单号
 * @param {string} [body.sourceNo] - 上游单号
 * @param {number} [body.orderState] - 单据状态
 * @param {string} [body.shipperCode] - 客户编码
 * @param {number} [body.type] - 业务类型
 * @param {string} [body.arrivalBeginTime] - 开始时间
 * @param {string} [body.arrivalEndTime] - 结束时间
 * @param {string} [body.warehouseName] - 仓库
 * @param {string} [body.warehouseCode] - 仓库编码
 * @param {string} [body.waveId] - 波次
 * @param {boolean} [body.isUnFinished] - 仅未完成
 * @param {string} [body.productCode] - 零件编码
*/
export const postStockoutExportstockoutdetail = (body, options = {}) => {
 return api({
  url: `/api/app/stock-out/export-stock-out-detail`,
  method: "post",
  data: body,
  ...options
 });
};

/**
 * 获取根据合托换托Id获取详情信息
 * @param {Object} params - 请求参数
 * @param {string} [params.ConsolidineRecordId] - 合托id
 * @param {string} [params.Sorting] - 
 * @param {number} [params.Page] - 
 * @param {string} [params.BeginTime] - 
 * @param {string} [params.EndTime] - 
 * @param {number} [params.SkipCount] - 
 * @param {number} [params.MaxResultCount] - 
*/
export const getStockoutConsolidinerecorddetailpages = (params, options = {}) => {
 return api({
  url: `/api/app/stock-out/consolidine-record-detail-pages`,
  method: "get",
  params,
  ...options
 });
};

/**
 * 获取合托换托分页数据信息
 * @param {Object} params - 请求参数
 * @param {string} [params.ContainerCode] - 容器编码
 * @param {boolean} [params.State] - 状态
 * @param {string} [params.SerialNumber] - 流水号
 * @param {string} [params.SubContainerCode] - 子容器编码
 * @param {string} [params.BoxCode] - 箱号
 * @param {string} [params.Sorting] - 
 * @param {number} [params.Page] - 
 * @param {string} [params.BeginTime] - 
 * @param {string} [params.EndTime] - 
 * @param {number} [params.SkipCount] - 
 * @param {number} [params.MaxResultCount] - 
*/
export const getStockoutConsolidinerecordpages = (params, options = {}) => {
 return api({
  url: `/api/app/stock-out/consolidine-record-pages`,
  method: "get",
  params,
  ...options
 });
};

/**
 * 获取出库订单明细详情分页数据信息
 * @param {Object} params - 请求参数
 * @param {string} [params.StockOutId] - 出货单ID
 * @param {string} [params.WaveId] - 波次ID
 * @param {string} [params.TaskCode] - 任务号
 * @param {number} [params.TaskStatus] - 任务状态
 * @param {boolean} [params.LackStatus] - 缺货状态 false 否  true是
 * @param {string} [params.OwnerCode] - 客户编码
 * @param {string} [params.ProductCode] - 物料编码
 * @param {string} [params.Sorting] - 
 * @param {number} [params.Page] - 
 * @param {string} [params.BeginTime] - 
 * @param {string} [params.EndTime] - 
 * @param {number} [params.SkipCount] - 
 * @param {number} [params.MaxResultCount] - 
*/
export const getStockoutStockoutdetailpages = (params, options = {}) => {
 return api({
  url: `/api/app/stock-out/stock-out-detail-pages`,
  method: "get",
  params,
  ...options
 });
};

/**
 * 获取出库订单分页数据信息
 * @param {Object} params - 请求参数
 * @param {string} [params.BillNo] - 出货单号
 * @param {string} [params.SourceNo] - 上游单号
 * @param {number} [params.OrderState] - 单据状态
 * @param {string} [params.ShipperCode] - 客户编码
 * @param {number} [params.Type] - 订单类别
 * @param {string} [params.ArrivalBeginTime] - 开始时间
 * @param {string} [params.ArrivalEndTime] - 结束时间
 * @param {string} [params.WarehouseName] - 仓库
 * @param {string} [params.WarehouseCode] - 仓库编码
 * @param {string} [params.WaveId] - 波次
 * @param {boolean} [params.IsUnFinished] - 仅未完成
 * @param {string} [params.ProductCode] - 零件编码
 * @param {string} [params.Sorting] - 
 * @param {number} [params.Page] - 
 * @param {string} [params.BeginTime] - 
 * @param {string} [params.EndTime] - 
 * @param {number} [params.SkipCount] - 
 * @param {number} [params.MaxResultCount] - 
*/
export const getStockoutStockoutpages = (params, options = {}) => {
 return api({
  url: `/api/app/stock-out/stock-out-pages`,
  method: "get",
  params,
  ...options
 });
};

/**
 * 二楼超市缓存区目视屏幕-出货口
 * @param {Object} params - 请求参数
 * @param {string} [params.outPoint] - 
*/
export const getStockoutSupermarketpick = (params, options = {}) => {
 return api({
  url: `/api/app/stock-out/super-market-pick`,
  method: "get",
  params,
  ...options
 });
};

/**
 * 二楼超市缓存区目视屏幕-入
*/
export const getStockoutSupermarketreturn = (options = {}) => {
 return api({
  url: `/api/app/stock-out/super-market-return`,
  method: "get",
  ...options
 });
};

/**
 * 获取波次分页数据信息
 * @param {Object} params - 请求参数
 * @param {string} [params.WaveNumber] - 波次号
 * @param {string} [params.SourceNo] - 关联上游单号
 * @param {number} [params.WaveStateEnum] - 拣货状态
 * @param {string} [params.Prodline] - 产线编号
 * @param {string} [params.ProductCode] - 物料编码
 * @param {number} [params.WaveType] - 波次类型
 * @param {string} [params.WaveBeginTimeBegin] - 波次开始开始时间
 * @param {string} [params.WaveBeginTimeEnd] - 波次开始结束时间
 * @param {string} [params.WaveEndTimeBegin] - 波次结束开始时间
 * @param {string} [params.WaveEndTimeEnd] - 波次结束结束时间
 * @param {string} [params.Sorting] - 
 * @param {number} [params.Page] - 
 * @param {string} [params.BeginTime] - 
 * @param {string} [params.EndTime] - 
 * @param {number} [params.SkipCount] - 
 * @param {number} [params.MaxResultCount] - 
*/
export const getStockoutWavepages = (params, options = {}) => {
 return api({
  url: `/api/app/stock-out/wave-pages`,
  method: "get",
  params,
  ...options
 });
};

/**
 * 获取波次拣选分配详情
 * @param {Object} params - 请求参数
 * @param {string} [params.StockOutDetailId] - 出货单明细id
 * @param {string} [params.Sorting] - 
 * @param {number} [params.Page] - 
 * @param {string} [params.BeginTime] - 
 * @param {string} [params.EndTime] - 
 * @param {number} [params.SkipCount] - 
 * @param {number} [params.MaxResultCount] - 
*/
export const getStockoutWavepickpages = (params, options = {}) => {
 return api({
  url: `/api/app/stock-out/wave-pick-pages`,
  method: "get",
  params,
  ...options
 });
};

/**
 * 获取波次拣选信息
 * @param {Object} params - 请求参数
 * @param {string} [params.StockOutId] - 出货单ID
 * @param {string} [params.WaveId] - 波次ID
 * @param {string} [params.TaskCode] - 任务号
 * @param {number} [params.TaskStatus] - 任务状态
 * @param {boolean} [params.LackStatus] - 缺货状态 false 否  true是
 * @param {string} [params.OwnerCode] - 客户编码
 * @param {string} [params.ProductCode] - 物料编码
 * @param {string} [params.Sorting] - 
 * @param {number} [params.Page] - 
 * @param {string} [params.BeginTime] - 
 * @param {string} [params.EndTime] - 
 * @param {number} [params.SkipCount] - 
 * @param {number} [params.MaxResultCount] - 
*/
export const getStockoutWavestockoutdetailpages = (params, options = {}) => {
 return api({
  url: `/api/app/stock-out/wave-stock-out-detail-pages`,
  method: "get",
  params,
  ...options
 });
};

/**
 * 获取拣选信息
 * @param {Object} params - 请求参数
 * @param {string} [params.StockOutBillNo] - 出库单号
 * @param {string} [params.SourceNo] - 上游单号
 * @param {string} [params.PickTaskCode] - 拣选任务号
 * @param {boolean} [params.LackStatus] - 缺货状态
 * @param {number} [params.WavePickTaskState] - 任务状态
 * @param {string} [params.CustomerCode] - 客户编码
 * @param {string} [params.ProductCode] - 物料编码
 * @param {string} [params.PickContainerCode] - 物料编码
 * @param {string} [params.RoadWayCode] - 巷道编码
 * @param {string} [params.Sorting] - 
 * @param {number} [params.Page] - 
 * @param {string} [params.BeginTime] - 
 * @param {string} [params.EndTime] - 
 * @param {number} [params.SkipCount] - 
 * @param {number} [params.MaxResultCount] - 
*/
export const getStockoutOrderpickpages = (params, options = {}) => {
 return api({
  url: `/api/app/stock-out/order-pick-pages`,
  method: "get",
  params,
  ...options
 });
};

/**
 * 导出拣选信息
 * @param {Object} body - 请求参数
 * @param {number} [body.maxResultCount] - 
 * @param {string} [body.sorting] - 
 * @param {number} [body.page] - 
 * @param {string} [body.beginTime] - 
 * @param {string} [body.endTime] - 
 * @param {number} [body.skipCount] - 
 * @param {string} [body.stockOutBillNo] - 出库单号
 * @param {string} [body.sourceNo] - 上游单号
 * @param {string} [body.pickTaskCode] - 拣选任务号
 * @param {boolean} [body.lackStatus] - 缺货状态
 * @param {number} [body.wavePickTaskState] - 
 * @param {string} [body.customerCode] - 客户编码
 * @param {string} [body.productCode] - 物料编码
 * @param {string} [body.pickContainerCode] - 物料编码
 * @param {string} [body.roadWayCode] - 巷道编码
*/
export const postStockoutExportorderpicklist = (body, options = {}) => {
 return api({
  url: `/api/app/stock-out/export-order-pick-list`,
  method: "post",
  data: body,
  ...options
 });
};

/**
 * 获取拣选明细信息
 * @param {Object} params - 请求参数
 * @param {string} params.pickId - 
*/
export const getStockoutOrderpickboxpagesByPickId = (pickId, options = {}) => {
 return api({
  url: `/api/app/stock-out/order-pick-box-pages/${pickId}`,
  method: "get",
  ...options
 });
};

/**
 * 设置出货单明细是否出样件
 * @param {Object} params - 请求参数
 * @param {string} params.stockOutDetailId - 
 * @param {boolean} [params.isSample] - 
*/
export const postStockoutSetstockoutdetailByStockOutDetailId = (stockOutDetailId, params, options = {}) => {
 return api({
  url: `/api/app/stock-out/set-stock-out-detail/${stockOutDetailId}`,
  method: "post",
  params,
  ...options
 });
};

/**
 * 设置备料计划时间
 * @param {Object} params - 请求参数
 * @param {string} params.stockOutId - 
 * @param {string} [params.planTime] - 
*/
export const postStockoutSetwaveplantimeByStockOutId = (stockOutId, params, options = {}) => {
 return api({
  url: `/api/app/stock-out/set-wave-plan-time/${stockOutId}`,
  method: "post",
  params,
  ...options
 });
};

/**
 * 出库
 * @param {Object} params - 请求参数
 * @param {number} [params.destion] - 
 * @param {Array<string>} body - 数组类型的入参
*/
export const postStockoutStockoutconfirm = (params, body, options = {}) => {
 return api({
  url: `/api/app/stock-out/stock-out-confirm`,
  method: "post",
  params,
  data: body,
  ...options
 });
};

/**
 * 拣货信息导出
 * @param {Object} body - 请求参数
 * @param {number} [body.maxResultCount] - 
 * @param {string} [body.sorting] - 
 * @param {number} [body.page] - 
 * @param {string} [body.beginTime] - 
 * @param {string} [body.endTime] - 
 * @param {number} [body.skipCount] - 
 * @param {string} [body.stockOutDetailId] - 出货单明细id
*/
export const postStockoutExportpick = (body, options = {}) => {
 return api({
  url: `/api/app/stock-out/export-pick`,
  method: "post",
  data: body,
  ...options
 });
};

/**
 * 拣货记录导出
 * @param {Object} body - 请求参数
 * @param {number} [body.maxResultCount] - 
 * @param {string} [body.sorting] - 
 * @param {number} [body.page] - 
 * @param {string} [body.beginTime] - 
 * @param {string} [body.endTime] - 
 * @param {number} [body.skipCount] - 
 * @param {string} [body.productCode] - 物料编码
 * @param {string} [body.batchNo] - 物料批次
 * @param {string} [body.stockOutBillNo] - 出库单号
 * @param {string} [body.pickBillNo] - 拣货单号
 * @param {string} [body.containerCode] - 容器编码
 * @param {string} [body.createUser] - 操作人
*/
export const postStockoutExportpickrecord = (body, options = {}) => {
 return api({
  url: `/api/app/stock-out/export-pick-record`,
  method: "post",
  data: body,
  ...options
 });
};

/**
 * 获取拣货箱号分页记录
 * @param {Object} params - 请求参数
 * @param {string} [params.PickId] - 拣货id
 * @param {string} [params.Sorting] - 
 * @param {number} [params.Page] - 
 * @param {string} [params.BeginTime] - 
 * @param {string} [params.EndTime] - 
 * @param {number} [params.SkipCount] - 
 * @param {number} [params.MaxResultCount] - 
*/
export const getStockoutPickboxpages = (params, options = {}) => {
 return api({
  url: `/api/app/stock-out/pick-box-pages`,
  method: "get",
  params,
  ...options
 });
};

/**
 * 获取拣货单分页记录
 * @param {Object} params - 请求参数
 * @param {string} [params.StockOutDetailId] - 出货单明细id
 * @param {string} [params.Sorting] - 
 * @param {number} [params.Page] - 
 * @param {string} [params.BeginTime] - 
 * @param {string} [params.EndTime] - 
 * @param {number} [params.SkipCount] - 
 * @param {number} [params.MaxResultCount] - 
*/
export const getStockoutPickpages = (params, options = {}) => {
 return api({
  url: `/api/app/stock-out/pick-pages`,
  method: "get",
  params,
  ...options
 });
};

/**
 * 获取拣货记录分页记录
 * @param {Object} params - 请求参数
 * @param {string} [params.ProductCode] - 物料编码
 * @param {string} [params.BatchNo] - 物料批次
 * @param {string} [params.StockOutBillNo] - 出库单号
 * @param {string} [params.PickBillNo] - 拣货单号
 * @param {string} [params.ContainerCode] - 容器编码
 * @param {string} [params.CreateUser] - 操作人
 * @param {string} [params.Sorting] - 
 * @param {number} [params.Page] - 
 * @param {string} [params.BeginTime] - 
 * @param {string} [params.EndTime] - 
 * @param {number} [params.SkipCount] - 
 * @param {number} [params.MaxResultCount] - 
*/
export const getStockoutPickrecordpages = (params, options = {}) => {
 return api({
  url: `/api/app/stock-out/pick-record-pages`,
  method: "get",
  params,
  ...options
 });
};

/**
 * 取消指定的箱号信息
 * @param {Object} body - 请求参数
 * @param {Array} [body.boxIds] - 
*/
export const deleteStockoutAssignboxstock = (body, options = {}) => {
 return api({
  url: `/api/app/stock-out/assign-box-stock`,
  method: "del",
  data: body,
  ...options
 });
};

/**
 * 获取指定箱号库存信息
 * @param {Object} params - 请求参数
 * @param {string} [params.StockOutDetailId] - 明细id
 * @param {string} [params.Sorting] - 
 * @param {number} [params.Page] - 
 * @param {string} [params.BeginTime] - 
 * @param {string} [params.EndTime] - 
 * @param {number} [params.SkipCount] - 
 * @param {number} [params.MaxResultCount] - 
*/
export const getStockoutAssignboxstockpages = (params, options = {}) => {
 return api({
  url: `/api/app/stock-out/assign-box-stock-pages`,
  method: "get",
  params,
  ...options
 });
};

/**
 * 获取尾箱信息
 * @param {Object} params - 请求参数
 * @param {string} [params.ProductCode] - 零件编号
 * @param {string} [params.BatchNum] - 物料批次号
 * @param {string} [params.OnwerCode] - 货主编码
 * @param {string} [params.BoxCode] - 箱号编码
 * @param {number} [params.Qty] - 箱号数量
 * @param {string} [params.Sorting] - 
 * @param {number} [params.Page] - 
 * @param {string} [params.BeginTime] - 
 * @param {string} [params.EndTime] - 
 * @param {number} [params.SkipCount] - 
 * @param {number} [params.MaxResultCount] - 
*/
export const getStockoutPackinginformation = (params, options = {}) => {
 return api({
  url: `/api/app/stock-out/packing-information`,
  method: "get",
  params,
  ...options
 });
};

/**
 * 出货单明细指定箱号
 * @param {Object} body - 请求参数
 * @param {string} [body.stockOutDetailId] - 
 * @param {Array} [body.packingInformationIds] - 
*/
export const postStockoutSetwaveboxs = (body, options = {}) => {
 return api({
  url: `/api/app/stock-out/set-wave-boxs`,
  method: "post",
  data: body,
  ...options
 });
};

/**
 * 删除库存呼出原因
 * @param {Object} params - 请求参数
 * @param {string} params.codeItemId - 
*/
export const deleteStockoutCodeitemByCodeItemId = (codeItemId, options = {}) => {
 return api({
  url: `/api/app/stock-out/code-item/${codeItemId}`,
  method: "del",
  ...options
 });
};

/**
 * 库存呼出记录信息导出
 * @param {Object} body - 请求参数
 * @param {number} [body.maxResultCount] - 
 * @param {string} [body.sorting] - 
 * @param {number} [body.page] - 
 * @param {string} [body.beginTime] - 
 * @param {string} [body.endTime] - 
 * @param {number} [body.skipCount] - 
 * @param {string} [body.containerCode] - 母托盘编号
 * @param {string} [body.subtrayCode] - 子托盘编号
 * @param {string} [body.productCode] - 零件编码
 * @param {string} [body.reason] - 呼出原因
*/
export const postStockoutExportstockouthistory = (body, options = {}) => {
 return api({
  url: `/api/app/stock-out/export-stock-out-history`,
  method: "post",
  data: body,
  ...options
 });
};

/**
 * 获取库存呼出原因
 * @param {Object} params - 请求参数
 * @param {string} [params.Sorting] - 
 * @param {number} [params.Page] - 
 * @param {string} [params.BeginTime] - 
 * @param {string} [params.EndTime] - 
 * @param {number} [params.SkipCount] - 
 * @param {number} [params.MaxResultCount] - 
*/
export const getStockoutCodeitempages = (params, options = {}) => {
 return api({
  url: `/api/app/stock-out/code-item-pages`,
  method: "get",
  params,
  ...options
 });
};

/**
 * 导出库存呼出原因
 * @param {Object} body - 请求参数
 * @param {number} [body.maxResultCount] - 
 * @param {string} [body.sorting] - 
 * @param {number} [body.page] - 
 * @param {string} [body.beginTime] - 
 * @param {string} [body.endTime] - 
 * @param {number} [body.skipCount] - 
*/
export const postStockoutExportcodeitems = (body, options = {}) => {
 return api({
  url: `/api/app/stock-out/export-code-items`,
  method: "post",
  data: body,
  ...options
 });
};

/**
 * 隔离单原因
 * @param {Object} params - 请求参数
 * @param {string} [params.Sorting] - 
 * @param {number} [params.Page] - 
 * @param {string} [params.BeginTime] - 
 * @param {string} [params.EndTime] - 
 * @param {number} [params.SkipCount] - 
 * @param {number} [params.MaxResultCount] - 
*/
export const getStockoutIsolatecodeitempages = (params, options = {}) => {
 return api({
  url: `/api/app/stock-out/isolate-code-item-pages`,
  method: "get",
  params,
  ...options
 });
};

/**
 * 获取库存呼出记录
 * @param {Object} params - 请求参数
 * @param {string} [params.ContainerCode] - 母托盘编号
 * @param {string} [params.SubtrayCode] - 子托盘编号
 * @param {string} [params.ProductCode] - 零件编码
 * @param {string} [params.Reason] - 呼出原因
 * @param {string} [params.Sorting] - 
 * @param {number} [params.Page] - 
 * @param {string} [params.BeginTime] - 
 * @param {string} [params.EndTime] - 
 * @param {number} [params.SkipCount] - 
 * @param {number} [params.MaxResultCount] - 
*/
export const getStockoutStockouthistorypages = (params, options = {}) => {
 return api({
  url: `/api/app/stock-out/stock-out-history-pages`,
  method: "get",
  params,
  ...options
 });
};

/**
 * 设置库存呼出原因
 * @param {Object} params - 请求参数
 * @param {string} [params.itemText] - 
*/
export const postStockoutSetcodeitem = (params, options = {}) => {
 return api({
  url: `/api/app/stock-out/set-code-item`,
  method: "post",
  params,
  ...options
 });
};

/**
 * 释放工作台订单
 * @param {Object} params - 请求参数
 * @param {string} params.workbenchId - 
*/
export const postStockoutDisposestaggorderByWorkbenchId = (workbenchId, options = {}) => {
 return api({
  url: `/api/app/stock-out/dispose-stagg-order/${workbenchId}`,
  method: "post",
  ...options
 });
};

/**
 * 强制完成出库单
 * @param {Object} params - 请求参数
 * @param {string} params.stockOutId - 
*/
export const postStockoutManualfinishorderByStockOutId = (stockOutId, options = {}) => {
 return api({
  url: `/api/app/stock-out/manual-finish-order/${stockOutId}`,
  method: "post",
  ...options
 });
};

/**
 * 出库时效
 * @param {Object} params - 请求参数
 * @param {string} [params.SourceNo] - 上游单号
 * @param {number} [params.Type] - 单据类型
 * @param {number} [params.WavePickTaskState] - 拣货单状态
 * @param {number} [params.OderState] - 单据状态
 * @param {string} [params.ProductCode] - 零件号
 * @param {number} [params.TaskDuration] - 任务耗时
 * @param {string} [params.Sorting] - 
 * @param {number} [params.Page] - 
 * @param {string} [params.BeginTime] - 
 * @param {string} [params.EndTime] - 
 * @param {number} [params.SkipCount] - 
 * @param {number} [params.MaxResultCount] - 
*/
export const getStockoutStockoutandpickinfo = (params, options = {}) => {
 return api({
  url: `/api/app/stock-out/stock-out-and-pick-info`,
  method: "get",
  params,
  ...options
 });
};

/**
 * 出库时效导出
 * @param {Object} body - 请求参数
 * @param {number} [body.maxResultCount] - 
 * @param {string} [body.sorting] - 
 * @param {number} [body.page] - 
 * @param {string} [body.beginTime] - 
 * @param {string} [body.endTime] - 
 * @param {number} [body.skipCount] - 
 * @param {string} [body.sourceNo] - 上游单号
 * @param {number} [body.type] - 业务类型
 * @param {number} [body.wavePickTaskState] - 
 * @param {number} [body.oderState] - 单据状态
 * @param {string} [body.productCode] - 零件号
 * @param {number} [body.taskDuration] - 任务耗时
*/
export const postStockoutExportstockoutandpickinfo = (body, options = {}) => {
 return api({
  url: `/api/app/stock-out/export-stock-out-and-pick-info`,
  method: "post",
  data: body,
  ...options
 });
};

