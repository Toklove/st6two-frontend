<template>
    <page-meta />
    <div class="init-top" />
    <layout class-name="IndexRouter">
        <view class="px-[34px]">
            <view class="text-[45px] font-bold">{{ t('tabBar.history.HistoricalOrders') }}</view>
            <view class="relative mt-[56px]">
                <!-- v-if="!loading" -->
                <view v-if="!loading">
                    <view v-if="list.length >0" v-for="(item, index) in list" :key="index" :class="item.show_detail ? 'active-h' : 'active-l'"
                    class="relative flex flex-col rounded-[15px] row pt-[40px] px-[24px]"
                    @click="item.show_detail = !item.show_detail">
                    <view class="flex flex-row">
                        <image :src="item.market.logo" class="rounded-full w-[72px] h-[72px]"></image>
                        <view class="flex-1 ml-[12px]">
                            <view class="grid items-center col">
                                <view class="flex items-center">
                                    <text class="text-[30px]">
                                        {{ item.market.name }}
                                    </text>
                                    <text class="lever ml-[14px] text-[20px]">
                                        x{{ item.lever }}
                                    </text>
                                </view>
                                <text class="hands text-[22px] h-[32px] grid place-items-center text-center">
                                    0.01
                                </text>
                                <text class="text-[28px] text-right text-red">-6.61</text>
                            </view>
                            <view class="flex mt-[20px] items-center justify-between">
                                <view class="flex items-center text-[22px]">
                                    <text>{{ item.paid_price }} -</text>
                                    <text class="red-text">> {{ item.close_price }}</text>
                                </view>
                                <view class="font-bold text-[22px]">{{ t('tabBar.history.buy') }}</view>
                            </view>
                        </view>
                    </view>
                    <view class="stock-data mt-[40px] border-[#dadada] text-[#8c8c8c] pt-[26px] text-[22px]">
                        <view class="flex items-center justify-between">
                            <view class="flex items-center justify-between flex-1">
                                <text>{{ t('tabBar.history.StopSurplus') }}</text>
                                <text class="text-black">{{ item.stop_surplus }}</text>
                            </view>
                            <view class="flex items-center justify-between ml-[50px] flex-1">
                                <text>{{ t('tabBar.history.HandlingFees') }}</text>
                                <text class="text-black">{{ item.all_fee }}</text>
                            </view>
                        </view>
                        <view class="flex items-center justify-between mt-[12px]">
                            <view class="flex items-center justify-between flex-1">
                                <text>{{ t('tabBar.history.StopLoss') }}</text>
                                <text class="text-black">{{ item.stop_loss }}</text>
                            </view>
                            <view class="flex items-center justify-between ml-[50px] flex-1">
                                <text>{{ t('tabBar.history.SecurityDeposit') }}</text>
                                <text class="text-black">{{ item.assure }}</text>
                            </view>
                        </view>
                        <view class="flex flex-col mt-[24px]">
                            <view class="flex items-center justify-between">
                                <text>{{ t('tabBar.history.OrderNumber') }}</text>
                                <text>{{ item.order_num }}</text>
                            </view>
                            <view class="flex items-center justify-between mt-[12px]">
                                <text>{{ t('tabBar.history.OrderTime') }}</text>
                                <text>{{ item.created_at }}</text>
                            </view>
                            <view class="flex items-center justify-between mt-[12px]">
                                <text>{{ t('tabBar.history.ClosingTime') }}</text>
                                <text>20231228120045680012ETH267680</text>
                            </view>
                            <view class="flex items-center justify-between mt-[12px]">
                                <text>{{ t('tabBar.history.ClosingType') }}</text>
                                <text>{{ t('tabBar.history.ManualOperation') }}</text>
                            </view>
                        </view>
                    </view>
                    <image :src="item.show_detail ? '/static/images/icon-shangla.png' : '/static/images/icon-xiala.png'"
                        class="absolute left-[50%] bottom-[16px] cursor-pointer w-[18px] h-[18px]"
                        style="transform: translateX(-50%);"></image>
                </view>
                <view v-else class="nodata">
                    <image class="w-[340px] h-[340px]" src="/static/images/option.png"></image>
                </view>
                </view>
                <!-- v-else -->
                <view v-else>
                    <view class='relative flex flex-col rounded-[15px] row pt-[40px] px-[24px]'>
                        <fui-skeleton :preloadList='history.market' outerClass='market-skeleton'></fui-skeleton>
                    </view>
                    <view class='relative flex flex-col rounded-[15px] row pt-[40px] px-[24px]'>
                        <fui-skeleton :preloadList='history.market' outerClass='market-skeleton'></fui-skeleton>
                    </view>
                    <view class='relative flex flex-col rounded-[15px] row pt-[40px] px-[24px]'>
                        <fui-skeleton :preloadList='history.market' outerClass='market-skeleton'></fui-skeleton>
                    </view>
                    <view class='relative flex flex-col rounded-[15px] row pt-[40px] px-[24px]'>
                        <fui-skeleton :preloadList='history.market' outerClass='market-skeleton'></fui-skeleton>
                    </view>
                    <view class='relative flex flex-col rounded-[15px] row pt-[40px] px-[24px]'>
                        <fui-skeleton :preloadList='history.market' outerClass='market-skeleton'></fui-skeleton>
                    </view>
                    <view class='relative flex flex-col rounded-[15px] row pt-[40px] px-[24px]'>
                        <fui-skeleton :preloadList='history.market' outerClass='market-skeleton'></fui-skeleton>
                    </view>
                    <view class='relative flex flex-col rounded-[15px] row pt-[40px] px-[24px]'>
                        <fui-skeleton :preloadList='history.market' outerClass='market-skeleton'></fui-skeleton>
                    </view>
                    <view class='relative flex flex-col rounded-[15px] row pt-[40px] px-[24px]'>
                        <fui-skeleton :preloadList='history.market' outerClass='market-skeleton'></fui-skeleton>
                    </view>

                </view>
            </view>
        </view>
    </layout>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import history from '~/skeleton/tabbar/history.js'
const list = ref([])
const { t } = useI18n()
let loading = ref(true)
// 分页参数
const page = ref({
    page: 1,
    max: 1,
})

function showToast(message) {
    uni.showToast({
        title: message,
        icon: 'none',
    })
}

// 上拉加载更多数据
function loadMore() {
    if (page.value.page >= page.value.max) {
        showToast(t('tabBar.history.NoMoreData'))
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
            return item
        })
        if (page.value.page === 1){
            list.value = data
            loading.value = false
        }
            
        else
            list.value = list.value.concat(data)
            loading.value = false
    })
}

onLoad(() => {
    getHistory()
})
</script>

<route lang='yaml'>
style:
navigationStyle: custom
</route>

<style>
.row {
    width: 100%;
    height: 162px;
    margin-top: 10px;
    background: url(/static/images/bg-history.png) no-repeat;
    background-size: 100%;
    box-sizing: border-box;
    overflow-y: hidden;

    .col {
        grid-template-columns: auto 150px 150px;

        .lever {
            color: #3a7ff6;
        }

        .hands {
            width: 120px;
            text-align: center;
            background: #c3e6ff;
            border-radius: 14px;
        }
    }
}

.active-l {
    height: 162px;
    transition: .5s linear;
}

.active-h {
    height: 468px;
    transition: .5s linear;
}

.stock-data {}
</style>
