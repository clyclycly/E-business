<template>
    <div>
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
    </div>
</template>

<script type="text/ecmascript-6">

    export default {
        methods: {
            /* state */
            emitNone() {
                this.$emit('emitNone')
            },
            emitLoadingA() {
                this.$emit('emitLoadingA')
            },
            emitLoadingB() {
                this.$emit('emitLoadingB')
            },
            emitNotLogin() {
                this.$emit('emitNotLogin')
            },
            emitNull() {
                this.$emit('emitNull')
            },
            emitError() {
                this.$emit('emitError')
            },
            /* prompt text a */
            emitPromptTextA(array) {
                this.$emit('emitPromptTextA', array)
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
