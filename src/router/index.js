import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Login = () => import('views/login/Login')
const Home = () => import('views/home/Home')
const Welcome = () => import('views/home/childCPNT/welcome/Welcome')
const SKip = () => import('views/common/Skip')
const Users = () => import('views/home/childCPNT/users/Users')
const Rights = () => import('views/home/childCPNT/power/Rights')
const Roles = () => import('views/home/childCPNT/power/Roles')
const Categories = () => import('views/home/childCPNT/goods/Categories')
const Params = () => import('views/home/childCPNT/goods/Params')
const GoodsList = () => import('views/home/childCPNT/goods/GoodsList')
const AddGoods = () => import('views/home/childCPNT/goods/AddGoods')
const Orders = () => import('views/home/childCPNT/orders/Orders')

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [
      { path: '/welcome', component: Welcome },
      { path: '/users', component: Users },
      { path: '/rights', component: Rights },
      { path: '/roles', component: Roles },
      { path: '/categories', component: Categories },
      { path: '/params', component: Params },
      { path: '/goods', component: GoodsList },
      { path: '/goods/add', component: AddGoods },
      { path: '/orders', component: Orders }
    ]
  },
  {
    path: '/skip',
    component: SKip
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

// 导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  // 前往提示页面
  if (to.path === '/skip') return next()
  // 获取当前的token
  const tokenStr = sessionStorage.getItem('token')
  // 没有token 即用户尚未登录
  if (!tokenStr) {
    // 跳转提示页面
    return next('/skip')
  }
  if (to.path === '/goods/add') {
    sessionStorage.setItem(
      'crumbObj',
      JSON.stringify({
        parent: '商品管理',
        child: '添加商品'
      })
    )
    // sessionStorage.setItem('activeIndex', to.path.slice(1).split('/')[1])
    return next()
  }
  // 保存左侧菜单二级按钮的index
  sessionStorage.setItem('activeIndex', to.path.slice(1))
  // 放行
  next()
})

export default router
