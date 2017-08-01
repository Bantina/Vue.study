<template>
  <div class="seller" id="seller_w">
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="desc">
          <star :size="36" :score="seller.score"></star>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}</span>min
            </div>
          </li>
        </ul>
        <div class="favorite" @click="toggleFavorite">
          <span class="icon-favorite" :class="{'active':favorite}"></span>
          <span class="text">{{favoriteText}}</span>
        </div>
      </div>
      <split></split>
      <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <div class="content-wrapper">
          <p class="content">{{seller.bulletin}}</p>
        </div>
        <ul v-if="seller.supports" class="supports">
          <li class="support-item" v-for="(item,index) in seller.supports">
            <span class="icon" :class="classMap[seller.supports[index].type]"></span>
            <span class="text">{{seller.supports[index].description}}</span>
          </li>
        </ul>
      </div>

      <split></split>
      <div class="pics">
        <h1 class="title">商家实景</h1>
        <div class="pic-wrapper">
          <ul class="pic-list"  id="pic-list">
            <li class="pic-item" v-for="pic in seller.pics">
              <img :src="pic" width="120" height="90" alt="">
            </li>
          </ul>
        </div>
      </div>

      <split></split>
      <div class="info">
        <h1 class="title">商家信息</h1>
        <ul>
          <li class="info-item" v-for="info in seller.infos">{{info}}</li>
        </ul>
      </div>


      <!-- transition test-->
      <button @click="transitionTest" class="btn">{{transitionText}}</button>
      <transition name="move">
        <div class="menu" v-show="transitionShow">
          <div class="inner inner-1">1</div>
          <div class="inner inner-2">2</div>
          <div class="inner inner-3">3</div>
        </div>
      </transition>
    </div>


  </div>
</template>

