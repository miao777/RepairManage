import request from '@/utils/request'

// 答卷管理（page列表）
export function volumeList(data) {
  return request({
    url: '/answer/sheet/page',
    method: 'post',
    data: data
  })
}

// 答卷管理（删除）
export function volumeRemove(id) {
  return request({
    url: '/answer/sheet/delete/' + id,
    method: 'delete'
  })
}

// 答卷管理（查询答案）
export function volumeAnswer(data) {
  return request({
    url: '/answer/sheet/answer/page',
    method: 'post',
    data: data
  })
}

// 问卷管理（列表）
export function askList(data) {
  return request({
    url: '/questionnaire/page',
    method: 'post',
    data: data
  })
}

// 问卷管理（创建问卷）
export function askAdd(data) {
  return request({
    url: '/questionnaire/add',
    method: 'post',
    data: data
  })
}

// 问卷管理（修改）
export function askupdate(data) {
  return request({
    url: '/questionnaire/edit',
    method: 'put',
    data: data
  })
}

// 问卷管理（修改）
export function askremove(id) {
  return request({
    url: '/questionnaire/delete/' + id,
    method: 'delete'
  })
}

// 题目（新增）
export function addtitlt(data) {
  return request({
    url: '/questionnaire/add/question',
    method: 'post',
    data: data
  })
}

// 问题（page列表）
export function listTitle(data) {
  return request({
    url: '/questionnaire/page/question',
    method: 'post',
    data: data
  })
}

// 题目类型
export function getvolumeType() {
  return request({
    url: '/questionnaire/list/select/type',
    method: 'get'
  })
}

// 问题（修改）
export function titleupdate(data) {
  return request({
    url: '/questionnaire/edit/question',
    method: 'put',
    data: data
  })
}

// 问题（删除）
export function titleremove(id) {
  return request({
    url: '/questionnaire/delete/question/' + id,
    method: 'delete'
  })
}

// 问题（排序）
export function sorttitle(data) {
  return request({
    url: '/questionnaire/sort/question',
    method: 'put',
    data: data
  })
}
