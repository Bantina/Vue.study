<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper"  @click="toggleList">
          <div class="logo" :class="{'highlight':totalCount>0}">
            <i class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></i>
          </div>
          <!-- logo 右上角数量-->
          <div class="num" v-show="totalCount>0">{{totalCount}}</div>
        </div>
        <div class="price" :class="{'highlight':totalCount>0}">¥{{totalPrice}}</div>
        <div class="desc">另需配送费¥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right" @click="pay">
        <div class="pay" :class="payClass">
          {{payDesc}}
        </div>
      </div>
      <!-- 抛物线动画小球 -->
      <!--<div class="ball-container">
        <transition class="ball">
          <div v-for="ball in ballls" v-show="ball.show"></div>
          <div class="inner"></div>
        </transition>
      </div>-->

      <!-- 购物清单 -->
      <transition name="fold">
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="empty"> 清空</span>
          </div>
          <div class="list-content" id="list-content">
            <ul>
              <li class="food" v-for="food in selectFoods">
                <span class="name">{{food.name}}</span>
                <div class="price">
                  <span>¥{{food.price*food.count}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartControl :food="food"></cartControl>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>

      <transition name="fade">
        <div class="list-mask" v-show="listShow" @click="hideList"></div>
      </transition>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import cartControl from '../cartcontrol/cartControl';
  import BScroll from 'better-scroll'

  export default{
      props:{
        deliveryPrice:{ //配送费
            type:Number,
            default:0 //默认值
        },
        minPrice:{ //最低起送费
            type:Number,
            default:0
        },
        selectFoods:{
            type:Array,
            default(){ //Array/Object的default为函数
                return [];
            }
        }
      },
      data(){
        return{
            balls:[
              {
                show: false
              },{
                show: false
              },{
                show: false
              },{
                show: false
              },{
                show: false
              }
            ],
            fold:true //购物清单展开/收起的状态
        }
      },
      computed:{
          totalPrice(){
              let total = 0;
              this.selectFoods.forEach(function (food) {
                total += food.price*food.count;
              });
              return total
          },
          totalCount(){
                let count = 0;
                this.selectFoods.forEach(function (food) {
                  count += food.count;
                })
                return count;
          },
          // 结算值计算，改变DOM
          payDesc(){
            if(this.totalPrice === 0){
                return `¥${this.minPrice}元起送`;
            }else if(this.totalPrice < this.minPrice){
                let diff = this.minPrice - this.totalPrice;
                return `还差¥${diff}元起送`;
            }else{
                return '去结算';
            }
          },
          // 结算按钮的样式类 计算，结合css
          payClass(){
              if(this.totalPrice < this.minPrice){
                  return 'not-enough'
              }else{
                  return 'enough'
              }
          },
          // 是否展开 购物清单
          listShow(){
              var _this = this;
              if(!this.totalCount){
                  this.fold = true;
                  return false;
              }
              let show = !this.fold;
              if(show){
                  this.$nextTick(function () {
                      if(!this.scroll){
                        _this.scroll = new BScroll(document.getElementById('list-content'),{
                          click:true
                        })
                      }else {
                        this.scroll.refresh();
                      }
                  })
              }
              return show;
          }
      },
      methods:{
        //控制购物清单的 展开／折叠状态
        toggleList(){
            if(!this.totalCount){ //数量0 点击无反应
                return
            }
            this.fold = !this.fold;
        },
        empty(){
            this.selectFoods.forEach(function (food) {
              food.count = 0;
            })
        },
        hideList(){
            this.fold = true;
        },
        pay(){
            if(this.totalPrice < this.minPrice){
                return;
            }
            window.alert('pay > '+this.totalPrice);
        }
      },
      components:{
        cartControl
      }

  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .shopcart
    position:fixed
    left:0
    bottom:0
    z-index: 50
    height: 48px
    width:100%
    .content
      display: flex
      background: #141d27
      color: rgba(255,255,2555,.4)
      .content-left
        flex:1
        text-align :left
        z-index: 100
        .logo-wrapper
          display: inline-block
          position: relative
          top: -10px
          width: 56px
          height: 56px
          margin:0 12px
          padding: 6px
          box-sizing :border-box
          vertical-align: top
          -webkit-border-radius: -moz-border-radius
          border-radius:50%
          background-color: #141d27
          .logo
            width:100%
            height:100%
            border-radius :50%;
            background:#2b343c
            text-align :center
            &.highlight
              background: rgb(0,160,220)
            .icon-shopping_cart
              line-height :44px //居中，设为父元素的高度
              font-size : 24px
              color:#80858a
              &.highlight
                color: #fff
          .num
            position: absolute
            top:0
            right:0
            width: 24px
            height: 16px
            line-height :16px
            text-align :center
            border-radius :16px
            font-size :9px
            font-weight :700
            color: #fff
            background-color: rgb(240,20,20)
            box-shadow: 0 4px 8px 0 rgba(0,0,0,.4)
        .price
          display: inline-block
          font-size :16px
          color:rgba(255,255,255,.4)
          vertical-align :top
          line-height :24px
          margin-top:12px //结合line-height&border-right实现一定高度的右边框并居中
          border-right:1px solid rgba(255,255,255,.1)
          padding-right :12px
          box-sizing :border-box
          &.highlight
            color:#fff
        .desc
          display: inline-block
          vertical-align: top
          line-height :24px
          margin: 12px 0 0 12px
      .content-right
        flex:0 0 105px
        width: 105px
        z-index: 100
        .pay
          height: 48px
          line-height :48px
          text-align :center
          font-size :12px
          font-weight 700
          background: #2b333b
          &.not-enough
            background: #2b333b
          &.enough
            background: #00b43c
            color:#fff

      .ball-container
        .ball
          position: fixed
          left:32px
          bottom: 22px
          z-index: 200
          &.drop-transition
            transition:all 0.4s
            .inner
              width: 16px
              height: 16px
              border-radius :50%
              background: rgb(0,160,220)
              transition:all 0.4s
      .shopcart-list
        position: absolute
        top:0
        left:0
        z-index: 45
        width:100%
        transition:all 0.5s
        &.fold-enter-active
          transform: translate3d(0,-100%,0)
        &.fold-enter,&.fold-leave-active
          transform:translate3d(0,0,0)
        .list-header
          height: 40px
          line-height :40px
          padding:0 18px
          background-color: #f3f5f7
          border:solid 2px rgba(7,17,27,.1)
          .title
            float: left
            font-size :14px
            color:rgb(7,17,27)
          .empty
            float: right
            font-size :12px
            color:rgb(0,160,220)
        .list-content
          /*padding:0 18px*/
          max-height: 217px
          background: #fff
          overflow: hidden
          background: #fff
          .food
            position: relative
            padding:12px 20px
            text-align :left
            box-sizing:border-box
            border:solid 1px rgba(7,17,27,.1)
            .name
              line-height :24px
              font-size :14px
              color:rgb(7,17,27)
            .price
              position: absolute
              right: 90px
              bottom: 12px
              font-size: 14px
              font-weight 700
              color:rgb(240,20,20)
            .cartcontrol-wrapper
              position: absolute
              right:0
              bottom: 6px


  .list-mask
    position: fixed
    top:0
    left:0
    width:100%
    height:100%
    z-index: 40
    background-filter:blur(10px)
    transition: all 0.5s
    &.fade-enter-active
      opacity:1
      background: rgba(7,17,27,.6)
    &.fade-enter,&.fade-leave
      opacity:0
      background: rgba(7,17,27,0)
</style>
