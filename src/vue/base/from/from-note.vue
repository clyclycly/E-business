<!--
    支持三个个props参数
      1 :placeholder    表示占位符（即input默认值）
      1 :user    表示电话
      1 :captchaImage   表示验证码

    支持三个emit事件
      1 input(支持用v-model直接接收)      value（input输入框的值）           修改input值时触发
      2 emitCaptchaNote                 只是触发没有value                  发送短信时触发
      3 emitPromptTextA                 提示                              发送短信时触发
-->
<!---->
<template>
    <div class="from-note">
        <!-- 短信输入框 -->
        <input class="content" type="text" ref="INPUT" :placeholder="placeholder"
               @input="input($event.target.value)"
               @focus="focus"
               @blur="blur">
        <!-- 小叉 remove -->
        <i class="remove fa-close" v-show="removeSwitch" @click="remove" ref="REMOVE"></i>
        <!-- 发送短信 send-->
        <div class="send" @click="sendNote" ref="SENDNOTE">发送短信</div>
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
            },
            user: {
                type: String,
                default: ''
            },
            captchaImage: {
                type: String,
                default: ''
            }
        },
        /* 属性 */
        data() {
            return {
                count: 60, // 发送短信间隔
                inputValue: '',
                removeSwitch: false // 小叉开关
            }
        },
        /* 摧毁 */
        beforeDestroy() {
            clearInterval(this.timer);
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
            /* 小叉 */
            remove() {
                this.$refs.INPUT.value = ''
                this.$refs.SENDNOTE.style.color = '#999'
                this.$emit('input', '')
            },
            /* value值变化的时候 */
            input(value) {
                this.$emit('input', value)
                this.inputValue = value
            },
            /* 发送短信 */
            sendNote() {
                /* 判断输入信息格式 */
                if ((this.user.length !== 11) || !(/^\d+$/.test(this.user))) {
                    this.$emit('emitPromptTextA', ['手机号格式错误'])
                    return
                }
                else if (this.captchaImage.length !== 4) {
                    this.$emit('emitPromptTextA', ['图形验证码格式错误'])
                    return
                }
                /* 短信倒计时功能 */
                clearInterval(this.timer)  // clear清除定时器，每次点击先清除，不然定时器太多
                this.timer = setInterval(this.sendNoteCompute, 1000)  // 执行60次下面的函数
            },
            /* 发送短信计算 */
            sendNoteCompute() {
                if (this.count === 60) {
                    console.log('60秒后可重新发送短信')
                    this.$emit('emitCaptchaNote')
                }
                this.count--
                if (this.count >= 0) {
                    this.$refs.SENDNOTE.innerHTML = this.count + '秒'
                    this.$refs.SENDNOTE.style.color = 'rgba(255,134,113,0.8)'
                }
                else {
                    this.$refs.SENDNOTE.innerHTML = '重新获取'
                    this.$refs.SENDNOTE.style.color = 'rgba(255,134,113,0.8)'
                    clearInterval(this.timer) // 第0秒清除定时器，以免无线循环
                    this.count = 60
                }
            }
        }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import '~@/stylus/var'

    .from-note
        position relative
        height 40px
        font-size 0
        /* 短信输入框 */
        .content
            padding 10px 125px 10px 1em
            font normal 14px / 20px $fFamily
        /* 小叉 */
        .remove
            position absolute
            top 0
            right 80px
            width 30px
            height 40px
            font normal 14px / 40px $fFamily
            color $cText2
            text-align center
        /* 发送短信 */
        .send
            position absolute
            top 0
            right 18px
            width 60px
            color rgb(170, 170, 170)
            font normal 14px / 40px $fFamily
            text-align center
</style>
