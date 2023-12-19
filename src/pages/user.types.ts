export interface UserInfo {
    /** 用户ID */
    id: number
    /** 邮箱（隐藏显示） */
    email: string
    /** 用户昵称 */
    nickname: string
    /** 头像 */
    avatar: number
    /** 性别 */
    gender: string
    /** 默认收货地址ID */
    address_id: number
    /** 账户余额 */
    balance: string
    /** 可用积分 */
    points: number
    /** 用户总支付的金额 */
    pay_money: string
    /** 实际消费的金额(不含退款) */
    expend_money: string
    /** 会员等级ID */
    grade_id: number
    /** 注册来源客户端 (APP、H5、小程序等) */
    platform: string
    /** 最后登录时间 */
    last_login_time: number
    /** 邀请码 */
    invite_code: string
    /** 会员等级信息 */
    grade: Obj
}

/** 当前用户详情 */
export interface UserData {
    userInfo: UserInfo
}
