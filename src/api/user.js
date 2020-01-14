import request from '@/utils/request'

// 用户管理（列表）**
export function page(data) {
  return request({
    url: '/admin/user/page',
    method: 'post',
    data: data
  })
}

// 用户管理（新增加）
export function add(data) {
  return request({
    url: '/admin/user/add',
    method: 'post',
    data: data
  })
}

export function edit(data) {
  return request({
    url: '/user/edit',
    method: 'put',
    data: data
  })
}

// 用户管理（删除用户）
export function remove(id) {
  return request({
    url: '/admin/user/delete/' + id,
    method: 'delete'
  })
}

export function batchRemove(ids) {
  return request({
    url: '/user/batch/delete',
    method: 'delete',
    data: ids
  })
}

// 用户管理（切换状态）
export function toggleStatus(id) {
  return request({
    url: '/admin/user/toggle/status/' + id,
    method: 'put'
  })
}

// 用户管理（重置密码）**
export function resetPwd(id) {
  return request({
    url: '/admin/user/reset/password/' + id,
    method: 'put'
  })
}

export function showBlacklist(id) {
  return request({
    url: '/user/blacklist/' + id,
    method: 'get'
  })
}

export function getManagerRoles() {
  return request({
    url: '/user/manager/roles',
    method: 'get'
  })
}

const UrlPath = '/admin/user/'
class updateUserconntentApi {
  /**
   * @description '请修改密码'
   * @param {string} newPwd 'newPwd'
   * @param {string} newPwd2 'newPwd2
   * @param {string} oldPwd 'oldPwd
   * @static
   * @memberof updateUserconntentApi
   */
  static updateUserPwd = (data) => {
    return request({
      url: UrlPath + '/modify/password',
      method: 'put',
      data
    })
  }

  /**
   * @description '更新资料'
   * @param {string} email 'email'
   * @param {string} headerUrl 'headerUrl'
   * @param {string} mobileNo 'mobileNo'
   * @param {string} name 'name'
   * @param {boolean} sex 'sex'
   * @param {string} nickname 'nickname'
   * @static
   * @memberof updateUserconntentApi
   */
  static updateIfoContent = (data) => {
    return request({
      url: UrlPath + 'update',
      method: 'put',
      data
    })
  }

  /**
   * @description '获取用户登录信息'
   * @param
   * @static
   * @memberof updateUserconntentApi
   */
  static getInfo = () => {
    return request({
      url: UrlPath + 'get/current',
      method: 'get'
    })
  }

  /**
   * @description '登陆'
   * @param {string} username 'username'
   * @param {string} password 'password'
   * @static
   * @memberof updateUserconntentApi
   */
  static login = (data) => {
    return request({
      url: '/login',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, // formdata专用
      method: 'post',
      data
    })
  }

  /**
   * @description '退出登录'
   * @param
   * @static
   * @memberof updateUserconntentApi
   */
  static logout = () => {
    return request({
      url: '/logout',
      method: 'get'
    })
  }
}

export default updateUserconntentApi
