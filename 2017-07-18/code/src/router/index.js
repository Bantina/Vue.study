import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import article from '@/components/article'
import theme from '@/components/theme'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    }, {
    	path:'/theme',
    	name:'theme',
    	component:theme
    }, {
    	path:'/article',
    	name:'article',
    	component:article
    }, {
		path: '*',
		redirect: '/'
	}
  ]
})
