<template>
  <div id="app" :class="[{'henan': orgId === 'henanzhongyan'}, {'shankun': orgId === 'shankunzhongyan'}]">
    
    <router-view v-wechat-title='$route.meta.title' v-cloak />
    
    <!-- 底部导航组件 -->
    <bottom-nav></bottom-nav>

    <loading-ing v-if="isLoading"></loading-ing>
  </div>
</template>

<script>
import {mapGetters, mapActions, mapMutations} from 'vuex'

export default {
    name: 'app',
    computed: mapGetters([
        'orgId',
        'isLoading'
    ]),
    created() {
        this.getSellerId();
        this.$store.dispatch('getBase');
        this.$store.dispatch('getWX');
    },
    methods: {
        getSellerId() {
            if (this.$route.query.sellerId) {
                this.setSellerId(this.$route.query.sellerId)
            }
        },
        ...mapMutations({
            setSellerId: 'setSellerId'
        })
    }
}

</script>
<style lang="scss">
[v-cloak] {
    display: none;
}
</style>
