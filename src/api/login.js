import { http } from './http'

// 注册用户信息
export const postUserInfo = data => http('/signup', 'POST', data)

// 用户登录
export const login = data => http('/signin', 'POST', data)