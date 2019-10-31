<!--ie 10-->
<template>
    <div>
        <div class="content">
            <router-link class="item home" tag="div" to="/home" replace>
                <div class="icon"></div>
                <div class="text">首页</div>
            </router-link>
            <!-- 订单 -->
            <router-link class="item order" tag="div" to="/order" replace>
                <div class="icon"></div>
                <div class="text">订单</div>
            </router-link>
            <!-- 我的 -->
            <router-link class="item my" tag="div" to="/my" replace>
                <div class="icon"></div>
                <div class="text">我</div>
            </router-link>
        </div>
        <div class="shim"></div>
    </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import '~@/stylus/var'

    .content
        z-index 10
        position fixed
        left 0
        bottom 0
        right 0
        background-color white
        width 16rem
        margin 0 auto
        display flex
        font-size 0
        .item
            border-top 1px solid $cLine1
            padding-top 5px
            padding-bottom 7px
            flex 1
            text-align center
            .icon
                background-repeat no-repeat
                background-position 50% 50%
                background-size 28px 28px
                margin 0 auto
                width 32px
                height 32px
                border-radius 2px
            .text
                font-size 12px
            &.home
                .icon
                    background-image url('./首页.png')
            &.order
                .icon
                    background-image url('./订单.png')
            &.my
                .icon
                    background-image url('./我.png')
            /* current router */
            &.router-link-active.home
                .icon
                    background-image url('./首页-点击.png')
                .text
                    color $cMain1
            &.router-link-active.order
                .icon
                    background-image url('./订单-点击.png')
                .text
                    color $cMain1
            &.router-link-active.my
                .icon
                    background-image url('./我-点击.png')
                .text
                    color $cMain1

    .shim
        height 58px
</style>