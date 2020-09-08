import request from '@/utils/request'
const urlPath = '/admin/feedback/'
const path = '/admin/feedback/title/'

class FeedbackApi {
    /**
     * @description 反馈列表
     * @param {Object} filters 过滤条件
     * @param {Object} page 分页参数
     * @param {*} data
     * @static
     * @memberof FeedbackApi
     */
    static feedbackpage = (data) => {
      return request({
        url: urlPath + 'page',
        method: 'post',
        data: data
      })
    }

    /**
     * @description 反馈处理
     * @param {String} id id
     * @static
     * @memberof FeedbackApi
     */
    static feedbackedit = (id) => {
      return request({
        url: urlPath + 'handle/' + id,
        method: 'put'
      })
    }

    /**
     * @description 删除反馈信息
     * @param {id} id id
     * @static
     * @memberof FeedbackApi
     */
    static feedbackdelete = (id) => {
      return request({
        url: urlPath + 'delete/' + id,
        method: 'delete'
      })
    }

    // 反馈标题管理
    // 列表
    static titlepage = (data) => {
      return request({
        url: path + 'page',
        method: 'post',
        data: data
      })
    }
    // 新增
    static titleadd = (data) => {
      return request({
        url: path + 'add',
        method: 'post',
        data: data
      })
    }
    // 修改
    static titleedit = (data) => {
      return request({
        url: path + 'edit',
        method: 'put',
        data: data
      })
    }
    // 删除
    static titledelete = (id) => {
      return request({
        url: path + 'delete/' + id,
        method: 'delete'
      })
    }
    // 级别
    static titlegetlevel = () => {
      return request({
        url: path + 'list/level',
        method: 'get'
      })
    }
}
export default FeedbackApi
