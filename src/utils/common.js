export function getUrlRelativePath(url) {
  var arrUrl = url.split('//')

  var start = arrUrl[1].indexOf('/')
  var relUrl = arrUrl[1].substring(start)

  if (relUrl.indexOf('?') !== -1) {
    relUrl = relUrl.split('?')[0]
  }
  return relUrl
}

export const successInfo = that => that.$message({
  message: '操作成功',
  type: 'success'
})

export const errorInfo = that => that.$message({
  message: '操作失败',
  type: 'error'
})

export const errorMessage = (that, msg) => that.$message({
  message: msg,
  type: 'error'
})

