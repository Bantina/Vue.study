<template>
  <div class="ratingSelect">
    <div class="rating-type">
      <span @click="select(2,$event)" class="block positive" :class="{'active':selectType === 2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
      <span @click="select(0,$event)" class="block positive" :class="{'active':selectType === 0}">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
      <span @click="select(1,$event)" class="block negative" :class="{'active':selectType === 1}">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
    </div>
    <div class="switch" :class="{'on':onlyContent}" @click="toggleContent">
      <i class="icon-check_circle"></i>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

  const POSOTIVE = 0; //好评
  const NEGATIVE = 1; //差评
  const ALL = 2; // 全部

  export default {
      props:{
          ratings:{
              type:Array,
              default(){
                  return []
              }
          },
          selectType:{
              type:Number,
              default:ALL
          },
          onlyContent:{
              type:Boolean,
              default:false
          },
          desc:{ //描述文案
              type:Object,
              default(){
                  return {
                      all:'全部',
                      positive:'好评',
                      negative: '差评'
                  }
              }
          }
      },
      data(){
        return{
          myselType:this.selectType, //1.父组件传值props的副本。
          myonlyContent:this.onlyContent
        }
      },
      computed:{
          //计算 positive 个数
          positives(){
            return this.$props.ratings.filter(function (rating) {
              return rating.rateType === POSOTIVE;
            })
          },
          negatives(){
            return this.ratings.filter(function (rating) {
              return rating.rateType === NEGATIVE;
            })
          }
      },
      methods:{
        select(type,event){
            if(!event._constructed){
                return;
            }
            //this.selectType = type;
            // error:[Vue warn]: Avoid mutating a prop directly since the value will be overwritten whenever the parent component re-renders.
            this.myselType = type;
        },
        toggleContent(event){
          if(!event._constructed){
            return;
          }
          //this.onlyContent=!this.onlyContent;
          this.myonlyContent = !this.myonlyContent;
        }

      },
      watch:{
          selectType(val){ //2.监听 父组件的值的改变，props副本值改变。
              this.myselType = val;
          },
          myselType(val){  //3.监听 props副本值改变，事件派发通知到父组件
              this.$emit("on-select-type",val); //4.父组件@on-select-type调用,决定selectType值的真正改变
          },
          onlyContent(val){
              this.myonlyContent = val;
          },
          myonlyContent(val){
              this.$emit("on-change-onlyContent",val);
          }
      }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .ratingSelect
    text-align: left
    .rating-type
      padding:18px 0
      margin:0 18px
      border-bottom:solid 1px rgba(7,17,27,.1)
      font-size :0
      .block
        display: inline-block
        padding: 8px 12px
        margin-right :8px
        border-radius :1px
        color: rgb(77,85,93)
        font-size :12px
        &.active
          color: #fff
        .count
          margin-left:2px
          font-size :8px
        &.positive
          background: rgba(0,160,220,.2)
          &.active
            background: rgb(0,160,220)
        &.negative
          background: rgba(77,85,93,.2)
          &.active
            background: rgb(77,85,93)
    .switch
      padding:12px 18px
      line-height :24px
      border-bottom :1px solid rgba(7,17,27,.1)
      color:rgb(147,153,159)
      font-size :0
      &.on
        .icon-check_circle
          color:#00c850
      .icon-check_circle
        display:inline-block
        vertical-align:top
        margin-right :4px
        font-size :24px
      .text
        display:inline-block
        vertical-align:top
        font-size :12px


</style>
