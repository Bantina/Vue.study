# 学习内容：
### 基于VUE的购物车的实现
#### 实现功能要去如下：
> 1.购物车商品的展示
> 
> 2.实现商品数量的增减修改，并对价格进行小计计算
> 
> 3.对单项商品进行删除操作
> 
> 4.多选删除功能
> 
> 5.全选操作
> 
> 6.清空购物车操作
> 
> 7.已选商品的总价格的计算
> 
> 8.已选商品的的总数量的计算
> 

#### 实现思路如下：    
> 1.静态页面设计与代码实现  
> 2.json数据模拟后台返回数据，并使用Vue-resource插件调用json文件    
> 3.将数据绑定到html中  
> 4.商品数量增减操作  
>> -使用参数way标识是增还是减操作  
>> -增操作数量++  
>> -减操作数量--   
>> -减操作边界控制，最小为1    
>> -都要对总价格进行计算。  
> 
> 5.单选的实现
>> -单选时由于事先并没有定义一个属性来标识是否被选中，但实际业务需求需要。   
>> -所以需要添加一个新属性，但并不是在每次点击时都添加，因而应该先进行属性是否存在的判断   
>> -属性已经存在时，点击单选改变该属性的值  
>> -单选也要进行总数额的计算   
> 
> 6.全选操作
>> -使用一个flag标识是否全选  
>> -对商品list进行遍历，改变每一项的checked值  
>> -用户可能页面加载完后立即进行全选操作，所以在遍历时要对每一项商品是否有checked属性进行判断    
>> -对总数额的计算  
> 

#### 遇到的问题及解决方案
- 1.在使用vue-resource时，跨域报错
> 错误信息：XMLHttpRequest cannot load file:cartData.json. Cross origin requests are only supported for protocol schemes: http, data, chrome, chrome-extension, https.   
> 
> 原因分析：vue-resource中的$http请求不同于JQ中的ajax，它的请求数据并不是formData的形式，而是request payload。 
> 
> 解决方法：  
> 1.)在vue实例中添加headers字段如下：
```javascript
http:{
	headers:{'Content-Type': 'application/x-www-form-urlencoded'}
}
```
> 2.) 使用vue的 Vue.http.options.emulateJSON = true;

- 2.在使用toFixed()函数时，报错：
> value.toFixed is not a function.  
> 原因：toFixed不能作用在非数字的变量上，有些情况js会将数据自动设置为string类型。  
> 方法：使用 parseFloat()先进行数据类型转化。  

#### 知识点汇集
- 1.浏览器跨域 参考[构建public APIs与CORS](https://segmentfault.com/a/1190000000709909)     
- 2.给input绑定value值，使用v-model双向绑定   
- 3.给img绑定src属性,使用v-bind指令   
- 4.给html标签使用v-bind:class绑定类时，类为对象／数组 的形式。  
- 5.向vm设置新的属性 Vue.set()/vm.$set();
- 6.过滤器的定义及使用(金额过滤器) 
- 7.js Array.filter()方法，创建一个新数组，不改变原始数组

#### 明日更新任务：
1. 添加满减活动；  
2. 添加满两件享包邮活动；








