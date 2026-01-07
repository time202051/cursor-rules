/**
 * ⚠️  警告：此文件由脚本自动生成，请勿手动编辑！
 * ��  swagger更新后请重新运行生成脚本
 * 服务地址：http://192.168.101.27:5006
*/

// AGV接口
export const Agv = {
  postApiOpenAgvAGVcallback: "/api/open/agv/AGV-callback", //post Agv任务完成反馈兼容PC端
  postApiOpenAgvCallback: "/api/open/agv/callback", //post Agv任务完成反馈
};

// WMS接口
export const Wms = {
  postApiOpenWmsGetpartdatadown: "/api/open/wms/get-partdata-down", //post 零件档案下发
  postApiOpenWmsGetclientdatadown: "/api/open/wms/get-clientdata-down", //post 客户档案下发
  postApiOpenWmsGetsupplierBydatadown: "/api/open/wms/get-supplierBydata-down", //post 供应商档案下发
  postApiOpenWmsStockInboxcodetask: "/api/open/wms/stockIn-boxcode-task", //post 成品入库箱号信息下发
  postApiOpenWmsConsignboxpush: "/api/open/wms/consign-box-push", //post 寄售入库箱号信息下发
  postApiOpenWmsIqcstockasync: "/api/open/wms/iqc-stock-async", //post IQC库存扣减
  postApiOpenWmsNonconsignboxpush: "/api/open/wms/non-consign-box-push", //post 非寄售入库箱号信息下发
  postApiOpenWmsStockoutdown: "/api/open/wms/stockout-down", //post 出库订单信息下发
  postApiOpenWmsWarehouseoutlet: "/api/open/wms/warehouse-outlet", //post 立体库出库口获取
  postApiOpenWmsOutstockjoin: "/api/open/wms/out-stock-join", //post 出库库存交接
  postApiOpenWmsDownSpareTime: "/api/open/wms/Down-Spare-Time", //post 备货标准时间信息下发
  postApiOpenWmsSendisolations: "/api/open/wms/send-isolations", //post 下发隔离通知单（非VMI）
  postApiOpenWmsGetstockoutstate: "/api/open/wms/get-stockout-state", //post 出库订单执行状态查询
  postApiOpenWmsCancelorder: "/api/open/wms/cancel-order", //post 订单关闭
  postApiOpenWmsStockselect: "/api/open/wms/stock-select", //post 立库库存查询(不存日志)
  postApiOpenWmsGetiltdown: "/api/open/wms/get-ilt-down", //post 盘点单下发
  postApiOpenWmsGetiltdifferenceUpdate: "/api/open/wms/get-ilt-differenceUpdate", //post 盘点差异更新
  postApiOpenWmsStockoutinfoGoout: "/api/open/wms/stockout-info-Goout", //post 质量隔离放行
  postApiOpenWmsOrdertaskcanle: "/api/open/wms/order-task-canle", //post 订单取消
  postApiOpenWmsStockvmiselect: "/api/open/wms/stock-vmi-select", //post 立库VMI寄售库存账龄查询
  postApiOpenWmsDohPush: "/api/open/wms/Doh-Push", //post 零件号DOH的数据下发
  postApiOpenWmsAgvenddown: "/api/open/wms/agvend-down", //post 立原材料料车配送终点的信息下发
  postApiOpenWmsLoginOn: "/api/open/wms/Login-On", //post 登录
  postApiOpenWmsReturnPackage: "/api/open/wms/Return-Package", //post 退立库信息下发
  postApiOpenWmsVmistockreturnselect: "/api/open/wms/vmistock-return-select", //post 立库库存查询
  postApiOpenWmsStockboxsr: "/api/open/wms/stock-box-sr", //post 根据箱号查询库存状态和所在地
  postApiOpenWmsVmistockserialselect: "/api/open/wms/vmistock-serial-select", //post 立库库存查询
  postApiOpenWmsGetagvenddown: "/api/open/wms/get-agvend-down", //post 料车未结任务查询
  postApiOpenWmsHolderrorcode: "/api/open/wms/hold-error-code", //post HOLD库存原因码
  postApiOpenWmsProductlackdateinfo: "/api/open/wms/product-lack-date-info", //post 零件缺料日期信息下发
  postApiOpenWmsReleasebracket: "/api/open/wms/release-bracket", //post 支架解绑
  postApiOpenWmsMaterialusageplandown: "/api/open/wms/material-usage-plan-down", //post 原材料顺序生产计划pitch需求量下发
  postApiOpenWmsGetpackagedatadown: "/api/open/wms/get-packagedata-down", //post 包装主数据下发
  postApiOpenWmsSyncmergepack: "/api/open/wms/sync-merge-pack", //post 合托箱码信息下发
  postApiOpenWmsOldtaskdown: "/api/open/wms/old-task-down", //post 老厂任务下发
};

// 接口信息管理
export const ApiDescription = {
  getApidescription: "/api/app/api-description/api-description", //get 获取接口信息
};

// 审计日志接口管理
export const AuditLogging = {
  getAuditloggingAuditlogpages: "/api/app/audit-logging/audit-log-pages", //get 系统接口日志
  postAuditloggingExportauditlog: "/api/app/audit-logging/export-audit-log", //post 导出审计日志
  deleteAuditloggingOperationlog: "/api/app/audit-logging/operation-log", //delete 删除审计日志
  getAuditloggingEntitychangepages: "/api/app/audit-logging/entity-change-pages", //get 实体变更日志
  getAuditloggingBackgroundjobpages: "/api/app/audit-logging/background-job-pages", //get 后台队列
  postAuditloggingActivebackgroundjob: "/api/app/audit-logging/active-background-job", //post 激活后台job
  deleteAuditloggingBackgroundjob: "/api/app/audit-logging/background-job", //delete 移库后台job
  getAuditloggingAuditloggingsetting: "/api/app/audit-logging/audit-logging-setting", //get 
  putAuditloggingAuditloggingsetting: "/api/app/audit-logging/audit-logging-setting", //put 
};

// 配置服务接口
export const Config = {
  getConfigBackgroundworkerconfigpages: "/api/app/config/background-worker-config-pages", //get 获取后台工作配置分页信息
  postConfigChangedbackgroundworkerconfigenabled: "/api/app/config/changed-background-worker-config-enabled", //post 改变后台工作任务启用状态
};

