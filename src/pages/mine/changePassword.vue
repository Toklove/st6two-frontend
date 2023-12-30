<template>
    <page-meta />
    <div class="init-top" />
    <layout class-name="IndexRouter">
        <view class="px-[34px]">
            <view class="text-center">
                <image class="w-[140px] h-[140px]" src="/static/images/icon-big-password.png"></image>
            </view>
            <view class="flex items-center p-[28px] mt-[30px] bg-[#f5f7f9] rounded-[20px]">
                <image class="w-[44px] h-[44px]" src="/static/images/icon-password.png"></image>
                <view class="flex items-center justify-between flex-1">
                    <input
                        v-model="form.password" :placeholder="t('mine.changePassword.inputNewPassWord')"
                        class="flex-1 ml-[19px] input" type="password"
                    >
                </view>
            </view>
            <view class="flex items-center p-[28px] mt-[30px] bg-[#f5f7f9] rounded-[20px]">
                <image class="w-[44px] h-[44px]" src="/static/images/icon-password.png"></image>
                <view class="flex items-center justify-between flex-1">
                    <input
                        v-model="form.password_confirmation" :placeholder="t('mine.changePassword.reNewPassWord')"
                        class="flex-1 ml-[19px] input" type="password"
                    >
                </view>
            </view>
            <view class="flex items-center p-[28px] mt-[30px] bg-[#f5f7f9] rounded-[20px]">
                <image class="w-[44px] h-[44px]" src="/static/images/icon-password.png"></image>
                <view class="flex items-center justify-between flex-1">
                    <input
                        v-model="form.old_password" :placeholder="t('mine.changePassword.oldPassword')"
                        class="flex-1 ml-[19px] input"
                        type="password"
                    >
                </view>
            </view>
        </view>
        <view class="btn-wrap text-center">
            <view class="bg-black py-[33px] rounded-[20px]" @click="submit">
                <text class="text-[32px] font-bold text-white">
                    {{ t('mine.changePassword.Submit') }}
                </text>
            </view>
        </view>
    </layout>
</template>

<script lang='ts' setup>
import { useI18n } from 'vue-i18n'
import { layoutDataKey } from '~/composables/provide'

const form = ref({
    old_password: '',
    password: '',
    password_confirmation: '',
})

const { t } = useI18n()

function showToast(message) {
    uni.showToast({
        title: message,
        icon: 'none',
    })
}

function submit() {
    const fields = ['old_password', 'password', 'password_confirmation']
    const messages = [
        t('mine.changePassword.oldPassword'),
        t('mine.changePassword.inputNewPassWord'),
        t('mine.changePassword.reNewPassWord'),
    ]

    for (let i = 0; i < fields.length; i++) {
        if (!form.value[fields[i]]) {
            showToast(messages[i])
            return
        }
    }

    $api.post('/user/changePassword', form.value).then((res) => {
        if (res.code === 1) {
            showToast(t('mine.changePassword.ChangeSuccess'))
            setTimeout(() => {
                $api.back()
            }, 1000)
        }
    })
}

const layoutData = ref({
    showTopBar: true,
    topBarBgColor: 'white',
    showTopBarBackBtn: true,
    topBarTitle: t('mine.changePassword.ChangePassword'),
})

provide(layoutDataKey, layoutData)
</script>

<route lang='yaml'>
style:
navigationStyle: custom
</route>

<style lang='scss' scoped>
.sub-title {
    color: #8c8c8c !important
}

.input {
    font-size: 28px;
    color: #242323;
}

.icon-upload {
    width: 534px;
    height: 320px;
}

.btn-wrap {
    position: absolute;
    left: 50%;
    bottom: 100px;
    width: 650px;
    transform: translateX(-50%);
}
</style>
