//Model
var data = {
	nickname:'Bantina',
	menuLists:[{
		title:'首页',
		content:'There is content for 首页'
	},{
		title:'所有文章',
		content:'There is content for 所有文章'
	},{
		title:'友情链接',
		content:'There is content for 友情链接'
	},{
		title:'关于我',
		content:'There is content for 关于我'
	}],
	content:'Welcome ~',
	articleLists:[{
		title:'article 1',
		time:'2016-2-4'
	},{
		title:'article 2',
		time:'2016-3-2'
	},{
		title:'article 3',
		time:'2017-4-7'
	},{
		title:'article 4',
		time:'2017-6-4'
	},{
		title:'article 5',
		time:'2017-7-9'
	}]
}

//ViewModel
var menu = new Vue({
	el:'#app',
	data:data,
	methods:{
		changeIndex:function(index){
			var self=this;
			self.content = self.menuLists[index].content
		}
	}
			
})

//用Vue.extend创建组件
var ContentComponent = Vue.extend({
	props:['list','articleLists','index'],
	template:`
		<div class="appRight-list">
			<div class="col-sm-5">{{ list.title }}</div>
			<div class="col-sm-4">{{ list.time}}</div>
			<div class="col-sm-3">
				<a href="###">编辑</a> | 
				<a href="###" v-on:click="delItem(index)">删除</a>
			</div>
		</div>
	`,
	methods:{
		// 删除
		delItem:function(index){
			//this.$parent.$children.splice(index,1); //已删除 但未将 数据绑定到 Model 中；
			data.articleLists.splice(index,1); 
			console.log(this.$parent.$children)
		}
	}
})

//用Vue.component注册组件
Vue.component('content-component',ContentComponent);



