import Cookies from 'js-cookie'

const TokenKey = 'Authorization'
const TokenRole = 'role'
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}
export function setRole(role) {
  return Cookies.set(TokenRole, role)
}
export function removeToken() {
  return Cookies.remove(TokenKey)
}
export function removeRole() {
  return Cookies.remove(TokenRole)
}
