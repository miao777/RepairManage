import request from '@/utils/request'
const urlPath = '/admin/poster/'

class PosterApi {
  /**
     * @description 创建广告位
     * @param {string} imageId 图片id
     * @param {string} sortNo 排序
     * @param {string} summary 简介
     * @param {string} title 标题
     * @param {string} type 类型~
     * @static
     * @memberof PosterApi
     */
    static add = (data) => {
      return request({
        url: urlPath + 'add',
        method: 'post',
        data
      })
    }

    /**
     * @description 删除广告位
     * @param {string} id 'id'
     * @static
     * @memberof PosterApi
    */
   static delete = (id) => {
     return request({
       url: urlPath + 'delete/' + id,
       method: 'delete'
     })
   }

   /**
     * @description 创建广告位
     * @param {string} id id
     * @param {string} imageId 图片id
     * @param {string} sortNo 排序
     * @param {string} summary 简介
     * @param {string} title 标题
     * @param {string} type 类型
     * @static
     * @memberof PosterApi
     */
    static edit = (data) => {
      return request({
        url: urlPath + 'edit',
        method: 'put',
        data
      })
    }

    /**
   * @description 获取广告位列表数据
   * @param {Object} filters  {field	,op,value} value [EQ, NEQ, LIKE, LLIKE, RLIKE, GT, LT, GTE, LTE, IN, NOTIN, EXISTS, NEXISTS, BETWEEN, ISNULL, NOTNULL, EMPTY, NOTEMPTY, DISTINCT]
   * @param {Object} page  {page	,size,sorts } sort [ asc, desc]
   * @static
   * @memberof CityApi
   */
  static page = (data) => {
    return request({
      url: urlPath + 'page',
      method: 'post',
      data
    })
  }
}
export default PosterApi
