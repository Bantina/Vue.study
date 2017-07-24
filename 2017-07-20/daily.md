# 学习内容：
### ES6学习(一)
- 学习内容主要包括：
- 1.块级绑定  
- 2.模版字面量  
- 3.函数  
- 4.扩展的对象功能  
- 5.Symbol符号基本类型  
- 6.Set 无重复值的有序列表  
- 7.Map 键值对的有序列表  
#### 一.块级绑定 let
> 1.var声明的变量提升在函数的顶部。   
> 2.块级绑定包含：在一个函数内部／在一个代码块{}内部   
> 3.let禁止同一个块级内重复声明，唯一标识符   
> 4.const声明常量时，必须进行初始化，且不可再改变.通常为受保护的变量。   
> 5.在定义位置之前使用let/const声明的变量，造成暂时性死区，报错；   
> 6.使用let/const定义全局变量时，虽然在全局作用域上创建新的绑定，但不会将属性添加到全局对象上。而var会创建成为全局对象(window)的一个属性，有时造成已有属性的重写。   
> 7.在for循环中使用let声明i，变量不提升，在for循环之外不可使用； 
>     
经典范例：   
```javascript
//使用for循环依次打印出0-9
//1.使用var
var funcs=[];
for (var i = 0; i < 10; i++){
  funcs.push(function(){console.log(i);});
}
funcs.forEach(function(func){ func(); }); //输出“10”十次
//2.使用var+IIFE
var funcs2=[];
for (var j = 0; j < 10; j++){
  funcs2.push((function(val){
    return function(){
      console.log(val);
    }
  }(j)));
}
funcs2.forEach(function(func){ func(); }); //输出0-9
//3.使用let声明循环变量
var funcs3=[];
for (let i = 0; i < 10; i++){
  funcs3.push(function(){console.log(i);});
}
funcs3.forEach(function(func){ func(); }); //输出0-9
```
解析：用var声明的变量i在循环的每次迭代中都被共享    
let声明的变量在循环中每次都创建了一个新的i变量，循环内部创建的函数获得了各自的i副本    
>    

#### 二. 模版字面量
> 在使用模版字面量时应注意：   
>> 1.）所有``内的空白符都是有效的，占有一定的空间；   
>> 2.）美观多行模版字面量的后面使用trim()移除起始的空行；    
```javascript
let html = `
<div>
    <h1>hell0</h1>
</div>`.trim();
```
> 

#### 三. 函数
> 1.参数默认值，定义函数时参数进行了初始化   
> 2.剩余参数(...keys)，可以获取keys.length   
>> 一个函数只有一个剩余参数，且放在最后   
>> 剩余参数不能在 对象字面量的 setter属性中使用(setter只能使用单个参数)   
> 
> 3.添加new.target元属性判断是否 被new调用；   
> 4.严格模式下，块级函数会被提升到所在代码块的顶部；但使用let声明的函数表达式就不会。非严格模式下，块级函数的作用域被提升到了所在函数／全局的顶部。   
> 5.箭头函数：（函数参数） => 函数体   
>> 1.）没有this\super\arguments\new.target的绑定   
>> 2.）不能被使用new调用，无[[Construct]]方法   
>> 3.）没有原型，没有prototype属性   
>> 4.）不能在函数内部更改this值   
>> 5.）没有arguments 对象，依赖具名参数／剩余参数来访问函数的参数   
>> 6.）没有this的绑定，所以this值只能通过查找作用域链来确定   
>> 7.）不允许重复的具名参数   
> 

#### 四.扩展的对象功能
> 1.属性的简写：ES5中对象字面量时键值对的简单集合，ES6中可以简写   
```javascript
function people(name,age){
  return {
    name, //==name:name
    age   //==age:age
  }
}
```
> 2.方法的简写   
```javascript
function people(name,age){
  name: "Jack",
  sayName(){  //ES5:sayName:function(){}
    console.log(this.name);
  }
}
```
> 3.新增Object.is(),比较两者类型相同且值相同   
```javascript
console.log(+0===-0); //true;
console.log(NaN===NaN); //false
console.log(Object.is(+0,-0)); //false
console.log(Object.is(NaN,NaN)); //true
```
> 4.新增Object.assign(receiverObj,supplierObj)，将多个对象的属性指派到一个对象中；   
>> 对访问器属性不适用。      
>> receriverObj只能是一个，    
>> supplierObj可以是多个，有相同属性时，后面的提供者的属性会覆盖前面的    
```javascript   
var receiver = {};
Object.assign(receiver,
  {
    type:"js",
    name:"test.js"
  },{
    type:"css"
  }
)
console.log(receiver.type); //css
console.log(receiver.name); //test.js
```
> 5.修改对象原型；   
>> ES5 Object.getPrototypeOf() 获取原型   
>> ES6 Object.setPrototypeOf() 修改原型
>    
> 6.super关键字来调用对象原型上的方法，this绑定自动设置；   
```javascript
let person = {
  gerGreeting(){
    return "hello";
  }
};
let friend = {
  getGreeting(){
    return super.getGreeting()+",hi"; //super总是指向其原型的引用
  }
};
//改变friend的原型为person
Object.setPrototypeOf(friend,person); 

let relative = Object.create(friend); //创建原型为friend的实例

console.log(person.getGreeting()); //"hello"
console.log(friend.getGreeting()); //"hello,hi"
console.log(relative.getGreeting()); //"hello,hi"

```
调用relative.getGreeting()过程解析：     
1. friend对象的一个实例，调用friend对象的getGreeting()方法；   
2. 但在该方法中 使用super，此时需要先在方法的[[HomeObject]]内部属性所指的对象上调用Object.getPrototypeOf()来获取对原型的引用；(此处原型已被修改为person)   
3. 在原型中查找同名函数；   
4. 创建this绑定并调用该方法；   
- (记住：super是对原型方法的调用，同时绑定this值)      
*对比于以下代码-ES5对原型方法的调用     
```javascript
let person = {
  gerGreeting(){
    return "hello";
  }
};
let friend = {
  getGreeting(){
    return Object.getPrototypeOf(this).getGreeting().call(this)+",hi";
    //super换为了Object.getPrototypeOf(this)／.call(this)
};
//改变friend的原型为person
Object.setPrototypeOf(friend,person); 

let relative = Object.create(friend); //创建原型为friend的实例

console.log(person.getGreeting()); //"hello"
console.log(friend.getGreeting()); //"hello,hi"
console.log(relative.getGreeting()); //error

```
报错原因分析：   
->this的值为relative，relative的原型是friend对象；   
->在friend.getGreeting()方法内部调用friend.getGreeting().call()导致进程开始反复进行递归调用，   
->直到堆栈错误。   

