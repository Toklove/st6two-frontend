<template>
    <page-meta />
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
                    <view class='flex items-center justify-between rounded-full'>
                        <text class='text-[#525252] text-[28px] mr-[20px]'>Please select</text>
                    </view>
                </view>
                <view class='mt-[20px]'>
                    <view v-for='item in 10' class='stock-row items-center' @click='toPage("/pages/position/chart")'>
                        <view class='flex'>
                            <image class='rounded-full w-[72px] h-[72px]'
                                   src='https://api.gomarketes.com/storage/products/MTQYoOCxnMQtPiXtP7Yx2yL9wikyYL1K5gc04VMD.png'></image>
                            <view class='flex flex-col justify-between ml-[20px]'>
                                <text class='text-[30px]'>GBPUSD</text>
                                <text class='sub-title text-[22px]'>
                                    17:28:16
                                </text>
                            </view>
                        </view>
                        <text class='text-[28px] text-right'>
                            1.27669
                        </text>
                        <view class='h-[68px] ml-[20px] rounded-[10px] grid place-items-center green-block'>
                            <text class='text-[22px] text-white'>-0.045</text>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </layout>
</template>

<script lang='ts' setup>
function toPage(url) {
    uni.navigateTo({ url })
}

</script>

<route lang='yaml'>
style:
navigationStyle: custom
</route>
