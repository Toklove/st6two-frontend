<template>
    <page-meta />
    <view class="init-top" />
    <layout class-name="IndexRouter">
        <view class="flex flex-row justify-between items-center px-[34px]" @click="toLogin">
            <text class="text-[40px] font-bold">
                {{ userStore.userInfo.nickname ? userStore.userInfo.nickname : 'Log in' }}
            </text>
            <view class="flex items-center">
                <image class="w-[41px] h-[40px]" src="/static/images/msg.png"></image>
                <image
                    :src="userStore.userInfo.avatar ? userStore.getAvatar() : '/static/images/no-login.png'"
                    class="ml-[25px] rounded-full w-[92px] h-[92px]"
                ></image>
            </view>
        </view>
        <view class="mt-[18px]">
            <view class="text-[45px] pl-[34px]">{{ t('tabBar.home.hot') }}</view>
            <scroll-view class="mt-[20px]" scroll-x>
                <view v-if="!loading" class="items-center flex">
                    <view
                        v-for="item in marketList.slice(0, 3)" :key="item.id"
                        class="flex flex-col justify-between rounded-[30px] chart-wrap"
                        @click="toPair(item.symbol)"
                    >
                        <text class="text-[28px] font-bold">
                            {{ item.full_name }}
                        </text>
                        <text class="text-[40px] font-bold">
                            {{ item.nowData.close.toFixed(4) }}
                        </text>
                        <view class="mb-[54px] mt-[30px] h-[28px] chart">
                        </view>
                        <view class="flex items-center justify-between">
                            <view class="increase text-[26px] text-center">
                                {{ item.nowData.increase }}
                            </view>
                            <text>
                                →
                            </text>
                        </view>
                    </view>
                </view>
                <view v-else class="flex items-center">
                    <view
                        class="scroll-x-skeleton relative flex flex-col justify-between rounded-[30px] chart-wrap loading"
                    >
                        <FuiSkeleton :preload-list="home.top" outer-class="scroll-x-skeleton"></FuiSkeleton>
                    </view>
                    <view
                        class="scroll-x-skeleton relative flex flex-col justify-between rounded-[30px] chart-wrap loading"
                    >
                        <FuiSkeleton :preload-list="home.top" outer-class="scroll-x-skeleton"></FuiSkeleton>
                    </view>
                    <view
                        class="scroll-x-skeleton relative flex flex-col justify-between rounded-[30px] chart-wrap loading"
                    >
                        <FuiSkeleton :preload-list="home.top" outer-class="scroll-x-skeleton"></FuiSkeleton>
                    </view>
                </view>
            </scroll-view>
        </view>

        <view class="mt-[40px] px-[34px]">
            <view class="flex items-center justify-between">
                <text class="text-[45px]">{{ t('tabBar.home.news') }}</text>
                <text class="text-[20px]">
                    {{ t('tabBar.home.seeMore') }}
                </text>
            </view>
            <view class="mt-[20px]">
                <swiper

                    v-if="!loading" :autoplay="true"
                    circular
                    :indicator-dots="true" class="h-[234px] bg-[#f5f7f9] rounded-[15px]"
                    vertical
                >
                    <swiper-item v-for="item in newsList" :key="item.id">
                        <view class="news mr-[56px]">
                            <view class="teletext flex justify-between">
                                <view class="news-title text-[24px] line-clamp-3">
                                    {{ item.title }}
                                </view>
                                <image
                                    :src="item.image"
                                    class="news-image rounded-[10px]"
                                ></image>
                            </view>
                            <div class="desc mt-[21px] text-[20px] sub-title flex items-center justify-between">
                                <text>
                                    {{ item.created_at }}
                                </text>
                                <text>
                                    {{ item.author }}
                                </text>
                            </div>
                        </view>
                    </swiper-item>
                </swiper>
                <view v-else class="scroll-x-skeleton relative h-[234px] bg-[#f5f7f9] rounded-[15px]">
                    <FuiSkeleton :preload-list="home.swipers" outer-class="scroll-x-skeleton"></FuiSkeleton>
                    <FuiSkeleton :preload-list="home.swipers" outer-class="scroll-x-skeleton"></FuiSkeleton>
                    <FuiSkeleton :preload-list="home.swipers" outer-class="scroll-x-skeleton"></FuiSkeleton>
                </view>
            </view>
        </view>
        <view class="mt-[40px] px-[34px]">
            <view class="flex items-center justify-between">
                <text class="text-[45px]">{{ t('tabBar.home.market') }}</text>
                <text class="text-[20px]" @click="switchQuotes">
                    {{ t('tabBar.home.seeMore') }}
                </text>
            </view>
            <view v-if="!loading" class="mt-[20px]">
                <view
                    v-for="item in marketList"
                    :key="item.id" class="stock-row items-center"
                    @click="toPair(item.symbol)"
                >
                    <view class="flex">
                        <image
                            :src="item.logo"
                            class="rounded-full w-[72px] h-[72px]"
                        ></image>
                        <view class="flex flex-col justify-between ml-[20px]">
                            <text class="text-[30px]">{{ item.full_name }}</text>
                            <text class="sub-title text-[22px]">
                                {{ dayjs(item.nowData.timestamp).format('HH:mm:ss') }}
                            </text>
                        </view>
                    </view>
                    <text class="text-[28px] text-right">
                        {{ item.nowData.close.toFixed(4) }}
                    </text>
                    <view
                        :class="item.nowData.increase > 0 ? 'green-block' : 'red-block'"
                        class="h-[68px] ml-[20px] rounded-[10px] grid place-items-center"
                    >
                        <text class="text-[22px] text-white">
                            {{ item.nowData.increase > 0 ?'+':'' }}{{ ((item.nowData.increase / item.nowData.close) * 100).toFixed(2) }}%
                        </text>
                    </view>
                </view>
            </view>
            <view v-else>
                <view class="market-skeleton relative h-[124px]">
                    <FuiSkeleton
                        :preload-list="home.market" outer-class="market-skeleton"
                        @change="change"
                    ></FuiSkeleton>
                </view>
                <view class="market-skeleton relative h-[124px]">
                    <FuiSkeleton
                        :preload-list="home.market" outer-class="market-skeleton"
                        @change="change"
                    ></FuiSkeleton>
                </view>
                <view class="market-skeleton relative h-[124px]">
                    <FuiSkeleton
                        :preload-list="home.market" outer-class="market-skeleton"
                        @change="change"
                    ></FuiSkeleton>
                </view>
                <view class="market-skeleton relative h-[124px]">
                    <FuiSkeleton
                        :preload-list="home.market" outer-class="market-skeleton"
                        @change="change"
                    ></FuiSkeleton>
                </view>
            </view>
        </view>
    </layout>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import dayjs from 'dayjs'
