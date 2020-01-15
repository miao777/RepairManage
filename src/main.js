import '@/icons' // icon
import '@/permission' // permission control
import '@/styles/index.scss' // global css
import ElementUI from 'element-ui' // 引入ElementUI
import Cookies from 'js-cookie' // 引入一个Cookies的工具
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import Vue from 'vue' // 引入VUE
// import Print from './tools/Print'
import Print from 'vue-print-nb'
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
import { mockXHR } from '../mock'
import App from './App'
import i18n from './lang' // 国际化
import router from './router'
import store from './store'
import './styles/element-variables.scss'

Vue.use(Print)
if (process.env.NODE_ENV === 'production') {
  mockXHR()
}
// set ElementUI lang to EN
Vue.use(ElementUI, {
  size: Cookies.get('size') || 'small', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
