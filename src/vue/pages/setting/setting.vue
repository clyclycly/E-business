<template>
    <div>
        <!-- header -->
        <Head :title="'设置'"></Head>
        <div class="--mt20">
            <SelectSwitch :text="'功能a'"></SelectSwitch>
            <SelectSwitch class="--mb50" :text="'功能b'"></SelectSwitch>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import Head from '@/vue/base/head/head.vue'
    import SelectSwitch from '@/vue/base/select/select-switch.vue'

    export default {
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
            SelectSwitch
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
