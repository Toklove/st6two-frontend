<template>
    <page-meta />
    <div class="init-top" />
    <layout class-name="IndexRouter">
        <view class="px-[34px]">
            <view class="flex items-center bg-[#f5f7f9] py-[31px] px-[30px] rounded-[50px]">
                <image class="w-[35px] h-[38px] mr-[21px]" src="/static/images/icon-search.png"></image>
                <input
                    v-model="filters" :placeholder="t('tabBar.quotes.EnterTheContentHere')"
                    class="text-[#525252] text-[28px]"
                    type="text"
                >
            </view>
            <view class="mt-[59px] relative">
                <view class="flex items-center justify-between">
                    <text class="text-[45px]">{{ t('tabBar.quotes.Market') }}</text>
                    <view
                        class="flex items-center justify-between bg-black dropdown"
                        @click="showDropdown = !showDropdown"
                    >
                        <text class="text-[26px] text-white px-[10px]">{{ form.category }}</text>
                        <image
                            :src="showDropdown ? '/static/images/icon-dropup.png' : '/static/images/icon-dropdown.png'"
                            class="w-[18px] h-[18px]"
                        ></image>
                    </view>
                </view>
                <view :class="showDropdown ? 'h-auto' : 'h-0'" class="dropdown-item bg-black text-white">
                    <view v-for="(item, index) in categoryList" :key="index" class="item" @click="changeList(item)">
                        <text class="text-[26px]">{{ item.name }}</text>
                    </view>
                </view>

                <view class="mt-[20px]">
                    <view v-if="!loading">
                        <view v-if="filteredData.length > 0">
                            <view
                                v-for="(item, index) in filteredData" :key="index" class="stock-row items-center"
                                @click="toPage(`/pages/position/chart?pair=${item.symbol}`)"
                            >
                                <view class="flex">
                                    <image
                                        :src="item.logo"
                                        class="rounded-full w-[72px] h-[72px]"
                                    ></image>
                                    <view class="flex flex-col justify-between ml-[20px]">
                                        <text class="text-[30px]">{{ item.name }}</text>
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
                                    class="h-[68px] ml-[20px] rounded-[10px] grid place-items-center green-block"
                                >
                                    <text class="text-[22px] text-white">
                                        {{ item.nowData.increase }}
                                    </text>
                                </view>
                            </view>
                        </view>

                        <view v-else class="nodata">
                            <FuiEmpty
                                :title="t('tabBar.quotes.NoDataAvailable')"
                                src="/static/images/option.png"
                            ></FuiEmpty>
                        </view>
                    </view>

                    <view v-else>
                        <view class="market-skeleton relative h-[124px]">
                            <fui-skeleton :preload-list="quotes.market" outer-class="market-skeleton"></fui-skeleton>
                        </view>
                        <view class="market-skeleton relative h-[124px]">
                            <fui-skeleton :preload-list="quotes.market" outer-class="market-skeleton"></fui-skeleton>
                        </view>
                        <view class="market-skeleton relative h-[124px]">
                            <fui-skeleton :preload-list="quotes.market" outer-class="market-skeleton"></fui-skeleton>
                        </view>
                        <view class="market-skeleton relative h-[124px]">
                            <fui-skeleton :preload-list="quotes.market" outer-class="market-skeleton"></fui-skeleton>
                        </view>
                        <view class="market-skeleton relative h-[124px]">
                            <fui-skeleton :preload-list="quotes.market" outer-class="market-skeleton"></fui-skeleton>
                        </view>
                        <view class="market-skeleton relative h-[124px]">
                            <fui-skeleton :preload-list="quotes.market" outer-class="market-skeleton"></fui-skeleton>
                        </view>
                        <view class="market-skeleton relative h-[124px]">
                            <fui-skeleton :preload-list="quotes.market" outer-class="market-skeleton"></fui-skeleton>
                        </view>
                        <view class="market-skeleton relative h-[124px]">
                            <fui-skeleton :preload-list="quotes.market" outer-class="market-skeleton"></fui-skeleton>
                        </view>
                        <view class="market-skeleton relative h-[124px]">
                            <fui-skeleton :preload-list="quotes.market" outer-class="market-skeleton"></fui-skeleton>
                        </view>
                        <view class="market-skeleton relative h-[124px]">
                            <fui-skeleton :preload-list="quotes.market" outer-class="market-skeleton"></fui-skeleton>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </layout>
