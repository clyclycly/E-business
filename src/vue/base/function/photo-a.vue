<!-- https://github.com/xyxiao001/cropper-content -->
<template>
    <div class="photo-a">
        <!-- 图片 -->
        <img class="img" ref="myimg" :src="mapUrl">
        <!-- input选择框 -->
        <input class="file" type="file" ref="MYIMAGE" @change="uploading()">
        <!-- 画布控制大小 -->
        <div ref="CANVAS"></div>
        <div v-show="offOn">
            <div class="cropper-title">裁剪</div>
            <!-- 无法控制图片具体大小，他是按照你截取的面积与原图的大小算的 -->
            <VueCropper class="cropper-content" ref="cropper"
                        :img="option.img"
                        :outputSize="option.size"
                        :outputType="option.outputType"
                        :autoCropHeight="120"
                        :autoCropWidth="120"
                        :autoCrop='true'
                        :fixed="true"
                        :fixedNumber="[1,1]"
            ></VueCropper>
            <div class="cropper-bottom" @click="cropper()">
                完成
            </div>
        </div>
    </div>
</template>

<script type='text/ecmascript-6'>
    import VueCropper from 'vue-cropper'

    export default {
        data() {
            return {
                mapUrl: this.url,
                offOn: 0,
                option: { // 地址不能跨域,先转为base64什么的
                    img: 'http://static.galileo.xiaojukeji.com/static/tms/seller_avatar_256px.jpg',
                    size: 0.9, // 为1比为0.9大10倍以上
                    outputType: 'jpeg'  //不要设置为png，太大，上传后后台可以保存为png
                }
            }
        },
        props: {
            url: {
                type: String,
                default: 'http://static.galileo.xiaojukeji.com/static/tms/seller_avatar_256px.jpg'
            }
        },
        methods: {
            // 截取
            cropper() {
                this.$refs.cropper.getCropData((data) => {
                    // do something
                    this.option.img = ''
                    this.mapUrl = data
                    this.$emit('photoBase64', data)
                    this.$refs.MYIMAGE.value = ''
                })
                this.offOn = 0
            },
            /* 上传，这个地方只是控制选择文件的大小,实际上传和这里没有任何关系 */
            uploading() {
                this.offOn = 1
                /* 判断格式 /.jpg|.png|.gif.|.bmp.|.jpeg/i 正则表示选择多个 */
                if (this.$refs.MYIMAGE.value.match(/.jpg|.png|.gif.|.bmp.|.jpeg|.gif/i)) { // .match有就返回一个数组，没有就为空
                    /* 判断图片大小 */
                    if (this.$refs.MYIMAGE.files[0].size > 20480000) {
                        window.alert('请选择20M以下的图片!!!')
                        return
                    }
                    /* 给url弄成在线地址 解决浏览器安全问题 */
                    let getFileUr = this.getFileUrl()
                    this.option.img = getFileUr
                } else if (this.$refs.MYIMAGE.value === '') {
                    window.alert('请选择图片！！！')
                } else {
                    window.alert('图片格式错误！！！')
                }
            },
            getFileUrl() {
                let url
                if (navigator.userAgent.indexOf('MSIE') >= 0) { // IE
                    console.log('MSIE')
                    url = this.$refs.MYIMAGE.value
                }
                else if (navigator.userAgent.indexOf('Firefox') > 0) { // Firefox
                    console.log('Firefox')
                    url = window.URL.createObjectURL(this.$refs.MYIMAGE.files.files.item(0))
                }
                else {
                    console.log('其他')
                    url = window.URL.createObjectURL(this.$refs.MYIMAGE.files.item(0))
                }
                return url
            }
        },
        components: {
            VueCropper
        }
    }
</script>

<style lang='stylus' rel='stylesheet/stylus' scoped>
    @import '~@/stylus/var'

    .photo-a
        position relative
        font-size 0
        overflow hidden
        /* 图片与选择框 */
        .img
            display inline-block
            vertical-align top
            width 100%
            border-radius 100rem
            overflow hidden
        .file
            position absolute
            left 0
            display inline-block
            vertical-align top
            width 100%
            height 100%
            opacity 0
        .cropper-content
            z-index 100
            position fixed
            top 50px
            left 0
            right 0
            bottom 0
        .cropper-title
            z-index 100
            position fixed
            top 0
            left 0
            width 100%
            height 50px
            line-height 50px
            font-size 18px
            text-align center
            color $cMain1
            background-color white
        .cropper-bottom
            z-index 100
            position fixed
            bottom 0
            left 0
            width 100%
            height 50px
            line-height 50px
            font-size 18px
            text-align center
            color $cMain1
            background-color white

</style>
