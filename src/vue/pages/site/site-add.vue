<template>
    <div>
        <!-- header -->
        <Head :title="'添加地址'"></Head>
        <!-- 收货人 -->
        <fromText class="--line-bottom --mt20" :placeholder="'收货人（请输入2到16个字符）'" v-model="name"></fromText>
        <!-- phone -->
        <fromText :placeholder="'联系电话'" v-model="phone"></fromText>
        <!-- selectSite -->
        <div class="--line-bottom --mt20" @click="selectCity">
            <BarBilateralA :msg="['所在地区',city]"></BarBilateralA>
        </div>
        <!-- detailedSite  -->
        <textarea class="--fs14 --pt20 --pb20" rows="2" placeholder="详细地址（请输入6到60个字符）" v-model="detailedSite">
        </textarea>
        <!-- defaultSite -->
        <div class="site-default" @click="setDefaultSite">
            <div class="l">设为默认</div>
            <i class="r fa-check-square" :class="{hook:defaultSiteSwitch}"></i>
        </div>
        <!-- submit -->
        <div class="site-submit --line-top" @click="submit" v-text="'保存'"></div>
        <!-- SelectSiteB -->
        <SelectSiteB ref="SELECTSITEB" @emitSite="emitSite"></SelectSiteB>
        <div style="font-size: 12px;margin-left: 20px;line-height: 20px;padding-bottom: 50px;margin-top: 20px">
            地址是本地版，我没建数据库
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import Head from '@/vue/base/head/head'
    import FromText from '@/vue/base/from/from-text'
    import BarBilateralA from '@/vue/base/bar/bar-bilateral-a'
    import SelectSiteB from '@/vue/base/select/select-site-b'
    import {siteAdd} from '@/api/site'

    export default {
        data() {
            return {
                name: '', // 名字
                phone: '', // 电话
                defaultSiteSwitch: false, // 默认地址开关
                city: '请选择', // 地址
                detailedSite: '' // 详细地址
            }
        },
        methods: {
            selectCity() {
                this.$refs.SELECTSITEB.show()
            },
            emitSite(arg) {
                this.city = arg
            },
            setDefaultSite() {
                this.defaultSiteSwitch === false ? this.defaultSiteSwitch = true : this.defaultSiteSwitch = false;
            },
            /* 提交 */
            submit() {
                if (this.name.length < 2 || this.name.length > 16) {
                    this.$emit('emitPromptTextA', ['收货人格式错误'])
                }
                else if (!(this.phone.length === 11) || !/^\d+$/.test(this.phone)) {
                    this.$emit('emitPromptTextA', ['手机号格式错误'])
                }
                else if (this.city === '请选择') {
                    this.$emit('emitPromptTextA', ['请选择所在地区'])
                }
                else if (this.detailedSite.length < 6 || this.detailedSite.length > 60) {
                    this.$emit('emitPromptTextA', ['收货人地址格式为6-60个字符限制'])
                }
                else {
                    const site = this.city + '——' + this.detailedSite
                    this.$emit('emitLoadingA')
                    siteAdd(
                        JSON.parse(localStorage.userInfo).content[0].uid,
                        this.name,
                        this.phone,
                        site,
                        this.defaultSiteSwitch
                    ).then(res => {
                        if (res.code === common.code.errOk) {
                            this.$emit('emitNone')
                            history.go(-1)
                        }
                        else if (res.code === common.code.nonentity) {
                            this.$emit('emitNull')
                        }
                        else if (res.code === common.code.notLogin) {
                            this.$emit('emitNotLogin')
                        }
                        else {
                            this.$emit('emitPromptTextA', ['错误提示：' + res.code])
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
            BarBilateralA,
            SelectSiteB
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "~@/stylus/var"

    /* 默认地址 */
    .site-default
        display flex
        margin-top 20px
        padding 13px 1em
        font-size 14px
        color rgb(118, 118, 118)
        background-color white
        .l, .r
            flex 1
        .r
            text-align right
            &.hook
                color $cMain1

    /* 保存地址 */
    .site-submit
        margin 80px 18px 20px 18px
        height 40px
        line-height 40px
        font-size 18px
        text-align center
        color white
        border-radius 5px
        background-color $cMain1
</style>