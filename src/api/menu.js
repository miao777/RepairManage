import request from '@/utils/request'
const UrlPath = '/admin/menu/'

class menuApi {
  /**
   * @description '后台路由地址（router）'
   * @param
   * @static
   * @memberof menuApi
   */
  static loadLeftMenu = () => {
    return request({
      url: '/admin/menu/show',
      method: 'get'
    })
  }

  /**
     * @description 菜单树形结构**
     * @param {Object} filters  {field	,op,value} value [EQ, NEQ, LIKE, LLIKE, RLIKE, GT, LT, GTE, LTE, IN, NOTIN, EXISTS, NEXISTS, BETWEEN, ISNULL, NOTNULL, EMPTY, NOTEMPTY, DISTINCT]
     * @param {Object} page  {page	,size,sorts } sort [ asc, desc]
     * @static
     * @memberof menuApi
     */
    static tree = (data) => {
      return request({
        url: UrlPath + 'tree',
        method: 'post',
        data
      })
    }

    /**
     * @description "菜单排序"**
     * @param {string} id “id”
     * @param {string} oldParentId oldParentId
     * @param {number} oldSortNo “oldSortNo”
     * @param {string} parentId parentId
     * @param {number} sortNo sortNo
     * @static
     * @memberof menuApi
     */
    static sort = (data) => {
      return request({
        url: UrlPath + 'sort',
        method: 'post',
        data
      })
    }

    /**
     * @description "新增菜单"
     * @param {string} href “href”
     * @param {string} icon icon
     * @param {number} sortNo “sortNo”
     * @param {string} parentId parentId
     * @param {number} title title
     * @static
     * @memberof menuApi
     */
    static add = (data) => {
      return request({
        url: UrlPath + 'append',
        method: 'post',
        data
      })
    }

    /**
     * @description "修改菜单"
     * @param {string} href “href”
     * @param {string} icon icon
     * @param {number} sortNo “sortNo”
     * @param {string} parentId parentId
     * @param {string} title title
     * @param {string} id “id”
     * @static
     * @memberof menuApi
     */
    static edit = (data) => {
      return request({
        url: UrlPath + 'edit',
        method: 'put',
        data
      })
    }

    /**
     * @description "根据id删除菜单"**
     * @param {string} id "id"
     * @param {string} parentId "parentId"
     * @static
     * @memberof menuApi
     */
    static remove = (parentId, id) => {
      return request({
        url: UrlPath + 'delete/' + parentId + '/' + id,
        method: 'delete'
      })
    }
    /**
     * @description "角色绑定菜单"
     * @param {string} id “id”
     * @param {Array}  '[ { "id": "string","parentId": "string" }]'
     * @static
     * @memberof menuApi
     */
    static rolrList = (id, data) => {
      return request({
        url: '/admin/role/bind/role/' + id,
        method: 'post',
        data
      })
    }

    /**
     * @description "角色权限列表"
     * @param {string} id “id”
     * @param {Array}  '[ { "id": "string","parentId": "string" }]'
     * @static
     * @memberof menuApi
     */
    static permissionList = (id) => {
      return request({
        url: UrlPath + 'list/select/' + id,
        method: 'post'
      })
    }
}
export default menuApi
