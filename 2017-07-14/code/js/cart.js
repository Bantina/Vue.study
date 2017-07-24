/**
 *shop:
 *@activity满减活动 fill:满多少金额;off减的金额
 *@freePost包邮情况 status=-1-不包邮，status=0-全场包邮，status=1满件包邮, status=2满金额包邮
 */
var product = {
  "status": 1,
  "result": {
    "list": [{
      "productId": "10001",
      "productName": "Artka连衣裙",
      "productPrice": "100",
      "productQuentity": "2",
      "productImg": "http://ww2.sinaimg.cn/mw690/005Tivpbjw1f4huqsnuevj30go0goabd.jpg",
      "shop": {
        "shopName": "商家aaaaa",
        "activity": [{
          "fill": 100,
          "off": 20
        }, {
          "fill": 200,
          "off": 50
        }, {
          "fill": 300,
          "off": 100
        }],
        "freePost": {
          "status": -1,
          "postPrice": 5
        }
      }
    }, {
      "productId": "10002",
      "productName": "新品阔腿七分裤",
      "productPrice": "200",
      "productQuentity": "2",
      "productImg": "http://ww1.sinaimg.cn/mw690/005Tivpbjw1f4huqtcllzj30go0gogmm.jpg",
      "shop": {
        "shopName": "商家bb",
        "activity": [{
          "fill": 100,
          "off": 20
        }, {
          "fill": 200,
          "off": 50
        }, {
          "fill": 300,
          "off": 100
        }],
        "freePost": {
          "status": 0
        }
      }
    }, {
      "productId": "10003",
      "productName": "Artka连衣裙2",
      "productPrice": "60",
      "productQuentity": "1",
      "productImg": "http://ww2.sinaimg.cn/mw690/005Tivpbjw1f4huqsnuevj30go0goabd.jpg",
      "shop": {
        "shopName": "商家ccc",
        "activity": [{
          "fill": 100,
          "off": 20
        }, {
          "fill": 200,
          "off": 50
        }, {
          "fill": 300,
          "off": 100
        }],
        "freePost": {
          "status": 1,
          "postPrice": 10,
          "quentity": 2
        }
      }
    }, {
      "productId": "10005",
      "productName": "Artka连衣裙fdsa",
      "productPrice": "50",
      "productQuentity": "1",
      "productImg": "http://ww1.sinaimg.cn/mw690/005Tivpbjw1f4huqtcllzj30go0gogmm.jpg",
      "shop": {
        "shopName": "商家aaaaa",
        "activity": [{
          "fill": 100,
          "off": 20
        }, {
          "fill": 200,
          "off": 50
        }, {
          "fill": 300,
          "off": 100
        }],
        "freePost": {
          "status": -1,
          "postPrice": 5
        }
      }
    }]
  },
  "message": ""
}

