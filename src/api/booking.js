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
     * @memberof BookingApi
     */
    static page = data => {
      return request({
        url: UrlPath + 'page',
        method: 'post',
        data
      })
    }

    /**
     * @description '获取订单或者预定订单服务项目信息'
     * @param {Object} '{"filters": [{"field": "string","op": "EQ","value": "string"}],"page": {"page": 0,"size": 0,"sorts": [{ "field": "string", "order": "asc"}]}}'
     * @static
     * @memberof BookingApi
     */
    static searvicePage = (data) => {
      return request({
        url: UrlPath + 'page/product',
        method: 'post',
        data
      })
    }
    /**
   * @description 增加服务项目
   * @param {string} categoryId 分类ID
   * @param {string} images 图片ID列表
   * @param {string} itemId 项目ID
   * @param {string} subclassId 小类ID
   *
   * @static
   * @memberof BookingApi
   */
  static addService = (id, data) => {
    return request({
      url: UrlPath + 'add/product/' + id,
      method: 'post',
      data
    })
  }

  /**
   * @description 删除服务项目
   * @param {string} id  服务Id
   * @static
   * @memberof BookingApi
   */
  static removeProduct=id => {
    return request({
      url: UrlPath + 'remove/product/' + id,
      method: 'delete'

    })
  }

  /**
   * @description '修改服务项目'
   * @param {string} id 'id'
   * @param {string} categoryId 'categoryId'
   * @param {Array} images 'images'
   * @param {string} itemId 'itemId'
   * @param {string} price 'price'
   * @param {string} subclassId 'subclassId'
   * @static
   * @memberof BookingApi
   */
  static edit = (data) => {
    return request({
      url: UrlPath + 'edit/product',
      method: 'put',
      data
    })
  }

  /**
   * @description '取消订单'
   * @param {Object}
   * @static
   * @memberof OrderApi
   */
  static cancelOrder = (data) => {
    return request({
      url: UrlPath + 'cancel',
      method: 'delete',
      data: data
    })
  }

  /**
   * @description '删除订单'
   * @param {String} id
   * @static
   * @memberof OrderApi
   */
  static delete = (id) => {
    return request({
      url: UrlPath + 'delete/' + id,
      method: 'delete'
    })
  }
}
export default BookingApi
