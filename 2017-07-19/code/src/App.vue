<template>
  <div id="app">
    <aside class="appLeft">
      <div class="portrait">
        <div class="portrait-blank">
          <img src="./assets/portrait0.jpg" alt="">
        </div>
      </div>
      <div class="nickname">{{ nickname }}</div>
      <ul class="menu_ul">
        <li @click="change(1)" :class="{'focus':themeNum==1}">
          <span>首页</span>
          <i class="iconfont" />
        </li>
        <li v-for="(list,index) in menuLists" @click="change(list.id)" :class="{'focus':themeNum==list.id}">
          <span>{{list.name}}</span>
        </li>
      </ul>
    </aside>
    <aside class="appRight">
       <router-view class="app-view"></router-view>
    </aside>
    <div style="clear:both"></div>
  </div>
</template>

<script>
  import {
    mapState
  } from 'vuex'
  import api from './api/index'
  export default {
    name: 'app',
    computed:{
      ...mapState({
        themeNum:state => state.num
      })
    },
    mounted:function(){ //挂载完成时获取菜单栏
      let vue = this;
      api.getTopics().then(function(data){
        vue.menuLists = data.data.others;
      })
    },
    data(){
      return{
        menuLists:[],
        nickname: 'Bantina'
      }
    },
    // watch:{ //监听 路由的改变，改变的同时提交store状态
    //   '$route' (to,from){
    //     let vue = this;
    //     to.path == '/'&& this.themeNum !=1 && this.$store.commit('add',1)
    //   }
    // },
    methods:{
      //菜单项改变时：
      change:function (id) {
        let path = id == 1?'home':'theme';
        this.$router.push({
          path:path,
          query:{
            id:id||""
          }
        })
        this.$store.commit('add',id);
      }
    }
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.appLeft{
  width:20%;
  height: 100%;
  float: left;
  background-color: #fff;
}
.portrait{
  height:240px;
  position: relative;
  background-color: #4e5b6e;
}
.portrait-blank{
  width:120px;
  height: 120px;
  position: absolute;
  bottom: -60px;
  left:50%;
  transform:translate(-50%);
  border-radius: 60px;
  background-color: #fff;
}
.portrait-blank img{
  width:100px;
  height: 100px;
  margin-top: 10px;
  border-radius: 50px;
}
.nickname{
  width:100%;
  text-align: center;
  margin:90px 0 30px 0;
  color: #1b6575;
  font-size: 24px;
}
.menu_ul{
  padding:0;
}
.menu_ul li{
  height: 35px;
  line-height: 35px;
  list-style-type: none;
  text-align: center;
  cursor: pointer;
}
.menu_ul li:hover{
  background: #a7b9d4;
}
.appRight{
  width:79%;
  height: 100%;
  padding:30px;
  float: left;
  border-left:solid 1px #eee;
  background-color: #fff;
}
.appRight-title{
  height: 50px;
  width:100%;
  line-height: 50px;
  padding-left: 30px;
  border-bottom: solid 1px #eee;
}
.appRight-list{
  margin:10px 0;
}
.focus{
  position: relative;
  background: #4e5b6e;
  color: #fff;
}
.focus:after{
  content: '';
  position: absolute;
  top:10px;
  right: 30px;
  display: inline-block;
  border:solid 8px;
  border-color: transparent transparent transparent tomato;
}
</style>
