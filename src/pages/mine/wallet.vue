<template>
    <page-meta />
    <div class='init-top' />
    <layout class-name='IndexRouter'>
        <FuiNavBar custom>
            <view class='flex justify-center relative items-center flex-1'>
                <view class='absolute left-0'>
                    <FuiIcon name='arrowleft' @click='clickBack'></FuiIcon>
                </view>
                <view class='absolute right-[16px]' @click='toAdd'>
                    <image class='w-[27px] h-[27px]' src='/static/images/icon-edit-avator.png'></image>
                </view>
                <USubsection
                    v-model='current'
                    :list='subList' active-color='white' button-color='#3640f0' class='w-[350px]' rounded
                    @change='changeType'
                ></USubsection>
            </view>
        </FuiNavBar>
        <view v-if='loading' class='mt-[20px] mx-[34px]'>
            <FuiLoading :is-fixed='false' :loading='loading' type='row' />
        </view>
        <view v-else class='mt-[20px] mx-[34px]'>
            <view v-if='CryptoList.length > 0 && current === 0' class='wallet-list'>
                <view v-for='item in CryptoList' :key='item.id'
                      class='flex items-center justify-between mb-[20px] px-[39px] wallet-item'>
                    <view class='flex flex-col text-white'>
                        <text class='text-[34px]'>{{ item.currency.name }}</text>
                        <text class='mt-[10px] text-[40px] font-bold'>
                            {{ item.address }}
                        </text>
                    </view>
                    <image class='w-[45px] h-[45px]' src='/static/images/icon-del.png' @click='del(item.id)'></image>
                </view>
            </view>
            <view v-else-if='BankList.length > 0 && current === 1' class='wallet-list'>
                <view v-for='item in BankList' :key='item.id'
                      class='flex items-center justify-between mb-[20px] px-[39px] wallet-item'>
                    <view class='flex flex-col text-white'>
                        <text class='text-[34px]'>{{ item.bank_name }}</text>
                        <text class='mt-[10px] text-[40px] font-bold'>
                            {{ crypto_number(item.account) }}
                        </text>
                    </view>
                    <image class='w-[45px] h-[45px]' src='/static/images/icon-del.png' @click='del(item.id)'></image>
                </view>
            </view>
            <view v-else class='nodata'>
                <image class='w-[340px] h-[340px]' src='/static/images/option.png'></image>
            </view>
        </view>
    </layout>
</template>

<script lang='ts' setup>
import FuiNavBar from '~/components/firstui/fui-nav-bar/fui-nav-bar.vue'
import FuiIcon from '~/components/firstui/fui-icon/fui-icon.vue'
import USubsection from '~/components/toklove/sub-section/sub-section.vue'
import FuiLoading from '~/components/firstui/fui-loading/fui-loading.vue'

const loading = ref(false)

function clickBack() {
    $api.back()
}

function changeType() {
    console.log(111)
    loading.value = true
    if (current.value === 0) {
        //获取钱包列表
        $api.get('/user/cryptoList').then((res) => {
            if (res.code === 1) {
                CryptoList.value = res.data
            }
        })
    } else {
        //获取银行卡列表
        $api.get('/user/bankList').then((res) => {
            if (res.code === 1) {
                BankList.value = res.data
            }
        })
    }
    loading.value = false
}


function del(id) {
    if (!id) {
        uni.showToast({
            title: 'Delete failed',
            icon: 'none',
        })
        return
    }
    if (current.value === 0) {
        delCrypto(id)
    } else {
        delBank(id)
    }
}

//加密银行卡号只显示前四和后四
function crypto_number(str) {
    if (str.length < 8) {
        return str
    }
    var start = str.slice(0, 4)
    var end = str.slice(-4)
    var masked = '*'.repeat(str.length - 8)
    return start + masked + end
}

function toAdd() {
    if (current.value === 0) {
        toPage('/pages/mine/addWallet')
    } else {
        toPage('/pages/mine/addBank')
    }
}

function delCrypto(id) {
    //删除钱包信息
    $api.post('/user/delCrypto', { id }).then((res) => {
        if (res.code === 1) {
            uni.showToast({
                title: 'Delete success',
                icon: 'none',
            })
            //获取钱包列表
            $api.get('/user/cryptoList').then((res) => {
                if (res.code === 1) {
                    CryptoList.value = res.data
                }
            })
        } else {
            uni.showToast({
                title: 'Delete failed',
                icon: 'none',
            })
        }
    })
}

function delBank(id) {
    //删除银行卡信息
    $api.post('/user/delBank', { id }).then((res) => {
        if (res.code === 1) {
            uni.showToast({
                title: 'Delete success',
                icon: 'none',
            })
            //获取银行卡列表
            $api.get('/user/bankList').then((res) => {
                if (res.code === 1) {
                    BankList.value = res.data
                }
            })
        } else {
            uni.showToast({
                title: 'Delete failed',
                icon: 'none',
            })
        }
    })
}

const subList = [
    {
        name: 'Purse',
    },
    {
        name: 'Bank Card',
    },
]
const current = ref(0)


function toPage(url) {
    uni.navigateTo({ url })
}

const CryptoList = ref([])
const BankList = ref([])

onShow(() => {
    loading.value = true
    //获取钱包列表
    $api.get('/user/cryptoList').then((res) => {
        console.log(res)
        if (res.code === 1) {
            console.log(res.data)
            CryptoList.value = res.data
        }
    })
    //获取银行卡列表
    $api.get('/user/bankList').then((res) => {
        if (res.code === 1) {
            BankList.value = res.data
        }
    })
    loading.value = false
})

</script>

<route lang='yaml'>
style:
navigationStyle: custom
</route>

<style lang='scss' scoped>
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
</style>