> 7.使用[[HomeObject]]内部属性定义方法，它指向该方法所属的对象，可以区分对象的方法 与 函数   

#### 五.Symbol符号基本类型   
> 1.基本类型的值，不能用new Symbol()来定义；      
> 2.Symbol的描述信息被存储在内部属性[[Description]]中，调用它的toString()方法时读取该属性值，即描述信息   
> 3.let symbol=Symbol();console.log(typeof symbol); //"symbol"   
> 4.全局共享符号值Symbol.for();   
>> 搜索全局符号注册表，是否存在该键值的符号值；   
>> 是：返回已存在的符号值；--这使得不同变量，同一个符号值 是相同的；   
>> 否：创建新的符号值，并将键值添加到全局符号注册表中，返回新的符号值   
> 
```javascript
  let uid = Symbol.for("uid");
  let obj={
    [uid]:"1234"
  };
  console.log(obj[uid]); //"1234"
  console.log(uid); //"Symbole(uid)"

  let uid2 = Symbol.for("uid");  // 共享同一个符号值

  console.log(uid === uid2); //true;
  console.log(obj[uid2]); //"1234"
  console.log(uid2); //"Symbole(uid)"
```
> 5.Object.getOwnPropertySymbols() 返回包含符号值的数组；   
> 
#### 六.Set 无重复值的有序列表   
> 1.let set = new Set(); //创建Set;   
> 2.set.add(4); //向set内添加值；   
> 3.set.size //查看有多少项；   
> 4.set.delete(); //移除单个值；   
> 5.set.clear(); //清空   
> 
注：Set在进行操作时不会使用强制类型转换来判断值是否重复。("5"!=5).      
> 6.set.has(); //判断是否存在于Set内；   
```javascript
let set = new Set([1,2,3,4,5,5,5]); //带有重复值的数组
console.log(set.size); //5 
```
> 7.Set上的forEach()方法，在回调函数中实现；   
```javascript
let set = new Set([1,2]);
/**回调参数说明
* @value:Set中下个位置的值；
* @key: 与第一个参数相同的值；
* @ownerSet：目标Set自身；
*/
set.forEach(function(value,key,ownerSet){
  console.log(key + " "+ value)
})
// 1 1
// 2 2
```
> 
有时需要传递this值，保证当前的调用的准确度   
```javascript
let set = new Set([1,2]);
let processor = {
    output(value){
      console.log(value);
    },
    process(dataSet){
      dataSet.forEach(function(value){
          this.output(value);
        },this);//像遍历数组一样，传递this值；
    }
    //不传递this值，可以用箭头函数,直接读取了包含它的process()的this值,如下：
    //process(dataSet){
    //  dataSet.forEach((value) => this.output(value));
    //}
}
processor.process(set);
``` 
> 8.使用Set特性已经存在的数组，创建一个无重复值的新数组：   
```javascript
function eliminateDuplicates(items){
  return [...new Set(items)]; //返回一个将Set转化为数组后的数组值，不改变原数组；
}
let numbers = [1,2,2,3,3,3,4,5],
    noDuplicates = eliminateDuplicates(numbers);
console.log(noDuplicates); //[1,2,3,4,5]
```
#### 七.Map 键值对的有序列表   
> 1.let map = new Map(); //创建Map   
> 2.let map2 = new Map([["name","Jack"],["age","20"]]); //初始化-数组中的数组=键值对   
> 3.map.set("name":"Jack"); //设置键值对   
> 4.map.get("name"); //获取键值   
> 5.map.has(key); //判断key是否存在于map中；   
> 6.map.delete(key); //移除map中的键及对应的值；   
> 7.map.clear(); //清空map;   
> 8.map.size //属性，多少项；   
> 9.Map的forEach()方法，接收含三个参数的回调函数   
```javascript
let map = new Map([["name","Jack"],["age","20"]]);
/**回调参数说明
* @value:Map中下个位置的值；
* @key: 该值所对应的键；
* @ownerSet：目标Map自身；
*/
map.forEach(function(value,key,ownerSet){
  console.log(key + " "+ value)
})
// name Jack
// age 20
```

### 知识点汇集
- 创建一个函数实例时，用new和未用new的区别，示例如下：
```javascript
function Person(name){
  this.name = name;
}
var person1 = new Person("Jack");
var person2 = Person("Jack");
console.log(person1); //"[Object object]"
console.log(person2); //"undefined"
```
解析：JS内部方法[[Call]]与[[Construct]]，
未使用new时，执行[[Call]]，运行的时代码中的函数体，此处this指向全局，给全局添加了name属性；
使用new时，执行[[Constrct]]，它创建一个新的目标对象，并使用该新目标作为this执行函数题。
构造器：拥有[[Constrct]]方法的函数
并不是所有函数都拥有[[Constrct]]方法，都可以用new来调用。如：箭头函数


