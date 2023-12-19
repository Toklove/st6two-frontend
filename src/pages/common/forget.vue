<template>
    <page-meta />
    <view class="init-top" />
    <layout class-name="IndexRouter">
        <view class="px-[50px]">
            <view class="mt-[84px] flex flex-col text-white">
                <text class="text-[70px] font-bold">Retrieve</text>
                <text class="text-[26px] mt-[18px]">Retrieve up to join</text>
            </view>
            <view class="form-wrap mt-[79px]">
                <view class="flex items-center p-[28px] bg-[#f5f7f9] rounded-[20px]">
                    <image class="w-[44px] h-[44px]" src="/static/images/icon-email.png"></image>
                    <input class="flex-1 ml-[19px] input" placeholder="Email" type="text">
                </view>
                <view class="flex items-center p-[28px] mt-[30px] bg-[#f5f7f9] rounded-[20px]">
                    <image class="w-[44px] h-[44px]" src="/static/images/icon-password.png"></image>
                    <view class="flex items-center justify-between flex-1">
                        <input
                            :type="isPassword ? 'password' : 'text'" class="flex-1 ml-[19px] input"
                            placeholder="Password"
                        >
                        <image
                            :src="isPassword ? '/static/images/icon-off.png' : '/static/images/icon-on.png'"
                            class="w-[36px] h-[36px]" @click="isPassword = !isPassword"
                        ></image>
                    </view>
                </view>
                <view class="flex items-center p-[28px] mt-[30px] bg-[#f5f7f9] rounded-[20px]">
                    <image class="w-[44px] h-[44px]" src="/static/images/icon-code.png"></image>
                    <view class="flex items-center justify-between flex-1">
                        <input
                            class="flex-1 ml-[19px] input" placeholder="Verification code"
                            type="text"
                        >
                        <view class="w-[100px] text-[22px] rounded-[20px] text-center bg-black text-white py-[8px]">
                            Send
                        </view>
                    </view>
                </view>
            </view>
            <view class="btn-wrap text-center">
                <view class="bg-black py-[33px] rounded-[20px]">
                    <text class="text-[32px] font-bold text-white">
                        Submit
                    </text>
                </view>
                <view class="mt-[39px] text-[28px] text-white">
                    <text>Existing account&nbsp;</text>
                    <text class="font-bold" @click="toPage('/pages/common/login')">
                        Log in
                    </text>
                </view>
            </view>
        </view>
    </layout>
</template>

<script lang="ts" setup>
import { layoutDataKey } from '~/composables/provide'

const isPassword = ref(true)

const layoutData = ref({
    showTopBar: true,
    topBarBgColor: 'transparent',
    showTopBarBackBtn: true,
    topBarTitle: 'Back',
    className: 'text-white',
    backIconColor: 'white',
})

function toPage(url) {
    uni.navigateTo({ url })
}

provide(layoutDataKey, layoutData)
</script>

<style lang="scss" scoped>
uni-page-body {
    min-height: 100vh;
    background: url(/static/images/bg-login.png) no-repeat fixed;
    background-size: cover;
}

.btn-wrap {
    position: absolute;
    left: 50%;
    bottom: 100px;
    width: 650px;
    transform: translateX(-50%);
}
</style>
<route lang="yaml">
style:
navigationStyle: custom
</route>