# 学习内容

### Vue的仿饿了么商城的实践

#### 今日实践内容：
> 将静态SVG图片制作为图标字体，添加到src/common/stylus文件夹下以及字体文件src/common/fonts的添加；
>
> 在static/css/中添加全局reset.css样式文件，并在index.html中引入；
>
> 定义项目中使用到的主components,包含(goods/ratings/seller/header);
>
> 菜单栏路由的定义与转换；
>
> 使用stylus对css样式的编写；
>
> 数据请求-路由 在deb-server.js中require数据并定义,数据在项目底层的data.json中
>

#### 遇到的问题及解决方案：
1.error: [Vue warn]: Do not use built-in or reserved HTML elements as component id: header<br>
自定义的组件名称与html原生名称一致，冲突报错。<br>

2.error: Component template requires a root element, rather than just text.<br>
每一个组件都必须有明确的根html元素，不能为文本<br>
eg: ```<template>hello(错误示例)</template>```<br>

3.error:[Vue warn]: Failed to resolve directive: link<br>
在2.0中废弃v-link，使用```<router-link to="/goods">商品</router-link>```<br>

4.在使用vue-router时，url地址链接发生跳转，但router-view没有渲染html<br>
在使用vue-router时，应注意：const router = new VueRouter({.....routes对象数组})，vueRouter的参数是对象。
需重新编译。



### 知识点汇集
* [设备像素比devicePixelRatio](http://www.zhangxinxu.com/wordpress/2012/08/window-devicepixelratio/)
* [图标字体的制作](https://icomoon.io/)
* [css默认样式-cssreset](http://meyerweb.com/eric/tools/css/reset/)
* 手机端与PC端物理像素和设备像素的测试差别，可以先生成二维码，再用真机测试。<br>
	mac终端-->ifconfig-->en0: inet 172.88.0.108 netmask...-->替换本地浏览器localhost-->[草料二维码生成器](http://cli.im)-->生成二维码手机端访问(同一个局域网内)
