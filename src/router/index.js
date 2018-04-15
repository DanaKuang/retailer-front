import Vue from 'vue'
import Router from 'vue-router'

import StoreCenter from '@/views/StoreCenter.vue'
import Info from '@/views/Info.vue'
import Performance from '@/views/Performance.vue'
import Wallet from '@/views/Wallet.vue'
import Exchangedetail from '@/views/Exchangedetail.vue'
import Orderdetail from '@/views/Orderdetail'
import Rank from '@/views/Rank.vue'
import Warehousing from '@/views/Warehousing.vue'
import Activation from '@/views/Activation.vue'
import Myqresult from '@/views/Myqresult.vue'
import MyQrpost from '@/views/MyQrpost.vue'
import ActivityIntro from '@/views/ActivityIntro.vue'
import RewardIntro from '@/views/RewardIntro.vue'
import Abnormal from '@/views/Abnormal.vue'
import YantaiScanCode from '@/views/YantaiScanCode.vue'

Vue.use(Router)

import VueWechatTitle from 'vue-wechat-title'
Vue.use(VueWechatTitle)

var routes = [{
    path: '*', 
    redirect: '/'
},  {
    path: '/',
    redirect: '/retailer/index',
},  {
    path: '/retailer/index',
    component: StoreCenter,
    name: 'StoreCenter',
    meta: {
        title: '门店中心'
    }
},  {
    path: '/retailer/info',
    component: Info,
    name: 'Info',
    meta: {
        title: '门店中心'
    }
},  {
    path: '/retailer/performance',
    component: Performance,
    name: 'Performance',
    meta: {
        title: '业绩排行榜'
    }
},  {
    path: '/retailer/wallet',
    component: Wallet,
    name: 'Wallet',
    meta: {
        title: '我的钱包'
    }
}, {
    path: '/retailer/exchangedetail',
    component: Exchangedetail,
    name: 'Exchangedetail',
    meta: {
        title: '账单明细'
    }
},  {
    path: '/retailer/orderdetail',
    component: Orderdetail,
    name: 'Orderdetail',
    meta: {
        title: '订单列表'
    }
},  {
    path: '/retailer/rank',
    component: Rank,
    name: 'Rank',
    meta: {
        title: '业绩排行榜'
    }
},  {
    path: '/retailer/warehousing',
    component: Warehousing,
    name: 'Warehousing',
    meta: {
        title: '扫码入库'
    }
},  {
    path: '/retailer/activation',
    component: Activation,
    name: 'Activation',
    meta: {
        title: '零售户激活'
    }
},  {
    path: '/retailer/myqresult',
    component: Myqresult,
    name: 'Myqresult',
    meta: {
        title: '零售户店码'
    }
},  {
    path: '/retailer/myqrpost',
    component: MyQrpost,
    name: 'MyQrpost',
    meta: {
        title: '我的二维码'
    }
},  {
    path: '/retailer/activityintro',
    component: ActivityIntro,
    name: 'ActivityIntro',
    meta: {
        title: '活动说明'
    }
},  {
    path: '/retailer/rewardintro',
    component: RewardIntro,
    name: 'RewardIntro',
    meta: {
        title: '业绩说明'
    }
},  {
    path: '/retailer/abnormal',
    component: Abnormal,
    name: 'Abnormal',
    meta: {
        title: ''
    }
}, {
    path: '/retailer/ytscancode',
    component: YantaiScanCode,
    name: 'YantaiScanCode',
    meta: {
        title: '扫一扫'
    }
}]

const scrollBehavior = (to, from, savedPosition) => {
    if (savedPosition) {
        return savedPosition
    } else {
        return { x: 0, y: 0 }
    }
}

const router = new Router({
    mode: 'history',
    routes,
    scrollBehavior
})

export default router
