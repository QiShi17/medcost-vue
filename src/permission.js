import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie

const whiteList = ['/login','/qwerr'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  console.info("——————————to:"+to.path+"————from"+from.path+"———————————")
  NProgress.start()
  if (getToken()) {
    console.info("有token")
    if (to.path === '/login') {
      console.info("有token,是login")
      next({ path: '/' })
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      if (store.getters.roles.length === 0) {
        console.info("有token,不是login,无role")
        store.dispatch('GetInfo').then(res => { // 拉取用户信息
          let roles=res.data.roles;`1ws2`
          store.dispatch('GenerateRoutes', roles).then((accessedRoutes) => { // 生成可访问的路由表
            router.addRoutes(accessedRoutes); // 动态添加可访问路由表
        //    console.info("routes:"+store.getters.routers.length)
             next({ ...to, replace: true })
          })
        }).catch((err) => {
          store.dispatch('FedLogOut').then(() => {
            Message.error(err || 'Verification failed, please login again')
            next({path:'/login', replace: true })
          })
        })
      } else {
        // console.info("有token,不是login,有role")
        // console.info(store.getters.routers.concat(store.getters.userRouters).length)
        //  let canToRouter=false
        // store.getters.routers.concat(store.getters.userRouters).forEach(router=>{
        //   console.info("当前的router:"+router.path+",当前的routerRedirect:"+router.redirect)
        //   console.info("当前的to:"+to.path)
        //   console.info("——————————————————————————————————————————")
        //   if(router.path===to.path||router.redirect===to.path||) {
        //
        //     canToRouter=true;
        //     console.info("canToRouter")
        //
        //   }else{
        //     console.info("cannotToRouter")
        //   }
        // })
        // if(canToRouter) next()
        // else{
        //   store.dispatch('FedLogOut').then(() => {
        //     Message.error('Verification failed, please login again')
        //     next({path:'/login', replace: true })
        //   })
        // }
        next();
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      console.info("无token:白名单")
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
