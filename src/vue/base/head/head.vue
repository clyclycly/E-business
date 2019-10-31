<template>
    <div>
        <div class="head-content">
            <div class="text a" v-text="title"></div>
        </div>
        <div class="--h50"></div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        props: {
            title: {
                type: String,
                default: '默认值'
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "~@/stylus/var"
    .head-content
        z-index 10
        position fixed
        top 0
        left 0
        right 0
        width 16rem
        height 49px
        margin 0 auto
        background-color white
        border-bottom 1px solid $cLine1
        .text
            line-height 49px
            color $cMain1
            font bold 18px / 49px $fFamily
            text-align center
</style>