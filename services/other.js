import http from '@/http/request.js';

// 获取用户信息
export const getUserInfo = (data) => {
	return http.get('/v1/user/info', data);
}

// 获取电费阈值
export const getThreshold = (data) => {
	return http.get('/v1/electric/threshold', data);
}

// 获取钱包数据
export const getAssets = (data) => {
	return http.get('/v1/wallet/assets', data);
}

// 获取电费余额
export const getElectricBalance = (data) => {
	return http.get('/v1/electric/balance', data);
}