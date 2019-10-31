<template>
    <div>{{ fooCount }}</div>
</template>

<script>
    // 在这里导入模块，而不是在 `store/index.js` 中
    import fooStoreModule from '../../../../../webpack-app/src/store/modules/foo'

    export default {
        asyncData ({ store }) {
            store.registerModule('foo', fooStoreModule)
            return store.dispatch('foo/inc')
        },

        // 重要信息：当多次访问路由时，
        // 避免在客户端重复注册模块。
        destroyed () {
            this.$store.unregisterModule('foo')
        },

        computed: {
            fooCount () {
                return this.$store.state.foo.count
            }
        }
    }
</script>
<!--<template>
    <div>
        &lt;!&ndash; header &ndash;&gt;
        <Header :text="'首页'"></Header>
        <div>{{ item.title }}</div>
        &lt;!&ndash; banner &ndash;&gt;
        <Slider v-if="banner.length > 0">
            <li class="li">
                <img :src="banner[banner.length-1].src" width="100%">
            </li>
            <li class="li" v-for="(item,index) in banner" :key="index">
                <img :src="item.src" width="100%">
            </li>
            <li class="li">
                <img :src="banner[0].src" width="100%">
            </li>
        </Slider>
        &lt;!&ndash; recommend &ndash;&gt;
        &lt;!&ndash;  <div v-if="recommend.length > 0" v-for="(item,index) in recommend" class="recommend-lint">
              <component :is="item.style" :msg="recommend[index]"></component>
          </div>&ndash;&gt;
        &lt;!&ndash; footer &ndash;&gt;
        <Footer></Footer>
    </div>
</template>

<script type="text/ecmascript-6">
    import Header from '@/base/header/header'
    import Slider from '@/base/slider/slider'
    import Recommend1 from '@/project/home-recommend/home-recommend-1' // 推荐内容组件1
    import Recommend2 from '@/project/home-recommend/home-recommend-2' // 推荐内容组件2
    import Footer from '@/base/footer/footer'
    import {homeBanner, homeRecommend} from '@/api/home'
    import {code} from '@/js/code'

    export default {
        /* ps：写在组件里不会触发，一会看看可不可以写在入口文件里 */
       /* beforeRouteEnter(to, from, next) {
            next(vm => {
                console.log('进入时触发')
                if (typeof document === 'object') {
                    document.body.scrollTop = vm.scrollTop
                    document.documentElement.scrollTop = vm.scrollTop
                }
            });
        },
        beforeRouteUpdate(to, from, next) {
            console.log('动态路由触发')
            next();
        },
        beforeRouteLeave(to, from, next) {
            /!* 这个不会在服务端记录 *!/
            console.log('离开时触发')
            if (typeof document === 'object') {
                this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
            }
            next();
        },*/
        asyncData({store, route}) {
            // 触发 action 后，会返回 Promise
            return store.dispatch('fetchItem', route.params.id)
        },
        data() {
            return {
                banner: [],
                recommend: [
                    {
                        title: '推荐',
                        style: 'Recommend1',
                        list: [
                            {
                                goodsId: 1,
                                img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1558612339250&di=7b2541135634c5cf366f9fbf656f0934&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F952203144186122ccdd97be5ec17c003e3bc8d0f11ee5-EDM2Yu_fw658',
                                price: '100'
                            },
                            {
                                id: 2001,
                                img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1558612339250&di=7b2541135634c5cf366f9fbf656f0934&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F952203144186122ccdd97be5ec17c003e3bc8d0f11ee5-EDM2Yu_fw658',
                                price: '100'
                            },
                            {
                                id: 2001,
                                img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1558612339250&di=7b2541135634c5cf366f9fbf656f0934&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F952203144186122ccdd97be5ec17c003e3bc8d0f11ee5-EDM2Yu_fw658',
                                price: '100'
                            },
                            {
                                id: 2001,
                                img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1558612339250&di=7b2541135634c5cf366f9fbf656f0934&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F952203144186122ccdd97be5ec17c003e3bc8d0f11ee5-EDM2Yu_fw658',
                                price: '100'
                            }
                        ]
                    },
                    {
                        title: '热销',
                        style: 'Recommend2',
                        list: [
                            {
                                id: 2001,
                                img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1558612339250&di=7b2541135634c5cf366f9fbf656f0934&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F952203144186122ccdd97be5ec17c003e3bc8d0f11ee5-EDM2Yu_fw658',
                                price: 'AIGBURTH 套头衫'
                            },
                            {
                                id: 2001,
                                img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1558612339250&di=7b2541135634c5cf366f9fbf656f0934&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F952203144186122ccdd97be5ec17c003e3bc8d0f11ee5-EDM2Yu_fw658',
                                price: 'AIGBURTH 套头衫'
                            },
                            {
                                id: 2001,
                                img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1558612339250&di=7b2541135634c5cf366f9fbf656f0934&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F952203144186122ccdd97be5ec17c003e3bc8d0f11ee5-EDM2Yu_fw658',
                                price: 'AIGBURTH 套头衫'
                            }
                        ]
                    }
                ]
            }
        },
        methods: {
            item () {
                return this.$store.state.items[this.$route.params.id]
            },
            mapBanner() {
                homeBanner().then(res => {
                    console.log(res.code)
                    if (res.code === code.errOk) {
                        this.banner = res.content
                        // this.$refs.STATE.stateController('none')
                    }
                    else if (res.code === code.nonentity) {
                        // this.$refs.STATE.stateController('null')
                    }
                    else {
                        this.$refs.TRXTPROMPT.textPromptController('错误提示：' + res.code)
                        // this.$refs.STATE.stateController('error')
                    }
                })
            }
        },
        created() {
            this.mapBanner()
        },
        components: {
            Header,
            Slider,
            Recommend1,
            Recommend2,
            Footer
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>-->

<!--
banner msg demo -----------------------------------------------------------------------
content: [
{
src: "http://127.0.0.1:3000/images/homeBanner/1.png",
skipUrl: "10001"
},
{
src: "http://127.0.0.1:3000/images/homeBanner/2.png",
skipUrl: "10002"
}
]

-->