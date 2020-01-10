import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
// import store from '../store/modules/user'
import { loadLeftMenu } from '@/api/menu.js'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export var constantRoutes = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/仪表盘',
    name: '仪表盘',
    children: [{
      path: '/仪表盘',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '仪表盘', icon: 'el-icon-house' }
    }]
  }
  // 404 page must be placed at the end !!!
  // { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter(menus) {
  menus.forEach(menu => {
    const exist = constantRoutes.filter(router => {
      let result = router.name === menu.name
      if (!result && router.children && router.children.length > 0) {
        result = router.children.filter(child => child.name === menu.name).length > 0
      }
      return result
    }).length > 0
    if (!exist) {
      constantRoutes.push(menu)
    }
  })
  // console.log(constantRoutes, '路由刷新')
  // const newRouter = createRouter()
  // router.matcher = newRouter.matcher // reset router
}

export function loadRemoteRouters() {
  return new Promise((resolve, reject) => {
    loadLeftMenu().then(resp => {
      if (resp.success) {
        const menus = resp.rows.map(row => {
          const rootMenu = {
            path: '/' + row.title,
            component: Layout,
            name: row.id,
            meta: { title: row.title, icon: row.icon }
          }

          if (row.children && row.children.length > 0) {
            rootMenu.children = row.children.map(child => {
              return {
                path: '/' + row.title + '/' + child.title,
                component: resolve => require(['@/views' + child.href + '/index'], resolve),
                name: child.id,
                meta: { title: child.title, icon: child.icon }
              }
            })
          } else {
            rootMenu.children = [{
              path: '/' + row.title,
              component: Layout,
              name: row.id,
              meta: { title: row.title }
            }]
          }
          return rootMenu
        })
        // 其他页面直接跳到404
        menus.push({ path: '*', redirect: '/404', hidden: true })
        resetRouter(menus)
        resolve(menus)
      } else {
        reject('失败')
      }
    }).catch(error => {
      reject(error)
    })
  })
}

export default router
