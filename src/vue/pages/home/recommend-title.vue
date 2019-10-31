<template>
    <div class="recommend-title-wrapper">
        <div v-text="msg"></div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        props: {
            msg: {
                type: String,
                default: ''
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "~@/stylus/var"

    .recommend-title-wrapper
        padding 0 15px
        font bold 14px / 46px $fFamily
        background-color white
</style>
