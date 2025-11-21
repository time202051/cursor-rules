const json = {
    "SET_TOKEN": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjkyNDFjY2FkLTk5NTgtMTQ0Yy1kZGVkLTNhMDZhYTM1NDcyMSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJhZG1pbiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6ImFkbWluQGFkbWluLmNvbSIsIkFzcE5ldC5JZGVudGl0eS5TZWN1cml0eVN0YW1wIjoiSU9FWlRON0FYNkE3NUU2WVc3QklWRk1ZVEZTV0JJUDYiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOlsiYWRtaW4iLCJhZG1pbiJdLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9naXZlbm5hbWUiOiJhZG1pbiIsInBob25lX251bWJlcl92ZXJpZmllZCI6IkZhbHNlIiwiZW1haWxfdmVyaWZpZWQiOiJGYWxzZSIsIlN5c3RlbUlkIjoiM2UxNjliZGYtN2ZjNC1jYTkwLTExNzQtM2EwNmFhMzU1MTEzIiwiZXhwIjoxNzA4MzkzNTU0LCJpc3MiOiJ3bXMiLCJhdWQiOiJ3bXMifQ.6uTRHrHx8bHp2M8JtbLKLdLvK4_McEq3Njl-hXWMg2M",
    "SET_enumsSelect": {
        "agvTaskType": {
            "desc": null,
            "enums": [
                {
                    "key": 1,
                    "value": "收货入库",
                    "isSelected": false,
                    "isEnabled": true
                },
                {
                    "key": 2,
                    "value": "出库",
                    "isSelected": false,
                    "isEnabled": true
                },
                {
                    "key": 10,
                    "value": "AGV搬运",
                    "isSelected": false,
                    "isEnabled": true
                }
            ]
        },
        "operationEnum": {
            "desc": null,
            "enums": [
                {
                    "key": 1,
                    "value": "入",
                    "isSelected": false,
                    "isEnabled": true
                },
                {
                    "key": 2,
                    "value": "出",
                    "isSelected": false,
                    "isEnabled": true
                },
                {
                    "key": 3,
                    "value": "移动",
                    "isSelected": false,
                    "isEnabled": true
                },
                {
                    "key": 4,
                    "value": "理库",
                    "isSelected": false,
                    "isEnabled": true
                }
            ]
        },
        "agvTaskStatus": {
            "desc": null,
            "enums": [
                {
                    "key": 1,
                    "value": "未开始",
                    "isSelected": false,
                    "isEnabled": true
                },
                {
                    "key": 2,
                    "value": "任务进行中",
                    "isSelected": false,
                    "isEnabled": true
                },
                {
                    "key": 3,
                    "value": "任务运输中",
                    "isSelected": false,
                    "isEnabled": true
                },
                {
                    "key": 4,
                    "value": "任务完成",
                    "isSelected": false,
                    "isEnabled": true
                },
                {
                    "key": 5,
                    "value": "任务取消",
                    "isSelected": false,
                    "isEnabled": true
                }
            ]
        },
        "businessTypeEnum": {
            "desc": "业务类型",
            "enums": [
                {
                    "key": 100,
                    "value": "收货入库",
                    "isSelected": false,
                    "isEnabled": true
                },
                {
                    "key": 101,
                    "value": "提前翻包出库",
                    "isSelected": false,
                    "isEnabled": true
                },
                {
                    "key": 102,
                    "value": "提前翻包余料回库",
                    "isSelected": false,
                    "isEnabled": true
                },
                {
                    "key": 103,
                    "value": "提前翻包完成成品入库",
                    "isSelected": false,
                    "isEnabled": true
                },
                {
                    "key": 104,
                    "value": "备件出库余料回库",
                    "isSelected": false,
                    "isEnabled": true
                },
                {
                    "key": 105,
                    "value": "盘点出库",
                    "isSelected": false,
                    "isEnabled": true
                },
                {
                    "key": 106,
                    "value": "盘点回库",
                    "isSelected": false,
                    "isEnabled": true
                },
                {
                    "key": 107,
                    "value": "调拨入库",
                    "isSelected": false,
                    "isEnabled": true
                },
                {
                    "key": 108,
                    "value": "调拨出库",
                    "isSelected": false,
                    "isEnabled": true
                },
                {
                    "key": 109,
                    "value": "备件出库",
                    "isSelected": false,
                    "isEnabled": true
                },
                {
                    "key": 110,
                    "value": "空容器入库",
                    "isSelected": false,
                    "isEnabled": true
                },
                {
                    "key": 111,
                    "value": "空容器出库",
                    "isSelected": false,
                    "isEnabled": true
                },
                {
                    "key": 112,
                    "value": "合托出库",
                    "isSelected": false,
                    "isEnabled": true
                },
                {
                    "key": 113,
                    "value": "合托回库",
                    "isSelected": false,
                    "isEnabled": true
                },
                {
                    "key": 114,
                    "value": "一键理货",
                    "isSelected": false,
                    "isEnabled": true
                },
                {
                    "key": 115,
                    "value": "点对点搬运",
                    "isSelected": false,
                    "isEnabled": true
                },
                {
                    "key": 116,
                    "value": "后置翻包出库",
                    "isSelected": false,
                    "isEnabled": true
                },
                {
                    "key": 117,
                    "value": "备件提前翻包出库",
                    "isSelected": false,
                    "isEnabled": true
                },
                {
                    "key": 118,
                    "value": "入库翻包",
                    "isSelected": false,
                    "isEnabled": true
                },
                {
                    "key": 119,
                    "value": "提前翻包入备件区",
                    "isSelected": false,
                    "isEnabled": true
                },
                {
                    "key": 120,
                    "value": "简单入库",
                    "isSelected": false,
                    "isEnabled": true
                },
                {
                    "key": 121,
                    "value": "备件提前翻包余料回库",
                    "isSelected": false,
                    "isEnabled": true
                }
            ]
        },
        "runModeEnum": {
            "desc": "匹配库存运行模式",
            "enums": [
                {
                    "key": 1,
                    "value": "按入库时间正序",
                    "isSelected": false,
                    "isEnabled": true
                },
                {
                    "key": 2,
                    "value": "按载货数量倒序",
                    "isSelected": false,
                    "isEnabled": true
                },
                {
                    "key": 3,
                    "value": "按载货数量正序",
                    "isSelected": false,
                    "isEnabled": true
                }
            ]
        },
        "iltTypeEnum": {
            "desc": null,
            "enums": [
                {
                    "key": 0,
                    "value": "盘亏",
                    "isSelected": false,
                    "isEnabled": true
                },
                {
                    "key": 1,
                    "value": "盘盈",
                    "isSelected": false,
                    "isEnabled": true
                }
            ]
        },
        "loadStatusEnum": {
            "desc": "载货状态",
            "enums": [
                {
                    "key": 0,
                    "value": "无货",
                    "isSelected": false,
                    "isEnabled": true
                },
                {
                    "key": 1,
                    "value": "有货",
                    "isSelected": false,
                    "isEnabled": true
                }
            ]
        },
        "ascription": {
            "desc": null,
            "enums": [
                {
                    "key": 1,
                    "value": "无归属",
                    "isSelected": false,
                    "isEnabled": true
                },
                {
                    "key": 2,
                    "value": "可放置零件",
                    "isSelected": false,
                    "isEnabled": true
                },
                {
                    "key": 3,
                    "value": "可放置周转箱",
                    "isSelected": false,
                    "isEnabled": true
                },
                {
                    "key": 4,
                    "value": "可放置空托架",
                    "isSelected": false,
                    "isEnabled": true
                }
            ]
        },
        "inOutEnum": {
            "desc": null,
            "enums": [
                {
                    "key": 1,
                    "value": "入",
                    "isSelected": false,
                    "isEnabled": true
                },
                {
                    "key": 2,
                    "value": "出",
                    "isSelected": false,
                    "isEnabled": true
                },
                {
                    "key": 3,
                    "value": "可出可入",
                    "isSelected": false,
                    "isEnabled": true
                }
            ]
        },
        "batchSourceEnum": {
            "desc": null,
            "enums": [
                {
                    "key": 0,
                    "value": "自动生成",
                    "isSelected": false,
                    "isEnabled": true
                },
                {
                    "key": 1,
                    "value": "手工创建",
                    "isSelected": false,
                    "isEnabled": true
                },
                {
                    "key": 2,
                    "value": "其他",
                    "isSelected": false,
                    "isEnabled": true
                }
            ]
        },
        "qualityRankEnum": {
            "desc": null,
            "enums": [
                {
                    "key": 1,
                    "value": "合格品",
                    "isSelected": false,
                    "isEnabled": true
                },
                {
                    "key": 2,
                    "value": "残次品",
                    "isSelected": false,
                    "isEnabled": true
                },
                {
                    "key": 3,
                    "value": "待检品",
                    "isSelected": false,
                    "isEnabled": true
                }
            ]
        },
        "historyTypeEnum": {
            "desc": null,
            "enums": [
                {
                    "key": 1,
                    "value": "常规入库",
                    "isSelected": false,
                    "isEnabled": true
                },
                {
                    "key": 2,
                    "value": "拣选出库",
                    "isSelected": false,
                    "isEnabled": true
                },
                {
                    "key": 3,
                    "value": "盘点出库",
                    "isSelected": false,
                    "isEnabled": true
                },
                {
                    "key": 4,
                    "value": "盘点入库",
                    "isSelected": false,
                    "isEnabled": true
                },
                {
                    "key": 5,
                    "value": "移库出库",
                    "isSelected": false,
                    "isEnabled": true
                },
                {
                    "key": 6,
                    "value": "移库入库",
                    "isSelected": false,
                    "isEnabled": true
                },
                {
                    "key": 7,
                    "value": "数据导入",
                    "isSelected": false,
                    "isEnabled": true
                },
                {
                    "key": 8,
                    "value": "人工取货",
                    "isSelected": false,
                    "isEnabled": true
                },
                {
                    "key": 9,
                    "value": "理库出库",
                    "isSelected": false,
                    "isEnabled": true
                },
                {
                    "key": 10,
                    "value": "理库入库",
                    "isSelected": false,
                    "isEnabled": true
                }
            ]
        },
        "stockLockStateEnum": {
            "desc": null,
            "enums": [
                {
                    "key": 0,
                    "value": "未锁定",
                    "isSelected": false,
                    "isEnabled": true
                },
                {
                    "key": 1,
                    "value": "出库锁定",
                    "isSelected": false,
                    "isEnabled": true
                },
                {
                    "key": 2,
                    "value": "盘点锁定",
                    "isSelected": false,
                    "isEnabled": true
                },
                {
                    "key": 4,
                    "value": "移库锁定",
                    "isSelected": false,
                    "isEnabled": true
                }
            ]
        },
        "stockStateEnum": {
            "desc": null,
            "enums": [
                {
                    "key": 1,
                    "value": "限制",
                    "isSelected": false,
                    "isEnabled": true
                },
                {
                    "key": 3,
                    "value": "冻结",
                    "isSelected": false,
                    "isEnabled": true
                },
                {
                    "key": 4,
                    "value": "非限制",
                    "isSelected": false,
                    "isEnabled": true
                },
                {
                    "key": 9,
                    "value": "质检",
                    "isSelected": false,
                    "isEnabled": true
                }
            ]
        },
        "renovateStateEnum": {
            "desc": "翻包状态",
            "enums": [
                {
                    "key": 1,
                    "value": "无需翻包",
                    "isSelected": false,
                    "isEnabled": true
                },
                {
                    "key": 2,
                    "value": "提前翻包",
                    "isSelected": false,
                    "isEnabled": true
                },
                {
                    "key": 3,
                    "value": "后置翻包",
                    "isSelected": false,
                    "isEnabled": true
                }
            ]
        },
        "renovatePlanStateEnum": {
            "desc": "翻包计划状态",
            "enums": [
                {
                    "key": 1,
                    "value": "未完成",
                    "isSelected": false,
                    "isEnabled": true
                },
                {
                    "key": 2,
                    "value": "已完成",
                    "isSelected": false,
                    "isEnabled": true
                },
                {
                    "key": 3,
                    "value": "已取消",
                    "isSelected": false,
                    "isEnabled": true
                }
            ]
        },
        "renovateTaskStateEnum": {
            "desc": "翻包任务状态",
            "enums": [
                {
                    "key": 1,
                    "value": "未开始",
                    "isSelected": false,
                    "isEnabled": true
                },
                {
                    "key": 2,
                    "value": "进行中",
                    "isSelected": false,
                    "isEnabled": true
                },
                {
                    "key": 3,
                    "value": "末端任务进行中",
                    "isSelected": false,
                    "isEnabled": true
                },
                {
                    "key": 4,
                    "value": "完成",
                    "isSelected": false,
                    "isEnabled": true
                }
            ]
        },
        "renovateTaskTypeEnum": {
            "desc": null,
            "enums": [
                {
                    "key": 1,
                    "value": "a",
                    "isSelected": false,
                    "isEnabled": true
                },
                {
                    "key": 2,
                    "value": "b",
                    "isSelected": false,
                    "isEnabled": true
                }
            ]
        },
        "stockOutStateEnum": {
            "desc": "出库订单状态",
            "enums": [
                {
                    "key": 1,
                    "value": "未开始",
                    "isSelected": false,
                    "isEnabled": true
                },
                {
                    "key": 2,
                    "value": "进行中",
                    "isSelected": false,
                    "isEnabled": true
                },
                {
                    "key": 3,
                    "value": "已完成",
                    "isSelected": false,
                    "isEnabled": true
                }
            ]
        },
        "usageStatusEnum": {
            "desc": "使用状态",
            "enums": [
                {
                    "key": 0,
                    "value": "空闲",
                    "isSelected": false,
                    "isEnabled": true
                },
                {
                    "key": 1,
                    "value": "入库单占用",
                    "isSelected": false,
                    "isEnabled": true
                },
                {
                    "key": 2,
                    "value": "出库单占用",
                    "isSelected": false,
                    "isEnabled": true
                },
                {
                    "key": 3,
                    "value": "盘点单占用",
                    "isSelected": false,
                    "isEnabled": true
                },
                {
                    "key": 4,
                    "value": "移库单占用",
                    "isSelected": false,
                    "isEnabled": true
                },
                {
                    "key": 5,
                    "value": "空容器业务占用",
                    "isSelected": false,
                    "isEnabled": true
                },
                {
                    "key": 6,
                    "value": "一键理库占用",
                    "isSelected": false,
                    "isEnabled": true
                }
            ]
        },
        "containerShapeTypeEunm": {
            "desc": null,
            "enums": [
                {
                    "key": 0,
                    "value": "托盘",
                    "isSelected": false,
                    "isEnabled": true
                },
                {
                    "key": 1,
                    "value": "料箱",
                    "isSelected": false,
                    "isEnabled": true
                },
                {
                    "key": 2,
                    "value": "拣选车",
                    "isSelected": false,
                    "isEnabled": true
                }
            ]
        },
        "locationTypeEnum": {
            "desc": null,
            "enums": [
                {
                    "key": 0,
                    "value": "虚拟货位",
                    "isSelected": false,
                    "isEnabled": true
                },
                {
                    "key": 1,
                    "value": "地面平仓",
                    "isSelected": false,
                    "isEnabled": true
                },
                {
                    "key": 2,
                    "value": "轻型货架",
                    "isSelected": false,
                    "isEnabled": true
                },
                {
                    "key": 3,
                    "value": "重型货架",
                    "isSelected": false,
                    "isEnabled": true
                },
                {
                    "key": 4,
                    "value": "流利式货架",
                    "isSelected": false,
                    "isEnabled": true
                },
                {
                    "key": 5,
                    "value": "AGV点位",
                    "isSelected": false,
                    "isEnabled": true
                }
            ]
        },
        "regionEnum": {
            "desc": "区域属性",
            "enums": [
                {
                    "key": 1001,
                    "value": "存储区域",
                    "isSelected": false,
                    "isEnabled": true
                },
                {
                    "key": 2001,
                    "value": "前置翻包区域",
                    "isSelected": false,
                    "isEnabled": true
                },
                {
                    "key": 3001,
                    "value": "后置翻包区域",
                    "isSelected": false,
                    "isEnabled": true
                },
                {
                    "key": 4001,
                    "value": "备件区",
                    "isSelected": false,
                    "isEnabled": true
                },
                {
                    "key": 5001,
                    "value": "空容器区",
                    "isSelected": false,
                    "isEnabled": true
                },
                {
                    "key": 6001,
                    "value": "等待区",
                    "isSelected": false,
                    "isEnabled": true
                }
            ]
        },
        "identityClaimValueType": {
            "desc": null,
            "enums": [
                {
                    "key": 0,
                    "value": "String",
                    "isSelected": false,
                    "isEnabled": true
                },
                {
                    "key": 1,
                    "value": "Int",
                    "isSelected": false,
                    "isEnabled": true
                },
                {
                    "key": 2,
                    "value": "Boolean",
                    "isSelected": false,
                    "isEnabled": true
                },
                {
                    "key": 3,
                    "value": "DateTime",
                    "isSelected": false,
                    "isEnabled": true
                }
            ]
        },
        "webMenuType": {
            "desc": null,
            "enums": [
                {
                    "key": 0,
                    "value": "菜单",
                    "isSelected": false,
                    "isEnabled": true
                },
                {
                    "key": 1,
                    "value": "按钮",
                    "isSelected": false,
                    "isEnabled": true
                }
            ]
        },
        "webSystemType": {
            "desc": null,
            "enums": [
                {
                    "key": 0,
                    "value": "配置中心（终端系统）",
                    "isSelected": false,
                    "isEnabled": true
                },
                {
                    "key": 1,
                    "value": "业务中心（业务系统）",
                    "isSelected": false,
                    "isEnabled": true
                }
            ]
        },
        "enableStatusEnum": {
            "enums": [
                {
                    "key": true,
                    "value": "启用"
                },
                {
                    "key": false,
                    "value": "禁用"
                }
            ]
        }
    },
    "SET_MENUS": [
        //主数据管理
        {
            "title": "主数据管理",
            "code": "00010",
            "id": "162913b9-4a6e-3270-72e2-3a06aa35515d",
            "parentId": null,
            "type": 0,
            "typeName": "Menu",
            "typeDesc": "菜单",
            "jump": "product",
            "icon": "layui-icon-component",
            "sort": 77,
            "isGranted": false,
            "isGrantedText": "否",
            "isSystem": false,
            "isSystemText": "否",
            "systemId": null,
            "systemName": null,
            "systemDisplayName": null,
            "child": [
                {
                    "title": "零件管理",
                    "code": "00010.00x001",
                    "id": "93c389da-e30f-c191-6813-3a06aa355162",
                    "parentId": "162913b9-4a6e-3270-72e2-3a06aa35515d",
                    "type": 0,
                    "typeDesc": "菜单",
                    "jump": "product/product/index",
                    "icon": "layui-icon-component",
                    "sort": 1,
                    "isGranted": false,
                    "isSystem": false,
                    "systemId": null,
                    "systemName": null,
                    "systemDisplayName": null,
                    "child": [
                        {
                            "title": "添加",
                            "code": "00010.00001.00001",
                            "id": "5246b100-b771-3637-f1f5-3a0791744c8e",
                            "parentId": "93c389da-e30f-c191-6813-3a06aa355162",
                            "type": 1,
                            "typeDesc": "按钮",
                            "jump": "product-product-create",
                            "icon": "",
                            "sort": 0,
                            "isGranted": false,
                            "isSystem": false,
                            "systemId": null,
                            "systemName": null,
                            "systemDisplayName": null,
                            "child": [],
                            "path": "/product-product-update"
                        },
                        {
                            "title": "编辑",
                            "code": "00010.00001.00001",
                            "id": "5246b100-b771-3637-f1f5-3a0791744c8e",
                            "parentId": "93c389da-e30f-c191-6813-3a06aa355162",
                            "type": 1,
                            "typeDesc": "按钮",
                            "jump": "product-product-update",
                            "icon": "",
                            "sort": 0,
                            "isGranted": false,
                            "isSystem": false,
                            "systemId": null,
                            "systemName": null,
                            "systemDisplayName": null,
                            "child": [],
                            "path": "/product-product-update"
                        },
                        {
                            "title": "删除",
                            "code": "00010.00001.00001",
                            "id": "5246b100-b771-3637-f1f5-3a0791744c8e",
                            "parentId": "93c389da-e30f-c191-6813-3a06aa355162",
                            "type": 1,
                            "typeDesc": "按钮",
                            "jump": "product-product-delete",
                            "icon": "",
                            "sort": 0,
                            "isGranted": false,
                            "isSystem": false,
                            "systemId": null,
                            "systemName": null,
                            "systemDisplayName": null,
                            "child": [],
                            "path": "/product-product-update"
                        },
                        {
                            "title": "导出",
                            "code": "00010.00001.00001",
                            "id": "5246b100-b771-3637-f1f5-3a0791744c8e",
                            "parentId": "93c389da-e30f-c191-6813-3a06aa355162",
                            "type": 1,
                            "typeDesc": "按钮",
                            "jump": "product-product-exprot",
                            "icon": "",
                            "sort": 0,
                            "isGranted": false,
                            "isSystem": false,
                            "systemId": null,
                            "systemName": null,
                            "systemDisplayName": null,
                            "child": [],
                            "path": "/product-product-update"
                        },
                    ],
                    "path": "/product"
                },
                {
                    "title": "零件类别",
                    "code": "000010.00001",
                    "id": "93c389da-e30f-c191-6813-3a06aa355162",
                    "parentId": "162913b9-4a6e-3270-72e2-3a06aa35515d",
                    "type": 0,
                    "typeDesc": "菜单",
                    "jump": "product/productType/index",
                    "icon": "layui-icon-component",
                    "sort": 1,
                    "isGranted": false,
                    "isSystem": false,
                    "systemId": null,
                    "systemName": null,
                    "systemDisplayName": null,
                    "child": [
                        {
                            "title": "添加",
                            "code": "00010.00001.00001",
                            "id": "5246b100-b771-3637-f1f5-3a0791744c8e",
                            "parentId": "93c389da-e30f-c191-6813-3a06aa355162",
                            "type": 1,
                            "typeDesc": "按钮",
                            "jump": "product-productType-create",
                            "icon": "",
                            "sort": 0,
                            "isGranted": false,
                            "isSystem": false,
                            "systemId": null,
                            "systemName": null,
                            "systemDisplayName": null,
                            "child": [],
                            "path": "/product-productType-update"
                        },
                        {
                            "title": "编辑",
                            "code": "00010.00001.00001",
                            "id": "5246b100-b771-3637-f1f5-3a0791744c8e",
                            "parentId": "93c389da-e30f-c191-6813-3a06aa355162",
                            "type": 1,
                            "typeDesc": "按钮",
                            "jump": "product-productType-update",
                            "icon": "",
                            "sort": 0,
                            "isGranted": false,
                            "isSystem": false,
                            "systemId": null,
                            "systemName": null,
                            "systemDisplayName": null,
                            "child": [],
                            "path": "/product-productType-update"
                        },
                        {
                            "title": "删除",
                            "code": "00010.00001.00001",
                            "id": "5246b100-b771-3637-f1f5-3a0791744c8e",
                            "parentId": "93c389da-e30f-c191-6813-3a06aa355162",
                            "type": 1,
                            "typeDesc": "按钮",
                            "jump": "product-productType-delete",
                            "icon": "",
                            "sort": 0,
                            "isGranted": false,
                            "isSystem": false,
                            "systemId": null,
                            "systemName": null,
                            "systemDisplayName": null,
                            "child": [],
                            "path": "/product-productType-update"
                        },
                        {
                            "title": "导出",
                            "code": "00010.00001.00001",
                            "id": "5246b100-b771-3637-f1f5-3a0791744c8e",
                            "parentId": "93c389da-e30f-c191-6813-3a06aa355162",
                            "type": 1,
                            "typeDesc": "按钮",
                            "jump": "product-productType-exprot",
                            "icon": "",
                            "sort": 0,
                            "isGranted": false,
                            "isSystem": false,
                            "systemId": null,
                            "systemName": null,
                            "systemDisplayName": null,
                            "child": [],
                            "path": "/product-productType-update"
                        },
                    ],
                    "path": "/product"
                },
            ],
            "path": "/productOneLevel"
        },
        //入库管理
        {
            "title": "入库管理",
            "code": "00005",
            "id": "e8b5a17c-8f2e-e932-7c25-3a06aa355117",
            "parentId": null,
            "type": 0,
            "typeName": "Menu",
            "typeDesc": "菜单",
            "jump": "stockIn",
            "icon": "layui-icon-component",
            "sort": 72,
            "isGranted": false,
            "isGrantedText": "否",
            "isSystem": false,
            "isSystemText": "否",
            "systemId": null,
            "systemName": null,
            "systemDisplayName": null,
            // 菜单
            "child": [
                {
                    "title": "原材入库单",
                    "code": "00005.00002",
                    "id": "93736b5f-e3e4-b1d9-4d4b-3a0966b225de",
                    "parentId": "e8b5a17c-8f2e-e932-7c25-3a06aa355117",
                    "type": 0,
                    "typeDesc": "菜单",
                    "jump": "stockIn/YCstockIn/index",
                    "icon": "layui-icon-component",
                    "sort": 0,
                    "isGranted": false,
                    "isSystem": false,
                    "systemId": null,
                    "systemName": null,
                    "systemDisplayName": null,
                    // 按钮
                    "child": [
                        {
                            "title": "导出", //要改的东西
                            "code": "00005.00002.00001",
                            "id": "8387cee5-bcd6-a88f-60f5-3a096a3816d3",
                            "parentId": "93736b5f-e3e4-b1d9-4d4b-3a0966b225de",
                            "type": 1,
                            "typeDesc": "按钮",
                            "jump": "stockIn-YCstockIn-exprot",//要改的东西
                            "icon": null,
                            "sort": 0,
                            "isGranted": false,
                            "isSystem": false,
                            "systemId": null,
                            "systemName": null,
                            "systemDisplayName": null,
                            "child": [],
                            "path": "/stockIn-YCstockIn-exprot"//要改的东西
                        },
                    ],
                    "path": "/YCstockIn"
                },
                {
                    "title": "成品入库单",
                    "code": "00005.00003",
                    "id": "0d7d588b-34cf-ed27-95cf-3a096a607940",
                    "parentId": "e8b5a17c-8f2e-e932-7c25-3a06aa355117",
                    "type": 0,
                    "typeDesc": "菜单",
                    "jump": "stockIn/CPstockIn/index",
                    "icon": null,
                    "sort": 0,
                    "isGranted": false,
                    "isSystem": false,
                    "systemId": null,
                    "systemName": null,
                    "systemDisplayName": null,
                    "child": [
                        {
                            "title": "导出",
                            "code": "00005.00002.00001",
                            "id": "8387cee5-bcd6-a88f-60f5-3a096a3816d3",
                            "parentId": "93736b5f-e3e4-b1d9-4d4b-3a0966b225de",
                            "type": 1,
                            "typeDesc": "按钮",
                            "jump": "stockIn-YCstockIn-exprot",
                            "icon": null,
                            "sort": 0,
                            "isGranted": false,
                            "isSystem": false,
                            "systemId": null,
                            "systemName": null,
                            "systemDisplayName": null,
                            "child": [],
                            "path": "/stockIn-CPstockIn-exprot"
                        }
                    ],
                    "path": "/CPstockIn"
                },
                {
                    "title": "原材扫码记录",
                    "code": "00005.00001",
                    "id": "9fab740d-064d-7e2b-adae-3a06aa35511a",
                    "parentId": "e8b5a17c-8f2e-e932-7c25-3a06aa355117",
                    "type": 0,
                    "typeDesc": "菜单",
                    "jump": "stockIn/rawMaterial/index",
                    "icon": "layui-icon-component",
                    "sort": 1,
                    "isGranted": false,
                    "isSystem": false,
                    "systemId": null,
                    "systemName": null,
                    "systemDisplayName": null,
                    "child": [
                        {
                            "title": "导出",
                            "code": "00005.00001.00001",
                            "id": "2394c071-693d-ce15-7e27-3a08cc17ef63",
                            "parentId": "9fab740d-064d-7e2b-adae-3a06aa35511a",
                            "type": 1,
                            "typeDesc": "按钮",
                            "jump": "stockIn-rawMaterial-exprot",
                            "icon": "",
                            "sort": 0,
                            "isGranted": false,
                            "isSystem": false,
                            "systemId": null,
                            "systemName": null,
                            "systemDisplayName": null,
                            "child": [],
                            "path": "/stockIn-stockIntask-exprot"
                        }
                    ],
                    "path": "/stockIntask"
                },
                {
                    "title": "成品扫码记录",
                    "code": "00005.00001",
                    "id": "9fab740d-064d-7e2b-adae-3a06aa35511a",
                    "parentId": "e8b5a17c-8f2e-e932-7c25-3a06aa355117",
                    "type": 0,
                    "typeDesc": "菜单",
                    "jump": "stockIn/finishedProduct/index",
                    "icon": "layui-icon-component",
                    "sort": 1,
                    "isGranted": false,
                    "isSystem": false,
                    "systemId": null,
                    "systemName": null,
                    "systemDisplayName": null,
                    "child": [
                        {
                            "title": "导出",
                            "code": "00005.00001.00001",
                            "id": "2394c071-693d-ce15-7e27-3a08cc17ef63",
                            "parentId": "9fab740d-064d-7e2b-adae-3a06aa35511a",
                            "type": 1,
                            "typeDesc": "按钮",
                            "jump": "stockIn-finishedProduct-exprot",
                            "icon": "",
                            "sort": 0,
                            "isGranted": false,
                            "isSystem": false,
                            "systemId": null,
                            "systemName": null,
                            "systemDisplayName": null,
                            "child": [],
                            "path": "/stockIn-finishedProduct-exprot"
                        }
                    ],
                    "path": "/stockIntask"
                }

            ],
            "path": "/stockInOneLevel"
        },
        //出库管理
        {
            "title": "出库管理",
            "code": "00006",
            "id": "05eeca20-6926-2f3e-d108-3a06aa35511f",
            "parentId": null,
            "type": 0,
            "typeName": "Menu",
            "typeDesc": "菜单",
            "jump": "StockOut",
            "icon": "layui-icon-component",
            "sort": 73,
            "isGranted": false,
            "isGrantedText": "否",
            "isSystem": false,
            "isSystemText": "否",
            "systemId": null,
            "systemName": null,
            "systemDisplayName": null,
            "child": [
                {
                    "title": "原材出库单",
                    "code": "00006.00001",
                    "id": "bd7d4b9b-ba1f-61e4-c218-3a06aa355123",
                    "parentId": "05eeca20-6926-2f3e-d108-3a06aa35511f",
                    "type": 0,
                    "typeDesc": "菜单",
                    "jump": "stockOut/YCStockOut/index",
                    "icon": "layui-icon-component",
                    "sort": 1,
                    "isGranted": false,
                    "isSystem": false,
                    "systemId": null,
                    "systemName": null,
                    "systemDisplayName": null,
                    "child": [
                        {
                            "title": "创建其他出库单",
                            "code": "00010.00001.00001",
                            "id": "5246b100-b771-3637-f1f5-3a0791744c8e",
                            "parentId": "93c389da-e30f-c191-6813-3a06aa355162",
                            "type": 1,
                            "typeDesc": "按钮",
                            "jump": "stockOut-YCStockOut-create",
                            "icon": "",
                            "sort": 0,
                            "isGranted": false,
                            "isSystem": false,
                            "systemId": null,
                            "systemName": null,
                            "systemDisplayName": null,
                            "child": [],
                            "path": "/stockOut-YCStockOut-create"
                        },
                    ],
                    "path": "/YCStockOut"
                },
                {
                    "title": "成品出库单",
                    "code": "00006.00002",
                    "id": "6aff9098-c9a5-b9d9-df3e-3a06aa355127",
                    "parentId": "05eeca20-6926-2f3e-d108-3a06aa35511f",
                    "type": 0,
                    "typeDesc": "菜单",
                    "jump": "stockOut/CPstockOut/index",
                    "icon": "layui-icon-component",
                    "sort": 2,
                    "isGranted": false,
                    "isSystem": false,
                    "systemId": null,
                    "systemName": null,
                    "systemDisplayName": null,
                    "child": [
                        {
                            "title": "创建其他出库单",
                            "code": "00010.00001.00001",
                            "id": "5246b100-b771-3637-f1f5-3a0791744c8e",
                            "parentId": "93c389da-e30f-c191-6813-3a06aa355162",
                            "type": 1,
                            "typeDesc": "按钮",
                            "jump": "stockOut-CPstockOut-create",
                            "icon": "",
                            "sort": 0,
                            "isGranted": false,
                            "isSystem": false,
                            "systemId": null,
                            "systemName": null,
                            "systemDisplayName": null,
                            "child": [],
                            "path": "/stockOut-CPstockOut-create"
                        },
                    ],
                    "path": "/CPstockOut"
                },
            ],
            "path": "/StockOutOneLevel"
        },
        //库存管理
        {
            "title": "库存管理",
            "code": "00007",
            "id": "3e2dc9a3-53c4-624b-71f2-3a06aa355130",
            "parentId": null,
            "type": 0,
            "typeName": "Menu",
            "typeDesc": "菜单",
            "jump": "Stock",
            "icon": "layui-icon-component",
            "sort": 74,
            "isGranted": false,
            "isGrantedText": "否",
            "isSystem": false,
            "isSystemText": "否",
            "systemId": null,
            "systemName": null,
            "systemDisplayName": null,
            "child": [
                {
                    "title": "原材库存",
                    "code": "00007.00003",
                    "id": "588793ed-74e0-04fc-099d-3a06e233847b",
                    "parentId": "3e2dc9a3-53c4-624b-71f2-3a06aa355130",
                    "type": 0,
                    "typeDesc": "菜单",
                    "jump": "stock/YCStock/index",
                    "icon": "",
                    "sort": 0,
                    "isGranted": false,
                    "isSystem": false,
                    "systemId": null,
                    "systemName": null,
                    "systemDisplayName": null,
                    "child": [
                        {
                            "title": "导出",
                            "code": "00007.00001.00001",
                            "id": "694ba413-d480-5d3d-58d6-3a0827fe039a",
                            "parentId": "b9d82081-6da2-32d0-b432-3a06aa355135",
                            "type": 1,
                            "typeDesc": "按钮",
                            "jump": "stock-YCStock-exprot",
                            "icon": "",
                            "sort": 0,
                            "isGranted": false,
                            "isSystem": false,
                            "systemId": null,
                            "systemName": null,
                            "systemDisplayName": null,
                            "child": [],
                            "path": "/stock-YCStock-exprot"
                        },
                    ],
                    "path": "/YCStock"
                },
                {
                    "title": "成品库存",
                    "code": "00007.00001",
                    "id": "b9d82081-6da2-32d0-b432-3a06aa355135",
                    "parentId": "3e2dc9a3-53c4-624b-71f2-3a06aa355130",
                    "type": 0,
                    "typeDesc": "菜单",
                    "jump": "stock/CPStock/index",
                    "icon": "layui-icon-component",
                    "sort": 1,
                    "isGranted": false,
                    "isSystem": false,
                    "systemId": null,
                    "systemName": null,
                    "systemDisplayName": null,
                    "child": [
                        {
                            "title": "导出",
                            "code": "00007.00001.00001",
                            "id": "694ba413-d480-5d3d-58d6-3a0827fe039a",
                            "parentId": "b9d82081-6da2-32d0-b432-3a06aa355135",
                            "type": 1,
                            "typeDesc": "按钮",
                            "jump": "stock-CPStock-exprot",
                            "icon": "",
                            "sort": 0,
                            "isGranted": false,
                            "isSystem": false,
                            "systemId": null,
                            "systemName": null,
                            "systemDisplayName": null,
                            "child": [],
                            "path": "/stock-CPStock-exprot"
                        },

                    ],
                    "path": "/CPStock"
                },
                {
                    "title": "库存流水",
                    "code": "00007.00002",
                    "id": "812e3df5-0fdb-90f9-f3eb-3a06aa35513b",
                    "parentId": "3e2dc9a3-53c4-624b-71f2-3a06aa355130",
                    "type": 0,
                    "typeDesc": "菜单",
                    "jump": "stock/stockHistory/index",
                    "icon": "layui-icon-component",
                    "sort": 2,
                    "isGranted": false,
                    "isSystem": false,
                    "systemId": null,
                    "systemName": null,
                    "systemDisplayName": null,
                    "child": [
                        {
                            "title": "导出",
                            "code": "00007.00001.00001",
                            "id": "694ba413-d480-5d3d-58d6-3a0827fe039a",
                            "parentId": "b9d82081-6da2-32d0-b432-3a06aa355135",
                            "type": 1,
                            "typeDesc": "按钮",
                            "jump": "stock-stockHistory-exprot",
                            "icon": "",
                            "sort": 0,
                            "isGranted": false,
                            "isSystem": false,
                            "systemId": null,
                            "systemName": null,
                            "systemDisplayName": null,
                            "child": [],
                            "path": "/stock-stockHistory-exprot"
                        },
                    ],
                    "path": "/stockHistory"
                }
            ],
            "path": "/StockOneLevel"
        },
        //基础管理
        {
            "title": "基础管理",
            "code": "00011",
            "id": "12bfa9e3-ae48-55f2-a826-3a06aa355168",
            "parentId": null,
            "type": 0,
            "typeName": "Menu",
            "typeDesc": "菜单",
            "jump": "warehouse",
            "icon": "layui-icon-component",
            "sort": 78,
            "isGranted": false,
            "isGrantedText": "否",
            "isSystem": false,
            "isSystemText": "否",
            "systemId": null,
            "systemName": null,
            "systemDisplayName": null,
            "child": [
                {
                    "title": "仓库主档",
                    "code": "00011.00001",
                    "id": "2dd8063f-db50-1a6b-2344-3a06aa35516f",
                    "parentId": "12bfa9e3-ae48-55f2-a826-3a06aa355168",
                    "type": 0,
                    "typeDesc": "菜单",
                    "jump": "warehouse/warehouse/index",
                    "icon": "layui-icon-component",
                    "sort": 1,
                    "isGranted": false,
                    "isSystem": false,
                    "systemId": null,
                    "systemName": null,
                    "systemDisplayName": null,
                    "child": [
                        {
                            "title": "创建",
                            "code": "00011.00001.00001",
                            "id": "523941d1-33ee-1479-3b81-3a06aa355175",
                            "parentId": "2dd8063f-db50-1a6b-2344-3a06aa35516f",
                            "type": 1,
                            "typeDesc": "按钮",
                            "jump": "warehouse-warehouse-create",
                            "icon": null,
                            "sort": 1,
                            "isGranted": false,
                            "isSystem": false,
                            "systemId": null,
                            "systemName": null,
                            "systemDisplayName": null,
                            "child": [],
                            "path": "/warehouse-warehouse-create"
                        },
                        {
                            "title": "编辑",
                            "code": "00011.00001.00002",
                            "id": "2db7be46-2ca8-57d7-febf-3a06aa35517b",
                            "parentId": "2dd8063f-db50-1a6b-2344-3a06aa35516f",
                            "type": 1,
                            "typeDesc": "按钮",
                            "jump": "warehouse-warehouse-update",
                            "icon": null,
                            "sort": 1,
                            "isGranted": false,
                            "isSystem": false,
                            "systemId": null,
                            "systemName": null,
                            "systemDisplayName": null,
                            "child": [],
                            "path": "/warehouse-warehouse-update"
                        },
                        {
                            "title": "删除",
                            "code": "00011.00001.00003",
                            "id": "697a6d65-0a33-5ea3-3726-3a06aa355180",
                            "parentId": "2dd8063f-db50-1a6b-2344-3a06aa35516f",
                            "type": 1,
                            "typeDesc": "按钮",
                            "jump": "warehouse-warehouse-delete",
                            "icon": null,
                            "sort": 1,
                            "isGranted": false,
                            "isSystem": false,
                            "systemId": null,
                            "systemName": null,
                            "systemDisplayName": null,
                            "child": [],
                            "path": "/warehouse-warehouse-delete"
                        },
                        {
                            "title": "导出",
                            "code": "00011.00005.00004",
                            "id": "75f8894f-a8ee-a0db-0efb-3a06aa355215",
                            "parentId": "d17fb4f0-0e16-7e49-2c52-3a06aa3551fb",
                            "type": 1,
                            "typeDesc": "按钮",
                            "jump": "warehouse-warehouse-exprot",
                            "icon": null,
                            "sort": 4,
                            "isGranted": false,
                            "isSystem": false,
                            "systemId": null,
                            "systemName": null,
                            "systemDisplayName": null,
                            "child": [],
                            "path": "/warehouse-warehouse-exprot"
                        },
                    ],
                    "path": "/warehouse"
                },
                {
                    "title": "库位主档",
                    "code": "00011.00002",
                    "id": "71c40885-1ed5-1eda-46a2-3a06aa35519e",
                    "parentId": "12bfa9e3-ae48-55f2-a826-3a06aa355168",
                    "type": 0,
                    "typeDesc": "菜单",
                    "jump": "warehouse/area/index",
                    "icon": "layui-icon-component",
                    "sort": 2,
                    "isGranted": false,
                    "isSystem": false,
                    "systemId": null,
                    "systemName": null,
                    "systemDisplayName": null,
                    "child": [
                        {
                            "title": "创建",
                            "code": "00011.00002.00001",
                            "id": "292f96a8-267e-713a-6680-3a06aa3551ab",
                            "parentId": "71c40885-1ed5-1eda-46a2-3a06aa35519e",
                            "type": 1,
                            "typeDesc": "按钮",
                            "jump": "warehouse-area-create",
                            "icon": null,
                            "sort": 1,
                            "isGranted": false,
                            "isSystem": false,
                            "systemId": null,
                            "systemName": null,
                            "systemDisplayName": null,
                            "child": [],
                            "path": "/warehouse-area-create"
                        },
                        {
                            "title": "编辑",
                            "code": "00011.00002.00002",
                            "id": "38f0114f-879e-d81e-25c2-3a06aa3551b3",
                            "parentId": "71c40885-1ed5-1eda-46a2-3a06aa35519e",
                            "type": 1,
                            "typeDesc": "按钮",
                            "jump": "warehouse-area-update",
                            "icon": null,
                            "sort": 1,
                            "isGranted": false,
                            "isSystem": false,
                            "systemId": null,
                            "systemName": null,
                            "systemDisplayName": null,
                            "child": [],
                            "path": "/warehouse-area-update"
                        },
                        {
                            "title": "删除",
                            "code": "00011.00002.00003",
                            "id": "4afa546e-ec92-11bf-7808-3a06aa3551b8",
                            "parentId": "71c40885-1ed5-1eda-46a2-3a06aa35519e",
                            "type": 1,
                            "typeDesc": "按钮",
                            "jump": "warehouse-area-delete",
                            "icon": null,
                            "sort": 1,
                            "isGranted": false,
                            "isSystem": false,
                            "systemId": null,
                            "systemName": null,
                            "systemDisplayName": null,
                            "child": [],
                            "path": "/warehouse-area-delete"
                        },
                        {
                            "title": "导出",
                            "code": "00011.00005.00004",
                            "id": "75f8894f-a8ee-a0db-0efb-3a06aa355215",
                            "parentId": "d17fb4f0-0e16-7e49-2c52-3a06aa3551fb",
                            "type": 1,
                            "typeDesc": "按钮",
                            "jump": "warehouse-area-exprot",
                            "icon": null,
                            "sort": 4,
                            "isGranted": false,
                            "isSystem": false,
                            "systemId": null,
                            "systemName": null,
                            "systemDisplayName": null,
                            "child": [],
                            "path": "/warehouse-area-exprot"
                        },
                    ],
                    "path": "/area"
                },
                {
                    "title": "巷道主档",
                    "code": "00011.00003",
                    "id": "3eaebe61-7369-a402-3ced-3a06aa3551be",
                    "parentId": "12bfa9e3-ae48-55f2-a826-3a06aa355168",
                    "type": 0,
                    "typeDesc": "菜单",
                    "jump": "warehouse/roadway/index",
                    "icon": "layui-icon-component",
                    "sort": 3,
                    "isGranted": false,
                    "isSystem": false,
                    "systemId": null,
                    "systemName": null,
                    "systemDisplayName": null,
                    "child": [

                        {
                            "title": "创建",
                            "code": "00011.00003.00001",
                            "id": "6a3ec0b7-9f2e-dd72-bcb4-3a06aa3551c4",
                            "parentId": "3eaebe61-7369-a402-3ced-3a06aa3551be",
                            "type": 1,
                            "typeDesc": "按钮",
                            "jump": "warehouse-roaway-create",
                            "icon": null,
                            "sort": 1,
                            "isGranted": false,
                            "isSystem": false,
                            "systemId": null,
                            "systemName": null,
                            "systemDisplayName": null,
                            "child": [],
                            "path": "/warehouse-roaway-create"
                        },
                        {
                            "title": "编辑",
                            "code": "00011.00003.00002",
                            "id": "997285be-f363-c450-25f8-3a06aa3551cb",
                            "parentId": "3eaebe61-7369-a402-3ced-3a06aa3551be",
                            "type": 1,
                            "typeDesc": "按钮",
                            "jump": "warehouse-roaway-update",
                            "icon": null,
                            "sort": 1,
                            "isGranted": false,
                            "isSystem": false,
                            "systemId": null,
                            "systemName": null,
                            "systemDisplayName": null,
                            "child": [],
                            "path": "/warehouse-roaway-update"
                        },
                        {
                            "title": "删除",
                            "code": "00011.00003.00003",
                            "id": "5bd8fc31-68a3-888a-6431-3a06aa3551d0",
                            "parentId": "3eaebe61-7369-a402-3ced-3a06aa3551be",
                            "type": 1,
                            "typeDesc": "按钮",
                            "jump": "warehouse-roaway-delete",
                            "icon": null,
                            "sort": 1,
                            "isGranted": false,
                            "isSystem": false,
                            "systemId": null,
                            "systemName": null,
                            "systemDisplayName": null,
                            "child": [],
                            "path": "/warehouse-roaway-delete"
                        },
                        {
                            "title": "导出",
                            "code": "00011.00005.00004",
                            "id": "75f8894f-a8ee-a0db-0efb-3a06aa355215",
                            "parentId": "d17fb4f0-0e16-7e49-2c52-3a06aa3551fb",
                            "type": 1,
                            "typeDesc": "按钮",
                            "jump": "warehouse-roadway-exprot",
                            "icon": null,
                            "sort": 4,
                            "isGranted": false,
                            "isSystem": false,
                            "systemId": null,
                            "systemName": null,
                            "systemDisplayName": null,
                            "child": [],
                            "path": "/warehouse-roadway-exprot"
                        },
                    ],
                    "path": "/roadway"
                },
                {
                    "title": "原材栈板主档",
                    "code": "00011.00004",
                    "id": "8477325d-ec87-aa81-354c-3a06aa3551d5",
                    "parentId": "12bfa9e3-ae48-55f2-a826-3a06aa355168",
                    "type": 0,
                    "typeDesc": "菜单",
                    "jump": "warehouse/yczb/index",
                    "icon": "layui-icon-component",
                    "sort": 4,
                    "isGranted": false,
                    "isSystem": false,
                    "systemId": null,
                    "systemName": null,
                    "systemDisplayName": null,
                    "child": [
                        {
                            "title": "创建",
                            "code": "00011.00004.00001",
                            "id": "c288ee58-60e5-f642-d790-3a06aa3551dd",
                            "parentId": "8477325d-ec87-aa81-354c-3a06aa3551d5",
                            "type": 1,
                            "typeDesc": "按钮",
                            "jump": "warehouse-yczb-create",
                            "icon": null,
                            "sort": 1,
                            "isGranted": false,
                            "isSystem": false,
                            "systemId": null,
                            "systemName": null,
                            "systemDisplayName": null,
                            "child": [],
                            "path": "/warehouse-yczb-create"
                        },
                        {
                            "title": "编辑",
                            "code": "00011.00004.00002",
                            "id": "de1f58f2-4a45-83a9-148d-3a06aa3551e6",
                            "parentId": "8477325d-ec87-aa81-354c-3a06aa3551d5",
                            "type": 1,
                            "typeDesc": "按钮",
                            "jump": "warehouse-yczb-update",
                            "icon": null,
                            "sort": 2,
                            "isGranted": false,
                            "isSystem": false,
                            "systemId": null,
                            "systemName": null,
                            "systemDisplayName": null,
                            "child": [],
                            "path": "/warehouse-yczb-update"
                        },
                        {
                            "title": "删除",
                            "code": "00011.00004.00003",
                            "id": "f599be4d-5900-65e7-072d-3a06aa3551ef",
                            "parentId": "8477325d-ec87-aa81-354c-3a06aa3551d5",
                            "type": 1,
                            "typeDesc": "按钮",
                            "jump": "warehouse-yczb-delete",
                            "icon": null,
                            "sort": 3,
                            "isGranted": false,
                            "isSystem": false,
                            "systemId": null,
                            "systemName": null,
                            "systemDisplayName": null,
                            "child": [],
                            "path": "/warehouse-yczb-delete"
                        },
                        {
                            "title": "导出",
                            "code": "00010.00001.00001",
                            "id": "5246b100-b771-3637-f1f5-3a0791744c8e",
                            "parentId": "93c389da-e30f-c191-6813-3a06aa355162",
                            "type": 1,
                            "typeDesc": "按钮",
                            "jump": "warehouse-yczb-exprot",
                            "icon": "",
                            "sort": 0,
                            "isGranted": false,
                            "isSystem": false,
                            "systemId": null,
                            "systemName": null,
                            "systemDisplayName": null,
                            "child": [],
                            "path": "/warehouse-yczb-update"
                        },
                        // {
                        //     "title": "导入",
                        //     "code": "00011.00004.00004",
                        //     "id": "6fcd017f-a465-1eb1-a8fd-3a06aa3551f5",
                        //     "parentId": "8477325d-ec87-aa81-354c-3a06aa3551d5",
                        //     "type": 1,
                        //     "typeDesc": "按钮",
                        //     "jump": "warehouse-cargoLocation-improt",
                        //     "icon": null,
                        //     "sort": 4,
                        //     "isGranted": false,
                        //     "isSystem": false,
                        //     "systemId": null,
                        //     "systemName": null,
                        //     "systemDisplayName": null,
                        //     "child": [],
                        //     "path": "/warehouse-cargoLocation-improt"
                        // }
                    ],
                    "path": "/yczb"
                },
                {
                    "title": "成品托盘主档",
                    "code": "00011.00005",
                    "id": "d17fb4f0-0e16-7e49-2c52-3a06aa3551fb",
                    "parentId": "12bfa9e3-ae48-55f2-a826-3a06aa355168",
                    "type": 0,
                    "typeDesc": "菜单",
                    "jump": "warehouse/cppallet/index",
                    "icon": "layui-icon-component",
                    "sort": 5,
                    "isGranted": false,
                    "isSystem": false,
                    "systemId": null,
                    "systemName": null,
                    "systemDisplayName": null,
                    "child": [
                        {
                            "title": "创建",
                            "code": "00011.00005.00001",
                            "id": "79749a57-1254-113b-4011-3a06aa355201",
                            "parentId": "d17fb4f0-0e16-7e49-2c52-3a06aa3551fb",
                            "type": 1,
                            "typeDesc": "按钮",
                            "jump": "warehouse-cppallet-create",
                            "icon": null,
                            "sort": 1,
                            "isGranted": false,
                            "isSystem": false,
                            "systemId": null,
                            "systemName": null,
                            "systemDisplayName": null,
                            "child": [],
                            "path": "/warehouse-cppallet-create"
                        },
                        {
                            "title": "编辑",
                            "code": "00011.00005.00002",
                            "id": "1ba8d74f-f694-23a9-cb94-3a06aa35520a",
                            "parentId": "d17fb4f0-0e16-7e49-2c52-3a06aa3551fb",
                            "type": 1,
                            "typeDesc": "按钮",
                            "jump": "warehouse-cppallet-update",
                            "icon": null,
                            "sort": 2,
                            "isGranted": false,
                            "isSystem": false,
                            "systemId": null,
                            "systemName": null,
                            "systemDisplayName": null,
                            "child": [],
                            "path": "/warehouse-cppallet-update"
                        },
                        {
                            "title": "删除",
                            "code": "00011.00005.00003",
                            "id": "1bc9bc95-4687-1f29-1ea6-3a06aa35520f",
                            "parentId": "d17fb4f0-0e16-7e49-2c52-3a06aa3551fb",
                            "type": 1,
                            "typeDesc": "按钮",
                            "jump": "warehouse-cppallet-delete",
                            "icon": null,
                            "sort": 3,
                            "isGranted": false,
                            "isSystem": false,
                            "systemId": null,
                            "systemName": null,
                            "systemDisplayName": null,
                            "child": [],
                            "path": "/warehouse-cppallet-delete"
                        },
                        {
                            "title": "导出",
                            "code": "00011.00005.00004",
                            "id": "75f8894f-a8ee-a0db-0efb-3a06aa355215",
                            "parentId": "d17fb4f0-0e16-7e49-2c52-3a06aa3551fb",
                            "type": 1,
                            "typeDesc": "按钮",
                            "jump": "warehouse-cppallet-exprot",
                            "icon": null,
                            "sort": 4,
                            "isGranted": false,
                            "isSystem": false,
                            "systemId": null,
                            "systemName": null,
                            "systemDisplayName": null,
                            "child": [],
                            "path": "/warehouse-cppallet-exprot"
                        }
                    ],
                    "path": "/cppallet"
                },
                {
                    "title": "出入库点位主档",
                    "code": "00011.00006",
                    "id": "407e05bf-d160-e8cc-2e72-3a06aa35521b",
                    "parentId": "12bfa9e3-ae48-55f2-a826-3a06aa355168",
                    "type": 0,
                    "typeDesc": "菜单",
                    "jump": "warehouse/outinpoint/index",
                    "icon": "layui-icon-component",
                    "sort": 6,
                    "isGranted": false,
                    "isSystem": false,
                    "systemId": null,
                    "systemName": null,
                    "systemDisplayName": null,
                    "child": [
                        {
                            "title": "创建",
                            "code": "00011.00006.00001",
                            "id": "f2a4ca2e-bdbf-a42a-4ea2-3a06aa355223",
                            "parentId": "407e05bf-d160-e8cc-2e72-3a06aa35521b",
                            "type": 1,
                            "typeDesc": "按钮",
                            "jump": "warehouse-outinpoint-create",
                            "icon": null,
                            "sort": 1,
                            "isGranted": false,
                            "isSystem": false,
                            "systemId": null,
                            "systemName": null,
                            "systemDisplayName": null,
                            "child": [],
                            "path": "/warehouse-outinpoint-create"
                        },
                        {
                            "title": "编辑",
                            "code": "00011.00006.00002",
                            "id": "f1cd17c3-50ae-2a25-c286-3a06aa35522a",
                            "parentId": "407e05bf-d160-e8cc-2e72-3a06aa35521b",
                            "type": 1,
                            "typeDesc": "按钮",
                            "jump": "warehouse-outinpoint-update",
                            "icon": null,
                            "sort": 2,
                            "isGranted": false,
                            "isSystem": false,
                            "systemId": null,
                            "systemName": null,
                            "systemDisplayName": null,
                            "child": [],
                            "path": "/warehouse-outinpoint-update"
                        },
                        {
                            "title": "删除",
                            "code": "00011.00006.00003",
                            "id": "232f3baf-e9e7-ff0f-af38-3a06aa355233",
                            "parentId": "407e05bf-d160-e8cc-2e72-3a06aa35521b",
                            "type": 1,
                            "typeDesc": "按钮",
                            "jump": "warehouse-outinpoint-delete",
                            "icon": null,
                            "sort": 3,
                            "isGranted": false,
                            "isSystem": false,
                            "systemId": null,
                            "systemName": null,
                            "systemDisplayName": null,
                            "child": [],
                            "path": "/warehouse-outinpoint-delete"
                        },
                        {
                            "title": "导出",
                            "code": "00011.00005.00004",
                            "id": "75f8894f-a8ee-a0db-0efb-3a06aa355215",
                            "parentId": "d17fb4f0-0e16-7e49-2c52-3a06aa3551fb",
                            "type": 1,
                            "typeDesc": "按钮",
                            "jump": "warehouse-outinpoint-exprot",
                            "icon": null,
                            "sort": 4,
                            "isGranted": false,
                            "isSystem": false,
                            "systemId": null,
                            "systemName": null,
                            "systemDisplayName": null,
                            "child": [],
                            "path": "/warehouse-outinpoint-exprot"
                        },
                        // {
                        //     "title": "导入",
                        //     "code": "00011.00006.00004",
                        //     "id": "d6018e5e-7467-8b8a-90fd-3a06aa35523a",
                        //     "parentId": "407e05bf-d160-e8cc-2e72-3a06aa35521b",
                        //     "type": 1,
                        //     "typeDesc": "按钮",
                        //     "jump": "warehouse-point-exprot",
                        //     "icon": null,
                        //     "sort": 4,
                        //     "isGranted": false,
                        //     "isSystem": false,
                        //     "systemId": null,
                        //     "systemName": null,
                        //     "systemDisplayName": null,
                        //     "child": [],
                        //     "path": "/warehouse-point-exprot"
                        // }
                    ],
                    "path": "/outinpoint"
                },
                {
                    "title": "工作台",
                    "code": "00011.00007",
                    "id": "cb38ab67-0c48-9af8-7e4e-3a06aa355242",
                    "parentId": "12bfa9e3-ae48-55f2-a826-3a06aa355168",
                    "type": 0,
                    "typeDesc": "菜单",
                    "jump": "warehouse/station/index",
                    "icon": "layui-icon-component",
                    "sort": 7,
                    "isGranted": false,
                    "isSystem": false,
                    "systemId": null,
                    "systemName": null,
                    "systemDisplayName": null,
                    "child": [
                        {
                            "title": "创建",
                            "code": "00011.00007.00001",
                            "id": "a3d9c3c4-1c31-dccc-0660-3a06aa355249",
                            "parentId": "cb38ab67-0c48-9af8-7e4e-3a06aa355242",
                            "type": 1,
                            "typeDesc": "按钮",
                            "jump": "warehouse-station-create",
                            "icon": null,
                            "sort": 1,
                            "isGranted": false,
                            "isSystem": false,
                            "systemId": null,
                            "systemName": null,
                            "systemDisplayName": null,
                            "child": [],
                            "path": "/warehouse-station-create"
                        },
                        {
                            "title": "编辑",
                            "code": "00011.00007.00002",
                            "id": "2e8537ab-689d-9f78-bab1-3a06aa355250",
                            "parentId": "cb38ab67-0c48-9af8-7e4e-3a06aa355242",
                            "type": 1,
                            "typeDesc": "按钮",
                            "jump": "warehouse-station-update",
                            "icon": null,
                            "sort": 2,
                            "isGranted": false,
                            "isSystem": false,
                            "systemId": null,
                            "systemName": null,
                            "systemDisplayName": null,
                            "child": [],
                            "path": "/warehouse-station-update"
                        },
                        {
                            "title": "删除",
                            "code": "00011.00007.00003",
                            "id": "1ea94f05-c807-e805-fd5e-3a06aa355257",
                            "parentId": "cb38ab67-0c48-9af8-7e4e-3a06aa355242",
                            "type": 1,
                            "typeDesc": "按钮",
                            "jump": "warehouse-station-delete",
                            "icon": null,
                            "sort": 3,
                            "isGranted": false,
                            "isSystem": false,
                            "systemId": null,
                            "systemName": null,
                            "systemDisplayName": null,
                            "child": [],
                            "path": "/warehouse-station-delete"
                        }
                    ],
                    "path": "/station"
                },
                {
                    "title": "业务类型",
                    "code": "00011.00007",
                    "id": "cb38ab67-0c48-9af8-7e4e-3a06aa355242",
                    "parentId": "12bfa9e3-ae48-55f2-a826-3a06aa355168",
                    "type": 0,
                    "typeDesc": "菜单",
                    "jump": "warehouse/business/index",
                    "icon": "layui-icon-component",
                    "sort": 7,
                    "isGranted": false,
                    "isSystem": false,
                    "systemId": null,
                    "systemName": null,
                    "systemDisplayName": null,
                    "child": [
                        {
                            "title": "创建",
                            "code": "00011.00007.00001",
                            "id": "a3d9c3c4-1c31-dccc-0660-3a06aa355249",
                            "parentId": "cb38ab67-0c48-9af8-7e4e-3a06aa355242",
                            "type": 1,
                            "typeDesc": "按钮",
                            "jump": "warehouse-business-create",
                            "icon": null,
                            "sort": 1,
                            "isGranted": false,
                            "isSystem": false,
                            "systemId": null,
                            "systemName": null,
                            "systemDisplayName": null,
                            "child": [],
                            "path": "/warehouse-business-create"
                        },
                        {
                            "title": "编辑",
                            "code": "00011.00007.00002",
                            "id": "2e8537ab-689d-9f78-bab1-3a06aa355250",
                            "parentId": "cb38ab67-0c48-9af8-7e4e-3a06aa355242",
                            "type": 1,
                            "typeDesc": "按钮",
                            "jump": "warehouse-business-update",
                            "icon": null,
                            "sort": 2,
                            "isGranted": false,
                            "isSystem": false,
                            "systemId": null,
                            "systemName": null,
                            "systemDisplayName": null,
                            "child": [],
                            "path": "/warehouse-business-update"
                        },
                        {
                            "title": "删除",
                            "code": "00011.00007.00003",
                            "id": "1ea94f05-c807-e805-fd5e-3a06aa355257",
                            "parentId": "cb38ab67-0c48-9af8-7e4e-3a06aa355242",
                            "type": 1,
                            "typeDesc": "按钮",
                            "jump": "warehouse-business-delete",
                            "icon": null,
                            "sort": 3,
                            "isGranted": false,
                            "isSystem": false,
                            "systemId": null,
                            "systemName": null,
                            "systemDisplayName": null,
                            "child": [],
                            "path": "/warehouse-business-delete"
                        }
                    ],
                    "path": "/business"
                },
            ],
            "path": "/warehouseOneLevel"
        },
        //身份管理
        {
            "title": "身份管理",
            "code": "00013",
            "id": "e4820a33-6bb4-8e1f-5a48-3a06aa355294",
            "parentId": null,
            "type": 0,
            "typeName": "Menu",
            "typeDesc": "菜单",
            "jump": "user",
            "icon": "layui-icon-component",
            "sort": 79,
            "isGranted": false,
            "isGrantedText": "否",
            "isSystem": false,
            "isSystemText": "否",
            "systemId": null,
            "systemName": null,
            "systemDisplayName": null,
            "child": [
                {
                    "title": "用户管理",
                    "code": "00013.00001",
                    "id": "592cfa11-20b2-46d6-922c-3a06aa35529f",
                    "parentId": "e4820a33-6bb4-8e1f-5a48-3a06aa355294",
                    "type": 0,
                    "typeDesc": "菜单",
                    "jump": "user/user/index",
                    "icon": "layui-icon-component",
                    "sort": 1,
                    "isGranted": false,
                    "isSystem": false,
                    "systemId": null,
                    "systemName": null,
                    "systemDisplayName": null,
                    "child": [
                        {
                            "title": "创建",
                            "code": "00013.00001.00001",
                            "id": "8c69dc8c-7221-bfb5-46b5-3a06aa3552a9",
                            "parentId": "592cfa11-20b2-46d6-922c-3a06aa35529f",
                            "type": 1,
                            "typeDesc": "按钮",
                            "jump": "identity-user-create",
                            "icon": null,
                            "sort": 1,
                            "isGranted": false,
                            "isSystem": false,
                            "systemId": null,
                            "systemName": null,
                            "systemDisplayName": null,
                            "child": [],
                            "path": "/identity-user-create"
                        },
                        {
                            "title": "编辑",
                            "code": "00013.00001.00002",
                            "id": "a77f73c4-34c7-5490-ff6e-3a06aa3552b0",
                            "parentId": "592cfa11-20b2-46d6-922c-3a06aa35529f",
                            "type": 1,
                            "typeDesc": "按钮",
                            "jump": "identity-user-update",
                            "icon": null,
                            "sort": 1,
                            "isGranted": false,
                            "isSystem": false,
                            "systemId": null,
                            "systemName": null,
                            "systemDisplayName": null,
                            "child": [],
                            "path": "/identity-user-update"
                        },
                        {
                            "title": "删除",
                            "code": "00013.00001.00003",
                            "id": "e3ebc584-3c90-3445-856c-3a06aa3552b7",
                            "parentId": "592cfa11-20b2-46d6-922c-3a06aa35529f",
                            "type": 1,
                            "typeDesc": "按钮",
                            "jump": "identity-user-delete",
                            "icon": null,
                            "sort": 1,
                            "isGranted": false,
                            "isSystem": false,
                            "systemId": null,
                            "systemName": null,
                            "systemDisplayName": null,
                            "child": [],
                            "path": "/identity-user-delete"
                        }
                    ],
                    "path": "/user"
                },
                {
                    "title": "角色管理",
                    "code": "00013.00002",
                    "id": "fc6c327b-1b78-4c02-875a-3a06aa3552c0",
                    "parentId": "e4820a33-6bb4-8e1f-5a48-3a06aa355294",
                    "type": 0,
                    "typeDesc": "菜单",
                    "jump": "user/role/index",
                    "icon": "layui-icon-component",
                    "sort": 2,
                    "isGranted": false,
                    "isSystem": false,
                    "systemId": null,
                    "systemName": null,
                    "systemDisplayName": null,
                    "child": [
                        {
                            "title": "创建",
                            "code": "00013.00002.00001",
                            "id": "e827a461-c3db-1e42-f658-3a06aa3552c7",
                            "parentId": "fc6c327b-1b78-4c02-875a-3a06aa3552c0",
                            "type": 1,
                            "typeDesc": "按钮",
                            "jump": "identity-role-create",
                            "icon": null,
                            "sort": 1,
                            "isGranted": false,
                            "isSystem": false,
                            "systemId": null,
                            "systemName": null,
                            "systemDisplayName": null,
                            "child": [],
                            "path": "/identity-role-create"
                        },
                        {
                            "title": "编辑",
                            "code": "00013.00002.00002",
                            "id": "f6993589-5f3b-b48f-24b9-3a06aa3552cf",
                            "parentId": "fc6c327b-1b78-4c02-875a-3a06aa3552c0",
                            "type": 1,
                            "typeDesc": "按钮",
                            "jump": "identity-role-update",
                            "icon": null,
                            "sort": 1,
                            "isGranted": false,
                            "isSystem": false,
                            "systemId": null,
                            "systemName": null,
                            "systemDisplayName": null,
                            "child": [],
                            "path": "/identity-role-update"
                        },
                        {
                            "title": "删除",
                            "code": "00013.00002.00003",
                            "id": "58597d9d-ba38-8e26-930b-3a06aa3552d7",
                            "parentId": "fc6c327b-1b78-4c02-875a-3a06aa3552c0",
                            "type": 1,
                            "typeDesc": "按钮",
                            "jump": "identity-role-delete",
                            "icon": null,
                            "sort": 1,
                            "isGranted": false,
                            "isSystem": false,
                            "systemId": null,
                            "systemName": null,
                            "systemDisplayName": null,
                            "child": [],
                            "path": "/identity-role-delete"
                        }
                    ],
                    "path": "/role"
                },
                {
                    "title": "组织管理",
                    "code": "00013.00003",
                    "id": "3317fad7-c23f-4ab7-9767-3a06aa3552de",
                    "parentId": "e4820a33-6bb4-8e1f-5a48-3a06aa355294",
                    "type": 0,
                    "typeDesc": "菜单",
                    "jump": "user/ou/index",
                    "icon": "layui-icon-component",
                    "sort": 3,
                    "isGranted": false,
                    "isSystem": false,
                    "systemId": null,
                    "systemName": null,
                    "systemDisplayName": null,
                    "child": [
                        {
                            "title": "创建",
                            "code": "00013.00003.00001",
                            "id": "a29e9da6-0beb-6034-2c98-3a06aa3552e6",
                            "parentId": "3317fad7-c23f-4ab7-9767-3a06aa3552de",
                            "type": 1,
                            "typeDesc": "按钮",
                            "jump": "identity-ou-create",
                            "icon": null,
                            "sort": 1,
                            "isGranted": false,
                            "isSystem": false,
                            "systemId": null,
                            "systemName": null,
                            "systemDisplayName": null,
                            "child": [],
                            "path": "/identity-ou-create"
                        },
                        {
                            "title": "编辑",
                            "code": "00013.00003.00002",
                            "id": "91c77e6e-c390-0664-1065-3a06aa3552f1",
                            "parentId": "3317fad7-c23f-4ab7-9767-3a06aa3552de",
                            "type": 1,
                            "typeDesc": "按钮",
                            "jump": "identity-ou-update",
                            "icon": null,
                            "sort": 1,
                            "isGranted": false,
                            "isSystem": false,
                            "systemId": null,
                            "systemName": null,
                            "systemDisplayName": null,
                            "child": [],
                            "path": "/identity-ou-update"
                        },
                        {
                            "title": "删除",
                            "code": "00013.00003.00003",
                            "id": "a2c45c9a-6525-7642-94fb-3a06aa3552fa",
                            "parentId": "3317fad7-c23f-4ab7-9767-3a06aa3552de",
                            "type": 1,
                            "typeDesc": "按钮",
                            "jump": "identity-ou-delete",
                            "icon": null,
                            "sort": 1,
                            "isGranted": false,
                            "isSystem": false,
                            "systemId": null,
                            "systemName": null,
                            "systemDisplayName": null,
                            "child": [],
                            "path": "/identity-ou-delete"
                        }
                    ],
                    "path": "/ou"
                }
            ],
            "path": "/userOneLevel"
        },
        // 基础信息管理
        {
            "title": "基础信息管理",
            "code": "00012",
            "id": "03485453-e2b8-f8df-0ce8-3a06aa355262",
            "parentId": null,
            "type": 0,
            "typeName": "Menu",
            "typeDesc": "菜单",
            "jump": "public",
            "icon": "layui-icon-component",
            "sort": 79,
            "isGranted": false,
            "isGrantedText": "否",
            "isSystem": false,
            "isSystemText": "否",
            "systemId": null,
            "systemName": null,
            "systemDisplayName": null,
            "child": [
                {
                    "title": "字典管理",
                    "code": "00012.00001",
                    "id": "dea9394c-0660-6d66-7a52-3a06aa355269",
                    "parentId": "03485453-e2b8-f8df-0ce8-3a06aa355262",
                    "type": 0,
                    "typeDesc": "菜单",
                    "jump": "public/dictionaries/index",
                    "icon": "layui-icon-component",
                    "sort": 1,
                    "isGranted": false,
                    "isSystem": false,
                    "systemId": null,
                    "systemName": null,
                    "systemDisplayName": null,
                    "child": [
                        {
                            "title": "编辑",
                            "code": "00012.00001.00002",
                            "id": "4e496f2c-72d7-caa5-ede4-3a06aa35527a",
                            "parentId": "dea9394c-0660-6d66-7a52-3a06aa355269",
                            "type": 1,
                            "typeDesc": "按钮",
                            "jump": "public-dictionaries-update",
                            "icon": null,
                            "sort": 1,
                            "isGranted": false,
                            "isSystem": false,
                            "systemId": null,
                            "systemName": null,
                            "systemDisplayName": null,
                            "child": [],
                            "path": "/public-dictionaries-update"
                        },
                        {
                            "title": "删除",
                            "code": "00012.00001.00003",
                            "id": "491120df-a922-ecdb-83ac-3a06aa355282",
                            "parentId": "dea9394c-0660-6d66-7a52-3a06aa355269",
                            "type": 1,
                            "typeDesc": "按钮",
                            "jump": "public-dictionaries-delete",
                            "icon": null,
                            "sort": 1,
                            "isGranted": false,
                            "isSystem": false,
                            "systemId": null,
                            "systemName": null,
                            "systemDisplayName": null,
                            "child": [],
                            "path": "/public-dictionaries-delete"
                        },
                        {
                            "title": "创建",
                            "code": "00012.00001.00001",
                            "id": "bddfaec8-0d02-5e8a-215d-3a06aa355272",
                            "parentId": "dea9394c-0660-6d66-7a52-3a06aa355269",
                            "type": 1,
                            "typeDesc": "按钮",
                            "jump": "public-dictionaries-create",
                            "icon": null,
                            "sort": 2,
                            "isGranted": false,
                            "isSystem": false,
                            "systemId": null,
                            "systemName": null,
                            "systemDisplayName": null,
                            "child": [],
                            "path": "/public-dictionaries-create"
                        }
                    ],
                    "path": "/dictionaries"
                },

            ],
            "path": "/publicOneLevel"
        },
        //菜单管理
        {
            "title": "菜单管理",
            "code": "00022",
            "id": "d2a338f8-6eb7-25d9-9a49-3a09667e9313",
            "parentId": null,
            "type": 0,
            "typeName": "Menu",
            "typeDesc": "菜单",
            "jump": "system",
            "icon": null,
            "sort": 80,
            "isGranted": false,
            "isGrantedText": "否",
            "isSystem": false,
            "isSystemText": "否",
            "systemId": null,
            "systemName": null,
            "systemDisplayName": null,
            "child": [
                {
                    "title": "菜单管理",
                    "code": "00022.00002",
                    "id": "a3ef28a7-0305-6939-0087-3a0966821c8e",
                    "parentId": "d2a338f8-6eb7-25d9-9a49-3a09667e9313",
                    "type": 0,
                    "typeDesc": "菜单",
                    "jump": "system/menu/index",
                    "icon": null,
                    "sort": 0,
                    "isGranted": false,
                    "isSystem": false,
                    "systemId": null,
                    "systemName": null,
                    "systemDisplayName": null,
                    "child": [
                        {
                            "title": "创建",
                            "code": "00022.00002.00001",
                            "id": "e7c3b6ad-7007-c9ef-9c7f-3a0966828ce3",
                            "parentId": "a3ef28a7-0305-6939-0087-3a0966821c8e",
                            "type": 1,
                            "typeDesc": "按钮",
                            "jump": "identity-menu-create",
                            "icon": null,
                            "sort": 0,
                            "isGranted": false,
                            "isSystem": false,
                            "systemId": null,
                            "systemName": null,
                            "systemDisplayName": null,
                            "child": [],
                            "path": "/identity-menu-create"
                        },
                        {
                            "title": "编辑",
                            "code": "00022.00002.00002",
                            "id": "c27fc07c-a9dc-c8db-fc82-3a096682c2cb",
                            "parentId": "a3ef28a7-0305-6939-0087-3a0966821c8e",
                            "type": 1,
                            "typeDesc": "按钮",
                            "jump": "identity-menu-update",
                            "icon": null,
                            "sort": 0,
                            "isGranted": false,
                            "isSystem": false,
                            "systemId": null,
                            "systemName": null,
                            "systemDisplayName": null,
                            "child": [],
                            "path": "/identity-menu-update"
                        },
                        {
                            "title": "删除",
                            "code": "00022.00002.00003",
                            "id": "30423829-ad48-fc19-f91b-3a096682f57b",
                            "parentId": "a3ef28a7-0305-6939-0087-3a0966821c8e",
                            "type": 1,
                            "typeDesc": "按钮",
                            "jump": "identity-menu-delete",
                            "icon": null,
                            "sort": 0,
                            "isGranted": false,
                            "isSystem": false,
                            "systemId": null,
                            "systemName": null,
                            "systemDisplayName": null,
                            "child": [],
                            "path": "/identity-menu-delete"
                        }
                    ],
                    "path": "/menu"
                }
            ],
            "path": "/systemOneLevel"
        },
        //配置管理
        {
            "title": "配置管理",
            "code": "00014",
            "id": "76a09028-3ccc-95ff-a984-3a06aa355304",
            "parentId": null,
            "type": 0,
            "typeName": "Menu",
            "typeDesc": "菜单",
            "jump": "config",
            "icon": "layui-icon-component",
            "sort": 80,
            "isGranted": false,
            "isGrantedText": "否",
            "isSystem": false,
            "isSystemText": "否",
            "systemId": null,
            "systemName": null,
            "systemDisplayName": null,
            "child": [
                {
                    "title": "系统设置",
                    "code": "00014.00002",
                    "id": "78f5d1d4-ed65-7b58-f499-3a0768fd6dfe",
                    "parentId": "76a09028-3ccc-95ff-a984-3a06aa355304",
                    "type": 0,
                    "typeDesc": "菜单",
                    "jump": "config/JHConfig/index",
                    "icon": "",
                    "sort": 0,
                    "isGranted": false,
                    "isSystem": false,
                    "systemId": null,
                    "systemName": null,
                    "systemDisplayName": null,
                    "child": [],
                    "path": "/JHConfig"
                },
                {
                    "title": "出入库点位配置",
                    "code": "00014.00001",
                    "id": "c7e60d77-2866-6a17-2d7f-3a06aa35530f",
                    "parentId": "76a09028-3ccc-95ff-a984-3a06aa355304",
                    "type": 0,
                    "typeDesc": "菜单",
                    "jump": "config/outInConfig/index",
                    "icon": "layui-icon-component",
                    "sort": 1,
                    "isGranted": false,
                    "isSystem": false,
                    "systemId": null,
                    "systemName": null,
                    "systemDisplayName": null,
                    "child": [
                        {
                            "title": "创建",
                            "code": "00014.00001.00001",
                            "id": "ea1375a5-3eab-5a28-7da9-3a06aa35531c",
                            "parentId": "c7e60d77-2866-6a17-2d7f-3a06aa35530f",
                            "type": 1,
                            "typeDesc": "按钮",
                            "jump": "config-outInConfig-create",
                            "icon": null,
                            "sort": 1,
                            "isGranted": false,
                            "isSystem": false,
                            "systemId": null,
                            "systemName": null,
                            "systemDisplayName": null,
                            "child": [],
                            "path": "/config-outInConfig-create"
                        },
                        {
                            "title": "编辑",
                            "code": "00014.00001.00002",
                            "id": "d2089e62-c4e0-a155-60d4-3a06aa355324",
                            "parentId": "c7e60d77-2866-6a17-2d7f-3a06aa35530f",
                            "type": 1,
                            "typeDesc": "按钮",
                            "jump": "config-outInConfig-update",
                            "icon": null,
                            "sort": 1,
                            "isGranted": false,
                            "isSystem": false,
                            "systemId": null,
                            "systemName": null,
                            "systemDisplayName": null,
                            "child": [],
                            "path": "/config-outInConfig-update"
                        },
                        {
                            "title": "删除",
                            "code": "00014.00001.00003",
                            "id": "7c9b6af6-914f-8625-9987-3a06aa35532b",
                            "parentId": "c7e60d77-2866-6a17-2d7f-3a06aa35530f",
                            "type": 1,
                            "typeDesc": "按钮",
                            "jump": "config-outInConfig-delete",
                            "icon": null,
                            "sort": 1,
                            "isGranted": false,
                            "isSystem": false,
                            "systemId": null,
                            "systemName": null,
                            "systemDisplayName": null,
                            "child": [],
                            "path": "/config-outInConfig-delete"
                        }
                    ],
                    "path": "/outInConfig"
                }
            ],
            "path": "/configOneLevel"
        },
        //事务管理
        {
            "title": "事务管理",//要改的东西 第一层
            "code": "00007",
            "id": "3e2dc9a3-53c4-624b-71f2-3a06aa355130",
            "parentId": null,
            "type": 0,
            "typeName": "Menu",//要改的东西 第一层
            "typeDesc": "菜单",
            "jump": "logManagement",//要改的东西 第一层 格式：（ xx  +  Management）
            "icon": "layui-icon-component",
            "sort": 74,
            "isGranted": false,
            "isGrantedText": "否",
            "isSystem": false,
            "isSystemText": "否",
            "systemId": null,
            "systemName": null,
            "systemDisplayName": null,
            "child": [
                {
                    "title": "异常信息",
                    "code": "00007.00003",
                    "id": "588793ed-74e0-04fc-099d-3a06e233847b",
                    "parentId": "3e2dc9a3-53c4-624b-71f2-3a06aa355130",
                    "type": 0,
                    "typeDesc": "菜单",
                    "jump": "logManagement/exceptionMSG/index",
                    "icon": "",
                    "sort": 0,
                    "isGranted": false,
                    "isSystem": false,
                    "systemId": null,
                    "systemName": null,
                    "systemDisplayName": null,
                    "child": [
                        {
                            "title": "导出",
                            "code": "00007.00001.00001",
                            "id": "694ba413-d480-5d3d-58d6-3a0827fe039a",
                            "parentId": "b9d82081-6da2-32d0-b432-3a06aa355135",
                            "type": 1,
                            "typeDesc": "按钮",
                            "jump": "logManagement-exceptionMSG-exprot",
                            "icon": "",
                            "sort": 0,
                            "isGranted": false,
                            "isSystem": false,
                            "systemId": null,
                            "systemName": null,
                            "systemDisplayName": null,
                            "child": [],
                            "path": "/logManagement-exceptionMSG-exprot"
                        },
                    ],
                    "path": "/exceptionMSG"
                },
                {
                    "title": "登录日志",
                    "code": "00007.00001",
                    "id": "b9d82081-6da2-32d0-b432-3a06aa355135",
                    "parentId": "3e2dc9a3-53c4-624b-71f2-3a06aa355130",
                    "type": 0,
                    "typeDesc": "菜单",
                    "jump": "logManagement/systemLog/index",
                    "icon": "layui-icon-component",
                    "sort": 1,
                    "isGranted": false,
                    "isSystem": false,
                    "systemId": null,
                    "systemName": null,
                    "systemDisplayName": null,
                    "child": [
                        {
                            "title": "导出",
                            "code": "00007.00001.00001",
                            "id": "694ba413-d480-5d3d-58d6-3a0827fe039a",
                            "parentId": "b9d82081-6da2-32d0-b432-3a06aa355135",
                            "type": 1,
                            "typeDesc": "按钮",
                            "jump": "logManagement-systemLog-exprot",
                            "icon": "",
                            "sort": 0,
                            "isGranted": false,
                            "isSystem": false,
                            "systemId": null,
                            "systemName": null,
                            "systemDisplayName": null,
                            "child": [],
                            "path": "/stock-systemLog-exprot"
                        },

                    ],
                    "path": "/systemLog"
                },
                {
                    "title": "使用日志",
                    "code": "00007.00002",
                    "id": "812e3df5-0fdb-90f9-f3eb-3a06aa35513b",
                    "parentId": "3e2dc9a3-53c4-624b-71f2-3a06aa355130",
                    "type": 0,
                    "typeDesc": "菜单",
                    "jump": "logManagement/useLog/index",
                    "icon": "layui-icon-component",
                    "sort": 2,
                    "isGranted": false,
                    "isSystem": false,
                    "systemId": null,
                    "systemName": null,
                    "systemDisplayName": null,
                    "child": [
                        {
                            "title": "导出",
                            "code": "00007.00001.00001",
                            "id": "694ba413-d480-5d3d-58d6-3a0827fe039a",
                            "parentId": "b9d82081-6da2-32d0-b432-3a06aa355135",
                            "type": 1,
                            "typeDesc": "按钮",
                            "jump": "logManagement-useLog-exprot",
                            "icon": "",
                            "sort": 0,
                            "isGranted": false,
                            "isSystem": false,
                            "systemId": null,
                            "systemName": null,
                            "systemDisplayName": null,
                            "child": [],
                            "path": "/logManagement-useLog-exprot"
                        },
                    ],
                    "path": "/useLog"
                },
                {
                    "title": "任务管理",
                    "code": "00007.00002",
                    "id": "812e3df5-0fdb-90f9-f3eb-3a06aa35513b",
                    "parentId": "3e2dc9a3-53c4-624b-71f2-3a06aa355130",
                    "type": 0,
                    "typeDesc": "菜单",
                    "jump": "logManagement/wcsTask/index",
                    "icon": "layui-icon-component",
                    "sort": 2,
                    "isGranted": false,
                    "isSystem": false,
                    "systemId": null,
                    "systemName": null,
                    "systemDisplayName": null,
                    "child": [
                        {
                            "title": "申请巷道",
                            "code": "00007.00001.00001",
                            "id": "694ba413-d480-5d3d-58d6-3a0827fe039a",
                            "parentId": "b9d82081-6da2-32d0-b432-3a06aa355135",
                            "type": 1,
                            "typeDesc": "按钮",
                            "jump": "logManagement-wcsTask-applyFor",
                            "icon": "",
                            "sort": 0,
                            "isGranted": false,
                            "isSystem": false,
                            "systemId": null,
                            "systemName": null,
                            "systemDisplayName": null,
                            "child": [],
                            "path": "/logManagement-wcsTask-applyFor"
                        },
                        {
                            "title": "申请库位",
                            "code": "00007.00001.00001",
                            "id": "694ba413-d480-5d3d-58d6-3a0827fe039a",
                            "parentId": "b9d82081-6da2-32d0-b432-3a06aa355135",
                            "type": 1,
                            "typeDesc": "按钮",
                            "jump": "logManagement-wcsTask-cargo",
                            "icon": "",
                            "sort": 0,
                            "isGranted": false,
                            "isSystem": false,
                            "systemId": null,
                            "systemName": null,
                            "systemDisplayName": null,
                            "child": [],
                            "path": "/logManagement-wcsTask-cargo"
                        },
                        {
                            "title": "任务完成",
                            "code": "00007.00001.00001",
                            "id": "694ba413-d480-5d3d-58d6-3a0827fe039a",
                            "parentId": "b9d82081-6da2-32d0-b432-3a06aa355135",
                            "type": 1,
                            "typeDesc": "按钮",
                            "jump": "logManagement-wcsTask-taskYES",
                            "icon": "",
                            "sort": 0,
                            "isGranted": false,
                            "isSystem": false,
                            "systemId": null,
                            "systemName": null,
                            "systemDisplayName": null,
                            "child": [],
                            "path": "/logManagement-wcsTask-taskYES"
                        },

                    ],
                    "path": "/wcsTask"
                },
            ],
            "path": "/StockOneLevel"//要改的东西 第一层 格式：（ xx  +  OneLevel
        },
    ]
}

export default json