// 生产管理
export const WorkManager = {
  getWorkmanagerWorkorderlist: "/api/app/work-manager/work-order-list", //get 获取生产订单
  getWorkmanagerOrderdetails: "/api/app/work-manager/order-details", //get 生产订单明细
  postWorkmanagerExpotrworkorder: "/api/app/work-manager/expotr-work-order", //post 导出
  postWorkmanagerImportworkorder: "/api/app/work-manager/import-work-order", //post 生产订单导入
  postWorkmanagerWorkorder: "/api/app/work-manager/work-order", //post 接口创建生产订单
  postWorkmanagerDownworkordertemplate: "/api/app/work-manager/down-workorder-template", //post 生产订单导入模板下载
  postWorkmanagerExecuteById: "/api/app/work-manager/execute", //post 订单执行
  postWorkmanagerExecuteByIdCompleteUrl: "/api/app/work-manager/execute/{Id}", //post 订单执行
  getWorkmanagerOrderbystage: "/api/app/work-manager/order-by-stage", //get 根据产线获取生产订单未完工状态
  getWorkmanagerUpmaterialById: "/api/app/work-manager/up-material", //get 生产订单上料
  getWorkmanagerUpmaterialByIdCompleteUrl: "/api/app/work-manager/up-material/{Id}", //get 生产订单上料
  getWorkmanagerScanlocation: "/api/app/work-manager/scan-location", //get 完工下线扫描下料口 （入库口点位）
  getWorkmanagerCallcontainer: "/api/app/work-manager/call-container", //get 呼叫空托盘
  getWorkmanagerSubmitreport: "/api/app/work-manager/submit-report", //get 生产报工
  getWorkmanagerMaterialpicks: "/api/app/work-manager/material-picks", //get 根据产线获取生产领料单
  getWorkmanagerMaterialpicksbylocationorcontainer: "/api/app/work-manager/material-picks-by-locationor-container", //get 扫描容器号获取生产领料单
  getWorkmanagerPicking: "/api/app/work-manager/picking", //get 生产领料（扣料）
  getWorkmanagerReturnmargin: "/api/app/work-manager/return-margin", //get 余量暂存
  getWorkmanagerReturnmargininstock: "/api/app/work-manager/return-margin-in-stock", //get 余量回库
  getWorkmanagerEmptylocation: "/api/app/work-manager/empty-location", //get 
  getWorkmanagerContainernum: "/api/app/work-manager/container-num", //get 根据容器类型获取当前吊具区存在的容器个数
  getWorkmanagerCallworkemptybox: "/api/app/work-manager/call-work-empty-box", //get 呼叫生产空箱（吊具区）
  getWorkmanagerBandworkemptybox: "/api/app/work-manager/band-work-empty-box", //get 绑定生产吊具区空箱子
  getWorkmanagerNotbandworkemptybox: "/api/app/work-manager/not-band-work-empty-box", //get 解绑
  getWorkmanagerContainertypelist: "/api/app/work-manager/container-type-list", //get 容器类型下拉
  getWorkmanagerAgvlocationwork: "/api/app/work-manager/agv-location-work", //get 点对点
  getWorkmanagerAgvregionwork: "/api/app/work-manager/agv-region-work", //get 点对区域
  getWorkmanagerPointstatus: "/api/app/work-manager/point-status", //get 扫描需要释放/占用点位
  getWorkmanagerPointdispose: "/api/app/work-manager/point-dispose", //get 释放
  getWorkmanagerPointoccupy: "/api/app/work-manager/point-occupy", //get 占用
  getWorkmanagerProductinstock: "/api/app/work-manager/product-instock", //get 成品入库
  postWorkmanagerEmptycontainerout: "/api/app/work-manager/empty-container-out", //post 新空容器出库
  postWorkmanagerRecommendemptycargolocation: "/api/app/work-manager/recommend-empty-cargo-location", //post 
};

// 物料管理
export const Product = {
  postProductOwner: "/api/app/product/owner", //post 创建货主
  postProductExportowner: "/api/app/product/export-owner", //post 货主信息导出
  deleteProductOwnerByOwnerId: "/api/app/product/owner", //delete 删除货主信息
  deleteProductOwnerByOwnerIdCompleteUrl: "/api/app/product/owner/{OwnerId}", //delete 删除货主信息
  putProductOwnerByOwnerId: "/api/app/product/owner", //put 编辑货主信息
  putProductOwnerByOwnerIdCompleteUrl: "/api/app/product/owner/{OwnerId}", //put 编辑货主信息
  getProductOwnerpages: "/api/app/product/owner-pages", //get 获取货主分页数据信息
  getProductOwnerselect: "/api/app/product/owner-select", //get 获取货主下拉框数据
  getProductDicbyunit: "/api/app/product/dic-by-unit", //get 获取单位字典
  getProductOwnerbyidByOwnerId: "/api/app/product/owner-by-id", //get 根据ID获取单条数据
  getProductOwnerbyidByOwnerIdCompleteUrl: "/api/app/product/owner-by-id/{OwnerId}", //get 根据ID获取单条数据
  postProductProductclass: "/api/app/product/product-class", //post 创建物料分类
  postProductExportproductclass: "/api/app/product/export-product-class", //post 物料分类信息导出
  deleteProductProductclassByProductClassId: "/api/app/product/product-class", //delete 删除物料分类信息
  deleteProductProductclassByProductClassIdCompleteUrl: "/api/app/product/product-class/{ProductClassId}", //delete 删除物料分类信息
  putProductProductclassByProductClassId: "/api/app/product/product-class", //put 编辑物料分类信息
  putProductProductclassByProductClassIdCompleteUrl: "/api/app/product/product-class/{ProductClassId}", //put 编辑物料分类信息
  getProductProductclasspages: "/api/app/product/product-class-pages", //get 获取物料分类分页数据信息
  getProductProductclassselect: "/api/app/product/product-class-select", //get 获取物料分类下拉框数据
  getProductProductclasssublevel: "/api/app/product/product-class-sub-level", //get 根据上级物料分类ID 获取子级物料分类等级
  getProductProductclassbyidByProductClassId: "/api/app/product/product-class-by-id", //get 根据ID获取单条数据
  getProductProductclassbyidByProductClassIdCompleteUrl: "/api/app/product/product-class-by-id/{ProductClassId}", //get 根据ID获取单条数据
  postProductProductowner: "/api/app/product/product-owner", //post 创建物料与货主关系
  postProductExportproductowner: "/api/app/product/export-product-owner", //post 物料与货主关系信息导出
  deleteProductProductownerByProductOwnerId: "/api/app/product/product-owner", //delete 删除物料与货主关系信息
  deleteProductProductownerByProductOwnerIdCompleteUrl: "/api/app/product/product-owner/{ProductOwnerId}", //delete 删除物料与货主关系信息
  putProductProductownerByProductOwnerId: "/api/app/product/product-owner", //put 编辑物料与货主关系信息
  putProductProductownerByProductOwnerIdCompleteUrl: "/api/app/product/product-owner/{ProductOwnerId}", //put 编辑物料与货主关系信息
  getProductProductownerbyidByProductOwnerId: "/api/app/product/product-owner-by-id", //get 根据ID获取单条数据
  getProductProductownerbyidByProductOwnerIdCompleteUrl: "/api/app/product/product-owner-by-id/{ProductOwnerId}", //get 根据ID获取单条数据
  getProductByowneridByOwnerId: "/api/app/product/by-owner-id", //get 根据货主获取货主相关所有物料数据
  getProductByowneridByOwnerIdCompleteUrl: "/api/app/product/by-owner-id/{OwnerId}", //get 根据货主获取货主相关所有物料数据
  getProductByproductidByProductId: "/api/app/product/by-product-id", //get 根据物料获取货主相关所有货主数据
  getProductByproductidByProductIdCompleteUrl: "/api/app/product/by-product-id/{ProductId}", //get 根据物料获取货主相关所有货主数据
  getProductProductownerbyid: "/api/app/product/product-owner-by-id", //get 根据物料ID和货主ID获取单条数据
  getProductProductpages: "/api/app/product/product-pages", //get 获取产品分页信息数据
  getProductProductpackagelist: "/api/app/product/product-package-list", //get 获取产品包装主数据
  postProduct: "/api/app/product/product", //post 创建产品
  putProductByProductId: "/api/app/product/product", //put 编辑产品
  putProductByProductIdCompleteUrl: "/api/app/product/product/{productId}", //put 编辑产品
  deleteProductByProductId: "/api/app/product/product", //delete 删除产品
  deleteProductByProductIdCompleteUrl: "/api/app/product/product/{productId}", //delete 删除产品
  getProductProductbyidByProductId: "/api/app/product/product-by-id", //get 根据ID获取单条数据
  getProductProductbyidByProductIdCompleteUrl: "/api/app/product/product-by-id/{productId}", //get 根据ID获取单条数据
  getProductProductselect: "/api/app/product/product-select", //get 获取物料下拉框数据
  postProductExportstock: "/api/app/product/export-stock", //post 物料信息导出
  postProductDownproduct: "/api/app/product/down-product", //post 物料导入模板下载
};

