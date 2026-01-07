/**
 * ⚠️  警告：此文件由脚本自动生成，请勿手动编辑！
 * ��  swagger更新后请重新运行生成脚本
 * 服务地址：http://192.168.101.27:5006
*/

import { api } from "@/api/request/sendRuest"
/**
 * 零件档案下发
 * @param {Object} body - 请求参数
 * @param {string} body.warehouse - 域编码
 * @param {string} body.onwerid - 地点
 * @param {string} body.qualitytype - 质检属性
 * @param {string} [body.productStatus] - 零件状态
 * @param {string} body.productCode - 零件号
 * @param {string} [body.productName] - 零件名称
 * @param {string} [body.unit] - 基础单位
 * @param {number} [body.allamount] - 包装数量
 * @param {string} [body.allUnit] - 包装单位
 * @param {number} [body.packagingRate] - 托包装数量
 * @param {string} body.inventoryType - 存货类型(0:成品,1:原料,2:成品周转箱,3:半成品,4:样件)
 * @param {string} [body.supplyType] - 供应标识(0:vmi plant,1:other)
 * @param {number} [body.sequence] - 物料序列
 * @param {boolean} [body.isToOldKxZt] - 往老厂送的时候是否送往老厂空箱整托区
 * @param {number} [body.emptyBoxNewToOldRegin] - 空箱新厂去老厂目标区域
*/
export const postApiOpenWmsGetpartdatadown = (body, options = {}) => {
 return api({
  url: `/api/open/wms/get-partdata-down`,
  method: "post",
  data: body,
  ...options
 });
};

/**
 * 客户档案下发
 * @param {Object} body - 请求参数
 * @param {string} body.warehouse - 域编码
 * @param {string} body.cusNumber - 客户编码
 * @param {string} [body.cusName] - 客户名称
 * @param {string} [body.contacts] - 联系人
 * @param {string} [body.iphone] - 联系方式
 * @param {string} [body.address] - 联系地点
*/
export const postApiOpenWmsGetclientdatadown = (body, options = {}) => {
 return api({
  url: `/api/open/wms/get-clientdata-down`,
  method: "post",
  data: body,
  ...options
 });
};

/**
 * 供应商档案下发
 * @param {Object} body - 请求参数
 * @param {string} body.warehouse - 域编码
 * @param {string} body.cusNumber - 供应商编码
 * @param {string} [body.cusName] - 供应商名称
 * @param {string} [body.contacts] - 联系人
 * @param {string} [body.iphone] - 联系方式
 * @param {string} [body.address] - 联系地点
*/
export const postApiOpenWmsGetsupplierBydatadown = (body, options = {}) => {
 return api({
  url: `/api/open/wms/get-supplierBydata-down`,
  method: "post",
  data: body,
  ...options
 });
};

/**
 * 成品入库箱号信息下发
 * @param {Object} body - 请求参数
 * @param {string} body.warehouse - 域编码
 * @param {Array} [body.list] - 
*/
export const postApiOpenWmsStockInboxcodetask = (body, options = {}) => {
 return api({
  url: `/api/open/wms/stockIn-boxcode-task`,
  method: "post",
  data: body,
  ...options
 });
};

/**
 * 寄售入库箱号信息下发
 * @param {Object} body - 请求参数
 * @param {string} body.warehouse - 域编码，对应仓库
 * @param {string} body.number - 订单号
 * @param {string} body.cusNumber - 供应商代码
 * @param {Array} [body.list] - 
*/
export const postApiOpenWmsConsignboxpush = (body, options = {}) => {
 return api({
  url: `/api/open/wms/consign-box-push`,
  method: "post",
  data: body,
  ...options
 });
};

/**
 * IQC库存扣减
 * @param {Object} body - 请求参数
 * @param {string} [body.warehouse] - 域编码
 * @param {string} [body.ownerId] - 地点
 * @param {string} [body.boxcode] - 零件编码
 * @param {number} [body.qty] - 抽检数量
*/
export const postApiOpenWmsIqcstockasync = (body, options = {}) => {
 return api({
  url: `/api/open/wms/iqc-stock-async`,
  method: "post",
  data: body,
  ...options
 });
};

