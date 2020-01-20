import request from '@/utils/request'
const UrlPath = '/admin/order/booking/'
/**
 * @description 预约订单管理Api
 *
 * @class BookingApi
 */
class BookingApi {
    /**
     * @description 获取预约订单分页列表信息
     * @param {Object} filters 过滤条件
     * @param {Object} page  分页数据条件
     * @param {*} data
     * @returns
     */
    static page = data => {
      return request({
        url: UrlPath + 'page',
        method: 'post',
        data
      })
    }
}
export default BookingApi
