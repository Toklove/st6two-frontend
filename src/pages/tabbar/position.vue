<template>
    <page-meta />
    <view class="init-top" />
    <layout class-name="IndexRouter">
        <view class="card-wrap text-white">
            <view class="flex justify-end">
                <view class="btn-account flex items-center justify-center">
                    <image class="w-[23px] h-[21px]" src="/static/images/icon-switch.png"></image>
                    <text class="text-[24px] scale-90">{{ t('tabBar.position.RealAccount') }}</text>
                </view>
            </view>
            <view class="flex flex-col px-[40px] pt-[18px]">
                <text class="text-[34px] leading-[48px]">{{ t('tabBar.position.TotalAccountValue') }}</text>
                <text class="text-[68px] font-bold leading-[98px]">{{ userStore.userInfo.balance }}</text>
                <text class="text-[22px] font-bold leading-[32px]">
                    {{ t('tabBar.position.FreezeFunds') }} : 0
                </text>
                <view class="flex items-center justify-between mt-[20px]">
                    <view class="flex items-center">
                        <view
                            class="flex items-center justify-center h-[52px] btn-amount"
                            @click="toPage('/pages/position/withdraw')"
                        >
                            <image class="w-[52px] h-[52px]" src="/static/images/icon-withdraw.png"></image>
                            <text class="ml-[19px] text-[26px] font-bold">
                                {{ t('tabBar.position.Withdraw') }}
                            </text>
                        </view>
                        <view
                            class="flex items-center justify-center h-[52px] btn-amount ml-[20px]"
                            @click="toPage('/pages/position/deposit')"
                        >
                            <image class="w-[52px] h-[52px]" src="/static/images/icon-deposit.png"></image>
                            <text class="ml-[19px] text-[26px] font-bold">
                                {{ t('tabBar.position.Deposit') }}
                            </text>
                        </view>
                    </view>
                    <image
                        class="w-[28px] h-[31px]" src="/static/images/icon-order.png"
                        @click="toPage('/pages/position/record')"
                    ></image>
                </view>
            </view>
        </view>
        <view class="mt-[40px] px-[34px]">
            <FuiTabs
                :short="false" :tabs="tabs()" color="#8C8C8C" selected-color="#000" slider-background="#000"
                @change="change"
            />
        </view>

        <!-- <view v-if="loading" class="mt-[36px]">
            <FuiLoading :is-fixed="false" :loading="loading" type="row" />
        </view> -->

        <view class="px-[34px] pt-[20px]">
            <view v-if="!loading">
                <scroll-view v-if="list.length > 0 " scroll-x>
                    <view
                        v-for="item in list" :key="item.id"
                        class="h-[120px] mt-[20px] p-[20px] bg-[#f5f7f9] rounded-[30px]" @click="showOrder(item)"
                    >
                        <view class="flex flex-row">
                            <image
                                :src="item.market.logo"
                                class="rounded-full w-[72px] h-[72px]"
                            ></image>
                            <view class="flex-1 ml-[12px]">
                                <view class="grid items-center col">
                                    <view class="flex items-center">
                                        <text class="text-[30px]">
                                            {{ item.market.full_name }}
                                        </text>
                                        <text class="lever ml-[14px] text-[20px]">
                                            x{{ item.lever }}
                                        </text>
                                    </view>
                                    <text class="hands text-[22px] h-[32px] grid place-items-center text-center">
                                        {{ item.quantity }}
                                    </text>
                                    <text class="text-[28px] text-right text-red">-6.61</text>
                                </view>
                                <view class="flex mt-[20px] items-center justify-between">
                                    <view class="flex items-center text-[22px]">
                                        <text>{{ item.paid_price }} -</text>
                                        <text class="red-text">> {{ item.nowData.close }}</text>
                                    </view>
                                    <view class="font-bold text-[22px]">
                                        {{ item.type === 1 ? t('tabBar.position.Buy') : t('tabBar.position.Sell') }}
                                    </view>
                                </view>
                            </view>
                        </view>
                    </view>
                </scroll-view>
                <view v-else class="nodata">
                    <image class="w-[340px] h-[340px]" src="/static/images/option.png"></image>
                </view>
            </view>
            <view v-else>
                <view class="market-skeleton mt-[20px] relative h-[124px]">
                    <fui-skeleton :preload-list="position.market" outer-class="market-skeleton"></fui-skeleton>
                </view>
                <view class="market-skeleton mt-[20px] relative h-[124px]">
                    <fui-skeleton :preload-list="position.market" outer-class="market-skeleton"></fui-skeleton>
                </view>
                <view class="market-skeleton mt-[20px] relative h-[124px]">
                    <fui-skeleton :preload-list="position.market" outer-class="market-skeleton"></fui-skeleton>
                </view>
                <view class="market-skeleton mt-[20px] relative h-[124px]">
                    <fui-skeleton :preload-list="position.market" outer-class="market-skeleton"></fui-skeleton>
                </view>
                <view class="market-skeleton mt-[20px] relative h-[124px]">
                    <fui-skeleton :preload-list="position.market" outer-class="market-skeleton"></fui-skeleton>
                </view>
                <view class="market-skeleton mt-[20px] relative h-[124px]">
                    <fui-skeleton :preload-list="position.market" outer-class="market-skeleton"></fui-skeleton>
                </view>
                <view class="market-skeleton mt-[20px] relative h-[124px]">
                    <fui-skeleton :preload-list="position.market" outer-class="market-skeleton"></fui-skeleton>
                </view>
            </view>
        </view>
        <view v-show="showOrderDetail" class="order-wrap">
            <view class="detail pt-[28px]">
                <view class="income-wrap flex flex-col items-center justify-center bg-[#f5f7f9]">
                    <text class="detail-lever px-[30px] text-[22px]">x{{ editInfo.lever }}</text>
                    <text class="text-[76px] font-bold green-text my-[20px]">
                        1730
                    </text>
                    <text class="text-[22px]">
                        {{ t('tabBar.position.marketPrice') }}
                    </text>
                </view>
                <view class="stop-wrap p-[30px] bg-[#f5f7f9]">
                    <view class="row">
                        <view class="flex items-center">
                            <text>{{ editInfo.paid_price }} -</text>
                            <text class="green-text">> 1.27532</text>
                        </view>
                        <text class="hands text-[22px]">{{ editInfo.quantity }}</text>
                        <text class="font-bold text-[22px] text-right">
                            {{ editInfo.type === 1 ? t('tabBar.position.Buy') : t('tabBar.position.Sell') }}
                        </text>
                    </view>
                    <view class="flex items-center justify-between mt-[18px]">
                        <text>{{ t('tabBar.position.StopSurplus') }}</text>
                        <view class="flex items-center">
                            <text class="mr-[20px]">{{ editInfo.stop_surplus }}</text>
                            <image class="w-[36px] h-[36px]" src="/static/images/icon-edit.png"></image>
                        </view>
                    </view>
                    <view class="flex items-center justify-between mt-[18px]">
                        <text>{{ t('tabBar.position.StopLoss') }}</text>
                        <view class="flex items-center">
                            <text class="mr-[20px]">{{ editInfo.stop_loss }}</text>
                            <image class="w-[36px] h-[36px]" src="/static/images/icon-edit.png"></image>
                        </view>
                    </view>
                </view>
                <view class="group sub-title">
                    <view class="flex items-center justify-between text-[26px]">
                        <text>{{ t('tabBar.position.SecurityDeposit') }}</text>
                        <text>{{ editInfo.assure }}</text>
                    </view>
                    <view class="flex items-center justify-between text-[22px] mt-[15px]">
                        <text>{{ t('tabBar.position.OrderNumber') }}</text>
                        <text>{{ editInfo.order_num }}</text>
                    </view>
                    <view class="mt-[120px] flex items-center justify-between text-[22px] text-black">
                        <text>{{ t('tabBar.position.OrderTime') }}</text>
                        <text>{{ editInfo.created_at }}</text>
                    </view>
                </view>
                <view
                    v-if="editInfo.status === 1"
                    class="btn flex items-center justify-center text-[30px] h-[85px] bg-black rounded-[40px]"
                    @click="handClose"
                >
                    <text class="font-bold text-white">{{ t('tabBar.position.ClosePsition') }}</text>
                </view>
                <view
                    v-else class="btn flex items-center justify-center text-[30px] h-[85px] bg-black rounded-[40px]"
                    @click="handCancel"
                >
                    {{ t('tabBar.position.TakeTheCancellationOrder') }}
                </view>
                <image
                    class="w-[88px] h-[88px] close-btn" src="/static/images/icon-close-contract.png"
                    @click="showOrderDetail = false"
                ></image>
            </view>
        </view>
    </layout>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import FuiTabs from '~/components/firstui/fui-tabs/fui-tabs.vue'
