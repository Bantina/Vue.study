# 学习内容：
### 对于VUE实现todoList的完善，完善内容包括：
> 1.UI设计的美化
> 
> 2.去除 多选标记功能，改为单项立即标记功能
>> 选中时立即标记为已完成
>> 相应的取消选中则立即标记为待办   
> 
> 3.优化input值为空时的提示信息框
> 
> 4.去除计算事项数目的属性，list对象的length即为当前的数目  
>
> 5.使用localstorage存储数据
>> 将当前数据存储在客户端；  
>> 下次打开时自动读取以前数据；  
>  

### Vue Watch观察
- 注：在对 对象进行Watch时，应当添加{deep:true},进行深度观察

### H5客户端存储数据的方法：
#### 1.使用localstorage存储数据(无时间限制)
1.window.localStorage.setItem() 写入  
2.window.localStorage.getItem() 读取  
3.对字符串进行操作，json对象JSON.stringify()转化为字符串

#### 2.sessionStorage 
> 针对一个session进行数据存储
> 当用户关闭浏览器窗口后，数据会被删除
