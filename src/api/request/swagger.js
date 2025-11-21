import { get } from 'jquery'

const baseURL = ''

export const identity = {
  login: `${baseURL}/api/app/identity/login`,
  updatepassword: `${baseURL}/api/app/identity-user/update-pass-word`,
  resetpassword: `${baseURL}/api/app/identity-user/reset-password`,
  downloadAppAddress: `${baseURL}/api/app/identity/down-load-app-address`
}
export const accountUser = {
  currentUser: `${baseURL}/api/app/account-user/current-user`
}
export const Tenant = {
  all: `${baseURL}/api/app/tenant/all`, // 仓库主档
  tenant: `${baseURL}/api/app/tenant` // 编辑
}
export const AutoReport = {
  all: `${baseURL}/api/app/tenant/all`, // 仓库主档
  tenant: `${baseURL}/api/app/tenant` // 编辑
}
export const ILT = {
  ILTPage: `${baseURL}/api/app/i-lT/i-lTPages`,
  ILTRecordPage: `${baseURL}/api/app/i-lT/check-record-pages`
}
export const pickscreen = {
  onlinestagginfodto: `${baseURL}/api/app/pick-screen/online-stagg-info-dto`,
  pickallocationtask: `${baseURL}/api/app/pick-screen/pick-allocation-task`,
  pickserialnumberpages: `${baseURL}/api/app/pick-screen/pick-serial-number-pages`,
  pickcargolocationinfo: `${baseURL}/api/app/pick-screen/pick-cargo-location-info`,
  scanserialnumber: `${baseURL}/api/app/pick-screen/scan-serial-number`,
  containertaskprocessing: `${baseURL}/api/app/pick-screen/container-task-processing`,
  pickcargolocationinput: `${baseURL}/api/app/pick-screen/pick-cargo-location-input`,
  outofstockpick: `${baseURL}/api/app/pick-screen/out-of-stock-pick`,
  userbindwork: `${baseURL}/api/app/warehouse/user-bind-work`,
  notpickcargolocation: `${baseURL}/api/app/pick-screen/not-pick-cargo-location`
}
export const AGV = {
  AGVTaskPages: `${baseURL}/api/app/a-gV/a-gVTask-pages`
}

export const Stacker = {
  GetWmstasklist: `${baseURL}/api/open/stacker/Get-wmstasklist`
}

