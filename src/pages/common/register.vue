<template>
    <page-meta />
    <view class="init-top" />
    <layout class-name="IndexRouter">
        <view class="px-[50px]">
            <view class="mt-[84px] flex flex-col text-white">
                <text class="text-[70px] font-bold">{{ t('common.register.Register') }}</text>
                <text class="text-[26px] mt-[18px]">{{ t('common.register.SignUpToJoin') }}</text>
            </view>
            <view class="form-wrap mt-[79px]">
                <view class="flex items-center p-[28px] bg-[#f5f7f9] rounded-[20px]">
                    <image class="w-[44px] h-[44px]" src="/static/images/icon-email.png"></image>
                    <input
                        v-model="form.email" :placeholder="t('common.register.Email')" class="flex-1 ml-[19px] input"
                        type="text"
                    >
                </view>
                <view class="flex items-center p-[28px] mt-[30px] bg-[#f5f7f9] rounded-[20px]">
                    <image class="w-[44px] h-[44px]" src="/static/images/icon-password.png"></image>
                    <view class="flex items-center justify-between flex-1">
                        <input
                            v-model="form.password" :type="isPassword ? 'password' : 'text'"
                            class="flex-1 ml-[19px] input"
                            :placeholder="t('common.register.Password')"
                        >
                        <image
                            :src="isPassword ? '/static/images/icon-off.png' : '/static/images/icon-on.png'"
                            class="w-[36px] h-[36px]" @click="isPassword = !isPassword"
                        ></image>
                    </view>
                </view>
                <view class="flex items-center p-[28px] mt-[30px] bg-[#f5f7f9] rounded-[20px]">
                    <image class="w-[44px] h-[44px]" src="/static/images/icon-password.png"></image>
                    <view class="flex items-center justify-between flex-1">
                        <input
                            v-model="form.password_confirmation" :type="isAgentPassword ? 'password' : 'text'"
                            class="flex-1 ml-[19px] input"
                            :placeholder="t('common.register.ConfirmPassword')"
                        >
                        <image
                            :src="isAgentPassword ? '/static/images/icon-off.png' : '/static/images/icon-on.png'"
                            class="w-[36px] h-[36px]" @click="isAgentPassword = !isAgentPassword"
                        ></image>
                    </view>
                </view>
                <view class="flex items-center p-[28px] mt-[30px] bg-[#f5f7f9] rounded-[20px]">
                    <image class="w-[44px] h-[44px]" src="/static/images/icon-code.png"></image>
                    <view class="flex items-center justify-between flex-1">
                        <input
                            v-model="form.code" class="flex-1 ml-[19px] input"
                            :placeholder="t('common.register.VerificationCode')"
                            type="text"
                        >
                        <view
                            class="w-[160px]"
                            @click="change"
                        >
                            <image :src="form.captcha_config.img" class="w-full h-[40px]"></image>
                        </view>

                        <!--                        <view -->
                        <!--                            class="w-[100px] text-[22px] rounded-[20px] text-center bg-black text-white py-[8px]" -->
                        <!--                            @click="send" -->
                        <!--                        > -->
                        <!--                            {{ timer ?? t('common.forget.Send') }} -->
                        <!--                        </view> -->
                    </view>
                </view>
                <view class="flex items-center p-[28px] mt-[30px] bg-[#f5f7f9] rounded-[20px]">
                    <image class="w-[44px] h-[44px]" src="/static/images/icon-invite.png"></image>
                    <input
                        v-model="form.invite_code" class="flex-1 ml-[19px] input"
                        :placeholder="t('common.register.InvitationCode')"
                        type="text"
                    >
                </view>
            </view>
            <view class="btn-wrap text-center">
                <view class="bg-black py-[33px] rounded-[20px]" @click="submit">
                    <text class="text-[32px] font-bold text-white">
                        {{ t('common.register.Register') }}
                    </text>
                </view>
            </view>
        </view>
    </layout>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { layoutDataKey } from '~/composables/provide'
import { $api } from '~/api'
import { ls } from '~/composables'

const isPassword = ref(true)
const isAgentPassword = ref(true)

const { t } = useI18n()

const form = ref({
    email: '',
    password: '',
    password_confirmation: '',
    code: '',
    invite_code: '',
    captcha: '',
    captcha_config: {},
})

function showToast(message) {
    uni.showToast({
        title: message,
        icon: 'none',
    })
}

function change() {
    uni.showLoading()
    $api.get('/captcha').then((res) => {
        form.value.captcha_config = res.data
        uni.hideLoading()
    })
}

async function submit() {
    const fields = ['email', 'password', 'password_confirmation', 'code', 'invite_code']
    const messages = [
        t('common.register.PleaseEnterYourEmail'),
        t('common.register.PleaseEnterYourPassword'),
        t('common.register.PleaseEnterYourConfirmPassword'),
        t('common.register.PleaseEnterYourVerificationCode'),
        t('common.register.PleaseEnterYourInviteCode'),
    ]

    for (let i = 0; i < fields.length; i++) {
        if (!form.value[fields[i]]) {
            showToast(messages[i])
            return
        }
    }

    if (form.value.password !== form.value.password_confirmation) {
        showToast(t('common.register.TheTwoPasswordsAreInconsistent'))
        return
    }

    form.value.captcha = form.value.captcha_config.key

    const { code, data, message } = await $api.post('/auth/register', form.value)
    console.log(data)

    if (code !== 1) {
        await uni.showToast({
            title: message,
            icon: 'none',
        })
        return
    }

    ls.set('token', data.access_token)
    showToast(t('common.register.RegisterSuccessfully'))
    uni.switchTab({
        url: '/pages/tabbar/home',
    })
}

onLoad((e) => {
    console.log(e)
    if (e.invite_code)
        form.value.invite_code = e.invite_code
    $api.get('/captcha').then((res) => {
        form.value.captcha_config = res.data
    })
})

const layoutData = ref({
    showTopBar: true,
    topBarBgColor: 'transparent',
    showTopBarBackBtn: true,
    topBarTitle: t('common.register.Back'),
    className: 'text-white',
    backIconColor: 'white',
})

provide(layoutDataKey, layoutData)
</script>

<style lang='scss' scoped>
uni-page-body {
    min-height: 100vh;
    background: url(/static/images/bg-login.png) no-repeat fixed;
    background-size: cover;
}

.btn-wrap {
    position: absolute;
    left: 50%;
    bottom: 100px;
    width: 650px;
    transform: translateX(-50%);
}
</style>

<route lang='yaml'>
style:
navigationStyle: custom
</route>
