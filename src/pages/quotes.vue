<template>
    <page-meta :page-style='pageStyle' />
    <div class='init-top' />
    <layout class-name='IndexRouter'>
        <view class='px-[34px]'>
            <view class='flex items-center bg-[#f5f7f9] py-[31px] px-[30px] rounded-[50px]'>
                <image class='w-[35px] h-[38px] mr-[21px]' src='/static/images/icon-search.png'></image>
                <text class='text-[#525252] text-[28px]'>Enter the content here</text>
            </view>
            <view class='mt-[59px] relative'>
                <view class='flex items-center justify-between'>
                    <text class='text-[45px]'>Market</text>
                    <text class='text-[20px]'>
                        See more
                    </text>
                </view>
            </view>
        </view>
    </layout>
</template>

<script lang='ts' setup>
</script>

<route lang='yaml'>
style:
navigationStyle: custom
</route>
