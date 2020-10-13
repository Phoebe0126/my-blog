import { http } from './http'

// 获取用户的首页信息
export const getShortUserInfo = () => http('/user/getShortInfo', 'GET')