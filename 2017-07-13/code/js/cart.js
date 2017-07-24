var product = {
  "status":1,
  "result":{
    "list":[
      {
        "productId":"10001",
        "productName":"Artka连衣裙",
        "productPrice":"300",
        "productQuentity":"1",
        "productImg":"http://ww2.sinaimg.cn/mw690/005Tivpbjw1f4huqsnuevj30go0goabd.jpg",
        "productShop":"商家aaaaa",
        "parts":[
          {
            "partsId":"20001",
            "partsName":"伞"
          }
        ]

      },
      {
        "productId":"10002",
        "productName":"新品阔腿七分裤",
        "productPrice":"500",
        "productQuentity":"2",
        "productImg":"http://ww1.sinaimg.cn/mw690/005Tivpbjw1f4huqtcllzj30go0gogmm.jpg",
        "productShop":"商家bbb",
        "parts":[
          {
            "partsId":"20001",
            "partsName":"伞"
          }
        ]

      },
      {
        "productId":"10003",
        "productName":"Artka连衣裙2",
        "productPrice":"1000",
        "productQuentity":"1",
        "productImg":"http://ww2.sinaimg.cn/mw690/005Tivpbjw1f4huqsnuevj30go0goabd.jpg",
        "productShop":"商家aaaaa",
        "parts":[
          {
            "partsId":"20001",
            "partsName":"伞"
          }
        ]

      }
    ]
  },
  "message":""
}
//组件定义必须放在vm之前
// Vue.component('selected-view',{
//   template:`
//     <div class="selectedViewBlock">
//         <img src="http://ww2.sinaimg.cn/mw690/005Tivpbjw1f4huqsnuevj30go0goabd.jpg" alt="">
//         <span class="selCount">22</span>
//         <span class="del" @click="toggle">22222</span>
//     </div>
//   `,
//   props:{
//     model:Object
//   },
//   data:function(){
//     return{

//     }
//   },
//   methods:{
//     toggle:function (argument) {
//       console.log(this.model)
//     }
//   }
// })

var vm = new Vue({
  el:"#Cart",
  data:{
    title:'我 的 购 物 车 (My Shopping Cart)',
    productList:product.result.list,
    totalMoney:0,
    totalQuentity:0,
    checkAllFlag:false
  },
  //过滤器-局部
  filters:{
    // 金额格式的过滤器
    fomatMoney: function(value){
      return '¥'+parseFloat(value).toFixed(2); //toFixed()会对数字的精度有丢失，一般由后台进行精度计算直接返回；
    }
  },
  //挂载完成-生命周期-常用于加载默认初始数据
  mounted:function(){
    //this.cartView(); //使用this调用，this在这里不能用vm替换；
    // 代码保证 this.$el 在 document 中 必须使用$nextTick函数
    // this.$nextTick(function () {
    //   this.cartView();
    // })
  },
  //events
  methods:{
    /*
    *商品数量增减事件
    * @product:某项商品
    * @way:增减判断(-1为减，1为加)
    */
    changeQuentity:function(product,way){
      if(way>0){
        product.productQuentity++;
      }else{
        product.productQuentity--;
        //商品数量最少为1；
        if(product.productQuentity<1){
          product.productQuentity=1;
        }
      }
      this.calcTotalPrice();
    },
    /*
    * checkbox点击事件 判断商品是否被选中
    * @product:某项商品
    * 说明：某属性不存在，但业务需要，如何向取得的list对象中添加属性并监听
    */
    selecedProduct:function(product){
      //判断product是否存在checked属性
      if(typeof product.checked == 'undefined'){
        //Vue.set(product,"checked",true); //全局添加属性
        //局部添加属性
        this.$set(product,"checked",true);
      }else{
        //属性已经添加过／存在
        product.checked = !product.checked;
      }
      this.calcTotalPrice();
    },
    //全选
    checkAll:function(){
      var _this = this;
      this.checkAllFlag = !this.checkAllFlag;
      this.productList.forEach(function(product,index){
          //属性未添加 的 情况
          if(typeof product.checked == 'undefined'){
            _this.$set(product,"checked",_this.checkAllFlag)
          }else{
            product.checked = _this.checkAllFlag;
          }
      })
      this.calcTotalPrice();
    },
    //计算总金额和总件数
    calcTotalPrice:function(){
      var _this=this;
      this.totalQuentity=0;
      this.totalMoney=0; //在每次全部遍历之前，总金额必须清0
      this.productList.forEach(function(product,index){
        if(product.checked){
          _this.totalMoney += product.productPrice*product.productQuentity;
          _this.totalQuentity += parseFloat(product.productQuentity);
        }
      })
    },
    //删除单个商品
    delProduct:function(item){
      this.productList.splice(this.productList.indexOf(item),1);
    },
    //删除多选
    delAllChecked:function(){
      this.productList=filters.checkedPro(this.productList);
    },
    //清空购物车
    delAll:function(){
      this.productList=[];
    }
  }
});

// 定义过滤器
var filters ={
  // 已选择的商品项
  checkedPro:function(lists){
    return lists.filter(function(list){
      return !list.checked;
    })
  }
}

