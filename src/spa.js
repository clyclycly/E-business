/* 解决devServer需要ie10的Promise问题，window.Promise = window.Promise || Promise;，或者import 'core-js/fn/promise' */
import app from './app.vue'
import router from './router/router'
import '@/stylus/index.styl'

router.beforeEach((to, from, next) => {
    if (to.meta.login && !localStorage.userInfo) {  //item代表一个路由
        router.push({path: '/login-password'})
    }
    else {
        next()
    }
})

new Vue({
    el: '#app',
    router,
    render: h => h(app) // 挂载视图，1.0的挂载和添加组件是一个写法
})