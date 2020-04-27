import request from '@/utils/request'
const urlPath = '/statistics/'

class StatisticsApi {
  /**
   * @description 获取家庭用户数量
   * @static
   * @memberof StatisticsApi
   */
  static familyNumber = () => {
    return request({
      url: urlPath + 'customer/count',
      method: 'post'
    })
  }

  /**
   * @description 获取企业用户数量
   * @static
   * @memberof StatisticsApi
   */
  static enterpriceNumber = () => {
    return request({
      url: urlPath + 'enterprise/count',
      method: 'post'
    })
  }

  /**
   * @description 获取订单数量
   * @static
   * @memberof StatisticsApi
   */
  static orderNumber = () => {
    return request({
      url: urlPath + 'order/count',
      method: 'post'
    })
  }

  /**
   * @description 获取订单数量
   * @static
   * @memberof StatisticsApi
   */
  static repairManNumber = () => {
    return request({
      url: urlPath + 'repairMan/count',
      method: 'post'
    })
  }
}
export default StatisticsApi
