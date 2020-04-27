import Vue from 'vue'
import VueRouter from 'vue-router'
import store from 'store'
import { SETCRUMBOBJ } from 'store/types'

Vue.use(VueRouter)

const Login = () =>
  import(/* webpackChunkName: "Login_Home_Welcome_Skip" */ 'views/login/Login')
const Home = () =>
  import(/* webpackChunkName: "Login_Home_Welcome_Skip" */ 'views/home/Home')
const Welcome = () =>
  import(
    /* webpackChunkName: "Login_Home_Welcome_Skip" */ 'views/home/childCPNT/welcome/Welcome'
  )
const Skip = () =>
  import(/* webpackChunkName: "Login_Home_Welcome_Skip" */ 'views/common/Skip')

const Users = () =>
  import(
    /* webpackChunkName: "Users_Rights_Roles" */ 'views/home/childCPNT/users/Users'
  )
const Rights = () =>
  import(
    /* webpackChunkName: "Users_Rights_Roles" */ 'views/home/childCPNT/power/Rights'
  )
const Roles = () =>
  import(
    /* webpackChunkName: "Users_Rights_Roles" */ 'views/home/childCPNT/power/Roles'
  )

const Categories = () =>
  import(
    /* webpackChunkName: "Categories_Params_GoodList_AddGoods" */ 'views/home/childCPNT/goods/Categories'
  )
const Params = () =>
  import(
    /* webpackChunkName: "Categories_Params_GoodList_AddGoods" */ 'views/home/childCPNT/goods/Params'
  )
const GoodsList = () =>
  import(
    /* webpackChunkName: "Categories_Params_GoodList_AddGoods" */ 'views/home/childCPNT/goods/GoodsList'
  )
const AddGoods = () =>
  import(
    /* webpackChunkName: "Categories_Params_GoodList_AddGoods" */ 'views/home/childCPNT/goods/AddGoods'
  )

const Orders = () =>
  import(/* webpackChunkName: "Orders" */ 'views/home/childCPNT/orders/Orders')

const Reports = () =>
  import(
    /* webpackChunkName: "Reports" */ 'views/home/childCPNT/reports/Reports'
  )

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/skip',
    component: Skip,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        component: Welcome,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/users',
        component: Users,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/rights',
        component: Rights,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/roles',
        component: Roles,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/categories',
        component: Categories,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/params',
        component: Params,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/goods',
        component: GoodsList,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/goods/add',
        component: AddGoods,
        meta: {
          requiresAuth: true
        },
        beforeEnter(to, from, next) {
          store.commit(SETCRUMBOBJ, { parent: '商品列表', child: '添加商品' })
          next()
        }
      },
      {
        path: '/orders',
        component: Orders,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/reports',
        component: Reports,
        meta: {
          requiresAuth: true
        }
      }
    ],
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

// 导航守卫
router.beforeEach((to, from, next) => {
  if (!to.meta.requiresAuth) {
    return next()
  } else {
    if (store.isLogin || window.sessionStorage.getItem('isLogin')) {
      return next()
    } else next('/skip')
  }
})

export default router
