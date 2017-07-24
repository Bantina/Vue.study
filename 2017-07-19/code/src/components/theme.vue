<template>
<div class="theme-container">
	<div class="theme" v-for="story in list.stories" @click="goArticle(story.id)">
		<img v-if="story.images" :src="story.images[0]" alt="">
		<p>{{story.title}}</p>
	</div>
</div>
</template>
<script>
import {
	mapState
} from 'vuex'
import api from './../api/index'
export default {
	computed:{
		...mapState({
			num: state => state.num,
			themeFlag: state => state.num
		})
	},
	data() {
		return {
            list:""
		}
	},
	watch:{
		themeFlag:function(){
			console.log(this.$route.query.id)
			this.getList();
		}
	},
	mounted:function(){
		this.getList()
	},
	methods: {
		goArticle(id){
			this.$router.push({
				path:"article",
				query:{
					id:id
				}
			});
		},
		getList(){
			let vue = this,
				id = this.$route.query.id;
			this.list = '';
			console.log(id+'aa');
			api.getTopicsById(id).then(function(data){
				vue.list = data.data;
			})
		}
	}
}
</script>
<style>
/* css3 实现瀑布流 */
.theme-container{
	-moz-column-count:4; /* Firefox */
    -webkit-column-count:4; /* Safari 和 Chrome */
    column-count:4;  /* 分成的列数 IE9及以前版本不支持*/
    -moz-column-gap: 1em;
    -webkit-column-gap: 1em;
    column-gap: 1em; /* 规定列的间隙 */
    padding-bottom: 30px;
}
.theme{
	 padding: 1em;
     margin: 0 0 1em 0;
     -moz-page-break-inside: avoid;
     -webkit-column-break-inside: avoid;
     break-inside: avoid; /* 避免元素内部断行并产生新列 */
     /*border: 1px solid #000;*/
     box-shadow:0 3px 10px 0 rgba(11, 22, 37, 0.15);
     border-radius: 4px;
     cursor: pointer;
}
.theme img{
	width: 100%;
}
</style>
