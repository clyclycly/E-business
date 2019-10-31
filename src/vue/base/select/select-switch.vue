<template>
    <div class="select-switch">
        <div class="content --clearFix">
            <span class="left" v-html="text"></span>
            <span class="right" :class="{hook: offOn}" @click="set()"></span>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">

    export default {
        data() {
            return {
                offOn: 0
            }
        },
        props: {
            text: {
                type: String,
                default: '隐藏位置信息'
            }
        },
        methods: {
            set() {
                if (this.offOn === 0) {
                    this.offOn = 1
                } else {
                    this.offOn = 0
                }
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

    .select-switch
        .content
            padding 0 15px
            height 45px
            line-height 45px
            background-color white
            .left
                float left
                font-size 16px
                color $color-dark
            .right
                margin-top 10px
                display block
                float right
                width 42px
                height 28px
                background url("select-switch-开.png") no-repeat
                background-size 42px 28px
                &.hook
                    background url("select-switch-关.png") no-repeat
                    background-size 42px 28px
</style>
