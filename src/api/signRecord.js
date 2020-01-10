import request from '@/utils/request'

export function page(data) {
  return request({
    url: '/sign/record/page',
    method: 'post',
    data: data
  })
}

export function remove(id) {
  return request({
    url: '/sign/record/delete/' + id,
    method: 'delete'
  })
}

export function batchRemove(data) {
  return request({
    url: '/sign/record/batch/delete',
    method: 'delete',
    data: data
  })
}

