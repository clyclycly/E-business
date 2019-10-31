<!--
200代表以完成，0代表已发货，1代表未发货，2代表未支付，3代表退款审核中，4代表退款成功，5代表退款失败
-->
<template>
    <div v-if="JSON.stringify(msg) !== '{}'">
        <!-- header -->
        <Head v-if="msg.status === 0" :title="'已发货'"></Head>
        <Head v-if="msg.status === 1" :title="'未发货'"></Head>
        <Head v-if="msg.status === 2" :title="'未支付'"></Head>
        <Head v-if="msg.status === 3" :title="'审核中'"></Head>
        <Head v-if="msg.status === 4" :title="'退款成功'"></Head>
        <Head v-if="msg.status === 5" :title="'退款失败'"></Head>
        <Head v-if="msg.status === 200" :title="'以完成'"></Head>
        <!-- 收货地址 -->
        <div v-if="msg.status === 2" class="item">
            <div class="title --line-bottom">收货地址</div>
            <div class="wrapper" v-if="msg.user">
                <BarBilateralA :msg="[msg.user, msg.phone]"></BarBilateralA>
                <div class="detail-site" v-text="msg.site"></div>
            </div>
            <div class="change" v-if="msg.user" @click="selectCity">修改</div>
            <div class="change" v-if="!msg.user" @click="selectCity" style="padding-top: 10px;">
                添加
            </div>
        </div>
        <!-- 退款流程 -->
        <div v-if="msg.status === 3" class="item">
            <div class="title --line-bottom">退款流程</div>
            <div class="wrapper">
                <BarBilateralA :msg="['退款申请已提交：','']"></BarBilateralA>
                <div class="text"
                     v-text="`申请理由：${msg.refundContent}(申请退款金额${msg.refundPrice}元)——${msg.refundTime}`"></div>
            </div>
        </div>
        <div v-if="msg.status === 4" class="item">
            <div class="title --line-bottom">退款流程</div>
            <div class="wrapper">
                <BarBilateralA :msg="['退款已入账：','']"></BarBilateralA>
                <div class="text"
                     v-text="`微信/支付宝已将${msg.refundPrice}元入账到到你的账号(请明细核实)——${msg.lastTime}`"></div>
                <BarBilateralA :msg="['商家已同意退款：','']"></BarBilateralA>
                <div class="text" v-text="`已将退款申请提交到你微信/支付宝(请明细核实)——${msg.replyTime}`"></div>
                <BarBilateralA :msg="['退款申请已提交：','']"></BarBilateralA>
                <div class="text"
                     v-text="`申请理由：${msg.refundContent}(申请退款金额${msg.refundPrice}元)——${msg.refundTime}`"></div>
            </div>
        </div>
        <div v-if="msg.status === 5" class="item">
            <div class="title --line-bottom">退款流程</div>
            <div class="wrapper">
                <BarBilateralA :msg="['商家已拒绝退款：','']"></BarBilateralA>
                <div class="text" v-text="`拒绝理由：${msg.replyContent}——${msg.replyTime}`"></div>
                <BarBilateralA :msg="['退款申请已提交：','']"></BarBilateralA>
                <div class="text"
                     v-text="`申请理由：${msg.refundContent}(申请退款金额${msg.refundPrice}元)——${msg.refundTime}`"></div>
            </div>
        </div>
        <!-- 商品信息 -->
        <div class="item">
            <div class="title --line-bottom">商品信息</div>
            <div class="goods-wrapper">
                <div class="top">
                    <router-link class="left" :to="`/goods/${msg.goodsId}`" tag="div">
                        <img class="img" :src="msg.img" width="100px" alt="">
                    </router-link>
                    <div class="right">
                        <div class="--no-wrap" v-text="msg.name"></div>
                        <div class="--no-wrap">
                            <span v-text="'￥' + msg.price"></span>
                            <span v-text="'×'+ ' ' + msg.number"></span>
                            <span v-if="msg.status !== 2" style="color: rgba(255,134,113,0.8)"
                                  v-text="'（已支付'+msg.paymentPrice + '元)'"></span>
                        </div>
                        <div>
                            <span v-text="msg.color"></span>
                            <span v-text="msg.size"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 物流信息 -->
        <div v-if="msg.status !== 2" class="item">
            <div class="title --line-bottom">物流信息</div>
            <div class="wrapper">
                <BarBilateralA :msg="['快递', '暂未开通']"></BarBilateralA>
                <BarBilateralA :msg="['收货人', `${msg.user}(${msg.phone})`]"></BarBilateralA>
                <div class="detail-site" v-text="msg.site"></div>
            </div>
        </div>
        <!-- 订单信息 -->
        <div class="item">
            <div class="title --line-bottom">订单信息</div>
            <div class="wrapper">
                <BarBilateralA :msg="['订单号',msg.orderId]"></BarBilateralA>
                <BarBilateralA :msg="['下单时间',msg.time]"></BarBilateralA>
            </div>
        </div>
        <!-- 联系客服 -->
        <div class="--h50 --mt20"></div>
        <div v-if="msg.status !== 2" class="bottom --line-top" @click="call">联系客服</div>
        <div v-if="msg.status === 2" class="bottom --line-top" @click="payment">确定支付</div>
        <!-- SelectSiteB -->
        <SelectSiteB ref="SELECTSITEB"
                     @emitSite="emitSite"
                     @emitNone="emitNone"
                     @emitLoadingA="emitLoadingA"
                     @emitLoadingB="emitLoadingB"
                     @emitNotLogin="emitNotLogin"
                     @emitNull="emitNull"
                     @emitError="emitError"
                     @emitPromptTextA="emitPromptTextA"
        ></SelectSiteB>
        <!-- select message a -->
        <SelectMessageA ref="SELECTMESSAGEA"></SelectMessageA>
    </div>
