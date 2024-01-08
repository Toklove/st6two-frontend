import { defineStore } from 'pinia'
import type { UserData, UserInfo } from '~/pages/user.types'

interface State {
    userInfo: Nullable<UserInfo>
}

export const useUserStore = defineStore('userInfo', () => {
    const lsUserInfo = ls.get<UserInfo>('user-info') || {}
    const state: State = reactive({
        userInfo: lsUserInfo,
    })

    async function getUserInfo() {
        const { code, data } = await $api.get<UserData>('/auth/me', {})
        if (code === 1 && data) {
            state.userInfo = data
            ls.set('user-info', data)
        }
    }

    function getAvatar() {
        return $api.staticUrl(state.userInfo?.avatar || '')
    }

    function saveUserInfo() {
        ls.set('user-info', state.userInfo)
    }

    return {
        ...toRefs(state),
        getUserInfo, saveUserInfo, getAvatar,
    }
})
