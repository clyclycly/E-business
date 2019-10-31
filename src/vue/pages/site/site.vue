<template>
    <div>
        <!-- header -->
        <Head :title="'收货地址'"></Head>
        <ul class="--mb50">
            <li class="site-item" v-for="(item,index) in sites" :key="index">
                <!-- 上 -->
                <div class="top">
                    <span class="name" v-text="item.name"></span>
                    <span class="phone" v-text="item.phone"></span>
                </div>
                <!-- 中 -->
                <div class="middle" v-text="item.detailSite"></div>
                <!-- 下 -->
                <div class="bottom">
                    <!-- 设置默认 -->
                    <div class="default" :class="{hook:item.tag}">
                        <i class="icon fa fa-check-square"></i>
                        <span v-show="!(item.tag)" @click="siteDefault(item.siteId)">设为默认</span>
                        <span v-show="item.tag">默认地址</span>
                    </div>
                    <!-- 修改与删除 -->
                    <div class="manage">
                        <!--<div class="change" @click="siteChange">
                          <i class="icon fa fa-check-square"></i>
                          <span>修改</span>
                        </div>-->
                        <div class="delete" @click="siteDelete(item.siteId)">
                            <i class="icon fa fa-minus-square"></i>
                            <span>删除</span>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
        <router-link class="site-add" to="/site-add" tag="div">
            <div class="text" v-text="'新增地址'"></div>
            <div class="--h50"></div>
        </router-link>
        <SelectMessageA class="--line-top" ref="SELECTMESSAGEA"></SelectMessageA>
    </div>
</template>

<script type="text/ecmascript-6">
    import Head from '@/vue/base/head/head.vue'
    import SelectMessageA from '@/vue/base/select/select-message-a'
    import {site, siteDefault, siteDelete} from '@/api/site' // 地址api

    export default {
        data() {
            return {
                /* 地址数据 */
                sites: [
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
            sitesMap() {
                let sitesMap = []
                this.$emit('emitLoadingA')
                site(JSON.parse(localStorage.userInfo).content[0].uid).then(res => {
                    if (res.code === common.code.errOk) {
                        for (let i = 0; i < res.content.length; i++) {
                            sitesMap.push({
                                siteId: res.content[i].siteId,
                                name: res.content[i].name,
                                phone: res.content[i].phone,
                                detailSite: res.content[i].site,
                                tag: res.content[i]._default
                            })
                        }
                        this.sites = sitesMap
                        this.$emit('emitNone')
                    }
                    else if (res.code === common.code.nonentity) {
                        this.$emit('emitNull')
                    }
                    else if (res.code === common.code.notLogin) {
                        this.$emit('emitNotLogin')
                    }
                    else {
                        this.$emit('emitPromptTextA', ['错误提示：' + res.code])
                        this.$emit('emitError')
                    }
                })
            },
            siteDefault(siteId) {
                siteDefault(JSON.parse(localStorage.userInfo).content[0].uid, siteId).then(res => {
                    this.$emit('emitLoadingA')
                    if (res.code === common.code.errOk) {
                        this.sitesMap() // 重新渲染
                    }
                    else if (res.code === common.code.notLogin) {
                        this.$emit('emitNotLogin')
                    }
                    else {
                        this.$emit('emitPromptTextA', ['错误提示：' + res.code])
                        this.$emit('emitNone')
                    }
                })
            },
            siteDelete(siteId) {
                this.$refs.SELECTMESSAGEA.Promise('确定删除吗？').then(() => {
                    this.$emit('emitLoadingA')
                    siteDelete(JSON.parse(localStorage.userInfo).content[0].uid, siteId).then(res => {
                        if (res.code === common.code.errOk) {
                            this.sitesMap() // 重新渲染
                        }
                        else if (res.code === common.code.notLogin) {
                            this.$emit('emitNotLogin')
                        }
                        else {
                            this.$emit('emitPromptTextA', ['错误提示：' + res.code])
                            this.$emit('emitNone')
                        }
                    })
                })
            }
        },
        created() {
            this.sitesMap()
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
            SelectMessageA
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import '~@/stylus/var'

    /* 地址一则 */
    .site-item
        width 16rem
        padding 0 18px
        margin 0 0 10px 0
        font-size 14px
        background-color white
        box-sizing border-box
        /* 上 */
        .top
            height 28px
            line-height 28px
            padding-top 8px
            .name
                float left
            .phone
                float right
                color $cText2
        /* 中 */
        .middle
            line-height 28px
        /* 下 */
        .bottom
            height 40px
            line-height 40px
            /* 默认 */
            .default
                float left
                .icon
                    color $cText2
                &.hook
                    color $cMain1
                    .icon
                        color $cMain1
            /* 修改删除 */
            .manage
                float right
                .change, .delete
                    display inline-block
                    padding-left 10px
                    .icon
                        color $cText2

    /* 新增地址 */
    .site-add
        .text
            z-index 0
            position fixed
            bottom 0
            margin 0 auto
            width 16rem
            height 49px
            font-size 16px
            line-height 49px
            text-align center
            color $cMain1
            background-color white

</style>