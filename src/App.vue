<template>
  <div id="app" :class="[{'henan': orgId === 'henanzhongyan'}, {'shankun': orgId === 'shankunzhongyan'}]">
    <router-view v-wechat-title='$route.meta.title' v-cloak />

    <!-- 底部导航x组件 -->
    <bottom-nav></bottom-nav>

    <!-- loading -->
    <div class="spinner-wrap" v-if="loadingPage">
        <mt-spinner type="triple-bounce"></mt-spinner>        
    </div>
  </div>
</template>

<script>
require('assets/lib/flexible.js')
require('assets/public/reset.css')
require('assets/public/common.css')
import bottomNav from 'components/bottom-nav'
import {mapGetters, mapActions} from 'vuex'

export default {
    name: 'app',
    data () {
        return {
            loadingPage: true,
        }
    },
    computed: mapGetters([
        'orgId',
        'wxConfig'
    ]),
    created() {
        this.$store.dispatch('getBase')
        this.$store.dispatch('getWX')
    },
    components: {
      bottomNav
    }
}

</script>
<style lang="scss">
[v-cloak] {
    display: none;
}
</style>
