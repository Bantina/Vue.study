# 学习内容

### 基于Vue的仿饿了么商城的实践

#### 今日实践内容：

> goods组件的实现:
>
>>  左侧菜单栏的样式实现及滚动
>>
>>  右侧商品列表的实现
>>
>>  左侧菜单栏对应右侧内容的联动
>>
>>  better-scroll库实现屏幕主体内容滚动效果-> v-el:food-wrapper
>>
>>  滚动右侧内容 对应左侧菜单的高亮显示计算->计算属性currentIndex并绑定对应li[index]的class
>>
>>  点击左侧菜单 滚动至 右侧相应内容
>>

> shopcart购物车组件的实现：
>
>>  从父组件中传值：配送费，最低配送费，选购的商品(重点-它决定了购物车所有的结算状态)
>>
>>  总价和总数量的计算及特殊样式
>>
>>  结算时的剩余配送费的计算及特殊样式
>>

> cartControl数量加减组件的实现
>
>>  当数量为0时，只显示+
>>
>>  数量>0时，-和数量 展示出来
>>
>>  增加／减少数量的事件
>>
>>  增加／减少数量按钮的过渡动画
>>

#### 标注：
1. 在Vue中，当操作DOM时，一定要保证dom已经渲染了，经常用到的this.$nextTick()

2. 在Vue中，给一个不存在的属性进行赋值时，其判断语句等是不会生效的，
需要引入全局Vue并使用其set()

3. 动画设置，在VUE2.0中，动画被设置为了一个内置的组件<transition></transition>

### 知识点汇集
#### CSS设置
单行元素居中，子元素一定高度，且line-height=父元素高度；

#### 未解决疑问
在使用better-scroll库时，其内部如何实现点击事件派发,PC端点击正常，移动端点击不能正常触发
```
let menuScroll = new BScroll(document.getElementById('menu-wrapper'),{
    click:true //派发点击事件 -PC端点击正常，移动端点击未触发；
});
//结合
selectMenu(index,event){
  if(!event._constructed){ //自己的点击事件派发时 event._constructed==true
      return; //pc监听到时return
  }
}
```