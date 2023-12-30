<template>
    <page-meta />
    <div class='init-top' />
    <layout class-name='IndexRouter'>
        <FuiNavBar custom>
            <view class='flex justify-center relative items-center flex-1'>
                <view class='absolute left-0'>
                    <FuiIcon name='arrowleft' @click='clickBack'></FuiIcon>
                </view>
                <view class='absolute right-[16px]' @click='like'>
                    <image
                        :src="info.is_like ? '/static/images/icon-star.png' : '/static/images/icon-un-star.png'"
                        class='w-[40px] h-[40px]'
                    ></image>
                </view>
                <USubsection
                    v-model='current'
                    :list='subList' active-color='white' button-color='#3640f0' class='w-[350px]' rounded
                ></USubsection>
            </view>
        </FuiNavBar>
        <view class='px-[34px] mt-[20px]'>
            <view class='flex items-center justify-between py-[25px] px-[20px] rounded-[30px] bg-[#f5f7f9]'>
                <view class='flex items-center'>
                    <image
                        :src='info.logo'
                        class='w-[72px] h-[72px] rounded-full'
                    ></image>
                    <view class='flex flex-col ml-[15px] text-[30px]'>
                        <text>{{ info.full_name }}</text>
                        <text>{{ nowData.lastPrice.toFixed(2) }}</text>
                    </view>
                </view>
                <text
                    :class="diffAmount > 0 ? 'green-block' : 'red-block'"
                    class='rate-wrap py-[14px] text-[26px] text-center text-white rounded-[28px] px-[28px] green-block'
                >
                    {{ diffAmount > 0 ? '+' : '' }}{{ diffAmount }}
                </text>
            </view>

            <!-- TODO APP中使用webview实现 -->
            <KLineChart :symbol='chartPair' />

            <view class='statistics mt-[29px] mx-[34px]'>
                <text class='text-[30px]'>
                    {{ t('position.chart.Statistics') }}
                </text>
                <view
                    class='flex items-center justify-between mt-[29px] px-[34px] py-[38px] bg-[#f5f7f9] rounded-[30px]'
                >
                    <view class='flex-1'>
                        <view>
                            <view class='flex items-center'>
                                <image class='w-[20px] h-[20px] mr-[10px]' src='/static/images/icon-dollar.png'></image>
                                <text class='text-[26px] sub-title'>{{ t('position.chart.Open') }}</text>
                            </view>
                            <text class='text-[30px] leading-[52px]'>{{ nowData.open.toFixed(2) }}</text>
                        </view>
                        <view class='mt-[20px]'>
                            <view class='flex items-center'>
                                <image
                                    class='w-[20px] h-[20px] mr-[10px]'
                                    src='/static/images/icon-arrow-down.png'
                                ></image>
                                <text class='text-[26px] sub-title'>{{ t('position.chart.Low') }}</text>
                            </view>
                            <text class='text-[30px] leading-[52px]'>{{ nowData.low.toFixed(2) }}</text>
                        </view>
                    </view>
                    <view class='flex-1'>
                        <view>
                            <view class='flex items-center'>
                                <image
                                    class='w-[20px] h-[20px] mr-[10px]'
                                    src='/static/images/icon-arrow-up.png'
                                ></image>
                                <text class='text-[26px] sub-title'>{{ t('position.chart.High') }}</text>
                            </view>
                            <text class='text-[30px] leading-[52px]'>{{ nowData.high.toFixed(2) }}</text>
                        </view>
                        <view class='mt-[20px]'>
                            <view class='flex items-center'>
                                <image
                                    class='w-[20px] h-[20px] mr-[10px]'
                                    src='/static/images/icon-foldline.png'
                                ></image>
                                <text class='text-[26px] sub-title'>{{ t('position.chart.volume') }}</text>
                            </view>
                            <text class='text-[30px] leading-[52px]'>{{ nowData.vol.toFixed(2) }}</text>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <view class='btn-wrap flex items-center justify-around font-bold py-[20px] bg-white'>
            <view class='btn font-bold btn-0' @click='createOrder(0)'>{{ t('position.chart.Sell') }}</view>
            <view class='btn font-bold btn-1' @click='createOrder(1)'>{{ t('position.chart.Buy') }}</view>
        </view>
        <view v-show='showContract' class='order-wrap'>
            <view class='place'>
                <view class='order-type flex justify-between font-bold'>
                    <view class='flex items-center justify-between'>
                        <view
                            :class="contractFrom.type === 0 ? 'active' : ''"
                            class='item grid place-items-center transition-all'
                            @click='contractFrom.type = 0'
                        >
                            Market
                            Price
                        </view>
                        <view
                            :class="contractFrom.type === 1 ? 'active' : ''"
                            class='item grid place-items-center transition-all'
                            @click='contractFrom.type = 1'
                        >
                            Order
                        </view>
                    </view>
                    <image
                        class='w-[48px] h-[48px]' src='/static/images/icon-close.png'
                        @click='showContract = false'
                    ></image>
                </view>
                <view class='now-price grid place-items-center bg-[#f5f7f9]'>
                    <text :class="diffAmount > 0 ? 'green-text' : 'red-text'" class='text-[76px] font-bold'>
                        {{ nowData.lastPrice.toFixed(2) }}
                    </text>
                </view>
                <view class='mx-[24px] px-[24px] bg-[#f5f7f9] rounded-[20px]'>
                    <view v-show='contractFrom.type === 1' class='row py-[20px]'>
                        <view class='col'>
                            <text class='text-[28px]'>Order Price</text>
                            <view>
                                <FuiInputNumber
                                    v-model:modelValue='contractFrom.order_price'
                                    :max='999999999'
                                    :min='0'
                                    width='160'
                                    @change='changeOrderPrice'
                                ></FuiInputNumber>
                            </view>
                        </view>
                        <text class='text-[24px] sub-title'>Price limit => {{ nowData.lastPrice.toFixed(2) }}</text>
                    </view>
                    <view class='row py-[20px]'>
                        <view class='col'>
                            <text class='text-[28px]'>Stop surplus</text>
                            <view>
                                <FuiInputNumber
                                    v-model:modelValue='contractFrom.stop_surplus'
                                    :disabled='contractFrom.disabled_stop_surplus'
                                    :max='999999999'
                                    :min='0'
                                    width='160'
                                    @change='changeStopSurplus'
                                ></FuiInputNumber>
                            </view>
                            <view class='mr-[34px] flex items-center justify-end'>
                                <FuiSwitch @change='changeStopSurplusStatus'></FuiSwitch>
                            </view>
                        </view>
                        <text class='text-[24px] sub-title'>Price limit => {{ nowData.lastPrice.toFixed(2) }}</text>
                    </view>
                    <view class='row py-[20px]'>
                        <view class='col'>
                            <text class='text-[28px]'>Stop loss</text>
                            <view>
                                <FuiInputNumber
                                    v-model:modelValue='contractFrom.stop_loss'
                                    :disabled='contractFrom.disabled_stop_loss'
                                    :max='999999999'
                                    :min='0'
                                    width='160'
                                    @change='changeStopLoss'
                                ></FuiInputNumber>
                            </view>
                            <view class='mr-[34px] flex items-center justify-end'>
                                <FuiSwitch @change='changeStopLossStatus'></FuiSwitch>
                            </view>
                        </view>
                        <text class='text-[24px] sub-title'>Price limit => {{ nowData.lastPrice.toFixed(2) }}</text>
                    </view>
                    <view class='row py-[20px]'>
                        <view class='col'>
                            <view class='flex items-center'>
                                <text class='text-[28px]'>Quantity</text>
                                <view class='hands text-[22px] sub-title'>
                                    (0.01~10000)
                                </view>
                            </view>
                            <view>
                                <FuiInputNumber
                                    v-model:value='contractFrom.quantity'
                                    :max='999999999'
                                    :min='0.01'
                                    width='160'
                                    @change='changeQuantity'
                                ></FuiInputNumber>
                            </view>
                        </view>
                    </view>
                    <view class='py-[20px]'>
                        <text class='text-[28px]'>Lever</text>
                        <view class='flex flex-wrap text-[22px]'>
                            <text
                                class='flex items-center justify-center w-[80px] h-[43px] mt-[15px] mx-[24px] bg-[#f5f7f9] rounded-[20px] text-white bg-black'
                            >
                                {{ contractFrom.lever }}
                            </text>
                        </view>
                    </view>
                </view>
                <view class='flex flex-col mx-[34px] mt-[10px] text-[24px] sub-title'>
                    <text>Handling fee: 0.1</text>
                    <text class='mt-[10px]'>Cash deposit: 10.00000</text>
                </view>
                <view class='submit text-center'>
                    <view class='py-[22px] text-center bg-black rounded-[40px]' @click='placeContractOrder'>
                        <text class='text-[28px] font-bold text-white'>
                            Place an order
                        </text>
                    </view>
                    <view class='mt-[20px] text-[26px]'>
                        <text>Available balance：</text>
                        <text>{{ userStore.userInfo.balance }}</text>
                    </view>
                </view>
            </view>
        </view>
        <view v-show='showOption' class='order-wrap'>
            <view class='second-contract'>
                <view>
                    <view class='now-price grid place-items-center bg-[#f5f7f9]'>
                        <text :class="diffAmount > 0 ? 'green-text' : 'red-text'" class='text-[76px] font-bold'>
                            {{ nowData.lastPrice.toFixed(2) }}
                        </text>
                    </view>
                    <view class='time-wrap mx-[24px] rounded-[20px]'>
                        <view class='p-[24px] bg-[#f5f7f9] rounded-[20px]'>
                            <view class='trade-symbol flex items-center justify-between py-[15px]'>
                                <text>交易对</text>
                                <text>{{ symbol }}</text>
                            </view>
                            <view class='flex items-center justify-between py-[15px]'>
                                <text>方向</text>
                                <text :class='optionForm.type === 0?"red-text":"green-text"'>
                                    {{ optionForm.type === 0 ? '買少' : '買多' }}
                                </text>
                            </view>
                        </view>
                        <view class='py-[15px]'>
                            <text class='mx-[24px]'>選擇到期時間</text>
                            <view class='grid grid-cols-5 text-[22px]'>
                                <text
                                    v-for='item in optionSetting'
                                    :key='item.id'
                                    :class="optionForm.time_id === item.id ? 'bg-black text-white' : ''"
                                    class='flex items-center justify-center w-[80px] h-[43px] mt-[15px] mx-[24px] bg-[#f5f7f9] rounded-[20px] transition-all'
                                    @click='changOptionTime(item)'
                                >
                                    {{ item.time }}s
                                </text>
                            </view>
                        </view>
                    </view>
                    <view class='flex items-center justify-between mt-[20px] mx-[48px] text-[22px] sub-title'>
                        <text>預計收益率</text>
                        <text>{{ optionForm.time.rate * 100 }}%</text>
                    </view>
                    <view class='buy-amount mt-[20px] mx-[24px] px-[24px] py-[10px] rounded-[20px]'>
                        <text class='text-[26px]'>
                            交易數量(>={{ optionForm.time.min_amount }})
                        </text>
                        <input v-model='optionForm.quantity' class='text-[50px] font-bold my-[20px]' type='number'>
                        <view class='flex items-center justify-between text-[22px] sub-title'>
                            <text>預期收益</text>
                            <text>{{ optionForm.quantity * optionForm.time.rate }}</text>
                        </view>
                    </view>
                    <view class='flex justify-between items-center mt-[20px] mx-[48px] text-[22px] sub-title'>
                        <text>手續費</text>
                        <text>0</text>
                    </view>
                    <view class='submit text-center'>
                        <view class='py-[22px] text-center bg-black rounded-[40px]'>
                            <text class='text-[28px] font-bold text-white' @click='placeOptionOrder'>
                                Place an order
                            </text>
                        </view>
                        <view class='mt-[20px] text-[26px]'>
                            <text>Available balance：</text>
                            <text>{{ userStore.userInfo.balance }}</text>
                        </view>
                    </view>
                </view>
                <image
                    class='w-[88px] h-[88px] second-close' src='/static/images/icon-close-contract.png'
                    @click='showOption = false'
                ></image>
            </view>
        </view>
    </layout>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import pako from 'pako/dist/pako_inflate'
