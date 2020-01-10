import request from '@/utils/request'

export function page(data) {
  return request({
    url: '/search/keywords/page',
    method: 'post',
    data: data
  })
}

export function add(data) {
  return request({
    url: '/search/keywords/add',
    method: 'post',
    data: data
  })
}

export function edit(data) {
  return request({
    url: '/search/keywords/edit',
    method: 'put',
    data: data
  })
}

export function remove(id) {
  return request({
    url: '/search/keywords/delete/' + id,
    method: 'delete'
  })
}

export function batchRemove(ids) {
  return request({
    url: '/search/keywords/batch/delete',
    method: 'delete',
    data: ids
  })
}

export function toggleRecommend(recommend, id) {
  return request({
    url: '/search/keywords/toggle/recommend/' + recommend + '/' + id + '',
    method: 'put'
  })
}
