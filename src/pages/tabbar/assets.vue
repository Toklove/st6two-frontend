<template>
    <page-meta />
    <view class="init-top" />
    <layout class-name="IndexRouter bg-[#eff2f5]">
        <view class="head-pro">
            <view class="head-pro-back h-[616px]">
                <image alt="" class="w-full h-full" src="/static/images/movebricks_bg.png" />
            </view>
            <view class="head-pro-title">
                <view class="uni-status-bar" style="height: 0;" />
                <view class="head-pro-title-sm">
                    {{ t('tabBar.assets.Assets') }}
                </view>
                <text class="head-pro-title-lg mt-[30px]">
                    {{ nowCoin.balance }}<span class="head-pro-title-small">{{ nowCoin.currency.name }}</span>
                </text>
                <view class="dd-table2" style="width: 100%;">
                    <!----><!---->
                </view>
            </view>
            <view class="head-pro-btn">
                <view class="head-pro-btn-a" @click="toPage('/pages/position/deposit')">
                    <view class="head-pro-btn-icon">
                        <image alt="" class="w-full h-full" src="/static/images/ic_recharge_coin.png">
                        </image>
                    </view>
                    <text class="mt-[10px]">
                        {{ t('tabBar.assets.Recharge') }}
                    </text>
                </view>
                <view class="head-pro-btn-a" @click="toPage('/pages/position/withdraw')">
                    <view class="head-pro-btn-icon">
                        <image alt="" class="w-full h-full" src="/static/images/ic_withdraw_coin.png">
                        </image>
                    </view>
                    <text class="mt-[10px]">
                        {{ t('tabBar.assets.Withdraw') }}
                    </text>
                </view>
                <view class="head-pro-btn-a">
                    <view class="head-pro-btn-icon">
                        <image alt="" class="w-full h-full" src="/static/images/ic-transfer.png">
                        </image>
                    </view>
                    <text class="mt-[10px]">
                        {{ t('tabBar.assets.Exchange') }}
                    </text>
                </view>
            </view>
        </view>
        <view>
            <view class="mt-[20px] mb-[80px]">
                <view v-for="(item, index) in wallet" :key="index" class="pos-box" @click="changeItem(index)">
                    <view :class="activeList === index ? 'active' : ''" class="pos-list transition-all">
                        <view class="dd-pos-title">
                            <text class="dd-pos-title-fl">
                                {{ item.currency.name }}
                            </text>
                        </view>
                        <view class="dd-table2">
                            <view class="dd-table-cell">
                                <view class="dd-table-top">
                                    {{ t('tabBar.assets.Usable') }}(USDT)
                                </view>
                                <view class="dd-table-bottom">
                                    {{ item.balance }}
                                </view>
                            </view>
                            <view class="dd-table-cell">
                                <view class="dd-table-top">
                                    {{ t('tabBar.assets.InProcess') }}({{ item.currency.name }})
                                </view>
                                <view class="dd-table-bottom">
                                    0
                                </view>
                            </view>
                            <view class="dd-table-cell">
                                <view class="dd-table-top">
                                    {{ t('tabBar.assets.ConvertInto') }}(USDT)
                                </view>
                                <view class="dd-table-bottom">
                                    0
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </layout>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { layoutDataKey } from '~/composables/provide'

const active = ref(0)
const activeList = ref(0)
const loading = ref(false)

const { t } = useI18n()

function toPage(url) {
    uni.navigateTo({ url })
}

const wallet = reactive([{ balance: 0, currency: { name: '' } }])

onShow(() => {
    uni.showLoading({ mask: true })
    loading.value = true
    $api.get('/wallet/index').then((res) => {
        wallet.splice(0, wallet.length)
        loading.value = false
        if (res.code === 1) {
            res.data.forEach((item) => {
                wallet.push(item)
            })
        }
        uni.hideLoading()
    })
})

const nowCoin = computed(() => wallet[activeList.value])

function changeItem(index) {
    activeList.value = index
}

const layoutData = ref({
    showBodyPadding: true,
})
provide(layoutDataKey, layoutData)
</script>

<style lang="scss" scoped>
.head-pro {
    margin-bottom: 20px;
    position: relative;
    overflow: hidden;
    height: 540px;

    .head-pro-back {
        position: absolute;
        top: -140px;
        left: 0;
        width: 100%;
        z-index: 1;
    }
}

.head-pro-title {
    position: absolute;
    z-index: 2;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    flex-direction: column;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    color: #fff;
    height: 340px;
    width: 100%;

    .head-pro-title-sm {
        font-size: 32px;
    }

    .head-pro-title-lg {
        font-size: 64px;
        font-weight: 700;
    }

    .head-pro-title-small {
        font-size: 40px;
        padding-left: 8px;
    }

    .dd-table2 {
        padding: 10px 0;
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        -webkit-justify-content: space-around;
        justify-content: space-around;
    }

    .uni-status-bar {
        width: 780px;
        height: 40px /* height: var(--status-bar-height); */
    ;
    }
}

.head-pro-btn {
    position: absolute;
    z-index: 2;
    bottom: 0;
    left: 0;
    right: 0;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    background: #fff;
    -webkit-border-radius: 20px 20px 0 0;
    border-radius: 20px 20px 0 0;
    overflow: hidden;
}

.head-pro-btn-a {
    -webkit-box-flex: 1;
    -webkit-flex: auto;
    flex: auto;
    text-align: center;
    font-size: 28px;
    padding: 40px 0;
    display: flex;
    flex-flow: column;
    align-items: center;
    color: #333;

    .head-pro-btn-icon {
        width: 80px;
        height: 80px;
    }
}

.pos-box {
    width: 95%;
    margin: auto;

    .active {
        background: #fff !important;
    }

    .pos-list {
        background-color: #fafafa;
        padding: 0 20px;
        -webkit-border-radius: 20px;
        border-radius: 20px;
        margin-bottom: 20px;

        .dd-pos-title {
            display: -webkit-box;
            display: -webkit-flex;
            display: flex;
            -webkit-box-pack: justify;
            -webkit-justify-content: space-between;
            justify-content: space-between;
            margin-bottom: 20px;
            -webkit-box-align: center;
            -webkit-align-items: center;
            align-items: center;
            /* border-bottom: solid 1px #e6eaed; */
            line-height: 95px;

            .dd-pos-title-fl {
                color: #000;
                font-size: 36px;
                font-weight: 600;
            }
        }

        .dd-table2 {
            padding: 10px 0;
            display: -webkit-box;
            display: -webkit-flex;
            display: flex;
            -webkit-justify-content: space-around;
            justify-content: space-around;

            .dd-table-cell {
                display: -webkit-box;
                display: -webkit-flex;
                display: flex;
                -webkit-box-orient: vertical;
                -webkit-box-direction: normal;
                -webkit-flex-direction: column;
                flex-direction: column;
                -webkit-box-pack: center;
                -webkit-justify-content: center;
                justify-content: center;
                -webkit-box-align: center;
                -webkit-align-items: center;
                align-items: center;

                .dd-table-top {
                    font-size: 22px;
                }

                .dd-table-bottom {
                    font-size: 24px;
                    color: #000;
                    margin: 14px 0;
                }
            }
        }
    }
}
</style>