</template>

<script setup>
import dayjs from 'dayjs'
import { useI18n } from 'vue-i18n'
import FuiEmpty from '~/components/firstui/fui-empty/fui-empty.vue'
import quotes from '~/skeleton/tabbar/quotes.js'

function toPage(url) {
    uni.navigateTo({ url })
}

const wsUrl = getCurrentInstance()?.appContext.config.globalProperties.$wsUrl

const filters = ref('')

let socket = null

const loading = ref(false)

const { t } = useI18n()

const form = ref({
    category_id: 1,
    category: t('tabBar.quotes.foreignExchange'),
})

const categoryList = ref([])

const showDropdown = ref(false)
const marketList = ref([])

const filteredData = computed(() => {
    if (!filters.value) {
        return marketList.value
    }
    else {
        const filterRe = new RegExp(filters.value, 'i')
        return marketList.value.filter((item) => {
            return (
                item.full_name.match(filterRe)
            )
        })
    }
})

async function getMarketByCategory() {
    loading.value = true
    const res = await $api.get(`/market/list?category_id=${form.value.category_id}`)
    marketList.value = res.data.map((item) => {
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
        return item
    })
}

async function changeList(item) {
    // 断开之前的连接
    socket.close()
    form.value.category_id = item.id
    form.value.category = item.name

    uni.setStorageSync('category_id', item.id)
    uni.setStorageSync('category', item.name)

    showDropdown.value = false
    await getMarketByCategory()

    // 重新连接
    socket = uni.connectSocket({
        url: wsUrl,
        success: () => {
            console.log('连接成功')
        },
    })
    socket.onOpen(() => {
        changeToSubscribe()
        // 设置定时器，每隔3秒请求一次
        timeHeart()
    })
    socket.onMessage((e) => {
        loading.value = false
        handlerData(e.data)
    })

    await changeToSubscribe()
}

async function getMarketCategory() {
    if (categoryList.value.length > 0)
        return
    const res = await $api.get('/market/category')
    categoryList.value = res.data
    form.value.category_id = uni.getStorageSync('category_id') || categoryList.value[0].id
    form.value.category = uni.getStorageSync('category') || categoryList.value[0].name
    await getMarketByCategory()
}

function handlerData(msg) {
    const data = JSON.parse(msg)
    if (data.ping) {
        socket.send({ data: JSON.stringify({ pong: data.ping }) })
    }
    else {
        marketList.value.forEach((item) => {
            data.forEach((item2) => {
                if (item2.symbol === item.symbol)
                    item.nowData = item2
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

onUnload(() => {
    socket.close()
})

async function changeToSubscribe() {
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
    loading.value = true
    await getMarketCategory()
    if (socket === null) {
        socket = uni.connectSocket({
            url: wsUrl,
            success: () => {
                console.log('连接成功')
            },
        })

        socket.onOpen(() => {
            changeToSubscribe()
            // 设置定时器，每隔3秒请求一次
            timeHeart()
        })
        socket.onMessage((e) => {
            loading.value = false
            handlerData(e.data)
        })
    }
}

onHide(() => {
    socket.close()
    socket = null
})
onShow(async () => {
    await loadData()
})
</script>

<route lang='yaml'>
style:
navigationStyle: custom
</route>

<style lang='scss'>
.dropdown {
    min-width: 208px;
    height: 46px;
    padding: 0 20px;
    border-radius: 22px;
}

.dropdown-item {
    z-index: 99999;
    width: 208px;
    position: absolute;
    right: 0;
    top: 72px;
    padding: 0 18px;
    border-radius: 22px;
}

.h-0 {
    height: 0;
    transition: .3s linear;
    overflow: hidden;
}

.h-auto {
    height: auto;
    padding: 30px 18px;
    transition: .3s linear;
    overflow: hidden;

    .item {
        margin-top: 26px;
    }

    .item:first-child {
        margin-top: 0;
    }
}
</style>
