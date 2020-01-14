import request from '@/utils/request'

// 角色（列表）**
export function page(data) {
  return request({
    url: '/admin/role/page',
    method: 'post',
    data: data
  })
}

// 角色键值（列表）**
export function getRoleKeys() {
  return request({
    url: '/admin/role/list/role/key',
    method: 'get'
  })
}

// 角色类型（列表）**
export function getRoleTypes() {
  return request({
    url: '/admin/role/list/role/type',
    method: 'get'
  })
}

// 角色（新增）**
export function add(data) {
  return request({
    url: '/admin/role/add',
    method: 'post',
    data: data
  })
}

// 角色（修改）**
export function edit(data) {
  return request({
    url: '/admin/role/edit',
    method: 'put',
    data: data
  })
}

// 角色（删除）**
export function remove(id) {
  return request({
    url: '/admin/role/delete/' + id,
    method: 'delete'
  })
}

export function batchRemove(ids) {
  return request({
    url: '/role/batch/delete',
    method: 'delete',
    data: ids
  })
}

// 图片管理（列表）
export function imagesList(data) {
  return request({
    url: '/admin/image/page',
    method: 'post',
    data: data
  })
}

// 图片管理（删除）
export function imagesRemove(id) {
  return request({
    url: '/admin/image/delete/' + id,
    method: 'delete'
  })
}
