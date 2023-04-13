import http from '@/http/request.js';

// 获取云算力列表
export const getMinerList = (data) => {
	return http.get('/v1/cloud-miner/list', data);
}


// 获取套餐类型
export function getMealType(type) {
  switch (type) {
    case 'classic':
      // return {text: I18n.t('经典套餐'), bgColor: '#05AA84'};
      return {text: '经典套餐', bgColor: '#05AA84'};
    case 'speeded':
      // return {text: I18n.t('加速套餐'), bgColor: '#4E6EF2'};
      return {text: '加速套餐', bgColor: '#4E6EF2'};
    default:
      // return {text: I18n.t('保本套餐'), bgColor: '#00BDFF'};
      return {text: '保本套餐', bgColor: '#00BDFF'};
  }
}