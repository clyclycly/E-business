<template>
    <div>
        <!-- header -->
        <Head :title="'订单'"></Head>
        <div class="router --line-bottom">
            <ul class="ul">
                <li class="li" :class="{hook:hook===1}" @click="yizhifu">已支付</li>
                <li class="li" :class="{hook:hook===2}" @click="weizhifu">未支付</li>
                <li class="li" :class="{hook:hook===3}" @click="tuikuan">退款</li>
            </ul>
        </div>
        <div class="--h50"></div>
        <div class="item" v-for="(item,index) in msg" v-if="msg.length > 0" :key="index">
            <div class="top --line-bottom">
                <router-link class="left" :to="`/goods/${item.goodsId}`" tag="div">
                    <img class="img" :src="item.img" width="100px" alt="">
                </router-link>
                <router-link class="right" :to="`/order-detail/${item.orderId}`" tag="div">
                    <div class="--no-wrap" v-text="item.name"></div>
                    <div>
                        <span v-html="'￥' + item.price"></span>
                        <span v-html="'×'+ ' ' + item.number">1</span>
                    </div>
                    <div>
                        <span v-text="item.color"></span>
                        <span v-text="item.size"></span>
                    </div>
                </router-link>
            </div>
            <!-- 已发货 -->
            <div class="bottom" v-if="item.status === 200">
                <div class="left">已完成</div>
            </div>
            <!-- 已完成 -->
            <div class="bottom" v-if="item.status === 0">
                <div class="left">已发货</div>
                <router-link class="right" :to="`/order-refund/${item.orderId}`" tag="div">申请退款</router-link>
            </div>
            <!-- 未发货 -->
            <div class="bottom" v-if="item.status === 1">
                <div class="left">未发货</div>
                <router-link class="right" :to="`/order-refund/${item.orderId}`" tag="div">申请退款</router-link>
            </div>
            <!-- 未支付 -->
            <div class="bottom" v-if="item.status === 2">
                <div class="left">未支付</div>
                <router-link class="right" :to="`/order-detail/${item.orderId}`" tag="div">去支付</router-link>
                <div class="right" @click="orderDelete(item.orderId)">取消订单</div>
            </div>
            <!-- 退款审核中 -->
            <div class="bottom" v-if="item.status === 3">
                <div class="left">审核中</div>
            </div>
            <!-- 退款成功 -->
            <div class="bottom" v-if="item.status === 4">
                <div class="left">退款成功</div>

            </div>
            <!-- 退款失败 -->
            <div class="bottom" v-if="item.status === 5">
                <div class="left">退款失败</div>
            </div>
        </div>
        <!-- foot -->
        <Foot></Foot>
        <!-- select message a -->
        <SelectMessageA ref="SELECTMESSAGEA"></SelectMessageA>
    </div>
</template>