// 公共聚合模型接口
export const PublicAggregate = {
  getPublicaggregateDatatemplatepages: "/api/app/public-aggregate/data-template-pages", //get 获取数据模板分页数据信息
  postPublicaggregateDatatemplate: "/api/app/public-aggregate/data-template", //post 创建数据模板数据
  postPublicaggregateUploaddatatemplate: "/api/app/public-aggregate/upload-data-template", //post 上传数据模板
  getPublicaggregateDowndatatemplateByDataTemplateId: "/api/app/public-aggregate/down-data-template", //get 下载模板
  getPublicaggregateDowndatatemplateByDataTemplateIdCompleteUrl: "/api/app/public-aggregate/down-data-template/{dataTemplateId}", //get 下载模板
  putPublicaggregateDatatemplateByDataTemplateId: "/api/app/public-aggregate/data-template", //put 编辑数据模板
  putPublicaggregateDatatemplateByDataTemplateIdCompleteUrl: "/api/app/public-aggregate/data-template/{dataTemplateId}", //put 编辑数据模板
  deletePublicaggregateDatatemplateByDataTemplateId: "/api/app/public-aggregate/data-template", //delete 删除数据模板
  deletePublicaggregateDatatemplateByDataTemplateIdCompleteUrl: "/api/app/public-aggregate/data-template/{dataTemplateId}", //delete 删除数据模板
  getPublicaggregateDictionaries: "/api/app/public-aggregate/dictionaries", //get 
  getPublicaggregateDictionarieslist: "/api/app/public-aggregate/dictionaries-list", //get 
  postPublicaggregateDic: "/api/app/public-aggregate/dic", //post 
  getPublicaggregateDcibyid: "/api/app/public-aggregate/dci-by-id", //get 
  getPublicaggregateDicbyparentid: "/api/app/public-aggregate/dic-by-parent-id", //get 
};

// 公共枚举接口
export const PublicEnum = {
  getPublicenumEnums: "/api/app/public-enum/enums", //get 获取所有枚举信息
  getPublicenumSingleenum: "/api/app/public-enum/single-enum", //get 获取单个枚举
};

// 统计服务结构
export const Statistics = {
  getStatisticsDevicealarmpages: "/api/app/statistics/device-alarm-pages", //get 获取设备报警信息
  postStatisticsExportdevicealarms: "/api/app/statistics/export-device-alarms", //post 导出设备报警信息
  getStatisticsTaskbyroadway: "/api/app/statistics/task-by-road-way", //get 根据巷道获取任务数及库位数
  postStatisticsExporttaskbyroadway: "/api/app/statistics/export-task-by-road-way", //post 导出巷道获取任务数及库位数
  getStatisticsTaskbytype: "/api/app/statistics/task-by-type", //get 根据类型获取任务量
  postStatisticsExporttaskbytype: "/api/app/statistics/export-task-by-type", //post 导出类型获取任务量
  getStatisticsTraycount: "/api/app/statistics/tray-count", //get 获取库位使用情况
  postStatisticsExporttraycount: "/api/app/statistics/export-tray-count", //post 导出库位使用情况
  getStatisticsDevicetask: "/api/app/statistics/device-task", //get 获取设备任务执行效率
  postStatisticsExportdevicetask: "/api/app/statistics/export-device-task", //post 导出设备任务执行效率
  getStatisticsRunstatistics: "/api/app/statistics/run-statistics", //get 获取运行效率历史报表
  postStatisticsExportrunstatistics: "/api/app/statistics/export-run-statistics", //post 导出运行效率历史报表
  getStatisticsStockoutstatistics: "/api/app/statistics/stock-out-statistics", //get 出库订单报表
  postStatisticsExportstockoutstatistics: "/api/app/statistics/export-stock-out-statistics", //post 出库订单报表导出
  getStatisticsStockoutstatisticsdetail: "/api/app/statistics/stock-out-statistics-detail", //get 出库订单报表详情
  postStatisticsExportstockoutstatisticsdetail: "/api/app/statistics/export-stock-out-statistics-detail", //post 导出出库订单报表详情
};

// 库存接口管理
export const Stock = {
  getStockStockpages: "/api/app/stock/stock-pages", //get 获取库存分页数据信息
  postStockFreezestock: "/api/app/stock/freeze-stock", //post 冻结库存
  postStockUnfreezestock: "/api/app/stock/un-freeze-stock", //post 解冻库存
  postStockChangevmistock: "/api/app/stock/change-vmi-stock", //post VMI隔离/放行
  postStockChangevmistatus: "/api/app/stock/change-vmi-status", //post VMI隔离/放行
  getStockStockhistorypages: "/api/app/stock/stock-history-pages", //get 获取库存流水分页数据信息
  postStockExportstock: "/api/app/stock/export-stock", //post 库存导出
  postStockExportstockpacking: "/api/app/stock/export-stock-packing", //post 库存导出》导出详情装箱单
  postStockExportstockhistory: "/api/app/stock/export-stock-history", //post 库存流水导出
  getStockStocktransferemptyrecordpaged: "/api/app/stock/stock-transfer-empty-record-paged", //get 立库库存转移到空状态记录
  getStockVmireturnpages: "/api/app/stock/vmi-return-pages", //get 获取质检分页数据
  postStockChangeboxqty: "/api/app/stock/change-box-qty", //post 手动调账
  getStockStockpagesbyproductcode: "/api/app/stock/stock-pages-by-product-code", //get 按照物料编码归类查找库存
  getStockStockdetailpagesbyproductcode: "/api/app/stock/stock-detail-pages-by-product-code", //get 按物料编码查看库存明细
  postStockExportstockbyproductcode: "/api/app/stock/export-stock-by-product-code", //post 按物料导出库存
  getStockProducttype: "/api/app/stock/product-type", //get 零件存货属性下拉框
};

