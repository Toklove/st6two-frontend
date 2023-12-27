<template>
    <div v-if="!layoutData.dataIsLoaded" mt="40%">
        <TnEmpty mode="data">
            <template #icon>
                <TnLoading show mode="flower" animation size="40px" />
            </template>
            <template #tips>
                <div mt-15px>{{ t('components.isEmpty.LoadingPleaseWait') }}...</div>
            </template>
        </TnEmpty>
    </div>
    <template v-else-if="!layoutData.hasData">
        <div mt-200px flex--c flex-auto flex-col @click="dataReload">
            <image :src="layoutData.emptySlotImg || defaultImg" h-470px w-470px />
            <div font-500 lh-44px text="32px #c39f35">
                {{ layoutData.emptySlotText || t('components.isEmpty.dataIsAvailable') }}
            </div>
            <div lh-44px text="26px #999">{{ t('components.isEmpty.ClickToRefresh') }}</div>
        </div>
        <slot />
    </template>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import defaultImg from '@/static/no-data.png'
import type { LayoutDataType } from '~/types'

defineOptions({
    name: 'IsEmpty',
    // #ifdef MP-WEIXIN
    options: {
        virtualHost: true,
    },
    // #endif
})
const { t } = useI18n()
const layoutData = inject(layoutDataKey, ref({} as LayoutDataType))
const dataReload = inject(dataReloadKey, () => {})
</script>
