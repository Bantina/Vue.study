# 学习内容

### 基于Vue的仿饿了么商城的实践

#### 今日实践内容：

> food商品详情页组件的实现:
>
>>  头图的展示
>>
>>  添加已有的cartcontrol组件-加入购物车
>>
>>  评价子组件
>>
>>  时间戳转化为标准时间的过滤器-common/js/date.js-正则的使用

> ratingSelect商品详情页评价子组件的实现
>>
>>  商品评价 分类标签的动态实现-标签值从父组件传到子组件
>>
>>  分类标签个数的计算-数组过滤
>>
>>  是否只看有内容评价的实现
>>
>>  评价标签与评价内容的联动
>>
>>  暂无评价

> split分隔区块的组件实现

#### 标注：
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
html中的ref属性可以获取到dom元素或者子组件

2. $emit和$on事件方式
子组件通过this.$emit()派发事件，父组件通过v-on对事件进行监听，实现参数的传递
```
//  子组件
this.$emit('changeCart',event.target)/*向父组件派发事件，同时传递参数event.target,后面的参数的个数不限*/

//  父组件
<v-cartcontrol :food="food" v-on:changeCart="changeCart"></v-cartcontrol>
```


#### 遇到的问题及解决方案：
1. error:[Vue warn]: Avoid mutating a prop directly since the value will be overwritten whenever the parent component re-renders. Instead, use a data or computed property based on the prop's value. Prop being mutated: "selectType"<br>
-->ratingSelect.vue->methods->select()->this.selectType=type

解析：prop是单向绑定的，当父组件的属性(selectType)变化时，将传导给子组件，反之不会。这是为了防止子组件无意修改了父组件的状态。
所以子组件内不能修改props值，同时，修改的值也不会同步到组件外层。<br>
解决方法：[实现组件属性的双向绑定方式](http://www.cnblogs.com/xxcanghai/p/6124699.html?_t=t)
子组件内部自己变了告诉父组件，父组件决定要不要变。

#### 学习与反思
- 模块化编程的思想 <br>
将统一的常用的方法放在common中统一处理。<br>
eg:对于时间格式的统一转化-->src/common/js/date.js