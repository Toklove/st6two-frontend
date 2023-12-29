<template>
    <page-meta />
    <view class="init-top" />
    <layout class-name="IndexRouter">
        <view class="flex flex-row justify-between items-center px-[34px]">
            <text class="text-[40px] font-bold">
                {{ userStore.userInfo ? userStore.userInfo.nickname : 'Log in' }}
            </text>
            <view class="flex items-center">
                <image class="w-[41px] h-[40px]" src="/static/images/msg.png"></image>
                <image
                    :src="userStore.userInfo.avatar ? userStore.userInfo.avatar : '/static/images/no-login.png'"
                    class="ml-[25px] rounded-full w-[92px] h-[92px]"
                ></image>
            </view>
        </view>
        <view class="mt-[18px]">
            <view class="text-[45px] pl-[34px]">{{ t('tabBar.home.hot') }}</view>
            <scroll-view class="mt-[20px]" scroll-x>
                <view class="items-center flex">
                    <view
                        v-for="item in marketList" :key="item.id" class="flex flex-col rounded-[30px] chart-wrap"
                        @click="toPair(item.symbol)"
                    >
                        <text class="text-[28px] font-bold">
                            {{ item.full_name }}
                        </text>
                        <text class="text-[40px] font-bold">
                            1.27461
                        </text>
                        <view class="mb-[54px] mt-[30px] h-[28px] chart">
                        </view>
                        <view class="flex items-center justify-between">
                            <view class="increase text-[26px] text-center">
                                -0.104
                            </view>
                            <text>
                                →
                            </text>
                        </view>
                    </view>
                </view>
            </scroll-view>
        </view>
        <view class="mt-[40px] px-[34px]">
            <view class="flex items-center justify-between">
                <text class="text-[45px]">{{ t('tabBar.home.news') }}</text>
                <text class="text-[20px]">
                    {{ t('tabBar.home.seeMore') }}
                </text>
            </view>
            <view class="mt-[20px]">
                <swiper
                    :autoplay="true" :indicator-dots="true"
                    circular class="h-[234px] bg-[#f5f7f9] rounded-[15px]"
                    vertical
                >
                    <swiper-item v-for="item in newsList" :key="item.id">
                        <view class="news mr-[56px]">
                            <view class="teletext flex justify-between">
                                <view class="news-title text-[24px] line-clamp-3">
                                    {{ item.title }}
                                </view>
                                <image
                                    class="news-image rounded-[10px]"
                                    :src="item.image"
                                ></image>
                            </view>
                            <div class="desc mt-[21px] text-[20px] sub-title flex items-center justify-between">
                                <text>
                                    {{ item.created_at }}
                                </text>
                                <text>
                                    {{ item.author }}
                                </text>
                            </div>
                        </view>
                    </swiper-item>
                </swiper>
            </view>
        </view>
        <view class="mt-[40px] px-[34px]">
            <view class="flex items-center justify-between">
                <text class="text-[45px]">{{ t('tabBar.home.market') }}</text>
                <text class="text-[20px]" @click="switchQuotes">
                    {{ t('tabBar.home.seeMore') }}
                </text>
            </view>
            <view class="mt-[20px]">
                <view
                    v-for="item in marketList" :key="item.id" class="stock-row items-center"
                    @click="toPair(item.symbol)"
                >
                    <view class="flex">
                        <image
                            class="rounded-full w-[72px] h-[72px]"
                            :src="item.logo"
                        ></image>
                        <view class="flex flex-col justify-between ml-[20px]">
                            <text class="text-[30px]">{{ item.full_name }}</text>
                            <text class="sub-title text-[22px]">
                                17:28:16
                            </text>
                        </view>
                    </view>
                    <text class="text-[28px] text-right">
                        1.27669
                    </text>
                    <view class="h-[68px] ml-[20px] rounded-[10px] grid place-items-center green-block">
                        <text class="text-[22px] text-white">-0.045</text>
                    </view>
                </view>
            </view>
        </view>
    </layout>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { useUserStore } from '~/pinia/useUserInfo'

useHead({
    title: 'Home',
})

const { t } = useI18n()

const userStore = useUserStore()

onReady(() => {
    // 获取新闻列表
    getNewsList()
    // 获取热门币种
    getMarketList()
})

function toPair(pair) {
    uni.navigateTo({ url: `/pages/position/chart?pair=${pair}` })
}

function switchQuotes() {
    uni.switchTab({ url: '/pages/tabbar/quotes' })
}

const newsList = reactive([])

async function getNewsList() {
    const res = await $api.get('/index/news')
    res.data.forEach((item) => {
        item.image = $api.staticUrl(item.image)
        newsList.push(item)
    })
}

const marketList = ref([])

async function getMarketList() {
    const res = await $api.get('/index/market')
    res.data.forEach((item) => {
        item.logo = $api.staticUrl(item.logo)
        marketList.value.push(item)
    })
}
</script>

<route lang='yaml'>
style:
navigationStyle: custom
type: home
</route>

<style lang='scss'>
.chart-wrap {
    margin-left: 20px;
    padding: 36px 26px;
    background-color: #d8f0dd;
    min-width: 280px;

    .increase {
        padding: 8px 20px;
        background-color: #fff;
        border-radius: 28px;
    }
}

.chart-wrap:nth-child(even) {
    color: #fff;
    background-color: #9f9cff;

    .increase {
        background-color: #8581f6;
    }
}

.news {
    margin: 30px 26px 26px 26px;

    .teletext {
        height: 114px;

        .news-title {
            width: 406px;
            height: 104px;
        }

        .news-image {
            width: 186px;
            height: 114px;
        }
    }

    .desc {
        padding-top: 10px;
        border-top: 1px solid #d1d1d1;
    }
}

.sub-title {
    color: #8c8c8c !important;
}
</style>
