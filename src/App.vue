<script lang='ts' setup>
onLaunch(async () => {
    const userStore = useUserStore()
    const token = ls.get<string>('token') || ''
    if (token)
        await userStore.getUserInfo()
})
</script>

<style lang='scss'>
@import '@tuniao/tn-style/dist/uniapp/index.css';
@import 'wot-design-uni/components/common/abstracts/variable.scss';
@import './assets/scss/style.scss';

/* Define a fade in animation */
@keyframes fadeIn {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

/* Apply the fade in animation to all pages */
.uni-page {
    animation: fadeIn 0.3s;
}
</style>
