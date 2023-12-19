<template>
    <page-meta />
    <div class='init-top' />
    <layout class-name='IndexRouter'>
        <FuiNavBar custom>
            <view class='flex justify-center relative items-center flex-1'>
                <view class='absolute left-0'>
                    <FuiIcon name='arrowleft'></FuiIcon>
                </view>
                <view class='absolute right-[16px]' @click='toPage("/pages/mine/addWallet")'>
                    <image class='w-[27px] h-[27px]' src='/static/images/icon-edit-avator.png'></image>
                </view>
                <USubsection
                    v-model='current'
                    :list='subList' active-color='white' button-color='#3640f0' class='w-[350px]' rounded
                ></USubsection>
            </view>
        </FuiNavBar>
        <view class='mt-[20px] mx-[34px]'>
            <view v-if='list.length > 0' class='wallet-list'>
                <view class='flex items-center justify-between mb-[20px] px-[39px] wallet-item'>
                    <view class='flex flex-col text-white'>
                        <text class='text-[34px]'>USDT-TRC20</text>
                        <text class='mt-[10px] text-[40px] font-bold'>
                            2321 ****** 2321
                        </text>
                    </view>
                    <image class='w-[45px] h-[45px]' src='/static/images/icon-del.png'></image>
                </view>
            </view>
            <view v-else class='nodata'>
                <image class='w-[340px] h-[340px]' src='/static/images/option.png'></image>
            </view>
        </view>
    </layout>
</template>

<script lang='ts' setup>
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

function toPage(url) {
    uni.navigateTo({ url })
}

</script>

<route lang='yaml'>
style:
navigationStyle: custom
</route>

<style lang='scss' scoped>
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
</style>
