import request from '@/utils/ajax'

/**
 * @description 列表
 * @param params 分页参数
 */
export function list(params) {
  return request({
    url: '/back/search/keywords/page',
    method: 'post',
    data: params
  })
}

/**
 * @description 删除
 * @param id 关键字id
 */
export function remove(id) {
  return request({
    url: '/back/search/keywords/delete/' + id,
    method: 'delete'
  })
}

/**
 * @description 是否推荐
 * @param id 关键字id
 */
export function recommend(id) {
  return request({
    url: '/back/search/keywords/recommend/' + id,
    method: 'get'
  })
}

