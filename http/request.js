import config from '@/http/config.js';
import I18n from '@/hooks/useLocale.js';
import Popup from '@/hooks/useCustomPop.js';
import Toast from '@/hooks/useToast.js';
import { useUserStore } from '@/store/user.js';
const user = useUserStore();


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
		'X-Lang': uni.getLocale() === 'zh' ? 'zh_CN' : 'en_US',
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

	dealCode(res.data.code);
	return Promise.resolve(res.data);
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
					Toast.show(I18n.t('网络错误'), { type: 'fail' });
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

// 异常处理
function dealCode(code) {
	if (!user.isLogin) return;

	if (code === 1000) {
		Popup.showPop(I18n.t('用户认证失效'), {
			title: I18n.t('提示'),
			confirm: () => {}
		});

		user.loginOut();
		uni.setStorageSync('token', '');
	} else if (code === 1001) {
		Popup.showPop(I18n.t('此账户已被禁用，请联系管理员了解'), {
			title: I18n.t('提示'),
			confirm: () => {}
		});

		user.loginOut();
		uni.setStorageSync('token', '');
	} else if (code === 1002) {
		Popup.showPop(I18n.t('此账户已登录其他设备'), {
			title: I18n.t('提示'),
			confirm: () => {}
		});

		user.loginOut();
		uni.setStorageSync('token', '');
	}
}

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