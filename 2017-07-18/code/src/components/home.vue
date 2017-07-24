<template>
<div>
	<div class="list" v-for="item in list">
        <p class="list-time">
            {{item.date.substring(0,4)+"/"+item.date.substring(4,6)+"/"+item.date.substring(6,8)}}
        </p>  
        <ul class="list-con">
            <li v-for="story in item.stories" link @click="goArticle(story.id)">
                <img :src="story.images[0]" alt="">
                <span>{{story.title}}</span>
            </li>
        </ul>
    </div>
    <!-- <div class="list" >
        <p class="list-time">
            2017/01/18
        </p>  
        <ul class="list-con" >
            <li>
                <img src="./../assets/portrait0.jpg" alt="">
                <span>fafdsfsfsda</span>
            </li>
        </ul>
    </div> -->
</div>
</template>
<script>
import api from './../api/index'
export default {
    mounted:function(){
        this.getList(1);
    },
	data() {
		return {
            count:1,
            list:[]
		}
	},
	methods: {
		getList(type){ //获取新闻列表
            var vue = this;
            if(type){
                api.getNews().then(function(data){
                    vue.list.push(data.data);
                })
            } else {
                api.getNewsByDate(vue.GetDate(vue.count)).then(function(data){
                    vue.list.push(data.data);
                })
            }
        },
        GetDate(num){ //num天 后
            var dd = new Date();
            dd.setDate(dd.getDate()+num);
            var y = dd.getFullYear();
            var m = dd.getMonth()+1;
            m = m >=10 ? d : "0" + d;
            return y +""+ m + "" + d;
        },
        goArticle(id){ //跳转到文章链接处
            this.$router.push({
                path:"article",
                query:{ //请求参数
                    id:id
                }
            })
        }
	}
}
</script>
<style>
    .list{
        border-left: solid 2px #4e5b6e;
        position: relative;
        padding-top: 30px;
    }
    .list-time{
        position: absolute;
        top:0px;
        left: 10px;
        font-size: 18px;
    }
    .list-time:before{
        content: '';
        width:8px;
        height: 8px;
        border-radius: 4px;
        position: absolute;
        top:7px;
        left: -15px;
        background: #4e5b6e;
    }
    .list-con{
        width:100%;
        padding: 10px 30px;
    }
    .list-con li{
        list-style: none;
        text-align: left;
        height: 70px;
        line-height: 70px;
        padding:5px 5px;
        border-bottom: solid 1px #eee;
        cursor: pointer;
    }
    .list-con li>img{
        height: 60px;
        width:60px;
        vertical-align: middle;
        margin-top: -15px;
    }
    .list-con li>span{
        font-size: 16px;
        vertical-align: middle;
    }
</style>