// 入库相关接口
export const StockIn = {
  getStockinSuppliername: "/api/app/stock-in/supplier-name", //get 获取供应商名称
  postStockin: "/api/app/stock-in/stock-in", //post 新增收货订单
  putStockinByStockInId: "/api/app/stock-in/stock-in", //put 编辑收货订单
  putStockinByStockInIdCompleteUrl: "/api/app/stock-in/stock-in/{stockInId}", //put 编辑收货订单
  deleteStockinByStockInId: "/api/app/stock-in/stock-in", //delete 删除收货订单
  deleteStockinByStockInIdCompleteUrl: "/api/app/stock-in/stock-in/{stockInId}", //delete 删除收货订单
  getStockinStockinpages: "/api/app/stock-in/stock-in-pages", //get 收货订单分页
  postStockinExportstockin: "/api/app/stock-in/export-stock-in", //post 收货订单导出
  postStockinFinishstockinByStockInId: "/api/app/stock-in/finish-stock-in", //post 完成收货
  postStockinFinishstockinByStockInIdCompleteUrl: "/api/app/stock-in/finish-stock-in/{stockInId}", //post 完成收货
  postStockinImportstockin: "/api/app/stock-in/import-stock-in", //post 收货单导入
  postStockinDownstockintemplate: "/api/app/stock-in/down-stock-in-template", //post 收货单导入模板下载
  getStockinStockindetailpages: "/api/app/stock-in/stock-in-detail-pages", //get 收货订单详情分页
  postStockinExportstockindetail: "/api/app/stock-in/export-stock-in-detail", //post 收货单详情导出
  postStockinExportstockout: "/api/app/stock-in/export-stock-out", //post 到货通知单详情导出
  getStockinPackinginformationpages: "/api/app/stock-in/packing-information-pages", //get 
  postStockinExportpackinginformation: "/api/app/stock-in/export-packing-information", //post 装箱信息导出
  getStockinProductselect: "/api/app/stock-in/product-select", //get 获取物料信息下拉框
  getStockinProductselectwithcodename: "/api/app/stock-in/product-select-with-code-name", //get 零件下拉
  getStockinSupplierselect: "/api/app/stock-in/supplier-select", //get 获取供应商信息下拉框
  getStockinBindrecorddetailpages: "/api/app/stock-in/bind-record-detail-pages", //get 获取码盘记录明细数据
  getStockinBindrecordpages: "/api/app/stock-in/bind-record-pages", //get 获取码盘记录汇总数据
  getStockinBindcontainerinfo: "/api/app/stock-in/bind-container-info", //get 获取物料详情
  postStockinExportbindrecorddetail: "/api/app/stock-in/export-bind-record-detail", //post 码盘记录明细导出
  postStockinExportbindrecord: "/api/app/stock-in/export-bind-record", //post 码盘记录汇总导出
  postStockinCanclebindrecord: "/api/app/stock-in/cancle-bind-record", //post 撤销码盘
  postStockinResend: "/api/app/stock-in/re-send", //post 补发
};

// 出库业务相关接口
export const StockOut = {
  postStockoutDownworkordertemplate: "/api/app/stock-out/down-workorder-template", //post 出库订单导入模板下载
  postStockoutImportworkorder: "/api/app/stock-out/import-work-order", //post 出库订单导入
  postStockoutWorkorder: "/api/app/stock-out/work-order", //post 接口创建出库单
  getStockoutPickoutstock: "/api/app/stock-out/pick-out-stock", //get 分配出库
  postStockoutExportconsolidinerecord: "/api/app/stock-out/export-consolidine-record", //post 合托换托信息导出
  postStockoutExportstock: "/api/app/stock-out/export-stock", //post 出库信息导出
  postStockoutExportstockoutdetail: "/api/app/stock-out/export-stock-out-detail", //post 出库信息明细导出
  getStockoutConsolidinerecorddetailpages: "/api/app/stock-out/consolidine-record-detail-pages", //get 获取根据合托换托Id获取详情信息
  getStockoutConsolidinerecordpages: "/api/app/stock-out/consolidine-record-pages", //get 获取合托换托分页数据信息
  getStockoutStockoutdetailpages: "/api/app/stock-out/stock-out-detail-pages", //get 获取出库订单明细详情分页数据信息
  getStockoutStockoutpages: "/api/app/stock-out/stock-out-pages", //get 获取出库订单分页数据信息
  getStockoutSupermarketpick: "/api/app/stock-out/super-market-pick", //get 二楼超市缓存区目视屏幕-出货口
  getStockoutSupermarketreturn: "/api/app/stock-out/super-market-return", //get 二楼超市缓存区目视屏幕-入
  getStockoutWavepages: "/api/app/stock-out/wave-pages", //get 获取波次分页数据信息
  getStockoutWavepickpages: "/api/app/stock-out/wave-pick-pages", //get 获取波次拣选分配详情
  getStockoutWavestockoutdetailpages: "/api/app/stock-out/wave-stock-out-detail-pages", //get 获取波次拣选信息
  getStockoutOrderpickpages: "/api/app/stock-out/order-pick-pages", //get 获取拣选信息
  postStockoutExportorderpicklist: "/api/app/stock-out/export-order-pick-list", //post 导出拣选信息
  getStockoutOrderpickboxpagesByPickId: "/api/app/stock-out/order-pick-box-pages", //get 获取拣选明细信息
  getStockoutOrderpickboxpagesByPickIdCompleteUrl: "/api/app/stock-out/order-pick-box-pages/{pickId}", //get 获取拣选明细信息
  postStockoutSetstockoutdetailByStockOutDetailId: "/api/app/stock-out/set-stock-out-detail", //post 设置出货单明细是否出样件
  postStockoutSetstockoutdetailByStockOutDetailIdCompleteUrl: "/api/app/stock-out/set-stock-out-detail/{stockOutDetailId}", //post 设置出货单明细是否出样件
  postStockoutSetwaveplantimeByStockOutId: "/api/app/stock-out/set-wave-plan-time", //post 设置备料计划时间
  postStockoutSetwaveplantimeByStockOutIdCompleteUrl: "/api/app/stock-out/set-wave-plan-time/{stockOutId}", //post 设置备料计划时间
  postStockoutStockoutconfirm: "/api/app/stock-out/stock-out-confirm", //post 出库
  postStockoutExportpick: "/api/app/stock-out/export-pick", //post 拣货信息导出
  postStockoutExportpickrecord: "/api/app/stock-out/export-pick-record", //post 拣货记录导出
  getStockoutPickboxpages: "/api/app/stock-out/pick-box-pages", //get 获取拣货箱号分页记录
  getStockoutPickpages: "/api/app/stock-out/pick-pages", //get 获取拣货单分页记录
  getStockoutPickrecordpages: "/api/app/stock-out/pick-record-pages", //get 获取拣货记录分页记录
  deleteStockoutAssignboxstock: "/api/app/stock-out/assign-box-stock", //delete 取消指定的箱号信息
  getStockoutAssignboxstockpages: "/api/app/stock-out/assign-box-stock-pages", //get 获取指定箱号库存信息
  getStockoutPackinginformation: "/api/app/stock-out/packing-information", //get 获取尾箱信息
  postStockoutSetwaveboxs: "/api/app/stock-out/set-wave-boxs", //post 出货单明细指定箱号
  deleteStockoutCodeitemByCodeItemId: "/api/app/stock-out/code-item", //delete 删除库存呼出原因
  deleteStockoutCodeitemByCodeItemIdCompleteUrl: "/api/app/stock-out/code-item/{codeItemId}", //delete 删除库存呼出原因
  postStockoutExportstockouthistory: "/api/app/stock-out/export-stock-out-history", //post 库存呼出记录信息导出
  getStockoutCodeitempages: "/api/app/stock-out/code-item-pages", //get 获取库存呼出原因
  postStockoutExportcodeitems: "/api/app/stock-out/export-code-items", //post 导出库存呼出原因
  getStockoutIsolatecodeitempages: "/api/app/stock-out/isolate-code-item-pages", //get 隔离单原因
  getStockoutStockouthistorypages: "/api/app/stock-out/stock-out-history-pages", //get 获取库存呼出记录
  postStockoutSetcodeitem: "/api/app/stock-out/set-code-item", //post 设置库存呼出原因
  postStockoutDisposestaggorderByWorkbenchId: "/api/app/stock-out/dispose-stagg-order", //post 释放工作台订单
  postStockoutDisposestaggorderByWorkbenchIdCompleteUrl: "/api/app/stock-out/dispose-stagg-order/{workbenchId}", //post 释放工作台订单
  postStockoutManualfinishorderByStockOutId: "/api/app/stock-out/manual-finish-order", //post 强制完成出库单
  postStockoutManualfinishorderByStockOutIdCompleteUrl: "/api/app/stock-out/manual-finish-order/{stockOutId}", //post 强制完成出库单
  getStockoutStockoutandpickinfo: "/api/app/stock-out/stock-out-and-pick-info", //get 出库时效
  postStockoutExportstockoutandpickinfo: "/api/app/stock-out/export-stock-out-and-pick-info", //post 出库时效导出
};

