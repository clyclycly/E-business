<template>
    <div>
        <!-- header -->
        <Head :title="'我的'"></Head>
        <!-- 个人信息已登录 -->
        <router-link class="personal-information" to="/my-account" tag="div" v-if="userInfoSwitch">
            <img class="avatar" :src="userInfo.avatar" alt="">
            <div class="content">
                <div class="name" v-text="userInfo.name"></div>
                <div class="uid" v-html="'ID:' + userInfo.uid"></div>
            </div>
            <div class="right fa-angle-right"></div>
        </router-link>
        <!-- 个人信息未登录 -->
        <router-link class="personal-information" to="/login-password" tag="div" v-if="!userInfoSwitch">
            <img class="avatar" src="./未登录.jpg" alt="">
            <div class="content2" v-text="'登录/注册'"></div>
            <div class="right fa-angle-right"></div>
        </router-link>
        <!-- 收货地址 -->
        <div class="item --mt20">
            <router-link class="box --line-bottom" to="/site" tag="div">
                <img class="img" src="./收货地址.png" alt="">
                <span class="span">收货地址</span>
            </router-link>
        </div>
        <!-- 在线客服 -->
        <div class="item">
            <div class="box --line-bottom" @click="selectMessage">  <!--commentPromptMessage-->
                <img class="img" src="./在线客服.png" alt="">
                <span class="span">在线客服</span>
            </div>
        </div>
        <!-- 设置 -->
        <div class="item --mt20 --mb50">
            <router-link class="box" to="/setting" tag="div">
                <img class="img" src="./设置.png" alt="">
                <span class="span">设置</span>
            </router-link>
        </div>
        <!-- foot -->
        <Foot></Foot>
        <!-- select message a -->
        <SelectMessageA ref="SELECTMESSAGEA"></SelectMessageA>
    </div>
</template>

<script type="text/ecmascript-6">
    import Head from '@/vue/base/head/head.vue'
    import Foot from '@/vue/base/foot/foot.vue'
    import SelectMessageA from '@/vue/base/select/select-message-a'


    export default {
        data() {
            return {
                /* 个人信息开关 */
                userInfoSwitch: false,
                /* 个人信息 */
                userInfo: {
                    /*name: '马化腾',
                    avatar: 'http://static.galileo.xiaojukeji.com/static/tms/seller_avatar_256px.jpg',
                    uid: '123456788'*/
                }
            }
        },
        methods: {
            selectMessage() {
                this.$refs.SELECTMESSAGEA.Promise('暂未开通！')
            }
        },
        created() {
            if (localStorage.userInfo) {
                let userInfoMap = {}
                userInfoMap.name = JSON.parse(localStorage.userInfo).content[0].username
                userInfoMap.avatar = JSON.parse(localStorage.userInfo).content[0].avatar
                userInfoMap.uid = JSON.parse(localStorage.userInfo).content[0].uid
                this.userInfo = userInfoMap
                this.userInfoSwitch = true
            }
            else {
                this.userInfoSwitch = false
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
            Foot,
            SelectMessageA
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import '~@/stylus/var'
    /* 个人信息 */
    .personal-information
        padding 25px 0 15px 12px
        height 60px
        font-size 0
        background-color white
        /* 头像 */
        .avatar
            display inline-block
            vertical-align top
            margin-right 15px
            width 60px
            height 60px
            border-radius 30px
        /* 已登录内容 */
        .content
            display inline-block
            vertical-align top
            font-size 0
            .name
                margin-top 10px
                font-size 18px
            .uid
                margin-top 10px
                font-size 14px
        /* 未登录内容 */
        .content2
            display inline-block
            line-height 60px
            font-size 17px
        /* 大于号 */
        .right
            float right
            padding-right 20px
            height 60px
            line-height 60px
            font-size 20px
            color $cText3

    .item
        background-color white
        line-height 25px
        .box
            margin 0 15px
            padding 10px 0
            .img
                display inline-block
                vertical-align top
                width 24px
            .span
                display inline-block
                vertical-align top
                font-size 18px
</style>