export const Task = {
  taskPageList: `${baseURL}/api/app/task/task-page-list`
}
export const pickingScreen = {
  userbindwork: `${baseURL}/api/app/warehouse/user-bind-work`
}
export const warehouse = {
  // 广汽商贸
  roadwaylistforview: `${baseURL}/api/app/warehouse/road-way-list-for-view`,
  cargolistforview: `${baseURL}/api/app/warehouse/cargo-list-for-view`,
  warehousePages: `${baseURL}/api/app/warehouse/warehouse-pages`, // 获取仓库分页数据信息
  warehouse: `${baseURL}/api/app/warehouse/warehouse`, // 创建、删除、新增仓库
  exportWarehouse: `${baseURL}/api/app/warehouse/export-warehouse`, // 仓库信息导出
  warehouseSelect: `${baseURL}/api/app/warehouse/warehouse-select`, // 获取仓库下拉框
  warehouseById: `${baseURL}/api/app/warehouse/warehouse-by-id`, // 根据ID获取单条数据
  containerTypePages: `${baseURL}/api/app/warehouse/container-type-pages`, // 获取容器类型分页数据信息
  containerType: `${baseURL}/api/app/warehouse/container-type`, // 创建
  exportContainerType: `${baseURL}/api/app/warehouse/export-container-type`, // 容器类型信息导出
  containerTypeById: `${baseURL}/api/app/warehouse/container-type-by-id`, // 根据ID获取单条数据容器类型
  containerById: `${baseURL}/api/app/warehouse/container-by-id`, // 根据ID获取单条数据容器
  gradePages: `${baseURL}/api/app/warehouse/grade-pages`, // 获取等级分页数据
  grade: `${baseURL}/api/app/warehouse/grade`, // 创建等级
  exportGrade: `${baseURL}/api/app/warehouse/export-grade`, // 等级信息导出
  gradeById: `${baseURL}/api/app/warehouse/grade-by-id`, // 根据ID获取单条数据等级
  exportRegion: `${baseURL}/api/app/warehouse/export-region`, // 区域信息导出
  regionById: `${baseURL}/api/app/warehouse/region-by-id`, // 区域信息导出
  regionEnumSelect: `${baseURL}/api/app/warehouse/region-enum-select`, // 获取区域属性下拉框
  // regionSelect: `${baseURL}/api/app/warehouse/region-select`,//获取区域下拉数据
  regionPages: `${baseURL}/api/app/warehouse/region-pages`, // 获取区域分页信息
  region: `${baseURL}/api/app/warehouse/region`, // 创建区域
  areaPages: `${baseURL}/api/app/warehouse/area-pages`, // 获取库区分页信息
  exportArea: `${baseURL}/api/app/warehouse/export-area`, // 库区导出
  areaSelect: `${baseURL}/api/app/warehouse/area-select`, // 库区下拉框
  areaById: `${baseURL}/api/app/warehouse/area-by-id`, // 根据id获取当前行库区
  area: `${baseURL}/api/app/warehouse/area`, // 创建库区信息
  locationTypeSelect: `${baseURL}/api/app/warehouse/location-type-select`, // 获取库位类型下拉
  cargoLocationSelect: `${baseURL}/api/app/warehouse/cargo-location-select`, // 获取库位下拉
  cargoLocationById: `${baseURL}/api/app/warehouse/cargo-location-by-id`, // 根据id获取库位
  cargoLocation: `${baseURL}/api/app/warehouse/cargo-location`, // 创建库位
  cargoLocationPages: `${baseURL}/api/app/warehouse/cargo-location-pages`, // 获取库位分页
  exportCargoLocation: `${baseURL}/api/app/warehouse/export-cargo-location`, // 库位导出
  gradeSelect: `${baseURL}/api/app/warehouse/grade-select`, // 获取等级下拉框
  pointPages: `${baseURL}/api/app/warehouse/point-pages`, // 获取出入库点位信息分页
  pointSelect: `${baseURL}/api/app/warehouse/point-select`, // 出入库点位下拉框
  pointById: `${baseURL}/api/app/warehouse/point-by-id`, // 根据id获取出入库点
  point: `${baseURL}/api/app/warehouse/point`, // 创建
  pointTypeSelect: `${baseURL}/api/app/warehouse/point-type-select`, // 点位类型下拉
  exportPoint: `${baseURL}/api/app/warehouse/export-point`, // 工作台导出
  supplierPages: `${baseURL}/api/app/warehouse/supplier-pages`, // 供应商分页
  exportSupplier: `${baseURL}/api/app/warehouse/export-supplier`, // 供应商导出
  supplier: `${baseURL}/api/app/warehouse/supplier`, // 供应商创建
  orgSelect: `${baseURL}/api/app/warehouse/org-select`, // 获取公司下拉框
  supplierById: `${baseURL}/api/app/warehouse/supplier-by-id`, // 根据id获取供应商
  shipperPages: `${baseURL}/api/app/warehouse/shipper-pages`, // 出货方分页
  shipperById: `${baseURL}/api/app/warehouse/shipper-by-id`, // 根据id获取出货方
  shipper: `${baseURL}/api/app/warehouse/shipper`, // 创建出货方
  containerPages: `${baseURL}/api/app/warehouse/container-pages`, // 容器主档分页
  usageStatusSelect: `${baseURL}/api/app/warehouse/usage-status-select`, // 容器使用状态下拉
  loadStatusSelect: `${baseURL}/api/app/warehouse/load-status-select`, // 容器承载状态下拉
  containerShapeTypeSelect: `${baseURL}/api/app/warehouse/container-shape-type-select`, // 容器属性下拉
  containerTypeSelect: `${baseURL}/api/app/warehouse/container-type-select`, // 容器类型下拉
  container: `${baseURL}/api/app/warehouse/container`, // 创建容器
  exportContainer: `${baseURL}/api/app/warehouse/export-container`, // 容器信息导出
  exportRoadWay: `${baseURL}/api/app/warehouse/export-road-way`, // 通道信息导出
  roadWaySelect: `${baseURL}/api/app/warehouse/road-way-select`, // 通道下拉
  rowWayById: `${baseURL}/api/app/warehouse/row-way-by-id`, // 根据id获取通道
  roadWay: `${baseURL}/api/app/warehouse/road-way`, // 创建通道
  exportStaging: `${baseURL}/api/app/warehouse/export-staging`, // 工作台信息导出
  stagingTypeSelect: `${baseURL}/api/app/warehouse/staging-type-select`, // 工作台类型下拉
  stagingPages: `${baseURL}/api/app/warehouse/staging-pages`, // 获取工作台分页数据
  stagingSelect: `${baseURL}/api/app/warehouse/staging-select`, // 获取工作台数据
  stagingById: `${baseURL}/api/app/warehouse/staging-by-id`, // 根据id获取工作台信息
  staging: `${baseURL}/api/app/warehouse/staging`, // 创建工作台信息
  roadWayPages: `${baseURL}/api/app/warehouse/road-way-pages`, // 通道分页
  exportShipper: `${baseURL}/api/app/warehouse/export-shipper`, // 出货方信息导出
  cargoTerminalPages: `${baseURL}/api/app/warehouse/cargo-terminal-pages`, // 获取码头分页数据
  cargoTerminal: `${baseURL}/api/app/warehouse/cargo-terminal`, // 创建码头
  regionSelect: `${baseURL}/api/app/warehouse/region-select`, // 区域下拉
  exportCargoTerminal: `${baseURL}/api/app/warehouse/export-cargo-terminal`, // 码头导出
  cargoTerminalById: `${baseURL}/api/app/warehouse/cargo-terminal-by-id`, // 通过ID获取码头信息


  isolationInfo: `${baseURL}/api/app/warehouse/find-isolation-info-pC`,//PC获取隔离单信息
  isolationStatus: `${baseURL}/api/app/warehouse/isolation-status`,//隔离单状态下拉框
  isolationDtl: `${baseURL}/api/app/warehouse/find-isolation-dtl-pC`,//隔离单详情
  isolationPacking: `${baseURL}/api/app/warehouse/find-isolation-packing-info-pC`,//手动制单查询
  isolationCreate: `${baseURL}/api/app/warehouse/isolation-create`,//界面创建隔离通知单
  isolationCancel: `${baseURL}/api/app/warehouse/cancel-isolation`,//取消隔离通知单
}

export const Point = {
  pointPages: `${baseURL}/api/app/point/point-pages`,
  point: `${baseURL}/api/app/point/point`,
  stationPages: `${baseURL}/api/app/point/station-pages`,
  station: `${baseURL}/api/app/point/station`,
  pointConfigPages: `${baseURL}/api/app/point/point-config-pages`,
  pointConfig: `${baseURL}/api/app/point/point-config`,
  regionSelect: `${baseURL}/api/app/point/region-select`,
  stationSelect: `${baseURL}/api/app/point/station-select`,
  pointMap: `${baseURL}/api/app/point/point-map`, // 地图
  changeEnable: `${baseURL}/api/app/point/change-enable` // 启用、关闭
}
export const StockOut = {
  wavepages: `${baseURL}/api/app/stock-out/wave-pages`,
  waveoutboundinfopages: `${baseURL}/api/app/stock-out/wave-out-bound-info-pages`,
  wavepicktaskpages: `${baseURL}/api/app/stock-out/wave-pick-task-pages`,
  wavepickallocationpages: `${baseURL}/api/app/stock-out/wave-pick-allocation-pages`,
  bundleRecordPages: `${baseURL}/api/app/stock-out/bundle-record-pages`,
  outOrderPages: `${baseURL}/api/app/stock-out/stock-out-pages`, // 分页数据 - 出库订单
  outOrderExport: `${baseURL}/api/app/stock-out/export-stock`, // 导出 - 出库订单
  outOrderDetailPages: `${baseURL}/api/app/stock-out/stock-out-detail-pages`, // 分页数据（详情） - 出库订单
  pickTaskExport: `${baseURL}/api/app/stock-out/export-wave-pick-task`, // 导出 - 拣货任务管理
  stockOutAndPickInfo: `${baseURL}/api/app/stock-out/stock-out-and-pick-info`, // 出库订单任务 
  pickInfoExport: `${baseURL}/api/app/stock-out/export-stock-out-and-pick-info`, //出库订单任务  导出
}

