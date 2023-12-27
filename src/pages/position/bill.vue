<template>
    <page-meta />
    <div class="init-top" />
    <layout class-name="IndexRouter">
        <view class="mt-[20px] mx-[34px]">
            <view class="p-[30px] text-[30px] bg-[#f5f7f9] rounded-[20px]">
                <view class="flex items-center justify-between text-[26px]">
                    <text class="sub-title">{{ t('position.bill.date') }}</text>
                    <view class="flex items-center justify-center">
                        <text class="font-bold mr-[10px]">{{ t('position.bill.all') }}</text>
                        <image class="w-[25px] h-[14px]" src="/static/images/icon-dropdown-black.png"></image>
                    </view>
                </view>
                <view class="flex items-center justify-between text-[26px] mt-[20px]">
                    <text class="sub-title">{{ t('position.bill.classification') }}</text>
                    <view class="flex items-center justify-center">
                        <text class="font-bold mr-[10px]">{{ t('position.bill.all') }}</text>
                        <image class="w-[25px] h-[14px]" src="/static/images/icon-dropdown-black.png"></image>
                    </view>
                </view>
            </view>
            <view class="mt-[30px] pb-[20px]">
                <view class="mb-[20px] p-[30px] bg-[#f5f7f9] rounded-[20px]">
                    <view class="flex items-center justify-between mt-[8px] text-[26px]">
                        <text class="sub-title">{{ t('position.bill.money') }}</text>
                        <text class="text-[22px] green-text">+11990</text>
                    </view>
                    <view class="flex items-center justify-between mt-[16px] text-[26px]">
                        <text class="sub-title">{{ t('position.bill.classification') }}</text>
                        <text class="text-[22px]">
                            {{ t('position.bill.option') }} -
                            {{ t('position.bill.SettlementAmount') }}
                        </text>
                    </view>
                    <view class="flex items-center justify-between mt-[16px] text-[26px]">
                        <text class="sub-title">{{ t('position.bill.date') }}</text>
                        <text class="text-[22px]">2023-12-17 22:06</text>
                    </view>
                </view>
            </view>
        </view>
    </layout>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { layoutDataKey } from '~/composables/provide'

const { t } = useI18n()

const layoutData = ref({
    showTopBar: true,
    topBarBgColor: 'white',
    showTopBarBackBtn: true,
    topBarTitle: t('position.bill.bill'),
})

provide(layoutDataKey, layoutData)
</script>

<route lang="yaml">
style:
navigationStyle: custom
</route>

<style lang="scss" scoped>
.sub-title {
    color: #8c8c8c !important;
}
</style>
