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
                    :src="userStore.userInfo.avatar ? userStore.userInfo.avatar : '/static/images/no-login.png'"
                    class="ml-[25px] rounded-full w-[92px] h-[92px]"
                ></image>
            </view>
        </view>
        <view class="mt-[18px]">
            <view class="text-[45px] pl-[34px]">{{ t('tabBar.home.hot') }}</view>
            <scroll-view class="mt-[20px]" scroll-x>
                <view class="items-center flex">
                    <view
                        v-for="item in marketList.slice(0, 3)" :key="item.id"
                        class="flex flex-col rounded-[30px] chart-wrap"
                        @click="toPair(item.symbol)"
                    >
                        <text class="text-[28px] font-bold">
                            {{ item.full_name }}
                        </text>
                        <text class="text-[40px] font-bold">
                            {{ item.nowData.lastPrice.toFixed(2) }}
                        </text>
                        <view class="mb-[54px] mt-[30px] h-[28px] chart">
                        </view>
                        <view class="flex items-center justify-between">
                            <view class="increase text-[26px] text-center">
                                {{ item.diff > 0 ? '+' : '' }}{{ item.diff }}
                            </view>
                            <text>
                                →
                            </text>
                        </view>
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
                    :autoplay="true" :indicator-dots="true"
                    circular class="h-[234px] bg-[#f5f7f9] rounded-[15px]"
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
            </view>
        </view>
        <view class="mt-[40px] px-[34px]">
            <view class="flex items-center justify-between">
                <text class="text-[45px]">{{ t('tabBar.home.market') }}</text>
                <text class="text-[20px]" @click="switchQuotes">
                    {{ t('tabBar.home.seeMore') }}
                </text>
            </view>
            <view class="mt-[20px]">
                <view
                    v-for="item in marketList" :key="item.id" class="stock-row items-center"
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
                                17:28:16
                            </text>
                        </view>
                    </view>
                    <text class="text-[28px] text-right">
                        {{ item.nowData.lastPrice.toFixed(2) }}
                    </text>
                    <view
                        :class="item.diff > 0 ? 'green-block' : 'red-block'"
                        class="h-[68px] ml-[20px] rounded-[10px] grid place-items-center"
                    >
                        <text class="text-[22px] text-white">
                            {{ item.diff > 0 ? '+' : '' }}{{ item.diff }}
                        </text>
                    </view>
                </view>
            </view>
        </view>
    </layout>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import pako from 'pako/dist/pako_inflate.js'
import { useUserStore } from '~/pinia/useUserInfo'

const { t } = useI18n()
useHead({
    title: t('tabBar.home.home'),
})

const wsUrl = getCurrentInstance()?.appContext.config.globalProperties.$wsUrl

let socket = null

const loading = ref(false)

const userStore = useUserStore()

function toLogin() {
    if (userStore.userInfo.email)
        uni.navigateTo({ url: '/pages/tabbar/mine' })
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
    const res = await $api.get('/index/news')
    res.data.forEach((item) => {
        item.image = $api.staticUrl(item.image)
        newsList.push(item)
    })
}

const marketList = ref([])

async function getMarketList() {
    const res = await $api.get('/index/market')
    res.data.forEach((item) => {
        item.logo = $api.staticUrl(item.logo)
        item.nowData = {
            open: 51732,
            high: 52785.64,
            low: 51000,
            close: 52735.63,
            amount: 13259.24137056181,
            vol: 687640987.4125315,
            count: 448737,
            bid: 52732.88,
            bidSize: 0.036,
            ask: 52732.89,
            askSize: 0.583653,
            lastPrice: 52735.63,
            lastSize: 0.03,
        }
        item.prevData = item.nowData
        item.upOrDown = true
        item.diff = 1
        marketList.value.push(item)
    })
}

function handlerData(msg) {
    const data = JSON.parse(msg)
    if (data.ping) {
        socket.send(JSON.stringify({ pong: data.ping }))
    }
    else if (data.tick) {
        const flag = data.ch.split('.')[1]
        marketList.value.forEach((item) => {
            if (flag === item.dataFlag) {
                item.prevData = item.nowData
                item.nowData = data.tick
                item.upOrDown = item.nowData.close > item.prevData.close
                item.diff = (item.nowData.open - item.nowData.close).toFixed(2)
            }
        })
    }
}

function createSubTickerRequest(SYMBOL) {
    return {
        sub: `market.${SYMBOL}.ticker`,
    }
}

function subscribeData(SYMBOL) {
    socket.send(JSON.stringify(createSubTickerRequest(SYMBOL)))
}

function changeToSubscribe() {
    console.log('切换1111')
    marketList.value.forEach((item) => {
        item.dataFlag = item.symbol.replace('-', '')
        item.dataFlag = `${item.dataFlag.toLowerCase()}t`
        subscribeData(item.dataFlag)
    })
    loading.value = false
}

async function loadData() {
    loading.value = true
    if (socket === null || socket.readyState === WebSocket.CLOSED) {
        socket = new WebSocket(wsUrl)
        socket.onopen = () => {
            changeToSubscribe()
        }

        socket.onmessage = (event) => {
            const blob = event.data
            const fileReader = new FileReader()
            fileReader.onload = (e) => {
                const payloadData = new Uint8Array(e.target.result)
                const msg = pako.inflate(payloadData, { to: 'string' })
                handlerData(msg)
            }
            fileReader.readAsArrayBuffer(blob)
        }
    }
    loading.value = false
}

onLoad(async () => {
    // 获取新闻列表
    await getNewsList()
    // 获取热门币种
    await getMarketList()
    await loadData()
})
onHide(() => {
    socket.close()
})
onShow(async () => {
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
