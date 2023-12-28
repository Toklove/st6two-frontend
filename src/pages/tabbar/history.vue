<template>
    <page-meta />
    <div class='init-top' />
    <layout class-name='IndexRouter'>
        <view class='px-[34px]'>
            <view class='text-[45px] font-bold'>歷史訂單</view>
            <view class='relative mt-[56px]'>
                <view
                    v-for='(item, index) in list'
                    :key='index'
                    :class="item.show_detail ? 'active-h' : 'active-l'"
                    class='relative flex flex-col rounded-[15px] row pt-[40px] px-[24px]'
                    @click='item.show_detail = !item.show_detail'
                >
                    <view class='flex flex-row'>
                        <image
                            class='rounded-full w-[72px] h-[72px]'
                            src='https://api.gomarketes.com/storage/products/MTQYoOCxnMQtPiXtP7Yx2yL9wikyYL1K5gc04VMD.png'
                        ></image>
                        <view class='flex-1 ml-[12px]'>
                            <view class='grid items-center col'>
                                <view class='flex items-center'>
                                    <text class='text-[30px]'>
                                        {{ item.market.name }}
                                    </text>
                                    <text class='lever ml-[14px] text-[20px]'>
                                        x100
                                    </text>
                                </view>
                                <text class='hands text-[22px] h-[32px] grid place-items-center text-center'>
                                    0.01
                                </text>
                                <text class='text-[28px] text-right text-red'>-6.61</text>
                            </view>
                            <view class='flex mt-[20px] items-center justify-between'>
                                <view class='flex items-center text-[22px]'>
                                    <text>1.49611 -</text>
                                    <text class='red-text'>> 1.4896</text>
                                </view>
                                <view class='font-bold text-[22px]'>买入</view>
                            </view>
                        </view>
                    </view>
                    <view class='stock-data mt-[40px] border-[#dadada] text-[#8c8c8c] pt-[26px] text-[22px]'>
                        <view class='flex items-center justify-between'>
                            <view class='flex items-center justify-between flex-1'>
                                <text>止盈</text>
                                <text class='text-black'>5.49627</text>
                            </view>
                            <view class='flex items-center justify-between ml-[50px] flex-1'>
                                <text>手續費</text>
                                <text class='text-black'>0.1</text>
                            </view>
                        </view>
                        <view class='flex items-center justify-between mt-[12px]'>
                            <view class='flex items-center justify-between flex-1'>
                                <text>止损</text>
                                <text class='text-black'>5.49627</text>
                            </view>
                            <view class='flex items-center justify-between ml-[50px] flex-1'>
                                <text>保证金</text>
                                <text class='text-black'>0.1</text>
                            </view>
                        </view>
                        <view class='flex flex-col mt-[24px]'>
                            <view class='flex items-center justify-between'>
                                <text>訂單號</text>
                                <text>20231228120045680012ETH267680</text>
                            </view>
                            <view class='flex items-center justify-between mt-[12px]'>
                                <text>下單時間</text>
                                <text>20231228120045680012ETH267680</text>
                            </view>
                            <view class='flex items-center justify-between mt-[12px]'>
                                <text>關閉時間</text>
                                <text>20231228120045680012ETH267680</text>
                            </view>
                            <view class='flex items-center justify-between mt-[12px]'>
                                <text>平倉類型</text>
                                <text>手動</text>
                            </view>
                        </view>
                    </view>
                    <image
                        :src="item.show_detail ? '/static/images/icon-shangla.png' : '/static/images/icon-xiala.png'"
                        class='absolute left-[50%] bottom-[16px] cursor-pointer w-[18px] h-[18px]'
                        style='transform: translateX(-50%);'
                    ></image>
                </view>
            </view>
        </view>
    </layout>
</template>

<script setup>
const list = ref([])

//分页参数
const page = ref({
    page: 1,
    max: 1,
})


//上拉加载更多数据
function loadMore() {
    if (page.value.page >= page.value.max) {
        uni.showToast({
            title: '沒有更多數據了',
            icon: 'none',
        })
        return
    }
    page.value.page++
    getHistory()
}

onReachBottom(() => {
    loadMore()
})

function getHistory() {
    $api.get('/market/contract_order_history', page.value).then((res) => {
        console.log(res)
        page.value.max = res.data.last_page
        let data = res.data.data.map((item) => {
            item.show_detail = false
            return item
        })
        console.log(data)
        if (page.value.page === 1) {
            list.value = data
        } else {
            list.value = list.value.concat(data)
        }
    })
}

onLoad(() => {
    getHistory()
})

</script>

<route lang='yaml'>
style:
navigationStyle: custom
</route>

<style>
.row {
    width: 100%;
    height: 162px;
    margin-top: 10px;
    background: url(/static/images/bg-history.png) no-repeat;
    background-size: 100%;
    box-sizing: border-box;
    overflow-y: hidden;

    .col {
        grid-template-columns: auto 150px 150px;

        .lever {
            color: #3a7ff6;
        }

        .hands {
            width: 120px;
            text-align: center;
            background: #c3e6ff;
            border-radius: 14px;
        }
    }
}

.active-l {
    height: 162px;
    transition: .5s linear;
}

.active-h {
    height: 468px;
    transition: .5s linear;
}

.stock-data {

}
</style>
