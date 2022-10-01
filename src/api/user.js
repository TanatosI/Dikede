import request from '@/utils/request'

// 验证码验证
export function randomAPI(prove) {
  return request({
    url: `/api/user-service/user/imageCode/${prove}`,
    method: 'GET',
    responseType: 'blob'
  })
}

// 用户登录验证
export function loginAPI(data) {
  return request({
    url: '/api/user-service/user/login',
    method: 'POST',
    data
  })
}
