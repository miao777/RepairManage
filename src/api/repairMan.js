import request from '@/utils/request'
const UrlPath = '/repair/man/'

class repairManApi {
  /**
     * @description '创建维修人员'
     * @param {string} idCard 'idCard'
     * @param {Object} '"user": {"email": "邮箱","headerUrl": "头像","mobileNo": "手机号", "name": "姓名","nickname": "昵称", "password": "密码","roleId": "角色","sex": false,"username": "用户名"}}'
     * @static
     * @memberof repairManApi
     */
    static add = (data) => {
      return request({
        url: UrlPath + 'add',
        method: 'post',
        data
      })
    }

    /**
     * @description '根据id删除维修人员'
     * @param {string} id 'id'
     * @static
     * @memberof repairManApi
     */
    static delete = (id) => {
      return request({
        url: UrlPath + 'delete/' + id,
        method: 'delete'
      })
    }

    /**
     * @description '编辑维修人员信息'
     * @param {string} id 'id'
     * @param {string} idCard 'idCard'
     * @param {Object} '"user": {"email": "邮箱","headerUrl": "头像","mobileNo": "手机号", "name": "姓名","nickname": "昵称", "password": "密码","roleId": "角色","sex": false,"username": "用户名"}}'
     * @static
     * @memberof repairManApi
     */
    static edit = (data) => {
      return request({
        url: UrlPath + 'edit',
        method: 'put',
        data
      })
    }

    /**
     * @description '维修人员列表'
     * @param {Object} filters  {field	,op,value} value [EQ, NEQ, LIKE, LLIKE, RLIKE, GT, LT, GTE, LTE, IN, NOTIN, EXISTS, NEXISTS, BETWEEN, ISNULL, NOTNULL, EMPTY, NOTEMPTY, DISTINCT]
     * @param {Object} page  {page	,size,sorts } sort [ asc, desc]
     * @static
     * @memberof menuApi
     */
    static page = (data) => {
      return request({
        url: UrlPath + 'page',
        method: 'post',
        data
      })
    }
}

export default repairManApi
