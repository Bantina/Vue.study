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
        <li>
          <span>首页</span>
          <i class="iconfont" />
        </li>
        <li v-for="(list,index) in menuLists">
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
  import api from './api/index'
  export default {
    name: 'app',
    mounted:function(){
      let vue = this;
      // api.getTopics().then(function(data){
      //   vue.menuLists = data.data.others;
      // })
    },
    data(){
      return{
        menuLists:[],
        nickname: 'Bantina'
      }
    },
    methods:{

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
  width:30%;
  height: 100%;
  float: left;
  background-color: #fff;
}
.portrait{
  height:150px;
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
  color: tomato;
}
.appRight{
  width:69%;
  padding:30px;
  float: left;
  /*border:solid 1px #eee;*/
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

















</style>