import FuiNavBar from '~/components/firstui/fui-nav-bar/fui-nav-bar.vue'
import FuiIcon from '~/components/firstui/fui-icon/fui-icon.vue'
import USubsection from '~/components/toklove/sub-section/sub-section.vue'
import KLineChart from '~/components/chart/index.vue'
import FuiInputNumber from '~/components/firstui/fui-input-number/fui-input-number.vue'
import FuiSwitch from '~/components/firstui/fui-switch/fui-switch.vue'

const userStore = useUserStore()

const wsUrl = getCurrentInstance()?.appContext.config.globalProperties.$wsUrl

// 从路由pair参数获取symbol
const symbol = ref('')

const chartPair = computed(() => {
    let val = symbol.value.toLocaleLowerCase()
    val = val.replace('-', '')
    return `${val}t`
})

const current = ref(0)

const subList = [
    {
        name: 'Contract',
    },
    {
        name: 'Option',
    },
]

function clickBack() {
    $api.back()
}

const info = ref({})

const socket = new WebSocket(wsUrl)

const showContract = ref(false)
const showOption = ref(false)
const contractFrom = ref({
    type: 0,
    order_price: 0,
    stop_surplus: 0,
    disabled_stop_surplus: true,
    stop_loss: 0,
    disabled_stop_loss: true,
    quantity: 0.01,
    lever: 100,
    order_type: 0,
})

