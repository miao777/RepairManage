import request from '@/utils/request'

export function uploadBase64(data) {
  return request({
    url: '/resource/base64/upload',
    method: 'post',
    data: data
  })
}
