<template>
    <page-meta />
    <div class='init-top' />
    <layout class-name='IndexRouter'>
        <view class='px-[34px]'>
            <view class='text-[45px] font-bold'>歷史訂單</view>
            <view class='relative mt-[56px]'>
                <view class='relative flex rounded-[15px] active-l row pt-[40px] px-[24px]'>
                    <view class='flex flex-row'>
                        <image class='rounded-full w-[72px] h-[72px]'
                               src='https://api.gomarketes.com/storage/products/MTQYoOCxnMQtPiXtP7Yx2yL9wikyYL1K5gc04VMD.png'></image>
                        <view class='flex-1 ml-[12px]'>
                            <div class='grid'></div>
                        </view>
                    </view>
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
<style>
.row {
    width: 100%;
    height: 162px;
    margin-top: 10px;
    background: url(/static/images/bg-history.png) no-repeat;
    background-size: 100%;
    box-sizing: border-box;
    overflow-y: hidden;
}

.active-l {
    height: 162px;
    transition: .5s linear;
}
</style>
