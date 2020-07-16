import Vue from "vue";
import App from "./App";
import router from "./router";
import Vuex from "vuex";
import store from "@/store";
import axios from "axios";
import "iview/dist/styles/iview.css";


import {
  Message,
  Modal,
  Button,
  TimePicker, Upload
} from "iview";
import infiniteScroll from "vue-infinite-scroll";
import "babel-polyfill";
import {
  JSEncrypt
} from 'jsencrypt'; //登录加密
// Vue.prototype.$commonfun = commonfun;
import layer from 'vue-layer'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import { hasPermission } from "./util/permission.js";
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

import VueVideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
Vue.use(VueVideoPlayer)

//富文本
import { quillEditor } from 'vue-quill-editor' // 调用富文本编辑器
import 'quill/dist/quill.core.css'// 富文本编辑器外部引用样式 
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import * as Quill from 'quill'; // 富文本基于quill

Vue.use(quillEditor);
Vue.prototype.$layer = layer(Vue);

import JsonViewer from 'vue-json-viewer'

Vue.use(JsonViewer)

// 图片预览
import preview from "vue-photo-preview";
import "vue-photo-preview/dist/skin.css";
Vue.use(preview);

// 图片全屏预览
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
Vue.use(Viewer, {
  // defaultOptions: {
  //   zIndex: 9999
  // }
})



Vue.use(infiniteScroll);
Vue.use(ElementUI);

Vue.config.productionTip = false;

Vue.component("Modal", Modal);
Vue.component("Button", Button);
Vue.component("TimePicker", TimePicker);
Vue.component("Upload", Upload);


Vue.prototype.$Message = Message;
Vue.prototype.$Modal = Modal
Vue.prototype.$Local = window.localStorage;
Vue.prototype.hasPerm = hasPermission;

Vue.prototype._imageError = function (e) {
  e.target.src = DefauleImg;
};

// axios.defaults.withCredentials = true

const Bus = new Vue(); //中央事件总线
/* eslint-disable no-new */
//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
  document.title = "胡掌柜云服务管理系统";
  const role = localStorage.getItem('username');
  // console.log(role);
  if (!role && to.path !== '/login') {
    next('/login');
  } else if (to.meta.permission) {
    console.log(11);
    // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
    role === 'admin' ? next() : next('/403');
  } else {
    // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
    if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
      Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
        confirmButtonText: '确定'
      });
    } else {
      next();
    }
  }
  // 已登录状态；当路由到login时，跳转至home
  // console.log(to);
  if (to.fullPath.indexOf('login') > -1) {
    if (role) {
      console.log('已登录');
      router.push({ path: '/dashboard' });
    }
  }
});
new Vue({
  el: "#app",
  data: {
    Bus
  },
  router,
  store,
  components: {
    App
  },
  template: "<App />"
});

// 全局设置message提示时间
Message.config({
  duration: 2.5
});
