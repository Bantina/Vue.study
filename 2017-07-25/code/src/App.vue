<template>
  <div id="app">
   <div class="header">
     <v-header></v-header>
   </div>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view class="app-view"></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import header from './components/header/header.vue'
export default {
  name: 'app',
  components:{
    'v-header': header  //别名
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/mixin.styl"
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
  #app
    .tab
      display:flex
      width:100%
      height:40px
      line-height 40px
      //border-bottom: 1px solid rgba(7,17,27,.1)
      border-1px(rgba(7,17,27,.1))
      .tab-item
        flex: 1
        text-align: center
        & > a
          display : block //block可以使得a标签充满外层元素
          font-size:14px;
          color: rgb(77,85,93)
</style>
