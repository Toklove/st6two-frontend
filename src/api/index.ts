import type { AxiosAdapter, AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'
import { uniAdapter } from 'fant-axios-adapter'

const headers = {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
}

const baseConfig = {
    headers,
    timeout: 5000,
    withCredentials: false,
}

if (import.meta.env.VITE_APP_ENV === 'production')
    baseConfig.timeout = 300000

axios.defaults.adapter = uniAdapter as AxiosAdapter

// #ifdef H5
axios.defaults.baseURL = import.meta.env.VITE_APP_API
// #endif
// #ifndef H5
axios.defaults.baseURL = import.meta.env.VITE_APP_MP_API
// #endif

axios.interceptors.request.use(
    config => config,
    error => Promise.resolve(error.response || error),
)

axios.interceptors.response.use(
    response => response,
    error => Promise.resolve(error.response || error),
)

function checkStatus(response: AxiosResponse): ResponseData<any> {
    if (response && (response.status === 200 || response.status === 304))
        return response.data

    return {
        status: response.status || -404,
        code: -404,
        info: response.statusText || response.toString(),
        data: response.statusText || response.toString(),
        message: `接口返回数据错误, 错误代码: ${response.status}`,
    }
}

function checkCodeFn(data: ResponseData<any>) {
    const code = [200, 1000, 1]
    console.log('checkCodeFn', data)
    if (data.status === 401 || data.code === 401) {
        uni.showModal({
            title: 'Tips',
            content: '当前未登录或者登录超时, 请重新登陆',
            success: () => {
                //

                ls.del('token')
                uni.navigateTo({ url: '/pages/common/login' })
            },
        })
    } else if (!code.includes(Number(data.status)) && !code.includes(Number(data.code))) {
        showToast(data.message)
    } else {
        data.code = 1
        data.status = 1
    }
    return {
        ...data,
        code: data.code || data.status,
        status: data.status || data.code,
    }
}

/**
 * axios Api 封装
 * ```
 get<T>(url: string, params?: Obj, header?: Obj, checkCode?: boolean): Promise<ResponseData<T>>
 post<T>(url: string, data: Obj = {}, header: Obj = {}, checkCode?: boolean): Promise<ResponseData<T>>
 put<T>(url: string, data: Obj = {}, header: Obj = {}, checkCode?: boolean): Promise<ResponseData<T>>
 delete<T>(url: string, data: Obj = {}, header: Obj = {}, checkCode?: boolean): Promise<ResponseData<T>>
 * ```
 */
export const $api: ApiType = {
    post(url: string, data: Obj = {}, header: Obj = {}, checkCode = true) {
        return this.RESTful(url, 'post', data, header, checkCode)
    },
    get(url: string, data: Obj = {}, header: Obj = {}, checkCode = true) {
        return this.RESTful(url, 'get', data, header, checkCode)
    },
    put(url: string, data: Obj = {}, header: Obj = {}, checkCode = true) {
        return this.RESTful(url, 'put', data, header, checkCode)
    },
    delete(url: string, data: Obj = {}, header: Obj = {}, checkCode = true) {
        return this.RESTful(url, 'delete', data, header, checkCode)
    },
    staticUrl(url: string) {
        return `${import.meta.env.VITE_APP_API_DOMAIN}/storage/${url}`
    },
    back(defaultBackUrl) {
        if (getCurrentPages().length > 1) {
            uni.navigateBack()
        } else {
            // #ifdef H5
            history.back()
            // #endif
            // #ifndef H5
            if (defaultBackUrl) {
                uni.redirectTo({
                    url: defaultBackUrl,
                })
            } else {
                const backTabbarUrl = '/pages/tabbar/home'
                if (backTabbarUrl) {
                    uni.reLaunch({
                        url: backTabbarUrl,
                    })
                }
            }
            // #endif
        }
    },
    // 封装上传文件函数
    async uploadFile(url, filePath = '', name = 'files', header = {}) {
        const token = ls.get('token') || ''
        return new Promise((resolve, reject) => {
            uni.uploadFile({
                url: import.meta.env.VITE_APP_API + url,
                name,
                filePath,
                header: {
                    ...header,
                    Authorization: `Bearer ${token}`,
                },
                success: (res) => {
                    // 返回的是字符串，需要转换成对象
                    resolve(JSON.parse(res.data))
                },
                fail: (err) => {
                    reject(err)
                },
            })
        })
    },
    async downFile(url, method = 'get', data) {
        const config: AxiosRequestConfig = {
            ...baseConfig,
            responseType: 'arraybuffer',
            method,
            url: import.meta.env.VITE_APP_API + url,
        }
        if (method === 'get')
            config.params = data
        else
            config.data = data

        if (url.includes('NoTimeout'))
            config.timeout = 9999999
        const response = await axios(config)
        return response
    },

    async RESTful(url, method = 'get', data, header, checkCode) {
        const xhr = await this.$RESTful(url, method, data, header)
        if (checkCode)
            return checkCodeFn(xhr)
        return {
            ...xhr,
            code: xhr.code || xhr.status,
            status: xhr.status || xhr.code,
        }
    },
    async $RESTful(url, method = 'get', data, header) {
        const token = ls.get('token') || ''
        const config: AxiosRequestConfig = {
            ...baseConfig,
            headers: {
                ...baseConfig.headers,
                ...header,
                Authorization: `Bearer ${token}`,
                lang: ls.get('lang') || 'en',
            },
            method,
            url,
        }

        if (method === 'get')
            config.params = data
        else
            config.data = data

        if (url.includes('NoTimeout'))
            config.timeout = 9999999
        const response = await axios(config)
        return checkStatus(response)
    },
}
// #ifdef H5
window.axios = axios
window.$$api = $api
// #endif