export const StockIn = {
  bindrecorddetailpages: `${baseURL}/api/app/stock-in/bind-record-detail-pages`, // 分页数据 - 码盘明细 - 入库码盘信息、分页数据（详情） - 码盘信息 - 入库码盘信息
  canclebindrecord: `${baseURL}/api/app/stock-in/cancle-bind-record`, // 撤销绑盘 - 码盘明细 - 入库码盘信息
  exportbindrecorddetail: `${baseURL}/api/app/stock-in/export-bind-record-detail`, // 导出 - 码盘明细 - 入库码盘信息
  bindrecordpages: `${baseURL}/api/app/stock-in/bind-record-pages`, // 分页数据 - 码盘信息 - 入库码盘信息
  exportbindrecord: `${baseURL}/api/app/stock-in/export-bind-record`, // 导出 - 码盘信息 - 入库码盘信息
  arrivalGoodsPages: `${baseURL}/api/app/stock-in/stock-in-pages`, // 分页数据 - 到货通知单
  arrivalGoodsHandle: `${baseURL}/api/app/stock-in/stock-in`, // 创建、编辑、删除 - 到货通知单
  arrivalGoodsProductbatch: `${baseURL}/api/app/stock-in/product-batch-select`, // 增行零件批次下拉数据 - 到货通知单
  arrivalGoodsExport: `${baseURL}/api/app/stock-in/export-stock-in`, // 导出 - 到货通知单
  arrivalGoodsAddDetail: `${baseURL}/api/app/stock-in/stock-in-detail`, // 增行 - 创建 - 到货通知单
  arrivalDetailPages: `${baseURL}/api/app/stock-in/stock-in-detail-pages`, // 分页数据（详情） - 到货通知单
  exportArriveDetail: `${baseURL}/api/app/stock-in/export-stock-out`, // 导出（详情） - 到货通知单
  productLackPages: `${baseURL}/api/app/product-lack/product-lack-pages`, // 零件缺料信息分页查询 
  productLackPagesExport: `${baseURL}/api/app/product-lack/export-product-lack-pages` // 零件缺料信息  导出
}

export const Stock = {
  stockPages: `${baseURL}/api/app/stock/stock-pages`, // 获取库存分页
  exportStock: `${baseURL}/api/app/stock/export-stock`, // 获取库存导出
  freezeStock: `${baseURL}/api/app/stock/freeze-stock`, // 冻结库存
  unFreezeStock: `${baseURL}/api/app/stock/un-freeze-stock`, // 解冻库存
  stockHistoryPages: `${baseURL}/api/app/stock/stock-history-pages`, // 获取库存变动分页
  exportStockHistory: `${baseURL}/api/app/stock/export-stock-history`, // 获取库存变动导出
  createremoveno: `${baseURL}/api/app/stock/create-remove-no`, // 获取库存变动导出
  taskdown: `${baseURL}/api/app/stock-remove-detail/task-down`, // 任务下发
  stockremovetypeselect: `${baseURL}/api/app/stock/stock-remove-type-select`, // 移位类型
  stockremoveselect: `${baseURL}/api/app/stock/stock-remove-select`, // 移位作业类型
  stockRemoveDetail: `${baseURL}/api/app/stock-remove-detail/stock-remove-detail-get`, // 分页数据（详情）- 移位单
  stockRemove: `${baseURL}/api/app/stock/stock-remove`, // 添加 - 移位制单 - 移位单
  stockEmptyRemove: `${baseURL}/api/app/stock/stock-remove-detail`, // 添加 - 移位制单（空容器） - 移位单
  confirmStockRemove: `${baseURL}/api/app/stock-remove-detail/stock-remove`, // 确认 - 移位制单 - 移位单
  stockLossPages: `${baseURL}/api/app/stock-change/stock-change`, // 分页数据 - 库存损益单
  stockLossExport: `${baseURL}/api/app/stock-change/export-stock-change`, // 导出  - 库存损益单
  stockLossDetailPages: `${baseURL}/api/app/stock-change/stock-change-detail`, // 分页数据（详情） - 库存损益单
  iltPages: `${baseURL}/api/app/i-lT/i-lTPages`, // 分页数据 - 盘点单管理
  iltDetailPages: `${baseURL}/api/app/i-lT/i-lTDetail-select`, // 分页数据（详情） - 盘点单管理
  iltCarry: `${baseURL}/api/app/i-lT/i-lTTo-stock-change`, // 盘点结转 - 盘点单管理
  iltMake: `${baseURL}/api/app/i-lT/i-lTModel-order`, // 盘点制单 - 盘点单管理
  iltUpdate: `${baseURL}/api/app/i-lT/i-lTUpdate`, // 编辑 - 盘点单管理
  iltDelete: `${baseURL}/api/app/i-lT/i-lTDelete`, // 删除 - 盘点单管理
  iltTask: `${baseURL}/api/app/stock-remove-detail/i-lTTask-down`, // 任务下发 - 盘点单管理
  iltStop: `${baseURL}/api/app/i-lT/i-lTStop-task` // 盘点中止 - 盘点单管理
}

