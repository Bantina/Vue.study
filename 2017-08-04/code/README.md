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

### 基于Vue的仿饿了么商城的实践de项目总结

#### 一、 路由
> 菜单栏路由的定义与转换；<br>
	router.js---> App.vue中进行router-link的链接跳转，以及根模版的加载
> 数据请求-api路由的定义，在deb-server.js中require数据并定义,数据在项目底层的data.json中

#### 二、客户端请求
> 安装axios模块，发送客户端请求

#### 三、组件的实现
1. header组件:

2. goods组件:

3. shopcart购物车组件的实现：

4. cartControl数量加减组件的实现

5. food商品详情页组件的实现:

6. ratingSelect商品详情页评价子组件的实现

7. split分隔区块的组件实现

8. ratings商品评价页的实现:

9. seller商家页的实现

10. star评分组件的实现--点击活动个数时可见

#### 四.心得与体会

##### 1.对于VUE的学习心得

> VUE作为一个MVVM框架，与MVC框架最大的不同就是它对html模版的自动渲染，我们只需要对数据进行操作即可，不用再二次或者多次的操作dom。

> 对于有依赖于某些属性而动态变化的属性，可以通过计算属性进行 实时监测。

> 通过此次项目的实践，也深刻理解组件的作用，主要是复用，以及方便管理和维护。

> 对于组件之间的通信，主要是父子组件之间的通信：

  - Vue中 如何在父组件中调用子组件方法
  1. 父组件加载子组件时的ref属性
  ```
    //html
    <food ref="food"></food>

    //js
    //1.引入
    import food from '../food/food'
    //2.注册组件
    components:{
      food
    }
    //3.调用
    methods{
      selectFood(){
        this.$refs.food.show(); //调用子组件food的show方法；
      }
    }
  ```

  2. $emit和$on事件方式
  子组件通过this.$emit()派发事件，父组件通过v-on对事件进行监听，实现参数的传递
  ```
  //  子组件
  this.$emit('changeCart',event.target)/*向父组件派发事件，同时传递参数event.target,后面的参数的个数不限*/

  //  父组件
  <v-cartcontrol :food="food" v-on:changeCart="changeCart"></v-cartcontrol>
  ```

##### 2.其他方面学习心得

> 通过对仿饿了么视频教程的学习，同时也学到了很多在项目中可以通用的小技巧，如：

> 图标字体的制作

> 在开发移动端项目时，在没有服务器情况下，对于真机的测试，可以通过三方生成二维码进行测试。

> js时间戳的转化

> 通用localStorage存储数据的读写方法

> 对于Flex弹性布局的学习

> 使用stylus对css样式的编写等

> 除此之外，在实践过程中发现，程序在实现之前一定要经过总体的分析和规划，
在大脑中应形成开发逻辑的闭环。<br>
对于html的编写首先分析它的划分区块，先搭架子，从骨骼部分开始，再深入细化。<br>
对于js，主要是数据分析和逻辑分析，主要做到思路清晰。