/**
 * 非寄售入库箱号信息下发
 * @param {Object} body - 请求参数
 * @param {string} body.warehouse - 域编码，对应仓库
 * @param {string} [body.number] - 订单号
 * @param {string} [body.cusNumber] - 供应商代码
 * @param {Array} [body.list] - 
*/
export const postApiOpenWmsNonconsignboxpush = (body, options = {}) => {
 return api({
  url: `/api/open/wms/non-consign-box-push`,
  method: "post",
  data: body,
  ...options
 });
};

/**
 * 出库订单信息下发
 * @param {Object} body - 请求参数
 * @param {string} body.number - 订单号
 * @param {string} [body.deliveryTime] - 发货时间
 * @param {string} [body.planTime] - 备货开始时间
 * @param {number} body.type - 订单类型
 * @param {string} body.warehouse - 域编码
 * @param {string} [body.cusCode] - 客户编码
 * @param {string} [body.supCode] - 供应商编码
 * @param {string} [body.arecode] - 订单目标区域
 * @param {Array} [body.list] - 
*/
export const postApiOpenWmsStockoutdown = (body, options = {}) => {
 return api({
  url: `/api/open/wms/stockout-down`,
  method: "post",
  data: body,
  ...options
 });
};

/**
 * 立体库出库口获取
 * @param {Object} body - 请求参数
 * @param {string} [body.number] - 订单号
 * @param {string} [body.deliveryTime] - 发货时间
 * @param {number} [body.type] - 订单类型
 * @param {string} [body.warehouse] - 域编码
 * @param {string} [body.onwerid] - 地点
 * @param {string} [body.cusCode] - 客户编码
 * @param {string} [body.supCode] - 供应商编码
 * @param {Array} [body.data] - 
*/
export const postApiOpenWmsWarehouseoutlet = (body, options = {}) => {
 return api({
  url: `/api/open/wms/warehouse-outlet`,
  method: "post",
  data: body,
  ...options
 });
};

/**
 * 出库库存交接
 * @param {Object} body - 请求参数
 * @param {string} [body.number] - 订单号
 * @param {string} [body.actualarecode] - 订单实际区域
 * @param {string} [body.isEndding] - 订单结束标识
 * @param {string} body.warehouse - 域编码
 * @param {Array} [body.list] - 
*/
export const postApiOpenWmsOutstockjoin = (body, options = {}) => {
 return api({
  url: `/api/open/wms/out-stock-join`,
  method: "post",
  data: body,
  ...options
 });
};

/**
 * 备货标准时间信息下发
 * @param {Object} body - 请求参数
 * @param {string} [body.warehouse] - 域编码
 * @param {string} [body.cusNumber] - 客户编码
 * @param {string} [body.handlingTime] - 备货准备时间(分钟)
 * @param {string} [body.singularTime] - 每托备货标准时间(分钟)
*/
export const postApiOpenWmsDownSpareTime = (body, options = {}) => {
 return api({
  url: `/api/open/wms/Down-Spare-Time`,
  method: "post",
  data: body,
  ...options
 });
};

/**
 * 下发隔离通知单（非VMI）
 * @param {Object} body - 请求参数
 * @param {string} [body.warehouse] - 仓库号
 * @param {string} [body.number] - 订单号
 * @param {Array} [body.list] - 
*/
export const postApiOpenWmsSendisolations = (body, options = {}) => {
 return api({
  url: `/api/open/wms/send-isolations`,
  method: "post",
  data: body,
  ...options
 });
};

/**
 * 出库订单执行状态查询
 * @param {Object} body - 请求参数
 * @param {string} [body.warehouse] - 域编码
 * @param {Array} [body.list] - 
*/
export const postApiOpenWmsGetstockoutstate = (body, options = {}) => {
 return api({
  url: `/api/open/wms/get-stockout-state`,
  method: "post",
  data: body,
  ...options
 });
};

/**
 * 订单关闭
 * @param {Object} body - 请求参数
 * @param {string} [body.warehouse] - 域编码
 * @param {string} [body.ordernumber] - 订单号
 * @param {Array} [body.list] - 
*/
export const postApiOpenWmsCancelorder = (body, options = {}) => {
 return api({
  url: `/api/open/wms/cancel-order`,
  method: "post",
  data: body,
  ...options
 });
};

