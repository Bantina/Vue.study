# 学习内容：
### 知乎日报demo的更新，要求如下：  

> 实现菜单列表的切换及对应内容的响应 
> 
> 实现首页 load more功能，按日期加载；
> 
> 样式优化   

### 重点难点
- 切换菜单项，url地址改变，右侧内容随之切换。
剖析：涉及到了VUE不同组件之间的通信问题,解决方案有：
> 1.子组件的props声明它期待从父组件获得的数据
> 
> 2.$dispatch 和 $broadcast,2.0废弃使用
> 
> 3.vuex状态管理 [实例理解](https://segmentfault.com/a/1190000005780326#articleHeader0)   
#### 使用vuex进行组件实例的状态管理
1. 安装vuex依赖。 
2. 导入 import Vuex from 'vuex'   
  Vue.use( Vuex )  
3. 在根组件中创建Vuex.Store实例   
```javascript
// 如果在模块化构建系统中，请确保在开头调用了 Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})
```
4. 在组件中使用import { mapState } from 'vuex'引入辅助函数,帮助我们生成计算属性-多状态管理   
5. 在计算属性computed内通过mapState改变state状态,这样做的好处是将state状态的修改集中在一起，明了清晰   
6. 使用store.state来获取状态对象   
7. 使用store.commit()方法触发状态变更，commit触发的事件在mutations中定义；   
8. mutations中直接修改的是状态；   


### 遇到的问题及解决方案

#### 使用vue-router 获取url的请求参数(eg:id)时报错
```javascript
let id = this.$router.query.id;
//TypeError: Cannot read property 'id' of undefined
```
问题根源在于 vue.$router 和 vue.route 的区别
- vue.$router是一个封装了的VueRouter对象，实例如下：
```javascript
VueRouter{
  afterHooks : Array(0),
  app : Vue$3,
  apps : Array(1),
  beforeHooks : Array(0),
  fallback : false,
  history : HashHistory,
  matcher : Object
  mode : "hash",
  options : { //最初始的路由分配 配置 对象
    routes : [{ //对象数组
      component : Object,
      name : "home",
      path : "/"
    }]
  },
  resolveHooks : Array(0)
}
```
- 而vue.route取到的是普通对象，里面的属性是自定义的
```javascript
  //使用router.push()加的导航
  router.push({
    path:'register',
    query:{
      plan:'privare'
    }
  })
  //在组件内获取query参数时使用$route
  let plan = this.$route.query.plan;
```
解决方案：将 $router 改为 $route 

#### css3实现瀑布流
```
/* 最外层包裹层 */
.theme-container{
  -moz-column-count:4; /* Firefox */
    -webkit-column-count:4; /* Safari 和 Chrome */
    column-count:4;  /* 分成的列数 IE9及以前版本不支持*/
    -moz-column-gap: 1em;
    -webkit-column-gap: 1em;
    column-gap: 1em; /* 规定列的间隙 */
    padding-bottom: 30px;
}
/* 每一小块的设置 */
.theme{
   padding: 1em;
   margin: 0 0 1em 0;
   -moz-page-break-inside: avoid;
   -webkit-column-break-inside: avoid;
   break-inside: avoid; /* 避免元素内部断行并产生新列 */
   box-shadow:0 3px 10px 0 rgba(11, 22, 37, 0.15);
   border-radius: 4px;
   cursor: pointer;
}
/* 图片适应大小 */
.theme img{
  width: 100%;
}
```



