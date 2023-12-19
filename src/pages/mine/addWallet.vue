<template>
    <page-meta />
    <div class='init-top' />
    <layout class-name='IndexRouter'>
        <view class='px-[34px]'>
            <view class='relative'>
                <view class='flex items-center justify-between'>
                    <text class='text-[35px]'>Choice of currency</text>
                    <view class='flex items-center justify-between bg-black dropdown'>
                        <text class='text-[26px] text-white'>ERC20</text>
                        <image class='w-[18px] h-[18px]' src='/static/images/icon-dropup.png'></image>
                    </view>
                </view>
                <view class='dropdown-item bg-black text-white h-auto'>
                    <view v-for='(item,index) in CurrencyList' :key='index' class='item'>
                        <text class='text-[26px]'>{{ item.name }}</text>
                    </view>
                </view>
            </view>
        </view>
    </layout>
</template>

<script lang='ts' setup>
import { layoutDataKey } from '~/composables/provide'

const CurrencyList = ref([])
onShow(() => {
    $api.get('/user/getCurrency').then((res) => {
        CurrencyList.value = res.data
    })
})

const layoutData = ref({
    showTopBar: true,
    topBarBgColor: 'white',
    showTopBarBackBtn: true,
    topBarTitle: 'Add Wallet',
})

provide(layoutDataKey, layoutData)
</script>

<route lang='yaml'>
style:
navigationStyle: custom
</route>

<style lang='scss' scoped>
.dropdown {
    min-width: 208px;
    height: 46px;
    padding: 0 20px;
    border-radius: 22px;
}

.dropdown-item {
    width: 208px;
    position: absolute;
    right: 0;
    top: 72px;
    padding: 0 18px;
    border-radius: 22px;
}

.h-auto {
    height: auto;
    padding: 30px 18px;
    transition: .3s linear;

    .item {
        margin-top: 18px;
    }

    .item:first-child {
        margin-top: 0;
    }
}
</style>
