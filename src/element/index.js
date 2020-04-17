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
  MenuItem,
  Breadcrumb,
  BreadcrumbItem,
  Card,
  Row,
  Col,
  Table,
  TableColumn,
  Switch,
  Tooltip,
  Pagination,
  Dialog,
  MessageBox,
  Tag
} from 'element-ui'

const element = {
  install: function (Vue) {
    Vue.use(Form)
    Vue.use(FormItem)
    Vue.use(Button)
    Vue.use(Input)
    Vue.use(Container)
    Vue.use(Aside)
    Vue.use(Main)
    Vue.use(Header)
    Vue.use(Footer)
    Vue.use(Menu)
    Vue.use(Submenu)
    Vue.use(MenuItem)
    Vue.use(Breadcrumb)
    Vue.use(BreadcrumbItem)
    Vue.use(Card)
    Vue.use(Row)
    Vue.use(Col)
    Vue.use(Table)
    Vue.use(TableColumn)
    Vue.use(Switch)
    Vue.use(Tooltip)
    Vue.use(Pagination)
    Vue.use(Dialog)
    Vue.use(Tag)
    Vue.prototype.$message = Message
    Vue.prototype.$confirm = MessageBox.confirm
  }
}

export default element