export const IdentityUser = {
  identityUser: `${baseURL}/api/app/identity-user`,
  assignableRoles: `${baseURL}/api/app/identity-user/assignable-roles`,
}
// 任务管理
export const BusinessTask = {
  businessTaskPages: `${baseURL}/api/app/business-task/business-task-pages`, // 任务管理分页
  exportBusinessTask: `${baseURL}/api/app/business-task/export-business-task`, // 任务管理导出
  resetTask: `${baseURL}/api/app/business-task/reset-task`, // 任务管理重发
  cancelTask: `${baseURL}/api/app/business-task/cancle-task`, // 取消任务- 任务管理

  taskLevelPages: `${baseURL}/api/app/business-task/task-level-pages`, // 列表
  changeTaskLevel: `${baseURL}/api/app/business-task/change-task-level` // 修改优先级
}
// 零件管理
export const Product = {
  productById: `${baseURL}/api/app/product/product-by-id`, // 根据零件id获取
  productPages: `${baseURL}/api/app/product/product-pages`, // 零件分页
  product: `${baseURL}/api/app/product/product`, // 创建零件
  exportStock: `${baseURL}/api/app/product/export-stock`, // 零件导出
  productClassPages: `${baseURL}/api/app/product/product-class-pages`, // 零件分类分页
  productClassSelect: `${baseURL}/api/app/product/product-class-select`, // 零件分类下拉
  productClassById: `${baseURL}/api/app/product/product-class-by-id`, // 根据id获取零件分类
  productClass: `${baseURL}/api/app/product/product-class`, // 创建零件分类
  exportProductClass: `${baseURL}/api/app/product/export-product-class`, // 零件分类导出
  ownerSelect: `${baseURL}/api/app/product/owner-select`, // 货主下拉
  productSelect: `${baseURL}/api/app/product/product-select`, // 零件下拉（上级分类）
  productClassSubLevel: `${baseURL}/api/app/product/product-class-sub-level`, // 根据上级零件分类ID获取子级零件分类等级）
  dicByUnit: `${baseURL}/api/app/product/dic-by-unit`, // 获取单位下拉
  importProduct: `${baseURL}/api/app/product/import-product`, // 导入零件
  downProduct: `${baseURL}/api/app/product/down-product`, // 下载零件模板
  productOwnerById: `${baseURL}/api/app/product/product-owner-by-id` // 货主下拉接口
}
// 配置管理接口服务
export const ConfigInfo = {
  entrancebusinessconfigpages: `${baseURL}/api/app/config-info/entrance-business-config-pages`
}
export const StockRemove = {
  stockRemoveCreate: `${baseURL}/api/app/stock-remove/stock-remove-create`,
  stockRemove: `${baseURL}/api/app/stock-remove/stock-remove`,
  stockremoveget: `${baseURL}/api/app/stock-remove/stock-remove-get`,
  exportstockremove: `${baseURL}/api/app/stock-remove/export-stock-remove` // 导出
  // stockremovedetail: `${baseURL}/api/app/stock-remove-detail/stock-remove`,
}
export const PublicEnum = {
  enums: `${baseURL}/api/app/public-enum/enums`
}
export const IdentitySystem = {
  findByCode: `${baseURL}/api/app/web-system/find-by-code`
}
export const WebSystem = {
  findByCode: `${baseURL}/api/app/web-system/find-by-code`,
  WebSystem: `${baseURL}/api/app/web-system`
}
export const OrganizationUnit = {
  organizationUnit: `${baseURL}/api/app/organization-unit`,
  list: `${baseURL}/api/app/organization-unit/list`,
  listTree: `${baseURL}/api/app/organization-unit/list-tree`
}
export const IdentityRole = {
  currentMenusTree: `${baseURL}/api/app/web-menu-permission/current-menus-tree`,
  menusTreeAll: `${baseURL}/api/app/web-menu-permission/menus-tree-all`,
  webMenuPermission: `${baseURL}/api/app/web-menu-permission`,
  identityRole: `${baseURL}/api/app/identity-role`
}
export const WebSystemPermission = {
  systemAll: `${baseURL}/api/app/web-system-permission/system-all`,
  websystemPermission: `${baseURL}/api/app/web-system-permission`
}
export const permission = {
  permission: `${baseURL}/api/app/permission`
}
export const StockInfo = {
  permission: `${baseURL}/api/app/permission`
}

export const WebMenu = {
  list: `${baseURL}/api/app/web-menu/list`,
  listTree: `${baseURL}/api/app/web-menu/list-tree`,
  keyValueList: `${baseURL}/api/app/web-system/key-value-list`,
  webMenu: `${baseURL}/api/app/web-menu`
}
export const PublicAggregate = {
  dataTemplatePages: `${baseURL}/api/app/public-aggregate/data-template-pages`,
  dataTemplate: `${baseURL}/api/app/public-aggregate/data-template`,
  uploadDataTemplate: `${baseURL}/api/app/public-aggregate/upload-data-template`,
  rankPages: `${baseURL}/api/app/public-aggregate/rank-pages`,
  rankSelect: `${baseURL}/api/app/public-aggregate/rank-select`,
  rank: `${baseURL}/api/app/public-aggregate/rank`,
  dictionariesselect: `${baseURL}/api/app/public-aggregate/dictionaries-select`,
  dictionarieslist: `${baseURL}/api/app/public-aggregate/dictionaries-list`,
  dictionaries: `${baseURL}/api/app/public-aggregate/dictionaries`
}
// 后台任务配置
export const config = {
  backgroundWorkerConfigPages: `${baseURL}/api/app/config/background-worker-config-pages`,
  changedBackgroundWorkerConfigEnabled: `${baseURL}/api/app/config/changed-background-worker-config-enabled`
}

