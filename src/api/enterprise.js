// enterprise
import request from '@/utils/request'
const UrlPath = '/admin/enterprise/'

class EnterpriseApi {
    /**
     * @description "新增企业用户"
     * @param {string} address “address”
     * @param {string} contactPerson “contactPerson”
     * @param {string} contractPhone 'contractPhone'
     * @param {string} name 'name'
     * @param {Objest} user '{"email": "邮箱","headerUrl": "头像","mobileNo": "手机号","name": "姓名","nickname": "昵称", "password": "密码","roleId": "角色","sex": false,"username": "用户名"}'
     * @static
     * @memberof EnterpriseApi
     */
    static add = (data) => {
      return request({
        url: UrlPath + 'add',
        method: 'post',
        data
      })
    }
    /**
     * @description '显示企业用户的角色列表'
     * @param {string} token 'token'
     * @static
     * @memberof EnterpriseApi
     */
    static getroles = () => {
      return request({
        url: UrlPath + 'list/enterprise/user/roles',
        method: 'get'
      })
    }
    /**
     * @description '编辑企业用户'
     * @param {string} address “address”
     * @param {string} contactPerson “contactPerson”
     * @param {string} contractPhone 'contractPhone'
     * @param {string} name 'name'
     * @param {string} id 'id'
     * @static
     * @memberof EnterpriseApi
     */
    static edituser = (data) => {
      return request({
        url: UrlPath + 'edit',
        method: 'put',
        data
      })
    }

    /**
     * @description "根据id删除企业用户"
     * @param {string} id "id"
     * @static
     * @memberof EnterpriseApi
     */
    static delete = (id) => {
      return request({
        url: UrlPath + '/delete/' + id,
        method: 'delete'
      })
    }
    /**
     * @description '获取企业用户列表'
     * @param {Object} filters  {field	,op,value} value [EQ, NEQ, LIKE, LLIKE, RLIKE, GT, LT, GTE, LTE, IN, NOTIN, EXISTS, NEXISTS, BETWEEN, ISNULL, NOTNULL, EMPTY, NOTEMPTY, DISTINCT]
     * @param {Object} page  {page	,size,sorts } sort [ asc, desc]
     * @static
     * @memberof EnterpriseApi
     */
    static page = (data) => {
      return request({
        url: UrlPath + 'page',
        method: 'post',
        data
      })
    }
    /**
     * @description '获取企业登陆用户列表'
     * @param {Object} filters  {field	,op,value} value [EQ, NEQ, LIKE, LLIKE, RLIKE, GT, LT, GTE, LTE, IN, NOTIN, EXISTS, NEXISTS, BETWEEN, ISNULL, NOTNULL, EMPTY, NOTEMPTY, DISTINCT]
     * @param {Object} page  {page	,size,sorts } sort [ asc, desc]
     * @static
     * @memberof EnterpriseApi
     */
    static pageUser = (id, data) => {
      return request({
        url: UrlPath + 'page/user/' + id,
        method: 'post',
        data
      })
    }
    /**
     * @description '新增企业登陆用户'
     * @param {string} id 'id'
     * @param {string} email 'email'
     * @param {string} headerUrl 'headerUrl'
     * @param {string} name 'name'
     * @param {string} nickname 'nickname'
     * @param {string} mobileNo 'mobileNo'
     * @param {string} password 'password'
     * @param {string} roleId 'roleId'
     * @param {Boolean} sex 'sex'
     * @param {string} username 'username'
     * @static
     * @memberof EnterpriseApi
    */
   static addUser = (id, data) => {
     return request({
       url: UrlPath + 'add/user/' + id,
       method: 'post',
       data
     })
   }
   /**
    * @description '编辑企业登陆用户'
    * @param {string} id '企业id'
    * @param {string} id 'id'
    * @param {string} email 'email'
    * @param {string} headerUrl 'headerUrl'
    * @param {string} name 'name'
    * @param {string} nickname 'nickname'
    * @param {string} mobileNo 'mobileNo'
    * @param {string} roleId 'roleId'
    * @param {Boolean} sex 'sex'
    * @param {string} username 'username'
    * @static
    * @memberof EnterpriseApi
    */
   static editUser = (id, data) => {
     return request({
       url: UrlPath + 'edit/user/' + id,
       method: 'put',
       data
     })
   }
   /**
    * @description '通过id和企业id删除企业登陆用户'
    * @param id '企业id'
    * @param userId 'userId'
    * @static
    * @memberof EnterpriseApi
   */
  static deleteUser=(id, userId) => {
    return request({
      url: UrlPath + 'delete/user/' + id + '/' + userId,
      method: 'put'
    })
  }
    /**
     * @description 切换城市状态
     * @param {string} id 城市id
     * @static
     * @memberof EnterpriseApi
     */
    static toggle = data => {
      return request({
        url: UrlPath + 'toggle/status/' + data,
        method: 'put'
      })
    }
}
export default EnterpriseApi
