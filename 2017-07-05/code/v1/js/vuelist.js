var menu=new Vue({
	el:'#menu',
	data:{
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
		index:'',
		content:'Welcome ~'
	},
	methods:{
		changeIndex:function(index){
			var self=this;
			self.content = self.menuLists[index].content;
		}
	}
			
})
