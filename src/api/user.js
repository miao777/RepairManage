import request from '@/utils/request'

// 登陆 **
export function login(data) {
  return request({
    url: '/login',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, // formdata专用
    method: 'post',
    data: data
  })
}

// 获取登陆用户信息 **
export function getInfo() {
  return request({
    url: '/admin/user/get/current',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'get'
  })
}

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

export function remove(id) {
  return request({
    url: '/user/delete/' + id,
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

export function toggleStatus(id) {
  return request({
    url: '/user/toggle/status/' + id,
    method: 'put'
  })
}

export function resetPwd(id) {
  return request({
    url: '/user/reset/pwd/' + id,
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

// 登陆用户修改自己密码
export function updateUserPwd(data) {
  return request({
    url: '/user/modify/pwd',
    method: 'put',
    data: data
  })
}

// 修改用户自己资料
export function updateIfoContent(data) {
  return request({
    url: '/user/own/edit',
    method: 'put',
    data: data
  })
}
