<!--
    支持3个参数
        1 prompt-text        提示文字（默认请输入提示文字），这个地方可以不要这个参数
        2 promptLocation     组件位置（支持top，centre，bottom 3个值,默认bottom）
        3 _time              时间（默认3000）
-->
<template>
    <div class="prompt-text-a" v-show="promptTextSwitch" :class="promptLocation" v-html="promptText"></div>
</template>

<script type="text/ecmascript-6">
    export default {
        data() {
            return {
                /* 文字提示开关 */
                promptTextSwitch: false,
                /* 提示文字 */
                promptText: '',
                /* 提示位置 */
                promptLocation: ''
            }
        },
        methods: {
            /* 文字提示控制器 */
            promptTextControllerA(promptText, promptLocation, _time) {
                let time = _time
                this.promptText = promptText
                this.promptLocation = promptLocation
                promptText === undefined ? this.promptLocation = '请输入提示文字' : false;
                promptLocation === undefined ? this.promptLocation = 'bottom' : false;
                time === undefined ? time = 3000 : false; // 默认时间
                this.promptTextSwitch = true // 显示组件
                setTimeout(() => {
                    this.promptTextSwitch = false // 关闭组件
                }, time)
            }
        },

        computed: {}
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import '~@/stylus/var'
    .prompt-text-a
        z-index 100
        position fixed
        left 50%
        padding 8px 18px
        color white
        font normal 12px / 18px $fFamily
        background-color rgba(0, 0, 0, 0.4)
        border-radius 8px
        transform translate3d(-50%, -50%, 0)
        &.top
            top 20%
        &.centre
            top 50%
        &.bottom
            top 90%
</style>
