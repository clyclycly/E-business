<template>
    <div class="goods-child">
        <!-- header -->
        <Head :title="'商品详情'"></Head>
        <!-- slider -->
        <slider v-if="`goodsId` in msg">
            <li class="li">
                <img :src="msg.banner[msg.banner.length-1]" width="100%">
            </li>
            <li class="li" v-for="(item,index) in msg.banner" :key="index">
                <img :src="item" width="100%">
            </li>
            <li class="li">
                <img :src="msg.banner[0]" width="100%">
            </li>
        </slider>
        <!-- notice -->
        <div class="notice --mb10" v-if="`goodsId` in msg">
            <div class="key" v-text="msg.key"></div>
            <div class="price" v-html="'￥' + msg.price"></div>
        </div>
        <!-- photo -->
        <div class="photo" v-if="`goodsId` in msg">
            <img class="list" :src="list" v-for="list in msg.photo" alt="">
        </div>
        <BarShopping @emitBuy="emitBuy"></BarShopping>
        <PromptGoods
                v-if="msg.goodsNumber" ref="PROMPTGOODS"
                :propMsg="msg.goodsNumber"
                :propImg="msg.banner[0]"
                @emitNone="emitNone"
                @emitLoadingA="emitLoadingA"
                @emitLoadingB="emitLoadingB"
                @emitNotLogin="emitNotLogin"
                @emitNull="emitNull"
                @emitError="emitError"
                @emitPromptTextA="emitPromptTextA"
        >
        </PromptGoods>
    </div>
</template>

<script type="text/ecmascript-6">
    import Head from '@/vue/base/head/head.vue'
    import Slider from '@/vue/base/Slider/slider.vue'
    import BarShopping from '@/vue/base/bar/bar-shopping'
    import PromptGoods from '@/vue/base/prompt/prompt-goods'
    import {goods} from '@/api/goods'

    export default {
        data() {
            return {
                goodsId: '',
                msg: {
                    /*goodsId: 1,
                    price: 59,
                    key: '初秋天半高领七分袖打底衫女士秋装2018新款秋季中袖女装上衣t恤',
                    banner: [
                        common.img,
                        common.img,
                        common.img
                    ],
                    photo: [
                        common.img,
                        common.img,
                        common.img
                    ]*/
                }
            }
        },
        methods: {
            /* state */
            emitNone() {
                this.$emit('emitNone')
            },
            emitLoadingA() {
                this.$emit('emitLoadingA')
            },
            emitLoadingB() {
                this.$emit('emitLoadingB')
            },
            emitNotLogin() {
                this.$emit('emitNotLogin')
            },
            emitNull() {
                this.$emit('emitNull')
            },
            emitError() {
                this.$emit('emitError')
            },
            /* prompt text a */
            emitPromptTextA(array) {
                this.$emit('emitPromptTextA', array)
            },
            /* buy */
            emitBuy() {
                this.$refs.PROMPTGOODS.show()
            }
        },
        created() {
            this.goodsId = location.href.split('/')[location.href.split('/').length - 1]
            /* 防止url注入 */
            if (this.goodsId.length > 10) {
                this.$emit('emitPromptTextA', ['url被注入，3秒钟后跳转首页'])
                setTimeout(() => {
                    this.$router.push({path: '/home'})
                }, 3000)
                return
            }
            /* 请求接口 */
            this.$emit('emitLoadingA')
            goods(this.goodsId).then((res) => {
                if (res.code === common.code.errOk) {
                    this.msg = res.content
                    this.msg.key = res.content._key
                    this.$emit('emitNone')
                }
                else if (res.code === common.code.nonentity) {
                    this.$emit('emitNull')
                }
                else {
                    this.$emit('emitPromptTextA', ['错误提示：' + res.code])
                    this.$emit('emitError')
                }
            })
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
            BarShopping,
            PromptGoods
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import '~@/stylus/var'

    /* notice */
    .notice
        background-color white
        .key
            padding 10px
            font-size 14px
            line-height 20px
            color $cText1
        .price
            padding 10px
            font-size 20px
            font-weight bold
            color $cMain1

    /* photo */
    .photo
        font-size 0
        border-top 10px solid $cBackground
        .list
            width 100%
</style>

