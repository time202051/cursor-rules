// import request from '@/api/request/request'
import { get, post } from '@/api/request/sendRuest'
import { identity, accountUser, Tenant, IdentityRole,PublicEnum } from '@/api/request/swagger'
import router from '@/router'
export function login(data) {
  return post({
    url: identity.login,
    method: 'post',
    data
  })
}
export function all() {
  return get({
    url: Tenant.all
  })
}

export function getInfo(token) {
  return get({
    url: accountUser.currentUser,
    params: { token }
  })
}
export function getRoutes() {
  return new Promise(resolve => {
    get({
      url: IdentityRole.currentMenusTree,
      isLoading:true,
    }).then(res => {
      resolve(res)
    })
  })
}
export function enumsSelect() {
  return new Promise(resolve => {
    get({
      url: PublicEnum.enums,
    }).then(res => {
      resolve(res)
    })
  })
}

export function logout() {
  return new Promise(resolve => {
    localStorage.clear();
    router.push('/login')
    resolve()
  })
  // return request({
  //     url: '/vue-element-admin/user/logout',
  //     method: 'post'
  // })
}
