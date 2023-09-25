import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';

import router from './router'
import store from './store'
import './api/mock'
import Cookie from "js-cookie"



Vue.use(ElementUI);

//  添加全局前置导航守卫
router.beforeEach((to, from, next) => {
    const token = Cookie. get('token')
    // token不存在，说明当前用户是未登录，跳转登录页面
    if(!token&&to.name!=='login') {
        next({name:'login'})
    }
    // token 存在，说明用户已经登录，跳转至首页
    else if (token && to.name==='login') {
        next({name:'home'})
    }else {
        // 其他页面正常跳转
        next()
    }
})

new Vue({
	
   router,
   store,
  el: '#app',
  render: h => h(App)
});