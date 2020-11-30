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
  },
  {
    path: adminPath+'/master',
    component: Layout,
    redirect: adminPath+'/master/passed_account',
    name: 'master',
    alwaysShow:true,
    meta: {
      title: '单据复查',
      icon: 'ums-admin',
      roles: ['MASTER'] // you can set roles in root nav
    },
    children: [
      {
        path: 'passed_account',
        component: () => import('@/views/admin/master/esMasterPassedAccount'),
        name: 'inReviewAccountMaster',
        meta: {
          title: '已通过单据',
          icon: 'ums-admin'
        }
      },
      {
        path: 'reject_account',
        component: () => import('@/views/admin/master/esMasterRejectAccount'),
        name: 'rejectAccountMaster',
        meta: {
          title: '已拒绝单据',
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
      name: 'esHome',
      component: () => import('@/views/user/home/index'),
      meta: {title: '首页', icon: 'home'}
    }]
  },
  {
    path: userPath+'/apply',
    component: UserLayout,
    redirect: userPath+'/apply/stu',
    name: 'apply',
    meta: {
      title: '报销申请',
      icon: 'ums-admin',
      roles: ['USER'] // you can set roles in root nav
    },
    children: [
      {
        path: 'stu',
        component: () => import('@/views/user/apply/esStu'),
        name: 'stu',
        meta: {
          title: '学生报销',
          icon: 'ums-admin'
        }
      },
      {
        path: 'onduty',
        component: () => import('@/views/user/apply/esOnduty'),
        name: 'onduty',
        meta: {
          title: '在职员工报销',
          icon: 'ums-admin'
        }
      },
      {
        path: 'off',
        component: () => import('@/views/user/apply/esOff'),
        name: 'off',
        meta: {
          title: '离休人员报销',
          icon: 'ums-admin'
        }
      },
      {
        path: 'retire',
        component: () => import('@/views/user/apply/esRetire'),
        name: 'retire',
        meta: {
          title: '退休人员报销',
          icon: 'ums-admin'
        }
      },
      {
        path: 'other',
        component: () => import('@/views/user/apply/esOther'),
        name:'other',
        meta: {
          title: '其他人员报销',
          icon: 'ums-admin'
        }
      },

    ]
  },
  {
    path: userPath+'/submit',
    component: UserLayout,
    redirect: userPath+'/submit/draft_account',
    name: 'submit',
    meta: {
      title: '我提交的单据',
      icon: 'ums-admin',
      roles: ['USER'] // you can set roles in root nav
    },
    children: [
      {
        path: 'draft_account',
        component: () => import('@/views/user/submit/esDraftAccount'),
        name: 'draftAccountSubmit',
        meta: {
          title: '草稿',
          icon: 'ums-admin'
        }
      },
      {
        path: 'in_review_account',
        component: () => import('@/views/user/submit/esInReviewAccount'),
        name: 'esInReviewAccountSubmit',
        meta: {
          title: '审核中',
          icon: 'ums-admin'
        }
      },
      {
        path: 'passed_account',
        component: () => import('@/views/user/submit/esPassedAccount'),
        name: 'esPassedAccountSubmit',
        meta: {
          title: '审核通过',
          icon: 'ums-admin'
        }
      },
      {
        path: 'upassed_account',
        component: () => import('@/views/user/submit/esUnpassedAccount'),
        name: 'esUnpassedAccountSubmit',
        meta: {
          title: '审核不通过',
          icon: 'ums-admin'
        }
      },
      {
        path: 'reject_account',
        component: () => import('@/views/user/submit/esRejectAccount'),
        name: 'esRejectAccountSubmit',
        meta: {
          title: '已拒绝',
          icon: 'ums-admin'
        }
      },
      {
        path: 'deliver_account',
        component: () => import('@/views/user/submit/esDeliverAccount'),
        name: 'esDeliverAccountSubmit',
        meta: {
          title: '已收单',
          icon: 'ums-admin'
        }
      },

    ]
  },
  {
    path: userPath+'/review',
    component: UserLayout,
    redirect: userPath+'/review/in_review_account',
    name: 'review',
    meta: {
      title: '我审核的单据',
      icon: 'ums-admin',
      roles: ['REVIEWER'] // you can set roles in root nav
    },
    children: [
      {
        path: 'in_review_account',
        component: () => import('@/views/user/review/esInReviewAccount'),
        name: 'esInReviewAccountReview',
        meta: {
          title: '待审核',
          icon: 'ums-admin'
        }
      },
      {
        path: 'passed_account',
        component: () => import('@/views/user/review/esPassedAccount'),
        name: 'esPassedAccountReview',
        meta: {
          title: '审核通过',
          icon: 'ums-admin'
        }
      },
      {
        path: 'upassed_account',
        component: () => import('@/views/user/review/esUnpassedAccount'),
        name: 'esUnpassedAccountReview',
        meta: {
          title: '审核不通过',
          icon: 'ums-admin'
        }
      },
      {
        path: 'reject_account',
        component: () => import('@/views/user/review/esRejectAccount'),
        name: 'esRejectAccountReview',
        meta: {
          title: '已拒绝',
          icon: 'ums-admin'
        }
      }
    ]
  },
  {
    path: userPath+'/deliver',
    component: UserLayout,
    redirect: userPath+'/deliver/passed_account',
    name: 'deliver',
    meta: {
      title: '收单',
      icon: 'ums-admin',
      roles: ['DELIVER'] // you can set roles in root nav
    },
    children: [
      {
        path: 'passed_account',
        component: () => import('@/views/user/deliver/esPassedAccount'),
        name: 'esPassedAccountReview',
        meta: {
          title: '审核通过',
          icon: 'ums-admin'
        }
      },
      {
        path: 'deliver_account',
        component: () => import('@/views/user/deliver/esDeliverAccount'),
        name: 'esDeliverAccountReview',
        meta: {
          title: '已收单',
          icon: 'ums-admin'
        }
      },
    ]
  }
]

export default new Router({
   mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRoutes
})
