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