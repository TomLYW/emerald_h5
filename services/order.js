import http from '@/http/request.js';

// 获取云算力订单列表
export const getPowerOrder = (data) => {
	return http.get('/v1/cloud-miner/orders', data);
}


// 获取矿机订单列表
export const getMinerOrder = (data) => {
	return http.get('/v1/miner/orders', data);
}

// 获取云算力订单详情
export const getPowerOrderDetails = (data) => {
	return http.get('/v1/cloud-miner/order', data);
}

// 获取云算力订单产出记录
export const getPowerRecord = (data) => {
	return http.get('/v1/cloud-miner/yields', data);
}

// 获取矿机订单详情
export const getMinerOrderDetails = (data) => {
	return http.get('/v1/miner/order', data);
}

// 获取矿机订单产出记录
export const getMinerRecord = (data) => {
	return http.get('/v1/miner/yields', data);
}

// 获取产出详情
export const getOutputDetails = (data) => {
	return http.get('/v1/miner/yield', data);
}

// 激活矿机
export const activeMiner = (data) => {
	return http.post('/v1/miner/order/activated', data);
}

// 停止矿机
export const stopMiner = (data) => {
	return http.post('/v1/miner/order/standby', data);
}