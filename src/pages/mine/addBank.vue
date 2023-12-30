<template>
    <page-meta />
    <div class="init-top" />
    <layout class-name="IndexRouter">
        <view class="px-[34px]">
            <view class="p-[30px] bg-[#f5f7f9] rounded-[20px]">
                <input
                    v-model="form.bank_name" :placeholder="t('mine.addBank.bankName')"
                    class="input text-[14px]" type="text"
                >
            </view>
            <view class="mt-[30px] p-[30px] bg-[#f5f7f9] rounded-[20px]">
                <input
                    v-model="form.account" :placeholder="t('mine.addBank.bankCard')"
                    class="input text-[14px]" type="text"
                >
            </view>
            <view class="mt-[30px] p-[30px] bg-[#f5f7f9] rounded-[20px]">
                <input
                    v-model="form.account_user" :placeholder="t('mine.addBank.account')"
                    class="input text-[14px]" type="text"
                >
            </view>
            <view class="mt-[30px] p-[30px] bg-[#f5f7f9] rounded-[20px]">
                <input
                    v-model="form.bank_address" :placeholder="t('mine.addBank.bankAddress')"
                    class="input text-[14px]" type="text"
                >
            </view>
            <view class="mt-[30px] p-[30px] bg-[#f5f7f9] rounded-[20px]">
                <input
                    v-model="form.bank_code" :placeholder="t('mine.addBank.bankCode')"
                    class="input text-[14px]" type="text"
                >
            </view>
            <view class="btn-wrap text-center">
                <text class="text-[22px] sub-title">
                    {{ t('mine.addBank.bankTitle') }}
                </text>
                <view class="bg-black py-[33px] rounded-[20px] mt-[20px]" @click="submit">
                    <text class="text-[32px] font-bold text-white">
                        {{ t('mine.addBank.Save') }}
                    </text>
                </view>
            </view>
        </view>
    </layout>
</template>

<script lang='ts' setup>
import { useI18n } from 'vue-i18n'
import { layoutDataKey } from '~/composables/provide'

const form = ref({
    bank_name: '',
    account: '',
    account_user: '',
    bank_address: '',
    bank_code: '',
})

const { t } = useI18n()

function showToast(message) {
    uni.showToast({
        title: message,
        icon: 'none',
    })
}

function submit() {
    const fields = ['bank_name', 'account', 'account_user', 'bank_address', 'bank_code']
    const messages = [
        t('mine.addBank.bankName'),
        t('mine.addBank.bankCard'),
        t('mine.addBank.account'),
        t('mine.addBank.bankAddress'),
        t('mine.addBank.bankCode'),
    ]

    for (let i = 0; i < fields.length; i++) {
        if (!form.value[fields[i]]) {
            showToast(messages[i])
            return
        }
    }

    $api.post('/user/addBank', form.value).then((res) => {
        if (res.code === 1) {
            showToast(t('mine.addBank.AddSuccess'))
            $api.back()
        }
        else {
            showToast(t('mine.addBank.AddFailed'))
        }
    })
}

const layoutData = ref({
    showTopBar: true,
    topBarBgColor: 'white',
    showTopBarBackBtn: true,
    topBarTitle: t('mine.addBank.AddBankCard'),
})

provide(layoutDataKey, layoutData)
</script>

<route lang='yaml'>
style:
navigationStyle: custom
</route>

<style lang='scss' scoped>
.sub-title {
    color: #8c8c8c !important;
}

.btn-wrap {
    position: absolute;
    left: 50%;
    bottom: 100px;
    width: 650px;
    transform: translateX(-50%);
}

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

.h-0 {
    height: 0;
    transition: .3s linear;
    overflow: hidden;
}

.h-auto {
    height: auto;
    padding: 30px 18px;
    transition: .3s linear;
    overflow: hidden;

    .item {
        margin-top: 26px;
    }

    .item:first-child {
        margin-top: 0;
    }
}
</style>
