<!-- bilateral两边的，左边深色 -->
<template>
    <div class="from-bilateral --clear-fix">
        <span class="left" v-text="msg[0]"></span>
        <span class="right" v-text="msg[1]"></span>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        props: {
            msg: {
                type: Array,
                default() {
                    return ['手机号', '13541999999']
                }
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

    .from-bilateral
        padding 0 15px
        height 40px
        line-height 40px
        background-color white
        .left
            float left
            font-size 14px
            color $color-dark
        .right
            float right
            text-indent 20px
            color $color-light
            font-size 14px
</style>
