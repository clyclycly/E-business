<template>
    <div v-if="promptSiteSwitch">
        <ul class="select-site-b">
            <li class="site-item" v-for="item in msg" @click="siteChoice(item)">
                <!-- 详细信息 -->
                <div class="site-item-top">
                    <!-- 联系方式（包括姓名） -->
                    <div class="contact-way">
                        <span class="contact-way-name" v-text="item.name"></span>
                        <span class="contact-way-phone" v-text="item.phone"></span>
                    </div>
                    <!-- 详细地址 -->
                    <div class="detail-site" v-text="item.detailSite"></div>
                </div>
                <!-- 地址管理 -->
                <div class="site-item-bottom">
                    <!-- 是否默认左 -->
                    <div class="site-item-default" :class="{hook:item.tag}">
                        <i class="icon fa fa-check-square"></i>
                        <span>点击选择</span>
                    </div>
                </div>
            </li>
        </ul>
        <router-link class="bottom" to="/setting" tag="div">新增地址</router-link>
        <div class="background" @click="hide"></div>
    </div>
</template>

<script type="text/ecmascript-6">
    import {site} from '@/api/site'

    export default {
        data() {
            return {
                /* 开关 */
                promptSiteSwitch: false,
                /* 地址数据 */
                msg: [
                    /*{
                        siteId: '1',
                        name: '李白',
                        phone: '12345678910',
                        detailSite: '陕西省西安市雁塔区澳城大厦—2号楼1单元802'
                    },
                    {
                        siteId: '2',
                        name: '李白的老婆',
                        phone: '12345600000',
                        detailSite: '陕西省西安市雁塔区澳城大厦—2号楼1单元802',
                        tag: 1
                    }*/
                ]
            }
        },
        methods: {
            /* 映射sites */
            mapMsg() {
                /* 请求接口 */
                let msgMap = []
                this.$emit('emitLoginA')
                site(JSON.parse(localStorage.userInfo).content[0].uid)
                    .then((res) => {
                        if (res.code === common.code.errOk) {
                            for (let i = 0; i < res.content.length; i++) {
                                msgMap.push(
                                    {
                                        siteId: res.content[i].siteId,
                                        name: res.content[i].name,
                                        phone: res.content[i].phone,
                                        detailSite: res.content[i].site,
                                        tag: res.content[i]._default
                                    }
                                )
                            }
                            this.msg = msgMap
                            this.$emit('emitNone')
                        }
                        else if (res.code === common.code.nonentity) {
                            this.$router.push({path: '/site-add'})
                            this.$emit('emitNone')
                        }
                        else if (res.code === common.code.notLogin) {
                            this.$emit('emitNotLogin')
                        }
                        else {
                            this.$emit('emitPromptTextA', ['错误提示：' + res.code])
                        }
                    })
            },
            /* 显示 */
            show() {
                /* 调用映射地址接口 */
                this.mapMsg()
                this.promptSiteSwitch = true
            },
            /* 隐藏 */
            hide() {
                this.promptSiteSwitch = false
            },
            /* 选择 */
            siteChoice(arg) {
                this.hide()
                this.$emit('emitSite', arg)
            }
        },
        created() {
            this.mapMsg()
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "~@/stylus/var"

    .select-site-b
        z-index 50
        position fixed
        left 0
        right 0
        bottom 50px
        margin 0 auto
        padding 15px 0 10px 0
        width 16rem
        font-size 14px
        background-color white
        /* 姓名 电话 详细地址 */
        .site-item-top
            margin 0 18px
            /* 联系方式（包括姓名） */
            .contact-way
                height 28px
                padding-top 8px
                line-height 28px
                .contact-way-name
                    float left
                .contact-way-phone
                    float right
                    color $cText2
            /* 详细地址 */
            .detail-site
                line-height 28px
        /* 地址管理 */
        .site-item-bottom
            margin 0 18px
            height 40px
            line-height 40px
            /* 默认 */
            .site-item-default
                float left
                .icon
                    color $cText1
            /* 修改删除 */
            .site-item-manage
                float right
                .manage-change, .manage-delete
                    padding-left 10px
                    display inline-block
                    .icon
                        color $cText2

    .bottom
        z-index 100
        position fixed
        bottom 0
        left 0
        right 0
        width 16rem
        margin 0 auto
        text-align center
        font-size 18px
        height 50px
        line-height 50px
        color $color-main
        border-top 1px solid $color-line
        background-color white

    .background
        z-index 49
        position fixed
        top 0
        right 0
        bottom 0
        left 0
        width 16rem
        margin 0 auto
        background-color rgba(7, 17, 27, 0.4)
</style>