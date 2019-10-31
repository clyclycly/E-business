<template>
    <div>
        <div class="bar-shopping">
            <div class="buy" @click="buy">立即购买</div>
            <div v-if="0" class="shopping-cart" @click="shoppingCart">加入购物车</div>
        </div>
        <div class="--h50"></div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        methods: {
            shoppingCart() {
                this.$emit('emitShoppingCart')
            },
            buy() {
                this.$emit('emitBuy')
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

    .bar-shopping
        z-index 50
        position fixed
        bottom 0
        width 16rem
        margin 0 auto
        background-color white
        .buy, .shop-cart
            float right
            width 30%
            height 49px
            font-size 18px
            line-height 49px
            color white
            text-align center
            background-color rgba(255, 134, 113, 1)
        .shop-cart
            width 36%
            background-color #1d1e3d
</style>