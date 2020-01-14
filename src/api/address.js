import request from '@/utils/request'
const UrlPath = '/admin/address/'
class AddressApi {
    /**
     * @description "新增用户数据"
     * @param {string} code “code”
     * @param {string} name “name”
     * @static
     * @memberof AddressApi
     */
    static add = (data) => {
      return request({
        url: UrlPath + 'add',
        method: 'post',
        data
      })
    }
    /**
     * @description "根据id删除用户数据"
     * @param {string} id "id"
     * @static
     * @memberof AddressApi
     */
    static delete = (id) => {
      return request({
        url: UrlPath + '/delete/' + id,
        method: 'delete'
      })
    }
    /**
     * @description "编辑用户数据"
     * @param {string} code “code”
     * @param {string} name “name”
     * @param {string} id “id”
     * @static
     * @memberof AddressApi
     */
    static edit = (data) => {
      return request({
        url: UrlPath + 'edit',
        method: 'put',
        data
      })
    }
    /**
     * @description 获取用户数据分页数据
     * @param {Object} filters  {field	,op,value} value [EQ, NEQ, LIKE, LLIKE, RLIKE, GT, LT, GTE, LTE, IN, NOTIN, EXISTS, NEXISTS, BETWEEN, ISNULL, NOTNULL, EMPTY, NOTEMPTY, DISTINCT]
     * @param {Object} page  {page	,size,sorts } sort [ asc, desc]
     * @static
     * @memberof AddressApi
     */
    static page = (data) => {
      return request({
        url: UrlPath + 'page',
        method: 'post',
        data
      })
    }
    /**
     * @description 切换用户数据状态
     * @param {string} id 用户数据id
     * @static
     * @memberof AddressApi
     */
    static toggle = data => {
      return request({
        url: UrlPath + 'toggle/status/' + data,
        method: 'put'
      })
    }
}

export default AddressApi
