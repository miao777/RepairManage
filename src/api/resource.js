import request from '@/utils/request'

export function create() {
  return request({
    url: 'resource/create'
  })
}
