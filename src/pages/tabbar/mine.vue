<template>
    <page-meta />
    <div class="init-top" />
    <layout class-name="IndexRouter">
        <view class="card mx-auto">
            <view class="flex">
                <image
                    :src="userStore.userInfo.avatar ? userStore.userInfo.avatar : &quot;/static/images/avatar.png&quot;"
                    class="w-[132px] h-[132px] rounded-full"
                ></image>
                <view class="flex-1 ml-[19px]">
                    <view class="flex items-center justify-between text-white">
                        <text class="text-[38px] font-bold">
                            {{ userStore.userInfo.nickname }}
                        </text>
                        <image
                            class="w-[54px] h-[54px]" src="/static/images/icon-edit.png"
                            @click="toPage('/pages/mine/userInfo')"
                        ></image>
                    </view>
                    <view class="text-[25px] text-white">
                        <text>ID:&nbsp;{{ userStore.userInfo.id }}</text>
                    </view>
                    <view
                        class="copy-wrap flex items-center text-center h-[40px] mt-[24px] px-[24px] bg-white rounded-[20px]"
                        @click="copyInviteCode"
                    >
                        <view class="mr-[14px] grid place-items-center">
                            <image class="w-[24px] h-[24px]" src="/static/images/icon-small-invite.png"></image>
                        </view>
                        <text class="text-[24px]">{{ userStore.userInfo.invite_code }}</text>
                    </view>
                </view>
            </view>
        </view>
        <view class="mt-[40px] px-[34px]">
            <text class="text-[45px]">{{ t('tabBar.mine.AccountDetails') }}</text>
            <view class="mt-[20px] p-[30px] bg-[#f5f7f9] rounded-[30px]">
                <view class="flex items-center justify-between" @click="toPage('/pages/mine/option')">
                    <view class="flex items-center">
                        <image class="w-[40px] h-[40px] mr-[18px]" src="/static/images/icon-option.png"></image>
                        <text class="text-[28px]">{{ t('tabBar.mine.OptionOrders') }}</text>
                    </view>
                    <image class="h-[18px] w-[18px]" src="/static/images/icon-right-arrow.png"></image>
                </view>
                <view class="flex items-center justify-between mt-[35px]" @click="toPage('/pages/mine/wallet')">
                    <view class="flex items-center">
                        <image class="w-[40px] h-[40px] mr-[18px]" src="/static/images/icon-wallet.png"></image>
                        <text class="text-[28px]">{{ t('tabBar.mine.Purse') }}</text>
                    </view>
                    <image class="h-[18px] w-[18px]" src="/static/images/icon-right-arrow.png"></image>
                </view>
                <view class="flex items-center justify-between mt-[35px]" @click="toPage('/pages/mine/certified')">
                    <view class="flex items-center">
                        <image class="w-[40px] h-[40px] mr-[18px]" src="/static/images/icon-real.png"></image>
                        <text class="text-[28px]">{{ t('tabBar.mine.Certified') }}</text>
                    </view>
                    <image class="h-[18px] w-[18px]" src="/static/images/icon-right-arrow.png"></image>
                </view>
                <view class="flex items-center justify-between mt-[35px]" @click="showChangeLang = true">
                    <view class="flex items-center">
                        <image class="w-[40px] h-[40px] mr-[18px]" src="/static/images/icon-small-language.png"></image>
                        <text class="text-[28px]">{{ t('tabBar.mine.Language') }}</text>
                    </view>
                    <text class="sub-title">{{ nowLocale.title }}</text>
                </view>
                <view class="flex items-center justify-between mt-[35px]" @click="toPage('/pages/mine/changePassword')">
                    <view class="flex items-center">
                        <image class="w-[40px] h-[40px] mr-[18px]" src="/static/images/icon-small-password.png"></image>
                        <text class="text-[28px]">{{ t('tabBar.mine.ChangePassword') }}</text>
                    </view>
                    <image class="h-[18px] w-[18px]" src="/static/images/icon-right-arrow.png"></image>
                </view>
            </view>
        </view>
        <view class="mt-[40px] px-[34px]">
            <text class="text-[45px]">{{ t('tabBar.mine.HelpAndSupport') }}</text>
            <view class="mt-[20px] p-[30px] bg-[#f5f7f9] rounded-[30px]">
                <view class="flex items-center justify-between">
                    <view class="flex items-center">
                        <image class="w-[40px] h-[40px] mr-[18px]" src="/static/images/icon-market.png"></image>
                        <text class="text-[28px]">{{ t('tabBar.mine.MarketPattern') }}</text>
                    </view>
                    <image class="h-[18px] w-[18px]" src="/static/images/icon-right-arrow.png"></image>
                </view>
                <view class="flex items-center justify-between mt-[35px]" @click="toPage('/pages/mine/service')">
                    <view class="flex items-center">
                        <image class="w-[40px] h-[40px] mr-[18px]" src="/static/images/icon-service.png"></image>
                        <text class="text-[28px]">{{ t('tabBar.mine.CustomerService') }}</text>
                    </view>
                    <image class="h-[18px] w-[18px]" src="/static/images/icon-right-arrow.png"></image>
                </view>
                <view class="flex items-center justify-between mt-[35px]" @click="copyInviteCode">
                    <view class="flex items-center">
                        <image class="w-[40px] h-[40px] mr-[18px]" src="/static/images/icon-invite.png"></image>
                        <text class="text-[28px]">{{ t('tabBar.mine.InvitationLink') }}</text>
                    </view>
                    <text class="text-[28px] sub-title">
                        {{ t('tabBar.mine.ClickToCopy') }}
                    </text>
                </view>
                <view class="flex items-center justify-between mt-[35px]" @click="toPage('/pages/mine/about')">
                    <view class="flex items-center">
                        <image class="w-[40px] h-[40px] mr-[18px]" src="/static/images/icon-about.png"></image>
                        <text class="text-[28px]">{{ t('tabBar.mine.AboutUs') }}</text>
                    </view>
                    <image class="h-[18px] w-[18px]" src="/static/images/icon-right-arrow.png"></image>
                </view>
                <view class="flex items-center justify-between mt-[35px]" @click="logout">
                    <view class="flex items-center">
                        <image class="w-[40px] h-[40px] mr-[18px]" src="/static/images/icon-logout.png"></image>
                        <text class="text-[28px]">{{ t('tabBar.mine.Logout') }}</text>
                    </view>
                    <image class="h-[18px] w-[18px]" src="/static/images/icon-right-arrow.png"></image>
                </view>
            </view>
        </view>
        <view class="transition" :class="showChangeLang ? '' : 'hidden'">
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
                    <view class="btn-wrap flex justify-around items-center font-bold">
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
import { useUserStore } from '~/pinia/useUserInfo'

