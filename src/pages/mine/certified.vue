<template>
    <page-meta />
    <div class="init-top" />
    <layout class-name="IndexRouter">
        <view class="px-[34px]">
            <view class="text-[45px] leading-[60px]">
                Upload ID photo
            </view>
            <view class="text-[26px] sub-title leading-[36px]">Make sure the border is complete</view>
            <view class="bg-[#f5f7f9] mt-[50px] p-[28px] rounded-[20px]">
                <input class="flex-1 ml-[19px] input" placeholder="Please enter the Real name" type="text">
            </view>
            <view class="bg-[#f5f7f9] mt-[20px] p-[28px] rounded-[20px]">
                <input class="flex-1 ml-[19px] input" placeholder="Please enter the ID number" type="text">
            </view>
            <view class="mt-[30px] text-center">
                <image class="mt-[22px] icon-upload" src="/static/images/real-upload.png"></image>
            </view>
            <view class="mt-[30px] text-center">
                <image class="mt-[22px] icon-upload" src="/static/images/real-upload.png"></image>
            </view>
            <view class="mt-[98px] text-center">
                <text class="text-[22px] sub-title">The platform will encrypt information to ensure information security
                    in real time
                </text>
            </view>
            <view class="mt-[30px] py-[24px] text-center bg-[#f5f7f9] rounded-[40px]">
                <text class="text-[28px] font-bold sub-title">Submit</text>
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
    topBarTitle: 'Certified',
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
</style>
