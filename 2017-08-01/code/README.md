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

> ratings商品评价页的实现:
>>
>>  商品评价组件ratings的实现
>>
>>  子组件ratingSelect的复用
>>
>>  star评分组件的复用
>>
>>  商家收藏按钮的实现
>>
>>  使用localStorage缓存收藏状态-通用的localStorage-src/common/store.js
>>
>>  测试localStorage缓存收藏状态，eg:http://localhost:8080/?id=123#/goods

> seller商家页的实现
>>
>>  商家seller组件的实现
>>
>>  商家基本信息的展示
>>
>>  商家公告与活动的展示
>>
>>  商家实景图片的滚动实现
>>

> 修复cartControl组件中加减按钮的动画bug；

#### 知识点汇集：
- [Object.assign](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)(target,...sources)<br>
作用：将所有可枚举的属性的值 从一个／多个源对象复制到目标对象。<br>
返回：目标对象<br>
特性：相同键的值，会被源中的属性覆盖<br>
&emsp;&emsp;&emsp;&emsp;后面的源的属性将覆盖之前的源的同名属性<br>
&emsp;&emsp;&emsp;&emsp;不适用于深度拷贝，只拷贝对象属性的引用值<br>

#### 仍存在的问题
1. 商家页 滚动问题，应去除标题头随着页面滚动；
2. 商家实景图片的横向滚动未实现
3. 购物车组件shopCart中 选中商品后 点击购物车logo显示购物清单的动画

#### 学习计划
- flex布局的系统性学习
- webpack
