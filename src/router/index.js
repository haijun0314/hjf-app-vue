import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/page/index'
import Category from '@/page/product/category'
import Find from '@/page/find/index'
import Cart from '@/page/cart/index'
import Account from '@/page/account/index'
import Search from '@/page/product/search.vue'
import ProductDetail from '@/page/product/detail.vue'
import Comment from '@/page/product/comment.vue'
import Login from '@/page/login.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Index
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/product/detail/:id',
      component: ProductDetail
    },
    {
      path: '/product/comment/:id',
      component: Comment
    },
    {
      path: '/category',
      component: Category
    },
    {
      path: '/find',
      component: Find
    },
    {
      path: '/cart',
      component: Cart
    },
    {
      path: '/my',
      component: Account,
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      component: Login
    }
  ]
})
