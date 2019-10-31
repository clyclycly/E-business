<!--
未使用vuex，全屏变半屏后，宽度会计算不正确
使用了css动画，不用自己在建立图层了。动画触发时会建立图层，但是动画结束图层就消失了。
-->
<template>
    <div class="slider">
        <!-- 轮播图 -->
        <ul class="slider-content" ref="CONTENT" :style="{transform:'translate3d('+ -width +'px,0px,0px)'}">
            <slot></slot>
        </ul>
        <!-- 轮播图小点 -->
        <ul class="slider-dot" v-if="childrenNumber>0">
            <li class="li" v-for="item in childrenNumber-2" :class="{hook:page===item}" :key="item">
            </li>
        </ul>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data() {
            return {
                page: 1, // 页码
                childrenNumber: 0, // 子元素个数
                width: '', // 宽度
                timer1: '', // 自动滑动定时器
                timer2: '' // 手动滑动定时器
            }
        },
        methods: {
            /* 手动轮播 */
            horizontallyScroll() {
                let scroll = this.$refs.CONTENT
                let initialPositionX = 0
                let X = 0
                scroll.addEventListener('touchstart', (e) => {
                    clearInterval(this.timer1)
                    this.$refs.CONTENT.style['transition-duration'] = '0ms'
                    initialPositionX = e.changedTouches[0].clientX
                    X = Number(this.$refs.CONTENT.style['transform'].split('translate(')[1].split('px')[0])
                }, false)
                scroll.addEventListener('touchmove', (e) => {
                    let a = e.targetTouches[0].pageX - initialPositionX  // 给变量设置区间兼容电脑端测试
                    if (a < -this.width) {
                        a = -this.width
                    }
                    else if (this.width > this.width) {
                        a = this.width
                    }
                    this.$refs.CONTENT.style['transform'] = `translate(${X + a }px, 0px)`
                }, false)
                scroll.addEventListener('touchend', (e) => {
                    if (e.changedTouches[0].clientX - initialPositionX > 50) {
                        this.page--
                        this.transform()
                        clearTimeout(this.timer2)
                        this.timer2 = setTimeout(() => {
                            this.slider()
                        }, 2000)
                    }
                    else if (initialPositionX - e.changedTouches[0].clientX > 50) {
                        this.page++
                        this.transform()
                        clearTimeout(this.timer2)
                        this.timer2 = setTimeout(() => {
                            this.slider()
                        }, 2000)
                    }
                    else {
                        this.transform()
                    }
                }, false)
            },
            /* 自动轮播 */
            slider() {
                this.timer1 = setInterval(() => {
                    this.page >= this.childrenNumber - 1 ? this.page = 1 : false;
                    this.$refs.CONTENT.style['transition-duration'] = '200ms'
                    this.page++
                    this.transform()
                }, 2000)
            },
            /* 切换 */
            transform() {
                this.page === 0 ? this.page = this.childrenNumber - 2 : false;
                this.page === this.childrenNumber - 1 ? this.page = 1 : false;
                this.$refs.CONTENT.style['transform'] = `translate(-${this.page * this.width}px, 0px)`
                this.$refs.CONTENT.style['-webkit-transform'] = `translate(-${this.page * this.width}px, 0px)`
            }
        },
        beforeDestroy() {
            clearInterval(this.timer1); // 保存在内存不会清除哦！
        },
        mounted() {
            this.childrenNumber = this.$refs.CONTENT.children.length // 设置子元素长度
            this.width = this.$refs.CONTENT.clientWidth // 设置宽度
            this.horizontallyScroll() //  开启手动滑动
            this.slider() // 开启自动轮播
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    .slider
        position relative
        width 16rem
        margin 0 auto
        background-color white
        overflow hidden
        .slider-content
            transition-timing-function ease
            display flex
            transition all 0s
            .li
                width 100%
                color black
                /* 不收缩 */
                flex-shrink 0
        .slider-dot
            position absolute
            bottom 10px
            right 20px
            font-size 0
            .li
                display inline-block
                vertical-align top
                border-radius 5px
                margin-left 5px
                width 10px
                height 10px
                background-color white
                &.hook
                    background-color black
</style>