</template>

<script type="text/ecmascript-6">
    import Head from '@/vue/base/head/head.vue'
    import BarBilateralA from '@/vue/base/bar/bar-bilateral-a'
    import SelectSiteB from '@/vue/base/select/select-site-b'
    import SelectMessageA from '@/vue/base/select/select-message-a'
    import {timeA} from '@/js/time'
    import {orderDetail, orderPayment, orderSiteChange} from '@/api/order'

    export default {
        data() {
            return {
                msg: {
                    /*orderId: '',
                    goodsId: '',
                    img: 'http://localhost:3000/images/goods/1.jpg',
                    name: '2018夏装新款V领针织衫条纹打底衫天丝宽松短袖T恤女装上衣服半袖',
                    price: '53',
                    number: 1,
                    site: '陕西省-西安市-雁塔区——澳城大厦10802',
                    time: '1530000000000',
                    user: '李白',
                    phone: '17629284522',
                    size: '170',
                    color: '黑',
                    status: 4*/
                }
            }
        },
        methods: {
            mapMsg() {
                this.orderId = location.href.split('/')[location.href.split('/').length - 1]
                if (this.orderId.length > 10) {
                    this.$emit('emitPromptTextA', ['url被注入，3秒钟后返回首页'])
                    this.$emit('emitError')
                    setTimeout(() => {
                        this.$router.push({path: '/home'})
                    }, 3000)
                    return
                }
                /* 请求订单详情接口 */
                this.$emit('emitLoadingA')
                orderDetail(JSON.parse(localStorage.userInfo).content[0].uid, this.orderId).then(res => {
                    if (res.code === common.code.errOk) {
                        this.msg = res.content
                        this.msg.time = timeA(res.content.time)
                        this.msg.refundTime = timeA(res.content.refundTime)
                        this.msg.replyTime = timeA(res.content.replyTime)
                        this.msg.lastTime = timeA(res.content.lastTime)
                        this.msg.user = res.content._user
                        this.$emit('emitNone')
                    }
                    else if (res.code === code.nonentity) {
                        this.$emit('emitNull')
                    }
                    else if (res.code === code.notLogin) {
                        this.$emit('emitNotLogin')
                    }
                    else {
                        this.$emit('emitPromptTextA', ['错误提示：' + res.code])
                        this.$emit('emitError')
                    }
                })
            },
            /* 选择城市 */
            selectCity() {
                this.$refs.SELECTSITEB.show()
            },
            emitSite(arg) {
                this.$emit('emitLoginA')
                orderSiteChange(JSON.parse(localStorage.userInfo).content[0].uid, this.msg.orderId, arg.name, arg.phone, arg.detailSite).then(res => {
                    if (res.code === common.code.errOk) {
                        this.$set(this.msg, Math.random())
                        this.msg.user = arg.name
                        this.msg.phoen = arg.phoen
                        this.msg.site = arg.detailSite
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
            },
            /* 联系客服 */
            call() {
                this.$refs.SELECTMESSAGEA.Promise('没人！暂不开通')
            },
            /* 确定支付 */
            payment() {
                if (this.user === '') {
                    this.$emit('emitPromptTextA', ['收货地址不能为空'])
                    return
                }
                this.$refs.SELECTMESSAGEA.Promise('确定支付(假)？').then(() => {
                    this.$emit('emitLoadingA')
                    orderPayment(
                        JSON.parse(localStorage.userInfo).content[0].uid,
                        this.msg.orderId
                    ).then(res => {
                        if (res.code === common.code.errOk) {
                            this.$emit('emitNone')
                            this.mapMsg()
                        }
                        else if (res.code === common.code.notLogin) {
                            this.$emit('emitNotLogin')
                        }
                        else {
                            this.$emit('emitPromptTextA', ['错误提示：' + res.code])
                            this.$emit('emitError')
                        }
                    })
                })
            },
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
            }
        },
        created() {
            this.mapMsg()
        },
        components: {
            Head,
            BarBilateralA,
            SelectSiteB,
            SelectMessageA
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "~@/stylus/var"

    .item
        margin 15px 10px 0 10px
        border-radius 5px
        background-color white
        overflow hidden
        .title
            text-indent 15px
            height 40px
            font bold 16px / 40px $fFamily
            color $cMain1
        .wrapper
            padding 10px 0
            .text
                padding 0 15px
                color $cText2
                line-height 40px
                font-size 14px
                text-indent 28px
            .detail-site
                padding 0 0 10px 16px
                line-height 28px
                font-size 14px
                color $color-light
        .goods-wrapper
            padding 0 15px
            font-size 0
            border-radius 5px
            background-color width
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
                    font-size 14px
                    line-height 24px
                    overflow hidden
        .change
            padding 0 15px 10px 0
            color $cMain1
            text-align right
            font-size 14px

    .bottom
        z-index 30
        position fixed
        bottom 0
        left 0
        right 0
        margin 0 auto
        width 16rem
        height 49px
        line-height 49px
        text-align center
        font-size 18px
        color $cMain1
        background-color white
</style>