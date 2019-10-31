<template>
    <div>
        <!-- header -->
        <Head :title="'密码登录'"></Head>
        <!-- user -->
        <FromText class="--mt20 --line-bottom" :placeholder="'请输入手机号'" v-model="user"></FromText>
        <!-- password -->
        <FromPassword class="--mb50" :placeholder="'请输入密码'" v-model="password"></FromPassword>
        <!-- skip-button -->
        <div class="skip-button hook" @click="loginPassword()" v-text="'登录'"></div>
        <router-link class="skip-button" tag="div" to="/login-note" v-text="'短信登录'"></router-link>
        <router-link class="skip-button" tag="div" to="/new" v-text="'注册'"></router-link>

        <div style="font-size: 12px;margin-left: 20px;line-height: 20px;padding-bottom: 50px;padding-top: 50px;">
            <p style="color: rgba(255,134,113,0.8)">测试账号</p>
            <div>账号：17629284522</div>
            <div>密码：123456</div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import Head from '@/vue/base/head/head.vue'
    import FromText from '@/vue/base/from/from-text'
    import FromPassword from '@/vue/base/from/from-Password'
    import {passwordMd5} from '@/js/md5'
    import {userPasswordLogin} from '@/api/user'

    export default {
        data() {
            return {
                user: '',    // 手机号
                password: '' // 密码
            }
        },
        methods: {
            loginPassword() {
                /* 判断输入信息格式 */
                if (!(this.user.length === 11) || !(/^\d+$/.test(this.user))) {
                    this.$emit('emitPromptTextA', ['手机号格式错误'])
                }
                else if (this.password === '' || this.password.length < 6 || this.password.length > 12) {
                    this.$emit('emitPromptTextA', ['密码格式错误'])
                }
                else {
                    /* 请求接口 */
                    let password = passwordMd5(this.password)
                    this.$emit('emitLoadingA')
                    userPasswordLogin(this.user, password).then((res) => {
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
                            this.$emit('emitNone')
                        }
                    })
                }
            }
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
            FromPassword
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import '~@/stylus/var'
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