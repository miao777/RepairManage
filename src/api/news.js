import request from '@/utils/request'

export function page(data) {
  return request({
    url: '/message/info/page',
    method: 'post',
    data: data
  })
}

export function add(data) {
  return request({
    url: '/message/info/add',
    method: 'post',
    data: data
  })
}

export function edit(data) {
  return request({
    url: '/message/info/edit',
    method: 'put',
    data: data
  })
}

export function remove(id) {
  return request({
    url: '/message/info/delete/' + id,
    method: 'delete'
  })
}

export function batchRemove(data) {
  return request({
    url: '/message/info/batch/delete',
    method: 'delete',
    data: data
  })
}

export function toggleShow(isShow, ids) {
  return request({
    url: '/message/info/change/show/' + isShow,
    method: 'put',
    data: ids
  })
}

export function getCategorylist() {
  return request({
    url: '/message/info/category/list',
    method: 'get'
  })
}
