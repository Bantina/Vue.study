### VUE
##### deactivated、beforeDestroy 生命周期
- 消除定时器；
- 释放资源;

##### v-html
- 对数据进行html解析并编译为标签内容；
- 对用户的提交上不能使用，防止XSS攻击；

##### router-link 
- tag: 解析后的标签类型，默认为a标签；
- to: 跳转路由；
- 不支持targer="_blank"属性；
- 正在展示的类样式 &.router-link-active
```
<router-link tag="div" class="tab-item" to="/rank">
  <span class="tab-link">排行
  </span>
</router-link>
```

### vue-cli
##### 设置全局引用路径别名：webpack.base.conf.js
```
function resolve (dir) {
  return path.join(__dirname, '..', dir) // 当前目录的上层；
}

module.exports = {
	resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {  // 别名
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'src': resolve('src'),
      'common': resolve('src/common'),
      'components': resolve('src/components')
    }
  }
}

```
