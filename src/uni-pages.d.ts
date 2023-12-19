/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck
// Generated by vite-plugin-uni-pages

interface NavigateToOptions {
  url: "pages/tabbar/home" |
       "pages/common/forget" |
       "pages/common/login" |
       "pages/common/register" |
       "pages/mine/about" |
       "pages/mine/certified" |
       "pages/mine/changePassword" |
       "pages/mine/option" |
       "pages/mine/service" |
       "pages/mine/userInfo" |
       "pages/mine/wallet" |
       "pages/position/bill" |
       "pages/position/chart" |
       "pages/position/deposit" |
       "pages/position/withdraw" |
       "pages/tabbar/history" |
       "pages/tabbar/mine" |
       "pages/tabbar/position" |
       "pages/tabbar/quotes";
}
interface RedirectToOptions extends NavigateToOptions {}

interface SwitchTabOptions {
  url: "pages/tabbar/home" | "pages/tabbar/quotes" | "pages/tabbar/position" | "pages/tabbar/history" | "pages/tabbar/mine"
}

type ReLaunchOptions = NavigateToOptions | SwitchTabOptions;

declare interface Uni {
  navigateTo(options: UniNamespace.NavigateToOptions & NavigateToOptions): void;
  redirectTo(options: UniNamespace.RedirectToOptions & RedirectToOptions): void;
  switchTab(options: UniNamespace.SwitchTabOptions & SwitchTabOptions): void;
  reLaunch(options: UniNamespace.ReLaunchOptions & ReLaunchOptions): void;
}
