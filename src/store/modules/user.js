// import { login, getInfo, logout } from '@/api/user'
import updateUserconntentApi from '@/api/user'
import { getToken, setToken, removeToken, removeRole, setRole } from '@/utils/auth'
import HeaderUrl from '@/images/avatar.png'

const state = {
  token: getToken(),
  name: '',
  avatar: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      updateUserconntentApi.login({ username: username.trim(), password: password })
        .then(response => {
          const { data } = response
          commit('SET_TOKEN', data.Authorization)
          sessionStorage.setItem('info', JSON.stringify('1'))
          setToken(data.Authorization)
          setRole(response.role)
          resolve()
        }).catch(error => {
          reject(error)
        })
    })
  },
  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      updateUserconntentApi.getInfo().then(response => {
        const { data } = response
        if (!data) {
          reject('当前用户状态异常，请重新登录。')
        }
        const { name, headerUrl } = data
        commit('SET_NAME', name)
        commit('SET_AVATAR', headerUrl || HeaderUrl)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      updateUserconntentApi.logout().then(() => {
        commit('SET_TOKEN', '')
        commit('SET_NAME', '')
        removeToken()
        removeRole()
        sessionStorage.setItem('num', '1')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