/**
 * 立库库存查询(不存日志)
 * @param {Object} body - 请求参数
 * @param {string} [body.warehouse] - 域编码
 * @param {Array} [body.partList] - 
*/
export const postApiOpenWmsStockselect = (body, options = {}) => {
 return api({
  url: `/api/open/wms/stock-select`,
  method: "post",
  data: body,
  ...options
 });
};

/**
 * 盘点单下发
 * @param {Object} body - 请求参数
 * @param {string} [body.inventorynum] - 盘点单号
 * @param {string} [body.warehouse] - 域编码
 * @param {Array} [body.list] - 
*/
export const postApiOpenWmsGetiltdown = (body, options = {}) => {
 return api({
  url: `/api/open/wms/get-ilt-down`,
  method: "post",
  data: body,
  ...options
 });
};

/**
 * 盘点差异更新
 * @param {Object} body - 请求参数
 * @param {string} [body.warehouse] - 
 * @param {string} [body.inventorynum] - 
*/
export const postApiOpenWmsGetiltdifferenceUpdate = (body, options = {}) => {
 return api({
  url: `/api/open/wms/get-ilt-differenceUpdate`,
  method: "post",
  data: body,
  ...options
 });
};

/**
 * 质量隔离放行
 * @param {Object} body - 请求参数
 * @param {string} [body.warehouse] - 域编码
 * @param {Array} [body.list] - 库存
*/
export const postApiOpenWmsStockoutinfoGoout = (body, options = {}) => {
 return api({
  url: `/api/open/wms/stockout-info-Goout`,
  method: "post",
  data: body,
  ...options
 });
};

/**
 * 订单取消
 * @param {Object} body - 请求参数
 * @param {number} body.orderType - 订单类型
 * @param {string} body.ordernumber - 订单号
 * @param {string} [body.operator] - 操作者
*/
export const postApiOpenWmsOrdertaskcanle = (body, options = {}) => {
 return api({
  url: `/api/open/wms/order-task-canle`,
  method: "post",
  data: body,
  ...options
 });
};

/**
 * 立库VMI寄售库存账龄查询
 * @param {Object} body - 请求参数
 * @param {Array} [body.partList] - 
*/
export const postApiOpenWmsStockvmiselect = (body, options = {}) => {
 return api({
  url: `/api/open/wms/stock-vmi-select`,
  method: "post",
  data: body,
  ...options
 });
};

/**
 * 零件号DOH的数据下发
 * @param {Object} body - 请求参数
 * @param {Array} [body.list] - 
*/
export const postApiOpenWmsDohPush = (body, options = {}) => {
 return api({
  url: `/api/open/wms/Doh-Push`,
  method: "post",
  data: body,
  ...options
 });
};

/**
 * 立原材料料车配送终点的信息下发
 * @param {Object} body - 请求参数
 * @param {string} [body.warehouse] - 域编码
 * @param {string} [body.code] - 料车编码
 * @param {string} [body.agvend] - 产线点位
*/
export const postApiOpenWmsAgvenddown = (body, options = {}) => {
 return api({
  url: `/api/open/wms/agvend-down`,
  method: "post",
  data: body,
  ...options
 });
};

/**
 * 登录
 * @param {Object} body - 请求参数
 * @param {string} body.userName - 
 * @param {string} body.password - 
 * @param {string} [body.tenantId] - 
 * @param {string} body.systemName - 
 * @param {string} [body.scret] - 私钥
*/
export const postApiOpenWmsLoginOn = (body, options = {}) => {
 return api({
  url: `/api/open/wms/Login-On`,
  method: "post",
  data: body,
  ...options
 });
};

/**
 * 退立库信息下发
 * @param {Object} body - 请求参数
 * @param {string} body.warehouse - 
 * @param {string} body.supnumber - 
 * @param {string} body.productCode - 
 * @param {string} body.subtray - 
 * @param {string} body.amount - 
*/
export const postApiOpenWmsReturnPackage = (body, options = {}) => {
 return api({
  url: `/api/open/wms/Return-Package`,
  method: "post",
  data: body,
  ...options
 });
};

