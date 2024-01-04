<template>
    <view class="bg-white my-[40px]">
        <view class="flex items-center justify-between">
            <text
                v-for="(item, index) in timeList" :key="index"
                :class="index === activeNav ? 'text-white bg-black' : ''"
                class="flex items-center justify-center w-[80px] h-[42px] text-[24px] bg-[#f5f7f9] rounded-[20px] transition-all"
                @click="changeInterval(item)"
            >
                {{ item.name }}
            </text>
        </view>

        <view class="w-full h-[500px] relative">
            <view
                v-if="loading"
                class="absolute w-full h-full top-0 left-0 bg-white z-100 flex items-center justify-center"
            >
                <FuiLoading size="24px" vertical>
                    {{ t('common.loading') }}
                </FuiLoading>
            </view>
            <view id="chartContainer" ref="chartContainer" class="w-full h-full mt-[20px]" />
        </view>
    </view>
</template>

<script lang='ts' setup>
import { useI18n } from 'vue-i18n'
import { getCurrentInstance, reactive, ref } from 'vue'
import { init } from 'klinecharts'
import FuiLoading from '~/components/firstui/fui-loading/fui-loading.vue'

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

const socket = new WebSocket(wsUrl)
const Interval = ref('5M')
const chart = ref()
const loading = ref(false)
onUnmounted(() => {
    socket.close()
})

function handlerData(msg) {
    const data = JSON.parse(msg)
    // if (data.ping) {
    //     socket.send(JSON.stringify({ pong: data.ping }))
    // }
    // else
    if (Array.isArray(data)) {
        // const dataList = data.map(({ id, open, close, high, low, vol }) => ({
        //     timestamp: id * 1000,
        //     open,
        //     close,
        //     high,
        //     low,
        //     volume: vol,
        // }))
        chart.value.applyNewData(data)
        loading.value = false
    }
    else if (data.unsubbed) {
        subscribeData()
    }
    else {
        chart.value.updateData(data)
    }
}

// const TIME_UNIT_MAP = {
//     m: 'min',
//     h: 'hour',
//     d: 'day',
//     w: 'week',
//     M: 'mon',
// }

// function formatPeriod(str) {
//     const [, unit, number] = str.match(/([A-z]+)([0-9]+)/)
//     return number + TIME_UNIT_MAP[unit]
// }

function createHistoryKRequest(interval) {
    // const [, unit, number] = interval.match(/([A-z]+)([0-9]+)/)
    // let shijian = number
    // if (unit === 'h')
    //     shijian *= 60
    // else if (unit === 'd')
    //     shijian *= 60 * 24
    // else if (unit === 'w')
    //     shijian *= 60 * 24 * 3.5
    //
    // const from = Math.trunc(Date.now() / 1000) - 60 * 900 * shijian
    //
    // return {
    //     req: `market.${SYMBOL.value}.kline.${formatPeriod(interval)}`,
    //     id: SYMBOL.value,
    //     from,
    //     to: Math.trunc(Date.now() / 1000),
    // }
    return {
        type: 'ticker',
        market: `${SYMBOL.value}_${interval}`,
        time: interval,

    }
}

function createSubKRequest(interval) {
    // return {
    //     sub: `market.${SYMBOL.value}.kline.${formatPeriod(interval)}`,
    //     id: SYMBOL.value,
    // }
    return {
        type: 'subscribe',
        market: SYMBOL.value,
        time: interval,
    }
}

function createUnsubKRequest(interval) {
    return {
        type: 'unsubscribe',
        market: SYMBOL.value,
        time: interval,
    }
}

function subscribeData() {
    socket.send(JSON.stringify(createHistoryKRequest(Interval.value)))
    socket.send(JSON.stringify(createSubKRequest(Interval.value)))
}

socket.onopen = () => {
    subscribeData()
}

socket.onmessage = (event) => {
    const blob = event.data
    handlerData(blob)
}

function initChart() {
    loading.value = true
    chart.value = init('chartContainer', {
        styles: {
            candle: { tooltip: { showRule: 'none' } },
            grid: { horizontal: { show: false }, vertical: { show: false } },
        },
    })
}

onMounted(() => {
    initChart()
})

const activeNav = ref(1)

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
        value: '1D',
    },
])

function changeInterval(val) {
    socket.send(JSON.stringify(createUnsubKRequest(Interval.value)))
    loading.value = true
    const { name } = val
    timeList.forEach((item, i) => {
        if (item.name === name) {
            activeNav.value = i
            Interval.value = item.value
        }
    })
    socket.send(JSON.stringify(createHistoryKRequest(Interval.value)))
    socket.send(JSON.stringify(createSubKRequest(Interval.value)))
    // Interval.value = timeList[index].value
    console.log(Interval.value)
}
</script>
