# 使用vue-cli 构建vue项目

## Build Setup

``` bash
#### install dependencies 安装依赖包
`npm install`

#### serve with hot reload at localhost:8080 启动服务(默认端口8080)
`npm run dev`

#### build for production with minification 最小化立项
`npm run build`

#### build for production and view the bundle analyzer report
`npm run build --report`
```
## 项目结构分析
```
.
|-- build                            // 项目构建(webpack)相关代码
|   |-- build.js                       // 生产环境构建代码
|   |-- check-version.js               // 检查node、npm等版本
|   |-- dev-client.js                  // 热重载相关
|   |-- dev-server.js                  // 构建本地服务器
|   |-- utils.js                       // 构建工具相关
|   |-- webpack.base.conf.js           // webpack基础配置
|   |-- webpack.dev.conf.js            // webpack开发环境配置
|   |-- webpack.prod.conf.js           // webpack生产环境配置
|-- config                           // 项目开发环境配置
|   |-- dev.env.js                     // 开发环境变量
|   |-- index.js                       // 项目一些配置变量
|   |-- prod.env.js                    // 生产环境变量
|   |-- test.env.js                    // 测试环境变量
|-- src                              // 源码目录
|   |-- assets                         // vuex的状态管理
|   |-- components                     // vue公共组件
|   |-- router                         // 页面的路由管理
|   |-- App.vue                        // 页面入口文件
|   |-- main.js                        // 程序入口文件，加载各种公共组件
|-- static                           // 静态文件，比如一些图片，json数据等
|   |-- data                           // 群聊分析得到的数据用于数据可视化
|-- .babelrc                         // ES6语法编译配置
|-- .editorconfig                    // 定义代码格式
|-- .gitignore                       // git上传需要忽略的文件格式
|-- README.md                        // 项目说明
|-- favicon.ico 
|-- index.html                       // 入口页面
|-- package.json                     // 项目基本信息
.
```
### 默认构建文件分析
#### build 项目构建
1.）在 check-versions.js中主要限定了构建代码时所需的node、npm版本需求,从package.json中获取数据  
2.）在 dev-server.js中主要构建本地服务的代码如下：   
```javascript
var port = process.env.PORT || config.dev.port
var app = express()
var uri = 'http://localhost:' + port
var server = app.listen(port)
var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})
module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
```
#### config 开发环境配置
在index.js中主要包含了以下配置：    
1.)构建项目(build)时的默认配置，如：是否打包压缩(productionGzip),入口文件路径(index)  
2.)开发过程(dev)中的默认配置，如：服务端口(port),服务启动成功时是否自动打开浏览器(autoOpenBrowser)  

## 知识点解疑
- 1、 在node中 module.exports与exports 区别  
 > 1.)module.exports 初始值为一个空对象{}  
 > 2.)exports 是指向 module.exports 的引用  
 > 3.)require() 返回的事module.exports 而不是exports  

 使用module.exports导出一个对象，外面对象调用该对象也能够调用它除了propotype定义的私有方法以外 的所有方法。

- 2、 本地json数据文件，可以通过require()直接引入并调用  