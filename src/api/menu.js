import request from '@/utils/request'

// 后去路由地址（router）**
export function loadLeftMenu() {
  return request({
    url: '/admin/menu/show',
    method: 'get'
  })
}

// 菜单树形结构 **
export function tree(data) {
  return request({
    url: '/admin/menu/tree',
    method: 'post',
    data: data
  })
}
// 菜单排序 **
export function sort(data) {
  return request({
    url: '/admin/menu/sort',
    method: 'post',
    data: data
  })
}

// 新增目录 **
export function add(data) {
  return request({
    url: '/admin/menu/append',
    method: 'post',
    data: data
  })
}

// 修改 **
export function edit(data) {
  return request({
    url: '/admin/menu/edit',
    method: 'put',
    data: data
  })
}

// 删除 **
export function remove(parentId, id) {
  return request({
    url: '/admin/menu/delete/' + parentId + '/' + id,
    method: 'delete'
  })
}

// 角色权限列表
export function permissionList(id) {
  return request({
    url: '/menu/list/select/' + id,
    method: 'post'
  })
}
// 角色绑定菜单
export function rolrList(id, data) {
  return request({
    url: '/menu/bind/role/' + id,
    method: 'put',
    data: data
  })
}

