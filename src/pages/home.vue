<template>
    <page-meta />
    <view class='init-top' />
    <layout class-name='IndexRouter'>
        <view class='flex flex-row justify-between items-center px-[34px]'>
            <text class='text-[40px] font-bold'>
                username
            </text>
            <view class='flex items-center'>
                <image class='w-[41px] h-[40px]' src='/static/images/msg.png'></image>
                <image class='ml-[25px] border-full w-[92px] h-[92px]' src='/static/images/avatar.png'></image>
            </view>
        </view>
        <view class='mt-[18px]'>
            <view class='text-[45px] pl-[34px]'>Noteworthy</view>
            <scroll-view class='mt-[20px]' scroll-x>
                <view class='items-center flex'>
                    <view v-for='item in 3' class='flex flex-col rounded-[30px] chart-wrap'>
                        <text class='text-[28px] font-bold'>
                            GBPUSD
                        </text>
                        <text class='text-[40px] font-bold'>
                            1.27461
                        </text>
                        <view class='mb-[54px] mt-[30px] h-[28px] chart'>

                        </view>
                        <view class='flex items-center justify-between'>
                            <view class='increase text-[26px] text-center'>
                                -0.104
                            </view>
                            <text>
                                →
                            </text>
                        </view>
                    </view>
                </view>
            </scroll-view>
        </view>
        <view class='mt-[40px] px-[34px]'>
            <view class='flex items-center justify-between'>
                <text class='text-[45px]'>News</text>
                <text class='text-[20px]'>
                    See more
                </text>
            </view>
            <view class='mt-[20px]'>
                <swiper :autoplay='autoplay' :duration='duration' :indicator-dots='indicatorDots' :interval='interval'
                        circular class='h-[234px] bg-[#f5f7f9] rounded-[15px]'
                        vertical>
                    <swiper-item v-for='item in 3'>
                        <view class='news mr-[56px]'>
                            <view class='teletext flex justify-between'>
                                <view class='news-title text-[24px] line-clamp-3'>
                                    E-SUV Market Share, Size, Trends and Global Industry Growth Analysis Forecast Report
                                    [2030]
                                </view>
                                <image class='news-image rounded-[10px]'
                                       src='https://ml.globenewswire.com/Resource/Download/05408ba1-26b1-4fdd-8f48-1af4df373348'></image>
                            </view>
                            <div class='desc mt-[21px] text-[20px] sub-title flex items-center justify-between'>
                                <text>
                                    2023-12-15 14:09:00
                                </text>
                                <text>
                                    TSLA/us
                                </text>
                            </div>
                        </view>
                    </swiper-item>
                </swiper>
            </view>
        </view>
        <view class='mt-[40px] px-[34px]'>
            <view class='flex items-center justify-between'>
                <text class='text-[45px]'>Market</text>
                <text class='text-[20px]'>
                    See more
                </text>
            </view>
            <view class='mt-[20px]'>
                <view v-for='item in 10' class='stock-row items-center'>
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
    </layout>
</template>

<script lang='ts' setup>
useHead({
    title: '首页',
})
</script>

<route lang='yaml'>
style:
navigationStyle: custom
</route>
<style lang='scss'>
.chart-wrap {
    margin-left: 20px;
    padding: 36px 26px;
    background-color: #d8f0dd;
    min-width: 280px;

    .increase {
        padding: 8px 20px;
        background-color: #fff;
        border-radius: 28px;
    }
}

.chart-wrap:nth-child(even) {
    color: #fff;
    background-color: #9f9cff;

    .increase {
        background-color: #8581f6;
    }
}

.news {
    margin: 30px 26px 26px 26px;

    .teletext {
        height: 114px;

        .news-title {
            width: 406px;
            height: 104px;
        }

        .news-image {
            width: 186px;
            height: 114px;
        }
    }

    .desc {
        padding-top: 10px;
        border-top: 1px solid #d1d1d1;
    }
}

.sub-title {
    color: #8c8c8c !important;
}

.stock-row {
    display: grid;
    grid-template-columns: auto 156px 156px;
    margin-bottom: 14px;
    padding: 26px 20px;
    background-color: #f5f7f9;
    border-radius: 30px;
}
</style>
