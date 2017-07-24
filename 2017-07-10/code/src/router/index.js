import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'

Vue.use(Router)

export default new Router({
// > article组件   
// > title组件  
// > articallist组件  
// > footer组件  
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    }
    // ,{
    //   path: '/article',
    //   name: 'article',
    //   component: article
    // },{
    //   path: '/'articallist,
    //   name: 'articallist',
    //   component: articallist
    // },{
    //   path: '/title',
    //   name: 'title',
    //   component: title
    // },{
    //   path: '/footer',
    //   name: 'footer',
    //   component: footer
    // }
 
  ]
})
