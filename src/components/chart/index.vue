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

let socket = new WebSocket(wsUrl)
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
    socket.send(JSON.stringify(createHistoryKRequest(Interval.value)))
}

socket.onopen = () => {
    subscribeData()
}

socket.onmessage = (event) => {
    loading.value = false
    const blob = event.data
    handlerData(blob)
}

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
        chart.value.applyNewData([
            { close: 4976.16, high: 4977.99, low: 4970.12, open: 4972.89, timestamp: 1587660000000, volume: 204 },
            { close: 4977.33, high: 4979.94, low: 4971.34, open: 4973.20, timestamp: 1587660060000, volume: 194 },
            { close: 4977.93, high: 4977.93, low: 4974.20, open: 4976.53, timestamp: 1587660120000, volume: 197 },
            { close: 4966.77, high: 4968.53, low: 4962.20, open: 4963.88, timestamp: 1587660180000, volume: 28 },
            { close: 4961.56, high: 4972.61, low: 4961.28, open: 4961.28, timestamp: 1587660240000, volume: 184 },
            { close: 4964.19, high: 4964.74, low: 4961.42, open: 4961.64, timestamp: 1587660300000, volume: 191 },
            { close: 4968.93, high: 4972.70, low: 4964.55, open: 4966.96, timestamp: 1587660360000, volume: 105 },
            { close: 4979.31, high: 4979.61, low: 4973.99, open: 4977.06, timestamp: 1587660420000, volume: 35 },
            { close: 4977.02, high: 4981.66, low: 4975.14, open: 4981.66, timestamp: 1587660480000, volume: 135 },
            { close: 4985.09, high: 4988.62, low: 4980.30, open: 4986.72, timestamp: 1587660540000, volume: 76 },
        ])
        // chart.value.applyNewData(result)
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
    socket = new WebSocket(wsUrl)
    socket.onopen = () => {
        subscribeData()
    }
    socket.onmessage = (event) => {
        loading.value = false
        const blob = event.data
        handlerData(blob)
    }
    initTicker()
    socket.send(JSON.stringify(createHistoryKRequest(Interval.value)))
    console.log(Interval.value)
}
</script>
