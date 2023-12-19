<template>
    <page-meta />
    <div class="init-top" />
    <layout class-name="IndexRouter">
        <FuiNavBar custom>
            <view class="flex justify-center relative items-center flex-1">
                <view class="absolute left-0">
                    <FuiIcon name="arrowleft"></FuiIcon>
                </view>
                <USubsection
                    v-model="current"
                    :list="subList" active-color="white" button-color="#3640f0" class="w-[350px]" rounded
                ></USubsection>
            </view>
        </FuiNavBar>
        <view class="mt-[20px] mx-[34px]">
            <view class="p-[30px] bg-[#f5f7f9] rounded-[20px]">
                <text class="text-[30px]">
                    金额
                </text>
                <input class="input mt-[29px] text-[50px] font-bold" placeholder="請輸入金额" type="number">
                <view class="line mt-[29px] mb-[20px]"></view>
                <view class="text-[22px] sub-title">手續費：0.000</view>
            </view>
            <view class="mt-[30px] p-[30px] bg-[#f5f7f9] rounded-[20px]">
                <view class="flex items-center justify-between">
                    <text class="sub-title text-[24px]">錢包地址</text>
                    <image class="w-[16px] h-[8px]" src="/static/images/icon-dropdown-black.png"></image>
                </view>
                <div class="flex flex-col mt-[30px] p-[30px] text-[24px] bg-white rounded-[20px]">
                    <text>USDT-TRC20</text>
                    <text class="sub-title">2321 ****** 2321</text>
                </div>
            </view>

        </view>
        <view class="btn-wrap text-center">
            <view class="bg-black py-[33px] rounded-[20px]">
                <text class="text-[32px] font-bold text-white">
                    Submit
                </text>
            </view>
        </view>
    </layout>
</template>

<script lang="ts" setup>
import FuiNavBar from '~/components/firstui/fui-nav-bar/fui-nav-bar.vue'
import FuiIcon from '~/components/firstui/fui-icon/fui-icon.vue'
import USubsection from '~/components/toklove/sub-section/sub-section.vue'

const subList = [
    {
        name: 'Purse',
    },
    {
        name: 'Bank Card',
    },
]
const current = ref(0)

const list = ref([1])
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
