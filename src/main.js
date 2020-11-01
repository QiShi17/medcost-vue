import Vue from 'vue'

// import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import Element from 'element-ui'
import "element-ui/lib/theme-chalk/index.css"
// import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

// import axios from 'axios'

import '@/styles/index.scss' // global css

import App from './App.vue'
import router from './router'
import store from './store'

import '@/icons' // icon

import './permission' // permission control


import Router from 'vue-router'

Vue.use(Element)

Vue.config.productionTip = false

// Vue.prototype.$axios = axios

const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