const nowData = ref({
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
})

const prevData = ref({
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
})

function createOrder(type) {
    if (current.value === 0) {
        contractFrom.value.order_type = type
        showContract.value = true
    } else {
        optionForm.value.type = type
        showOption.value = true
    }
}

function changeOrderPrice(val) {
    console.log(val)
    contractFrom.value.order_price = val.value
}

function changeStopSurplus(val) {
    console.log(val)
    contractFrom.value.stop_surplus = val.value
}

function changeStopSurplusStatus(val) {
    console.log(val)
    contractFrom.value.stop_surplus = nowData.value.lastPrice
    contractFrom.value.disabled_stop_surplus = !val.detail.value
}

function changeStopLoss(val) {
    console.log(val)
    contractFrom.value.stop_loss = val.value
}

function changeStopLossStatus(val) {
    contractFrom.value.stop_loss = nowData.value.lastPrice
    contractFrom.value.disabled_stop_loss = !val.detail.value
}

function changeQuantity(val) {
    console.log(val)
    contractFrom.value.quantity = val.value
}

function placeContractOrder() {
    console.log(contractFrom.value)
    $api.post('/market/contract_order', {
        symbol: symbol.value,
        order_type: contractFrom.value.order_type,
        order_price: contractFrom.value.order_price,
        stop_surplus: contractFrom.value.stop_surplus,
        stop_loss: contractFrom.value.stop_loss,
        quantity: contractFrom.value.quantity,
        lever: contractFrom.value.lever,
    }).then((res) => {
        uni.showToast({
            title: res.message,
            icon: 'none',
        })
        if (res.code === 1) {
            setTimeout(() => {
                uni.switchTab({ url: '/pages/tabbar/position' })
            }, 1000)
        }
    })
}

