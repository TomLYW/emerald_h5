import http from '@/http/request.js';
import config from '@/http/config.js';

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

// 设置支付密码
export const setPayPassword = (data) => {
	return http.post('/v1/user/set-pin', data);
}

// 绑定邮箱
export const bindEmail = (data) => {
	return http.post('/v1/user/bind-email', data);
}

// 修改支付密码
export const changePayPassword = (data) => {
	return http.post('/v1/user/update-pin', data);
}

// 修改昵称
export const modifyNickname = (data) => {
	return http.post('/v1/user/update-nickname', data);
}

// 绑定谷歌验证
export const setGoogleSecret = (data) => {
	return http.post('/v1/user/set-google-secret', data);
}

// 获取谷歌验证
export const getGoogleSecret = (data) => {
	return http.get('/v1/user/google-secret', data);
}


// 修改头像
export const updateAvatar = (data) => {
	return http.post('/v1/user/update-avatar', data);
}


/*上传图片*/
export const uploadImage = (file) => {
	const url = config.baseUrl + '/v1/user/upload';

	let formData = new FormData();
	formData.append('file', file);

	return fetch(url, {
		method: 'POST',
		headers: {
			'X-Access-Token': uni.getStorageSync('token'),
			'X-Lang': uni.getLocale() === 'zh' ? 'zh_CN' : 'en_US',
		},
		body: formData,
	});
}