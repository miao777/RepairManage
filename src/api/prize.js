import request from '@/utils/request'

// 奖品管理（page列表）
export function prizeList(data) {
  return request({
    url: '/award/page',
    method: 'post',
    data: data
  })
}

// 奖品管理（修改）
export function prizeupdate(data) {
  return request({
    url: '/award/edit',
    method: 'put',
    data: data
  })
}

// 奖品管理(新增)
export function prizeadd(data) {
  return request({
    url: 'award/add',
    method: 'post',
    data: data
  })
}

// 奖品管理(活动查询)
export function prizeactivity(data) {
  return request({
    url: 'award/activity/page',
    method: 'post',
    data: data
  })
}

// 奖品管理（删除）
export function prizeremove(id) {
  return request({
    url: '/award/delete/' + id,
    method: 'delete'
  })
}

// 兑奖码（列表）
export function codelist(data) {
  return request({
    url: 'award/code/page',
    method: 'post',
    data: data
  })
}

// 兑奖码（新增）
export function codeadd(data) {
  return request({
    url: '/award/code/add',
    method: 'post',
    data: data
  })
}

// 兑奖码（查看）
export function codesee(id) {
  return request({
    url: '/award/code/get/result/' + id,
    method: 'post'
  })
}

// 兑奖码（导入execl）
export function codeimport(id, data) {
  return request({
    url: 'award/code/import/data/' + id,
    method: 'post',
    data: data
  })
}

// 兑奖码（删除）
export function coderemove(id) {
  return request({
    url: '/award/code/delete/' + id,
    method: 'delete'
  })
}

// 兑奖码（修改）
export function codeUpdate(data) {
  return request({
    url: '/award/code/edit',
    method: 'put',
    data: data
  })
}

// 兑奖活动（列表）
export function activityList(data) {
  return request({
    url: 'award/activity/page',
    method: 'post',
    data: data
  })
}

// 兑奖活动（新增）
export function activityAdd(data) {
  return request({
    url: '/award/activity/add',
    method: 'post',
    data: data
  })
}

// 兑奖活动（修改）
export function activityUpdate(data) {
  return request({
    url: '/award/activity/edit',
    method: 'put',
    data: data
  })
}

// 兑奖活动（删除）
export function activityRemove(id) {
  return request({
    url: '/award/activity/delete/' + id,
    method: 'delete'
  })
}

// 兑奖活动（导出Execl）
export function activityExport(data) {
  return request({
    url: '/award/activity/export/result',
    method: 'post',
    responseType: 'blob',
    data: data
  })
}

// 广告位（列表）
export function posterList(data) {
  return request({
    url: '/guanggao/position/page',
    method: 'post',
    data: data
  })
}

// 广告位（查询发布平台列表）
export function posterGetplatform() {
  return request({
    url: '/guanggao/position/get/platform/types',
    method: 'get'
  })
}

// 广告位（新增）
export function posteradd(data) {
  return request({
    url: '/guanggao/position/add',
    method: 'post',
    data: data
  })
}

// 广告位（修改）
export function posterupdate(data) {
  return request({
    url: '/guanggao/position/edit',
    method: 'put',
    data: data
  })
}

// 广告位（删除）
export function posterRemove(id) {
  return request({
    url: '/guanggao/position/delete/' + id,
    method: 'delete'
  })
}

// 广告（列表）
export function adList(data) {
  return request({
    url: '/guanggao/page',
    method: 'post',
    data: data
  })
}

// 广告（新增）
export function adadd(data) {
  return request({
    url: '/guanggao/add',
    method: 'post',
    data: data
  })
}

// 广告（删除）
export function adremove(id) {
  return request({
    url: '/guanggao/delete/' + id,
    method: 'delete'
  })
}

// 广告（修改）
export function adupdate(data) {
  return request({
    url: '/guanggao/edit',
    method: 'put',
    data: data
  })
}

// 广告（是否显示修改）
export function adtoggleStatus(id, type) {
  return request({
    url: '/guanggao/show/' + id + '/' + type,
    method: 'put'
  })
}

// 广告（拖拽排序）
export function adsort(data) {
  return request({
    url: '/guanggao/resfresh/sort',
    method: 'put',
    data: data
  })
}