import { useUserStore } from '~/pinia/useUserInfo'
import FuiSkeleton from '~/components/firstui/fui-skeleton/fui-skeleton.vue'
import home from '~/skeleton/tabbar/home.js'

const { t } = useI18n()
useHead({
    title: t('tabBar.home.home'),
})

function change(e) {
    console.log('骨架切换')
    console.log(e)
}

const wsUrl = getCurrentInstance()?.appContext.config.globalProperties.$wsUrl

let socket = null

const loading = ref(false)

const userStore = useUserStore()

function toLogin() {
    if (userStore.userInfo.email)
        uni.switchTab({ url: '/pages/tabbar/mine' })
    else
        uni.navigateTo({ url: '/pages/common/login' })
}

function toPair(pair) {
    uni.navigateTo({ url: `/pages/position/chart?pair=${pair}` })
}

function switchQuotes() {
    uni.switchTab({ url: '/pages/tabbar/quotes' })
}

const newsList = reactive([])

async function getNewsList() {
    if (newsList.length > 0)
        return
    const res = await $api.get('/index/news')
    res.data.forEach((item) => {
        item.image = $api.staticUrl(item.image)
        newsList.push(item)
    })
}

const marketList = ref([])

async function getMarketList() {
    if (marketList.value.length > 0)
        return
    const res = await $api.get('/index/market')
    res.data.forEach((item) => {
        item.logo = $api.staticUrl(item.logo)
        item.nowData = {
            close: 1,
            high: 1,
            low: 11,
            open: 11,
            symbol: 'USD/AUD',
            timestamp: 1704270547000,
            volume: 4,
        }
        item.prevData = item.nowData
        item.upOrDown = true
        item.diff = 1
        marketList.value.push(item)
    })
}

function handlerData(msg) {
    loading.value = false
    const data = JSON.parse(msg)
    if (data.ping) {
        socket.send(JSON.stringify({ pong: data.ping }))
    }
    else {
        marketList.value.forEach((item) => {
            data.forEach((item2) => {
                if (item2.symbol === item.symbol) {
                    item.prevData = item.nowData
                    item.nowData = item2
                    item.diff = (item.nowData.high - item.nowData.close).toFixed(4)
                }
            })
        })
    }
}

function createSubTickerRequest(symbol) {
    return { symbol, type: 'price', language: 'en_US' }
}

function subscribeData(SYMBOL) {
    socket.send({ data: JSON.stringify(createSubTickerRequest(SYMBOL)) })
}

function changeToSubscribe() {
    let symbol = ''
    marketList.value.forEach((item) => {
        symbol += `${item.symbol}.`
    })

    // 去除最后一个点
    symbol = symbol.substring(0, symbol.length - 1)

    subscribeData(symbol)
}

function sendHeart() {
    socket.send({ data: JSON.stringify({ type: 'heartbeat', msg: 'ping' }) })
}

function timeHeart() {
    if (socket == null)
        return

    sendHeart()

    setTimeout(() => {
        timeHeart()
    }, 3000)
}

async function loadData() {
    if (socket === null) {
        socket = uni.connectSocket({
            url: wsUrl,
            success() {
                console.log('连接成功')
            },
        })
        socket.onOpen(() => {
            changeToSubscribe()
            // 设置定时器，每隔3秒请求一次
            timeHeart()
        })
        socket.onMessage((e) => {
            handlerData(e.data)
        })
    }
}

onHide(() => {
    socket.close()
    socket = null
})
onShow(async () => {
    await userStore.getUserInfo()
    loading.value = true
    // 获取新闻列表
    await getNewsList()
    // 获取热门币种
    await getMarketList()
    await loadData()
})
</script>

<route lang='yaml'>
style:
navigationStyle: custom
type: home
</route>

<style lang='scss'>
.chart-wrap {
    margin-left: 20px;
    padding: 36px 26px;
    background-color: #d8f0dd;
    min-width: 280px;
    min-height: 326px;

    .increase {
        padding: 8px 20px;
        background-color: #fff;
        border-radius: 28px;
    }
}

.chart-wrap:nth-child(even) {
    color: #fff;
    background-color: #9f9cff;

    .increase {
        background-color: #8581f6;
    }
}

.chart-wrap.loading {
    background: #f5f7f9 !important;
}

.news {
    margin: 30px 26px 26px 26px;

    .teletext {
        height: 114px;

        .news-title {
            width: 406px;
            height: 104px;
        }

        .news-image {
            width: 186px;
            height: 114px;
        }
    }

    .desc {
        padding-top: 10px;
        border-top: 1px solid #d1d1d1;
    }
}

.sub-title {
    color: #8c8c8c !important;
}
</style>
