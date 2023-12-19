<template>
    <page-meta />
    <div class="init-top" />
    <layout class-name="IndexRouter">
        <view class="mt-[20px] mx-[34px]">
            <view class="relative">
                <view class="flex justify-between items-center">
                    <text class="text-[35px]">貨幣選擇</text>
                    <view class="flex justify-between items-center py-[12px] px-[24px] rounded-full bg-black">
                        <text class="text-[26px] text-white">USDT-TRC20</text>
                    </view>
                </view>
            </view>
            <view class="p-[30px] mt-[40px] bg-[#f5f7f9] rounded-[20px]">
                <text class="text-24px] sub-title">
                    將TOKEN转账到以下地址
                </text>
                <view class="grid place-items-center p-[12px]">
                    <view class="qrcode">
                        二维码
                    </view>
                </view>
                <view class="flex items-center justify-center py-[4px] text-center bg-white rounded-[25px]">
                    <view>
                        <image class="w-[22px] h-[22px]" src="/static/images/icon-copy-deposit.png"></image>
                    </view>
                    <text class="ml-[10px] text-[24px]">
                        TFEdKESckBxiJLhXGP9CVX7qp396PeyoBv
                    </text>
                </view>
            </view>
        </view>
    </layout>
</template>

<script lang="ts" setup>
import { layoutDataKey } from '~/composables/provide'

const layoutData = ref({
    showTopBar: true,
    topBarBgColor: 'white',
    showTopBarBackBtn: true,
    topBarTitle: '入金',
})

provide(layoutDataKey, layoutData)
</script>

<route lang="yaml">
style:
navigationStyle: custom
</route>

<style lang="scss" scoped>
.wallet-item {
    width: 682px;
    height: 210px;
    background: url(/static/images/bg-wallet.png) no-repeat;
    background-size: cover;
}

.nodata {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.line {
    border-bottom: 2px solid #f0f2fe;
}

.sub-title {
    color: #8c8c8c !important
}

.input {
    font-size: 28px;
    color: #242323;
}

.btn-wrap {
    position: absolute;
    left: 50%;
    bottom: 100px;
    width: 650px;
    transform: translateX(-50%);
}
</style>
