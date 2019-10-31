<template>
    <div class="select-message" v-if="messageSwitch">
        <div class="content">
            <!-- 上 -->
            <div class="title">提示</div>
            <!-- 中 -->
            <div class="text --line-bottom" v-text="messageContent">你确定吗？</div>
            <!-- 下 -->
            <div class="btn --top-line">
                <span class="btn-cancel --line-right" @click="cancel">取消</span>
                <span class="btn-confirm" @click="confirm">确定</span>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data() {
            return {
                messageContent: '', /* 文本提示框内容 */
                messageSwitch: false // 控制显示隐藏
            }
        },
        methods: {
            /* Promise (回调) */
            Promise(messageContent) {
                this.messageContent = messageContent
                if (messageContent === undefined) {
                    this.messageContent = '你确定吗？' // 没传值的情况(默认情况中间的文字)
                }
                this.messageSwitch = true // 显示组件
                this.promise = new Promise((resolve, reject) => {
                    this.resolve = resolve // 绑定在vm上
                    this.reject = reject
                })
                return this.promise   //  返回对象
            },
            /* 确定 */
            confirm() {
                this.messageSwitch = false
                this.resolve()
            },
            /* 取消 */
            cancel() {
                this.messageSwitch = false
                this.reject()
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "~@/stylus/var"
    .select-message
        z-index 50
        position fixed
        left 0
        right 0
        top 0
        bottom 0
        width 100%
        margin 0 auto
        background-color rgba(7, 17, 27, 0.4)
        .content
            position absolute
            left 50%
            top 50%
            width 80%
            max-width 320px
            background-color white
            transform translate3d(-50%, -50%, 0)
            /* 上中下  */
            .title, .text, .btn
                color $cText1
                font normal 14px / 40px $fFamily
                text-align center
            /* 中 */
            .text
                padding 5px 10px 10px 10px
            /* 下 */
            .btn
                display flex
                font-size 14px
                .btn-cancel, .btn-confirm
                    flex 1
                .btn-confirm
                    color $cMain1
</style>
