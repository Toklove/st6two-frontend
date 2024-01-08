<template>
    <view class='bg-white my-[40px]'>
        <view class='flex items-center justify-between'>
            <text
                v-for='(item, index) in timeList' :key='index'
                :class="index === activeNav ? 'text-white bg-black' : ''"
                class='flex items-center justify-center w-[80px] h-[42px] text-[24px] bg-[#f5f7f9] rounded-[20px] transition-all'
                @click='changeInterval(item)'
            >
                {{ item.name }}
            </text>
        </view>
        <view v-show='loading'>
            <view class='market-skeleton relative h-[500px] mt-[20px]'>
                <fui-skeleton :preloadList='charts.market3' outerClass='market-skeleton'
                ></fui-skeleton>
            </view>

        </view>
        <view v-show='!loading' class='w-full h-[500px] relative'>
            <view id='chartContainer' ref='chartContainer' class='w-full h-full mt-[20px]' />
        </view>
    </view>
</template>

<script lang='ts' setup>
import { useI18n } from 'vue-i18n'
import { getCurrentInstance, reactive, ref } from 'vue'
import { init } from 'klinecharts'
import charts from '~/skeleton/position/chart.js'
import FuiSkeleton from '~/components/firstui/fui-skeleton/fui-skeleton.vue'

const props = defineProps({
    symbol: {
        type: String,
        default: 'BTC-USD',
    },
})

const { t } = useI18n()

const chartContainer = ref()
const SYMBOL = ref(props.symbol)
const wsUrl = getCurrentInstance()?.appContext.config.globalProperties.$wsUrl

let socket = uni.connectSocket({
    url: wsUrl,
    success: () => {
        console.log('连接成功')
    },
})
const Interval = ref('1M')
const chart = ref()
const loading = ref(false)
onUnmounted(() => {
    socket.close()
})

function handlerData(msg) {
    const data = JSON.parse(msg)

    const result = {
        timestamp: data.id * 1000,
        open: data.open,
        close: data.close,
        high: data.high,
        low: data.low,
        volume: data.vol,

    }

    chart.value.updateData(result)
}

function createHistoryKRequest(time) {
    return { type: 'kline', symbol: SYMBOL.value, time, language: 'en_US' }
}

function subscribeData() {
    socket.send({ data: JSON.stringify(createHistoryKRequest(Interval.value)) })
}

socket.onOpen(function() {
    subscribeData()
    // 设置定时器，每隔3秒请求一次
    timeHeart()
})

socket.onMessage(function(e) {
    loading.value = false
    handlerData(e.data)
})

function initTicker() {
    $api.get('/market/kline', { symbol: SYMBOL.value, time: Interval.value, num: 300 }).then((res) => {
        const result = res.data.map(item => ({
            timestamp: item.id * 1000,
            open: item.open,
            close: item.close,
            high: item.high,
            low: item.low,
            volume: item.volume,
        }))
        chart.value.applyNewData(result)
    })
}

function initChart() {
    loading.value = true
    chart.value = init('chartContainer', {
        styles: {
            candle: { tooltip: { showRule: 'none' } },
            grid: { horizontal: { show: false }, vertical: { show: false } },
        },
    })
    chart.value.setPriceVolumePrecision(6, 6)
}

onMounted(async () => {
    await initChart()
    initTicker()
})

const activeNav = ref(0)

const timeList = reactive([
    {
        name: '1M',
        value: '1M',
    }, {
        name: '5M',
        value: '5M',
    }, {
        name: '15M',
        value: '15M',
    }, {
        name: '30M',
        value: '30M',
    }, {
        name: '1H',
        value: '1H',
    }, {
        name: '1D',
        value: 'D',
    },
])

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

function changeInterval(val) {
    // 断开之前的连接
    socket.close()
    loading.value = true
    const { name } = val
    timeList.forEach((item, i) => {
        if (item.name === name) {
            activeNav.value = i
            Interval.value = item.value
        }
    })

    // 重新连接
    socket = new uni.connectSocket({
        url: wsUrl,
        success: () => {
            console.log('连接成功')
        },
    })
    socket.onOpen(function() {
        subscribeData()
        // 设置定时器，每隔3秒请求一次
        timeHeart()
    })
    socket.onMessage(function(e) {
        loading.value = false
        handlerData(e.data)
    })
    initTicker()
    socket.send(JSON.stringify(createHistoryKRequest(Interval.value)))
    console.log(Interval.value)
}
</script>
