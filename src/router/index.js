import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
import Index from '../views/index.vue'
import Signup from '../views/signup.vue'
import Signin from '../views/signin.vue'
import Home from '../views/home.vue'
import Create from '../views/article-edit.vue'
import Detail from '../views/article-detail.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Index,
    children: [{
      path: '',
      name: 'Home',
      component: Home,
      }, {
        path: 'create',
        name: 'Create',
        component: Create
      }, {
        path: 'detail/:postId',
        name: 'Detail',
        component: Detail
      }]
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/signin',
    name: 'Signin',
    component: Signin
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // ...
  // console.log(to, store)
  // 未登录强制跳转回首页
  if (to.name === 'Create' && !store.state.isLogin) {
    next({name: 'Home'})
    return
  }
  next()
})

export default router
