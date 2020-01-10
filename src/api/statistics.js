import request from '@/utils/request'

// 日统计（page列表）
export function dayList(data) {
  return request({
    url: '/count/day/page',
    method: 'post',
    data: data
  })
}

// 周统计（page列表）
export function weekList(data) {
  return request({
    url: '/count/week/page',
    method: 'post',
    data: data
  })
}

// 月统计（page列表）
export function monthList(data) {
  return request({
    url: '/count/month/page',
    method: 'post',
    data: data
  })
}

// 月度评分管理（列表）
export function scoreList(data) {
  return request({
    url: '/month/evaluate/page',
    method: 'post',
    data: data
  })
}

// 月度评分管理（列表）
export function scoreremove(id) {
  return request({
    url: '/month/evaluate/delete/e' + id,
    method: 'delete'
  })
}

// 最新统计数据（page列表）
export function NewestTotalList() {
  return request({
    url: '/count/last/time/report',
    method: 'post'
  })
}

// echarts (实时数据)
export function echartsData() {
  return request({
    url: '/count/real/time/report',
    method: 'post'
  })
}

// 店铺认证比列
export function shopecharts() {
  return request({
    url: '/count/show/shop/certify',
    method: 'post'
  })
}

// 产品统计图
export function goodsecharts() {
  return request({
    url: '/count/show/shop/goods/ratio',
    method: 'post'
  })
}
