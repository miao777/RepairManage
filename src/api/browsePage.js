import request from '@/utils/request'

export function page(data) {
  return request({
    url: '/browse/page/page',
    method: 'post',
    data: data
  })
}

export function add(data) {
  return request({
    url: '/browse/page/add',
    method: 'post',
    data: data
  })
}

export function edit(data) {
  return request({
    url: '/browse/page/edit',
    method: 'put',
    data: data
  })
}

export function remove(id) {
  return request({
    url: '/browse/page/delete/' + id,
    method: 'delete'
  })
}
