<template>
    <div v-if="selectSiteSwitch">
        <div class="select-site-a">
            <div class="item">
                <div class="text" :class="{hook:index===provinceNumber}" v-for='(item,index) in msg'
                     @click="a(index,item.name)"
                     v-html="item.name">
                </div>
            </div>
            <div class="item" v-if="provinceSwitch">
                <div class="text" :class="{hook:index===cityNumber}" v-for='(item,index) in msg[provinceNumber].city'
                     @click="b(index,item.name)"
                     v-html="item.name"></div>
            </div>
            <div class="item" v-if="citySwitch">
                <div class="text" v-for='(item) in msg[provinceNumber].city[cityNumber].area' @click="c(item)"
                     v-html="item"></div>
            </div>
        </div>
        <div class="background" @click="hide"></div>
    </div>
</template>
<script type='text/ecmascript-6'>
    import msg from './siteJson'

    export default {
        data() {
            return {
                selectSiteSwitch: false,
                msg: [
                    /*{
                        "name": "四川省",
                        "city": [
                            {
                                "name": "成都市",
                                "area": [
                                    "青羊区",
                                    "锦江区",
                                    "金牛区",
                                    "其他"
                                ]
                            }
                        ]
                    }*/
                ],
                province: '',
                provinceNumber: '',
                provinceSwitch: false,
                city: '',
                cityNumber: '',
                citySwitch: false,
            }
        },
        created() {
            this.msg = msg
        },
        methods: {
            a(index, name) {
                this.province = name
                this.provinceNumber = index
                this.citySwitch = false
                this.provinceSwitch = true
            },
            b(index, name) {
                this.city = name
                this.cityNumber = index
                this.citySwitch = true
            },
            c(name) {
                this.$emit('emitSite', this.province + this.city + name)
                this.hide()
            },
            /* 取消 */
            cancel() {
                this.hide()
            },
            /* 显示 */
            show() {
                this.selectSiteSwitch = true
            },
            /* 隐藏 */
            hide() {
                this.selectSiteSwitch = false
            }
        }
    }
</script>

<style lang='stylus' rel='stylesheet/stylus' scoped>
    @import "~@/stylus/var"

    .select-site-a
        z-index 50
        position fixed
        left 0
        right 0
        bottom 0
        margin 0 auto
        padding 20px 0
        width 16rem
        font-size 0
        background-color white
        .item
            display inline-block
            width 33.33%
            height 10rem
            font-size 14px
            text-align center
            vertical-align top
            overflow scroll
            .text
                height 40px
                line-height 40px
                &.hook
                    font-weight bold
                    color $cMain1

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