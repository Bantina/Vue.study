<template>
  <div class="todoList">
    <h1>{{ msg }}</h1>
    <p class="errorMsg">{{errorMsg}}</p>
    <input type="text" v-model="newItem" v-on:keyup.enter="addItem"/>
    <button v-on:click="addItem" class="func"> Add </button>
    <div class="undoBlock"  v-show="!(doLists=='')">
      <div class="undoTitle">待办事项</div>
      <ul class="undo">
          <li v-for="(item, index) in doLists">
            <!-- <label><input name="" type="checkbox" value="" v-on:click="undoCountF(item)"/> {{item.name}} </label>  -->
            <div class="checkbox" v-bind:class="item.checked ? beChecked : ''" v-on:click="undoCountF(item)"></div><span class="checkbox_text">{{item.name}}</span>
            <button v-on:click="delUndo(index)" class="func_del"> Delete </button>
          </li>
      </ul>
      <div class="undoFooter">
        <span class="undoCount"> <span class="tomato">{{undoCount}}</span> item(s) selected</span>
        <button v-on:click="toDone" class="func"> 标记为 已完成 </button>
        <button v-on:click="delAll(true)" class="func"> 删除 所有 待办项</button>

      </div>
    </div>
    <div class="undoBlock"  v-show="doLists==''">
      <div class="undoTitle">待办事项</div>
      <div>无</div>
    </div>
    <div class="doneBlock"  v-show="!(doneLists=='')">
      <div class="doneTitle">已完成事项</div>
      <ul class="doneList">
          <li v-for="(item, index) in doneLists">
            <!-- <label><input name="" type="checkbox" value="" v-on:click="doneCountF(item)"/> {{item.name}} </label>  -->
            <div class="checkbox" v-bind:class="item.checked ? beChecked : ''" v-on:click="doneCountF(item)"></div><span class="checkbox_text">{{item.name}}</span>
            <button v-on:click="delDone(index)" class="func_del"> Delete </button>
          </li>
      </ul>
      <div class="doneFooter">
        <span class="doneCount"><span class="tomato">{{doneCount}}</span> item(s) selected</span>
        <button v-on:click="toUndo" class="func"> 标记为 待办 </button>
        <button v-on:click="delAll(false)" class="func"> 删除 所有 已完成项</button>
      </div>
    </div>
    <div class="doneBlock"  v-show="doneLists==''">
      <div class="doneTitle">已完成事项</div>
      <div>无</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'todoList',
  data() {
    return {
      msg: 'This is a todoList with VUE',
      beChecked: 'beChecked',
      errorMsg: '',       //input 输入值验证提示；
      newItem: '',        //input model 值
      doLists: [],        //存储 待办list
      doneLists: [],      //存储 已完成list
      moveLists: [],      //待办时 选中的list
      moveDoneLists: [],  //已完成 选中的list
      undoCount: 0,       //待办时 选中的item数
      doneCount: 0        //已完成 选中的item数
    }
  },
  methods: {
    //Add
    addItem() {
      var self = this;
      if(self.newItem==''){
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
      var self = this;
      if (item.checked) {
        item.checked = false;
        self.undoCount--;
        self.moveLists.splice(self.moveLists.indexOf(item),1);
      } else {
        item.checked = true;
        self.undoCount++;
        self.moveLists.push(item);
      }
      console.log(self.moveLists)
    },
    doneCountF(item) {
      var self = this;
      if (item.checked) {
        item.checked = false;
        self.doneCount--;
        self.moveDoneLists.splice(self.moveDoneLists.indexOf(item),1);
      } else {
        item.checked = true;
        self.doneCount++;
        self.moveDoneLists.push(item);
      }
      console.log(self.moveDoneLists)
    },
    //标记为 已完成；
    toDone() {
      var self = this;
      var index = -1;
      for (var i = 0; i < self.moveLists.length; i++) {
        //从doLists删除
        index = self.doLists.indexOf(self.moveLists[i]); //获取被移动项的index
        if (index != -1) {
          self.doLists.splice(index, 1);
          self.undoCount--; //修改 count
        }
        //添加到doneLists
        self.moveLists[i].checked = false; //注意修改该项的 选中状态
        self.doneLists.push(self.moveLists[i]);
      }
      //clear moveLists
      self.moveLists = [];
      console.log(self.doLists)
      console.log(self.doneLists);
    },
    //标记为 待办；
    toUndo() {
      var self = this;
      var index = -1;
      for (var i = 0; i < self.moveDoneLists.length; i++) {
        //从doneLists删除
        index = self.doneLists.indexOf(self.moveDoneLists[i]); //获取被移动项的index
        if (index != -1) {
          self.doneLists.splice(index, 1);
          self.doneCount--; //修改 count
        }
        //添加到doLists
        self.moveDoneLists[i].checked = false; //注意修改该项的 选中状态
        self.doLists.push(self.moveDoneLists[i]);
      }
      //clear moveDoneLists
      self.moveDoneLists = [];
      console.log(self.doLists)
      console.log(self.doneLists);
    },
    //删除 待办事项
    delUndo(index){
      var self = this;
      var item = self.doLists.splice(index, 1);
      if(item[0].checked == true){
        item[0].checked = false;
        self.undoCount--;
      }
      self.moveLists.splice(self.moveLists.indexOf(item[0]),1);
    },
    //删除 已完成事项
    delDone(index){
      var self = this;
      var item = self.doneLists.splice(index, 1);
      if(item[0].checked == true){
        item[0].checked = false;
        self.doneCount--;
      }
      self.moveDoneLists.splice(self.moveDoneLists.indexOf(item[0]),1);
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
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
a {
  color: #42b983;
}
input{
  font-size: 18px;
}
ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: block;
  margin: 0 40%;
  text-align: left;
}
li>label{
  display: inline-block;
  min-width:100px;
  height: 40px;
  line-height: 40px;
}
.checkbox_text{
  display: inline-block;
  min-width:100px;
}
.tomato{
  color: tomato;
}
.func,.func_del{
  font-size: 14px;
  border-radius: 14px;
  background: none;
  cursor: pointer;
}
.func_del{
  border-radius: 4px;
  font-size: 12px;
  border:solid 2px #34495F;
}
.func:hover,.func_del:hover{
  color:#fff;
  background-color: #41b883;
  border-color: #41b883;
}
.todoList{
  font-size: 18px;
}
.errorMsg{
  color: tomato;
}
.undoTitle,.doneTitle{
  border-top: solid 1px #eee;
  padding-top:15px;
  margin: 15px 0 0 -300px;
}
.undoTitle{
  margin: 15px 0 0 -320px;
}
.undoFooter,.doneFooter{
  /*margin-left: 0px;*/
}
/*checkbox*/
.checkbox{
  display: inline-block;
  width:16px;
  height:16px;
  border-radius: 4px;
  border:solid 1px #eee;
  margin: 0 10px 0 0;
  position: relative;
  z-index: 0;
}
.beChecked:after{
  content: "";
  width:20px;
  height: 11px;
  border-left:solid 2px #41b883;
  border-bottom: solid 2px #41b883;
  position: absolute;
  top:-5px;
  left: 2px;
  z-index: 999;
  transform:rotate(-52deg);
}
</style>
