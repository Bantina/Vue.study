## 一、Vue.js 概念性学习
### MVC、MVP与MVVM 的理解与区别：
  - MVC/MVP 基本思想：Controller/Presenter负责逻辑的处理，Model提供数据，View 负责显示。
  1、 MVC中 view与Model不直接联系，通过Controller进行连接；
  单向连接如图所示：
  ```
   Model <─────────┐
     │         Cotroller
     │             ^
     └──> View ────┘  
  ```
  含用户操作,用户直接控制Controller
  ```
    Model <────────┐
     │         Cotroller
     │             ^
     └──> View     │ 
                  User
  ```
  2、 MVP 中P将V和M进行了分离，与MVVM不同的是，MVP中V的改变并没有改变P，是因为它们通过定义好的借口进行交互
  3、 MVVM 中V的改变会自动更新到VM的原因是因为它们之间通过DataBinding数据绑定的模式实行：  
      ViewModel中的属性实现了Observer，当属性变更时都能触发对应的操作  
  
### Vue.js特性
 1、 轻量，体积小  
 2、 数据绑定简单、方便  
 3、 指令  
 4、 插件化  

### Vue.js与AngularJS区别：  
  **同**：都支持指令、过滤器、双向绑定，不支持低端浏览器。  
  **异**：性能上而言，AngularJS依赖对数据做脏检查，所以Watcher越做越慢；Vue 基于依赖追踪的观察 且 使用异步队列更新，所有数据都是独立触发的。

### Vue.js与React区别：
 **同**：1.中心思想-一切都是组件  
    2.都提供合理的钩子函数  
    3.都不内置AJAX、Router等功能到核心包，以其他方式如插件加载  
    4.在组件开发中都支持mixins特性。  
 **异**：1.React依赖Virtual DOM，做脏检查，而VUE 使用DOM模版  
    2.VUE在模版中提供了指令、过滤器 快捷操作DOM  

## 二、Vue.js 语法语义及结构学习
### 1.自定义属性指令：在元素中以 v-dirName 使用
```javascript
//全局注册指令：-----Vue.directive
Vue.directive('dirName',function(){
  //......
})
//局部注册指令：-----使用组件的directives
new Vue({
  directives:{
     dirName:{
      //......
     }
  }
})
```
##### 自定义指令的钩子函数：
```javascript
Vue.directive('dirName',{
  //准备工作
  bind:function(){}
  //值更新时的工作
  update:function(newVal,oldVal){}
  //清理工作-结束绑定后
  unbind:function(){}
})
```
##### 指令实例的属性
- 指令钩子函数中的this指向这个指令对象，其属性有：
> el:指令绑定的元素
> 
> vm：上下文ViewModel
> 
> expression: 指令表达式
> 
> arg：指令的参数
> 
> name 指令名字，不含前缀
> 
> modifiers：对象，包含指令的修饰符
> 
> descriptor：对象，包含指令的解析结果

### 2.自定义元素指令
基本上同自定义属性指令，但其使用elementDirctive定义
```javascript
Vue.elementDirective('dirName',{
  bind:function(){}
  update:function(newVal,oldVal){}
  unbind:function(){}
})
```
##### 元素指令与普通指令的不同：
1、 元素指令不接受参数或表达式，但可以读取元素的特性。
2、 元素指令具有终结性。只有该元素指令本身可以操作该元素及其子元素，Vue将跳过该元素及其子元素。


