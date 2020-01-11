import request from '@/utils/request'
const UrlPath = '/admin/province/'
class ProvinceApi {
    /**
     * @description "新增省份"
     * @param {string} code “code”
     * @param {string} name “name”
     * @static
     * @memberof ProvinceApi
     */
    static add = (data) => {
      return request({
        url: UrlPath + 'add',
        method: 'post',
        data
      })
    }
    /**
     * @description "根据id删除省份"
     * @param {string} id "id"
     * @static
     * @memberof ProvinceApi
     */
    static delete = (id) => {
      return request({
        url: UrlPath + '/delete/' + id,
        method: 'delete'
      })
    }
    /**
     * @description "新增省份"
     * @param {string} code “code”
     * @param {string} name “name”
     * @param {string} id “id”
     * @static
     * @memberof ProvinceApi
     */
    static edit = (data) => {
      return request({
        url: UrlPath + 'edit',
        method: 'put',
        data
      })
    }
    /**
     * @description 获取省份分页数据
     * @param {Object} filters  {field	,op,value} value [EQ, NEQ, LIKE, LLIKE, RLIKE, GT, LT, GTE, LTE, IN, NOTIN, EXISTS, NEXISTS, BETWEEN, ISNULL, NOTNULL, EMPTY, NOTEMPTY, DISTINCT]
     * @param {Object} page  {page	,size,sorts } sort [ asc, desc]
     * @static
     * @memberof ProvinceApi
     */
    static page = (data) => {
      return request({
        url: UrlPath + 'page',
        method: 'post',
        data
      })
    }
    /**
     * @description 切换省份状态
     * @param {string} id 省份id
     * @static
     * @memberof ProvinceApi
     */
    static toggle = data => {
      return request({
        url: UrlPath + 'toggle/status/' + data,
        method: 'put'
      })
    }
}

export default ProvinceApi
