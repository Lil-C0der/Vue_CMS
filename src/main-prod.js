import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 控制台报错
import 'default-passive-events'
// 可选链Polyfill
import { optionalChaining } from 'common/utils'

// 解决可选链在template中使用的问题
Vue.prototype.$$ = optionalChaining
// 添加事件总线对象
Vue.prototype.$bus = new Vue()

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
