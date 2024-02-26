<template>
    <page-meta />
    <view class="init-top" />
    <layout class-name="IndexRouter">
        <view class="px-[50px]">
            <view class="pt-[100px]">
                <image class="lang mt-[36px] w-[42px] h-[42px]" src="/static/images/icon-language.png" @click="showChangeLang = true"></image>
            </view>
            <view class="mt-[84px] flex flex-col text-white">
                <text class="text-[70px] font-bold">{{ t('common.login.Login') }}</text>
                <text class="text-[26px] mt-[18px]">{{ t('common.login.LoginToContinue') }}</text>
            </view>
            <view class="form-wrap mt-[79px]">
                <view class="flex items-center p-[28px] bg-[#f5f7f9] rounded-[20px]">
                    <image class="w-[44px] h-[44px]" src="/static/images/icon-email.png"></image>
                    <input v-model="form.email" :placeholder="t('common.register.Email')" class="flex-1 ml-[19px] input"
                           type="text">
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
                <view class="flex items-center mt-[20px] pl-[28px]">
                    <image
                        :src="isRemember ? '/static/images/select-password.png' : '/static/images/select-un-password.png'"
                        class="w-[30px] h-[30px]" @click="isRemember = !isRemember"
                    ></image>
                    <text class="ml-[10px] text-[22px] text-white op-60">{{ t('common.login.RememberPassword') }}</text>
                </view>
            </view>
            <view class="mt-[30px] text-center text-white">
                <text class="op-60">{{ t('common.login.ForgotYourPassword') }}</text>
                <text @click="toPage('/pages/common/forget')">{{ t('common.login.Retrieve') }}</text>
            </view>
            <view class="btn-wrap text-center">
                <view class="bg-black py-[33px] rounded-[20px]" @click="submit">
                    <text class="text-[32px] font-bold text-white">
                        {{ t('common.login.Login') }}
                    </text>
                </view>
                <view class="mt-[39px] text-[28px] text-white">
                    <text>{{ t('common.login.haveAnAccount') }}</text>
                    <text class="font-bold" @click="toPage('/pages/common/register')">
                        &nbsp; {{ t('common.login.Register') }}
                    </text>
                </view>
            </view>
        </view>
        <view :class="showChangeLang ? '' : 'hidden'" class="transition">
            <view class="popup-wrap">
                <view class="container">
                    <view class="text-center">
                        <image class="icon" src="/static/images/icon-popup-language.png"></image>
                    </view>
                    <view class="slot-wrap text-center">
                        <view class="mt-[120px]">
                            <view
                                v-for="(item) in LangList" :key="item.code"
                                :class="item.value === locale ? 'active' : ''"
                                class="p-[15px] text-[26px] sub-title"
                                @click="changeLang(item.value)"
                            >
                                <text>{{ item.title }}</text>
                            </view>
                        </view>
                    </view>
                    <view class="lang-btn-wrap flex justify-around items-center font-bold">
                        <text class="btn sub-title bg-[#f5f7f9]" @click="showChangeLang = false">
                            {{ t('tabBar.mine.Cancel') }}
                        </text>
                        <text class="btn text-white bg-black" @click="showChangeLang = false">
                            {{ t('tabBar.mine.Confirm') }}
                        </text>
                    </view>
                </view>
            </view>
        </view>
    </layout>
</template>

<script lang='ts' setup>
import { useI18n } from 'vue-i18n'
import { $api } from '~/api'
import { ls } from '~/composables'

const isPassword = ref(true)
const isRemember = ref(true)
const showChangeLang = ref(false)

function changeLang(code) {
    uni.setStorageSync('lang', code)
    uni.setLocale(code)
    locale.value = code

    showChangeLang.value = false
}

const LangList = [
    {
        title: 'English',
        value: 'en',
    },
    {
        title: '日本語',
        value: 'ja',
    },
    {
        title: '한국어',
        value: 'kr',
    },
    {
        title: '繁体中文',
        value: 'zhHant',
    },
    {
        title: 'Deutsch',
        value: 'de',
    },
    {
        title: 'Français',
        value: 'fr',
    },
    {
        title: 'Русский язык',
        value: 'ru',
    },
    {
        title: 'Português',
        value: 'pt',
    },
    {
        title: 'italiano',
        value: 'it',
    },
]

const { t,locale } = useI18n()

function toPage(url) {
    uni.navigateTo({ url })
}

const form = ref({
    email: '',
    password: '',
})

function showToast(message) {
    uni.showToast({
        title: message,
        icon: 'none',
    })
}

async function submit() {
    const fields = ['email', 'password']
    const messages = [
        t('common.login.PleaseEnterYourEmail'),
        t('common.login.PleaseEnterYourPassword'),
    ]

    for (let i = 0; i < fields.length; i++) {
        if (!form.value[fields[i]]) {
            showToast(messages[i])
            return
        }
    }

    const { code, data, message } = await $api.post('/auth/login', form.value)
    if (code !== 1) {
        showToast(message)
        return
    }

    ls.set('token', data.access_token)
    showToast(t('common.login.LoginSuccessfully'))
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


.transition {
    transition-duration: 300ms;
    transition-timing-function: ease-out;
    transition-property: opacity;
}

.popup-wrap {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, .6);
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    z-index: 1000;

    .container {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 550px;
        height: 900px;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        background: linear-gradient(180deg, #d9efff, #fff);
        border-radius: 50px;

        .icon {
            width: 164px;
            height: 164px;
            margin-top: -100px;
        }
    }
}

.sub-title {
    color: #8c8c8c !important
}

.active {
    border-top: 2px solid #d6d6d6;
    border-bottom: 2px solid #d6d6d6;
    font-size: 26px;
    padding: 15px;
    font-weight: bold;
    color: black !important;
}

.lang-btn-wrap {
    position: absolute;
    bottom: 34px;
    width: 100%;

    .btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 220px;
        height: 80px;
        border-radius: 40px;
        font-size: 28px;
    }
}
</style>

<route lang='yaml'>
style:
navigationStyle: custom
</route>