// 仓库管理
export const Warehouse = {
  getWarehouseSupplierpages: "/api/app/warehouse/supplier-pages", //get 获取供应商分页数据信息
  getWarehouseSupplierselect: "/api/app/warehouse/supplier-select", //get 获取供应商下拉框数据
  getWarehouseOrgselect: "/api/app/warehouse/org-select", //get 获取公司下拉框数据
  getWarehouseSupplierbyidBySupplierId: "/api/app/warehouse/supplier-by-id", //get 根据ID获取单条数据
  getWarehouseSupplierbyidBySupplierIdCompleteUrl: "/api/app/warehouse/supplier-by-id/{SupplierId}", //get 根据ID获取单条数据
  getWarehouseDepthwayselect: "/api/app/warehouse/depth-way-select", //get 获取多深度通道下拉框数据
  getWarehouseDepthwaypages: "/api/app/warehouse/depth-way-pages", //get 获取多深度通道分页信息
  postWarehouseDepthway: "/api/app/warehouse/depth-way", //post 创建多深度通道信息
  putWarehouseDepthwayByDepthWayId: "/api/app/warehouse/depth-way", //put 编辑多深度通道信息
  putWarehouseDepthwayByDepthWayIdCompleteUrl: "/api/app/warehouse/depth-way/{DepthWayId}", //put 编辑多深度通道信息
  deleteWarehouseDepthwayByDepthWayId: "/api/app/warehouse/depth-way", //delete 删除多深度通道信息
  deleteWarehouseDepthwayByDepthWayIdCompleteUrl: "/api/app/warehouse/depth-way/{DepthWayId}", //delete 删除多深度通道信息
  getWarehouseRowdepthwaybyidByDepthWayId: "/api/app/warehouse/row-depth-way-by-id", //get 根据ID获取单条数据多深度通道信息
  getWarehouseRowdepthwaybyidByDepthWayIdCompleteUrl: "/api/app/warehouse/row-depth-way-by-id/{DepthWayId}", //get 根据ID获取单条数据多深度通道信息
  postWarehouseExportdepthway: "/api/app/warehouse/export-depth-way", //post 多深度通道信息导出
  getWarehouseRoadwayselect: "/api/app/warehouse/road-way-select", //get 获取通道/货架下拉框数据
  getWarehouseRoadwaypages: "/api/app/warehouse/road-way-pages", //get 获取巷道分页信息
  postWarehouseRoadway: "/api/app/warehouse/road-way", //post 创建巷道信息
  putWarehouseRoadwayByRoadWayId: "/api/app/warehouse/road-way", //put 编辑巷道信息
  putWarehouseRoadwayByRoadWayIdCompleteUrl: "/api/app/warehouse/road-way/{roadWayId}", //put 编辑巷道信息
  deleteWarehouseRoadwayByRoadWayId: "/api/app/warehouse/road-way", //delete 删除巷道信息
  deleteWarehouseRoadwayByRoadWayIdCompleteUrl: "/api/app/warehouse/road-way/{roadWayId}", //delete 删除巷道信息
  getWarehouseRowwaybyidByRoadWayId: "/api/app/warehouse/row-way-by-id", //get 根据ID获取单条数据通道信息
  getWarehouseRowwaybyidByRoadWayIdCompleteUrl: "/api/app/warehouse/row-way-by-id/{roadWayId}", //get 根据ID获取单条数据通道信息
  postWarehouseExportroadway: "/api/app/warehouse/export-road-way", //post 巷道信息导出
  postWarehouseStaging: "/api/app/warehouse/staging", //post 创建工作台
  postWarehouseExportstaging: "/api/app/warehouse/export-staging", //post 工作台信息导出
  deleteWarehouseStagingByStagingId: "/api/app/warehouse/staging", //delete 删除工作台信息
  deleteWarehouseStagingByStagingIdCompleteUrl: "/api/app/warehouse/staging/{StagingId}", //delete 删除工作台信息
  putWarehouseStagingByStagingId: "/api/app/warehouse/staging", //put 编辑工作台信息
  putWarehouseStagingByStagingIdCompleteUrl: "/api/app/warehouse/staging/{StagingId}", //put 编辑工作台信息
  getWarehouseStagingpages: "/api/app/warehouse/staging-pages", //get 获取工作台分页数据信息
  getWarehouseStagingselect: "/api/app/warehouse/staging-select", //get 获取工作台下拉框数据
  getWarehouseStaginglist: "/api/app/warehouse/staging-list", //get 获取工作台下拉框数据
  getWarehouseStagingbyidByStagingId: "/api/app/warehouse/staging-by-id", //get 根据ID获取单条数据
  getWarehouseStagingbyidByStagingIdCompleteUrl: "/api/app/warehouse/staging-by-id/{StagingId}", //get 根据ID获取单条数据
  postWarehouseUserbindwork: "/api/app/warehouse/user-bind-work", //post 用户绑定工作台
  postWarehouseWorkscheduleplan: "/api/app/warehouse/work-schedule-plan", //post 
  getWarehouseWorkscheduleplan: "/api/app/warehouse/work-schedule-plan", //get 获取排班计划数据信息
  postWarehouseDeletworkscheduleplanByWorkSchedulePlanId: "/api/app/warehouse/delet-work-schedule-plan", //post 删除排班计划
  postWarehouseDeletworkscheduleplanByWorkSchedulePlanIdCompleteUrl: "/api/app/warehouse/delet-work-schedule-plan/{workSchedulePlanId}", //post 删除排班计划
  getWarehouseWmsversionlist: "/api/app/warehouse/wms-version-list", //get 获取系统版本
  postWarehouseInitregionandarea: "/api/app/warehouse/init-region-and-area", //post 库区区域初始化
  postWarehouseInitcargolocationback: "/api/app/warehouse/init-cargo-location-back", //post 巷道初始化
  postWarehouseInitblqcargolocation: "/api/app/warehouse/init-blq-cargo-location", //post 支架库位初始化
  postWarehouseInitcontainer: "/api/app/warehouse/init-container", //post 托盘初始化
  postWarehouseInitcontainerdefault: "/api/app/warehouse/init-container-default", //post 
  postWarehouseFindisolationinfopC: "/api/app/warehouse/find-isolation-info-pC", //post PC获取隔离单信息
  getWarehouseIsolationstatus: "/api/app/warehouse/isolation-status", //get 隔离单状态下拉框
  postWarehouseFindisolationdtlpC: "/api/app/warehouse/find-isolation-dtl-pC", //post 隔离单查看
  postWarehouseFindisolationpackinginfopC: "/api/app/warehouse/find-isolation-packing-info-pC", //post 手动制单+查询
  postWarehouseIsolationcreate: "/api/app/warehouse/isolation-create", //post 界面创建隔离通知单
  postWarehouseCancelisolation: "/api/app/warehouse/cancel-isolation", //post 取消隔离单
  getWarehouseLatestpdaversion: "/api/app/warehouse/latest-pda-version", //get 获取pda最新版本号
  getWarehouseCreateauto: "/api/app/warehouse/create-auto", //get 自动创建巷道信息
  getWarehouseCreateautotest: "/api/app/warehouse/create-auto-test", //get 测试
  postWarehouseContainerlst: "/api/app/warehouse/container-lst", //post 批量插入400LX
  postWarehouse: "/api/app/warehouse/warehouse", //post 创建仓库
  postWarehouseExportwarehouse: "/api/app/warehouse/export-warehouse", //post 仓库信息导出
  deleteWarehouseByWarehouseId: "/api/app/warehouse/warehouse", //delete 删除仓库信息
  deleteWarehouseByWarehouseIdCompleteUrl: "/api/app/warehouse/warehouse/{warehouseId}", //delete 删除仓库信息
  putWarehouseByWarehouseId: "/api/app/warehouse/warehouse", //put 编辑仓库信息
  putWarehouseByWarehouseIdCompleteUrl: "/api/app/warehouse/warehouse/{WarehouseId}", //put 编辑仓库信息
  getWarehouseWarehousepages: "/api/app/warehouse/warehouse-pages", //get 获取仓库分页数据信息
  getWarehouseWarehouseselect: "/api/app/warehouse/warehouse-select", //get 获取仓库下拉框数据
  getWarehouseWarehousebyidByWarehouseId: "/api/app/warehouse/warehouse-by-id", //get 根据ID获取单条数据
  getWarehouseWarehousebyidByWarehouseIdCompleteUrl: "/api/app/warehouse/warehouse-by-id/{warehouseId}", //get 根据ID获取单条数据
  postWarehouseExportregion: "/api/app/warehouse/export-region", //post 区域信息导出
  getWarehouseRegionselect: "/api/app/warehouse/region-select", //get 获取区域下拉框数据Id是Value
  getWarehouseRegionselectbycode: "/api/app/warehouse/region-select-by-code", //get 获取区域下拉框数据CODE是value
  getWarehouseRegionselectforpda: "/api/app/warehouse/region-select-for-pda", //get pda获取区域下拉框数据
  getWarehouseRegionenumselect: "/api/app/warehouse/region-enum-select", //get 获取 区域属性下拉框数据
  getWarehouseRegionpages: "/api/app/warehouse/region-pages", //get 获取区域分页数据信息
  postWarehouseRegion: "/api/app/warehouse/region", //post 创建区域
  putWarehouseRegionByRegionId: "/api/app/warehouse/region", //put 编辑区域信息
  putWarehouseRegionByRegionIdCompleteUrl: "/api/app/warehouse/region/{regionId}", //put 编辑区域信息
  deleteWarehouseRegionByRegionId: "/api/app/warehouse/region", //delete 删除区域信息
  deleteWarehouseRegionByRegionIdCompleteUrl: "/api/app/warehouse/region/{regionId}", //delete 删除区域信息
  getWarehouseRegionbyidByRegionId: "/api/app/warehouse/region-by-id", //get 根据ID获取单条数据
  getWarehouseRegionbyidByRegionIdCompleteUrl: "/api/app/warehouse/region-by-id/{RegionId}", //get 根据ID获取单条数据
  postWarehouseExportarea: "/api/app/warehouse/export-area", //post 库区信息导出
  getWarehouseAreaselect: "/api/app/warehouse/area-select", //get 获取库区下拉框数据
  getWarehouseAreapages: "/api/app/warehouse/area-pages", //get 获取库区分页数据
  postWarehouseArea: "/api/app/warehouse/area", //post 创建库区
  putWarehouseAreaByAreaId: "/api/app/warehouse/area", //put 编辑库区
  putWarehouseAreaByAreaIdCompleteUrl: "/api/app/warehouse/area/{areaId}", //put 编辑库区
  deleteWarehouseAreaByAreaId: "/api/app/warehouse/area", //delete 删除库区
  deleteWarehouseAreaByAreaIdCompleteUrl: "/api/app/warehouse/area/{areaId}", //delete 删除库区
  getWarehouseAreabyidByAreaId: "/api/app/warehouse/area-by-id", //get 根据ID获取单条数据
  getWarehouseAreabyidByAreaIdCompleteUrl: "/api/app/warehouse/area-by-id/{AreaId}", //get 根据ID获取单条数据
  getWarehouseLocationtypeselect: "/api/app/warehouse/location-type-select", //get 获取库位类型下拉框数据
  getWarehouseCargolocationpages: "/api/app/warehouse/cargo-location-pages", //get 获取库位分页数据
  postWarehouseCargolocation: "/api/app/warehouse/cargo-location", //post 创建库位
  putWarehouseCargolocationByCargoLocationId: "/api/app/warehouse/cargo-location", //put 编辑库位
  putWarehouseCargolocationByCargoLocationIdCompleteUrl: "/api/app/warehouse/cargo-location/{cargoLocationId}", //put 编辑库位
  deleteWarehouseCargolocationByCargoLocationId: "/api/app/warehouse/cargo-location", //delete 删除库位
  deleteWarehouseCargolocationByCargoLocationIdCompleteUrl: "/api/app/warehouse/cargo-location/{cargoLocationId}", //delete 删除库位
  postWarehouseBatchupdatecargolocationlist: "/api/app/warehouse/batch-update-cargo-location-list", //post 批量设置库位
  postWarehouseExportcargolocation: "/api/app/warehouse/export-cargo-location", //post 库位信息导出
  getWarehouseCargolocationselect: "/api/app/warehouse/cargo-location-select", //get 获取库位下拉框数据
  getWarehouseCargolocationbyidByCargoLocationId: "/api/app/warehouse/cargo-location-by-id", //get 根据ID获取单条数据
  getWarehouseCargolocationbyidByCargoLocationIdCompleteUrl: "/api/app/warehouse/cargo-location-by-id/{CargoLocationId}", //get 根据ID获取单条数据
  getWarehouseRoadwaylistforview: "/api/app/warehouse/road-way-list-for-view", //get 获取巷道列表
  getWarehouseCargolistforviewByRoadWayId: "/api/app/warehouse/cargo-list-for-view", //get 获取巷道关联库位
  getWarehouseCargolistforviewByRoadWayIdCompleteUrl: "/api/app/warehouse/cargo-list-for-view/{roadWayId}", //get 获取巷道关联库位
  postWarehouseContainertype: "/api/app/warehouse/container-type", //post 创建容器类型
  postWarehouseExportcontainertype: "/api/app/warehouse/export-container-type", //post 容器类型信息导出
  deleteWarehouseContainertypeByContainerTypeId: "/api/app/warehouse/container-type", //delete 删除容器类型信息
  deleteWarehouseContainertypeByContainerTypeIdCompleteUrl: "/api/app/warehouse/container-type/{ContainerTypeId}", //delete 删除容器类型信息
  putWarehouseContainertypeByContainerTypeId: "/api/app/warehouse/container-type", //put 编辑容器类型信息
  putWarehouseContainertypeByContainerTypeIdCompleteUrl: "/api/app/warehouse/container-type/{ContainerTypeId}", //put 编辑容器类型信息
  getWarehouseContainertypepages: "/api/app/warehouse/container-type-pages", //get 获取容器类型分页数据信息
  getWarehouseContainertypeselect: "/api/app/warehouse/container-type-select", //get 获取容器类型下拉框数据
  getWarehouseContainertypebyidByContainerTypeId: "/api/app/warehouse/container-type-by-id", //get 根据ID获取单条数据
  getWarehouseContainertypebyidByContainerTypeIdCompleteUrl: "/api/app/warehouse/container-type-by-id/{ContainerTypeId}", //get 根据ID获取单条数据
  postWarehouseExportcontainer: "/api/app/warehouse/export-container", //post 容器信息导出
  getWarehouseContainershapetypeselect: "/api/app/warehouse/container-shape-type-select", //get 获取容器属性 枚举下拉框数据
  getWarehouseUsagestatusselect: "/api/app/warehouse/usage-status-select", //get 使用状态下拉
  getWarehouseLoadstatusselect: "/api/app/warehouse/load-status-select", //get 获取承载状态下拉框数据
  getWarehouseContainerpages: "/api/app/warehouse/container-pages", //get 获取容器分页信息数据
  postWarehouseContainer: "/api/app/warehouse/container", //post 创建容器信息
  putWarehouseContainerByContainerId: "/api/app/warehouse/container", //put 编辑容器信息
  putWarehouseContainerByContainerIdCompleteUrl: "/api/app/warehouse/container/{containerId}", //put 编辑容器信息
  deleteWarehouseContainerByContainerId: "/api/app/warehouse/container", //delete 删除容器信息
  deleteWarehouseContainerByContainerIdCompleteUrl: "/api/app/warehouse/container/{containerId}", //delete 删除容器信息
  getWarehouseContainerbyidByContainerId: "/api/app/warehouse/container-by-id", //get 根据ID获取单条数据
  getWarehouseContainerbyidByContainerIdCompleteUrl: "/api/app/warehouse/container-by-id/{ContainerId}", //get 根据ID获取单条数据
  postWarehouseGrade: "/api/app/warehouse/grade", //post 创建等级
  postWarehouseExportgrade: "/api/app/warehouse/export-grade", //post 等级信息导出
  deleteWarehouseGradeByGradeId: "/api/app/warehouse/grade", //delete 删除等级信息
  deleteWarehouseGradeByGradeIdCompleteUrl: "/api/app/warehouse/grade/{gradeId}", //delete 删除等级信息
  putWarehouseGradeByGradeId: "/api/app/warehouse/grade", //put 编辑等级信息
  putWarehouseGradeByGradeIdCompleteUrl: "/api/app/warehouse/grade/{GradeId}", //put 编辑等级信息
  getWarehouseGradepages: "/api/app/warehouse/grade-pages", //get 获取等级分页数据信息
  getWarehouseGradeselect: "/api/app/warehouse/grade-select", //get 获取等级下拉框数据
  getWarehouseGradebyidByGradeId: "/api/app/warehouse/grade-by-id", //get 根据ID获取单条数据
  getWarehouseGradebyidByGradeIdCompleteUrl: "/api/app/warehouse/grade-by-id/{GradeId}", //get 根据ID获取单条数据
  postWarehousePoint: "/api/app/warehouse/point", //post 创建出入库点位
  postWarehouseExportpoint: "/api/app/warehouse/export-point", //post 出入库点位信息导出
  deleteWarehousePointByPointId: "/api/app/warehouse/point", //delete 删除出入库点位信息
  deleteWarehousePointByPointIdCompleteUrl: "/api/app/warehouse/point/{PointId}", //delete 删除出入库点位信息
  putWarehousePointByPointId: "/api/app/warehouse/point", //put 编辑出入库点位信息
  putWarehousePointByPointIdCompleteUrl: "/api/app/warehouse/point/{PointId}", //put 编辑出入库点位信息
  getWarehousePointpages: "/api/app/warehouse/point-pages", //get 获取出入库点位分页数据信息
  getWarehousePointselect: "/api/app/warehouse/point-select", //get 获取出入库点位下拉框数据
  getWarehousePointtypeselect: "/api/app/warehouse/point-type-select", //get 获取点位类型下拉框数据
  getWarehousePointbyidByPointId: "/api/app/warehouse/point-by-id", //get 根据ID获取单条数据
  getWarehousePointbyidByPointIdCompleteUrl: "/api/app/warehouse/point-by-id/{PointId}", //get 根据ID获取单条数据
  postWarehouseShipper: "/api/app/warehouse/shipper", //post 创建客户
  postWarehouseExportshipper: "/api/app/warehouse/export-shipper", //post 客户信息导出
  deleteWarehouseShipperByShipperId: "/api/app/warehouse/shipper", //delete 删除客户信息
  deleteWarehouseShipperByShipperIdCompleteUrl: "/api/app/warehouse/shipper/{ShipperId}", //delete 删除客户信息
  putWarehouseShipperByShipperId: "/api/app/warehouse/shipper", //put 编辑客户信息
  putWarehouseShipperByShipperIdCompleteUrl: "/api/app/warehouse/shipper/{shipperId}", //put 编辑客户信息
  getWarehouseShipperpages: "/api/app/warehouse/shipper-pages", //get 获取客户分页数据信息
  getWarehouseShipperselect: "/api/app/warehouse/shipper-select", //get 获取客户下拉框数据
  getWarehouseStagingtypeselect: "/api/app/warehouse/staging-type-select", //get 获取工作台下拉框数据
  getWarehouseShippertypeselect: "/api/app/warehouse/shipper-type-select", //get 获取客户下拉框数据
  getWarehouseCreateuserselect: "/api/app/warehouse/create-user-select", //get 获取创建人下拉框数据
  getWarehouseShipperbyidByShipperId: "/api/app/warehouse/shipper-by-id", //get 根据ID获取单条数据
  getWarehouseShipperbyidByShipperIdCompleteUrl: "/api/app/warehouse/shipper-by-id/{ShipperId}", //get 根据ID获取单条数据
  postWarehouseSupplier: "/api/app/warehouse/supplier", //post 创建供应商
  postWarehouseExportsupplier: "/api/app/warehouse/export-supplier", //post 供应商信息导出
  deleteWarehouseSupplierBySupplierId: "/api/app/warehouse/supplier", //delete 删除供应商信息
  deleteWarehouseSupplierBySupplierIdCompleteUrl: "/api/app/warehouse/supplier/{SupplierId}", //delete 删除供应商信息
  putWarehouseSupplierBySupplierId: "/api/app/warehouse/supplier", //put 编辑供应商信息
  putWarehouseSupplierBySupplierIdCompleteUrl: "/api/app/warehouse/supplier/{SupplierId}", //put 编辑供应商信息
};

