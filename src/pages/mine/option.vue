<template>
    <page-meta />
    <div class="init-top" />
    <layout class-name="IndexRouter">
        <FuiNavBar custom>
            <view class="flex justify-center relative items-center flex-1">
                <view class="absolute left-0">
                    <FuiIcon name="arrowleft" @click="clickBack"></FuiIcon>
                </view>
                <USubsection
                    v-model="current"
                    :list="subList" active-color="white" button-color="#3640f0" class="w-[350px]" rounded
                    @change="change"
                ></USubsection>
            </view>
        </FuiNavBar>
        <view class="mt-[20px] mx-[34px]">
            <view v-if="list.length > 0">
                <view v-for="item in list" :key="item.id" class="order-row px-[30px] py-[40px] text-[22px]">
                    <view class="flex items-center justify-between text-[30px]">
                        <text>{{ item.market.full_name }}</text>
                        <text>{{ item.buy_price }}</text>
                    </view>
                    <view :class="item.type === 1 ? &quot;buy-2&quot; : &quot;buy-1&quot;" class="font-bold text-right mt-[14px]">
                        {{ item.type === 1 ? t('mine.option.Sell') : t('mine.option.Buy') }}
                    </view>
                    <view class="line mt-[30px]"></view>
                    <view class="flex items-center justify-between mt-[20px]">
                        <view class="flex flex-1 items-center justify-between">
                            <text class="sub-title">{{ t('mine.option.amount') }}</text>
                            <text>{{ item.quantity }}</text>
                        </view>
                        <view class="flex flex-1 items-center justify-between ml-[50px]">
                            <text class="sub-title">{{ t('mine.option.duration') }}</text>
                            <text>{{ item.hold_time }}</text>
                        </view>
                    </view>
                    <view class="flex items-center justify-between mt-[20px]">
                        <text class="sub-title">{{ t('mine.option.HandlingFee') }}</text>
                        <text>{{ item.all_fee }}</text>
                    </view>
                    <view class="flex items-center justify-between mt-[20px] sub-title">
                        <text>{{ t('mine.option.OrderTime') }}</text>
                        <text>{{ item.created_at }}</text>
                    </view>
                    <view v-if="item.status === 1" class="flex items-center justify-between mt-[20px] sub-title">
                        <text>{{ t('mine.option.SettlementTime') }}</text>
                        <text>{{ item.sell_time }}</text>
                    </view>
                    <view v-if="item.status === 1" class="flex items-center justify-between mt-[20px] sub-title">
                        <text>{{ t('mine.option.ProfitLoss') }}</text>
                        <text class="win">{{ item.profit }}</text>
                    </view>
                </view>
            </view>
            <view v-else class="nodata">
                <image class="w-[340px] h-[340px]" src="/static/images/option.png"></image>
            </view>
        </view>
    </layout>
</template>

<script lang='ts' setup>
import { useI18n } from 'vue-i18n'
import FuiNavBar from '~/components/firstui/fui-nav-bar/fui-nav-bar.vue'
import FuiIcon from '~/components/firstui/fui-icon/fui-icon.vue'
import USubsection from '~/components/toklove/sub-section/sub-section.vue'

function clickBack() {
    $api.back()
}

const { t } = useI18n()

const loading = ref(false)

function subList() {
    return [
        {
            name: t('mine.option.position'),
        },
        {
            name: t('mine.option.history'),
        },
    ]
}
const current = ref(0)

const list = ref([])

// 分页参数
const page = ref({
    page: 1,
    max: 1,
    status: 0,
})

function change(e) {
    loading.value = true
    page.value.status = e
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
        showToast(t('mine.option.NoMoreData'))
        return
    }
    page.value.page++
    getHistory()
}

onReachBottom(() => {
    loadMore()
})

function getHistory() {
    $api.get('/market/option_order_history', page.value).then((res) => {
        page.value.max = res.data.last_page
        const data = res.data.data.map((item) => {
            item.show_detail = false
            item.market.logo = $api.staticUrl(item.market.logo)
            return item
        })
        if (page.value.page === 1)
            list.value = data
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

<style lang='scss' scoped>
.order-row {
    margin-top: 30px;
    background: #f5f7f9;
    border-radius: 30px;

    .buy-1 {
        color: #3a7ff6;
    }

    .buy-2 {
        color: #de5d56;
    }

    .win {
        color: rgb(51, 205, 153)
    }

    .loss {
        color: rgb(233, 88, 43);
    }

    .line {
        height: 2px;
        background: #dadada;
    }
}

.order-row:first-child {
    margin-top: 0;
}

.sub-title {
    color: #8c8c8c !important;
}

.nodata {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>
