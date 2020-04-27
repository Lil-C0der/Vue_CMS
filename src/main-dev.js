import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import element from './element'
import 'element-ui/lib/theme-chalk/index.css'

import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

// 控制台报错
import 'default-passive-events'
// 可选链Polyfill
import { optionalChaining } from 'common/utils'

Vue.use(element)
Vue.use(VueQuillEditor)

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
