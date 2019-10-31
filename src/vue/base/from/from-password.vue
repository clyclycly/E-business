<template>
    <div class="from-password">
        <!-- password输入框 -->
        <input class="content" type="password" :placeholder="placeholder" ref="INPUT"
               @input="input($event.target.value)" @focus="focus" @blur="blur">
        <!-- 小叉 -->
        <i v-show="removeSwitch" class="remove  fa-close" @click="remove" ref="REMOVE"></i>
        <!-- 眼睛 -->
        <i v-show="removeSwitch" class="eye fa-eye" @click="eye" ref="EYE"></i>
    </div>
</template>
<script>
    export default {
        /* 数据传递 */
        props: {
            /* placeholder 占位符 */
            placeholder: {
                type: String,
                default: ''
            }
        },
        /* 属性 */
        data() {
            return {
                removeSwitch: false, // 小叉开关
                eyeSwitch: true // 眼睛开关
            }
        },
        /* 方法 */
        methods: {
            /* 获取光标 */
            focus() {
                this.removeSwitch = true
            },
            /* 失去光标 */
            blur() {
                setTimeout(() => {
                    this.removeSwitch = false
                }, 200)
            },
            /* value值变化的时候 */
            input(value) {
                this.$emit('input', value)
            },
            /* 小叉 */
            remove() {
                this.$refs.INPUT.value = ''
                this.$emit('input', '')
            },
            /* 眼睛 */
            eye() {
                if (this.eyeSwitch) {
                    this.$refs.INPUT.type = 'text'
                    this.$refs.EYE.style.color = '#333'
                    this.eyeSwitch = false
                } else {
                    this.$refs.INPUT.type = 'password'
                    this.$refs.EYE.style.color = '#ddd'
                    this.eyeSwitch = true
                }
            }
        }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import '~@/stylus/var'

    .from-password
        position relative
        height 40px
        font-size 0
        .content
            padding 10px 60px 10px 1em
            font normal 14px / 20px $fFamily
        /* 小叉与眼睛 */
        .remove, .eye
            position absolute
            top 0
            right 10px
            width 30px
            font normal 12px / 40px $fFamily
            color $cText3
            text-align center
        /* 眼睛 */
        .remove
            right 40px
</style>
