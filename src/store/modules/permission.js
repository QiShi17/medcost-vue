import { asyncRoutes,userRoutes, constantRoutes } from '@/router'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }

    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      console.info("tmproutes:"+tmp.path)
      res.push(tmp)
    }
  })

  return res
}

const permission={
  state:{
    routers: [],
    userRouters:[],
    addRouters: []
  },
  mutations: {
    SET_ROUTES: (state, routes) => {
      state.addRouters = routes
      state.routers = constantRoutes.concat(routes)
    },
    SET_USER_ROUTES: (state, routes) => {
      state.addRouters = state.addRouters.concat(routes)
      state.userRouters = constantRoutes.concat(routes)
    }
  },
  actions:{
    GenerateRoutes({ commit }, roles) {
      console.info("generate routes")
      return new Promise(resolve => {
        let accessedRoutes
        console.info("roles:"+roles)
        if (roles.includes('ADMIN')) {
          accessedRoutes = asyncRoutes || []
        } else {
          asyncRoutes.forEach(router=>{
            console.info("router:"+router.path)
              }

          )
          accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
        }

       let userAccessedRoutes
        userAccessedRoutes=filterAsyncRoutes(userRoutes,roles)
        commit('SET_ROUTES', accessedRoutes)
        commit('SET_USER_ROUTES', userAccessedRoutes)
        resolve(accessedRoutes.concat(userAccessedRoutes))
      })
    }
  }

}
export default permission
