## 本周完成内容

### Vue的基础学习

#### 1. 理解Vue的开发思想
> 1.）采用MVVM的框架模式，使得数据能够进行双向绑定，前后端完全分离。  
> 2.）Vue主要用来构建数据驱动的web界面库，聚焦于视图层。  

#### 2. Vue的指令学习
##### 1.）内部指令  
  - v-show (实质改变 style="display:none;")
  - v-if   (表达式赋值的bool值)
  - v-els  (同以上两指令配合使用)
  - v-html  (更新元素的innerHTML值)
  - v-on    (绑定事件监听器)
  - v-model (为表单元素创建双向数据绑定)
  - v-bind  (响应更新HTML特性attribute)
  - v-ref   (父组件上注册一个子组件的索引)
  - v-repeat
  - v-for  (数据的重复渲染)
  - v-pre  (编译时跳过当前元素和其子元素)
  - v-text (更新元素的text值)
  - v-el   (为DOM元素注册一个索引)
  - v-cloak
##### 2.）自定义指令
> 全局注册自定义指令：Vue.directive   
> 局部注册自定义指令：directives

##### 3.) 组件的学习
> 用Vue.extend创建组件
```javascript
var ContentComponent = Vue.extend({
  props:[''],
  template:`<div class="appRight-list"></div>`,
  methods:{}
})
```
> 用Vue.component注册组件
```javascript
Vue.component('content-component',ContentComponent);
```

##### 4.)简单的路由分配
> 1、定义路由组件  
> 2、定义路由 - 每个路由映射一个组件  
> 3、创建router实例，传入路由routes配置  
> 4、创建和挂载根实例  
> 5、html中渲染匹配组件  

##### 5.)使用vue-cli构建项目
> 安装vue-cli  
```
npm install -g vue-cli
```
> 构建项目  
```
vue init webpack project-name
```
> 项目结构分析

## 学习与反思
> 本周的学习主要建立在书籍之上，对Vue的基础概念进行了学习。  
> 此过程中发现学习的效率低，且印象不深刻，并不能应用到实际项目中。  
> 所以我觉得在以后的学习中，应该多结合实际项目对Vue进行实操学习，争取做到活学活用。  