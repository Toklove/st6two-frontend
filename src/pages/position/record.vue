<template>
    <page-meta />
    <div class='init-top' />
    <layout class-name='IndexRouter'>
        <FuiNavBar custom>
            <view class='flex justify-center relative items-center flex-1'>
                <view class='absolute left-0'>
                    <FuiIcon name='arrowleft' @click='clickBack'></FuiIcon>
                </view>
                <USubsection
                    v-model='current'
                    :list='subList' active-color='white' button-color='#3640f0' class='w-[350px]' rounded
                ></USubsection>
            </view>
        </FuiNavBar>
        <view class='mt-[20px] mx-[34px]'>
            <view v-if='list.length > 0'>
                <view class='card flex items-center justify-between bg-[#f5f7f9]'>
                    <view class='text-[28px]'>
                        <view class=''>$1000.00</view>
                        <view class='text-[22px] mt-[20px]'>2023-12-19 13:42:20</view>
                    </view>
                    <view>
                        <text class='text-[28px] green-text'>通過</text>
                    </view>
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

function clickBack() {
    uni.navigateBack()
}

const subList = [
    {
        name: '入金',
    },
    {
        name: '出金',
    },
]
const current = ref(0)

const list = ref([1])
</script>

<route lang='yaml'>
style:
navigationStyle: custom
</route>

<style lang='scss' scoped>
.card {
    margin-bottom: 14px;
    padding: 36px 30px;
    //background-color: #fff;
    border-radius: 30px;
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
