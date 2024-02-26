<template>
    <page-meta />
    <div class="init-top" />
    <layout class-name="IndexRouter">
        <view id="main">
            <h1>IBKR（盈透证券）</h1>
            <p>IBKR（盈透证券）是一家知名的在线证券经纪商，提供多种金融产品和服务。</p>

            <h2>公司简介</h2>
            <p>IBKR成立于1978年，总部位于美国康涅狄格州。公司提供股票、期权、期货、外汇等投资产品的交易服务。</p>

            <h2>核心优势</h2>
            <ul>
                <li>全球市场覆盖广泛</li>
                <li>先进的交易平台和工具</li>
                <li>低手续费和优惠条件</li>
                <li>丰富的研究与分析资源</li>
            </ul>

            <h2>关于我们</h2>
            <p>
                IBKR致力于为客户提供全面的金融交易解决方案，以及专业的投资咨询和支持。我们的使命是帮助客户实现他们的投资目标，同时提供高效、可靠的交易执行和卓越的客户服务。</p>
        </view>
    </layout>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { layoutDataKey } from '~/composables/provide'

const { t } = useI18n()
const layoutData = ref({
    showTopBar: true,
    topBarBgColor: 'white',
    showTopBarBackBtn: true,
    topBarTitle: t('mine.about.AboutUs'),
})

provide(layoutDataKey, layoutData)
</script>

<route lang="yaml">
style:
navigationStyle: custom
</route>

<style>
#main {
    font-family: Arial, sans-serif;
    line-height: 1.6;
    padding: 20px;
}

h1, h2 {
    color: #0047ab;
    text-align: center;
}

p {
    color: #333;
}

ul {
    color: #333;
    list-style-type: none;
    padding-left: 0;
}

a {
    color: #0066cc;
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}
</style>
