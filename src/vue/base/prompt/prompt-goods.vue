<!-- 商品提示 -->
<template>
    <div>
        <!-- 页面内容 -->
        <div class="prompt-goods" v-if="promptGoodsSwitch">
            <!-- 头部 -->
            <div class="head --mt20">
                <div class="left">
                    <img class="head-avatar" :src="img" alt="" width="100px">
                </div>
                <div class="right">
                    <div class="price">
                        <span>￥</span><span v-text="price"></span>
                    </div>
                    <div class="storage">
                        <span>库存：</span>
                        <span v-text="quantity"></span>
                    </div>
                    <div class="select">
                        <span>已选：</span>
                        <span v-text="selectColor"></span>
                        <span v-text="selectSize"></span>
                    </div>
                </div>
            </div>
            <!-- 颜色 -->
            <div class="color --line-top">
                <div class="color-title" v-text="'颜色分类'"></div>
                <ul class="ul">
                    <li class="li" v-for="(item,index) in colors">
                        <div class="color" :class="{hook:colorSwitch === index}" v-if="item.switch"
                             v-text="item.content"
                             @click="color(item.content,index)"></div>
                        <div class="color" v-if="!item.switch" v-text="item.content" style="color:#aaa;"></div>
                    </li>
                </ul>
            </div>
            <!-- 尺寸 -->
            <div class="size --line-top">
                <div class="size-title" v-text="'尺码'"></div>
                <ul class="ul">
                    <li class="li" v-for="(item,index) in sizes">
                        <div class="size" :class="{hook:sizeSwitch === index}" v-if="item.switch"
                             v-text="item.content"
                             @click="size(item.content,index)"></div>
                        <div class="size" v-if="!item.switch" v-text="item.content" style="color:#aaa;"></div>
                    </li>
                </ul>
            </div>
            <!-- 数量 -->
            <div class="number --line-top --clear-fix">
                <div class="left">数量</div>
                <div class="right">
                    <span class="fa-minus" @click="minus"></span>
                    <span class="span" v-text="number"></span>
                    <span class="fa-plus" @click="plus"></span>
                </div>
            </div>
            <!-- 确定 -->
            <div class="submit --line-top" @click="submit">
                <div class="content" :class="{hook:submitSwitch}">确定</div>
            </div>
        </div>
        <div class="background" v-if="promptGoodsSwitch" @click="hide"></div>
    </div>
</template>

