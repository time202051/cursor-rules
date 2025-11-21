// 用来控制按钮的显示
export function hasBtn(_this) {
    let wms = JSON.parse(localStorage.getItem('wms'))
    let SET_MENUS = null
    if (wms) SET_MENUS = wms.SET_MENUS
    const menus = SET_MENUS  //菜单数据源
    let menuList = handleMenu(menus, _this, [])
    menuList.forEach(item => {
        const arr = item.jump.split('-')
        const temp = arr[arr.length - 1]
        item.method = this[temp]
    });
    
    return menuList.filter(item => item.title !== '查看')
}

export function handleMenu(arr, _this) {
    return arr.reduce((pre, cur) => {
        if (cur.path === _this.$route.path) {
            pre.push(...cur.child)
        } else if (cur.child.length > 0 && cur.type != 1) {
            pre.push(...handleMenu(cur.child, _this))
        }
        return pre
    }, [])
}
