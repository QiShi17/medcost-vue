import Vue from 'vue'
import Router from 'vue-router'

import Layout from "../views/user/layout/Layout";



Vue.use(Router)


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
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/user/login/index'),
    hidden: true
  },
  {
    path: '/',
    component: () => import('@/views/index'),
    hidden: true
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/ums',
    component: Layout,
    redirect: '/ums/user',
    name: 'ums',
    meta: {
      title: '用户管理',
      icon: 'ums-admin',
      roles: ['ADMIN'] // you can set roles in root nav
    },
    children: [
      {
        path: 'user',
        component: () => import('@/views/admin/ums/user/index'),
        name: 'user',
        meta: {
          title: '用户管理',
          icon: 'ums-admin'
        }
      }
    ]
  }
]

export const userRoutes=[
  {
    path: '/user',
    component: Layout,
    redirect: '/user/index',
    name: 'ums',
    meta: {
      title: '用户信息',
      icon: 'ums-admin',
      roles: ['ADMIN'] // you can set roles in root nav
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/user/home/index'),
        name: 'index',
        meta: {
          title: '用户信息展示',
          icon: 'ums-admin'
        }
      }
    ]
  }
]

export default new Router({
   mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRoutes
})
