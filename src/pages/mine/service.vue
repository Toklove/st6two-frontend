<template>
    <page-meta />
    <div class="init-top" />
    <layout class-name="IndexRouter">
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
    topBarTitle: t('mine.service.CustomerService'),
})

provide(layoutDataKey, layoutData)
</script>

<route lang="yaml">
style:
navigationStyle: custom
</route>

<style>
.chat {
    width: 100%;
    height: 100%;
    min-height: 0px;
    min-width: 0px;
    margin: 0px;
    padding: 0px;
    background-image: none;
    background-position: 0% 0%;
    background-size: initial;
    background-attachment: scroll;
    background-origin: initial;
    background-clip: initial;
    background-color: rgba(0, 0, 0, 0);
    border-width: 0px;
    float: none;
    color-scheme: normal;
    position: absolute;
    inset: 0px;
    transition: none 0s ease 0s !important;
    display: block;
}
</style>
