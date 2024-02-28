<template>
    <page-meta />
    <div class="init-top" />
    <layout class-name="IndexRouter">
        <FuiNavBar custom>
            <view class="flex justify-center relative items-center flex-1">
                <view class="absolute left-0">
                    <FuiIcon name="arrowleft" @click="clickBack"></FuiIcon>
                </view>
                <view class="absolute right-0">
                    <FuiIcon name="order-fill" @click="goHistory"></FuiIcon>
                </view>
                <USubsection
                    v-model="current"
                    :list="subList()"
                    active-color="white" button-color="#3640f0" class="w-[350px]" rounded
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
            <view class="p-[30px] bg-[#f5f7f9] rounded-[20px] mt-[30px]">
                <text class="text-[30px]">
                    {{ t('position.deposit.address') }}
                </text>
                <input
                    v-model="address" :placeholder="t('position.deposit.address')"
                    class="input mt-[29px] text-[50px] font-bold"
                    type="number"
                >
            </view>
            <view class="p-[30px] bg-[#f5f7f9] rounded-[20px] mt-[30px]"
                  @click='show=true'>
                <text class="text-[30px]">
                    {{ t('mine.addWallet.ChoiceOfCurrency') }}
                </text>
                <input
                    :placeholder="t('mine.addWallet.ChoiceOfCurrency')"
                    class="input mt-[29px] text-[50px] font-bold"
                    :value='coinInfo.text'
                    disabled
                >
            </view>
        </view>
        <view class="btn-wrap text-center">
            <view class="bg-black py-[33px] rounded-[20px]">
                <text class="text-[32px] font-bold text-white" @click="submitWithdraw">
                    {{ t('position.withDraw.Submit') }}
                </text>
            </view>
        </view>

        <fui-select :show="show" :options="CurrencyList"  :title="t('mine.addWallet.ChoiceOfCurrency')" @confirm="onConfirm" @close="onClose"></fui-select>
    </layout>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import FuiNavBar from '~/components/firstui/fui-nav-bar/fui-nav-bar.vue'
import FuiIcon from '~/components/firstui/fui-icon/fui-icon.vue'
import USubsection from '~/components/toklove/sub-section/sub-section.vue'
import FuiBottomPopup from '~/components/firstui/fui-bottom-popup/fui-bottom-popup.vue'
import FuiSelect from '~/components/firstui/fui-select/fui-select.vue'

const { t } = useI18n()

const show = ref(false)

const amount = ref(null)
const address = ref(null)
const coinInfo = ref({})

//关闭组件
function onClose() {
    show.value = false
}

function onConfirm(e) {
    console.log(e)
    coinInfo.value = e.options
    onClose()
}
function showToast(message) {
    uni.showToast({
        title: message,
        icon: 'none',
    })
}

function subList() {
    return [
        {
            name: t('position.withDraw.Purse'),
        },
    ]
}

function clickBack() {
    $api.back()
}


function goHistory() {
    uni.navigateTo({url:"/pages/position/record"})
}

const current = ref(0)

const CurrencyList = ref([])

onLoad(async () => {
    uni.showLoading({
        mask: true,
    })
    $api.get('/user/getCurrency').then((res) => {
        CurrencyList.value = res.data.map(item => {
            let data = {}
            data.text = item.name
            data.id = item.id
            return data
        })
        uni.hideLoading()
    })
})

function submitWithdraw() {
    if (amount.value === null) {
        showToast(t('position.withDraw.inputAmount'))
        return
    }

    if (address.value === null) {
        showToast(t('position.deposit.address'))
        return
    }

    if (coinInfo.value.id === null) {
        showToast(t('mine.addWallet.ChoiceOfCurrency'))
        return
    }

    $api.post('/wallet/withdraw', {
        amount: amount.value,
        address: address.value,
        coin_id: coinInfo.value.id
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
