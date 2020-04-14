import { Form, FormItem, Button, Input, Message } from 'element-ui'

const element = {
  install: function (Vue) {
    Vue.use(Form)
    Vue.use(FormItem)
    Vue.use(Button)
    Vue.use(Input)
    Message.install = function (Vue) {
      Vue.prototype.$message = Message
    }
    Vue.use(Message)
  }
}

export default element
