import Vue from 'vue'
import Router from 'vue-router'

import Layout from "../views/admin/layout/Layout";
import UserLayout from "../views/user/layout/UserLayout";



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
    component: () => import('@/views/user/home/index'),
    hidden: true
  }
]

const adminPath='/admin'

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: adminPath,
    component: Layout,
    redirect: adminPath+'/home',
    children: [{
      path: 'home',
      name: 'adminHome',
      component: () => import('@/views/admin/home/index'),
      meta: {title: '首页', icon: 'home'}
    }]
  },
  {
    path: adminPath+'/ums',
    component: Layout,
    redirect: adminPath+'/ums/user',
    name: 'adminUms',
    alwaysShow:true,
    meta: {
      title: '用户管理',
      icon: 'ums-admin',
      roles: ['ADMIN'] // you can set roles in root nav
    },
    children: [
      {
        path: 'user',
        component: () => import('@/views/admin/ums/user/index'),
        name: 'adminUser',
        meta: {
          title: '用户管理',
          icon: 'ums-admin'
        }
      }
    ]
  }
]

const userPath='/user'

export const userRoutes=[
  {
    path: userPath,
    component: UserLayout,
    redirect: userPath+'/home',
    children: [{
      path: 'home',
      name: 'userHome',
      component: () => import('@/views/user/home/index'),
      meta: {title: '首页', icon: 'home'}
    }]
  },
  // {
  //   path: '/user',
  //   component: Layout,
  //   redirect: '/user/index',
  //   name: 'ums',
  //   meta: {
  //     title: '用户信息',
  //     icon: 'ums-admin',
  //     roles: ['ADMIN'] // you can set roles in root nav
  //   },
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/user/home/index'),
  //       name: 'index',
  //       meta: {
  //         title: '用户信息展示',
  //         icon: 'ums-admin'
  //       }
  //     }
  //   ]
  // }
]

export default new Router({
   mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRoutes
})
