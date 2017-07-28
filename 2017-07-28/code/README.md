# sell

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## 本周总结：
#### Node的基础学习
1. 理解阻塞与非阻塞
2. 理解Node的单线程
3. 学习 TCP传输控制协议
4. 学习 HTTP超文本传输协议
5. 了解 Node中 流 的概念
6. Node事件

#### 对VUE的实践
通过基于vue的仿饿了么项目的实践，加深对vue的学习，主要实践的内容有：
1. 使用vue-cli实现项目的构建
2. 使用vue-router实现项目路由的定义
3. 使用axios对数据的请求与操作
4. header组件的实现
	>	图标图片与文字的水平对齐
	>
	>	文字省略号的替换
	>
	>	虚幻背景的实现
	>
	>	点击活动个数／公告浮层的实现
	>

5. star评分组件的实现
	> 对star状态(全亮，半亮，全灰)的计算

6. goods商品组件的实现
	>  左侧菜单栏的样式实现及滚动
	>
	>  右侧商品列表的实现
	>
	>  左侧菜单栏对应右侧内容的联动
	>
	>  better-scroll库实现屏幕主体内容滚动效果-> v-el:food-wrapper
	>
	>  滚动右侧内容 对应左侧菜单的高亮显示计算->计算属性currentIndex并绑定对应li[index]的class
	>
	>  点击左侧菜单 滚动至 右侧相应内容
	>
7. cartControl数量加减组件的实现
	>  当数量为0时，只显示+
	>
	>  数量>0时，-和数量 展示出来
	>
	>  增加／减少数量的事件
	>
	>  增加／减少数量按

8. shopcart购物车组件的实现
	>  从父组件中传值：配送费，最低配送费，选购的商品(重点-它决定了购物车所有的结算状态)
	>
	>  总价和总数量的计算及特殊样式
	>
	>  结算时的剩余配送费的计算及特殊样式
	>
	>  从父组件中传值-选购的商品-在goods comp计算属性中实现
	>
	>  加入到购物车后点击logo，购物清单的实现
	>
	>  购物清单中的滚动效果的实现
	>
	>  购物清单中加减组件的添加和清空的实现
	>

### 学习与反思：
在对VUE项目的实践过程中发现，程序在实现之前一定要经过总体的分析和规划，在大脑中应形成开发逻辑的闭环，才不至于在开发过程中走偏路。

### 待完成：
对于VUE仿饿了么项目的实践待完成内容包括：
1. 商品详情页的实现
2. 商家详情页的实现
3. 评分列表页的实现
4. 项目编译与打包
