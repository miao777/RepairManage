import request from '@/utils/request'
const UrlPath = '/admin/city/'
class CityApi {
  /**
   * @description "新增城市"
   * @param {string} code “code”
   * @param {string} name “name”
   * @param {string} provinceId provinceId
   * @static
   * @memberof CityApi
   */
  static add = (data) => {
    return request({
      url: UrlPath + 'add',
      method: 'post',
      data
    })
  }
  /**
   * @description "根据id删除城市"
   * @param {string} id "id"
   * @static
   * @memberof CityApi
   */
  static delete = (id) => {
    return request({
      url: UrlPath + '/delete/' + id,
      method: 'delete'
    })
  }
  /**
   * @description 获取城市分页数据
   * @param {Object} filters  {field	,op,value} value [EQ, NEQ, LIKE, LLIKE, RLIKE, GT, LT, GTE, LTE, IN, NOTIN, EXISTS, NEXISTS, BETWEEN, ISNULL, NOTNULL, EMPTY, NOTEMPTY, DISTINCT]
   * @param {Object} page  {page	,size,sorts } sort [ asc, desc]
   * @static
   * @memberof CityApi
   */
  static page = (data) => {
    return request({
      url: UrlPath + 'page',
      method: 'post',
      data
    })
  }
  /**
   * @description "根据id删除城市"
   * @param {string} id "id"
   * @static
   * @memberof CityApi
   */
  static delete = (id) => {
    return request({
      url: UrlPath + '/delete/' + id,
      method: 'delete'
    })
  }
  /**
  * @description "编辑城市"
  * @param {string} code “code”
  * @param {string} name “name”
  * @param {string} id “id”
  * @param {string} provinceId 'provinceId'
  * @static
  * @memberof CityApi
  */
  static edit = (data) => {
    return request({
      url: UrlPath + 'edit',
      method: 'put',
      data
    })
  }
  /**
   * @description 切换城市状态
   * @param {string} id 城市id
   * @static
   * @memberof CityApi
   */
  static toggle = data => {
    return request({
      url: UrlPath + 'toggle/status/' + data,
      method: 'put'
    })
  }
}
export default CityApi
