import request from '@/utils/ajax'

/**
 * @description 列表
 * @param params 分页参数
 */
export function list(params) {
  return request({
    url: '/back/search/record/page',
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
    url: '/back/search/record/delete/' + id,
    method: 'delete'
  })
}

/**
 * @description 枚举
 *
 */
export function getType() {
  return request({
    url: '/back/constant/enum/select/type/' + 'search_type',
    method: 'get'
  })
}

