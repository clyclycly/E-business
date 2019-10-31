<template>
    <div>
        <!-- header -->
        <Head :title="'我的账号'"></Head>
        <!-- 头像 -->
        <div class="avatar --line-bottom">
            <span class="left" v-text="'头像'"></span>
            <span class="icon  fa-angle-right"></span>
            <FunctionPhotoA class="photo" :url="avatar" @photoBase64="photoBase64"></FunctionPhotoA>
        </div>
        <!-- 用户名 -->
        <div class="--line-bottom" @click="commentPromptMessage">
            <BarBilateralA :msg="[ '用户名', username]"></BarBilateralA>
        </div>
        <!-- 手机号 -->
        <div class="--line-bottom" @click="commentPromptMessage">
            <BarBilateralA :msg="['手机号',phone]"></BarBilateralA>
        </div>
        <!-- 账户密码 -->
        <div class="--line-bottom" @click="commentPromptMessage">
            <BarBilateralA  :msg="['账户密码', '修改']"></BarBilateralA>
        </div>
        <!-- 注销 -->
        <div @click="commentPromptMessage">
            <BarBilateralA  :msg="['注销账户', '注销后无法恢复，请谨慎操作']"></BarBilateralA>
        </div>
        <div class="quit" @click="quit()">退出登录</div>
        <div class="--h80"></div>
        <!-- select message a -->
        <SelectMessageA ref="SELECTMESSAGEA"></SelectMessageA>
    </div>
</template>

<script type="text/ecmascript-6">
    import Head from '@/vue/base/head/head.vue'
    import FunctionPhotoA from '@/vue/base/function/photo-a'
    import SelectMessageA from '@/vue/base/select/select-message-a'
    import BarBilateralA from '@/vue/base/bar/bar-bilateral-a'
    import {userChangeAvatar, userQuitLogin} from '@/api/user'

    export default {
        data() {
            return {
                phone: JSON.parse(localStorage.userInfo).content[0].phone,
                avatar: JSON.parse(localStorage.userInfo).content[0].avatar,
                username: JSON.parse(localStorage.userInfo).content[0].username
            }
        },
        methods: {
            commentPromptMessage() {
                this.$refs.SELECTMESSAGEA.Promise('公共版本，防止破坏，暂不开通！')
            },
            photoBase64(photoBase64) {
                /* 请求接口 */
                this.$emit('emitLoadingA')
                userChangeAvatar(
                    JSON.parse(localStorage.userInfo).content[0].uid,
                    photoBase64
                ).then(res => {
                    if (res.code === common.code.errOk) {
                        const userInfoMap = JSON.parse(localStorage.userInfo)
                        userInfoMap.content[0].avatar = res.content
                        localStorage.userInfo = JSON.stringify(userInfoMap)
                        this.$emit('emitPromptTextA', ['修改头像成功'])
                        this.$emit('emitNone')
                    }
                    else if (res.code === code.nonentity) {
                        this.$emit('emitNull')
                    }
                    else if (res.code === code.notLogin) {
                        this.$emit('emitNotLogin')
                    }
                    else {
                        this.$emit('emitPromptTextA', ['错误提示：' + res.code])
                        this.$emit('emitNone')
                    }
                })
            },
            quit() {
                this.$refs.SELECTMESSAGEA.Promise('确定退出吗？').then(() => {
                    userQuitLogin().then(res => {
                        if (res.code === common.code.errOk) {
                            localStorage.userInfo = ''
                            this.$router.push({path: '/my'})
                        }
                        else if (res.code === code.nonentity) {
                            this.$emit('emitNull')
                        }
                        else if (res.code === code.notLogin) {
                            this.$emit('emitNotLogin')
                        }
                        else {
                            this.$refs.TRXTPROMPT.textPromptController('错误提示：' + res.code)
                            this.$emit('emitNone')
                        }
                    })
                })
            }
        },
        components: {
            Head,
            FunctionPhotoA,
            BarBilateralA,
            SelectMessageA
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import '~@/stylus/var'

    .avatar
        margin-top 20px
        padding 10px 15px
        height 50px
        background-color white
        .left
            float left
            padding-top 18px
            font-size 14px
        .photo
            float right
            margin-right 10px
            width 50px
            border-radius 25px
            overflow hidden
        .icon
            display block
            float right
            margin-top 20px
            height 20px
            font-size 14px
            color #ddd
    .quit
        margin 100px 15px 0 15px
        line-height 44px
        font-size 18px
        color #ffffff
        text-align center
        border-radius 5px
        background-color $cMain1
</style>