/**
 * 立库库存查询
 * @param {Object} body - 请求参数
 * @param {string} body.warehouse - 域编码
 * @param {string} body.datetimeStart - 开始时间
 * @param {string} body.datetimeEnd - 结束时间
 * @param {Array} [body.partList] - 
*/
export const postApiOpenWmsVmistockreturnselect = (body, options = {}) => {
 return api({
  url: `/api/open/wms/vmistock-return-select`,
  method: "post",
  data: body,
  ...options
 });
};

/**
 * 根据箱号查询库存状态和所在地
 * @param {Object} body - 请求参数
 * @param {string} [body.warehouse] - 
 * @param {Array} [body.boxs] - 
*/
export const postApiOpenWmsStockboxsr = (body, options = {}) => {
 return api({
  url: `/api/open/wms/stock-box-sr`,
  method: "post",
  data: body,
  ...options
 });
};

/**
 * 立库库存查询
 * @param {Object} body - 请求参数
 * @param {string} body.warehouse - 域编码
 * @param {string} body.datetimeStart - 开始时间
 * @param {string} body.datetimeEnd - 结束时间
 * @param {Array} [body.partList] - 
*/
export const postApiOpenWmsVmistockserialselect = (body, options = {}) => {
 return api({
  url: `/api/open/wms/vmistock-serial-select`,
  method: "post",
  data: body,
  ...options
 });
};

/**
 * 料车未结任务查询
 * @param {Object} body - 请求参数
 * @param {string} [body.warehouse] - 域编码
 * @param {string} [body.code] - 料车编码
 * @param {string} [body.agvend] - 产线点位
*/
export const postApiOpenWmsGetagvenddown = (body, options = {}) => {
 return api({
  url: `/api/open/wms/get-agvend-down`,
  method: "post",
  data: body,
  ...options
 });
};

/**
 * HOLD库存原因码
 * @param {Object} body - 请求参数
 * @param {string} [body.warehouse] - 域编码
 * @param {Array} [body.list] - 
*/
export const postApiOpenWmsHolderrorcode = (body, options = {}) => {
 return api({
  url: `/api/open/wms/hold-error-code`,
  method: "post",
  data: body,
  ...options
 });
};

/**
 * 零件缺料日期信息下发
 * @param {Object} body - 请求参数
 * @param {string} body.version - 版本号
 * @param {string} body.warehouse - 域编码(仓库编码)
 * @param {Array} [body.list] - 明细列表
*/
export const postApiOpenWmsProductlackdateinfo = (body, options = {}) => {
 return api({
  url: `/api/open/wms/product-lack-date-info`,
  method: "post",
  data: body,
  ...options
 });
};

/**
 * 支架解绑
 * @param {Object} body - 请求参数
 * @param {string} [body.warehouse] - 域编码
 * @param {Array} [body.list] - 
*/
export const postApiOpenWmsReleasebracket = (body, options = {}) => {
 return api({
  url: `/api/open/wms/release-bracket`,
  method: "post",
  data: body,
  ...options
 });
};

/**
 * 原材料顺序生产计划pitch需求量下发
 * @param {Object} body - 请求参数
 * @param {string} body.warehouse - 域编码
 * @param {Array} [body.list] - 
*/
export const postApiOpenWmsMaterialusageplandown = (body, options = {}) => {
 return api({
  url: `/api/open/wms/material-usage-plan-down`,
  method: "post",
  data: body,
  ...options
 });
};

