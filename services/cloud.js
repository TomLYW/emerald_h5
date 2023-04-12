import http from '@/http/request.js';

// 获取云算力列表
export const getMinerList = (data) => {
	return http.get('/v1/cloud-miner/list', data);
}