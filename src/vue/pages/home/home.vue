<template>
    <div>
        <!-- header -->
        <Head :title="'首页'"></Head>
        <!-- slider -->
        <Slider v-if="banner.length>0">
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
        <!-- recommend -->
        <div v-if="recommend.length > 0" v-for="(item,index) in recommend">
            <component :is="item.style" :msg="recommend[index]"></component>
        </div>
        <!-- foot -->
        <Foot></Foot>
    </div>
</template>

<script type="text/ecmascript-6">
    import Head from '@/vue/base/head/head.vue'
    import Slider from '@/vue/base/Slider/slider.vue'
    import RecommendA from './recommend-a'
    import RecommendB from './recommend-b'
    import Foot from '@/vue/base/foot/foot.vue'
    import {homeBanner, homeRecommend} from '@/api/home'

    export default {
        data() {
            return {
                /* Slider */
                banner: [
                    /* {
                         src: common.img,
                         contentId: "10001"
                     },
                     {
                         src: common.img,
                         contentId: "10001"
                     },
                     {
                         src: common.img,
                         contentId: "10001"
                     },
                     {
                         src: common.img,
                         contentId: "10002"
                     }*/
                ],
                /* 推荐 */
                recommend: [
                    /*{
                        title: '推荐',
                        style: 'RecommendA',
                        list: [
                            {
                                goodsId: 1,
                                img: common.img,
                                price: '100'
                            },
                            {
                                id: 2001,
                                img: common.img,
                                price: '100'
                            },
                            {
                                id: 2001,
                                img: common.img,
                                price: '100'
                            },
                            {
                                id: 2001,
                                img: common.img,
                                price: '100'
                            }
                        ]
                    },
                    {
                        title: '热销',
                        style: 'RecommendB',
                        list: [
                            {
                                id: 2001,
                                img: common.img,
                                price: 'AIGBURTH 套头衫'
                            },
                            {
                                id: 2001,
                                img: common.img,
                                price: 'AIGBURTH 套头衫'
                            },
                            {
                                id: 2001,
                                img: common.img,
                                price: 'AIGBURTH 套头衫'
                            }
                        ]
                    }*/
                ]
            }
        },
        methods: {
            mapBanner() {
                homeBanner().then(res => {
                    if (res.code === common.code.errOk) {
                        this.$emit('emitNone')
                        this.banner = res.content
                    }
                    else {
                        this.$emit('emitPromptTextA', ['错误提示：' + res.code])
                        this.$emit('emitNone')
                    }
                })
            },
            mapRecommend() {
                homeRecommend().then(res => {
                    if (res.code === common.code.errOk) {
                        this.recommend = res.content.map((value) => {
                            if (value.style === "A") {
                                value.style = 'RecommendA'
                            }
                            else if (value.style === "B") {
                                value.style = 'RecommendB'
                            }
                            return value
                        })
                        this.$emit('emitNone')
                    }
                    else {
                        this.$emit('emitPromptTextA', ['错误提示：' + res.code])
                        this.$emit('emitNone')
                    }
                })
            }
        },
        created() {
            this.$emit('emitLoadingA')
            this.mapBanner()
            this.mapRecommend()
        },
        beforeRouteEnter(to, from, next) {  // vue-ssr服务端
            next(vm => {
                scrollTo(0, vm.y)
            });
        },
        beforeRouteLeave(to, from, next) {
            this.y = document.documentElement.scrollTop || document.body.scrollTop
            next();
        },
        components: {
            Head,
            Slider,
            RecommendA,
            RecommendB,
            Foot
        }
    };
</script>