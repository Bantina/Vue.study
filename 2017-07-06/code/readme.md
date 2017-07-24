## 更新内容
> 点击左侧菜单栏某项，进行高亮显示；
>
> 简单的路由分配
>

### 实现思路
#### 1.高亮显示
> 1.)CSS中添加 高亮时的样式；
> 
> 2.)在data数据中增加新属性menuActive，用于记录高亮显示菜单项的index；
> 
> 3.)在li的点击事件里，将点击时的index值 传给 menuActive；
> 
> 4.)在html中，给li绑定动态类时做判断，属性menuActive与index相同时，添加高亮样式，否则无；  
> `:class="{menuActive: menuActive == index}"`

#### 2.简单的路由分配
1、 定义路由组件
```javascript
var homeComponent = { template:'<div>homeComponent</div>' }
var aboutComponent = { template:'<div>aboutComponent</div>' }
```

2、 定义路由 - 每个路由映射一个组件
```javascript
var routes = [
  { path: '/home', component:homeComponent},
  { path: '/about', component:aboutComponent}
]
```

3、 创建router实例，传入路由routes配置
```javascript
var router = new VueRouter({
  routes:routes
})
```
```javascript
//标记：vue-router 1.0 使用map()映射；
// var router = new VueRouter();
// router.map({
//  '/home':{component:homeComponent},
//  '/about':{component:aboutComponent}
// })
//Uncaught TypeError: router.map is not a function
```

4、 创建和挂载根实例
```javascript
// vue-router 1.0
// var App = Vue.extend({});
// router.start(App,'#app'); //创建一个App实例，且挂载到#app元素；
////vue 2.0报错 Uncaught TypeError: router.start is not a function

// vue-router 2.0
var menu = new Vue({
  el:'#app',
  router:router     
}).$mount('#app')
```
5、 html中渲染匹配组件  
```
<router-view></router-view> 
```

#### 错误与反思
> 使用vue-router 2.0 时报错：  
> TypeError: Cannot read property 'matched' of undefined vue.min.js:6  
> 属性 undefined 原因 将被调用的属性 定义在了 函数之后，js声明提升解析时是顺序解析，未找到该属性。


### 待完成内容记录
1、 内容组件包含：
> article组件   
> title组件  
> articallist组件  
> footer组件   

2、 菜单链接的路由分配  

3、 分页list的实现
