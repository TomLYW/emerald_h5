import http from '@/http/request.js';

// 获取轮播图片
export const getBannerImgs = (data) => {
	return http.get('/v1/banner/index', data);
}

// 获取公告列表
export const getNoticeList = (data) => {
	return http.get('/v1/notice/list', data);
}

// 获取公告详情
export const getNoticeDetails = (data) => {
	return http.get('/v1/notice/details', data);
}