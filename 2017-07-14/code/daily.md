# 学习内容：
### 基于VUE的购物车的优惠活动的实现
#### 实现功能要求如下：
> 1.要求针对不同店铺实现不同的满减活动
> 
> 2.针对不同店铺实现不同的包邮活动
> 


#### 实践过程中的重点难点如下： 
> 是否选中该商品的标识，在checkbox中选中与取消选择 会触发同一个事件，因而需要标识商品的选中状态；  
>   
> 无论是否选中商品，数量的改变触发的是同一个事件，因而需要区分 选中商品后数量改变 以及 未选中商品时数量变化对优惠活动的影响；
>   
> 选中多个商品时 店铺是否为一个   
> 实现 同一店铺，不同商品，总额的优惠，优惠是店铺优惠活动


#### 遇到的问题及解决方案
- 1.对于对象数组，使用indexOf()时，需要考虑到 对象是引用类型，indexOf检测的必须是对象的引用地址，否则索引值一值为-1，找不到该元素；
```javascript
var o1 = { name: 'o1' };
var o2 = { name: 'o2' };
var o3 = { name: 'o3' };
 
var arr = [ o1, o2, o3 ];
 
console.log(arr.indexOf( o1 )); // 0
console.log(arr.indexOf( o2 )); // 1
console.log(arr.indexOf( o3 )); // 2
console.log(arr.indexOf( {name:'o1'} )); //-1
 
arr.indexOf( o2 ) >= 0 
```
- 2.forEach()函数的深刻认识   
> 1.）数组的方法  
> 2.）含有两个参数  
> 第一个参数：回调函数fn(每个元素item,元素索引index)  
> 第二个参数：this值  
> 注：回调函数中的this指向会改变，需传值！  
>   

#### 仍存在的bug：
全选状态下 优惠活动错乱,只能优惠一项  







