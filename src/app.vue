<template>
    <div class="app" ref="APP">
        <!-- router-view -->
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"
                         @emitNone="emitNone"
                         @emitLoadingA="emitLoadingA"
                         @emitLoadingB="emitLoadingB"
                         @emitNotLogin="emitNotLogin"
                         @emitNull="emitNull"
                         @emitError="emitError"
                         @emitPromptTextA="emitPromptTextA"
            ></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
        <!-- state -->
        <State ref="STATE"></State>
        <!-- prompt -->
        <PromptTextA ref="PRPMPTTEXTA"></PromptTextA>

    </div>
</template>
<script type="text/ecmascript-6">
    import State from '@/vue/base/state/state'
    import PromptTextA from '@/vue/base/prompt/prompt-text-a'

    export default {
        methods: {
            /* state */
            emitNone() {
                this.$refs.STATE.stateController('none')
            },
            emitLoadingA() {
                this.$refs.STATE.stateController('loadingA')
            },
            emitLoadingB() {
                this.$refs.STATE.stateController('loadingB')
            },
            emitNotLogin() {
                this.$refs.STATE.stateController('notLogin')
            },
            emitNull() {
                this.$refs.STATE.stateController('null')
            },
            emitError() {
                this.$refs.STATE.stateController('error')
            },
            /* prompt text a */
            emitPromptTextA(array) {
                this.$refs.PRPMPTTEXTA.promptTextControllerA(array[0], array[1], array[2])
            }
        },
        mounted() {
            window.navigator.onLine !== true ? this.emitPromptTextA(['未连接网络']) : false;
            this.$refs.APP.style.minHeight = (document.documentElement.clientHeight || document.body.clientHeight) + 'px';
        },
        components: {
            State,
            PromptTextA
        }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
    .app
        width 16rem
        margin 0 auto
        overflow hidden // 误删，避免margin重叠
        background-color #eee
</style>
