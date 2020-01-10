import request from '@/utils/request'

// ------------------------------------------------------------shop--------------------------------------------
/**
 * @description 获取店铺数据
 * @param params 分页查询参数
 */
export function listShop(params) {
  return request({
    url: '/shop/page',
    method: 'post',
    data: params
  })
}

// 获取经营类型
export function getBusinessType() {
  return request({
    url: '/shop/get/business/type',
    method: 'get'
  })
}

// 获取经营品类
export function getBusinessCategory() {
  return request({
    url: '/shop/get/business/category',
    method: 'get'
  })
}

/**
 * @description 编辑数据
 * @param params
 */
export function addShop(params) {
  return request({
    url: '/shop/add',
    method: 'post',
    data: params
  })
}

/**
 * @description 编辑数据
 * @param params
 */
export function editShop(params) {
  return request({
    url: '/shop/edit',
    method: 'put',
    data: params
  })
}

/**
 * @description 删除店铺
 * @param id 店铺id
 */
export function deleteShop(id) {
  return request({
    url: '/shop/delete/' + id,
    method: 'delete'
  })
}

/**
 * @description 删除店铺
 * @param id 店铺id
 */
export function unbindShopClerk(shopId, clerkId) {
  return request({
    url: '/shop/remove/clerk/' + shopId + '/' + clerkId,
    method: 'delete'
  })
}

/**
 * @description 设置店铺经纬度
 * @param id 参数
 */
export function location(params) {
  return request({
    url: '/shop/location',
    method: 'put',
    data: params
  })
}

/**
 * @description 获取商家列表
 * @param params 分页参数
 */
export function listMerchant(params) {
  return request({
    url: '/service/merchant/page',
    method: 'post',
    data: params
  })
}

/**
 * @description 绑定周边服务商家
 * @param shopId 店铺id
 * @param merchantId 周边商家id
 */
export function bindMerchant(shopId, merchantId) {
  return request({
    url: '/shop/bind/service/merchant/' + shopId + '/' + merchantId,
    method: 'put'
  })
}

/**
 * @description 解绑周边服务商家
 * @param shopId 店铺id
 */
export function unbindMerchant(shopId) {
  return request({
    url: '/shop/unbind/service/merchant/' + shopId,
    method: 'put'
  })
}

// ---------------------------------------------------------------clerk-----------------------------------------
/**
 * @description 店员list
 * @param params 分页查询参数
 */
export function listClerk(params) {
  return request({
    url: '/clerk/page',
    method: 'post',
    data: params
  })
}

export function addClerk(params) {
  return request({
    url: '/clerk/add',
    method: 'post',
    data: params
  })
}

export function editClerk(params) {
  return request({
    url: '/clerk/edit',
    method: 'put',
    data: params
  })
}

export function deleteClerk(clerkId) {
  return request({
    url: '/clerk/delete/' + clerkId,
    method: 'delete'
  })
}
