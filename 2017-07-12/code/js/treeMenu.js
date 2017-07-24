// demo data
var data = {
  name: 'My Tree',
  children: [
    { name: 'hello' },
    { name: 'wat' },
    {
      name: 'child folder',
      children: [
        {
          name: 'child folder',
          children: [
            { name: 'hello' },
            { name: 'wat' }
          ]
        },
        { name: 'hello' },
        { name: 'wat' },
        {
          name: 'child folder',
          children: [
            { name: 'hello' },
            { name: 'wat' }
          ]
        }
      ]
    }
  ]
}

// 菜单项 组件
Vue.component('item', {
  // 在页面以<script type="text/x-template"></script>加载模版
  template: '#item-template',
  // 接收父组件数据
  props: {
    model: Object
  },
  data: function () {
    return {
      open: false
    }
  },
  // 计算属性
  computed: {
    // 判断是否为文件夹：有子元素，且子元素个数不为0
    isFolder: function () {
      return this.model.children &&
        this.model.children.length
    }
  },
  methods: {
    // 单击Folder时，改变打开与否的状态；
    toggle: function () {
      if (this.isFolder) {
        this.open = !this.open
      }
    },
    // 双击，当不是Folder时添加子元素变为Folder
    changeType: function () {
      if (!this.isFolder) {
        Vue.set(this.model, 'children', []) //Vue.set()设置属性，
        this.addChild()
        this.open = true
      }
    },
    // 添加新菜单项
    addChild: function () {
      this.model.children.push({
        name: 'new stuff'
      })
    }
  }
})

// boot up the demo
var demo = new Vue({
  el: '#demo',
  data: {
    treeData: data
  }
})