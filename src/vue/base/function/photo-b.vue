<template>
    <div class="--fs0">
        <!-- 图片 -->
        <div class="item" v-for="(item,index) in urlArray">
            <img class="img" :src="urlArray[index]">
        </div>
        <!-- input选择框 -->
        <div class="item">
            <!-- 选择器 -->
            <img class="img" :src="url">
            <!-- input选择框 -->
            <input class="file" type="file" ref="MYFILE" @change="uploading()" multiple>
        </div>
        <div ref="CANVAS"></div>
    </div>
</template>

<script type='text/ecmascript-6'>
    export default {
        props: {
            photoUrl: {
                type: String,
                default: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1539958037088&di=18a677d180624c33c2ac0bc5c4f8ff6c&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F01%2F47%2F03%2F53574339d206e4d.jpg'
            }
        },
        data() {
            return {
                url: this.photoUrl,
                urlArray: []
            }
        },
        methods: {
            /* 上传 */
            uploading() {
                /* 判断格式 /.jpg|.png|.gif.|.bmp.|.jpeg/i 正则表示选择多个 */
                if (this.$refs.MYFILE.value.match(/.jpg|.png|.gif.|.bmp.|.jpeg|.gif/i)) { // .match有就返回一个数组，没有就为空
                    /* 最多3张 */
                    if (this.urlArray.length > 2) return
                    /* 判断图片大小 */
                    for (let i = 0; i < this.$refs.MYFILE.files.length; i++) {
                        if (this.$refs.MYFILE.files[i].size > 20480000) {
                            window.alert('请选择20M以下的图片!!!')
                            return
                        }
                        let getFileUrl = this.getFileUrl(i)
                        this.convertImgToBase64(getFileUrl, (base64Img) => {
                            this.$set(this.urlArray, Math.random())
                            this.urlArray[this.urlArray.length] = base64Img // 或者push
                            this.$emit('emitPhotoBase64Array', this.urlArray)
                        })
                    }
                    /* 给url弄成在线地址 解决浏览器安全问题 */
                    this.$refs.MYFILE.value = ""
                } else if (this.$refs.MYFILE.value === '') {
                    window.alert('请选择图片！！！')
                } else {
                    window.alert('图片格式错误！！！')
                }
            },
            /* getFileUrl() return一个在线地址解决浏览器安全问题 */
            getFileUrl(index) {
                let url
                if (navigator.userAgent.indexOf('MSIE') >= 0) { // IE
                    console.log('MSIE')
                    url = this.$refs.MYFILE.value
                }
                else if (navigator.userAgent.indexOf('Firefox') > 0) { // Firefox
                    console.log('Firefox')
                    url = window.URL.createObjectURL(this.$refs.MYFILE.files.files.item(index))
                }
                else {
                    url = window.URL.createObjectURL(this.$refs.MYFILE.files.item(index))
                }
                return url
            },
            /* base64 */
            convertImgToBase64(url, callback) {
                let canvas = document.createElement('CANVAS')
                let ctx = canvas.getContext('2d')
                let img = new Image()
                img.src = url
                img.crossOrigin = 'Anonymous'
                img.onload = function () {
                    /* 在onload里判断，不然为0 */
                    if (img.width > 500) {
                        img.height = img.height / img.width * 500
                        img.width = 500
                    }
                    else if (img.height > 1000) {
                        img.width = img.width / img.height * 1000
                        img.height = 1000
                    }
                    canvas.height = img.height
                    canvas.width = img.width
                    /* context.drawImage('1规定要使用的图像、画布或视频', '2开始剪切的 x 坐标位置', '3开始剪切的 y 坐标位置',"4被剪切图像的宽度(最后的宽度，不写会原图的宽度处理)"，"5被剪切图像的高度" "6在画布上放置图像的x坐标位置", "7在画布上放置图像的y坐标位置", "8要使用的图像的宽度（放大或者缩小4或5，这里没用）", "9height要使用的图像的高度");*/
                    ctx.drawImage(img, 0, 0, img.width, img.height)
                    // 用canvas的toDataURL()将图片转为dataURL(base64)
                    let dataURL = canvas.toDataURL('image/jpeg', 0.9)
                    callback.call(this, dataURL)
                    canvas = null
                }
            }
        }
    }
</script>

<style lang='stylus' rel='stylesheet/stylus' scoped>
    .item
        position relative
        display inline-block
        width 25%
        height 25%
        margin-bottom 0
        overflow hidden
        /* 图片与选择框 */
        .img
            display block
            margin 15% auto
            width 2.75rem
            height 2.75rem
            overflow hidden
        .file
            position absolute
            top 0
            left 0
            display inline-block
            vertical-align top
            width 100%
            height 100%
            opacity 0
</style>