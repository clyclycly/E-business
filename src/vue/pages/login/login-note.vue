<template>
    <div>
        <!-- header -->
        <Head :title="'短信登录'"></Head>
        <!-- user -->
        <FromText class="--mt20 --line-bottom" :placeholder="'请输入手机号'"></FromText>
        <!-- captcha-image -->
        <div class="captcha-image  --line-bottom">
            <input class="captcha-image-input" v-model="captchaImage" :placeholder="'请输入图片验证码'">
            <div class="svg" @click="mapCaptchaImage()" v-html="svg"></div>
        </div>
        <fromNote ref="NOTEFROM" class="--mb50" v-model="captchaNode"
                  @emitCaptchaNote="emitCaptchaNote"
                  @emitPromptTextA="emitPromptTextA"
                  :placeholder="'验证码'"
                  :user="user"
                  :captchaImage="captchaImage">
        </fromNote>
        <!-- skip-button -->
        <div class="skip-button hook" @click="submit" v-text="'登录'"></div>
        <router-link class="skip-button" tag="div" to="/login-password" v-text="'密码登录'"></router-link>
        <router-link class="skip-button" tag="div" to="/new" v-text="'注册'"></router-link>

        <div style="font-size: 12px;margin-left: 20px;line-height: 20px;padding-bottom: 50px;padding-top: 50px;">
            <p style="color: rgba(255,134,113,0.8)">如何刷短信</p>
            <div>1：Python等识别验证码的技术（成本，一个爬虫与图像学较好的做爬虫的）</div>
            <div>2：人工打码，如阳光打码（成本，和你发短信的钱差不多）</div>
            <div>3：暴力破解</div>
            <div style="margin-left: 12px">3.1：如nodejs，php等需要破解打乱的每天更新的加密，加密方式是md5</div>
            <div style="margin-left: 12px">3.2：Python点击屏幕，如不破解验证码，概率在百万分之一</div>
            <p style="color: rgba(255,134,113,0.8)">解决办法</p>
            <div>1:使用阿里云等</div>
            <div>2:增加验证码难度</div>
            <div>3:不绑定手机，通过qq等三方登录</div>
            <p style="color: rgba(255,134,113,0.8)">一共只有200条短信，群里测试的大哥们手下留情</p>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import Head from '@/vue/base/head/head.vue'
    import FromText from '@/vue/base/from/from-text'
    import FromNote from '@/vue/base/from/from-note'
    import {captchaNote, captchaImage} from '@/api/captcha'
    import {svgMd5, noteMd5} from '@/js/md5'

    export default {
        data() {
            return {
                user: '',    // 手机号
                password: '', // 密码
                captchaImage: '', // 图形验证码
                captchaNode: '', // 短信验证码
                svg: ''
            }
        },
        methods: {
            mapCaptchaImage() {
                this.$emit('emitLoadingA')
                captchaImage().then((res) => {
                    if (res.code === common.code.errOk) {
                        this.svg = res.content
                        this.$emit('emitNone')
                    }
                    else {
                        this.$refs.TRXTPROMPT.textPromptController(res.code)
                        this.$emit('emitNone')
                    }
                })
            },
            emitCaptchaNote() {
                let captchaImage = svgMd5(this.captchaImage)
                this.$emit('emitLoadingA')
                captchaNote(this.user, captchaImage).then((res) => {
                    if (res.code === common.code.errOk) {
                        this.$emit('emitPromptTextA', ['发送短信成功'])
                        this.$emit('emitNone')
                    }
                    else {
                        this.$emit('emitPromptTextA', ['错误提示' + res.code])
                        this.mapCaptchaImage()
                        this.$emit('emitNone')
                    }
                })
            },
            submit() {
                if (!(this.user.length === 11) || !(/^\d+$/.test(this.user))) {
                    this.$emit('emitPromptTextA', ['手机号格式错误'])
                }
                else if (!(this.captchaNode.length === 6) || !(/^\d+$/.test(this.captchaNode))) {
                    this.$emit('emitPromptTextA', ['短信验证码格式错误'])
                }
                else if (!(this.captchaImage.length === 4)) {
                    this.$emit('emitPromptTextA', ['图形验证码格式错误'])
                }
                else {
                    // 请求接口
                    const captchaNode = noteMd5(this.captchaNode)
                    this.$refs.STATE.stateController('emitLoadingA')
                    userNoteLogin(this.user, captchaNode).then((res) => {
                        if (res.code === common.code.errOk) {
                            this.$emit('emitNone')
                            localStorage.userInfo = JSON.stringify(res)
                            history.go(-1)
                        }
                        else if (res.code === common.code.nonentity) {
                            this.$emit('emitPromptTextA', ['用户名或者密码错误'])
                            this.$emit('emitNone')
                        }
                        else {
                            this.$emit('emitPromptTextA', ['错误提示' + res.code])
                            this.mapCaptchaImage()
                            this.$emit('emitNone')
                        }
                    })
                }
            },
            /* prompt text a */
            emitPromptTextA(array) {
                this.$emit('emitPromptTextA', array)
            }
        },
        created() {
            this.mapCaptchaImage()
        },
        beforeRouteEnter(to, from, next) {  // vue-ssr服务端
            next(vm => {
                scrollTo(0, vm.y)
            });
        },
        beforeRouteLeave(to, from, next) {
            this.y = document.documentElement.scrollTop || document.body.scrollTop
            next();
        },
        components: {
            Head,
            FromText,
            FromNote
        }
    }
</script>


<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import '~@/stylus/var'

    /* 图片验证码 */
    .captcha-image
        position relative
        height 40px
        font-size 0
        .captcha-image-input
            padding 10px 150px 10px 1em
            font normal 14px / 20px $fFamily
        .svg
            position absolute
            top 0
            right 0
            font normal 14px / 40px $fFamily

    /* skip-button */
    .skip-button
        margin 20px 18px 0 18px
        height 40px
        color $cText2
        text-align center
        font normal 18px / 40px $fFamily
        border-radius 5px
        background-color white
        &.hook
            color white
            background-color $cMain1
</style>