// 日志管理
export const AuditLogging = {
  auditLogPages: `${baseURL}/api/app/audit-logging/audit-log-pages`,
  auditLogAction: `${baseURL}/api/app/audit-logging/audit-log-action`,
  entitychangepages: `${baseURL}/api/app/audit-logging/entity-change-pages`,
  auditLogSetting: `${baseURL}/api/app/audit-logging/audit-logging-setting`,
  submitAuditLogSetting: `${baseURL}/api/app/audit-logging/audit-logging-setting`,
  exportAuditLog: `${baseURL}/api/app/audit-logging/export-audit-log`,

}

// 一键理货
export const Arrange = {
  arrangeStockPages: `${baseURL}/api/app/arrange/arrange-stock-pages`, // 理库详情
  autoArrange: `${baseURL}/api/app/arrange/auto-arrange`, // 一键理库按钮
  buttonStatus: `${baseURL}/api/app/arrange/button-status`, // 修改一键理库状态按钮
  arrangeRecordPages: `${baseURL}/api/app/arrange/arrange-record-pages` // 理库记录
}

/**
 * 奥托立夫的接口
 */
// 登录页面
export const Login = {
  getKey: `${baseURL}/api/app/identity/edd`
}
// 基础数据
export const Basic = {
  // 仓库主档
  getWarehoseList: `${baseURL}/api/app/warehouse/warehouse-pages`, // 分页数据 - 仓库主档
  handleWarehose: `${baseURL}/api/app/warehouse/warehouse`, // 新增、编辑 - 仓库主档
  exportWarehouse: `${baseURL}/api/app/warehouse/export-warehouse`, // 导出 - 仓库主档
  getClassesList: `${baseURL}/api/app/warehouse/work-schedule-plan`, // 班次数据 - 仓库主档
  deleteClasses: `${baseURL}/api/app/warehouse/delet-work-schedule-plan`, // 删除班次 - 仓库主档
  // 区域主档
  getRegionList: `${baseURL}/api/app/warehouse/region-pages`, // 分页数据 - 区域主档
  handleRegion: `${baseURL}/api/app/warehouse/region`, // 新增、编辑 - 仓库主档
  exportRegion: `${baseURL}/api/app/warehouse/export-region`, // 导出 - 仓库主档
  selectRegionAttributesList: `${baseURL}/api/app/warehouse/region-enum-select`, // 区域属性下拉数据 - 区域主档
  selectWarehouseList: `${baseURL}/api/app/warehouse/warehouse-select`, // 仓库下拉数据 - 区域主档
  // 库区主档
  getAreaList: `${baseURL}/api/app/warehouse/area-pages`, // 分页数据 - 库区主档
  handleArea: `${baseURL}/api/app/warehouse/area`, // 新增、编辑 - 库区主档
  exportArea: `${baseURL}/api/app/warehouse/export-area`, // 导出 - 库区主档
  selectGradeList: `${baseURL}/api/app/warehouse/grade-select`, // 等级下拉数据 - 库区主档
  selectRegionList: `${baseURL}/api/app/warehouse/region-select`, // 区域下拉数据 - 库区主档
  // 库位主档
  getLocationList: `${baseURL}/api/app/warehouse/cargo-location-pages`, // 分页数据 - 库位主档
  handleLocation: `${baseURL}/api/app/warehouse/cargo-location`, // 新增、编辑 - 库位主档
  exportLocation: `${baseURL}/api/app/warehouse/export-cargo-location`, // 导出 - 库位主档
  selectAreaList: `${baseURL}/api/app/warehouse/area-select`, // 库区下拉数据 - 库位主档
  selectWorkBenchList: `${baseURL}/api/app/warehouse/staging-select`, // 工作台下拉数据 - 库位主档
  selectRoadwayList: `${baseURL}/api/app/warehouse/road-way-select`, // 巷道下拉数据 - 库位主档
  selectDepthChannelList: `${baseURL}/api/app/warehouse/depth-way-select`, // 多深度通道下拉数据 - 库位主档
  batchfreePoint: `${baseURL}/api/app/pda-stock-in/batch-free-point`, // 批量释放
  manualTakeOut: `${baseURL}/api/app/test-back/manual-take-out`, // 强制呼出
  updateCargoLocationList: `${baseURL}/api/app/warehouse/batch-update-cargo-location-list`, // 批量设置库位
  // 容器主档
  getContainerList: `${baseURL}/api/app/warehouse/container-pages`, // 分页数据 - 容器主档
  handleContainer: `${baseURL}/api/app/warehouse/container`, // 新增、编辑 - 容器主档
  exportContainer: `${baseURL}/api/app/warehouse/export-container`, // 导出 - 容器主档
  selectContainerTypeList: `${baseURL}/api/app/warehouse/container-type-select`, // 容器类型下拉数据 - 容器主档
  // selectAreaList: `${baseURL}/api/app/warehouse/area-select`, // 库区下拉数据 - 容器主档
  // 容器类型主档
  getContainerTypeList: `${baseURL}/api/app/warehouse/container-type-pages`, // 分页数据 - 容器类型主档
  handleContainerType: `${baseURL}/api/app/warehouse/container-type`, // 新增、编辑 - 容器类型主档
  exportContainerType: `${baseURL}/api/app/warehouse/export-container-type`, // 导出 - 容器类型主档
  // 供应商主档
  getSupplierList: `${baseURL}/api/app/warehouse/supplier-pages`, // 分页数据 - 供应商主档
  handleSupplier: `${baseURL}/api/app/warehouse/supplier`, // 新增、编辑 - 供应商主档
  selectCompanyList: `${baseURL}/api/app/warehouse/org-select`, // 公司下拉数据 - 供应商主档
  exportSupplier: `${baseURL}/api/app/warehouse/export-supplier`, // 导出 - 供应商主档
  // 客户主档
  getCustomerList: `${baseURL}/api/app/warehouse/shipper-pages`, // 分页数据 - 客户主档
  handleCustomer: `${baseURL}/api/app/warehouse/shipper`, // 新增、编辑 - 客户主档
  exportCustomer: `${baseURL}/api/app/warehouse/export-shipper`, // 导出 - 客户主档
  // 多深度通道主档
  getDepthChannelList: `${baseURL}/api/app/warehouse/depth-way-pages`, // 分页数据 - 多深度通道主档
  handleDepthChannel: `${baseURL}/api/app/warehouse/depth-way`, // 新增、编辑 - 多深度通道主档
  exportDepthChannel: `${baseURL}/api/app/warehouse/export-depth-way`, // 导出 - 多深度通道主档
  // 巷道主档
  getRoadwayList: `${baseURL}/api/app/warehouse/road-way-pages`, // 分页数据 - 巷道主档
  handleRoadway: `${baseURL}/api/app/warehouse/road-way`, // 新增、编辑 - 巷道主档
  exportRoadway: `${baseURL}/api/app/warehouse/export-road-way`, // 导出 - 巷道主档
  // 工作台主档
  getWorkBenchList: `${baseURL}/api/app/warehouse/staging-pages`, // 分页数据 - 工作台主档
  handleWorkBench: `${baseURL}/api/app/warehouse/staging`, // 新增、编辑 - 工作台主档
  freeWorkBench: `${baseURL}/api/app/stock-out/dispose-stagg-order`, // 释放工作台 - 工作台主档
  exportWorkBench: `${baseURL}/api/app/warehouse/export-staging`, // 导出 - 工作台主档
  selectPointList: `${baseURL}/api/app/warehouse/point-select` // 关联点位下拉数据 - 工作台主档
}
// 零件数据
export const Matter = {
  getProductList: `${baseURL}/api/app/product/product-pages`, // 分页数据 - 零件主档
  handleProduct: `${baseURL}/api/app/product/product`, // 新增、编辑 - 零件主档
  selectProductTypeList: `${baseURL}/api/app/product/product-class-select`, // 零件分类下拉数据 - 零件主档
  selectBasicUnitList: `${baseURL}/api/app/product/dic-by-unit`, // 基础单位下拉数据- 零件主档
  selectOwnerList: `${baseURL}/api/app/product/owner-select`, // 货主下拉数据- 零件主档
  getProductInfo: `${baseURL}/api/app/product/product-by-id`, // 编辑时带出信息 - 零件主档
  exportProduct: `${baseURL}/api/app/product/export-stock`, // 导出 - 零件主档
  downProduct: `${baseURL}/api/app/product/down-product`, // 下载零件模板 - 零件主档
  importProduct: `${baseURL}/api/app/product/import-product` // 导入零件 - 零件主档
}
// 入库管理
export const InBound = {
  getSHOrderList: `${baseURL}/api/app/stock-in/stock-in-pages`, // 分页数据 - 收货订单
  exportSHOrder: `${baseURL}/api/app/stock-in/export-stock-in`, // 导出 - 收货订单
  handleSHOrder: `${baseURL}/api/app/stock-in/stock-in`, // 删除 - 收货订单
  finishSHOrder: `${baseURL}/api/app/stock-in/finish-stock-in`, // 完成收货 - 收货订单
  getSupplierName: `${baseURL}/api/app/stock-in/supplier-name`, // 根据供应商编码带出名字 - 收货订单
  addSHOrder: `${baseURL}/api/app/stock-in/stock-in`, // 新增收货订单 - 收货订单
  getSingleEnumList: `${baseURL}/api/app/public-enum/single-enum`, // 得到单个枚举
  getProductInfo: `${baseURL}/api/app/stock-in/product-select-with-code-name`, // 得到零件信息
  exportSHOrderDetail: `${baseURL}/api/app/stock-in/export-stock-in-detail`, // 导出（详情）- 收货订单
  getSHOrderDetailList: `${baseURL}/api/app/stock-in/stock-in-detail-pages`, // 分页数据（详情）- 收货订单
  getMPDetailList: `${baseURL}/api/app/stock-in/bind-record-detail-pages`, // 分页数据 - 码盘明细信息
  exportMPDetail: `${baseURL}/api/app/stock-in/export-bind-record-detail`, // 导出 - 码盘明细信息
  getZJOrderList: `${baseURL}/api/app/quality-check-order-appservice/quality-check-pages`, // 分页数据 - 质检单
  taskXFZJOrder: `${baseURL}/api/app/quality-check-order-appservice/quality-check-confirm`, // 任务下发 - 质检单
  getZJOrderDetailList: `${baseURL}/api/app/quality-check-order-appservice/quality-check-detail-pages`, // 分页数据（详情）- 质检单
  exportZJOrderDetail: `${baseURL}/api/app/quality-check-order-appservice/export-quality-check`, // 导出（详情）- 质检单
  submitZJOrderDetailResult: `${baseURL}/api/app/pda-qulity-check/quality-check-result-confirm`, // 提交结果（详情） - 质检单

  exportStockInDetail: `${baseURL}/api/app/stock-in/export-stock-in-detail`, // 导出详情
  exportStockInTemplate: `${baseURL}/api/app/stock-in/down-stock-in-template`, // 收货订单导入模板
 importStockIn: `${baseURL}/api/app/stock-in/import-stock-in`, // 收货订单导入模板


}
// 出库管理
export const OutBound = {
  getCKOrderList: `${baseURL}/api/app/stock-out/stock-out-pages`, // 分页数据 - 出库订单、分页数据（波次订单信息）- 波次管理
  orderpickpages: `${baseURL}/api/app/stock-out/order-pick-pages`, // 分页数据 - 出库订单、分页数据（波次订单信息）- 波次管理
  getBCMsgList: `${baseURL}/api/app/stock-out/wave-pages`, // 分页数据 - 波次管理
  allotBCMsg: `${baseURL}/api/app/test-jobs/run-test-allocation-stock`, // 波次分配 - 波次管理
  taskDownBCMsg: `${baseURL}/api/app/test-jobs/run-device-task-delivery-worker`, // 任务下发 - 波次管理
  adjustTimeBCMsg: `${baseURL}/api/app/stock-out/set-wave-plan-time`, // 调整备料时间 - 波次管理
  getBCBoxNoList: `${baseURL}/api/app/stock-out/assign-box-stock-pages`, // 分页数据（波次指定箱号）- 波次管理
  addBCBoxNoList: `${baseURL}/api/app/stock-out/set-wave-boxs`, // 添加 - 波次指定箱号 - 波次管理
  deleteBCBoxNo: `${baseURL}/api/app/stock-out/assign-box-stock`, // 删除 - 波次指定箱号 - 波次管理
  getBCJXList: `${baseURL}/api/app/stock-out/wave-stock-out-detail-pages`, // 分页数据（波次拣选信息）- 波次管理
  getFPDetailList: `${baseURL}/api/app/stock-out/wave-pick-pages`, // 分页数据（分配详情）- 波次管理
  getJXBoxNoDetailList: `${baseURL}/api/app/stock-out/pick-box-pages`, // 分页数据（拣选箱号详情）- 波次管理
  getStockOutProgress: `${baseURL}/api/app/stock-out/stock-out-progress`, // 出库进度 - 波次管理
  exportCKOrder: `${baseURL}/api/app/stock-out/export-stock`, // 导出 - 出库订单
  getCKOrderDetailList: `${baseURL}/api/app/stock-out/stock-out-detail-pages`, // 分页数据（明细）- 出库订单
  productpackagelist: `${baseURL}/api/app/product/product-package-list`, // 分页数据（明细）- 出库订单
  orderpickboxpages: `${baseURL}/api/app/stock-out/order-pick-box-pages`, // 分页数据（明细）- 出库订单
  setCKOrderDetailYJ: `${baseURL}/api/app/stock-out/set-stock-out-detail`, // 只出样件（明细）- 出库订单
  getCanAssignList: `${baseURL}/api/app/stock-out/packing-information`, // 分页数据 - 可指定清单 - 出库订单
  getAlreadyAssignList: `${baseURL}/api/app/stock-out/assign-box-stock-pages`, // 分页数据 - 已指定箱号 - 出库订单
  settingAssignBox: `${baseURL}/api/app/stock-out/set-wave-boxs`, // 指定箱号 - 出库订单
  cancelAssignBox: `${baseURL}/api/app/stock-out/assign-box-stock`, // 取消指定 - 出库订单
  getHTHTList: `${baseURL}/api/app/stock-out/consolidine-record-pages`, // 分页数据 - 合托换托记录
  exportHTHT: `${baseURL}/api/app/stock-out/export-consolidine-record`, // 导出 - 合托换托记录
  getHTHTDetailList: `${baseURL}/api/app/stock-out/consolidine-record-detail-pages`, // 分页数据（详情）- 合托换托记录
  getHandCKRecordList: `${baseURL}/api/app/stock-out/stock-out-history-pages`, // 分页数据 - 手动出库记录
  exportHandCKRecord: `${baseURL}/api/app/stock-out/export-stock-out-history`, // 导出 - 手动出库记录
  getReasonList: `${baseURL}/api/app/stock-out/code-item-pages`, // 分页数据（弹框）- 手动出库记录
  exportReasonList: `${baseURL}/api/app/stock-out/export-code-items`, // 导出手动出库原因
  deleteReason: `${baseURL}/api/app/stock-out/code-item`, // 删除（弹框）- 手动出库记录
  addReason: `${baseURL}/api/app/stock-out/set-code-item`, // 增加（弹框）- 手动出库记录
  getStockTransferList: `${baseURL}/api/app/stock/stock-transfer-empty-record-paged`,// 分页数据 - 帐差库存处理记录
  exportOrderPickList: `${baseURL}/api/app/stock-out/export-order-pick-list`, // 导出 - 订单拣选任务
  finishPickManual: `${baseURL}/api/app/pick-screen/finish-pick-manual`, // 手动完成
  exportStockOutDetail: `${baseURL}/api/app/stock-out/export-stock-out-detail`, // 导出详情

  manualFinish: `${baseURL}/api/app/stock-out/manual-finish-order/`, // 强制完成

}
// 库存管理
export const Reserve = {
  getRealTimeStockList: `${baseURL}/api/app/stock/stock-pages`, // 分页数据 - 实时库存
  exportRealTimeStock: `${baseURL}/api/app/stock/export-stock`, // 导出 - 实时库存
  exportstockpacking: `${baseURL}/api/app/stock/export-stock-packing`, // 导出 - 库存详情
  freezeStock: `${baseURL}/api/app/stock/freeze-stock`, // 库存冻结 - 实时库存
  unFreezeStock: `${baseURL}/api/app/stock/un-freeze-stock`, // 取消冻结 - 实时库存
  handleVMIStock: `${baseURL}/api/app/stock/change-vmi-stock`, // 隔离/放行 - 实时库存
  getZXMsgList: `${baseURL}/api/app/stock-in/packing-information-pages`, // 分页数据 - 装箱信息管理
  exportZXMsg: `${baseURL}/api/app/stock-in/export-packing-information`, // 导出 - 装箱信息管理
  getStockChangeList: `${baseURL}/api/app/stock/stock-history-pages`, // 分页数据 - 库存变动记录
  exportStockChange: `${baseURL}/api/app/stock/export-stock-history`, // 导出 - 库存变动记录

  changeBoxQty: `${baseURL}/api/app/stock/change-box-qty`, //手动调帐

  stockProductCode: `${baseURL}/api/app/stock/stock-pages-by-product-code`, //实时库存（汇总）  列表
  stockProductCodeDetail: `${baseURL}/api/app/stock/stock-detail-pages-by-product-code`, //实时库存（汇总）  详情
  stockProductCodeExport: `${baseURL}/api/app/stock/export-stock-by-product-code`, //实时库存（汇总）  导出

  containerOutPages: `${baseURL}/api/app/stock-out/container-out-pages`, // 自动装卸报表
  exportContainerOutPages: `${baseURL}/api/app/stock-out/export-container-out`, // 自动装卸报表

  boxQuality: `${baseURL}/api/app/test-back/cp-box-quality`, // 更新成品质检信息

  


}
// 任务管理
export const Job = {
  getTaskList: `${baseURL}/api/app/business-task/business-task-pages`, // 分页数据 - WCS任务、WMS任务
  applyRoadway: `${baseURL}/api/open/wcs/recommend-roadway`, // 申请巷道库位 - WCS任务
  finishTask: `${baseURL}/api/open/wcs/task-complete`, // 任务完成 - WCS任务
  completeTask: `${baseURL}/api/wcs/NoticeCompleteTask`, // 任务完成 - 高青松改
  finishRCSTask: `${baseURL}/api/open/agv/AGV-callback`, // 任务完成 - RCS任务
  handleAgvTask: `${baseURL}/api/app/pda-business-task-aGV/auto-aGVTask`, // 确定（弹框）- AGV多点位搬运
  continueAgvTask: `${baseURL}/api/app/pda-business-task-aGV/a-gVTask-continue`,// 继续执行 - AGV多点位执行


  applyLocation: `${baseURL}/api/wcs/ApplyLocation`,//申请巷道- 高青松改
  applyFinalLocation: `${baseURL}/api/wcs/ApplyFinalLocation`,//申请库位- 高青松改


  changePriorty: `${baseURL}/api/app/business-task/change-priorty`,//任务管理修改优先级


}
// 日志管理
export const Log = {
  getOperationList: `${baseURL}/api/app/operation-log/operation-log-pages`, // 分页数据 - 操作日志
  exportOperation: `${baseURL}/api/app/operation-log/export-operation-log` // 导出 - 操作日志
}
// 盘点
export const Inventory = {
  getInventoryPlanOrderList: `${baseURL}/api/app/i-lT/i-lTPlan-pages`, // 分页数据 - 盘点计划单管理
  getInventoryStockList: `${baseURL}/api/app/i-lT/i-lTStock-pages`, // 分页数据 - 盘点制单 - 盘点计划单管理
  handleInventPlanOrder: `${baseURL}/api/app/i-lT/i-lTPlan`, // 盘点制单 - 盘点计划单管理
  deleteInventPlanOrder: `${baseURL}/api/app/i-lT/i-lTDelete`, // 删除 - 盘点计划单管理
  confirmInventPlanOrder: `${baseURL}/api/app/i-lT/confirm-iLTConfirm`, // 确认 - 盘点计划单管理
  stopInventPlanOrder: `${baseURL}/api/app/i-lT/i-lTCancle`, // 盘点中止 - 盘点计划单管理
  getInventoryOrderList: `${baseURL}/api/app/i-lT/i-lTPages`, // 分页数据 - 盘点单
  exportInventoryDetails: `${baseURL}/api/app/i-lT/export-iLTDetail`, // 导出详情 盘点单
  getInventoryOrderDetailList: `${baseURL}/api/app/i-lT/i-lTDetail-pages`, // 分页数据（明细） - 盘点单
  getInventoryOrderDetailBoxNos: `${baseURL}/api/app/i-lT/i-lTDetail-package-pages`, // 明细中的箱号数据展示 - 盘点单
  getInventoryRecordList: `${baseURL}/api/app/i-lT/check-record-pages`, // 分页数据 - 盘点记录
  exportInventoryRecord: `${baseURL}/api/app/i-lT/export-check-record`, // 导出 - 盘点记录
  exportiLTPlan: `${baseURL}/api/app/i-lT/export-iLTPlan`  // 导出 -盘点计划导出 
}

