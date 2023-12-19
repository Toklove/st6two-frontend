<template>
    <page-meta />
    <view class="init-top" />
    <layout class-name="IndexRouter">
        <view class="card-wrap text-white">
            <view class="flex justify-end">
                <view class="btn-account flex items-center justify-center">
                    <image class="w-[23px] h-[21px]" src="/static/images/icon-switch.png"></image>
                    <text class="text-[24px] scale-90">Real account</text>
                </view>
            </view>
            <view class="flex flex-col px-[40px] pt-[18px]">
                <text class="text-[34px] leading-[48px]">Total account value</text>
                <text class="text-[68px] font-bold leading-[98px]">1000.00</text>
                <text class="text-[22px] font-bold leading-[32px]">
                    freeze funds : 0
                </text>
                <view class="flex items-center justify-between mt-[20px]">
                    <view class="flex items-center">
                        <view
                            class="flex items-center justify-center h-[52px] btn-amount"
                            @click="toPage('/pages/position/withdraw')"
                        >
                            <image class="w-[52px] h-[52px]" src="/static/images/icon-withdraw.png"></image>
                            <text class="ml-[19px] text-[26px] font-bold">
                                Withdraw
                            </text>
                        </view>
                        <view
                            class="flex items-center justify-center h-[52px] btn-amount ml-[20px]"
                            @click="toPage('/pages/position/deposit')"
                        >
                            <image class="w-[52px] h-[52px]" src="/static/images/icon-deposit.png"></image>
                            <text class="ml-[19px] text-[26px] font-bold">
                                Deposit
                            </text>
                        </view>
                    </view>
                    <image class="w-[28px] h-[31px]" src="/static/images/icon-order.png"
                           @click="toPage('/pages/position/bill')"></image>
                </view>
            </view>
        </view>
        <view class="mt-[40px] px-[34px]">
            <FuiTabs
                :short="false" :tabs="tabs" color="#8C8C8C" selected-color="#000" slider-background="#000"
                @change="change"
            />
        </view>

        <view v-if="loading" class="mt-[36px]">
            <FuiLoading :is-fixed="false" :loading="loading" type="row" />
        </view>

        <view v-if="!loading" class="px-[34px] pt-[20px]">
            <scroll-view v-if="list.length > 0" scroll-x>
                <view class="h-[120px] mt-[20px] p-[20px] bg-[#f5f7f9] rounded-[30px]">
                    <view class="flex flex-row">
                        <image
                            class="rounded-full w-[72px] h-[72px]"
                            src="https://api.gomarketes.com/storage/products/MTQYoOCxnMQtPiXtP7Yx2yL9wikyYL1K5gc04VMD.png"
                        ></image>
                        <view class="flex-1 ml-[12px]">
                            <view class="grid items-center col">
                                <view class="flex items-center">
                                    <text class="text-[30px]">
                                        USDAUD
                                    </text>
                                    <text class="lever ml-[14px] text-[20px]">
                                        x100
                                    </text>
                                </view>
                                <text class="hands text-[22px] h-[32px] grid place-items-center text-center">
                                    0.01
                                </text>
                                <text class="text-[28px] text-right text-red">-6.61</text>
                            </view>
                            <view class="flex mt-[20px] items-center justify-between">
                                <view class="flex items-center text-[22px]">
                                    <text>1.49611 -</text>
                                    <text class="red-text">> 1.4896</text>
                                </view>
                                <view class="font-bold text-[22px]">买入</view>
                            </view>
                        </view>
                    </view>
                </view>
            </scroll-view>
            <view v-else class="grid place-items-center text-center mt-[40px]">
                <image class="w-[340px] h-[340px]" src="/static/images/position.png"></image>
            </view>
        </view>
    </layout>
</template>

<script lang="ts" setup>
import FuiTabs from '~/components/firstui/fui-tabs/fui-tabs.vue'
import FuiLoading from '~/components/firstui/fui-loading/fui-loading.vue'

const list = ref([1])
const loading = ref(false)

const tabs = [
    'Position',
    'Entrust',
]

function toPage(url) {
    uni.navigateTo({ url })
}

function change(e) {
    console.log(e)
    loading.value = true
    setTimeout(() => {
        loading.value = false
    }, 1500)
}
</script>

<route lang="yaml">
style:
navigationStyle: custom
</route>

<style lang="scss" scoped>
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

    .hands {
        width: 120px;
        text-align: center;
        background: #c3e6ff;
        border-radius: 14px;
    }
}
</style>
