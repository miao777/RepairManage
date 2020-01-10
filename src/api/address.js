import request from '@/utils/request'

export function addressPage(data) {
  return request({
    url: '/address/page',
    method: 'post',
    data: data
  })
}
