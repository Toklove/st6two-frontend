<template>
    <div :class='`${className}`' class='wrap'>
        <!--        APP PLUS中增加头部安全区域以适配全面屏手机 -->
        <!-- #ifdef APP-PLUS -->
        <div class='safe-area-inset-top' />
        <!-- #endif -->

        <!-- 导航条:开始 -->

        <FuiNavBar
            v-if='layoutData.showTopBar' :background='layoutData.topBarBgColor' :class='layoutData.className'
            :title='layoutData.topBarTitle' @left-click='clickBack'
        >
            <FuiIcon v-if='layoutData.showTopBarBackBtn' :color='layoutData.backIconColor' name='arrowleft'
                     @click='clickBack'></FuiIcon>
        </FuiNavBar>

        <!-- 导航条:结束 -->
        <!-- 不显示导航条时占位:开始 -->
        <div
            v-else-if='layoutData.showTopBarPlaceholder' :style='`height:${navBarInfo}px`'
            class='top-bar-placeholder'
        />
        <!-- 不显示导航条时占位:结束 -->
        <!-- 空白页面之上的插槽:开始 -->
        <div class='header-slot flex-none'>
            <slot name='header-slot' />
        </div>
        <!-- 空白页面之上的插槽:结束 -->
        <!-- 空白页面:开始 -->
        <is-empty v-if='layoutData.showEmptySlot'>
            <slot name='empty-slot' />
        </is-empty>
        <!-- 空白页面:结束 -->
        <!-- 页面主体:开始 -->
        <div v-else class='layout-body flex-auto py-24px'>
            <slot />
        </div>
        <!-- 页面主体:结束 -->
    </div>
</template>

<script lang='ts' setup>
import type { LayoutDataType } from '~/types'
import FuiNavBar from '~/components/firstui/fui-nav-bar/fui-nav-bar.vue'
import FuiIcon from '~/components/firstui/fui-icon/fui-icon.vue'

defineOptions({
    name: 'Layout',
    // #ifdef MP-WEIXIN
    options: {
        virtualHost: true,
    },
    // #endif
})

defineProps<{
    className: string
}>()

let safeAreaInsetRight = $ref(false)
// #ifdef MP-WEIXIN
safeAreaInsetRight = true
// #endif

const layoutData = inject(layoutDataKey, ref({} as LayoutDataType))

watch(layoutData, (val) => {
    console.log(val)
}, {
    deep: true,
    immediate: true,
})

function clickBack() {
    uni.navigateBack()
}
</script>

<style>
.safe-area-inset-top {
    height: 88px;
    background-color: #fff;
}
</style>
