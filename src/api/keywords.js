import request from '@/utils/request'

export function page(data) {
  return request({
    url: '/keyword/page',
    method: 'post',
    data: data
  })
}

export function add(data) {
  return request({
    url: '/keyword/add',
    method: 'post',
    data: data
  })
}

export function edit(data) {
  return request({
    url: '/keyword/edit',
    method: 'put',
    data: data
  })
}

export function remove(id) {
  return request({
    url: '/keyword/delete/' + id,
    method: 'delete'
  })
}

export function batchRemove(ids) {
  return request({
    url: '/keyword/batch/delete',
    method: 'delete',
    data: ids
  })
}