// 拣选屏接口
export const PickScreen = {
  getPickscreenOnlinestagginfodto: "/api/app/pick-screen/online-stagg-info-dto", //get 获取用户工作台信息(每5秒拉一次)
  getPickscreenOnliestaging: "/api/app/pick-screen/onlie-staging", //get 
  getPickscreenPickallocationtask: "/api/app/pick-screen/pick-allocation-task", //get 获取波次拣选任务
  getPickscreenContainertaskprocessing: "/api/app/pick-screen/container-task-processing", //get 获取容器任务进度
  getPickscreenPickcargolocationinput: "/api/app/pick-screen/pick-cargo-location-input", //get 获取拣选
  getPickscreenNotpickcargolocation: "/api/app/pick-screen/not-pick-cargo-location", //get 获取未拣选任务行汇总
  getPickscreenPickserialnumberpages: "/api/app/pick-screen/pick-serial-number-pages", //get 分页获取波次拣选序列号
  getPickscreenPickcargolocationinfo: "/api/app/pick-screen/pick-cargo-location-info", //get 获取分播格口信息
  postPickscreenScanserialnumber: "/api/app/pick-screen/scan-serial-number", //post 
  postPickscreenOutofstockpick: "/api/app/pick-screen/out-of-stock-pick", //post 缺货提交
  postPickscreenRawmaterialpickinfo: "/api/app/pick-screen/raw-material-pick-info", //post 原料拣选单获取
  postPickscreenCheckcontainerstatus: "/api/app/pick-screen/check-container-status", //post 判断托盘是否有货
  postPickscreenRawmaterialpick: "/api/app/pick-screen/raw-material-pick", //post 3楼原材料出库拣选
  postPickscreenFinishpick: "/api/app/pick-screen/finish-pick", //post 完成拣选
  postPickscreenFinishpickmanual: "/api/app/pick-screen/finish-pick-manual", //post 
  postPickscreenRawmatbacklTK: "/api/app/pick-screen/raw-mat-back-lTK", //post 完成拣选后回立体库
  postPickscreenFindisolationinfo: "/api/app/pick-screen/find-isolation-info", //post 获取隔离单信息
  postPickscreenFindisolationouttype: "/api/app/pick-screen/find-isolation-out-type", //post 隔离出库类型下拉框
  postPickscreenIsolatedout: "/api/app/pick-screen/isolated-out", //post 隔离物料出库
  postPickscreenStockcontainerdetails: "/api/app/pick-screen/stock-container-details", //post 
  postPickscreenFindisolationqualityinfo: "/api/app/pick-screen/find-isolation-quality-info", //post 隔离结果录入获取信息
  postPickscreenFindreasoncode: "/api/app/pick-screen/find-reason-code", //post 
  postPickscreenConfirmqualityresult: "/api/app/pick-screen/confirm-quality-result", //post 质检结果录入
};

