<template>
    <div class="from-text">
        <input class="content" type="text" ref="INPUT" :placeholder="placeholder"
               @input="input($event.target.value)"
               @focus="focus"
               @blur="blur">
        <i v-show="removeSwitch" class="remove fa fa-close" @click="remove"></i>
    </div>
</template>
<script>
    export default {
        props: {
            placeholder: {
                type: String,
                default: ''
            }
        },
        /* 属性 */
        data() {
            return {
                removeSwitch: false // 小叉开关
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
                // 解决先失去关标光标事件在点击事件不存在问题
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
            }
        }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import '~@/stylus/var'

    .from-text
        position relative
        height 40px
        font-size 0
        /* content*/
        .content
            padding 10px 40px 10px 1em
            font normal 14px / 20px $fFamily
        /* remove */
        .remove
            position absolute
            top 0
            right 10px
            width 30px
            font normal 14px / 40px $fFamily
            font-size 12px
            color $cTextw
            text-align center
</style>
