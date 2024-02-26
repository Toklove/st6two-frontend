<template>
    <page-meta />
    <div class="init-top" />
    <layout class-name="IndexRouter">
        <view class="mt-[20px] mx-[34px]">
            <view class="relative">
                <view class="flex items-center justify-between">
                    <text class="text-[35px]">{{ t('position.deposit.ChoiceCurrency') }}</text>
                    <view
                        class="flex items-center justify-between bg-black dropdown"
                        @click="showDropdown = !showDropdown"
                    >
                        <text class="text-[26px] text-white px-[10px]">{{ form.currency_name }}</text>
                        <image
                            :src="showDropdown ? '/static/images/icon-dropup.png' : '/static/images/icon-dropdown.png'"
                            class="w-[18px] h-[18px]"
                        ></image>
                    </view>
                </view>
                <view :class="showDropdown ? 'h-auto' : 'h-0'" class="dropdown-item bg-black text-white">
                    <view v-for="(item, index) in CurrencyList" :key="index" class="item" @click="changeCurrency(item)">
                        <text class="text-[26px]">{{ item.name }}</text>
                    </view>
                </view>
            </view>
            <view class="p-[30px] mt-[40px] bg-[#f5f7f9] rounded-[20px]">
                <text class="text-24px] sub-title">
                    {{ t('position.deposit.TokenAddress') }}
                </text>
                <view class="grid place-items-center p-[36px]">
                    <view class="qrcode">
                        <FuiQrcode :value="form.address" height="222" width="222" />
                    </view>
                </view>
                <view
                    class="flex items-center justify-center py-[4px] px-[16px] text-center bg-white rounded-[25px]"
                    @click="CopyAddress"
                >
                    <view>
                        <image class="w-[22px] h-[22px]" src="/static/images/icon-copy-deposit.png"></image>
                    </view>
                    <text class="ml-[10px] text-[24px]">
                        {{ form.address }}
                    </text>
                </view>
            </view>
            <view class="mt-[40px] p-[30px] bg-[#f5f7f9] rounded-[20px]">
                <text class="text-[30px]">{{ t('position.deposit.address') }}</text>
                <input
                    v-model="form.my_address" class="input mt-[29px] text-[14px]"
                    :placeholder="t('mine.addWallet.addressHere')" type="text"
                >
            </view>
            <view class="mt-[40px] p-[30px] bg-[#f5f7f9] rounded-[20px]">
                <text class="text-[30px]">{{ t('position.deposit.count') }}</text>
                <input
                    v-model="form.my_count" class="input mt-[29px] text-[14px]"
                    :placeholder="t('position.deposit.count')" type="number"
                >
            </view>
            <view class="mt-[40px] p-[30px] bg-[#f5f7f9] rounded-[20px]">
                <text class="text-[30px]">{{ t('position.deposit.uploadImage') }}</text>
                <view
                    v-if='form.my_image !== null'
                    class='bg-white w-[180px] h-[180px] mt-[22px] grid place-center'
                    @click='uploadImage'>
                    <image
                        :src="form.my_image_url"
                        class="w-[180px] h-[180px]"
                    ></image>
                </view>
                <view v-else class='bg-white w-[180px] h-[180px] mt-[22px] grid place-center'
                      @click='uploadImage'>
                    <fui-icon name='plus' size='180'></fui-icon>
                </view>
            </view>
            <view class="btn-wrap text-center">
                <view class="bg-black py-[33px] rounded-[20px]" @click="submit">
                    <text class="text-[32px] font-bold text-white">
                        {{ t('common.forget.Submit') }}
                    </text>
                </view>
            </view>
        </view>
    </layout>
</template>

<script lang='ts' setup>
import { useI18n } from 'vue-i18n'
import { layoutDataKey } from '~/composables/provide'
import FuiQrcode from '~/components/firstui/fui-qrcode/fui-qrcode.vue'
import FuiIcon from '~/components/firstui/fui-icon/fui-icon.vue'

const showDropdown = ref(false)
const form = ref({
    currency_id: '',
    currency_name: '',
    address: '',
    my_address: '',
    my_count: '',
    my_image: null,
    my_image_url: null,
})

function submit() {
    if (form.value.my_address === '') {
        showToast(t('position.deposit.addressEmpty'))
        return
    }
    if (form.value.my_count === '') {
        showToast(t('position.deposit.countEmpty'))
        return
    }
    if (form.value.my_image === null) {
        showToast(t('position.deposit.uploadImageEmpty'))
        return
    }
    $api.post('/user/real', formData.value).then((res) => {
        if (res.code === 1) {
            showToast(t('mine.certified.SubmitSuccess'))
            $api.back()
        }
        else {
            showToast(t('mine.certified.SubmitFailed'))
        }
    })
    showToast(t('position.deposit.submitSuccess'))
}

function uploadImage() {

    // 调用uniapp上传文件方法
    uni.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album'], // 从相册选择
        async success(res) {
            // 上传图片
            const { data, code } = await $api.uploadFile('/common/upload', res.tempFilePaths[0])
            if (code === 1) {
                form.value.my_image_url = $api.staticUrl(data.url)
                form.value.my_image = data.url
            }
            else {
                showToast(t('mine.certified.UploadFailed'))
            }
        },
    })
}

const { t } = useI18n()

function showToast(message) {
    uni.showToast({
        title: message,
        icon: 'none',
    })
}

function setClipboardData(data) {
    uni.setClipboardData({
        data,
        success() {
            showToast(t('position.deposit.CopySuccess'))
        },
    })
}

function changeCurrency(item) {
    form.value.currency_id = item.id
    form.value.currency_name = item.name
    form.value.address = item.address
    showDropdown.value = false
}

const CurrencyList = ref([])
onShow(() => {
    $api.get('/user/getCurrency').then((res) => {
        CurrencyList.value = res.data
        form.value.currency_name = CurrencyList.value[0].name
        form.value.currency_id = CurrencyList.value[0].id
        form.value.address = CurrencyList.value[0].address
    })
})

function CopyAddress() {
    setClipboardData(form.value.address)
}

const layoutData = ref({
    showTopBar: true,
    topBarBgColor: 'white',
    showTopBarBackBtn: true,
    topBarTitle: t('position.deposit.deposit'),
})

provide(layoutDataKey, layoutData)
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

.line {
    border-bottom: 2px solid #f0f2fe;
}

.sub-title {
    color: #8c8c8c !important
}

.input {
    font-size: 28px;
    color: #242323;
}

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