<script type='text/ecmascript-6'>
    import {orderAdd} from '@/api/order' // 订单接口

    export default {
        data() {
            /* 获取msg,其他自己计算 */
            return {
                style: 1, // 0代表购物车，1代表立即购买
                goodsId: location.href.split('/')[location.href.split('/').length - 1],
                img: this.propImg, /* http://localhost:3000/images/goods/1.jpg */
                quantity: '', // 库存
                promptGoodsSwitch: false, // 组件开关
                submitSwitch: false, // 确定开关
                number: 1, // 数量
                colorSwitch: -1, // 颜色开关
                sizeSwitch: -1, // 数量开关
                selectColor: '', // 颜色
                selectSize: '', // 尺寸
                price: '', // 88-93
                priceCopy: '', // 88-93
                /* 颜色数组 */
                colors: [
                    /*{
                      content: '黑',
                      switch: true // 控制是否可以点击
                    },
                    {
                      content: '白',
                      switch: true
                    },
                    {
                      content: '红',
                      switch: true
                    }*/
                ],
                /* 尺寸数组 */
                sizes: [
                    /*{
                      content: '160',
                      switch: true
                    },
                    {
                      content: '170',
                      switch: true
                    },
                    {
                      content: '180',
                      switch: true
                    },
                    {
                      content: '190',
                      switch: true
                    }*/
                ],
                /* msg */
                msg: [
                    /*{
                      color: '黑',
                      size: '160',
                      price: '88',
                      quantity: '100'
                    },
                    {
                      color: '黑',
                      size: '170',
                      price: '89',
                      quantity: '101'
                    },
                    {
                      color: '黑',
                      size: '180',
                      price: '90',
                      quantity: '102'
                    },
                    {
                      color: '白',
                      size: '170',
                      price: '91',
                      quantity: '103'
                    },
                    {
                      color: '白',
                      size: '180',
                      price: '92',
                      quantity: '104'
                    },
                    {
                      color: '红',
                      size: '190',
                      price: '93',
                      quantity: '105'
                    }*/
                ]
            }
        },
        props: {
            /* 需要映射的加prop,个人感觉vue2.0里面很傻B的设计 */
            propMsg: {
                type: Array,
                default() {
                    return []
                }
            },
            propImg: {
                type: String,
                default: ''
            }
        },
        methods: {
            /* 确定 */
            submit() {
                if (!this.selectSize && !this.selectSize) {

                    return
                }
                if (this.style === 0) {
                    console.log('购物车')
                    return
                }
                if (this.style === 1) {
                    if (!localStorage.userInfo) {
                        this.$router.push({path: '/login-password'})
                        return
                    }
                    /* 调用接口 */
                    this.$emit('emitPromptTextA', ['提交数据中'])
                    orderAdd(
                        JSON.parse(localStorage.userInfo).content[0].uid,
                        this.goodsId,
                        this.selectColor,
                        this.selectSize,
                        this.number
                    ).then(res => {
                        if (res.code === common.code.errOk) {
                            this.$emit('emitPromptTextA', ['提交成功'])
                            this.$router.push({
                                path: `/order-detail/${res.content}`
                            })
                        }
                        else if (res.code === common.code.notLogin) {
                            this.$router.push({path: '/login-password'})
                        }
                        else {
                            this.$emit('emitPromptTextA', ['错误提示：' + res.code])
                            this.$emit('emitNone')
                        }
                    })

                }
            },
            /* 显示 */
            show() {
                this.promptGoodsSwitch = true
            },
            /* 隐藏 */
            hide() {
                this.promptGoodsSwitch = false
            },
            /* 加 */
            plus() {
                console.log(this.number, this.quantity)
                if (this.selectSize && this.selectColor) {
                    if (this.number >= this.quantity) {
                        this.$emit('emitPromptTextA', ['已到库存上限'])
                        return
                    }
                    this.number++
                }
                else {
                    this.$emit('emitPromptTextA', ['请选择参数'])
                }

            },
            /* 减 */
            minus() {
                if (this.selectSize && this.selectColor) {
                    if (this.number <= 1) {
                        return
                    }
                    this.number--
                }
                else {
                    this.$emit('emitPromptTextA', ['请选择参数'])
                }
            },
            /* 点击颜色 */
            color(arg, index) {
                this.colorSwitch = index
                !this.selectSize ? (this.quantity = '', this.submitSwitch = false) : false; // 复原库存
                this.selectSize ? this.submitSwitch = true : false; // 设置是否可以确定
                /* 判断是否以点击过 */
                if (this.selectColor === arg) {
                    this.colorSwitch = -1
                    this.sizes.forEach(value => {
                        value.switch = true
                    })
                    this.selectColor = ''
                    this.price = this.priceCopy
                    this.submitSwitch = false
                    return
                }
                this.selectColor = arg // 设置已选颜色
                /* 关闭所有 */
                this.sizes.forEach(value => {
                    value.switch = false
                })
                this.quantity = 0
                /* 可选择 */
                this.msg.forEach(value => {
                    if (value.color === arg) {
                        this.sizes.forEach(valueSize => {
                            if (valueSize.content === value.size) {
                                valueSize.switch = true
                                if (this.selectSize) {
                                    /* 以选择selectSize */
                                    this.msg.forEach(value2 => {
                                        if (value2.color === arg) {
                                            value2.size === this.selectSize ? (this.quantity = value2.quantity , this.price = value2.price) : false;
                                        }
                                    })
                                }
                                else {
                                    /* 未选择selectSize */
                                    this.quantity = Number(this.quantity) + Number(value.quantity)
                                }
                            }
                        })
                    }
                })
                /* 判断数量是否合法 */
                this.number > this.quantity ? this.number = this.quantity : false;
            },
            /* 点击尺寸 */
            size(arg, index) {
                this.sizeSwitch = index
                !this.selectColor ? (this.quantity = '', this.submitSwitch = false) : false; // 复原库存
                this.selectColor ? this.submitSwitch = true : false; // 设置是否可以确定
                /* 判断是否以点击 */
                if (this.selectSize === arg) {
                    this.sizeSwitch = -1
                    this.colors.forEach(value => {
                        value.switch = true
                    })
                    this.selectSize = ''
                    this.submitSwitch = false
                    return
                }
                this.selectSize = arg // 设置已选尺寸
                /* 关闭所有 */
                this.colors.forEach(value => {
                    value.switch = false
                })
                this.quantity = 0
                /* 可选择 */
                this.msg.forEach(value => {
                    if (value.size === arg) {
                        this.colors.forEach(valueColor => {
                            if (valueColor.content === value.color) {
                                valueColor.switch = true
                                if (this.selectColor) {
                                    /* 以选择颜色 */
                                    this.msg.forEach(value2 => {
                                        if (value2.size === arg) {
                                            value2.color === this.selectColor ? (this.quantity = value2.quantity, this.price = value2.price) : false;
                                        }
                                    })
                                }
                                else {
                                    /*  */
                                    this.quantity = Number(this.quantity) + Number(value.quantity) // 未选择颜色
                                }
                            }
                        })
                    }
                })
                /* 判断数量是否合法 */
                this.number > this.quantity ? this.number = this.quantity : false;
            }
        },
        created() {
            this.msg = this.propMsg
            /* 映射颜色 */
            let mapColor = []
            for (let i = 0; i < this.propMsg.length; i++) {
                mapColor.indexOf(this.propMsg[i].color) < 0 ? mapColor.push(this.propMsg[i].color) : false;
            }
            this.colors = mapColor.map((value) => {
                return {
                    content: value,
                    switch: true
                }
            })
            /* 映射尺寸 */
            let mapSize = []
            for (let i = 0; i < this.propMsg.length; i++) {
                mapSize.indexOf(this.propMsg[i].size) < 0 ? mapSize.push(this.propMsg[i].size) : false;
            }
            this.sizes = mapSize.map((value) => {
                return {
                    content: value,
                    switch: true
                }
            })
            /* 映射price最大值与最小值 */
            let mapPrice = ''
            let mapPriceArray = []
            for (let i = 0; i < this.propMsg.length; i++) {
                mapPriceArray.push(this.propMsg[i].price)
            }
            mapPrice = Math.min.apply(Math, mapPriceArray) + '-' + Math.max.apply(Math, mapPriceArray)
            this.price = mapPrice
            this.priceCopy = mapPrice
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import '~@/stylus/var'

    /* prompt-goods */
    .prompt-goods
        z-index 50
        position fixed
        left 0
        right 0
        bottom 0
        margin 0 auto
        width 16rem
        max-height 18rem
        overflow scroll
        /* head */
        .head
            display flex
            padding 0 15px
            height 120px
            background-color white
            .left
                flex 0 112px
                margin-top -15px
                border-radius 5px
                background-color white
                overflow hidden
                .head-avatar
                    padding 5px
                    border-radius 5px
                    border 1px solid $cLine1
            .right
                padding-top 20px
                padding-left 10px
                .price
                    margin-bottom 10px
                    font-size 18px
                    font-weight bold
                    color $cMain1
                /* 仓库与选择 */
                .storage, .select
                    margin-bottom 10px
                    font-size 14px
        /* color size */
        .color, .size
            padding 0 15px
            padding-bottom 10px
            background-color white
            .color-title, .size-title
                height 50px
                line-height 50px
                font-size 16px
            .ul
                font-size 14px
                .li
                    display inline-block
                    margin 0 20px 10px 0
                    .color, .size
                        padding 5px 20px
                        border 1px solid #fff
                        border-radius 10px
                        background-color #eee
                        overflow hidden
                        &.hook
                            color $cMain1
                            border 1px solid #eee
        /* number */
        .number
            padding 20px 15px
            background-color white
            .left
                float left
                height 16px
                font-size 16px
            .right
                float right
                padding-right 10px
                height 16px
                font-size 12px
                .fa-minus, .fa-plus, .span
                    display inline-block
                    width 24px
                    line-height 18px
                    vertical-align top
                    text-align center
                    color $cText2
                .span
                    width auto
                    line-height 18px
                    font-size 14px
                    color $cText1
        /* submit */
        .submit
            padding 15px 18px
            background-color white
            .content
                height 40px
                font-size 18px
                line-height 40px
                text-align center
                color white
                border-radius 5px
                background-color rgba(255, 134, 113, 0.5)
                &.hook
                    background-color rgba(255, 134, 113, 0.8)

    /* background */
    .background
        z-index 49
        position fixed
        top 0
        right 0
        bottom 0
        left 0
        width 16rem
        margin 0 auto
        background-color rgba(7, 17, 27, 0.4)
</style>
