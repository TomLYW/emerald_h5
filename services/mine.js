import http from '@/http/request.js';

// 获取版本
export const getVersion = (data) => {
	return http.get('/version', data);
}

// 获取邀请码
export const getInvitationCode = (data) => {
	return http.get('/v1/user/promotion', data);
}

// 获取邀请记录
export const getInvitationList = (data) => {
	return http.get('/v1/user/promotion/logs', data);
}

// 获取电费记录
export const getElectricList = (data) => {
	return http.get('/v1/electric/logs', data);
}

// 充值电费
export const rechargeFees = (data) => {
	return http.post('/v1/electric/recharge', data);
}

// 获取资产记录
export const getAssetLogs = (data) => {
	return http.get('/v1/wallet/logs', data);
}

// 获取充值地址
export const getRechargePath = (data) => {
	return http.get('/v1/wallet/deposit', data);
}

// 获取产出记录
export const getYields = (data) => {
	return http.get('/v1/user/yields', data);
}

// 提现
export const withdrawWallet = (data) => {
	return http.post('/v1/wallet/withdraw', data);
}

// 获取走势图产出记录
export const getYieldLines = (data) => {
	return http.get('/v1/user/yield-lines', data);
}