// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'

Vue.use( Vuex )
Vue.config.productionTip = false

const store = new Vuex.Store({
	state: {
		num: 1 //控制菜单项的状态(id)
	},
	mutations:{ //actions通过分发mutations来修改store实例的状态
		//mutation都是同步事务
		add:(state, n) => state.num = n
	}
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
