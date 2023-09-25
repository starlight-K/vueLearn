import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../view/Home.vue'
import Main from '../view/Main.vue'
import User from '../view/User.vue'
import Mall from '../view/Mall.vue'
import PageOne from '../view/PageOne.vue'
import PageTwo from '../view/PageTwo.vue'
import Login from '../view/Login'

Vue.use(VueRouter)

// 创建路由组件步骤
// 1.创建路由组件 
// 2. 将路由与组件进行映射
// 3. 创建router实例

const routes = [
    {
        path: '/',
        component: Main,
        redirect: '/home',// 重定向跳转到首页
        children: [
            // 子路由
            {path: 'home', name: 'home', component: Home},
            {path: 'user', name: 'user', component: User},
            {path: 'mall', name: 'mall', component: Mall},
            {path: 'page1', name: 'page1', component: PageOne},
            {path: 'page2', name: 'page2', component: PageTwo}
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    }
]

// 3. 创建路由实例，然后传入routers配置中
const router = new VueRouter({
    routes
})

// 对外暴露
export default router

// 解决导航栏底部频繁点报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}