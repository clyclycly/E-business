<template>
    <div>
        <!-- header -->
        <Head :title="'注册'"></Head>
        <!-- user -->
        <FromText class="--mt20 --line-bottom" :placeholder="'请输入手机号'"></FromText>
        <div class="captcha-image --line-bottom --mb20">
            <input class="captcha-image-input" v-model="captchaImage" :placeholder="'请输入图片验证码'">
            <div class="svg" @click="mapCaptchaImage()" v-html="svg"></div>
        </div>
        <!-- password -->
        <fromPassword class="--line-bottom" :placeholder="'请输入6到12位密码'" v-model="passwordB"></fromPassword>
        <fromPassword class="--line-bottom --mb20" :placeholder="'再次输入密码'" v-model="passwordA"></fromPassword>
        <fromNote ref="NOTEFROM" class="--mb50" v-model="captchaNode"
                  @emitCaptchaNote="emitCaptchaNote"
                  @emitPromptTextA="emitPromptTextA"
                  :placeholder="'验证码'"
                  :user="user"
                  :captchaImage="captchaImage">
        </fromNote>
        <!-- skip-button -->
        <div class="skip-button hook" @click="submit" v-text="'注册'"></div>
        <router-link class="skip-button" tag="div" to="/login-password" v-text="'密码登录'"></router-link>
        <router-link class="skip-button" tag="div" to="/login-note" v-text="'短信登录'"></router-link>

    </div>
</template>

<script type="text/ecmascript-6">
    import Head from '@/vue/base/head/head.vue'
    import FromText from '@/vue/base/from/from-text'
    import FromPassword from '@/vue/base/from/from-Password'
    import FromNote from '@/vue/base/from/from-note'
    import {userNew} from '@/api/user'
    import {captchaNote, captchaImage} from '@/api/captcha'
    import {passwordMd5, svgMd5, noteMd5} from '@/js/md5'

    export default {
        data() {
            return {
                user: '', // 手机号
                passwordA: '',
                passwordB: '',
                svg: '', // svg
                captchaNode: '', // 短信验证码
                captchaImage: '' // 图形验证码
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
                else if (this.password !== this.password2) {
                    this.$emit('emitPromptTextA', ['两次密码不一致'])
                }
                else if (this.password.length < 6 || this.password.length > 12) {
                    this.$emit('emitPromptTextA', ['请输入6到12位密码'])
                }
                else {
                    let password = passwordMd5(this.password)
                    let captchaNode = noteMd5(this.captchaNode)
                    this.$emit('emitLoadingA')
                    userNew(this.user, password, captchaNode).then(res => {
                        if (res.code === common.code.errOk) {
                            localStorage.userInfo = JSON.stringify(res)
                            this.$emit('emitNone')
                            history.go(-1)
                        }
                        else if (res.code === code.nonentity) {
                            this.$emit('emitPromptTextA', ['用户名或者密码错误'])
                            this.$emit('emitNone')
                        }
                        else {
                            this.$emit('emitPromptTextA', ['错误提示' + res.code])
                            this.$emit('emitNone')
                            this.mapCaptchaImage()
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
            FromPassword,
            FromNote
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import '~@/stylus/var'

    /* 图片验证码 */
    .captcha-image
        position relative
        height 40px
        .captcha-image-input
            height 40px
            font normal 14px / 40px $fFamily
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