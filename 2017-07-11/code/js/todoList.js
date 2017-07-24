//使用localStorage存储数据
var dolist_KEY = 'todoList';
var donelist_KEY = 'doneList';
var Store={
	//读取localStorage
	fetch:function(STORAGE_KEY){
		return JSON.parse(window.localStorage.getItem(STORAGE_KEY)||'[]')
	},
	//写入localStorage
	save:function(STORAGE_KEY,items){
		window.localStorage.setItem(STORAGE_KEY,JSON.stringify(items))
	}
}
var app=new Vue({
  el: '.todoList',
  data() {
    return {
      msg: 'This is a todoList with VUE',
      errorMsg: '',       //input 输入值验证提示；
      newItem: '',        //input model 值
      doLists: Store.fetch(dolist_KEY),          //存储 待办list
      doneLists: Store.fetch(donelist_KEY),      //存储 已完成list
    }
  },
  //异步监听方法-观察：
  watch: {
  	//对dolists的值的改变进行观察
  	doLists:{
  		handler:function(doLists){
  			Store.save(dolist_KEY,doLists)
  		},
  		deep:true //对象 深入复制检查
  	},
  	doneLists:{
  		handler:function(doneLists){
  			Store.save(donelist_KEY,doneLists)
  			console.log(doneLists);
  		},
  		deep:true //对象 深入复制检查
  	}
  },
  methods: {
    //Add
    addItem() {
      var self = this;
      if(!self.newItem){
        self.errorMsg = 'The input value can not be null';
        return;
      }
      self.errorMsg = '';
      self.doLists.unshift({
        name: self.newItem,
        checked: false
      });
      self.newItem = ''; //clear input
    },
    //待办事项 seleced
    undoCountF(item) {
      var index = this.doLists.indexOf(item);
      this.doLists.splice(index, 1);
      this.doneLists.push(item);
      //修改 状态
      item.checked = true;
    },
    doneCountF(item) {
      var self = this;
      var index = self.doneLists.indexOf(item);
      this.doLists.push(item);
      this.doneLists.splice(index, 1);
      //修改 状态
      item.checked = false;
    },

    //删除 待办事项
    delUndo(index){
      this.doLists.splice(index, 1);
    },
    //删除 已完成事项
    delDone(index){
      this.doneLists.splice(index, 1);
    },
    //删除所有
    delAll(bool) {
      var self = this;
      if (bool) {
        self.doLists = [];
        self.undoCount = 0;
      } else {
        self.doneLists = [];
        self.doneCount = 0;
      }
    }
  }
})