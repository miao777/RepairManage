import request from '@/utils/request'
const UrlPath = '/admin/repair/item/'
/**
 * @description 维修项目 Api
 *
 * @class RepairItemApi
 */
class RepairItemApi {
    /**
     * @description "新增维修项目"
     * @param {string} name “name”
     * @param {string} price “price”
     * @param {string} repairMinute 'repairMinute'
     * @param {string} sortNo 'sortNo'
     * @param {string} subclassId 'subclassId'
     * @static
     * @memberof RepairItemApi
     */
    static add = (data) => {
      return request({
        url: UrlPath + 'add',
        method: 'post',
        data
      })
    }
    /**
     * @description "根据id删除维修项目"
     * @param {string} id "id"
     * @static
     * @memberof RepairItemApi
     */
    static delete = (id) => {
      return request({
        url: UrlPath + '/delete/' + id,
        method: 'delete'
      })
    }
    /**
     * @description "修改维修项目"
     * @param {string} id “id”
     * @param {string} name “name”
     * @param {string} price “price”
     * @param {string} repairMinute 'repairMinute'
     * @param {string} sortNo 'sortNo'
     * @param {string} subclassId 'subclassId'
     * @static
     * @memberof RepairItemApi
     */
    static edit = (data) => {
      return request({
        url: UrlPath + 'edit',
        method: 'put',
        data
      })
    }
    /**
     * @description 获取维修项目分页数据
     * @param {Object} filters  {field	,op,value} value [EQ, NEQ, LIKE, LLIKE, RLIKE, GT, LT, GTE, LTE, IN, NOTIN, EXISTS, NEXISTS, BETWEEN, ISNULL, NOTNULL, EMPTY, NOTEMPTY, DISTINCT]
     * @param {Object} page  {page	,size,sorts } sort [ asc, desc]
     * @static
     * @memberof RepairItemApi
     */
    static page = (data) => {
      return request({
        url: UrlPath + 'page',
        method: 'post',
        data
      })
    }
    /**
     * @description 切换维修项目状态
     * @param {string} id 维修项目id
     * @static
     * @memberof RepairItemApi
     */
    static toggle = data => {
      return request({
        url: UrlPath + 'toggle/show/' + data,
        method: 'put'
      })
    }
}

export default RepairItemApi
