<template>
  <div class="cartControl">
    <!--<div class="cart-decrease icon-remove_circle_outline" v-show="food.count>0" @click="decreaseCart($event)"></div>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click="addCart($event)"></div>-->
    <!--添加动画后的加减数量控制组件-->
    <transition name="move">
      <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart($event)">
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>
    <transition name="showUp">
      <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    </transition>
    <div class="cart-add icon-add_circle" @click.stop.prevent="addCart($event)"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue'

  export default{
      props:{
          food:{ //count
              type:Object
          }
      },
      mounted(){
          //console.log(this.food)
      },
      methods:{
        addCart(event){
          if(!event._constructed){ //自己的点击事件派发时 event._constructed==true
            return; //pc监听到时return
          }
          if(!this.food.count){
              //this.food.count = 1; //属性不存在时，直接控制是不起作用的；
              Vue.set(this.food,'count',1); //需要Vue.set();
          }else{
              this.food.count++;
          }
          //this.$dispatch('cart.add',event.target);//派发事件
        },
        decreaseCart(event){
          if(!event._constructed){ //自己的点击事件派发时 event._constructed==true
            return; //pc监听到时return
          }
          if(this.food.count){
            this.food.count--;
          }
        }
      }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .cartControl
    font-size :0
    .cart-decrease
      display: inline-block
      padding: 6px
      transition:all 0.4s linear
      &.move-transition
        opacity:1
        transform: translate3d(0, 0, 0)
      .inner
        display: inline-block
        line-height:24px
        font-size :24px
        color:rgb(0,160,220)
        transform:rotate(0)
      &.move-enter-active,&.move-leave-active
        transition:all 0.4s linear
      &.move-enter,&.move-leave-active
        opacity:0
        transform: translate3d(24px, 0, 0)
        .inner
          transform:rotate(180deg)
    .cart-count
      display: inline-block
      vertical-align: top
      width: 12px
      padding-top:6px
      line-height: 24px
      text-align :center
      font-size :10px
      color:rgb(147,153,159)
      &.showUp-transition
        opacity:1
      &.showUp-enter-active,&.showUp-leave-active
        transition:all 0.4s linear
      &.showUp-enter,&.showUp-leave
        opacity:0
    .cart-add
      display: inline-block
      padding: 6px
      line-height:24px
      font-size :24px
      color:rgb(0,160,220)
</style>
