<template>
    <page-meta />
    <div class='init-top' />
    <layout class-name='IndexRouter'>
        <view class='px-[34px]'>
            <view class='text-[45px] leading-[60px]'>
                {{ t('mine.certified.UploadIDPhoto') }}
            </view>
            <view class='text-[26px] sub-title leading-[36px]'>
                {{ t('mine.certified.MakeSureTheBorderIsComplete') }}
            </view>
            <view class='bg-[#f5f7f9] mt-[50px] p-[28px] rounded-[20px]'>
                <input v-model='formData.real_name' :placeholder="t('mine.certified.realName')"
                       class='flex-1 ml-[19px] input' type='text'>
            </view>
            <view class='bg-[#f5f7f9] mt-[20px] p-[28px] rounded-[20px]'>
                <input v-model='formData.id_number' :placeholder="t('mine.certified.idNumber')"
                       class='flex-1 ml-[19px] input' type='text'>
            </view>
            <view class='mt-[30px] text-center' @click='uploadFrontend'>
                <image :src='formData.front??"/static/images/real-upload.png"' class='mt-[22px] icon-upload'></image>
            </view>
            <view class='mt-[30px] text-center' @click='uploadBackend'>
                <image :src='formData.back??"/static/images/real-upload.png"' class='mt-[22px] icon-upload'></image>
            </view>
            <view class='mt-[98px] text-center'>
                <text class='text-[22px] sub-title'>
                    {{ t('mine.certified.cerTitle') }}
                </text>
            </view>
            <view class='mt-[30px] py-[24px] text-center bg-[#f5f7f9] rounded-[40px]'>
                <text class='text-[28px] font-bold sub-title'>{{ t('mine.certified.Submit') }}</text>
            </view>
        </view>
    </layout>
</template>

<script lang='ts' setup>
import { useI18n } from 'vue-i18n'
import { layoutDataKey } from '~/composables/provide'

const layoutData = ref({
    showTopBar: true,
    topBarBgColor: 'white',
    showTopBarBackBtn: true,
    topBarTitle: 'Certified',
})

const { t } = useI18n()

const formData = ref({
    front: null,
    back: null,
    real_name: null,
    id_number: null,
})

function uploadFrontend() {
    // 调用uniapp上传文件方法
    uni.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album'], // 从相册选择
        async success(res) {
            // 上传图片
            const { data, code } = await $api.uploadFile('/common/upload', res.tempFilePaths[0])
            if (code === 1)
                formData.front = data.url
            else
                showToast('Upload failed')
        },
    })
}

function uploadBackend() {
    // 调用uniapp上传文件方法
    uni.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album'], // 从相册选择
        async success(res) {
            // 上传图片
            const { data, code } = await $api.uploadFile('/common/upload', res.tempFilePaths[0])
            if (code === 1)
                formData.back = data.url
            else
                showToast('Upload failed')
        },
    })
}


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
