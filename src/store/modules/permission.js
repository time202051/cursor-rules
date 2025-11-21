import {
  asyncRoutes,
  constantRoutes
} from '@/router'
import {
  getRoutes
} from '@/api/login/login'
import Layout from '@/layout'
// import menusLIST from '../menus.js'
// console.log(menusLIST, 'menusLISTmenusLISTmenusLIST')
/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
// export function filterAsyncRoutes(routes, roles) {
//   const res = []

//   routes.forEach(route => {
//     const tmp = { ...route }
//     if (hasPermission(roles, tmp)) {
//       if (tmp.child) {
//         tmp.child = filterAsyncRoutes(tmp.child, roles)
//       }
//       res.push(tmp)
//     }
//   })

//   return res
// }
export function filterAsyncRoutes(routes, roles) {
  return routes.filter(route => {
    if (route.component) {
      // Layout组件特殊处理
      if (route.component === 'Layout') {
        route.component = Layout
      } else {
        route.component = loadView(route.component)
      }
    } else {
      if (route.component == null) {
        route.component = loadView('error-page/404')
      }
    }
    if (route.children != null && route.children && route.children.length > 0) {
      route.children = filterAsyncRoutes(route.children)
    }
    return true
  })
}

function factory(data) {
  if (!data || data.length <= 0) return []
  return data.filter(e => {
    if (e.child && e.child.length > 0) {
      e.child = factory(e.child)
    }
    return e.type === 0
  })
}

