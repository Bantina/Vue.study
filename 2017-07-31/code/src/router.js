import Vue from 'vue'
import VueRouter from 'vue-router'

//import  routes from './routes'

import goods from './components/goods/goods.vue'
import ratings from './components/ratings/ratings.vue'
import seller from './components/seller/seller.vue'

Vue.use( VueRouter )
const router = new VueRouter( { //注：new VueRouter 传入的是一个对象
  mode: 'hash',
  base: __dirname,
  routes: [
    {
      path: '/',
      component: goods,
      name: '/'
    },
    {
      path: '/goods',
      component: goods,
      name: 'goods'
    },
    {
      path: '/ratings',
      component: ratings,
      name: 'ratings'
    },
    {
      path: '/seller',
      component: seller,
      name: 'seller'
    }
    /*,{
      path: '*',
      redirect: '/'
    }*/
  ]
} )
export default router
