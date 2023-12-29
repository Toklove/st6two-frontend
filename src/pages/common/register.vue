<template>
    <page-meta />
    <view class='init-top' />
    <layout class-name='IndexRouter'>
        <view class='px-[50px]'>
            <view class='mt-[84px] flex flex-col text-white'>
                <text class='text-[70px] font-bold'>{{ t('common.register.Register') }}</text>
                <text class='text-[26px] mt-[18px]'>{{ t('common.register.SignUpToJoin') }}</text>
            </view>
            <view class='form-wrap mt-[79px]'>
                <view class='flex items-center p-[28px] bg-[#f5f7f9] rounded-[20px]'>
                    <image class='w-[44px] h-[44px]' src='/static/images/icon-email.png'></image>
                    <input v-model='form.email' class='flex-1 ml-[19px] input' placeholder='Email' type='text'>
                </view>
                <view class='flex items-center p-[28px] mt-[30px] bg-[#f5f7f9] rounded-[20px]'>
                    <image class='w-[44px] h-[44px]' src='/static/images/icon-password.png'></image>
                    <view class='flex items-center justify-between flex-1'>
                        <input
                            v-model='form.password' :type="isPassword ? 'password' : 'text'"
                            class='flex-1 ml-[19px] input'
                            placeholder='Password'
                        >
                        <image
                            :src="isPassword ? '/static/images/icon-off.png' : '/static/images/icon-on.png'"
                            class='w-[36px] h-[36px]' @click='isPassword = !isPassword'
                        ></image>
                    </view>
                </view>
                <view class='flex items-center p-[28px] mt-[30px] bg-[#f5f7f9] rounded-[20px]'>
                    <image class='w-[44px] h-[44px]' src='/static/images/icon-password.png'></image>
                    <view class='flex items-center justify-between flex-1'>
                        <input
                            v-model='form.password_confirmation' :type="isAgentPassword ? 'password' : 'text'"
                            class='flex-1 ml-[19px] input'
                            placeholder='Confirm Password'
                        >
                        <image
                            :src="isAgentPassword ? '/static/images/icon-off.png' : '/static/images/icon-on.png'"
                            class='w-[36px] h-[36px]' @click='isAgentPassword = !isAgentPassword'
                        ></image>
                    </view>
                </view>
                <view class='flex items-center p-[28px] mt-[30px] bg-[#f5f7f9] rounded-[20px]'>
                    <image class='w-[44px] h-[44px]' src='/static/images/icon-code.png'></image>
                    <view class='flex items-center justify-between flex-1'>
                        <input
                            v-model='form.code' class='flex-1 ml-[19px] input'
                            placeholder='Verification code'
                            type='text'
                        >
                        <view
                            class='w-[100px] text-[22px] rounded-[20px] text-center bg-black text-white py-[8px]'
                            @click='send'
                        >
                            {{ timer ?? t('common.forget.Send') }}
                        </view>
                    </view>
                </view>
                <view class='flex items-center p-[28px] mt-[30px] bg-[#f5f7f9] rounded-[20px]'>
                    <image class='w-[44px] h-[44px]' src='/static/images/icon-invite.png'></image>
                    <input
                        v-model='form.invite_code' class='flex-1 ml-[19px] input'
                        placeholder='Invitation Code (optional)'
                        type='text'
                    >
                </view>
            </view>
            <view class='btn-wrap text-center'>
                <view class='bg-black py-[33px] rounded-[20px]' @click='submit'>
                    <text class='text-[32px] font-bold text-white'>
                        {{ t('common.register.Register') }}
                    </text>
                </view>
            </view>
        </view>
    </layout>
</template>

<script lang='ts' setup>
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
})

async function submit() {
    console.log(form)
    if (!form.value.email) {
        uni.showToast({
            title: 'Please enter your email',
            icon: 'none',
        })
        return
    }
    if (!form.value.password) {
        uni.showToast({
            title: 'Please enter your password',
            icon: 'none',
        })
        return
    }
    if (!form.value.password_confirmation) {
        uni.showToast({
            title: 'Please enter your confirm password',
            icon: 'none',
        })
        return
    }
    if (!form.value.code) {
        uni.showToast({
            title: 'Please enter your verification code',
            icon: 'none',
        })
        return
    }
    if (form.value.password !== form.value.password_confirmation) {
        uni.showToast({
            title: 'The two passwords are inconsistent',
            icon: 'none',
        })
        return
    }

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

    await uni.showToast({
        title: 'Register successfully',
        icon: 'none',
    })

    uni.switchTab({
        url: '/pages/tabbar/home',
    })
}

const timer = ref(null)

async function send() {
    if (!form.value.email) {
        uni.showToast({
            title: 'Please enter your email',
            icon: 'none',
        })
        return
    }

    if (timer.value)
        return

    const data = await $api.post('/auth/send', {
        email: form.value.email,
    })

    if (data.code !== 1) {
        uni.showToast({
            title: data.message,
            icon: 'none',
        })
        return
    }

    timer.value = 60
    decTimer()

    console.log(data)
}

function decTimer() {
    setTimeout(() => {
        if (timer.value > 0) {
            timer.value--
            decTimer()
        } else {
            timer.value = null
        }
    }, 1000)
}

const layoutData = ref({
    showTopBar: true,
    topBarBgColor: 'transparent',
    showTopBarBackBtn: true,
    topBarTitle: 'Back',
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