<script type="text/ecmascript-6">
    import Head from '@/vue/base/head/head.vue'
    import Foot from '@/vue/base/foot/foot.vue'
    import SelectMessageA from '@/vue/base/select/select-message-a'
    import {orderYizhifu, orderWeizhifu, orderTuikuan, orderDelete} from '@/api/order'

    export default {
        data() {
            return {
                hook: 1,
                yizhifuPage: 0,
                weizhifuPage: 0,
                tuikuanPage: 0,
                msg: [
                    /*{
                        img: 'http://localhost:3000/images/goods/1.jpg',
                        name: '2018夏装新款V领针织衫条纹打底衫天丝宽松短袖T恤女装上衣服半袖',
                        goodsId: 1,
                        price: '53',
                        number: 1,
                        size: '170',
                        color: '黑',
                        status: 200,
                        orderId: ''
                    },
                    {
                        img: 'http://localhost:3000/images/goods/1.jpg',
                        name: '2018夏装新款V领针织衫条纹打底衫天丝宽松短袖T恤女装上衣服半袖',
                        price: '53',
                        number: 1,
                        size: '170',
                        color: '黑',
                        status: 4
                    }*/
                ]
            }
        },
        methods: {
            yizhifu() {
                if (this.hook === 1) return
                window.scrollTo(0, 0) // window.scrollTo是兼容的，dom.scrollTo兼容ie12
                this.mapYizhifu()
            },
            mapYizhifu() {
                orderYizhifu(JSON.parse(localStorage.userInfo).content[0].uid, this.yizhifuPage)
                    .then(res => {
                        if (res.code === common.code.errOk) {
                            this.$emit('emitNone')
                            if (this.yizhifuPage === 0) {
                                this.msg = res.content
                            }
                            else {
                                for (let i = 0; i < res.content.length; i++) {
                                    this.msg.push(res.content[i])
                                }
                            }
                        }
                        else if (res.code === common.code.nonentity) {
                            if (this.yizhifuPage === 0) {
                                this.msg = []
                                this.$emit('emitNull')
                                return
                            }
                            this.yizhifuPage = 0
                            this.$emit('emitPromptTextA', ['没有更多了'])
                            this.$emit('emitNone')
                        }
                        else if (res.code === common.code.notLogin) {
                            this.$emit('emitNotLogin')
                        }
                        else {
                            this.$emit('emitPromptTextA', ['错误提示：' + res.code])
                            this.$emit('emitError')
                        }
                    })
                this.hook = 1
            },
            weizhifu() {
                if (this.hook === 2) return
                window.scrollTo(0, 0)
                this.mapWeizhifu()
            },
            mapWeizhifu() {
                orderWeizhifu(
                    JSON.parse(localStorage.userInfo).content[0].uid,
                    this.weizhifuPage
                ).then(res => {
                    if (res.code === common.code.errOk) {
                        this.$emit('emitNone')
                        if (this.weizhifuPage === 0) {
                            this.msg = res.content
                        }
                        else {
                            for (let i = 0; i < res.content.length; i++) {
                                this.msg.push(res.content[i])
                            }
                        }

                    }
                    else if (res.code === common.code.nonentity) {
                        if (this.weizhifuPage === 0) {
                            this.msg = []
                            this.$emit('emitNull')
                            return
                        }
                        this.weizhifuPage = 0
                        this.$emit('emitPromptTextA', ['没有更多了'])
                        this.$emit('emitNone')
                    }
                    else if (res.code === common.code.notLogin) {
                        this.$emit('emitNotLogin')
                    }
                    else {
                        this.$emit('emitPromptTextA', ['错误提示：' + res.code])
                        this.$emit('emitError')
                    }
                })
                this.hook = 2
            },
            tuikuan() {
                if (this.hook === 3) return
                window.scrollTo(0, 0)
                this.mapTuikuan()
            },
            mapTuikuan() {
                orderTuikuan(
                    JSON.parse(localStorage.userInfo).content[0].uid,
                    this.tuikuanPage
                ).then(res => {
                    if (res.code === common.code.errOk) {
                        this.$emit('emitNone')
                        if (this.tuikuanPage === 0) {
                            this.msg = res.content
                        }
                        else {
                            for (let i = 0; i < res.content.length; i++) {
                                this.msg.push(res.content[i])
                            }
                        }

                    }
                    else if (res.code === common.code.nonentity) {
                        if (this.tuikuanPage === 0) {
                            this.msg = []
                            this.$emit('emitNull')
                            return
                        }
                        this.tuikuanPage = 0
                        this.$emit('emitPromptTextA', ['没有更多了'])
                        this.$emit('emitNone')
                    }
                    else if (res.code === common.code.notLogin) {
                        this.$emit('emitNotLogin')
                    }
                    else {
                        this.$emit('emitPromptTextA', ['错误提示：' + res.code])
                        this.$emit('emitError')
                    }
                })
                this.hook = 3
            },
            pullUpLoading() {
                if (this.hook === 1) {
                    this.yizhifuPage++
                    this.mapYizhifu()
                }
                else if (this.hook === 2) {
                    this.weizhifuPage++
                    this.mapWeizhifu()
                }
                else if (this.hook === 3) {
                    this.tuikuanPage++
                    this.mapTuikuan()
                }
            },
            isScrollBottom() {
                let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
                let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
                scrollTop + clientHeight === scrollHeight ? this.pullUpLoading() : false;
            },
            isRollingDirection() {
                let initialPositionX = 0
                let initialPositionY = 0
                window.addEventListener('touchstart', (e) => {
                    initialPositionX = e.changedTouches[0].clientX
                    initialPositionY = e.changedTouches[0].clientY
                })
                window.addEventListener('touchend', (e) => {
                    if (initialPositionY - e.changedTouches[0].clientY > 50 || initialPositionY - e.changedTouches[0].clientY < -50) {
                    }
                    else if (e.changedTouches[0].clientX - initialPositionX > 100) {
                        if (this.hook === 2) {
                            this.yizhifu()
                        }
                        else if (this.hook === 3) {
                            this.weizhifu()
                        }
                    }
                    else if (initialPositionX - e.changedTouches[0].clientX > 100) {
                        if (this.hook === 1) {
                            this.weizhifu()
                        }
                        else if (this.hook === 2) {
                            this.tuikuan()
                        }
                    }
                })
            },
            orderDelete(orderId) {
                this.$refs.SELECTMESSAGEA.Promise('确定取消订单吗？')
                    .then(() => {
                        this.$emit('emitLoadingA')
                        orderDelete(
                            JSON.parse(localStorage.userInfo).content[0].uid,
                            orderId
                        ).then(res => {
                            if (res.code === common.code.errOk) {
                                this.mapWeizhifu()
                            }
                            else if (res.code === common.code.notLogin) {
                                this.$emit('emitNotLogin')
                            }
                            else {
                                this.$emit('emitPromptTextA', ['错误提示：' + res.code])
                                this.$emit('emitNone')
                            }
                        })
                    })
            },
        },
        created() {
            this.mapYizhifu()
            this.isRollingDirection()
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                scrollTo(0, vm.y)
            });
        },
        activated() {
            setTimeout(() => {
                window.addEventListener('scroll', this.isScrollBottom, false)
            }, 200) // 防止vue切换路由也被当成滚动
        },
        beforeRouteLeave(to, from, next) {
            window.removeEventListener('scroll', this.isScrollBottom)
            this.y = document.documentElement.scrollTop || document.body.scrollTop
            next();
        },
        components: {
            Head,
            Foot,
            SelectMessageA
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "~@/stylus/var"

    .router
        z-index 10
        position fixed
        right 0
        left 0
        width 16rem
        margin 0 auto
        background-color white
        .ul
            display flex
            line-height 36px
            text-align center
            font-size 16px
            height 36px
            .li
                flex 1
                &.hook
                    font-weight bold
                    color $cMain1

    .item
        padding 0 15px
        margin 0 10px 10px 10px
        font-size 0
        border-radius 5px
        background-color white
        .top
            display flex
            padding 10px 0
            height 80px
            .left
                display inline-block
                vertical-align top
                width 80px
                .img
                    width 80px
                    border-radius 5px
            .right
                flex 1
                display inline-block
                vertical-align top
                margin-left 10px
                line-height 24px
                font-size 14px
                overflow hidden
        .bottom
            height 32px
            line-height 32px
            font-size 16px
            .left
                float left
                &.hook
                    color $cMain1
            .right
                float right
                padding-left 20px
                color $cMain1
</style>