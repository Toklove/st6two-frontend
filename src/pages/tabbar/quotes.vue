<template>
    <page-meta />
    <div class='init-top' />
    <layout class-name='IndexRouter'>
        <view class='px-[34px]'>
            <view class='flex items-center bg-[#f5f7f9] py-[31px] px-[30px] rounded-[50px]'>
                <image class='w-[35px] h-[38px] mr-[21px]' src='/static/images/icon-search.png'></image>
                <text class='text-[#525252] text-[28px]'>{{ t('tabBar.quotes.EnterTheContentHere') }}</text>
            </view>
            <view class='mt-[59px] relative'>
                <view class='flex items-center justify-between'>
                    <text class='text-[45px]'>{{ t('tabBar.quotes.Market') }}</text>
                    <view
                        class='flex items-center justify-between bg-black dropdown'
                        @click='showDropdown = !showDropdown'
                    >
                        <text class='text-[26px] text-white px-[10px]'>{{ form.category }}</text>
                        <image
                            :src="showDropdown ? '/static/images/icon-dropup.png' :'/static/images/icon-dropdown.png'"
                            class='w-[18px] h-[18px]'
                        ></image>
                    </view>
                </view>
                <view :class="showDropdown ?'h-auto' :'h-0'" class='dropdown-item bg-black text-white'>
                    <view v-for='(item, index) in categoryList' :key='index' class='item' @click='changeList(item)'>
                        <text class='text-[26px]'>{{ item.name }}</text>
                    </view>
                </view>

                <view v-if='loading' class='mt-[20px]'>
                    <FuiLoading :is-fixed='false' :loading='loading' type='row' />
                </view>

                <view v-else class='mt-[20px]'>
                    <view v-if='marketList.length > 0'>
                        <view
                            v-for='(item, index) in marketList' :key='index' class='stock-row items-center'
                            @click='toPage(`/pages/position/chart?pair=${item.symbol}`)'
                        >
                            <view class='flex'>
                                <image
                                    :src='item.logo'
                                    class='rounded-full w-[72px] h-[72px]'
                                ></image>
                                <view class='flex flex-col justify-between ml-[20px]'>
                                    <text class='text-[30px]'>{{ item.name }}</text>
                                    <text class='sub-title text-[22px]'>
                                        17:28:16
                                    </text>
                                </view>
                            </view>
                            <text class='text-[28px] text-right'>
                                1.27669
                            </text>
                            <view class='h-[68px] ml-[20px] rounded-[10px] grid place-items-center green-block'>
                                <text class='text-[22px] text-white'>-0.045</text>
                            </view>
                        </view>
                    </view>
                    <view v-else class='nodata'>
                        <fui-empty src='/static/images/option.png' title='暂无数据'></fui-empty>
                    </view>
                </view>
            </view>
        </view>
    </layout>
</template>

<script lang='ts' setup>
import { useI18n } from 'vue-i18n'
import FuiLoading from '~/components/firstui/fui-loading/fui-loading.vue'
import FuiEmpty from '~/components/firstui/fui-empty/fui-empty.vue'

function toPage(url) {
    uni.navigateTo({ url })
}

const loading = ref(false)

const { t } = useI18n()

const form = ref({
    category_id: 1,
    category: '外汇',
})

const categoryList = ref([])

const showDropdown = ref(false)
const marketList = ref([])

function getMarketByCategory() {
    loading.value = true
    $api.get(`/market/list?category_id=${form.value.category_id}`).then((res) => {
        marketList.value = res.data
        marketList.value.forEach(item => {
            item.logo = $api.staticUrl(item.logo)
        })
        loading.value = false
    })
}

function changeList(item) {
    form.value.category_id = item.id
    form.value.category = item.name
    showDropdown.value = false
    getMarketByCategory()
}


onLoad(() => {
    $api.get('/market/category').then((res) => {
        categoryList.value = res.data
        form.value.category_id = categoryList.value[0].id
        form.value.category = categoryList.value[0].name
        getMarketByCategory()
    })
})

</script>

<route lang='yaml'>
style:
navigationStyle: custom
</route>

<style lang='scss'>
.dropdown {
    min-width: 208px;
    height: 46px;
    padding: 0 20px;
    border-radius: 22px;
}

.dropdown-item {
    z-index: 99999;
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
