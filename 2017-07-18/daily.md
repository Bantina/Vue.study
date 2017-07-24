# 学习内容：
### 知乎日报demo的实现，要求如下：
> 数据来源：知乎接口提供的动态数据
> 
> 实现菜单列表的展示；
> 
> 实现首页按时间陈列最新内容；
> 
> 实现标题内容点击后的具体文章的展示；   

### 知识点汇集
#### vue-router 单页面应用的路由转换
> 1.一个路径可以匹配多个路由，匹配优先级按照定义顺序，谁先定义，谁优先级最高    
> 2.复用组件时，想对路由的参数响应，可以使用watch监测$route对象。   
```javascript
const User = {
  template: '...',
  watch: {
    '$route' (to, from) {
      // 对路由变化作出响应...
    }
  }
}
```
> 3. 路由嵌套：使用<router-view></router-view>渲染通过路由映射过来的组件，路径更改时，<router-view>内容相对应的改变。    
> 4.在模版中嵌套<router-view>时，需要在VueRouter的参数中使用children属性的配置；   
```javascript
const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User,
      children: [
        {
          // 当 /user/:id/profile 匹配成功，
          // UserProfile 会被渲染在 User 的 <router-view> 中
          path: 'profile',
          component: UserProfile
        },
        {
          // 当 /user/:id/posts 匹配成功
          // UserPosts 会被渲染在 User 的 <router-view> 中
          path: 'posts',
          component: UserPosts
        }
      ]
    }
  ]
})
```
> 5.使用<router-link>定义导航链接,html中编译为a标签   
> 6.router.push(location)，在history栈中添加一个新的纪录,=window.history.pushState.     
> 7.router.replace(location),替换当前的history纪录,=window.history.replaceState.     
> 8.router.go(n),history纪录中向前或后退n步,=window.history.go(n).     
> 9.重定向,通过routes配置定义   

#### axios模块 -对vue-resource的替代
vue更新到2.0，不再更新vue-resource，用axios替代它请求数据  
```javascript
axios.request(config)

axios.get(url[, config])

axios.delete(url[, config])

axios.head(url[, config])

axios.post(url[, data[, config]])

axios.put(url[, data[, config]])

axios.patch(url[, data[, config]])
```

### 明日更新内容
> 实现菜单列表的切换    
> 样式优化   
