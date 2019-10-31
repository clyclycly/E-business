<template>
    <div class="recommend-a">
        <recommendTitle :msg="msg.title"></recommendTitle>
        <ul class="ul --clearFix">
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
                        title: '推荐类型1',
                        style: 'A',
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

    .recommend-a
        font-size 0
        background-color white
        .ul
            padding 0 5px
            /* list */
            .li
                float left
                box-sizing border-box
                width 50%
                padding 0 10px
                /* images */
                .img
                    width 100%
                    border-radius 0.8rem
                /* price */
                .price
                    no-wrap()
                    font bold 16px / 46px $fFamily
</style>
