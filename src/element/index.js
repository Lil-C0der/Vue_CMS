import {
  Form,
  FormItem,
  Button,
  Input,
  Message,
  Container,
  Aside,
  Main,
  Header,
  Footer,
  Menu,
  Submenu,
  MenuItem
} from 'element-ui'

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
    Vue.use(Container)
    Vue.use(Aside)
    Vue.use(Main)
    Vue.use(Header)
    Vue.use(Footer)
    Vue.use(Menu)
    Vue.use(Submenu)
    Vue.use(MenuItem)
  }
}

export default element
