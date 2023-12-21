<template>
    <page-meta />
    <div class='init-top' />
    <layout class-name='IndexRouter'>
        <FuiNavBar custom>
            <view class='flex justify-center relative items-center flex-1'>
                <view class='absolute left-0'>
                    <FuiIcon name='arrowleft'></FuiIcon>
                </view>
                <view class='absolute right-[16px]'>
                    <image class='w-[40px] h-[40px]' src='/static/images/icon-un-star.png'></image>
                </view>
                <USubsection
                    v-model='current'
                    :list='subList' active-color='white' button-color='#3640f0' class='w-[350px]' rounded
                ></USubsection>
            </view>
        </FuiNavBar>
        <view class='px-[34px] mt-[20px]'>
            <view class='flex items-center justify-between py-[25px] px-[20px] rounded-[30px] bg-[#f5f7f9]'>
                <view class='flex items-center'>
                    <image
                        class='w-[72px] h-[72px] rounded-full'
                        src='https://api.gomarketes.com/storage/products/COZnoXQg30lxdD8eoICmCOoyAHsXvWFTxONjjEcv.png'
                    ></image>
                    <view class='flex flex-col ml-[15px] text-[30px]'>
                        <text>ETHUSD</text>
                        <text>2218.11</text>
                    </view>
                </view>
                <text
                    class='rate-wrap py-[14px] text-[26px] text-center text-white rounded-[28px] px-[28px] green-block'
                >
                    -0.06
                </text>
            </view>
            <view class='mt-[40px]'>
                <view class='flex items-center justify-between'>
                    <text
                        v-for='(item, index) in timeList' :key='index'
                        :class="index === activeTime ? 'text-white bg-black' : ''"
                        class='flex items-center justify-center w-[80px] h-[42px] text-[24px] bg-[#f5f7f9] rounded-[20px]'
                        @click='changeTime(index)'
                    >
                        {{ item.name }}
                    </text>
                </view>
            </view>

            <view id='chart' class='mt-[40px]'>
                <view id='renderKlineChart' class='h-[40vh]'></view>
            </view>

            <view class='statistics mt-[29px] mx-[34px]'>
                <text class='text-[30px]'>
                    Statistics
                </text>
                <view
                    class='flex items-center justify-between mt-[29px] px-[34px] py-[38px] bg-[#f5f7f9] rounded-[30px]'
                >
                    <view class='flex-1'>
                        <view>
                            <view class='flex items-center'>
                                <image class='w-[20px] h-[20px] mr-[10px]' src='/static/images/icon-dollar.png'></image>
                                <text class='text-[26px] sub-title'>Open</text>
                            </view>
                            <text class='text-[30px] leading-[52px]'>2218.39</text>
                        </view>
                        <view class='mt-[20px]'>
                            <view class='flex items-center'>
                                <image
                                    class='w-[20px] h-[20px] mr-[10px]'
                                    src='/static/images/icon-arrow-down.png'
                                ></image>
                                <text class='text-[26px] sub-title'>Low</text>
                            </view>
                            <text class='text-[30px] leading-[52px]'>2218.39</text>
                        </view>
                    </view>
                    <view class='flex-1'>
                        <view>
                            <view class='flex items-center'>
                                <image class='w-[20px] h-[20px] mr-[10px]'
                                       src='/static/images/icon-arrow-up.png'></image>
                                <text class='text-[26px] sub-title'>High</text>
                            </view>
                            <text class='text-[30px] leading-[52px]'>2218.39</text>
                        </view>
                        <view class='mt-[20px]'>
                            <view class='flex items-center'>
                                <image
                                    class='w-[20px] h-[20px] mr-[10px]'
                                    src='/static/images/icon-foldline.png'
                                ></image>
                                <text class='text-[26px] sub-title'>Vol</text>
                            </view>
                            <text class='text-[30px] leading-[52px]'>2218.39</text>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <view class='btn-wrap flex items-center justify-around font-bold py-[20px] bg-white'>
            <view class='btn font-bold btn-0'>Sell</view>
            <view class='btn font-bold btn-1'>Buy</view>
        </view>
    </layout>
</template>

<script lang='ts' setup>
import FuiNavBar from '~/components/firstui/fui-nav-bar/fui-nav-bar.vue'
import FuiIcon from '~/components/firstui/fui-icon/fui-icon.vue'
import USubsection from '~/components/toklove/sub-section/sub-section.vue'
import { dispose, init } from 'klinecharts'

const subList = [
    {
        name: 'Contract',
    },
    {
        name: 'Option',
    },
]

const timeList = [
    {
        name: '1M',
    }, { name: '5M' }, { name: '15M' }, { name: '30M' }, { name: '1H' }, { name: '1D' },
]

const activeTime = ref(0)

function changeTime(i) {
    activeTime.value = i
}

const current = ref(0)

const renderKlineChart = ref()

onMounted(() => {
    // 初始化图表
    const chart = init('renderKlineChart')

    console.log(chart)

    // 为图表添加数据
    chart.applyNewData([
        { close: 4976.16, high: 4977.99, low: 4970.12, open: 4972.89, timestamp: 1587660000000, volume: 204 },
        { close: 4977.33, high: 4979.94, low: 4971.34, open: 4973.20, timestamp: 1587660060000, volume: 194 },
        { close: 4977.93, high: 4977.93, low: 4974.20, open: 4976.53, timestamp: 1587660120000, volume: 197 },
        { close: 4966.77, high: 4968.53, low: 4962.20, open: 4963.88, timestamp: 1587660180000, volume: 28 },
        { close: 4961.56, high: 4972.61, low: 4961.28, open: 4961.28, timestamp: 1587660240000, volume: 184 },
        { close: 4964.19, high: 4964.74, low: 4961.42, open: 4961.64, timestamp: 1587660300000, volume: 191 },
        { close: 4968.93, high: 4972.70, low: 4964.55, open: 4966.96, timestamp: 1587660360000, volume: 105 },
        { close: 4979.31, high: 4979.61, low: 4973.99, open: 4977.06, timestamp: 1587660420000, volume: 35 },
        { close: 4977.02, high: 4981.66, low: 4975.14, open: 4981.66, timestamp: 1587660480000, volume: 135 },
        { close: 4985.09, high: 4988.62, low: 4980.30, open: 4986.72, timestamp: 1587660540000, volume: 76 },
    ])
})

onUnmounted(() => {
    // 销毁图表
    dispose('renderKlineChart')
})

</script>

<route lang='yaml'>
style:
navigationStyle: custom
</route>

<style>
.sub-title {
    color: #8c8c8c !important;
}

.btn-wrap {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 176px;
    background-color: #fff;
    box-sizing: border-box;

    .btn-0 {
        background-color: #de5d56;
    }

    .btn-1 {
        background-color: #3a7ff6;
    }

    .btn {
        width: 312px;
        padding: 20px 0;
        text-align: center;
        color: #fff;
        border-radius: 40px;
        box-sizing: border-box;
        font-size: 30px;
    }

}
</style>
