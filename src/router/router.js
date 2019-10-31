// Vue.use(VueRouter)。全局引入已经执行过这一步了。

export default new VueRouter({
    mode: "history", // ie 10  history
    base: "/",
    routes: [
        {
            path: '/',
            redirect: '/home'  // Redirect to the home page
        },
        {
            path: '/home',
            meta: {
                login: false, // NoFollow "login"
                keepAlive: true // NoFollow Cache pages
            },
            /*
                If you don't need the "Lazy Loading", then you can using "import home from "pages/home/home"
                If compilation fails, then check your ".babelrc" files
            */
            //  Or you can: component: (resolve) => require(['@/vue/pages/home/home'], resolve),
            component: (resolve) => {
                import('@/vue/pages/home/home').then((module) => {
                    resolve(module)
                })
            }
        },
        {
            path: '/goods',
            meta: {
                login: true,
                keepAlive: true
            },
            component: (resolve) => {
                import('@/vue/pages/goods/goods').then((module) => {
                    resolve(module)
                })
            },
            children: [
                {
                    path: ':id',
                    component: (resolve) => {
                        import('@/vue/pages/goods/goods-child').then((module) => {
                            resolve(module)
                        })
                    }
                }
            ]
        },
        {
            path: '/login-password',
            meta: {
                login: false,
                keepAlive: false
            },
            component: (resolve) => {
                import('@/vue/pages/login/login-password').then((module) => {
                    resolve(module)
                })
            }
        },
        {
            path: '/login-note',
            meta: {
                login: false,
                keepAlive: false
            },
            component: (resolve) => {
                import('@/vue/pages/login/login-note').then((module) => {
                    resolve(module)
                })
            }
        },
        {
            path: '/new',
            meta: {
                login: false,
                keepAlive: false
            },
            component: (resolve) => {
                import('@/vue/pages/login/new').then((module) => {
                    resolve(module)
                })
            }
        },
        {
            path: '/my',
            meta: {
                login: false,
                keepAlive: false
            },
            component: (resolve) => {
                import('@/vue/pages/my/my').then((module) => {
                    resolve(module)
                })
            },
        },
        {
            path: '/my-account',
            meta: {
                login: true,
                keepAlive: false
            },
            component: (resolve) => {
                import('@/vue/pages/my/my-account').then((module) => {
                    resolve(module)
                })
            },
        },
        {
            path: '/order',
            meta: {
                login: true,
                keepAlive: true
            },
            component: (resolve) => {
                import('@/vue/pages/order/order').then((module) => {
                    resolve(module)
                })
            },
        },
        {
            path: '/order-detail',
            component: (resolve) => {
                import('@/vue/pages/order/order-detail').then((module) => {
                    resolve(module)
                })
            },
            children: [
                {
                    path: ':id',
                    meta: {
                        login: true,
                        keepAlive: true
                    },
                    component: (resolve) => {
                        import('@/vue/pages/order/order-detail-child').then((module) => {
                            resolve(module)
                        })
                    }
                }
            ]
        },
        {
            path: '/order-refund',
            component: (resolve) => {
                import('@/vue/pages/order/order-refund').then((module) => {
                    resolve(module)
                })
            },
            children: [
                {
                    path: ':id',
                    meta: {
                        login: true,
                        keepAlive: true
                    },
                    component: (resolve) => {
                        import('@/vue/pages/order/order-refund-child').then((module) => {
                            resolve(module)
                        })
                    }
                }
            ]
        },
        {
            path: '/setting',
            meta: {
                login: true,
                keepAlive: true
            },
            component: (resolve) => {
                import('@/vue/pages/setting/setting').then((module) => {
                    resolve(module)
                })
            }
        },
        {
            path: '/site',
            meta: {
                login: true,
                keepAlive: true
            },
            component: (resolve) => {
                import('@/vue/pages/site/site').then((module) => {
                    resolve(module)
                })
            }
        },
        {
            path: '/site-add',
            meta: {
                login: true,
                keepAlive: true
            },
            component: (resolve) => {
                import('@/vue/pages/site/site-add').then((module) => {
                    resolve(module)
                })
            }
        }
    ]
})