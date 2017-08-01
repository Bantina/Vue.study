<template>
  <div class="ratings" id="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star :size="36" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <ratingSelect :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="ratings" @on-select-type="onSelectType" @on-change-onlyContent="onOnlyContent"></ratingSelect>
      <div class="rating-wrapper">
        <ul>
          <li v-for="rating in ratings" class="rating-item" v-show="needShow(rating.rateType,rating.text)">
            <div class="avatar">
              <img :src="rating.avatar" alt="" width="28" height="28">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <star :size="24" :score="rating.score"></star>
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                <span class="icon-thumb_up"></span>
                <span class="item" v-for="item in rating.recommend">{{item}}</span>
              </div>
              <div class="time">
                {{rating.rateTime | ratingDate}}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import star from '../star/star'
  import ratingSelect from '../ratingselect/ratingSelect'
  import split from '../split/split'
  import axios from 'axios'
  import {formatDate} from '../../common/js/date' //export function
  import BScroll from 'better-scroll'

  //维护ratingSelect组件
  const POSOTIVE = 0; //好评
  const NEGATIVE = 1; //差评
  const ALL = 2; // 全部

  const ERR_OK = 0;

  export default{
    props:{
        seller:{
            type:Object
        }
    },
    data(){
        return{
          ratings:[],
          //传入ratingSelect的数据依赖跟踪
          selectType:ALL,
          onlyContent:false,
          desc:{
            all:'全部',
            positive:'好评',
            negative:'差评'
          }
        }
    },
    mounted(){
      var _this = this;
      axios.get('/api/ratings').then(function (res) {
        if(res.data.errno == ERR_OK){
          _this.ratings = res.data.data;
          _this.$nextTick(function () {
            _this.scroll = new BScroll(document.getElementById('ratings'),{
              click:true
            });
          });
        }
      })
    },
    methods:{
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
        star,
        ratingSelect,
        split
    },
    filters:{
      //时间格式转化过滤器
      ratingDate(time){
        let date = new Date(time);
        return formatDate(date,'yyyy-MM-dd hh:mm');
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .ratings
    position: absolute
    top: 174px
    bottom:0
    left :0
    width:100%
    overflow: hidden
    .overview
      display: flex
      padding:18px 0
      .overview-left
        flex:0 0 137px
        width: 137px
        border-right:1px solid rgba(7,17,27,.1)
        padding:6px 0
        @media only screen and (max-width:320px)
          flex: 0 0 120px
          width: 12 opx
        .score
          line-height: 28px
          font-size :24px
          color: rgb(255,153,0)
          margin-bottom :6px
        .title
          font-size :12px
          line-height: 12px
          color:rgb(7,17,27)
          margin-bottom :8px
        .rank
          line-height: 10px
          font-size :10px
          color:rgb(147,153,159)
      .overview-right
        flex:1
        padding :3px 0 0 24px
        @media only screen and (max-width:320px)
          padding :3px 0 0 6px
        .score-wrapper
          /*line-height: 18px*/
          margin-bottom :8px
          font-size :0
          vertical-align :top
          text-align: left
          .title
            display: inline-block
            line-height :18px
            font-size :12px
            color:rgb(7,17,27)
            vertical-align :top
          .star
            display: inline-block
            vertical-align: top
            margin:0 12px
            @media only screen and (max-width:320px)
              margin:0 5px
          .score
            display: inline-block
            vertical-align :top
            font-size: 12px
            line-height :18px
            color:rgb(255,153,0)
        .delivery-wrapper
          font-size :0
          text-align :left
          .title
            line-height :18px
            font-size :12px
            color:rgb(7,17,27)
          .delivery
            font-size :12px
            color: rgb(147,153,159)
            margin: 0 12px
            @media only screen and (max-width:320px)
              margin:0 5px
    .rating-wrapper
      padding: 0 18px
      text-align: left
      .rating-item
        display: flex
        padding:18px 0
        border-bottom :solid 1px rgba(7,17,27,.1)
        .avatar
          flex:0 0 28px
          width: 28px
          margin-right: 12px
          img
            border-radius :50%
        .content
          position: relative
          flex:1
          .name
            line-height: 12px
            margin-bottom :4px
            font-size :10px
            color:rgb(7,17,27)
          .star-wrapper
            margin-bottom :6px
            font-size :0
            .star
              display: inline-block
              margin-right: 6px
              vertical-align: top
            .delivery
              display: inline-block
              vertical-align: top
              line-height :12px
              font-size :10px
              color:rgb(147,153,159)
          .text
            line-height: 18px
            color:rgb(7,17,27)
            margin-bottom: 8px
            font-size :12px
          .recommend
            line-height :16px
            font-size :0
            .icon-thumb_up,.item
              display: inline-block
              margin:0 8px 4px 0
              font-size :9px
            .icon-thumb_up
              color: rgb(0,160,220)
            .item
              padding:0 6px
              border:solid 1px rgba(7,17,27,.1)
              color: rgb(147,153,159)
              background-color: #fff
          .time
            position: absolute
            top:0
            right:0
            line-height :12px
            font-size :10px
            color: rgb(147,153,159)

</style>
