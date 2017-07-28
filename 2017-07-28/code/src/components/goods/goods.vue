<template>
  <div class="goods">
    <!-- 左侧菜单栏 -->
    <div class="menu-wrapper" id="menu-wrapper">
      <ul>
        <li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex == index}" @click="selectMenu(index,$event)">
          <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
          <span class="text">{{item.name}}</span>
        </li>
      </ul>
    </div>
    <!-- 右侧 商品 list-->
    <div class="foods-wrapper" id="foods-wrapper">
      <ul>
        <li v-for="item in goods" class="food-list food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item">
              <div class="icon">
                <img width="57" height="57" :src="food.icon" alt="">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">¥{{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">¥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartControl :food="food"></cartControl>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <!-- 购物车 组件 -->
    <shopCart :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopCart>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  import BScroll from 'better-scroll'
  import shopCart from '../shopcart/shopCart'
  import cartControl from '../cartcontrol/cartControl'

  const ERR_OK = 0;

  export default {
    props:{
        seller:{
            type:Object
        }
    },
    data(){
      return{
          goods:[],
          listHeight:[],
          scrollY:0
      }
    },
    computed:{
      //计算当前左侧菜单的索引
      currentIndex(){
        for(let i=0;i<this.listHeight.length;i++){
            let height1 = this.listHeight[i]; //当前索引高度
            let height2 = this.listHeight[i+1]; //下一个索引高度
            // 当遍历到最后一个i时，height2=undefined, 所以 !height2
            if(!height2 || (this.scrollY >= height1 && this.scrollY < height2)){ //区间上下的范围
                return i;
              //this.scrollY = height1 控制刚开始未滑动时的高亮索引
            }
        }
        return 0;
      },
      //选中商品的计算；
      selectFoods(){
          let foods = [];
          this.goods.forEach(function (good) {
            good.foods.forEach(function (food) {
              if(food.count){
                  foods.push(food);
              }
            })
          })
        return foods;
      }
    },
    mounted(){
        var _this = this;
        axios.get('/api/goods').then(function (res) {
          if(res.data.errno == ERR_OK){
            _this.goods = res.data.data;
            //_this._initScroll(); //better-scroll
            _this.$nextTick(function () { //异步渲染dom
              _this._initScroll();
              _this._calculateHeight();
            })
            console.log('goods---->')
            console.log(_this.goods);
          }
        })
        this.classMap=['decrease','discount','special','invoice','guarantee'];
    },
    methods:{
        //better-scroll v-el:food-wrapper
        _initScroll(){
          let _this = this;
          _this.menuScroll = new BScroll(document.getElementById('menu-wrapper'),{
              click:true //派发点击事件 -PC端点击正常，移动端点击未触发；
          });
          _this.foodsScroll = new BScroll(document.getElementById('foods-wrapper'),{
              probeType: 3,
              click:true
          });
          _this.foodsScroll.on('scroll',(pos)=>{
            _this.scrollY = Math.abs(Math.round(pos.y));//先取整再取正；
          })

        },
        //计算右侧内容栏的滚动高度；
        _calculateHeight(){
          let foodList = document.getElementsByClassName('food-list-hook');
          let height = 0;
          this.listHeight.push(height);
          for(let i = 0;i<foodList.length;i++){
              let item = foodList[i];
              height += item.clientHeight;
              this.listHeight.push(height);
          }
        },
        //左侧菜单项点击事件-右侧联动；
        selectMenu(index,event){
          if(!event._constructed){ //自己的点击事件派发时 event._constructed==true
              return; //pc监听到时return
          }
          let foodList = document.getElementsByClassName('food-list-hook');
          let el = foodList[index];
          this.foodsScroll.scrollToElement(el,300);
        }
//        _drop(target){
//
//        }
    },
    components:{
      shopCart,
      cartControl
    }
    /*,created:{
        'cart.add'(target){
            this._drop(target)
        }
    }*/
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .goods
    display: flex
    position: absolute
    top:174px
    bottom: 46px
    width:100%
    overflow: hidden
    .menu-wrapper
      flex:0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table //垂直多行居中
        height:54px
        width:56px
        line-height:14px
        border-bottom:1px solid rgba(7,17,27,.1)
        padding:0 12px
        &.current
          background: #fff
          position:relative
          z-index: 10
          margin-top :-1px
          font-weight :700
          .text
            border:none;
        /*&.last-child*/
          /*border-bottom:none*/
        .icon
          display: inline-block
          vertical-align: top
          width:12px
          height: 12px
          margin-right:2px
          background-size: 12px 12px
          background-repeat:no-repeat
          &.decrease
            bg-image('decrease_3')
          &.discount
            bg-image('discount_3')
          &.guarantee
            bg-image('guarantee_3')
          &.invoice
            bg-image('invoice_3')
          &.special
            bg-image('special_3')
        .text
          display: table-cell
          width: 56px
          vertical-align :middle
          font-size 12px
    .foods-wrapper
      flex:1
      .title
        padding-left :14px
        height: 26px
        line-height :26px
        border-left :2px solid #d9dde1
        color: rgb(147,153,159)
        font-size :12px
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom:18px
        border-bottom:rgba(7,17,27,.1) 1px solid
        &:last-child
          border-bottom :none
          margin-bottom:0
        .icon
          flex:0 0 57
          margin-right :10px
        .content
          flex:1
          text-align: left
          position: relative
          .name
            margin:2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size :14px
            color:rgb(7,17,27)
          .desc,.extra
            line-height: 10px
            font-size :10px
            color:rgb(147,153,159)
          .desc
            line-height: 12px
            margin-bottom :8px
          .extra
            .count
              margin-right :12px
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
            right: -10px
            bottom: 12px


</style>
