import request from '@/utils/request'

// 订单列表
export function orderPage(data) {
  return request({
    url: '/admin/order/page',
    method: 'post',
    data: data
  })
}

// 订单状态
export function orderTypeList() {
  return request({
    url: '/order/order/status/list',
    method: 'get'
  })
}