const userStore = useUserStore()

const { t, locale } = useI18n()

const showChangeLang = ref(false)

function changeLang(code) {
    uni.setStorageSync('lang', code)
    uni.setLocale(code)
    locale.value = code

    showChangeLang.value = false
}

async function logout() {
    const modalSuccess = async (res) => {
        if (res.confirm) {
            const { code } = await $api.get('/user/logout')
            if (code === 1) {
                uni.clearStorageSync()
                uni.reLaunch({
                    url: '/pages/common/login',
                })
            }
            else {
                uni.showToast({
                    title: t('tabBar.mine.LogOutFailed'),
                    icon: 'none',
                })
            }
        }
    }

    uni.showModal({
        title: t('tabBar.mine.LogOut'),
        content: t('tabBar.mine.ConfigLout'),
        success: modalSuccess,
    })
}

function toPage(url) {
    uni.navigateTo({ url })
}

function copyInviteCode() {
    uni.setClipboardData({
        data: userStore.userInfo.invite_code,
        success() {
            uni.showToast({
                title: t('tabBar.mine.CopySuccess'),
                icon: 'none',
            })
        },
    })
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

const nowLocale = computed(() => {
    return LangList.find(item => item.value === locale.value)
})

onShow(async () => {
    if (!userStore.userInfo.id)
        await userStore.getUserInfo()
})
</script>

<route lang='yaml'>
style:
navigationStyle: custom
</route>

<style>
.card {
    width: 708px;
    height: 248px;
    margin-top: 16px;
    padding: 50px 30px 62px;
    background: url("/static/images/bg-account.png") no-repeat;
    background-size: cover;

    .copy-wrap {
        width: 208px;
    }
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

.btn-wrap {
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
