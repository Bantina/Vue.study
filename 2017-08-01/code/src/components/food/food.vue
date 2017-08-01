<template>
  <transition name="move">
    <div class="food" v-show="showFlag" id="food">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image" alt="">
          <div class="back" @click.stop.prevent="hide">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now">¥{{food.price}}</span>
            <span class="old" v-show="food.oldPrice">¥{{food.oldPrice}}</span>
          </div>
          <div class="cartcontrol-wrapper">
            <cartControl :food="food"></cartControl>
          </div>
          <div @click.stop.prevent="addFirst" class="buy" v-show="!food.count || food.count == 0">加入购物车</div>
        </div>

        <!-- 商品介绍 -->
        <split v-show="food.info"></split>
        <div class="info" v-show="food.info">
          <h1 class="title">商品介绍</h1>
          <p class="text">{{food.info}}</p>
        </div>

        <!-- 商品评价 -->
        <split></split>
        <div class="ratings-food">
          <h1 class="title">商品评价</h1>
          <ratingSelect :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="food.ratings" @on-select-type="onSelectType" @on-change-onlyContent="onOnlyContent"></ratingSelect>
          <div class="rating-wrapper">
            <ul v-show="food.ratings && food.ratings.length">
              <li class="rating-item" v-for="rating in food.ratings" v-show="needShow(rating.rateType,rating.text)">
                <div class="user">
                  <span class="name">{{rating.username}}</span>
                  <img class="avatar" width="12" height="12" alt="" :src="rating.avatar">
                </div>
                <div class="time">{{rating.rateTime | foodDate}}</div>
                <p class="text">
                  <span :class="{'icon-thumb_up':rating.rateType==0,'icon-thumb_down':rating.rateType==1}"></span><span>{{rating.text}}</span>
                </p>
              </li>
            </ul>
            <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
          </div>
        </div>
      </div>
    </div>
  </transition>

</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import Vue from 'vue'
  import cartControl from '../cartcontrol/cartControl'
  import split from '../split/split'
  import ratingSelect from '../ratingselect/ratingSelect'
  import {formatDate} from '../../common/js/date' //export function

  const POSOTIVE = 0; //好评
  const NEGATIVE = 1; //差评
  const ALL = 2; // 全部

  export default {
      props:{
          food:{
              type:Object
          }
      },
      data(){
          return{
              showFlag:false,
              //传入ratingSelect的数据依赖跟踪
              selectType:ALL,
              onlyContent:false,
              desc:{
                  all:'全部',
                  positive:'推荐',
                  negative:'吐槽'
              }
          };
      },
      methods:{
          show(){
             let _this = this;
             this.showFlag = true;

             this.selectType = ALL; //每次初始化；
             this.onlyContent = false;

             this.$nextTick(function () { //滚动
               if(!this.scroll){
                   _this.scroll = new BScroll(document.getElementById('food'),{
                     click:true
                   });
               }else {
                   _this.scroll.refresh();
               }
             })
          },
          hide(){
              this.showFlag = false;
          },
          addFirst(event){
            if(!event._constructed){
                return;
            }
            //this.$dispatch('cart.add',event.target);//派发事件
            Vue.set(this.food,'count',1);
          },
          //从子组件ratingSelect $.emit()派发过来的方法。
          onSelectType(val){
              this.selectType = val;
          },
          onOnlyContent(val){
              this.onlyContent = val;
          },
          needShow(type,text){
              if(this.onlyContent && !text){ //只显示内容且没有内容
                  return false;
              }
              //判断 标签类型
              if(this.selectType === ALL){
                  return true;
              }else {
                  return type === this.selectType;
              }
          }
      },
      components:{
        cartControl,
        split,
        ratingSelect
      },
      filters:{
          //时间格式转化过滤器
          foodDate(time){
              let date = new Date(time);
              return formatDate(date,'yyyy-MM-dd hh:mm:ss');
          }
      }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .food
    position: fixed
    left:0
    top:0
    bottom: 48px
    z-index:30
    width:100%
    background: #fff
    transition:all 0.4s linear
    text-align :left
    &.move-transition
      transform:translate3d(0,0,0)
    &.move-enter,&.move-leave
      transform:translate3d(100%,0,0)
    .image-header
      position: relative
      width:100%
      height:0
      padding-top:100%
      img
        position: absolute
        top:0
        left:0
        width:100%
        height:100%
      .back
        position: absolute
        top: 10px
        left:0
        .icon-arrow_lift
          display: block
          padding:10px
          font-size: 20px
          color:#fff
    .content
      padding: 18px
      position: relative
      .title
        line-height :14px
        margin-bottom :8px
        font-size: 14px
        font-weight :700
        color:rgb(7,17,27)
      .detail
        margin-bottom :18px
        line-height :10px
        font-size :0
        height: 10px
        .sell-count,.rating
          font-size :10px
          color :rgb(147,153,159)
        .sell-count
          margin-right: 12px
      .price
        font-weight :700
        line-height: 24px
        .now
          font-size :14px
          color:rgb(240,20,20)
        .old
          font-size :12px
          margin-left :8px
          color:rgb(147,153,159)
          text-decoration :line-through
      .cartcontrol-wrapper
        position: absolute
        right: 12px
        bottom: 12px
      .buy
        position: absolute
        right: 18px
        bottom: 18px
        z-index: 10
        height: 24px
        line-height :24px
        padding:0 12px
        box-sizing:border-box
        font-size: 10px
        color: #fff
        background: rgb(0,160,220)
        border-radius :12px
    .info
      padding: 18px
      .title
        line-height :14px
        margin-bottom :6px
        font-size :14px
        color:rgb(7,17,27)
      .text
        line-height: 24px
        padding:0 8px
        font-size :12px
        color: rgb(77,85,93)
    .ratings-food
      padding-top:18px
      .title
        line-height :14px
        margin-left :18px
        font-size :14px
        color:rgb(7,17,27)
      .rating-wrapper
        padding:0 18px
        .rating-item
          position: relative
          padding:16px 0
          border-bottom:solid 1px rgba(7,17,27,.1)
          .user
            position: absolute
            top: 16px
            right:0
            font-size :0
            line-height :12px
            .name
              display: inline-block
              vertical-align: top
              font-size :10px
              color:rgb(147,153,159)
              margin-right :6px
            .avatar
              border-radius :50%


          .time
            line-height: 12px
            font-size :10px
            color:rgb(147,153,159)
            margin-bottom :6px
          .text
            line-height: 16px
            font-style: 12px
            color:rgb(7,17,27)
            .icon-thumb_up,.icon-thumb_down
              margin-right :4px
              line-height: 16px
              font-size :12px
            .icon-thumb_up
              color:rgb(0,160,220)
            .icon-thumb_down
              color: rgb(147,153,159)

        .no-rating
          font-size: 12px
          padding:16px 0
          color:rgb(147,153,159)
          text-align :center
</style>
