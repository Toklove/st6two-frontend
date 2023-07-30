import '@vue/runtime-core'

export {}

declare module '@vue/runtime-core' {
    // GlobalComponents for Volar
    export interface GlobalComponents {
        NutActionSheet: typeof import('../node_modules/uniapp-nutui/components/actionsheet/actionsheet.vue')['default']
        NutAddress: typeof import('../node_modules/uniapp-nutui/components/address/address.vue')['default']
        NutAddressList: typeof import('../node_modules/uniapp-nutui/components/addresslist/addresslist.vue')['default']
        NutAnimate: typeof import('../node_modules/uniapp-nutui/components/animate/animate.vue')['default']
        NutAvatar: typeof import('../node_modules/uniapp-nutui/components/avatar/avatar.vue')['default']
        NutAvatarGroup: typeof import('../node_modules/uniapp-nutui/components/avatargroup/avatargroup.vue')['default']
        NutBacktop: typeof import('../node_modules/uniapp-nutui/components/backtop/backtop.vue')['default']
        NutBadge: typeof import('../node_modules/uniapp-nutui/components/badge/badge.vue')['default']
        NutBarrage: typeof import('../node_modules/uniapp-nutui/components/barrage/barrage.vue')['default']
        NutButton: typeof import('../node_modules/uniapp-nutui/components/button/button.vue')['default']
        NutCalendar: typeof import('../node_modules/uniapp-nutui/components/calendar/calendar.vue')['default']
        NutCard: typeof import('../node_modules/uniapp-nutui/components/card/card.vue')['default']
        NutCascader: typeof import('../node_modules/uniapp-nutui/components/cascader/cascader.vue')['default']
        NutCategory: typeof import('../node_modules/uniapp-nutui/components/category/category.vue')['default']
        NutCategoryPane: typeof import('../node_modules/uniapp-nutui/components/categorypane/categorypane.vue')['default']
        NutCell: typeof import('../node_modules/uniapp-nutui/components/cell/cell.vue')['default']
        NutCellGroup: typeof import('../node_modules/uniapp-nutui/components/cellgroup/cellgroup.vue')['default']
        NutCheckbox: typeof import('../node_modules/uniapp-nutui/components/checkbox/checkbox.vue')['default']
        NutCheckboxGroup: typeof import('../node_modules/uniapp-nutui/components/checkboxgroup/checkboxgroup.vue')['default']
        NutCircleProgress: typeof import('../node_modules/uniapp-nutui/components/circleprogress/circleprogress.vue')['default']
        NutCol: typeof import('../node_modules/uniapp-nutui/components/col/col.vue')['default']
        NutCollapse: typeof import('../node_modules/uniapp-nutui/components/collapse/collapse.vue')['default']
        NutCollapseItem: typeof import('../node_modules/uniapp-nutui/components/collapseitem/collapseitem.vue')['default']
        NutComment: typeof import('../node_modules/uniapp-nutui/components/comment/comment.vue')['default']
        NutConfigProvider: typeof import('../node_modules/uniapp-nutui/components/configprovider/configprovider.vue')['default']
        NutCountdown: typeof import('../node_modules/uniapp-nutui/components/countdown/countdown.vue')['default']
        NutCountup: typeof import('../node_modules/uniapp-nutui/components/countup/countup.vue')['default']
        NutDatePicker: typeof import('../node_modules/uniapp-nutui/components/datepicker/datepicker.vue')['default']
        NutDialog: typeof import('../node_modules/uniapp-nutui/components/dialog/dialog.vue')['default']
        NutDivider: typeof import('../node_modules/uniapp-nutui/components/divider/divider.vue')['default']
        NutDrag: typeof import('../node_modules/uniapp-nutui/components/drag/drag.vue')['default']
        NutEcard: typeof import('../node_modules/uniapp-nutui/components/ecard/ecard.vue')['default']
        NutElevator: typeof import('../node_modules/uniapp-nutui/components/elevator/elevator.vue')['default']
        NutEllipsis: typeof import('../node_modules/uniapp-nutui/components/ellipsis/ellipsis.vue')['default']
        NutEmpty: typeof import('../node_modules/uniapp-nutui/components/empty/empty.vue')['default']
        NutFixedNav: typeof import('../node_modules/uniapp-nutui/components/fixednav/fixednav.vue')['default']
        NutForm: typeof import('../node_modules/uniapp-nutui/components/form/form.vue')['default']
        NutFormItem: typeof import('../node_modules/uniapp-nutui/components/formitem/formitem.vue')['default']
        NutGrid: typeof import('../node_modules/uniapp-nutui/components/grid/grid.vue')['default']
        NutGridItem: typeof import('../node_modules/uniapp-nutui/components/griditem/griditem.vue')['default']
        NutIcon: typeof import('../node_modules/uniapp-nutui/components/icon/icon.vue')['default']
        NutImagePreview: typeof import('../node_modules/uniapp-nutui/components/imagepreview/imagepreview.vue')['default']
        NutIndicator: typeof import('../node_modules/uniapp-nutui/components/indicator/indicator.vue')['default']
        NutInfiniteloading: typeof import('../node_modules/uniapp-nutui/components/infiniteloading/infiniteloading.vue')['default']
        NutInput: typeof import('../node_modules/uniapp-nutui/components/input/input.vue')['default']
        NutInputNumber: typeof import('../node_modules/uniapp-nutui/components/inputnumber/inputnumber.vue')['default']
        NutInvoice: typeof import('../node_modules/uniapp-nutui/components/invoice/invoice.vue')['default']
        NutList: typeof import('../node_modules/uniapp-nutui/components/list/list.vue')['default']
        NutMenu: typeof import('../node_modules/uniapp-nutui/components/menu/menu.vue')['default']
        NutMenuItem: typeof import('../node_modules/uniapp-nutui/components/menuitem/menuitem.vue')['default']
        NutNavbar: typeof import('../node_modules/uniapp-nutui/components/navbar/navbar.vue')['default']
        NutNoticebar: typeof import('../node_modules/uniapp-nutui/components/noticebar/noticebar.vue')['default']
        NutNotify: typeof import('../node_modules/uniapp-nutui/components/notify/notify.vue')['default']
        NutNumberKeyboard: typeof import('../node_modules/uniapp-nutui/components/numberkeyboard/numberkeyboard.vue')['default']
        NutOverlay: typeof import('../node_modules/uniapp-nutui/components/overlay/overlay.vue')['default']
        NutPagination: typeof import('../node_modules/uniapp-nutui/components/pagination/pagination.vue')['default']
        NutPicker: typeof import('../node_modules/uniapp-nutui/components/picker/picker.vue')['default']
        NutPopover: typeof import('../node_modules/uniapp-nutui/components/popover/popover.vue')['default']
        NutPopup: typeof import('../node_modules/uniapp-nutui/components/popup/popup.vue')['default']
        NutPrice: typeof import('../node_modules/uniapp-nutui/components/price/price.vue')['default']
        NutProgress: typeof import('../node_modules/uniapp-nutui/components/progress/progress.vue')['default']
        NutRadio: typeof import('../node_modules/uniapp-nutui/components/radio/radio.vue')['default']
        NutRadioGroup: typeof import('../node_modules/uniapp-nutui/components/radiogroup/radiogroup.vue')['default']
        NutRange: typeof import('../node_modules/uniapp-nutui/components/range/range.vue')['default']
        NutRate: typeof import('../node_modules/uniapp-nutui/components/rate/rate.vue')['default']
        NutRow: typeof import('../node_modules/uniapp-nutui/components/row/row.vue')['default']
        NutSearchbar: typeof import('../node_modules/uniapp-nutui/components/searchbar/searchbar.vue')['default']
        NutShortPassword: typeof import('../node_modules/uniapp-nutui/components/shortpassword/shortpassword.vue')['default']
        NutSideNavbar: typeof import('../node_modules/uniapp-nutui/components/sidenavbar/sidenavbar.vue')['default']
        NutSideNavbarItem: typeof import('../node_modules/uniapp-nutui/components/sidenavbaritem/sidenavbaritem.vue')['default']
        NutSignature: typeof import('../node_modules/uniapp-nutui/components/signature/signature.vue')['default']
        NutSkeleton: typeof import('../node_modules/uniapp-nutui/components/skeleton/skeleton.vue')['default']
        NutSku: typeof import('../node_modules/uniapp-nutui/components/sku/sku.vue')['default']
        NutSkuHeader: typeof import('../node_modules/uniapp-nutui/components/skuheader/skuheader.vue')['default']
        NutSkuOperate: typeof import('../node_modules/uniapp-nutui/components/skuoperate/skuoperate.vue')['default']
        NutStep: typeof import('../node_modules/uniapp-nutui/components/step/step.vue')['default']
        NutSteps: typeof import('../node_modules/uniapp-nutui/components/steps/steps.vue')['default']
        NutSticky: typeof import('../node_modules/uniapp-nutui/components/sticky/sticky.vue')['default']
        NutSubSideNavbar: typeof import('../node_modules/uniapp-nutui/components/subsidenavbar/subsidenavbar.vue')['default']
        NutSwipe: typeof import('../node_modules/uniapp-nutui/components/swipe/swipe.vue')['default']
        NutSwiper: typeof import('../node_modules/uniapp-nutui/components/swiper/swiper.vue')['default']
        NutSwiperItem: typeof import('../node_modules/uniapp-nutui/components/swiperitem/swiperitem.vue')['default']
        NutSwitch: typeof import('../node_modules/uniapp-nutui/components/switch/switch.vue')['default']
        NutTabbar: typeof import('../node_modules/uniapp-nutui/components/tabbar/tabbar.vue')['default']
        NutTabbarItem: typeof import('../node_modules/uniapp-nutui/components/tabbaritem/tabbaritem.vue')['default']
        NutTable: typeof import('../node_modules/uniapp-nutui/components/table/table.vue')['default']
        NutTabPane: typeof import('../node_modules/uniapp-nutui/components/tabpane/tabpane.vue')['default']
        NutTabs: typeof import('../node_modules/uniapp-nutui/components/tabs/tabs.vue')['default']
        NutTag: typeof import('../node_modules/uniapp-nutui/components/tag/tag.vue')['default']
        NutTextarea: typeof import('../node_modules/uniapp-nutui/components/textarea/textarea.vue')['default']
        NutTimeDetail: typeof import('../node_modules/uniapp-nutui/components/timedetail/timedetail.vue')['default']
        NutTimePannel: typeof import('../node_modules/uniapp-nutui/components/timepannel/timepannel.vue')['default']
        NutTimeSelect: typeof import('../node_modules/uniapp-nutui/components/timeselect/timeselect.vue')['default']
        NutToast: typeof import('../node_modules/uniapp-nutui/components/toast/toast.vue')['default']
        NutTour: typeof import('../node_modules/uniapp-nutui/components/tour/tour.vue')['default']
        NutTransition: typeof import('../node_modules/uniapp-nutui/components/transition/transition.vue')['default']
        NutTrendArrow: typeof import('../node_modules/uniapp-nutui/components/trendarrow/trendarrow.vue')['default']
        NutUploader: typeof import('../node_modules/uniapp-nutui/components/uploader/uploader.vue')['default']
        NutWatermark: typeof import('../node_modules/uniapp-nutui/components/watermark/watermark.vue')['default']
        NutCodeInput: typeof import('../node_modules/uniapp-nutui/components/codeinput/codeinput.vue')['default']
        NutDollMachine: typeof import('../node_modules/uniapp-nutui/components/dollmachine/dollmachine.vue')['default']
        NutGiftBox: typeof import('../node_modules/uniapp-nutui/components/giftbox/giftbox.vue')['default']
        NutHitEggs: typeof import('../node_modules/uniapp-nutui/components/hiteggs/hiteggs.vue')['default']
        NutMarquee: typeof import('../node_modules/uniapp-nutui/components/marquee/marquee.vue')['default']
        NutShakeDice: typeof import('../node_modules/uniapp-nutui/components/shakedice/shakedice.vue')['default']
        NutTurnTable: typeof import('../node_modules/uniapp-nutui/components/turntable/turntable.vue')['default']
        NutLoadingPage: typeof import('../node_modules/uniapp-nutui/components/loadingpage/loadingpage.vue')['default']
    }

    // interface ComponentCustomProperties {}
}