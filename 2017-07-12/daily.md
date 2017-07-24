# 学习内容：
### Vue.js官网API 系统学习
#### Vue.config
- optionMergeStrategies 
- errorHandler

#### 全局API
- Vue.extend(options) --基础构造器
```javascript
//创建构造器
var Profile = Vue.extend({
	template: '<p>hello {{alisas}}</p>',
	//Vue.extend()中data必须为函数
	data: function(){
		return {
			alias: 'hei'
		}
	}
})
```
- Vue.nextTick([callback,context]) --DOM更新循环结束后延迟回调-异步
```javascript
// 修改数据
vm.msg = 'hello'
// DOM 未更新
Vue.nextTick(function(){
	//DOM 更新。获取更新后的DOM	
})
```
- Vue.set(target,key,value) --设置对象的属性
- Vue.delete(target,key) --删除对象的属性
- Vue.firective(id,[difinition]) --注册／获取全局指令
- Vue.filter(id,[definition]) --注册／获取全局过滤器
- Vue.component(id,[definition]) --注册／获取全局组件
- Vue.use(plugin) --安装Vue.js插件
- Vue.mixin(mixin) --全局注册一个混合，影响注册之后所有创建的每个Vue实例
- Vue.compile(template) --再render函数中编译模版字符串
```javascript
//只在独立构建时有效
var res = Vue.compile('<div>{{msg}}</div>')
new Vue({
	data:{
		msg:'hello'
	},
	render: res.render,
	staticRenderFns: res.staticRenderFns
})
```
- Vue.version --获取版本号-字符串

#### 选项／数据
- data [Objext | Function]
> vm.$data可以访问实例的原始数据对象，也可直接使用实例访问data的属性(eg: vm.a==vm.$data.a).   
> 以-或$开头的属性不会被Vue实例代理，只能用vm.$data._property的方式访问.    
> 定义组件时，data必须声明为返回一个初始数据对象的函数(组件只接受function形式)    
>> 原因：组件可以被用来创建多个实例。如果data是一个纯粹的对象，则所有的实例将共享引用的同一个数据对象，  
>> data函数 使得创建实例 返回的是 初始数据的一个全新副本数据对象。   
> 不应对data属性使用箭头函数. 
>> 原因：箭头函数绑定了父级作用域的上下文  
>> this将不会指向Vue实例，访问属性时undefined.  

- props [Array | Object]
> 数组／对象，用于接受来自父组件的数据。  
> 对象允许 配置高级选项，如类型检测、自定义校验、设置默认值
```javascript
Vue.component('test',{
	props: ['size','msg']
})
//对象+校验
Vue.component('test2',{
	props: {
		height: Number, //只检验类型
		age: { //检验类型 + 其他验证
			type: Number,
			default: 0,
			required: true,
			validator: function(value){
				return value >=0
			}
		}
	}
})
```

- propsData {[key:string]:any}
> 只用于 new 创建的实例中
> 创建实例时传递props,方便测试
```javascript
var comp = Vue.extend({
	props:['msg'],
	template:'<div>{{msg}}</div>'
})
var vm = new comp({
	propsData:{
		msg:'hello'
	}
})
```

- computed 
> 计算属性(当其依赖属性的值发生变化时，这个属性值也会自动更新)  
> getter/setter的this上下文为Vue实例
> 不能使用箭头函数，因为改变了this上下文
> 计算属性结果 会被缓存.   

```javascript
var vm = new Vue({
	data: {a:1},
	computed: {
		//仅读取，值只须为函数
		aDouble: function(){
			return this.a * 2
		},
		//读取+设置
		aPlus: {
			get: function(){
				return this.a + 1
			},
			set: function(){
				this.a = v - 1
			}
		}
	}

})
vm.aPlus //2
vm.aPlus = 3
vm.a //2
vm.aDouble //4
```

- methods
> 不能使用箭头函数来定义method函数.  

- watch
> 观察对象属性，值时对应的回调函数.  
> 深度 watcher,{ deep : true}.  
> 不能使用箭头函数来定义watcher函数.  
> 实例方法 vm.$watch.  
 
#### 选项／DOM
- el
> 实例挂载点，可以用 vm.$el 访问.  
> 不推荐挂载root实例到<html>／<body>上.  
> 若其在实例化时有作用，实例将立即进入编译过程。否则，需要显示调用 vm.$mount() 手动开启编译.  

- template
> 模版会替换挂载的元素。 
> 若Vue选项中包含render函数，template选项将被忽略   

- render
> 接受一个 createElement 方法作为第一个参数用来创建 vNode

- renderError

