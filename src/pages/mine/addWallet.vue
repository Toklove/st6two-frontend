<template>
    <page-meta />
    <div class="init-top" />
    <layout class-name="IndexRouter">
        <view class="px-[34px]">
            <view class="relative">
                <view class="flex items-center justify-between">
                    <text class="text-[35px]">{{ t('mine.addWallet.ChoiceOfCurrency') }}</text>
                    <view
                        class="flex items-center justify-between bg-black dropdown"
                        @click="showDropdown = !showDropdown"
                    >
                        <text class="text-[26px] text-white px-[10px]">{{ form.currency_name }}</text>
                        <image
                            :src="showDropdown ? &quot;/static/images/icon-dropup.png&quot; : &quot;/static/images/icon-dropdown.png&quot;"
                            class="w-[18px] h-[18px]"
                        ></image>
                    </view>
                </view>
                <view :class="showDropdown ? &quot;h-auto&quot; : &quot;h-0&quot;" class="dropdown-item bg-black text-white">
                    <view v-for="(item, index) in CurrencyList" :key="index" class="item" @click="changeCurrency(item)">
                        <text class="text-[26px]">{{ item.name }}</text>
                    </view>
                </view>
            </view>
            <view class="mt-[40px] p-[30px] bg-[#f5f7f9] rounded-[20px]">
                <text class="text-[30px]">{{ t('mine.addWallet.AddAddress') }}</text>
                <input
                    v-model="form.address" class="input mt-[29px] text-[14px]"
                    :placeholder="t('mine.addWallet.addressHere')" type="text"
                >
            </view>
            <view class="btn-wrap text-center">
                <view class="bg-black py-[33px] rounded-[20px]" @click="submit">
                    <text class="text-[32px] font-bold text-white">
                        {{ t('mine.addWallet.Save') }}
                    </text>
                </view>
            </view>
        </view>
    </layout>
</template>

<script lang='ts' setup>
import { useI18n } from 'vue-i18n'
import { layoutDataKey } from '~/composables/provide'

const showDropdown = ref(false)
const form = ref({
    currency_id: '',
    currency_name: '',
    address: '',
})

const { t } = useI18n()

function submit() {
    if (!form.value.currency_id) {
        uni.showToast({
            title: 'Please select currency',
            icon: 'none',
        })
        return
    }
    if (!form.value.address) {
        uni.showToast({
            title: 'Please enter address',
            icon: 'none',
        })
        return
    }
    $api.post('/user/addWallet', form.value).then((res) => {
        if (res.code === 1) {
            uni.showToast({
                title: 'Add success',
                icon: 'none',
            })
            uni.navigateBack()
        }
        else {
            uni.showToast({
                title: 'Add failed',
                icon: 'none',
            })
        }
    })
}

function changeCurrency(item) {
    form.value.currency_id = item.id
    form.value.currency_name = item.name
    showDropdown.value = false
}

const CurrencyList = ref([])
onShow(() => {
    $api.get('/user/getCurrency').then((res) => {
        CurrencyList.value = res.data
        form.value.currency_name = CurrencyList.value[0].name
        form.value.currency_id = CurrencyList.value[0].id
    })
})

const layoutData = ref({
    showTopBar: true,
    topBarBgColor: 'white',
    showTopBarBackBtn: true,
    topBarTitle: 'Add Wallet',
})

provide(layoutDataKey, layoutData)
</script>

<route lang='yaml'>
style:
navigationStyle: custom
</route>

<style lang='scss' scoped>
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
