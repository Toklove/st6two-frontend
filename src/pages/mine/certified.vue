<template>
    <page-meta />
    <div class="init-top" />
    <layout class-name="IndexRouter">
        <view class="px-[34px]">
            <view class="text-[45px] leading-[60px]">
                {{ t('mine.certified.UploadIDPhoto') }}
            </view>
            <view class="text-[26px] sub-title leading-[36px]">
                {{ t('mine.certified.MakeSureTheBorderIsComplete') }}
            </view>
            <view class="bg-[#f5f7f9] mt-[50px] p-[28px] rounded-[20px]">
                <input
                    v-model="formData.real_name" :placeholder="t('mine.certified.realName')"
                    :disabled="formData.is_certified === 1" class="flex-1 ml-[19px] input" type="text"
                >
            </view>
            <view class="bg-[#f5f7f9] mt-[20px] p-[28px] rounded-[20px]">
                <input
                    v-model="formData.id_number" :placeholder="t('mine.certified.idNumber')"
                    class="flex-1 ml-[19px] input" type="text"
                    :disabled="formData.is_certified === 1"
                >
            </view>
            <view class="mt-[30px] text-center" @click="uploadFrontend">
                <image
                    :src="formData.front !== null ? formData.front : '/static/images/real-upload.png'"
                    class="mt-[22px] icon-upload"
                ></image>
            </view>
            <view class="mt-[30px] text-center" @click="uploadBackend">
                <image :src="formData.back ?? '/static/images/real-upload.png'" class="mt-[22px] icon-upload"></image>
            </view>
            <view class="mt-[98px] text-center">
                <text class="text-[22px] sub-title">
                    {{ t('mine.certified.cerTitle') }}
                </text>
            </view>
            <view
                v-if="formData.is_certified === 0"
                :class="isInputAll ? 'bg-black text-white' : ''"
                class="mt-[30px] py-[24px] text-center bg-[#f5f7f9] rounded-[40px] transition-all" @click="submit"
            >
                <text :class="isInputAll ? 'text-white' : 'sub-title'" class="text-[28px] font-bold transition-all">
                    {{ t('mine.certified.Submit') }}
                </text>
            </view>
        </view>
    </layout>
</template>

<script lang='ts' setup>
import { useI18n } from 'vue-i18n'
import { layoutDataKey } from '~/composables/provide'

const { t } = useI18n()
const layoutData = ref({
    showTopBar: true,
    topBarBgColor: 'white',
    showTopBarBackBtn: true,
    topBarTitle: t('mine.certified.Certified'),
})

const formData = ref({
    front: null,
    front_url: null,
    back: null,
    back_url: null,
    real_name: null,
    id_number: null,
    is_certified: 0,
})

const isInputAll = computed(() => {
    return formData.value.front !== null && formData.value.back !== null && formData.value.real_name !== null && formData.value.id_number !== null
})

function submit() {
    if (!isInputAll.value)
        return showToast(t('mine.certified.InputAll'))
    $api.post('/user/real', formData.value).then((res) => {
        if (res.code === 1) {
            showToast(t('mine.certified.SubmitSuccess'))
            $api.back()
        }
        else {
            showToast(t('mine.certified.SubmitFailed'))
        }
    })
}

function uploadFrontend() {
    if (formData.value.is_certified === 1)
        return
    // 调用uniapp上传文件方法
    uni.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album'], // 从相册选择
        async success(res) {
            // 上传图片
            const { data, code } = await $api.uploadFile('/common/upload', res.tempFilePaths[0])
            console.log(data, code)
            if (code === 1) {
                formData.value.front_url = $api.staticUrl(data.url)
                formData.value.front = data.url
            }
            else {
                showToast(t('mine.certified.UploadFailed'))
            }
        },
    })
}

function uploadBackend() {
    if (formData.value.is_certified === 1)
        return

    // 调用uniapp上传文件方法
    uni.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album'], // 从相册选择
        async success(res) {
            // 上传图片
            const { data, code } = await $api.uploadFile('/common/upload', res.tempFilePaths[0])
            if (code === 1) {
                formData.value.back_url = $api.staticUrl(data.url)
                formData.value.back = data.url
            }
            else {
                showToast(t('mine.certified.UploadFailed'))
            }
        },
    })
}

onLoad(() => {
    $api.get('/user/real').then((res) => {
        if (res.code === 1) {
            formData.value.front = res.data.front
            formData.value.front_url = $api.staticUrl(res.data.front)
            formData.value.back = res.data.back
            formData.value.back_url = $api.staticUrl(res.data.back)
            formData.value.real_name = res.data.real_name
            formData.value.id_number = res.data.id_number
            formData.value.is_certified = res.data.is_certified
        }
    })
})

provide(layoutDataKey, layoutData)
</script>

<route lang='yaml'>
style:
navigationStyle: custom
</route>

<style lang='scss' scoped>
.sub-title {
    color: #8c8c8c !important
}

.input {
    font-size: 28px;
    color: #242323;
}

.icon-upload {
    width: 534px;
    height: 320px;
}
</style>