#### 选项／生命周期钩子
> this上下文 实例，不能使用箭头函数
- beforeCreate
> 实例初始化之后，数据观测和event/watcher事件配置之前

- created
> 实例创建完成之后。   
> 数据观测，属性和方法的运算，watch/event事件回调 完成   
> 挂载阶段未开始，$el属性目前不可见  
 
- beforeMount
> 挂载开始之前被调用：相关的render函数首次被调用  
> 在服务器端渲染期间不被调用  

- mounted
> 挂载完成。el被新创建的vm.$el替换，并挂载到实例上去之后调用。
> 如果root实例挂载了一个文档内元素，当mounted被调用时vm.$el也在文档内。  
> 在服务器端渲染期间不被调用  

- beforeUpdate
> 数据更新时调用，虚拟DOM重新渲染和打补丁之前  
> 可进一步更改状态，不会触发附加的重渲染过程。  
> 在服务器端渲染期间不被调用  

- updated
> 数据更改导致的虚拟DOM重新渲染和打补丁后调用  
> 组件DOM已更新，可以执行依赖DOM的操作  
> 但应避免在此期间更改状态，若更改，最好使用 计算属性／watcher。  
> 在服务器端渲染期间不被调用  

- activated
> keep-alive组件激活时调用   
> 在服务器端渲染期间不被调用   

- deactivated
> keep-alive组件停用时调用  
> 在服务器端渲染期间不被调用   

- beforeDestroy 
> 实例销毁之前调用，实例仍可用  
> 在服务器端渲染期间不被调用   

- destroyed
> 实例销毁后调用
> 调用后，实例的所有东西会解绑定，所有事件监听器被移除，所有子实例被销毁。  
> 在服务器端渲染期间不被调用   

#### 选项／资源
- directives [obj]
> 包含Vue实例可用指令的哈希表

- filters [obj]
> 包含Vue实例可用过滤器的哈希表

- components [obj]
> 包含Vue实例可用组件的哈希表

#### 选项／组合
- parent 
> 制定已创建实例的父实例  
> 同时使用 $parent 和 $children 有冲突，他们作为同一个入口。  
> 更推荐使用 props 和 events 实现父子组件通信。  

- mixins [Array<Object>]
> 接受混合对象的数组  
> 将在Vue.extend()里最终选择使用相同的选项并逻辑合并。  
> Mixin钩子按照传入顺序依次调用，并在调用组件自身的钩子之前被调用。  
```javascript
var mixin = {
	created: function(){console.log(1)}
}
var vm = new Vue({
	created: function(){console.log(2)},
	mixins: [mixin] //
})
// ->1
// ->2
```

- extends [obj|fun]
> 允许声明扩展另一个组件，而无需使用Vue.extend  
> 不同于mixins，该组件自身的选项比扩展的源组件具有更高的优先级  

- provide/inject

- model [{ prop?:string,event?:string}]
> 允许一个自定义组件在使用v-model时定制prop和event.   

#### 实例属性
- vm.$data [obj]
- vm.$props [obj]
- vm.$el [HTMLElement]
- vm.$options [obj]
- vm.$parent [vue instance]
- vm.$root [vue instance]
- vm.$children [arr]
- vm.$slots
- vm.$scopedSlots
- vm.$refs [obj]
- vm.$isServer [boolean]

#### 实例方法／数据
- vm.$watch()
- vm.$set(target,key,value)
- vm.$delete(target,key)
- vm.$on(event,callback)
- vm.$once(event,callback)
- vm.$off([event,callback])
> 若没有提供参数，则移除所有的事件监听器；  
> 若只提供了事件，则移除该事件所有的监听器；  
> 若同时提供了事件与回调，则只移除这个回调的监听器；  
- vm.$emit(event,[...args])

#### 实例方法／生命周期
- vm.$mount([ele/selector])
> 挂载一个未挂载的实例  
> 若没有提供参数，模版将被渲染为文档之外的元素，须使用原声DOM将其插入到文档中  
> 返回实例自身，因而可以链式调用其它实例方法。  
- vm.$forceUpdate()
> 迫使Vue实例重新渲染   
> 只影响实例本身 和 插入插槽内容的子组件，而不是所有子组件。 
- vm.$nextTick([callback])  
> 将回调延迟到下次DOM更新循环之后执行。  
- vm.$destroy()
> 完全销毁一个实例


### 项目示例
#### 使用vue实现一个树形菜单.  
##### 应用知识点：  
> 组件component.   
> Vue指令的活用.  
> props-全局组件数据从父到子的传递.  
> 计算属性的应用.  
> Vue.set()的活用.  


















