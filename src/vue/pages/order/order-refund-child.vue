<template>
    <div v-if="msg.status === 0 || msg.status === 1">
        <!-- header -->
        <Head :title="'申请退款'"></Head>
        <!-- 商品信息 -->
        <div class="item">
            <div class="title --line-bottom">商品信息</div>
            <div class="content">
                <router-link class="left" :to="`/goods/${msg.goodsId}`" tag="div">
                    <img class="img" :src="msg.img" width="100px" alt="">
                </router-link>
                <div class="right">
                    <div class="--no-wrap" v-text="msg.name"></div>
                    <div>
                        <span v-text="'￥' + msg.price"></span>
                        <span v-text="'×'+ ' ' + msg.number">1</span>
                        <span class="hook" v-text="'（以支付'+msg.paymentPrice + '元)'">1</span>
                    </div>
                    <div>
                        <span v-text="msg.color"></span>
                        <span v-text="msg.size"></span>
                    </div>
                </div>
            </div>
        </div>
        <!-- 退款原因 -->
        <SelectMessageB class="item" :text1="['退款原因', '请选择']"
                    :text2="['拍错/多拍/不想要', '协商一致退款', '未按约定时间发货', '其他']"
                    @emitChoose="emitChoose"
        ></SelectMessageB>
        <!-- 详细金额 -->
        <fromText class="item" v-model="refundPrice"
                  :placeholder="'请输入退款金额(应小于'+msg.paymentPrice +'元)'"
                  :max="msg.paymentPrice"
        ></fromText>
        <!-- 上传凭证 -->
        <div class="item">
            <div class="voucher-title --line-bottom">上传凭证(最多3张）</div>
            <FunctionPhotoB
                    @emitPhotoBase64Array="emitPhotoBase64Array"
            ></FunctionPhotoB>
        </div>
        <!-- 详细原因 -->
        <div class="item">
            <textarea class="detailed" rows="4" v-model="refundContentDetails" placeholder="详细说明(选填）"></textarea>
        </div>
        <!-- submit -->
        <div class="submit --line-top" @click="submit">提交</div>
        <!-- select message a -->
        <SelectMessageA ref="SELECTMESSAGEA"></SelectMessageA>
    </div>
</template>

<script type="text/ecmascript-6">
    import Head from '@/vue/base/head/head.vue'
    import SelectMessageB from '@/vue/base/select/select-message-b'
    import FromText from '@/vue/base/from/from-text'
    import FunctionPhotoB from '@/vue/base/function/photo-b'
    import SelectMessageA from '@/vue/base/select/select-message-a'
    import {orderDetail, orderRefund} from '@/api/order'
    import {timeA} from '@/js/time'
    import {isNumber} from '@/js/is'

    export default {
        data() {
            return {
                refundPrice: '',
                refundContent: '',
                refundContentDetails: '',
                images: [], // 用于保存图片
                msg: {
                    /*orderId: '',
                    goodsId: '',
                    paymentPrice: '53',
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
                    status: 1*/
                }
            }
        },
        methods: {
            mapMsg() {
                this.orderId = location.href.split('/')[location.href.split('/').length - 1]
                /* 防止url注入 */
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
                orderDetail(
                    JSON.parse(localStorage.userInfo).content[0].uid,
                    this.orderId
                ).then(res => {
                    if (res.code === common.code.errOk) {
                        if (res.content.status !== 0 && res.content.status !== 1) {
                            /* 也可以把订单详情的退款内容等复制过来，点击确定后，重新渲染，这里两种方式各用一次（order-detail为重新渲染） */
                            this.$emit('emitPromptTextA', ['该订单已经申请退款'])
                            this.$emit('emitNull')
                            return
                        }
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
            emitChoose(arg) {
                this.refundContent = arg
            },
            emitPhotoBase64Array(arg) {
                this.images = arg
            },
            submit() {
                if (this.refundContent === '') {
                    this.$emit('emitPromptTextA', ['请输入退款原因'])
                }
                else if (this.refundPrice === '') {
                    this.$emit('emitPromptTextA', ['请输入退款价格'])
                }
                else if (this.refundPrice > this.msg.paymentPrice) {
                    this.$emit('emitPromptTextA', ['退款价格不能大于支付价格'])
                }
                else if (!(isNumber(this.refundPrice)) || this.refundPrice < 0) {
                    this.$emit('emitPromptTextA', ['退款价格应为大于0的数字'])
                }
                else {
                    let reason = '' // 原因
                    this.refundContentDetails ? reason = this.refundContentDetails : reason = this.refundContent
                    this.$refs.SELECTMESSAGEA.Promise('确定提交？').then(() => {
                        /* 调用接口 */
                        this.$emit('emitLoadingA')
                        orderRefund(
                            JSON.parse(localStorage.userInfo).content[0].uid,
                            this.msg.orderId,
                            reason,
                            this.refundPrice,
                            JSON.stringify(this.images)
                        ).then(res => {
                            if (res.code === common.code.errOk) {
                                this.$emit('emitNone')
                                this.$emit('emitPromptTextA', ['提交成功'])
                                this.$router.push({
                                    path: `/order-detail/${location.href.split('/')[location.href.split('/').length - 1]}`
                                })
                            }
                            else if (res.code === code.notLogin) {
                                this.$emit('emitNotLogin')
                            }
                            else {
                                this.$emit('emitPromptTextA', ['错误提示：' + res.code])
                                this.$emit('emitNone')
                            }
                        })
                    })
                }
            }
        },
        created() {
            this.mapMsg()
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
            SelectMessageB,
            FromText,
            FunctionPhotoB,
            SelectMessageA
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "~@/stylus/var"

    .item
        margin 10px 10px 15px 10px
        border-radius 5px
        background-color white
        overflow hidden
        .title
            height 40px
            font bold 16px / 40px $fFamily
            text-indent 15px
            color $cMain1
        .content
            display flex
            padding 10px 15px
            height 80px
            font-size 0
            border-radius 5px
            background-color width
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
                .hook
                    color $cMain1
        .voucher-title
            padding 0 15px
            height 40px
            line-height 40px
            font-size 14px
            color $cText1
            background-color white
        .detailed
            padding-top 10px 0
            font-size 14px

    .submit
        z-index 30
        position fixed
        bottom 0
        left 0
        right 0
        margin 0 auto
        width 16rem
        height 50px
        line-height 50px
        text-align center
        font-size 18px
        color $cMain1
        background-color white
</style>
