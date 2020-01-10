import request from '@/utils/request'

// 角色（列表）**
export function page(data) {
  return request({
    url: '/admin/role/page',
    method: 'post',
    data: data
  })
}

export function getRoleKeys() {
  return request({
    url: '/role/enum/RoleKey',
    method: 'get'
  })
}

export function getRoleTypes() {
  return request({
    url: '/role/enum/RoleType',
    method: 'get'
  })
}

export function add(data) {
  return request({
    url: '/role/add',
    method: 'post',
    data: data
  })
}

export function edit(data) {
  return request({
    url: '/role/edit',
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