// 统计
export const Statistics={
getDeviceAlarms: `${baseURL}/api/app/statistics/device-alarm-pages`, // 分页数据 - 设备报警信息
getOldDeviceAlarms: `${baseURL}/api/app/statistics/device-alarm-pages-old`, // 分页数据 - 设备报警信息
exportDeviceAlarms: `${baseURL}/api/app/statistics/export-device-alarms`, // 导出 - 设备报警信息
exportOldDeviceAlarms: `${baseURL}/api/app/statistics/export-device-alarms-old`, // 分页数据 - 设备报警信息
getDeviceErrorReports: `${baseURL}/api/app/statistics/device-error-report-pages`, // 分页数据 - 设备异常信息日报
exportDeviceErrorReports: `${baseURL}/api/app/statistics/export-device-error-reports`, // 导出 - 设备异常信息日报

taskByRoadWay: `${baseURL}/api/app/statistics/task-by-road-way`, //根据巷道获取任务数及库位数
taskByRoadWayExport: `${baseURL}/api/app/statistics/export-task-by-road-way`, //根据巷道获取任务数及库位数  导出

taskByType: `${baseURL}/api/app/statistics/task-by-type`, //根据类型获取任务量
taskByTypeExport: `${baseURL}/api/app/statistics/export-task-by-type`, //根据类型获取任务量  导出

deviceTask: `${baseURL}/api/app/statistics/device-task`, //设备任务执行效率
exportDeviceTask: `${baseURL}/api/app/statistics/export-device-task`, //设备任务执行效率  导出

trayCount: `${baseURL}/api/app/statistics/tray-count`, //库位使用报表
exportTrayCount: `${baseURL}/api/app/statistics/export-tray-count`, //库位使用报表  导出

runStatistics: `${baseURL}/api/app/statistics/run-statistics`, //运行效率报表
exportRunStatistics: `${baseURL}/api/app/statistics/export-run-statistics`, //运行效率报表  导出


stockOutStatistics: `${baseURL}/api/app/statistics/stock-out-statistics`, //出库订单报表
exportStockOutStatistics: `${baseURL}/api/app/statistics/export-stock-out-statistics`, //出库订单报表  导出
stockOutDetailStatistics: `${baseURL}/api/app/statistics/stock-out-statistics-detail`, //出库订单报表详情
exportStockOutDetailStatistics: `${baseURL}/api/app/statistics/export-stock-out-statistics-detail`, //出库订单报表 导出



}
