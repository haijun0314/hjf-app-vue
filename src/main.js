/**
 * 项目入口js文件
 */
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import store from './store/store'
// 引用工具文件
import VueLazyload from 'vue-lazyload'// 图片延迟加载组件
import AxiosUtils from './utils/axiosUtils.js'// ajax工具组件
import CommonUtils from './utils/commonUtils.js'// 公共js工具组件
import Config from './utils/configUtils.js'// 系统配置组件
// muse-ui  vue框架
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-carbon.css'
import InfiniteScroll from 'vue-infinite-scroll'// 滚动刷新组件
// 提示框组件
import 'vue2-toast/lib/toast.css'
import Toast from 'vue2-toast'
Vue.use(Toast)
Vue.use(Vuex)
Vue.use(InfiniteScroll)
// 全局引入
require('./assets/css/base.css')
require('./assets/css/common.css')
Vue.use(MuseUI)
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: require('./assets/images/err.png'),
  loading: require('./assets/images/loading.gif'),
  attempt: 1,
  listenEvents: ['scroll']
})
// 将工具方法绑定到全局
Vue.prototype.$axios = AxiosUtils
Vue.prototype.config = Config
Vue.prototype.$commonUtils = CommonUtils
Vue.config.productionTip = false
if (window.sessionStorage.userInfo) {
  // store.dispatch('setUserInfo', window.sessionStorage.userInfo)
  // console.log(window.sessionStorage.userInfo)
}
/* eslint-disable no-new */
// 登录中间验证，页面需要登录而没有登录的情况直接跳转登录
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.state.userInfo) {
      next()
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    next()
  }
})
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
