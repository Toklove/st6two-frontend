<template>
    <page-meta />
    <div class="init-top" />
    <layout class-name="IndexRouter">
        <view class="px-[34px]">
            <view class="relative text-center">
                <image class="w-[200px] h-[200px]" src="/static/images/avatar.png"></image>
                <image
                    class="absolute right-[40%] bottom-[10px] w-[36px] h-[36px]"
                    src="/static/images/icon-edit-avator.png"
                ></image>
            </view>
            <view class="input mt-[71px] p-[30px] rounded-[20px] bg-[#f5f7f9]">
                <input placeholder="Please enter the Nickname" type="text">
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
    topBarTitle: 'Personal information',
})

provide(layoutDataKey, layoutData)
</script>

<route lang="yaml">
style:
navigationStyle: custom
</route>

<style>
.chat {
    width: 100%;
    height: 100%;
    min-height: 0px;
    min-width: 0px;
    margin: 0px;
    padding: 0px;
    background-image: none;
    background-position: 0% 0%;
    background-size: initial;
    background-attachment: scroll;
    background-origin: initial;
    background-clip: initial;
    background-color: rgba(0, 0, 0, 0);
    border-width: 0px;
    float: none;
    color-scheme: normal;
    position: absolute;
    inset: 0px;
    transition: none 0s ease 0s !important;
    display: block;
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
