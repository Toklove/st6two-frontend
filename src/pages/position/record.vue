<template>
    <page-meta />
    <div class="init-top" />
    <layout class-name="IndexRouter">
        <FuiNavBar custom>
            <view class="flex justify-center relative items-center flex-1">
                <view class="absolute left-0">
                    <FuiIcon name="arrowleft" @click="clickBack"></FuiIcon>
                </view>
                <USubsection v-model="current" :list="subList()" active-color="white" button-color="#3640f0"
                    class="w-[350px]" rounded @change="change"></USubsection>
            </view>
        </FuiNavBar>
        <view class="mt-[20px] mx-[34px]">
            
            <view v-if="!loading">
                <view v-if="list.length > 0">
                <view v-for="item in list" :key="item.id" class="card flex items-center justify-between bg-[#f5f7f9]">
                    <view class="text-[28px]">
                        <view class="">${{ item.amount }}</view>
                        <view class="text-[22px] mt-[20px]">{{ item.created_at }}</view>
                    </view>
                    <view>
                        <text :class="item.status === 0 ? '' : (item.status === 1 ? 'green-text' : 'red-text')"
                            class="text-[28px]">
                            {{ item.status === 0 ? t('position.record.wait') : (item.status === 1 ?
                                t('position.record.pass') : t('position.record.fail'))
                            }}
                        </text>
                    </view>
                </view>
                
            </view>
            <view v-else class="nodata">
                <image class="w-[340px] h-[340px]" src="/static/images/option.png"></image>
            </view>
            </view>
            <view v-else >
                <view class='relative h-[140px] rounded-[30px] flex items-center justify-between bg-[#f5f7f9]'>
                    <fui-skeleton :preloadList='record.market' outerClass='market-skeleton'></fui-skeleton>
                </view>
                </view>
        </view>
    </layout>
</template>

<script lang='ts' setup>
import { useI18n } from 'vue-i18n'
import FuiNavBar from '~/components/firstui/fui-nav-bar/fui-nav-bar.vue'
import FuiIcon from '~/components/firstui/fui-icon/fui-icon.vue'
import USubsection from '~/components/toklove/sub-section/sub-section.vue'
import record from '~/skeleton/position/record.js'
function clickBack() {
    $api.back()
}

const { t } = useI18n()

function subList() {
    return [
        {
            name: t('position.record.deposit'),
        },
        {
            name: t('position.record.withdraw'),
        },
    ]
}

const list = ref([])
const loading = ref(false)

// 分页参数
const page = ref({
    page: 1,
    max: 1,
    type: 0,
})

function change(e) {
    console.log(e)
    loading.value = true
    page.value.type = e
    page.value.page = 1
    getHistory()
}

function showToast(message) {
    uni.showToast({
        title: message,
        icon: 'none',
    })
}

// 上拉加载更多数据
function loadMore() {
    if (page.value.page >= page.value.max) {
        showToast(t('tabBar.position.NoMoreData'))
        return
    }
    page.value.page++
    getHistory()
}

onReachBottom(() => {
    loadMore()
})

function getHistory() {
    $api.get('/wallet/record', page.value).then((res) => {
        page.value.max = res.data.last_page
        const data = res.data.data.map((item) => {
            return item
        })
        if (page.value.page === 1)
            list.value = data
        else
            list.value = list.value.concat(data)
        loading.value = false
    })
}

onLoad(() => {
    getHistory()
})

const current = ref(0)
</script>

<route lang='yaml'>
style:
navigationStyle: custom
</route>

<style lang='scss' scoped>
.card {
    margin-bottom: 14px;
    padding: 36px 30px;
    //background-color: #fff;
    border-radius: 30px;
}

.sub-title {
    color: #8c8c8c !important;
}

.nodata {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>