function createSubTickerRequest() {
    return {
        sub: `market.${chartPair.value}.ticker`,
    }
}

function handlerData(msg) {
    const data = JSON.parse(msg)
    if (data.ping) {
        socket.send(JSON.stringify({ pong: data.ping }))
    } else if (data.tick) {
        prevData.value = nowData.value
        nowData.value = data.tick
    }
}

const diffAmount = computed(() => {
    return (nowData.value.open - nowData.value.close).toFixed(2)
})

function subscribeData() {
    socket.send(JSON.stringify(createSubTickerRequest()))
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
socket.onopen = () => {
    subscribeData()
}

function like() {
    $api.post('/market/like', {
        id: info.value.id,
    }).then((res) => {
        res.data.logo = $api.staticUrl(res.data.logo)
        info.value = res.data
        uni.showToast({
            title: res.message,
            icon: 'none',
        })
    })
}

const optionSetting = ref([])

const optionForm = ref({
    symbol: '',
    type: 0,
    time_id: 0,
    time: {},
    quantity: 0,
})

function changOptionTime(option) {
    optionForm.value.time_id = option.id
    optionForm.value.time = option
    optionForm.value.quantity = option.min_amount

}

function placeOptionOrder() {
    $api.post('/market/option_order', {
        symbol: symbol.value,
        type: optionForm.value.type,
        time_id: optionForm.value.time_id,
        quantity: optionForm.value.quantity,
    }).then((res) => {
        uni.showToast({
            title: res.message,
            icon: 'none',
        })
        if (res.code === 1) {
            setTimeout(() => {
                uni.switchTab({ url: '/pages/tabbar/position' })
            }, 1000)
        }
    })
}

function getInfo() {
    $api.get(`/market/info?symbol=${symbol.value}`).then((res) => {
        res.data.logo = $api.staticUrl(res.data.logo)
        info.value = res.data
    })
    $api.get('/market/option/setting').then((res) => {
        console.log(res)
        optionSetting.value = res.data
        optionForm.value.time_id = res.data[0].id
        optionForm.value.time = res.data[0]
        optionForm.value.quantity = res.data[0].min_amount
    })
}

onLoad((option) => {
    console.log(option)
    // 获取路由参数
    const { pair } = option
    symbol.value = pair
    // 获取币种信息
    getInfo()
})

const { t } = useI18n()
</script>

<route lang='yaml'>
style:
navigationStyle: custom
</route>

<style>
.sub-title {
    color: #8c8c8c !important;
}

.btn-wrap {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 176px;
    background-color: #fff;
    box-sizing: border-box;

    .btn-0 {
        background-color: #de5d56;
    }

    .btn-1 {
        background-color: #3a7ff6;
    }

    .btn {
        width: 312px;
        padding: 20px 0;
        text-align: center;
        color: #fff;
        border-radius: 40px;
        box-sizing: border-box;
        font-size: 30px;
    }

}

.order-wrap {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, .6);
    -webkit-backdrop-filter: blur(5px);
    backdrop-filter: blur(5px);
    z-index: 1000;

    .submit {
        position: absolute;
        bottom: 30px;
        left: 50%;
        width: 532px;
        -webkit-transform: translateX(-50%);
        transform: translateX(-50%);
    }

    .second-contract {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 724px;
        height: 1084px;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        background: url(/static/images/bg-contract.png) no-repeat;
        background-size: cover;

        .time-wrap {
            background: #dcdfe6;

            .trade-symbol {
                border-bottom: 1px solid #f0f2fe;
            }
        }

        .second-close {
            position: absolute;
            left: 50%;
            bottom: -124px;
            -webkit-transform: translateX(-50%);
            transform: translateX(-50%);
        }
    }

    .now-price {
        width: 624px;
        height: 160px;
        margin: 30px auto;
        border-radius: 30px;
    }

    .place {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 724px;
        height: 1084px;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        background: url(/static/images/bg-order.png) no-repeat;
        background-size: cover;

        .active {
            color: #fff !important;
            background: #3640f0 !important;
        }

        .order-type {
            margin: -72px 24px 0;
            height: 72px;

            .item {
                width: 220px;
                height: 72px;
                color: #545454;
                background: #d4d4d4;
                border-radius: 20px 20px 0px 0px;
            }
        }

        .row {
            border-bottom: 1px solid #f0f2fe;

            .col {
                display: grid;
                grid-template-columns: repeat(3, minmax(0, 1fr));
                align-items: center;

                .hands {
                    margin-left: -26px;
                    -webkit-transform: scale(.6);
                    transform: scale(.6);
                }
            }
        }
    }
}
</style>
