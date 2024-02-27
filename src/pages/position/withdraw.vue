<template>
    <page-meta />
    <div class="init-top" />
    <layout class-name="IndexRouter">
        <FuiNavBar custom>
            <view class="flex justify-center relative items-center flex-1">
                <view class="absolute left-0">
                    <FuiIcon name="arrowleft" @click="clickBack"></FuiIcon>
                </view>
                <USubsection
                    v-model="current"
                    :list="subList()"
                    active-color="white" button-color="#3640f0" class="w-[350px]" rounded @change="change"
                ></USubsection>
            </view>
        </FuiNavBar>
        <view class="mt-[20px] mx-[34px]">
            <view class="p-[30px] bg-[#f5f7f9] rounded-[20px]">
                <text class="text-[30px]">
                    {{ t('position.withDraw.amount') }}
                </text>
                <input
                    v-model="amount" :placeholder="t('position.withDraw.inputAmount')"
                    class="input mt-[29px] text-[50px] font-bold"
                    type="number"
                >
                <view class="line mt-[29px] mb-[20px]"></view>
                <view class="text-[22px] sub-title">{{ t('position.withDraw.HandlingCharge') }}：0.000</view>
            </view>
            <view v-if="current === 0" class="mt-[30px] p-[30px] bg-[#f5f7f9] rounded-[20px]" @click="showPopup">
                <view class="flex items-center justify-between">
                    <text class="sub-title text-[24px]">{{ t('position.withDraw.WalletAddress') }}</text>
                    <image class="w-[16px] h-[8px]" src="/static/images/icon-dropdown-black.png"></image>
                </view>
                <div class="flex flex-col mt-[30px] p-[30px] text-[24px] bg-white rounded-[20px]">
                    <text>{{ currentWallet.currency.name }}</text>
                    <text class="sub-title mt-[10px]">{{ currentWallet.address }}</text>
                </div>
            </view>
            <view v-else class="mt-[30px] p-[30px] bg-[#f5f7f9] rounded-[20px]" @click="showPopup">
                <view class="flex items-center justify-between">
                    <text class="sub-title text-[24px]">{{ t('position.withDraw.SelectBank') }}</text>
                    <image class="w-[16px] h-[8px]" src="/static/images/icon-dropdown-black.png"></image>
                </view>
                <div class="flex flex-col mt-[30px] p-[30px] text-[24px] bg-white rounded-[20px]">
                    <text>{{ currentBank.bank_name }}</text>
                    <text class="sub-title mt-[10px]">{{ currentBank.account }}</text>
                </div>
            </view>
        </view>
        <view class="btn-wrap text-center">
            <view class="bg-black py-[33px] rounded-[20px]">
                <text class="text-[32px] font-bold text-white" @click="submitWithdraw">
                    {{ t('position.withDraw.Submit') }}
                </text>
            </view>
        </view>

        <FuiBottomPopup :show="showWallet" @close="showWallet = false">
            <view class="fui-custom__wrap my-[40px]">
                <scroll-view scroll-y>
                    <view
                        v-for="item in CryptoList" :key="item.id"
                        class="flex items-center justify-between mb-[20px] px-[39px] wallet-item mx-auto"
                        @click="changeWallet(item)"
                    >
                        <view class="flex flex-col text-white">
                            <text class="text-[34px]">{{ item.currency.name }}</text>
                            <text class="mt-[10px] text-[40px] font-bold">
                                {{ item.address }}
                            </text>
                        </view>
                        <image
                            v-show="currentWallet.id === item.id" class="w-[45px] h-[45px]"
                            src="/static/images/icon-duihao.png"
                        ></image>
                    </view>
                </scroll-view>
            </view>
        </FuiBottomPopup>
        <FuiBottomPopup :show="showBank" @close="showBank = false">
            <view class="fui-custom__wrap my-[40px]">
                <scroll-view scroll-y>
                    <view
                        v-for="item in BankList" :key="item.id"
                        class="flex items-center justify-between mb-[20px] px-[39px] wallet-item mx-auto"
                        @click="changeBank(item)"
                    >
                        <view class="flex flex-col text-white">
                            <text class="text-[34px]">{{ item.bank_name }}</text>
                            <text class="mt-[10px] text-[40px] font-bold">
                                {{ item.account }}
                            </text>
                        </view>
                        <image
                            v-show="currentBank.id === item.id" class="w-[45px] h-[45px]"
                            src="/static/images/icon-duihao.png"
                        ></image>
                    </view>
                </scroll-view>
            </view>
        </FuiBottomPopup>
    </layout>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import FuiNavBar from '~/components/firstui/fui-nav-bar/fui-nav-bar.vue'
