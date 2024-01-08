<template>
    <page-meta />
    <div class="init-top" />
    <layout class-name="IndexRouter">
        <FuiNavBar custom>
            <view class="flex justify-center relative items-center flex-1">
                <view class="absolute left-0">
                    <FuiIcon name="arrowleft" @click="clickBack"></FuiIcon>
                </view>
                <view class="absolute right-[16px]" @click="toAdd">
                    <image class="w-[27px] h-[27px]" src="/static/images/icon-edit-avator.png"></image>
                </view>
                <USubsection
                    v-model="current"
                    :list="subList()" active-color="white" button-color="#3640f0" class="w-[350px]" rounded
                    @change="changeType"
                ></USubsection>
            </view>
        </FuiNavBar>
        <view v-if="loading" class="mt-[20px] mx-[34px]">
            <view  >
                <view class='relative flex items-center justify-between mb-[20px] w-[682px] h-[210px] market-skeleton pt-[40px] px-[24px]'>
                    <fui-skeleton :preloadList='wallet.market' outerClass='market-skeleton'></fui-skeleton>
                </view>
            </view>
        </view>
        <view v-else class="mt-[20px] mx-[34px]">
            <view v-if="CryptoList.length > 0 && current === 0" class="wallet-list">
                <view
                    v-for="item in CryptoList" :key="item.id"
                    class="flex items-center justify-between mb-[20px] px-[39px] wallet-item"
                >
                    <view class="flex flex-col text-white">
                        <text class="text-[34px]">{{ item.currency.name }}</text>
                        <text class="mt-[10px] text-[40px] font-bold">
                            {{ item.address }}
                        </text>
                    </view>
                    <image class="w-[45px] h-[45px]" src="/static/images/icon-del.png" @click="del(item.id)"></image>
                </view>
            </view>
            <view v-else-if="BankList.length > 0 && current === 1" class="wallet-list">
                <view
                    v-for="item in BankList" :key="item.id"
                    class="flex items-center justify-between mb-[20px] px-[39px] wallet-item"
                >
                    <view class="flex flex-col text-white">
                        <text class="text-[34px]">{{ item.bank_name }}</text>
                        <text class="mt-[10px] text-[40px] font-bold">
                            {{ crypto_number(item.account) }}
                        </text>
                    </view>
                    <image class="w-[45px] h-[45px]" src="/static/images/icon-del.png" @click="del(item.id)"></image>
                </view>
            </view>
            
            
        </view>
    </layout>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import FuiNavBar from '~/components/firstui/fui-nav-bar/fui-nav-bar.vue'
import FuiIcon from '~/components/firstui/fui-icon/fui-icon.vue'
import USubsection from '~/components/toklove/sub-section/sub-section.vue'
import FuiLoading from '~/components/firstui/fui-loading/fui-loading.vue'
import wallet from '~/skeleton/mine/wallet.js'
const { t } = useI18n()

const loading = ref(false)

function showToast(message) {
    uni.showToast({
        title: message,
        icon: 'none',
    })
}

function clickBack() {
    $api.back()
}

const current = ref(0)

const CryptoList = ref([])
const BankList = ref([])

async function changeType() {
    loading.value = true
    if (current.value === 0) {
        const res = await $api.get('/user/cryptoList')
        if (res.code === 1)
            CryptoList.value = res.data
    }
    else {
        const res = await $api.get('/user/bankList')
        if (res.code === 1)
            BankList.value = res.data
    }
    loading.value = false
}

function del(id) {
    if (!id) {
        showToast(t('mine.wallet.DeleteFailed'))
        return
    }
    if (current.value === 0)
        delCrypto(id)
    else
        delBank(id)
}

function crypto_number(str) {
    if (str.length < 8)
        return str

    const start = str.slice(0, 4)
    const end = str.slice(-4)
    const masked = '*'.repeat(str.length - 8)
    return start + masked + end
}

function toAdd() {
    if (current.value === 0)
        toPage('/pages/mine/addWallet')
    else
        toPage('/pages/mine/addBank')
}

async function delCrypto(id) {
    const res = await $api.post('/user/delCrypto', { id })
    if (res.code === 1) {
        showToast('Delete success')
        const res = await $api.get('/user/cryptoList')
        if (res.code === 1)
            CryptoList.value = res.data
    }
    else {
        showToast(t('mine.wallet.DeleteFailed'))
    }
}

async function delBank(id) {
    const res = await $api.post('/user/delBank', { id })
    if (res.code === 1) {
        showToast(t('mine.wallet.DeleteSuccess'))
        const res = await $api.get('/user/bankList')
        if (res.code === 1)
            BankList.value = res.data
    }
    else {
        showToast(t('mine.wallet.DeleteFailed'))
    }
}

function subList() {
    return [
        {
            name: t('mine.wallet.Purse'),
        },
        {
            name: t('mine.wallet.BankCard'),
        },
    ]
}

function toPage(url) {
    uni.navigateTo({ url })
}

onShow(async () => {
    loading.value = true
    const resCrypto = await $api.get('/user/cryptoList')
    if (resCrypto.code === 1)
        CryptoList.value = resCrypto.data

    const resBank = await $api.get('/user/bankList')
    if (resBank.code === 1)
        BankList.value = resBank.data

    loading.value = false
})
</script>

<route lang='yaml'>
style:
navigationStyle: custom
</route>

<style lang='scss' scoped>
.wallet-item {
    width: 682px;
    height: 210px;
    background: url(/static/images/bg-wallet.png) no-repeat;
    background-size: cover;
}

.nodata {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>