// 容器
export const ContainerStockInProessor = {
  postContainerstockinproessorExecutestockin: "/api/app/container-stock-in-proessor/execute-stock-in", //post 
};

// 成品入库
export const FinishProductStockInProessor = {
  postFinishproductstockinproessorExecutestockin: "/api/app/finish-product-stock-in-proessor/execute-stock-in", //post 
};

// 
export const FixtureStockInProessor = {
  postFixturestockinproessorExecutestockin: "/api/app/fixture-stock-in-proessor/execute-stock-in", //post 
};

// 原材料
export const RawMaterialStockInProcessor = {
  postRawmaterialstockinprocessorScanmaterialcode: "/api/app/raw-material-stock-in-processor/scan-material-code", //post 扫描物料编码
  postRawmaterialstockinprocessorIscontacneruse: "/api/app/raw-material-stock-in-processor/is-contacner-use", //post 能否使用
  postRawmaterialstockinprocessorSubmit: "/api/app/raw-material-stock-in-processor/submit", //post 提交组盘记录
  postRawmaterialstockinprocessorExecutestockin: "/api/app/raw-material-stock-in-processor/execute-stock-in", //post 
};

// 
export const SundriesStockInProessor = {
  postSundriesstockinproessorExecutestockin: "/api/app/sundries-stock-in-proessor/execute-stock-in", //post 
};