/**
 * 包装主数据下发
 * @param {Object} body - 请求参数
 * @param {string} [body.warehouse] - 域编码
 * @param {string} [body.onwerid] - 地点
 * @param {string} [body.productCode] - 零件号
 * @param {string} [body.productName] - 零件名称
 * @param {string} [body.productStatus] - 零件状态
 * @param {string} [body.productType] - 零件类型
 * @param {string} [body.suppcust] - 供应商/客户
 * @param {string} [body.planner] - 计划员
 * @param {string} [body.city] - 交付城市
 * @param {string} [body.family] - DWH零件家族
 * @param {number} [body.dwhvmi] - DWH是否VMI零件
 * @param {number} [body.dwhmodel] - 是否参与DWH模型推荐
 * @param {number} [body.dwhsmkt] - DWH是否为超市物流
 * @param {number} [body.stockdirect] - 横放/竖放
 * @param {string} [body.saftyqty] - 安全库存数量
 * @param {string} [body.allamount] - 箱标包数量
 * @param {string} [body.packagingRate] - 零件数量/托
 * @param {string} [body.skunetwet] - 零件净重量（KG）
 * @param {string} [body.skugrosswet] - 零件毛重量（KG）
 * @param {string} [body.palletlayer] - 包装层数/托
 * @param {string} [body.layerqty] - 包装数量/层
 * @param {string} [body.palletboxqty] - 包装箱数/托
 * @param {string} [body.palletgoodsheight] - 托盘含货高（mm）
 * @param {number} [body.stacking] - 托盘是否允许堆垛
 * @param {string} [body.stackingqty] - 托盘堆垛数量
 * @param {number} [body.mixpart] - 是否允许零件混托
 * @param {number} [body.mixpackage] - 不同包装主数据是否允许混托
 * @param {number} [body.layerfufill] - 是否填空箱满层
 * @param {string} [body.country] - 原产国
 * @param {string} [body.boxcode] - 包装箱件号
 * @param {string} [body.boxname] - 包装箱名称
 * @param {string} [body.boxdesc] - 包装箱描述
 * @param {string} [body.allUnit] - 包装箱单位
 * @param {number} [body.packagetype] - 包装类型
 * @param {string} [body.boxnetwet] - 包装箱净重（kg）
 * @param {string} [body.boxgrosswet] - 包装箱毛重（KG）
 * @param {string} [body.boxlength] - 包装箱外径尺寸（mm）长
 * @param {string} [body.boxwidth] - 包装箱外径尺寸（mm）宽
 * @param {string} [body.boxheight] - 包装箱外径尺寸（mm）高
 * @param {string} [body.boxwet] - 包装总重量(KG)
 * @param {number} [body.usepallet] - 是否使用托盘
 * @param {string} [body.palletcode] - 托盘件号
 * @param {string} [body.palletname] - 托盘名称
 * @param {string} [body.palletdesc] - 托盘描述
 * @param {string} [body.palletunit] - 托盘单位
 * @param {string} [body.pallettype] - 托盘型
 * @param {string} [body.palletnetwet] - 托盘净重（kg）
 * @param {string} [body.palletwet] - 整托重量（KG）
 * @param {string} [body.palletlength] - 托盘外径尺寸（mm）长
 * @param {string} [body.palletwidth] - 托盘外径尺寸（mm）宽
 * @param {string} [body.palletheight] - 托盘外径尺寸（mm）高
 * @param {string} [body.palletvol] - 每托含货体积（cbm）
 * @param {number} [body.aS246] - 托盘尺寸是否符合AS246
 * @param {string} [body.palletvolpercent] - 周转箱返空体积率（%）
 * @param {number} [body.dangergoods] - 危险品运输
*/
export const postApiOpenWmsGetpackagedatadown = (body, options = {}) => {
 return api({
  url: `/api/open/wms/get-packagedata-down`,
  method: "post",
  data: body,
  ...options
 });
};

/**
 * 合托箱码信息下发
 * @param {Object} body - 请求参数
 * @param {Array} [body.list] - 
 * @param {string} body.warehouse - 域编码
 * @param {string} body.codetype - 编号类型(0原料1成品箱2成品周转箱)
 * @param {string} [body.subtray] - 子托盘号
*/
export const postApiOpenWmsSyncmergepack = (body, options = {}) => {
 return api({
  url: `/api/open/wms/sync-merge-pack`,
  method: "post",
  data: body,
  ...options
 });
};

/**
 * 老厂任务下发
 * @param {Object} body - 请求参数
 * @param {string} [body.pointCode] - 老厂传的点位，新厂需要建一个一样的方便看任务
 * @param {string} [body.containerCode] - 容器Code
 * @param {number} body.oldTaskDownType - 
 * @param {boolean} [body.needDownTask] - 是否下发（默认下发）
 * @param {string} [body.taskNo] - 任务编号
*/
export const postApiOpenWmsOldtaskdown = (body, options = {}) => {
 return api({
  url: `/api/open/wms/old-task-down`,
  method: "post",
  data: body,
  ...options
 });
};

