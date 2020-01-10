import request from '@/utils/ajax'
// 商查查

// 关联统计（列表）
export function statisticsList(data) {
  return request({
    url: '/back/count/page',
    method: 'post',
    data: data
  })
}

// 关联统计（删除）
export function statisticsremove(id) {
  return request({
    url: '/back/count/delete/' + id,
    method: 'delete'
  })
}

// 微信登陆用户（列表）
export function weixinLoginUserList(data) {
  return request({
    url: '/back/wechat/userinfo/page',
    method: 'post',
    data: data
  })
}

// 微信登陆用户（删除）
export function weixinLoginRemove(id) {
  return request({
    url: '/back/wechat/userinfo/delete/' + id,
    method: 'delete'
  })
}

// 用户关联（列表）
export function userrelationList(data) {
  return request({
    url: '/back/user/relation/page',
    method: 'post',
    data: data
  })
}

// 用户关联（删除）
export function userrelatingremove(id) {
  return request({
    url: '/back/user/relation/delete/' + id,
    method: 'delete'
  })
}

// 访问统计（列表）
export function AccessStatisticsList(data) {
  return request({
    url: '/back/access/count/page',
    method: 'post',
    data: data
  })
}

// 访问统计（删除）
export function AccessStatisticeRemove(id) {
  return request({
    url: '/back/access/count/delete/' + id,
    method: 'delete'
  })
}