function handleMun(routes, layer = 1) {
  let temp = []
  let obj = {}
  let icon = 'el-icon-star-off'
  let icons = 'layui-icon-component'
  routes.forEach(item => {

    if (!item.parentId && item.child.length <= 0) {
      obj = {
        layer: layer,
        icon: item.icon ? item.icon == icons ? icon : item.icon : icon,
        name: item.title,
        redirect: (item.child.length > 0) ? item.child[0].menuUrl : '/404',
        path: pathView(item.jump) + 'OneLevel',
        component: 'Layout',
        type: item.type,
        children: [{
          path: pathView(item.jump) + 'OneLevel',
          component: item.jump,
          name: item.title,
          icon: item.icon ? item.icon == icons ? icon : item.icon : icon,
          meta: {
            title: item.title,
            noCache: true,
            name: pathNameView(item.jump)
          }
        }],
        meta: {
          title: item.title,
          icon: item.icon ? item.icon == icons ? icon : item.icon : icon,
          noCache: true,
          pathFlage: true
        }
      }
    } else {
      obj = {
        layer: layer,
        icon: item.icon ? item.icon == icons ? icon : item.icon : icon,
        name: item.title,
        path: layer == 1 ? pathView(item.jump) + 'OneLevel' : pathView(item.jump),
        component: layer == 1 ? 'Layout' : item.jump,
        type: item.type,
        meta: {
          noCache: true,
          title: item.title,
          name: pathNameView(item.jump),
          pathFlage: layer == 1 ? true : '',
          keepAlive: true
        },
      }
      if (item.child.length > 0) {
        obj.children = handleMun(item.child, layer + 1)
      }
    }
    temp.push(obj)
  })
  // console.log(temp, 'temo')
  return temp
}
export const loadView = (view) => { // 路由懒加载
  // 取当前components文件下的所有所有的文件
  const requireComponent = require.context('../../view', true, /^\.\/(\w*\/)+index\.vue$/)
  let path = (resolve) => require([`@/views/${'error-page/404'}.vue`], resolve)
  requireComponent.keys().forEach(filename => {
    // 截取路径
    const reqComName = filename.replace(/\.\/(.*)\.vue/, '$1')

    if (reqComName == view) {
      return path = (resolve) => require([`@/view/${view}.vue`], resolve)
    }
  })
  return path
}
export const pathView = (view) => { // 截取路由
  if (!view) return ''
  const arr = view.split('/')
  const temp = arr.length <= 1 ? '/' + arr[arr.length - 1] : '/' + arr[1]
  // const temp = '/' + arr[arr.length - 1]
  return temp
}
export const pathNameView = (view) => { // 组成组件名字
  if (!view) return ''
  const arr = view.split('/')
  const temp = arr.length <= 1 ? arr[arr.length - 1] : arr[1]
  return temp + 'Management'
}
const state = {
  routes: [],
  addRoutes: [],
  menus: []
}
let  testFlage = true
const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    if (!testFlage) return state.routes = routes;
    let temprouter = constantRoutes.concat(routes)
    // console.log(temprouter,'temprouter')
    temprouter.forEach(item=>{
      if(item.name == 'Dashboard'){
        item.children[0].meta.affix = false;
       return  item.path = '/dashboard'
      }
    })
    state.routes = temprouter

  },
  SET_MENUS: (state, routes) => {
    state.menus = state
  }
}
export function addPath(arr, levelFlage = 1) {
  const temp = []
  let obj = {}
  arr.forEach(item => {
    obj = item;
    if (levelFlage == 1) obj.path = pathView(item.jump) + 'OneLevel';
    else obj.path = pathView(item.jump);
    if (item.child.length > 0 && item.typeDesc == '菜单') {
      addPath(item.child, levelFlage + 1)
    }
    temp.push(obj)
  })
  return arr
}
const actions = {

  generateRoutes({
    commit
  }, roles) {
    return new Promise(resolve => {

      getRoutes().then(res => {
        addPath(res.result)
        commit('SET_MENUS', res.result)
        let wms = JSON.parse(localStorage.getItem('wms'))
        wms.SET_MENUS = res.result
        localStorage.setItem('wms', JSON.stringify(wms))
        const tempRoutes = handleMun(factory(res.result))
        /**
         *
         let tempMenus = menusLIST
         addPath(tempMenus.SET_MENUS)
         commit('SET_MENUS', tempMenus.SET_MENUS)
         let wms = JSON.parse(localStorage.getItem('wms'))
         wms.SET_MENUS = tempMenus.SET_MENUS
         localStorage.setItem('wms', JSON.stringify(wms))
         const tempRoutes = handleMun(factory(tempMenus.SET_MENUS))
         */

        if (tempRoutes.length > 0) {
          testFlage = true
          let accessedRoutes = []
          accessedRoutes = filterAsyncRoutes(tempRoutes, roles)
          let domFlage = false;
          accessedRoutes.forEach(item => {
            // 如果路由是到首页，重定向（redirect）到区域管理页面 ,affix 固定页面
            // if (item.path == "/productOneLevel") {
            //   domFlage = true
            //   item.redirect = '/product'
            //   item.children[0].meta = {
            //     ...item.children[0].meta,
            //     ...{
            //       affix: true
            //     }
            //   }
            //    item.path = '/'
            // }
            if (item.path == "/dashboard") {
              item.defaultFlage= 'default'
              item.children[0].meta = {
                ...item.children[0].meta,
              }
               item.path = '/dashboard'
            }
          })
          if (!domFlage) {
            accessedRoutes[0].redirect = accessedRoutes[0].children[0].path
            accessedRoutes[0].path = '/'
          }
          accessedRoutes.push({
            path: '*',
            redirect: '/404',
            hidden: true
          })
          commit('SET_ROUTES', accessedRoutes)
          return resolve(accessedRoutes)
        } else {
          testFlage = false
          let tempConstantRoutes = [...constantRoutes]
          tempConstantRoutes.forEach(item => {
            // 如果路由是到首页，重定向（redirect）到区域管理页面 ,affix 固定页面
            if (item.path == "/dashboard") {
              item.redirect = '/dashboard'
              item.defaultFlage= 'default'
              item.children[0].meta = {
                ...item.children[0].meta,
                ...{
                  affix: true
                }
              }
              return item.path = '/'
            }
          })
          commit('SET_ROUTES', tempConstantRoutes)
          return resolve(tempConstantRoutes)
        }
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
