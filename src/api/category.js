// /admin/repair/category
import request from '@/utils/request'
const UrlPath = '/admin/repair/category/'
/**
 * @description 维修分类 Api
 *
 * @class CategoryApi
 */
class CategoryApi {
    /**
     * @description "新增维修分类"
     * @param {string} code “code”
     * @param {string} name “name”
     * @static
     * @memberof CategoryApi
     */
    static add = (data) => {
      return request({
        url: UrlPath + 'add',
        method: 'post',
        data
      })
    }
    /**
     * @description "根据id删除维修分类"
     * @param {string} id "id"
     * @static
     * @memberof CategoryApi
     */
    static delete = (id) => {
      return request({
        url: UrlPath + '/delete/' + id,
        method: 'delete'
      })
    }
    /**
     * @description "修改维修分类"
     * @param {string} code “code”
     * @param {string} name “name”
     * @param {string} id “id”
     * @static
     * @memberof CategoryApi
     */
    static edit = (data) => {
      return request({
        url: UrlPath + 'edit',
        method: 'put',
        data
      })
    }
    /**
     * @description 获取维修分类分页数据
     * @param {Object} filters  {field	,op,value} value [EQ, NEQ, LIKE, LLIKE, RLIKE, GT, LT, GTE, LTE, IN, NOTIN, EXISTS, NEXISTS, BETWEEN, ISNULL, NOTNULL, EMPTY, NOTEMPTY, DISTINCT]
     * @param {Object} page  {page	,size,sorts } sort [ asc, desc]
     * @static
     * @memberof CategoryApi
     */
    static page = (data) => {
      return request({
        url: UrlPath + 'page',
        method: 'post',
        data
      })
    }
    /**
     * @description 切换维修分类状态
     * @param {string} id 维修分类id
     * @static
     * @memberof CategoryApi
     */
    static toggle = data => {
      return request({
        url: UrlPath + 'toggle/show/' + data,
        method: 'put'
      })
    }
}

export default CategoryApi
