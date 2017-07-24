# 学习内容
### 用vue实现一个左菜单导航，要求如下：
> 读取json数据 动态绑定菜单数据；
>
> 点击菜单某一项，对应的内容呈现在页面右侧；
>

## 第一版 V1
### 遇到的问题及解决方法：
  - 菜单选项改变时对应的页面内容也改变
  1、 将页面内容保存在json数据对应的每一条中，用一对键值对保存；
  2、 在点击事件中 传递该菜单项的index值；
  3、 在Vue的data数据中使用一个公共属性(content)保存每次点击时对应菜单项index的页面内容；
  4、 将content值绑定到页面中显示。  
### 需改进的地方：
  1、 界面的整洁及完善；
  2、 编码规范；
  3、 页面内容使用属性值绑定，呈现内容过于单一，不利于后期扩展，可使用组件提高代码的可重用性

## 第二版 V2
### 已改进的地方：
  1. 界面优化；
  2. 页面内容扩展；  
### 学习内容：
- 初步了解Vue的组件注册及使用
### 遇到的问题及解决方法：
- 1.自定义组件 在 使用v-for时，无法将数据传递到组件内部
```JavaScript
//原因分析：Vue组件实例的作用域是孤立的
//使用组件定义时的内部属性props 显式传值；
//HTML
<content-component v-for="list in articleLists" :list="list"></content-component>
//js
var ContentComponent = Vue.extend({
	props:['list'],
	... ...
})
```
- 2.使用组件(内容列表)删除某行数据时，列表中数据已删除，但未绑定到Model中显示；
```JavaScript
  //原因分析：props 单向数据流,只能从父元素传递数据到子元素，不能从逆向；
//错误：
this.$parent.$children.splice(index,1); //已删除 但未将 数据绑定到 Model 中；
//正确：直接修改data数据
data.articleLists.splice(index,1);  //可以绑定到 Model 中；
//存在的弊端：当多个组件同时使用data数据时，会同时影响到其他组件的数据；
```
