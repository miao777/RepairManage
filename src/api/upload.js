import request from '@/utils/request'

export function uploadBase64(data) {
  return request({
    url: '/admin/image/upload/base64',
    method: 'post',
    data: data
  })
}
