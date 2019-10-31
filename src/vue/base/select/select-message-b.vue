<template>
    <div>
        <div class="content" @click="off()">
            <span class="icon fa fa-angle-right"></span>
            <span class="left" v-text="text1[0]"></span>
            <span class="right" v-text="text1[1]"></span>
        </div>
        <div class="background" v-show="offOn" @click="on()">
            <ul class="ul">
                <li class="li" v-for="(choose,index) in text2" v-html="choose" @click="emit(choose,index)"></li>
            </ul>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data() {
            return {
                offOn: false
            }
        },
        methods: {
            emit(arg, number) {
                this.text1[1] = this.text2[number]
                this.$emit('emitChoose', arg)
            },
            off() {
                this.offOn = true
            },
            on() {
                this.offOn = false
            }
        },
        props: {
            text1: {
                type: Array,
                default() {
                    return [
                        '年龄', '请选择'
                    ]
                }
            },
            text2: {
                type: Array,
                default() {
                    return [
                        0, 1, 2, 3, 4, 5
                    ]
                }
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import '~@/stylus/var'

    .content
        padding 0 15px
        height 40px
        line-height 40px
        background-color white
        .left
            float left
            font-size 14px
        .right
            float right
            padding-right 5px
            color $cText2
            font-size 14px
        .icon
            display block
            float right
            margin-top 14px
            color $cText2
            font-size 12px

    .background
        z-index 100
        position fixed
        top 0
        left 0
        right 0
        bottom 0
        margin 0 auto
        width 100%
        background-color rgba(0, 0, 0, 0.4)
        .ul
            position absolute
            top 0
            bottom 0
            left 0
            right 0
            margin auto
            width 260px
            max-height 120px
            overflow-y scroll
            .li
                padding 0 20px
                height 40px
                line-height 40px
                text-align center
                font-size 16px
                background-color white

</style>
