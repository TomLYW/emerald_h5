import config from '@/http/config.js';

/* 1.请求拦截器 */
let Interceptor = ({
	loading,
	...interOption
}) => {
	let options = {};
	// const token = uni.getStorageSync('token');
	const token =
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOjUsImV4cCI6MTY4MzY4MzUwMiwiaWF0IjoxNjgxMDkxNTAyLCJpc3MiOiJhcHAiLCJ2ZXIiOjUzfQ.RbNK1dypmIQpA3jyc4zP0UbUJ-LLJQpxP6HQTRz3cC8";
	interOption.url = config.baseUrl + interOption.url;
	// 请求头
	interOption.header = {
		'X-Access-Token': token,
		...interOption.header,
	};

	//如果传入loading为true,则显示loading加载
	if (loading) {
		uni.showLoading({
			title: '加载中...',
			mask: true,
		});
	}

	return interOption;
};

/* 2.响应拦截器 */
let Responder = (res) => {
	uni.hideLoading(); // 停止加载
	if (res && res.data) {
		switch (res.data.code) {
			case 200:
				return Promise.resolve(res.data);
			case 1000:
				uni.showToast({
					icon: 'error',
					title: '用户认证失效',
					duration: 2000,
				});
				return Promise.reject(res.data);
			case 1001:
				uni.showToast({
					icon: 'none',
					title: "此账户已被禁用，请联系管理员了解",
					duration: 2000,
				});
				return Promise.reject(res.data);
			case 1002:
				uni.showToast({
					icon: 'error',
					title: "此账户已登录其他设备",
					duration: 2000,
				});
				return Promise.reject(res.data);
			default:
				return Promise.reject(res.data);
		}
	}

	return resOption;
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
					uni.showModal({
						title: '没有网络',
						content: '请检查您的网络',
						showCancel: false,
						success: () => {
							uni.hideLoading();
						},
					});
				} else {
					uni.request({
						...options,
						success: (res) => {
							resolve(Responder(res)); // 响应拦截
						},
						fail: (err) => {
							reject(err);
							uni.hideLoading();
							uni.showToast({
								icon: 'none',
								title: err.errMsg,
								duration: 2000,
							});
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