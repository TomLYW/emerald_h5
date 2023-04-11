import http from '@/http/request.js';

// 发送验证码
export const sendCode = (data) => {
	return http.post('/v1/auth/send-captcha', data);
}
