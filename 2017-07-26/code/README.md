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

# 学习内容

### 基于Vue的仿饿了么商城的实践

#### 今日实践内容：

> 安装axios模块，发送客户端请求
>
> header组件的实现:
>
>>	图标图片与文字的水平对齐
>>
>>	文字省略号的替换
>>
>>	虚幻背景的实现
>>
>>	点击活动个数／公告浮层的实现
>>

> star评分组件的实现--点击活动个数时可见


#### 遇到的问题及解决方案：
1.Error: Uncaught (in promise) TypeError: Cannot set property 'seller' of undefined

在回调函数中，要特别注意this的当前上下文，否则属性undefined

2.Error: Error in render function: "TypeError: Cannot read property '0' of undefined"

注意VUE在请求获取到数据并加载到模版中时，eg:{{ seller.supports[0].description}}，seller为res.data,因为请求是异步的，模版刚开始就渲染了，此时如果数据还没有获取到，seller.supports就是undefiend,而在undefined上读取第一个值，就会报错。
<br>解决方法：模版取值之前先用 v-if="seller.supports" 判断值是否存在。

#### 标注：
1.vue的子组件中使用props接收从父组件传过来的数据，在父组件中import子组件后，还需在components中注册子组件。

2.在Vuejs的组件中，data属性是一个函数，非对象，因为组件是可以被复用的，定义为一个对象时，修改一个组件的状态会影响另外的组件


### 知识点汇集
#### css样式设置

1. span之间存在某些间距，是由空白字符产生的.去除间距<br>
方法一：可以先设父元素的font-size:0,然后给子元素设相应字体的大小；<br>
方法二：将span标签紧连在一起，不要加杂空格或回车等字符

2. 给某div设置过滤的背景图片方法：<br>
另设置一个包含img的div绝对定位到与其相同位置，z-index=-1,并且设置filter:blur(10px)，黑色蒙版层，使用rgba添加到第一个div的background上
```
//html
<div class="header">
	<div class="background">
		<img src="..." alt="">
	</div>
</div>
//css
.header{
    color:#fff
    background:rgba(7,17,27,.5)
}
	.background{
	  position: absolute
	  top:0
	  left:0
	  z-index:-1
	  width:100%
	  height:100%
	  filter:blur(10px)
	}
	.background img{
	  width:100%
	}
```

3. 文字省略效果的实现
```
.text{
   white-space:nowrap
   -ms-text-overflow: ellipsis
   text-overflow: ellipsis
   overflow: hidden
   background:rgba(7,17,27,0.2)
}
```

4. [CSS Sticky footers](http://www.w3cplus.com/css3/css-secrets/sticky-footers.html)的效果实现：<br>
设置底部固定样式，类似于position:fixed，但fixed的弊端是，当内容过长时，底端fixed会遮挡住内容。
```
//基本架构-套路
<div class="detail">
    <div class="detail-wrapper clearfix"> //clearfix清除浮动
      <div class="detail-main"></div>
    </div>
    <div class="detail-close"></div>
</div>
// clearfix
.clearfix
  display: inline-block
  &:after
    content:''
    display:block
    height:0
    line-height: 0
    clear: both
    visibility: hidden
//样式设置
.detail
   position:fixed
   z-index:100
   top:0
   left:0
   width:100%
   height:100%
   overflow:auto
   background: rgba(7,17,27,.8)
   .detail-wrapper
     min-height:100%
     .detail-main
       margin-top:64px
       padding-bottom: 64px //重点
   .detail-close
     position: relative
     width:32px
     height:32px
     margin:-64px auto 0 auto
     clear: both
     font-size :32px

```

5. [Flex布局](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html?utm_source=tuicool)
```
<!-- 横线中间的title 使用flex布局实现 的 经典布局-->
<div class="title">
  <div class="line"></div>
  <div class="text">优惠信息</div>
  <div class="line"></div>
</div>
//css
.title
  display: flex
  width:80%
  margin:30px auto 24px auto
  .line
    flex:1
    position: relative
    top: -10px
    border-bottom :solid 1px rgba(255,255,255,.2)
  .text
    padding:0 12px
    font-size :14px
```

6. css背景焦点模糊 (只使用于iphone手机)<br>
 -webkit-backdrop-filter :blur(10px) //iphone手机的背景模糊


