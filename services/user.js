import http from '@/http/request.js';

// 发送验证码
export const sendCode = (data) => {
	return http.post('/v1/auth/send-captcha', data);
}

// 登录
export const login = (data) => {
	return http.post('/v1/auth/login', data);
}

// 找回密码
export const resetPwd = (data) => {
	return http.post('/v1/auth/retrieve', data);
}