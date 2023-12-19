<template>
    <page-meta />
    <view class='init-top' />
    <layout class-name='IndexRouter'>
        <view class='px-[50px]'>
            <view class='pt-[100px]'>
                <image class='lang mt-[36px] w-[42px] h-[42px]' src='/static/images/icon-language.png'></image>
            </view>
            <view class='mt-[84px] flex flex-col text-white'>
                <text class='text-[70px] font-bold'>Log in</text>
                <text class='text-[26px] mt-[18px]'>Log in to continue</text>
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
                <view class='flex items-center mt-[20px] pl-[28px]'>
                    <image
                        :src="isRemember ? '/static/images/select-password.png' : '/static/images/select-un-password.png'"
                        class='w-[30px] h-[30px]' @click='isRemember = !isRemember'
                    ></image>
                    <text class='ml-[10px] text-[22px] text-white op-60'>remember password</text>
                </view>
            </view>
            <view class='mt-[30px] text-center text-white'>
                <text class='op-60'>Forgot your password？</text>
                <text>Retrieve</text>
            </view>
            <view class='btn-wrap text-center'>
                <view class='bg-black py-[33px] rounded-[20px]' @click='submit'>
                    <text class='text-[32px] font-bold text-white'>
                        Log in
                    </text>
                </view>
                <view class='mt-[39px] text-[28px] text-white'>
                    <text>have`an account?</text>
                    <text class='font-bold' @click="toPage('/pages/common/register')">
                        &nbsp;Register
                    </text>
                </view>
            </view>
        </view>
    </layout>
</template>

<script lang='ts' setup>
import { $api } from '~/api'
import { ls } from '~/composables'

const isPassword = ref(true)
const isRemember = ref(true)

function toPage(url) {
    uni.navigateTo({ url })
}

const form = ref({
    email: '',
    password: '',
})

async function submit() {
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

    let { code, data, message } = await $api.post('/auth/login', form.value)
    console.log(data)
    console.log(code)
    if (code !== 1) {
        uni.showToast({
            title: message,
            icon: 'none',
        })
        return
    }

    ls.set('token', data.access_token)

    uni.showToast({
        title: 'Login successfully',
        icon: 'none',
    })

    uni.switchTab({
        url: '/pages/tabbar/home',
    })
}

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
