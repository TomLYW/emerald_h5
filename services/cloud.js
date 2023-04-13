import http from '@/http/request.js';
import i18n from '@/hooks/useLocale.js';

// 获取云算力列表
export const getMinerList = (data) => {
	return http.get('/v1/cloud-miner/list', data);
}


// 获取套餐类型
export function getMealType(type) {
  switch (type) {
    case 'classic':
      return {text: i18n.t('经典套餐'), bgColor: '#05AA84'};
    case 'speeded':
      return {text: i18n.t('加速套餐'), bgColor: '#4E6EF2'};
    default:
      return {text: i18n.t('保本套餐'), bgColor: '#00BDFF'};
  }
}