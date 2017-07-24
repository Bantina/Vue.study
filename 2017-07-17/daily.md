# 学习内容：
### VUE知乎日报demo的学习
#### 安装依赖    
npm install
#### 启动服务  
npm run dev
#### 使用的技术
- 1.Vue
- 2.Vuex
> vuex 是为vue.js应用程序开发的状态管理模式。  
> 集中式存储 管理 所有组件的状态    
> 核心store(仓库)-容器，包含状态(state)。   
- 3.fiexible.js
> 适配移动端的js框架    
> 根据不同的width给网页中的html根节点设置不同的font-size
> 其余距离大小都用rem来代替  
> 实现不同大小的屏幕适应相同的样式  

#### 知识点汇集
- 1.移动开发meta设置
```javascript
	<!--忽略电话号码和email识别-->
	<meta name="format-detection" content="telephone=no"/>
	<meta name="format-detection" content="email=no"/>
	<!--当网站添加到主屏幕快速启动方式-->
	<meta name="apple-mobile-web-app-capable" content="yes"/>
	<!--隐藏ios上的浏览器地址栏-->
	<meta name="apple-mobile-web-app-status-bar-style" content="black"/>
	<!-- UC默认竖屏 ，UC强制全屏 -->
	<meta name="full-screen" content="yes">
	<meta name="browsermode" content="application">
	<!-- QQ强制竖屏 QQ强制全屏 -->
	<meta name="x5-orientation" content="portrait">
	<meta name="x5-fullscreen" content="true">
	<meta name="x5-page-mode" content="app">
	<!-- 移动设备 -->
	<meta name="viewport" content="width=device-width,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no,minimal-ui">
```
- 2.rem
> 相对于根元素<html>的比例值，所以定html的参照值很重要，默认:1em=16px;    
> 不兼容IE8及以下版本。 
> 移动端兼容较好    

- 3.computed计算属性与mapState辅助函数结合，实现对Vuex状态的控制
```javascript
import { mapState } from 'vuex'
export default {
  // ...
  computed: mapState({
    // 箭头函数可使代码更简练
    count: state => state.count,

    // 传字符串参数 'count' 等同于 `state => state.count`
    countAlias: 'count',

    // 为了能够使用 `this` 获取局部状态，必须使用常规函数
    countPlusLocalState (state) {
      return state.count + this.localCount
    }
  })
}
```








