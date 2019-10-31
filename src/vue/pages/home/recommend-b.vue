<template>
    <div class="recommend-b">
        <recommendTitle :msg="msg.title"></recommendTitle>
        <ul class="ul --clear-fix">
            <!-- 一则 -->
            <router-link
                    class="li"
                    tag="li"
                    :to="`/goods/${item.goodsId}`"
                    v-for="(item,index) in msg.list"
                    v-if="item.img" :key="index">
                <!-- 图片 -->
                <img class="img" :src="item.img" @load="load">
                <!-- 价格 -->
                <div class="price" v-text="'￥' + item.price"></div>
            </router-link>
        </ul>
    </div>
</template>

<script type="text/ecmascript-6">
    import recommendTitle from './recommend-title'

    export default {
        props: {
            msg: {
                type: Object,
                default() {
                    return {
                        title: '推荐类型2',
                        style: 'B',
                        list: [
                            {
                                goodsId: 1,
                                img: v.img,
                                price: '100'
                            },
                            {
                                goodsId: 1,
                                img: v.img,
                                price: '100'
                            },
                            {
                                goodsId: 1,
                                img: v.img,
                                price: '100'
                            }
                        ]
                    }
                }
            }
        },
        methods: {
            load() {
                this.$emit('_load')
            }
        },
        components: {
            recommendTitle
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "~@/stylus/var"
    @import "~@/stylus/fn"

    .recommend-b
        font-size 0
        background-color white
        .ul
            padding 0 5px
            /* 一则 */
            .li
                box-sizing border-box
                float left
                padding 0 10px
                width 50%
                /* 图片 */
                .img
                    width 100%
                    border-radius 0.8rem
                /* 标题1 */
                .price
                    no-wrap()
                    font bold 16px / 46px $fFamily
            /* 第一个孩子ie7 */
            .li:first-child
                width 100%
</style>
