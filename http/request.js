// import {
// 	useI18n
// } from 'vue-i18n';
// const {
// 	t
// } = useI18n();
import config from '@/http/config.js';

/* 1.请求拦截器 */
let Interceptor = ({
	loading,
	...interOption
}) => {
	let options = {};
	interOption.url = config.baseUrl + interOption.url;
	// 请求头
	interOption.header = {
		'X-Access-Token': uni.getStorageSync('token'),
		'X-Lang': uni.getLocale() === 'cn' ? 'zh_CN' : 'en_US',
		...interOption.header,
	};

	//如果传入loading为true,则显示loading加载
	if (loading) {
		uni.showLoading({
			title: 'Loading...',
			mask: true,
		});
	}

	return interOption;
};

/* 2.响应拦截器 */
let Responder = (res) => {
	if (res?.data) {
		switch (res.data.code) {
			case 1000:
				uni.showToast({
					icon: 'error',
					title: t('用户认证失效'),
					duration: 2000,
				});
				return;
			case 1001:
				uni.showToast({
					icon: 'none',
					title: t("此账户已被禁用，请联系管理员了解"),
					duration: 2000,
				});
				return;
			case 1002:
				uni.showToast({
					icon: 'error',
					title: t("此账户已登录其他设备"),
					duration: 2000,
				});
				return;
			default:
				return Promise.resolve(res.data);
		}
	}
};

/* 3.请求 */
let request = (configOptions = {}) => {
	const options = Interceptor(configOptions); // 请求拦截
	// 发起请求
	return new Promise((resolve, reject) => {
		// 判断是否连接网络
		uni.getNetworkType({
			success: ({
				networkType
			}) => {
				if (networkType === 'none') {
					uni.showToast({
						title: t('网络错误'),
						icon: 'error'
					});
				} else {
					uni.request({
						...options,
						success: (res) => {
							uni.hideLoading();
							resolve(Responder(res)); // 响应拦截
						},
						fail: (err) => {
							uni.hideLoading();
							reject(err);
						},
					});
				}
			},
			fail: (error) => {},
		});
	});
};

export default {
	// get请求
	get(url, data, options = {}) {
		options.url = url;
		options.data = data;
		options.method = 'GET';
		return request(options);
	},
	// post请求
	post(url, data, options = {}) {
		options.url = url;
		options.data = data;
		options.method = 'POST';
		return request(options);
	},
};