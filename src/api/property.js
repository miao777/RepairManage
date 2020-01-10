import request from '@/utils/request'

// 留言（page列表）
export function staywordList(data) {
  return request({
    url: '/suggest/page',
    method: 'post',
    data: data
  })
}

// 留言（删除）
export function stayworddelete(id) {
  return request({
    url: '/suggest/delete/' + id,
    method: 'delete'
  })
}

// 维修人员（page列表）
export function repairList(data) {
  return request({
    url: '/repairman/page',
    method: 'post',
    data: data
  })
}

// 维修人员(新增)
export function repairadd(data) {
  return request({
    url: '/repairman/add',
    method: 'post',
    data: data
  })
}

// 维修人员(新增)
export function repairupdate(data) {
  return request({
    url: '/repairman/edit',
    method: 'put',
    data: data
  })
}

// 维修人员（删除）
export function repairdelete(id) {
  return request({
    url: '/repairman/delete/' + id,
    method: 'delete'
  })
}

// 总经理信箱（列表）
export function mailboxList(data) {
  return request({
    url: '/feedback/page',
    method: 'post',
    data: data
  })
}

// 总经理信箱（处理中）
export function mailboxtoprocess(id, data) {
  return request({
    url: '/feedback/handle/' + id,
    method: 'put',
    data: data
  })
}

// 总经理信箱（处理完成）
export function mailboxtofinish(id) {
  return request({
    url: '/feedback/complete/' + id,
    method: 'put'
  })
}

// 总经理信箱（回访）
export function mailboxtoreturn(id) {
  return request({
    url: '/feedback/callback/' + id,
    method: 'put'
  })
}
