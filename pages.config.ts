import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages'

export default defineUniPages({
    easycom: {
        autoscan: true,
        custom: {
            '^uni-(.*)': '@dcloudio/uni-ui/lib/uni-$1/uni-$1.vue',
            'fui-(.*)': '@/components/firstui/fui-$1/fui-$1.vue',
        },
    },
    pages: [],
    globalStyle: {
        'navigationBarTitleText': 'ST6',
        'navigationBarBackgroundColor': '@navBgColor',
        'navigationBarTextStyle': '@navTxtStyle',
        'backgroundColor': '@bgColor',
        'backgroundTextStyle': '@bgTxtStyle',
        'backgroundColorTop': '@bgColorTop',
        'backgroundColorBottom': '@bgColorBottom',
        'app-plus': {
            titleNView: false, // 移除 H5、APP 顶部导航
            animationType: 'slide-in-right',
            animationDuration: 300,
        },
        // rpx 计算所支持的最大设备宽度，单位 px
        'rpxCalcMaxDeviceWidth': 750,
        // rpx 计算使用的基准设备宽度，设备实际宽度超出 rpx 计算所支持的最大设备宽度时将按基准宽度计算，单位 px
        'rpxCalcBaseDeviceWidth': 540,
    },
    tabBar: {
        color: '#A6A6A6',
        selectedColor: '#333333',
        backgroundColor: '#ffffff',
        borderStyle: 'black',
        iconWidth: '30px',
        list: [
            {
                pagePath: 'pages/tabbar/home',
                iconPath: 'static/tabbar/home-unselect.png',
                selectedIconPath: 'static/tabbar/home-select.png',
            },
            {
                pagePath: 'pages/tabbar/quotes',
                iconPath: 'static/tabbar/quotes-unselect.png',
                selectedIconPath: 'static/tabbar/quotes-select.png',
            },
            {
                pagePath: 'pages/tabbar/position',
                iconPath: 'static/tabbar/position-unselect.png',
                selectedIconPath: 'static/tabbar/position-select.png',
            },
            {
                pagePath: 'pages/tabbar/history',
                iconPath: 'static/tabbar/history-unselect.png',
                selectedIconPath: 'static/tabbar/history-select.png',
            },
            {
                pagePath: 'pages/tabbar/mine',
                iconPath: 'static/tabbar/mine-unselect.png',
                selectedIconPath: 'static/tabbar/mine-select.png',
            },
        ],
    },
})
