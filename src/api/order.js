import request from '@/utils/request'
const urlPath = '/admin/order/'
class OrderApi {
  /**
   * @description 创建订单
   * @param {string} fixPriceVos 定价VO
   * @param {string} orderBookingId 预约订单ID
   * @param {string} remark 备注
   * @param {number} repairMinute 预计维修分钟数
   * @static
   * @memberof OrderApi
   */
  static add = data => {
    return request({
      url: urlPath + 'add',
      method: 'post',
      data
    })
  }

  /**
   * @description 指派维修人员
   * @param {}orderId 预约订单ID
   * @param {}repairManId 维修人员ID
   * @static
   * @memberof OrderApi
   */
  static asSign=(data) => {
    return request({
      url: urlPath + 'assign',
      method: 'post',
      data
    })
  }
  /**
   * @description 修改服务价格
   * @param {string} orderProductId 预约订单上传的购买产品ID
   * @param {number} price 评估价格
   * @param {string} remark 价格修改备注
   * @static
   * @memberof OrderApi
   */
  static editPrice =(id, data) => {
    return request({
      url: urlPath + 'edit/price/' + id,
      method: 'put',
      data
    })
  }
  /**
   * @description 获取订单分页列表
   * @param {Object} filters 过滤条件
   * @param {Object} page  分页数据条件
   * @static
   * @memberof OrderApi
   */
  static page=(data) => {
    return request({
      url: urlPath + 'page',
      method: 'post',
      data
    })
  }
  /**
   * @description 获取支付流水分页列表
   * @param {Object} filters 过滤条件
   * @param {Object} page  分页数据条件
   * @static
   * @memberof OrderApi
   */
  static logPage =data => {
    return request({
      url: urlPath + 'pay/log/page',
      method: 'post',
      data
    })
  }
}
export default OrderApi
