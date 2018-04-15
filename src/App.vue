<template>
  <div id="app" :class="[{'henan': orgId === 'henanzhongyan'}, {'shankun': orgId === 'shankunzhongyan'}]">
    <router-view v-wechat-title='$route.meta.title' v-cloak />
    <!-- 底部导航组件 -->
    <bottom-nav></bottom-nav>

    <!-- loading -->
    <div class="spinner-wrap" v-if="loadingPage">
        <mt-spinner type="triple-bounce"></mt-spinner>        
    </div>
  </div>
</template>

<script>
import bottomNav from 'components/bottom-nav'
import {mapGetters, mapActions, mapMutations} from 'vuex'

export default {
    name: 'app',
    data () {
        return {
            loadingPage: true,
        }
    },
    computed: mapGetters([
        'orgId'
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
