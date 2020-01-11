import request from '@/utils/request'
const UrlPath = '/repair/subclass/'
/**
 * @description 维修小类 Api
 *
 * @class SubclassApi
 */
class SubclassApi {
    /**
     * @description "新增维修小类"
     * @param {string} code “code”
     * @param {string} name “name”
     * @static
     * @memberof SubclassApi
     */
    static add = (data) => {
      return request({
        url: UrlPath + 'add',
        method: 'post',
        data
      })
    }
    /**
     * @description "根据id删除维修小类"
     * @param {string} id "id"
     * @static
     * @memberof SubclassApi
     */
    static delete = (id) => {
      return request({
        url: UrlPath + '/delete/' + id,
        method: 'delete'
      })
    }
    /**
     * @description "修改维修小类"
     * @param {string} code “code”
     * @param {string} name “name”
     * @param {string} id “id”
     * @static
     * @memberof SubclassApi
     */
    static edit = (data) => {
      return request({
        url: UrlPath + 'edit',
        method: 'put',
        data
      })
    }
    /**
     * @description 获取维修小类分页数据
     * @param {Object} filters  {field	,op,value} value [EQ, NEQ, LIKE, LLIKE, RLIKE, GT, LT, GTE, LTE, IN, NOTIN, EXISTS, NEXISTS, BETWEEN, ISNULL, NOTNULL, EMPTY, NOTEMPTY, DISTINCT]
     * @param {Object} page  {page	,size,sorts } sort [ asc, desc]
     * @static
     * @memberof SubclassApi
     */
    static page = (data) => {
      return request({
        url: UrlPath + 'page',
        method: 'post',
        data
      })
    }
    /**
     * @description 切换维修小类状态
     * @param {string} id 维修小类id
     * @static
     * @memberof SubclassApi
     */
    static toggle = data => {
      return request({
        url: UrlPath + 'toggle/show/' + data,
        method: 'put'
      })
    }
}

export default SubclassApi
