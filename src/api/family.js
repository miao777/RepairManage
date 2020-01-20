import request from '@/utils/request'
const urlPath = '/admin/family/'
/**
 *@description 家庭用户Api
 *
 * @class FamilyApi
 */
class FamilyApi {
    /**
   * @description 获取家庭分页列表
   * @param {Object} filters 过滤条件
   * @param {Object} page  分页数据条件
     * @static
     * @memberof FamilyApi
     */
    static page=data => {
      return request({
        url: urlPath + 'page',
        method: 'post',
        data
      })
    }
}
export default FamilyApi