import position from '~/skeleton/tabbar/position.js'

const loading = ref(false)
const list = ref([])
const wsUrl = getCurrentInstance()?.appContext.config.globalProperties.$wsUrl
let socket = null
const marketList = computed(() => {
    return list.value
})

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
        symbol += `${item.market.symbol}.`
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

function handlerData(msg) {
    const data = JSON.parse(msg)
    if (data.ping) {
        socket.send({ data: JSON.stringify({ pong: data.ping }) })
    }
    else {
        list.value.forEach((item) => {
            data.forEach((item2) => {
                if (item2.symbol === item.market.symbol)
                    item.nowData = item2
            })
        })
    }
}

async function loadData() {
    loading.value = true
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

const editInfo = ref({
    stop_surplus: 0,
    stop_loss: 0,
    id: null,
})
const showOrderDetail = ref(false)

function showOrder(info) {
    editInfo.value = info
    showOrderDetail.value = true
}

const { t } = useI18n()

function tabs() {
    return [
        t('tabBar.position.Position'),
        t('tabBar.position.Entrust'),
    ]
}

const userStore = useUserStore()

function toPage(url) {
    uni.navigateTo({ url })
}

// 分页参数
const page = ref({
    page: 1,
    max: 1,
    status: 1,
})

function change(e) {
    console.log(e)
    loading.value = true
    if (e.index === 0)
        page.value.status = 1
    else
        page.value.status = 0
    page.value.page = 1
    getHistory()
}

function showToast(message) {
    uni.showToast({
        title: message,
        icon: 'none',
    })
}

// 上拉加载更多数据
function loadMore() {
    if (page.value.page >= page.value.max) {
        showToast(t('tabBar.position.NoMoreData'))
        return
    }
    page.value.page++
    getHistory()
}

onReachBottom(() => {
    loadMore()
})

function getHistory() {
    $api.get('/market/contract_order_history', page.value).then((res) => {
        page.value.max = res.data.last_page
        const data = res.data.data.map((item) => {
            item.show_detail = false
            item.market.logo = $api.staticUrl(item.market.logo)
            item.nowData = {}
            return item
        })
        if (page.value.page === 1)
            list.value = data
        else
            list.value = list.value.concat(data)
        loading.value = false
    })
}

onHide(() => {
    socket.close()
    socket = null
})
onShow(async () => {
    await getHistory()
    await loadData()
})

function handClose() {
    uni.showModal({
        title: t('tabBar.position.prompt'),
        content: t('tabBar.position.closingThePosition'),
        success: (res) => {
            if (res.confirm) {
                $api.post('/market/hand_close_contract', {
                    id: editInfo.value.id,
                }).then(() => {
                    showToast(t('tabBar.position.ClosedPositionSuccessfully'))
                    showOrderDetail.value = false
                    getHistory()
                })
            }
        },
    })
}

function handCancel() {
    uni.showModal({
        title: t('tabBar.position.prompt'),
        content: t('tabBar.position.cancelThePendingOrder'),
        success: (res) => {
            if (res.confirm) {
                $api.post('/market/hand_cancel_contract', {
                    id: editInfo.value.id,
                }).then(() => {
                    showToast(t('tabBar.position.orderSucceededProcedure'))
                    showOrderDetail.value = false
                    getHistory()
                })
            }
        },
    })
}
</script>

<route lang='yaml'>
style:
navigationStyle: custom
</route>

<style lang='scss' scoped>
.close-btn {
    position: absolute;
    left: 50%;
    bottom: -124px;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
}

.card-wrap {
    width: 708px;
    height: 358px;
    margin-top: 16px;
    margin-left: auto;
    margin-right: auto;
    background: url("/static/images/position-card.png") no-repeat;
    background-size: cover;
}

.btn-account {
    width: 228px;
    height: 56px;
    background: #000;
    border-radius: 26px;
}

.btn-amount {
    width: 228px;
    background: #3640f0;
    border-radius: 28px;
}

.col {
    grid-template-columns: auto 150px 150px;

    .lever {
        color: #3a7ff6;
    }

}
.nodata{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.sub-title {
    color: #8c8c8c !important;
}

.hands {
    text-align: center;
    background: #c3e6ff;
    border-radius: 14px;
    height: 32px;
    display: grid;
    place-items: center;
}

.order-wrap {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, .6);
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    z-index: 1000;

    .detail {
        position: absolute;
        top: 45%;
        left: 50%;
        width: 724px;
        height: 958px;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        background: url(/static/images/bg-position.png) no-repeat;
        background-size: cover;

        .btn {
            width: 534px;
            margin: 50px auto 0;
        }

        .group {
            width: 676px;
            margin: 0 auto;
        }

        .income-wrap {
            width: 624px;
            height: 212px;
            margin: 0 auto;
            border-radius: 30px;

            .detail-lever {
                border: 2px solid #3980ff;
                border-radius: 30px;
            }
        }

        .stop-wrap {
            width: 676px;
            height: 280px;
            margin: 30px auto;
            border-radius: 30px;

            .row {
                display: grid;
                align-items: center;
                grid-template-columns: 364px 156px auto;
            }
        }
    }
}
</style>