var vm = new Vue({
  el: "#Cart",
  data: {
    title: '我 的 购 物 车 (My Shopping Cart)',
    productList: product.result.list,
    totalMoney: 0,
    totalQuentity: 0,
    checkAllFlag: false,
    selectedShop: [],
      // {
      //   shopName: product.shop.shopName, //商铺名称
      //   totalPrice: product.productPrice * product.productQuentity, //存储同一个商铺的总金额
      //   fill: 0, //满额
      //   off: 0,  //减额
      //   isAdd: 0, //商铺是否累加
      //   postPrice: 0 //邮费
      // }
    shopArr: [],
    discountMoney: 0,
    postMoney: 10
  },
  //过滤器-局部
  filters: {
    // 金额格式的过滤器
    fomatMoney: function(value) {
      return '¥' + parseFloat(value).toFixed(2); //toFixed()会对数字的精度有丢失，一般由后台进行精度计算直接返回；
    }
  },
  //挂载完成-生命周期-常用于加载默认初始数据
  mounted: function() {
    //this.cartView(); //使用this调用，this在这里不能用vm替换；
    // 代码保证 this.$el 在 document 中 必须使用$nextTick函数
    // this.$nextTick(function () {
    //   this.cartView();
    // })
  },
  //events
  methods: {
    /*
     *商品数量增减事件
     * @product:某项商品
     * @way:增减判断(-1为减，1为加)
     */
    changeQuentity: function(product, way) {
      if (way > 0) {
        product.productQuentity++;
      } else {
        product.productQuentity--;
        //商品数量最少为1；
        if (product.productQuentity < 1) {
          product.productQuentity = 1;
        }
      }
      this.calcFullOff(product, product.checked, false);
      this.calcTotalPrice();
    },
    /*
     * checkbox点击事件 判断商品是否被选中
     * @product:某项商品
     * 说明：某属性不存在，但业务需要，如何向取得的list对象中添加属性并监听
     */
    selecedProduct: function(product) {
      //判断product是否存在checked属性
      if (typeof product.checked == 'undefined') {
        //Vue.set(product,"checked",true); //全局添加属性
        //局部添加属性
        this.$set(product, "checked", true);
      } else {
        //属性已经添加过／存在
        product.checked = !product.checked;
      }
      this.calcFullOff(product, product.checked, true);
      this.calcTotalPrice();

    },
    //全选
    checkAll: function() {
      var _this = this;
      this.checkAllFlag = !this.checkAllFlag;
      this.productList.forEach(function(product, index) {
        //属性未添加 的 情况
        if (typeof product.checked == 'undefined') {
          _this.$set(product, "checked", _this.checkAllFlag)
        } else {
          product.checked = _this.checkAllFlag;
        }
        _this.calcFullOff(product, product.checked, true);
      })
      this.calcTotalPrice();
      //this.calcFullOff(product);

    },
    //计算总金额和总件数
    calcTotalPrice: function() {
      var _this = this;
      this.totalQuentity = 0;
      this.totalMoney = 0; //在每次全部遍历之前，总金额必须清0
      this.productList.forEach(function(product, index) {
        if (product.checked) {
          _this.totalMoney += product.productPrice * product.productQuentity;
          _this.totalQuentity += parseFloat(product.productQuentity);
        }
      })
      if (this.totalQuentity > 1) {
        this.postMoney = 0;
      } else {
        this.postMoney = 10;
      }
      this.totalMoney += this.discountMoney + this.postMoney;
    },
    /*
     * 满减活动计算
     * @product:某一商品
     * @ischecked:是否选择(true:选择时，false:取消选中时)
     * @ischeckbox:是否为选择框操作(true:是，false:加减点击操作)
     */
    calcFullOff: function(product, ischecked, ischeckbox) {
      var _this = this;
      this.discountMoney = 0;
      //var isAdd=false;
      if (!product.shop.activity) // 无活动
        return;
      //var proPrice=product.productPrice*product.productQuentity; //商品现在所需费用
      var actObj = {
        shopName: product.shop.shopName, //商铺名称
        totalPrice: product.productPrice * product.productQuentity, //存储同一个商铺的总值
        fill: 0, //满额
        off: 0,  //减额
        isAdd: 0, //商铺是否累加
        postPrice: 0 //邮费
      }
      var index = this.shopArr.indexOf(product.shop.shopName);

      if (ischecked) { //被选中 
        product.shop.activity.forEach(function(item, index) {
          if (actObj.totalPrice >= item.fill) {
            actObj.fill = item.fill;
            actObj.off = item.off;
          }
        })
        if (index < 0 && actObj.fill > 0) { //商铺不存在 且 满减>0
          this.selectedShop.push(actObj);
          this.shopArr.push(product.shop.shopName);
          actObj.isAdd = 0;
        } else if (index > -1) { //商铺存在 且 满减>0
          if (ischeckbox) {
            this.selectedShop[index].isAdd++;
            _this.selectedShop[index].totalPrice += product.productPrice * product.productQuentity;
          } else {
            //增减操作 总金额 不累加
            _this.selectedShop[index].totalPrice = product.productPrice * product.productQuentity;
          }
          //同一商铺 累加 值
          product.shop.activity.forEach(function(item, index) {
            if (this.totalPrice >= item.fill) {
              this.fill = item.fill;
              this.off = item.off;
            }
          }, _this.selectedShop[index])

        }
      } else if (!ischecked && index > -1 && this.selectedShop[index].isAdd > 0) { //取消选中，但有商铺其他商品累加
        this.selectedShop[index].totalPrice -= product.productPrice * product.productQuentity;
        product.shop.activity.forEach(function(item, index) {
          if (this.totalPrice >= item.fill) {
            this.fill = item.fill;
            this.off = item.off;
          }
        }, _this.selectedShop[index])
        this.selectedShop[index].isAdd--;
      } else {
        if (index > -1 && ischeckbox) {
          this.selectedShop.splice(index, 1);
          this.shopArr.splice(index, 1);
        }
      }

      //优惠价格计算
      this.selectedShop.forEach(function(item, index) {
        this.discountMoney -= item.off;
      }, this)
    },

    //删除单个商品
    delProduct: function(item) {
      this.productList.splice(this.productList.indexOf(item), 1);
    },
    //删除多选
    delAllChecked: function() {
      this.productList = filters.checkedPro(this.productList);
    },
    //清空购物车
    delAll: function() {
      this.productList = [];
    }
  }
});

// 定义过滤器
var filters = {
  // 已选择的商品项
  checkedPro: function(lists) {
    return lists.filter(function(list) {
      return !list.checked;
    })
  }
}