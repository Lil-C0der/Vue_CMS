import Vue from 'vue'
import App from './App.vue'
import router from './router'

import element from 'element'
import 'element-ui/lib/theme-chalk/index.css'

// 控制台报错
import 'default-passive-events'
// 可选链Polyfill
import { optionalChaining } from 'common/utils'

Vue.use(element)

Vue.prototype.$$ = optionalChaining

Vue.config.productionTip = false
new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