<script type="text/ecmascript-6">
  import star from '../star/star'
  import split from '../split/split'
  import BScroll from 'better-scroll'

  import {saveToLocal, loadFromLocal} from '../../common/js/store'

  export default {
    props:{
       seller:{
           type:Object
       }
    },
    data () {
      return {
        transitionShow: false,
        //favorite:false
        //使用localStorage读取，必须用箭头函数绑定this值；
        favorite:( () => {
          return loadFromLocal(this.seller.id,'favorite',false);
        })() //注：立即执行函数
      };
    },
    components:{
      star,
      split
    },
    created(){
      this.classMap=['decrease','discount','special','invoice','guarantee'];
    },
    mounted(){
      this._initScroll();
      this._initPics();
    },
    watch:{
        'seller'(){
          this._initScroll();
          this._initPics();
        }

    },
    methods: {
      transitionTest () {
        this.transitionShow = !this.transitionShow;
      },
      _initScroll(){
          if (!this.selScroll){
              this.selScroll = new BScroll(document.getElementById('seller_w'),{
                click:true
              });
          }else {
              this.selScroll.refresh();
          }
      },
      _initPics(){
        if(this.seller.pics){
          let picWidth = 120;
          let margin = 6;
          let width =(picWidth + margin) * this.seller.pics.length - margin;
          let picList = document.getElementById('pic-list');
          let _this = this;
          picList.width = width + 'px';
          this.$nextTick(function () {
            if(!this.picScroll){
              this.picScroll = new BScroll(picList,{
                scrollX:true,
                eventPassthrough:'vertical',
                click:true
              })
            }else {
                this.picScroll.refresh();
            }

          })
        }
      },
      toggleFavorite(event){
          if(!event._constructed){
              return;
          }
          this.favorite = !this.favorite;
          //localStorage.favorite = this.favorite; //弊端不灵活，只能存储同一个键值；
          //使用通用模块化的 localStorage 存储 favorite状态
          saveToLocal(this.seller.id,'favorite',this.favorite);
      }
    },
    computed: {
      transitionText () {
        return this.transitionShow ? 'Bye' : 'Hi';
      },
      favoriteText(){
        return this.favorite?'已收藏':'收藏'
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .seller
    position: absolute
    top: 174px
    left:0
    width:100%
    overflow: hidden
    text-align :left
    .btn
      position: fixed
      bottom: 15px
      right: 15px
      z-index: 10
      width: 40px
      height: 40px
      line-height: 40px
      border-radius: 50%
      border: none
      outline: none
      color: #fff
      font-size: 18px
      background: #f90
    .menu
      position: fixed
      bottom: 5px
      right: 10px
      width: 50px
      height: 50px
      border-radius: 50%
      transition: all .7s ease-in
      &.move-enter-active
        .inner
          transform: translate3d(0, 0, 0)
          transition-timing-function: cubic-bezier(0, .57, .44, 1.97)
        .inner-1
          transition-delay: .1s
        .inner-2
          transition-delay: .2s
        .inner-3
          transition-delay: .3s
      &.move-enter, &.move-leave-active
        .inner
          transition-timing-function: ease-in-out
        .inner-1
          transform: translate3d(0, 60px, 0)
          transition-delay: .3s
        .inner-2
          transform: translate3d(40px, 40px, 0)
          transition-delay: .2s
        .inner-3
          transform: translate3d(60px, 0, 0)
          transition-delay: .1s
      .inner
        display: inline-block
        position: absolute
        width: 30px
        height: 30px
        line-height: 30px
        border-radius: 50%
        background: #00a0dc
        text-align: center
        color: #fff
        transition: all .4s
      .inner-1
        top: -50px
        left: 10px
      .inner-2
        left: -30px
        top: -30px
      .inner-3
        left: -50px
        top: 10px
  .overview
    padding: 18px
    position: relative
    .title
      margin-bottom: 8px
      line-height: 14px
      color: rgb(7,17,27)
      font-size: 14px
    .desc
      padding-bottom :18px
      border-bottom:solid 1px rgba(7,17,27,.1)
      font-size :0
      .star
        display: inline-block
        margin-right :8px
        vertical-align :top
      .text
        display: inline-block
        margin-right :12px
        line-height :18px
        vertical-align: top
        font-size :10px
        color:rgb(77,85,93)
    .remark
      display: flex
      padding-top :18px
      .block
        flex:1
        text-align :center
        border-right :solid 1px rgba(7,17,27,.1)
        &:last-child
          border:none
        h2
          margin-bottom :4px
          line-height :10px
          font-size :10px
          color: rgb(147,153,159)
        .content
          line-height :24px
          font-size :10px
          color: rgb(7,17,27)
          .stress
            font-size :24px
    .favorite
      position: absolute
      right: 11px
      top: 18px
      text-align :center
      width: 50px
      .icon-favorite
        display: block
        line-height :24px
        margin-bottom :4px
        font-size 24px
        color:#d4d6d9
        &.active
          color: rgb(240,20,20)
      .text
        line-height :10px
        font-size :10px
        color: rgb(77,85,93)

  .bulletin
    padding:18px 18px 0 18px
    .title
      margin-bottom: 8px
      line-height :14px
      color: rgb(7,17,27)
      font-size :14px
    .content-wrapper
      padding:0 12px 16px 12px
      border-bottom :solid 1px rgba(7,17,27,.1)
      .content
        line-height :24px
        font-size :12px
        color: rgb(240,20,20)
    .supports
      .support-item
        padding:16px 12px
        border-bottom:solid 1px rgba(7,17,27,.1)
        &:last-child
          border:none
        .icon
          display: inline-block
          vertical-align: top
          width:12px
          height: 12px
          margin-right:4px
          background-size: 12px 12px
          background-repeat:no-repeat
          &.decrease
            bg-image('decrease_4')
          &.discount
            bg-image('discount_4')
          &.guarantee
            bg-image('guarantee_4')
          &.invoice
            bg-image('invoice_4')
          &.special
            bg-image('special_4')
        .text
          line-height :16px
          font-size :14px
          color: rgb(7,17,27)
  .pics
    padding: 18px
    .title
      margin-bottom: 12px
      line-height :14px
      color:rgb(7,17,27)
      font-size :14px
    .pic-wrapper
      width:100%
      overflow: hidden
      white-space:nowrap
      .pic-list
        font-size :0
        .pic-item
          display: inline-block
          margin-right :6px
          width: 120px
          height: 90px
          &:last-child
            margin:0



  .info
    padding:18px 18px 0 18px
    .title
      padding-bottom: 12px
      line-height :14px
      border-bottom :solid 1px rgba(7,17,27,.1)
      font-size :14px
    .info-item
      padding:16px 12px
      line-height :16px
      border-bottom :solid 1px rgba(7,17,27,.1)
      font-size :12px
      &:last-child
        border:none
</style>
