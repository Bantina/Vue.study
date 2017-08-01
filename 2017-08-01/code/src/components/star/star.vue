<template>
  <div class="star" :class="starType">
    <span class="star-item" v-for="itemClass in itemClasses" :class="itemClass"></span>
  </div>
</template>

<script type="text/ecmascript-6">
  const LENGTH = 5; //star count
  const CLS_ON = 'on'; //全亮的star
  const CLS_HALF = 'half'; //half star
  const CLS_OFF = 'off'; //全灭的star

  export default{
      props:{
          size:{ //星星大小
              type:Number
          },
          score:{ //分数
              type:Number
          }
      },
      computed:{
          starType() {
              return 'star-' + this.size;
          },
          itemClasses() {
            let result = []; //星星样式数组
            let score = Math.floor(this.score * 2)/2; //向下取0.5倍数的值。用于半星的表示；
            let hasDecimal = score % 1 !== 0; //是否有小数.5 -- 半星
            let integer = Math.floor(score); //向下取整的数 -- 全星
            for(let i = 0;i<integer;i++){ //添加全星
                result.push(CLS_ON);
            }
            if(hasDecimal){ //添加半星
                result.push(CLS_HALF)
            }
            while(result.length < LENGTH){ //少于5颗星时，添加灰色星星
                result.push(CLS_OFF);
            }
            return result;
          }
      }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .star
    font-size:0
    .star-item
      display: inline-block
      background-repeat:no-repeat
    &.star-48
      .star-item
        width: 20px
        height:20px
        margin-right: 22px
        background-size :20px 20px
        &.last-child  //last star has not right margin
          margin-right :0
        &.on //all star
          bg-image('star48_on')
        &.half //half star
          bg-image('star48_half')
        &.off //none light star
          bg-image('star48_off')
    &.star-36
      .star-item
        width: 15px
        height:15px
        margin-right: 6px
        background-size :15px 15px
        &.last-child  //last star has not right margin
          margin-right :0
        &.on //all star
          bg-image('star36_on')
        &.half //half star
          bg-image('star36_half')
        &.off //none light star
          bg-image('star36_off')
    &.star-24
      .star-item
        width: 10px
        height:10px
        margin-right: 3px
        background-size :10px 10px
        &.last-child  //last star has not right margin
          margin-right :0
        &.on //all star
          bg-image('star24_on')
        &.half //half star
          bg-image('star24_half')
        &.off //none light star
          bg-image('star24_off')
</style>
