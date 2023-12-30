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

        <view class='w-full h-[500px] relative'>
            <view v-if='loading'
                  class='absolute w-full h-full top-0 left-0 bg-white z-100 flex items-center justify-center'>
                <fui-loading size='24px' vertical>
                    {{ t('common.loading') }}
                </fui-loading>
            </view>
            <view id='chartContainer' ref='chartContainer' class='w-full h-full mt-[20px]' />
        </view>
    </view>
</template>
<script lang='ts' setup>
import FuiLoading from '~/components/firstui/fui-loading/fui-loading.vue'
import { useI18n } from 'vue-i18n'
import { getCurrentInstance, reactive, ref } from 'vue'
import { init } from 'klinecharts'
import pakoInflate from 'pako/dist/pako_inflate'

const { t } = useI18n()

const props = defineProps({
    symbol: {
        type: String,
        default: 'btcusdt',
    },
})

const chartContainer = ref()
const SYMBOL = ref(props.symbol)
const wsUrl = getCurrentInstance()?.appContext.config.globalProperties.$wsUrl

const socket = new WebSocket(wsUrl)
const Interval = ref('m5')
const chart = ref()
const paneId = ref()
const loading = ref(false)
onUnmounted(() => {
    socket.close()
})

const handlerData = (msg) => {
    const data = JSON.parse(msg)
    if (data.ping) {
        socket.send(JSON.stringify({ pong: data.ping }))
    } else if (data.data) {
        const dataList = data.data.map(({ id, open, close, high, low, vol }) => ({
            timestamp: id * 1000,
            open,
            close,
            high,
            low,
            volume: vol,
        }))
        chart.value.applyNewData(dataList)
        loading.value = false
    } else if (data.tick) {
        const { id, open, close, high, low, vol } = data.tick
        const candle = { timestamp: id * 1000, open, close, high, low, volume: vol }
        chart.value.updateData(candle)
    } else if (data.unsubbed) {
        subscribeData()
    }
}

const TIME_UNIT_MAP = {
    m: 'min',
    h: 'hour',
    d: 'day',
    w: 'week',
    M: 'mon',
}

const formatPeriod = (str) => {
    const [, unit, number] = str.match(/([A-z]+)([0-9]+)/)
    return number + TIME_UNIT_MAP[unit]
}

const createHistoryKRequest = (interval) => {
    const [, unit, number] = interval.match(/([A-z]+)([0-9]+)/)
    let shijian = number
    if (unit === 'h')
        shijian *= 60
    else if (unit === 'd')
        shijian *= 60 * 24
    else if (unit === 'w')
        shijian *= 60 * 24 * 3.5

    const from = Math.trunc(Date.now() / 1000) - 60 * 900 * shijian

    return {
        req: `market.${SYMBOL.value}.kline.${formatPeriod(interval)}`,
        id: SYMBOL.value,
        from,
        to: Math.trunc(Date.now() / 1000),
    }
}

const createSubKRequest = interval => ({
    sub: `market.${SYMBOL.value}.kline.${formatPeriod(interval)}`,
    id: SYMBOL.value,
})

const createUnsubKRequest = interval => ({
    unsub: `market.${SYMBOL.value}.kline.${formatPeriod(interval)}`,
    id: SYMBOL.value,
})

const subscribeData = () => {
    socket.send(JSON.stringify(createHistoryKRequest(Interval.value)))
    socket.send(JSON.stringify(createSubKRequest(Interval.value)))
}

socket.onopen = () => {
    subscribeData()
}

socket.onmessage = (event) => {
    const blob = event.data
    const fileReader = new FileReader()
    fileReader.onload = (e) => {
        const payloadData = new Uint8Array(e.target.result)
        const msg = pakoInflate.inflate(payloadData, { to: 'string' })
        handlerData(msg)
    }
    fileReader.readAsArrayBuffer(blob)
}

const initChart = () => {
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
        value: 'm1',
    }, {
        name: '5M',
        value: 'm5',
    }, {
        name: '15M',
        value: 'm15',
    }, {
        name: '30M',
        value: 'm30',
    }, {
        name: '4H',
        value: 'h4',
    }, {
        name: '1D',
        value: 'd1',
    },
])

const changeInterval = (val) => {
    socket.send(JSON.stringify(createUnsubKRequest(Interval.value)))
    loading.value = true
    const { name } = val
    timeList.forEach((item, i) => {
        if (item.name === name) {
            activeNav.value = i
            Interval.value = item.value
        }
    })
    // Interval.value = timeList[index].value
    console.log(Interval.value)
}

</script>
