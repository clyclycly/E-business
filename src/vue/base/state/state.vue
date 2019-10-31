<template>
    <div class="state-wrapper" ref="STATE">
        <div v-if="style !== 'none'">
            <!-- loading A -->
            <div class="item" v-if="style === 'loadingA'">
                <div class="content">
                    <img class="img" src="./loading.gif" alt="">
                    <div class="text">等待中！</div>
                </div>
            </div>
            <!-- loading B -->
            <div class="item" v-if="style === 'loadingB'">
                <div class="content">
                    <img class="img" src="./loading.gif" alt="">
                    <div class="text">等待中！</div>
                </div>
            </div>
            <!-- not login -->
            <div class="item" v-if="style === 'notLogin'">
                <div class="content">
                    <img class="img" src="./null.png" alt="">
                    <div class="text">请重新登录！</div>
                    <div class="text" @click="login"
                         style="background-color: rgba(255,134,113,0.8);color: white;width: 120px;margin: 0 auto;border-radius: 5px;margin-top: 20px;">
                        登录
                    </div>
                </div>
            </div>
            <!-- null -->
            <div class="item" v-if="style === 'null'">
                <div class="content">
                    <img class="img" src="./null.png" alt="">
                    <div class="text">什么都没有哦！</div>
                </div>
            </div>
            <!-- error -->
            <div class="item" v-if="style === 'error'" >
                <div class="content" @click="error">
                    <img class="img" src="./error.png" alt="">
                    <div class="text">出错了，点击重新加载！</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data() {
            return {
                style: 'none'
            }
        },
        methods: {
            /*  state controller */
            stateController(arr) {
                this.style = arr
            },
            /* horizontally scroll */
            horizontallyScroll() {
                let scroll = this.$refs.STATE
                let initialPositionX = 0
                let initialPositionY = 0
                scroll.addEventListener('touchstart', (e) => {
                    initialPositionX = e.changedTouches[0].clientX
                    initialPositionY = e.changedTouches[0].clientY
                })
                scroll.addEventListener('touchend', (e) => {
                    if (initialPositionY - e.changedTouches[0].clientY > 50 || initialPositionY - e.changedTouches[0].clientY < -50) {
                    }
                    else if (e.changedTouches[0].clientX - initialPositionX > 100) {
                        this.$emit('scrollLeft')
                    }
                    else if (initialPositionX - e.changedTouches[0].clientX > 100) {
                        this.$emit('scrollRight')
                    }
                })
            },
            /* error */
            error() {
                location.reload()
            },
            /* login */
            login() {
                this.$router.push({path: '/login-password'})
                setTimeout(() => {
                    this.style = "none"
                }, 200)
            }
        },
        mounted() {
            this.horizontallyScroll()
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import '~@/stylus/var'

    .state-wrapper
        .item
            z-index 1
            position fixed
            top 0
            left 0
            bottom 0
            right 0
            width 16rem
            margin 0 auto
            background-color #eee
            .content
                position absolute
                top 0
                left 0
                bottom 0
                right 0
                margin auto
                width 200px
                height 100px
                .img
                    display block
                    margin 0 auto
                    width 60px
                    height 60px
                .text
                    height 40px
                    text-align center
                    font-size 14px
                    line-height 40px
                    color $cText1
</style>
