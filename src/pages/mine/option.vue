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
                <view class='order-row px-[30px] py-[40px] text-[22px]'>
                    <view class='flex items-center justify-between text-[30px]'>
                        <text>ETHUSD</text>
                        <text>2248.35</text>
                    </view>
                    <view class='font-bold text-right buy-1 mt-[14px]'>
                        {{ t('mine.option.Buy') }}
                    </view>
                    <view class='line mt-[30px]'></view>
                    <view class='flex items-center justify-between mt-[20px]'>
                        <view class='flex flex-1 items-center justify-between'>
                            <text class='sub-title'>{{ t('mine.option.amount') }}</text>
                            <text>0.0000</text>
                        </view>
                        <view class='flex flex-1 items-center justify-between ml-[50px]'>
                            <text class='sub-title'>{{ t('mine.option.duration') }}</text>
                            <text>0.0000</text>
                        </view>
                    </view>
                    <view class='flex items-center justify-between mt-[20px]'>
                        <text class='sub-title'>{{ t('mine.option.HandlingFee') }}</text>
                        <text>0.1</text>
                    </view>
                    <view class='flex items-center justify-between mt-[20px] sub-title'>
                        <text>{{ t('mine.option.OrderTime') }}</text>
                        <text>2023-12-16 12:01:06</text>
                    </view>
                    <view class='flex items-center justify-between mt-[20px] sub-title'>
                        <text>{{ t('mine.option.SettlementTime') }}</text>
                        <text>2023-12-16 12:01:36</text>
                    </view>
                    <view class='flex items-center justify-between mt-[20px] sub-title'>
                        <text>{{ t('mine.option.ProfitLoss') }}</text>
                        <text class='win'>0.0000</text>
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
import { useI18n } from 'vue-i18n'
import FuiNavBar from '~/components/firstui/fui-nav-bar/fui-nav-bar.vue'
import FuiIcon from '~/components/firstui/fui-icon/fui-icon.vue'
import USubsection from '~/components/toklove/sub-section/sub-section.vue'

function clickBack() {
    $api.back()
}

const { t } = useI18n()

const subList = [
    {
        name: 'position',
    },
    {
        name: 'history',
    },
]
const current = ref(0)

const list = ref([])
</script>

<route lang='yaml'>
style:
navigationStyle: custom
</route>

<style lang='scss' scoped>
.order-row {
    margin-top: 30px;
    background: #f5f7f9;
    border-radius: 30px;

    .buy-1 {
        color: #3a7ff6;
    }

    .buy-2 {
        color: #de5d56;
    }

    .win {
        color: rgb(51, 205, 153)
    }

    .loss {
        color: rgb(233, 88, 43);
    }

    .line {
        height: 2px;
        background: #dadada;
    }
}

.order-row:first-child {
    margin-top: 0;
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
