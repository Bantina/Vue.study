<template>
<div>
	<div class="con-answer" v-html="data.body"></div>
</div>
</template>
<script>
import api from './../api/index'
export default {
	mounted: function(){
		let vue = this,
			id = this.$route.query.id; //获取请求url文章id
			api.getNewsById(id).then(function(data){
				vue.article[id] = data.data;
				vue.data = data.data;
			})
	},
	data() {
		return {
			article:[],
            data:""
		}
	},
	methods: {
		
	}
}
</script>
<style>
	
</style>
