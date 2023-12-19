<template>
    <page-meta />
    <div class="init-top" />
    <layout class-name="IndexRouter">
        <view class="px-[34px]">
            <view class="text-center">
                <image class="w-[140px] h-[140px]" src="/static/images/icon-big-password.png"></image>
            </view>
            <view class="flex items-center p-[28px] mt-[30px] bg-[#f5f7f9] rounded-[20px]">
                <image class="w-[44px] h-[44px]" src="/static/images/icon-password.png"></image>
                <view class="flex items-center justify-between flex-1">
                    <input
                        class="flex-1 ml-[19px] input" placeholder="Please enter the New password"
                        type="password"
                    >
                </view>
            </view>
            <view class="flex items-center p-[28px] mt-[30px] bg-[#f5f7f9] rounded-[20px]">
                <image class="w-[44px] h-[44px]" src="/static/images/icon-password.png"></image>
                <view class="flex items-center justify-between flex-1">
                    <input
                        class="flex-1 ml-[19px] input" placeholder="Please enter the Confirm password"
                        type="password"
                    >
                </view>
            </view>
            <view class="flex items-center p-[28px] mt-[30px] bg-[#f5f7f9] rounded-[20px]">
                <image class="w-[44px] h-[44px]" src="/static/images/icon-password.png"></image>
                <view class="flex items-center justify-between flex-1">
                    <input
                        class="flex-1 ml-[19px] input" placeholder="Please enter the Old password"
                        type="password"
                    >
                </view>
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
import { layoutDataKey } from '~/composables/provide'

const layoutData = ref({
    showTopBar: true,
    topBarBgColor: 'white',
    showTopBarBackBtn: true,
    topBarTitle: 'Change Password',
})

provide(layoutDataKey, layoutData)
</script>

<route lang="yaml">
style:
navigationStyle: custom
</route>

<style lang="scss" scoped>
.sub-title {
    color: #8c8c8c !important
}

.input {
    font-size: 28px;
    color: #242323;
}

.icon-upload {
    width: 534px;
    height: 320px;
}

.btn-wrap {
    position: absolute;
    left: 50%;
    bottom: 100px;
    width: 650px;
    transform: translateX(-50%);
}
</style>