import FuiIcon from '~/components/firstui/fui-icon/fui-icon.vue'
import USubsection from '~/components/toklove/sub-section/sub-section.vue'
import FuiBottomPopup from '~/components/firstui/fui-bottom-popup/fui-bottom-popup.vue'

const { t } = useI18n()

const showWallet = ref(false)
const showBank = ref(false)

const amount = ref(null)

const currentWallet = ref({
    id: 0,
    address: '',
    currency: {
        name: '',
    },
})

const currentBank = ref({
    id: 0,
    bank_name: '',
    account: '',
})

function showToast(message) {
    uni.showToast({
        title: message,
        icon: 'none',
    })
}

function changeWallet(data) {
    currentWallet.value = data
    showWallet.value = false
}

function changeBank(data) {
    currentBank.value = data
    showBank.value = false
}

function subList() {
    return [
        {
            name: t('position.withDraw.Purse'),
        },
        // {
        //     name: t('position.withDraw.BankCard'),
        // },
    ]
}

function clickBack() {
    $api.back()
}

const current = ref(0)

const CryptoList = ref([])
const BankList = ref([])

async function showCryptoPopup() {
    showWallet.value = true
}

async function showBankPopup() {
    showBank.value = true
}

onLoad(async () => {
    uni.showLoading({
        mask: true,
    })
    const res = await $api.get('/user/cryptoList')
    if (res.data.length === 0) {
        showToast(t('position.withDraw.NoWallet'))
        uni.navigateTo({
            url: '/pages/mine/wallet',
        })
    }
    CryptoList.value = res.data
    currentWallet.value = CryptoList.value[0]
    uni.hideLoading()
})

function showPopup() {
    if (current.value === 0)
        showCryptoPopup()
    else
        showBankPopup()
}

async function change(e) {
    if (e === 1) {
        const res = await $api.get('/user/bankList')
        if (res.data.length === 0) {
            showToast(t('position.withDraw.NoBank'))
            uni.navigateTo({
                url: '/pages/mine/wallet',
            })
        }
        if (res.code === 1) {
            BankList.value = res.data
            currentBank.value = BankList.value[0]
        }
    }
    else {
        const res = await $api.get('/user/cryptoList')
        if (res.data.length === 0) {
            showToast(t('position.withDraw.NoWallet'))
            uni.navigateTo({
                url: '/pages/mine/wallet',
            })
        }
        if (res.code === 1) {
            CryptoList.value = res.data
            currentWallet.value = CryptoList.value[0]
        }
    }
}

function submitWithdraw() {
    if (amount.value === null) {
        showToast(t('position.withDraw.inputAmount'))
        return
    }

    let id = 0
    if (current.value === 0)
        id = currentWallet.value.id
    else
        id = currentBank.value.id

    $api.post('/wallet/withdraw', {
        amount: amount.value,
        type: current.value,
        id,
    }).then((res) => {
        if (res.code === 1) {
            showToast(t('position.withDraw.SubmitSuccess'))
            $api.back()
        }
        else {
            showToast(t('position.withDraw.SubmitFailed'))
        }
    })
}
</script>

<route lang="yaml">
style:
navigationStyle: custom
</route>

<style lang="scss" scoped>
/* 自定义内容区样式需自行控制 */
.fui-custom__wrap {
    width: 100%;
    height: 520px;
    display: flex;
    //padding: 40px 0;
    //align-items: center;
    justify-content: center;
}

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

.line {
    border-bottom: 2px solid #f0f2fe;
}

.sub-title {
    color: #8c8c8c !important
}

.input {
    font-size: 28px;
    color: #242323;
}

.btn-wrap {
    position: absolute;
    left: 50%;
    bottom: 100px;
    width: 650px;
    transform: translateX(-50%);
}
</style>
