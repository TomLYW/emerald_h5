<template>
	<view class="login_main">
		<Nav class="page_nav">
			<template #left>
				<image src="/static/base/title_left_arrow.png" class="icon" @click="handleBack" />
			</template>
		</Nav>
		<view class="login">
			<text class="login-title">{{$t('登录')}}</text>
			<Form @submit="handleSubmit">
				<Field center :placeholder="$t('请输入邮箱')" class="ipt" name='account' v-model='submitInfo.account' />
				<Field center :placeholder="$t('请输入验证码')" class="ipt" v-model="submitInfo.code" name='code' maxlength='6' v-if="showCode">
					<template #button>
						<text class="code" @click="handleSend">{{count=== 61 ? $t('获取验证码') : count + $t('s后获取')}}</text>
					</template>
				</Field>
				<Field center :placeholder="$t('请输入密码')" class="ipt" :type="pwdEyes ? 'text' : 'password'"
					:right-icon="pwdEyes ? '/static/login/login_icon_eyes_open.png': '/static/login/login_icon_eyes_close.png'"
					@click-right-icon='handleEyes' v-model="submitInfo.password" name='password' v-else />
				<view class="login-code">
					<text @click="handleCode">{{showCode ? $t('密码登录') : $t('验证码登录')}}</text>
				</view>
				<Button native-type="submit" block class="btn" :disabled="btnState">{{$t('登录')}}</Button>
			</Form>
			<view class="forget">
				<text @click="handleForget">{{$t('忘记密码')}}</text>
			</view>
		</view>
	</view>
</template>


<script setup>
	import { reactive, ref, watch, getCurrentInstance } from 'vue';
	import { Field, Button, Form } from 'vant';
	import { sendCode, login } from '@/services/user.js';
	import { getForceList, getThreshold } from '@/services/other.js';
	import { isEmailAddress } from '@/utils/index.js';
	import Toast from '@/hooks/useToast.js';
	import Popup from '@/hooks/useCustomPop.js';
	import Nav from '@/pages/component/Nav/index.vue';
	import { useUserStore } from '@/store/user.js';
	const { $t: t } = getCurrentInstance().proxy;
	let user = useUserStore();

	let count = ref(61);
	let pwdEyes = ref(false);
	let showCode = ref(false);
	let btnState = ref(true);
	let submitInfo = reactive({
		areaCode: '86',
		account: '',
		code: '',
		password: '',
		authMethod: 'password', // password/code
		accountType: 'email', // 默认手机好注册 email/tel
	});

	// 弹窗显示
	const getDialog = async () => {
		let index = 0;
		const res1 = await getForceList();
		const res2 = await getThreshold();
		if (res1.data.length) {
			index = 1;
		} else {
			if (res2.data.status > 0) {
				index = 2;
			}
		}

		if ((res1.data.length && res2.data.status === 0) || (!res1.data.length && res2.data.status > 0)) {
			Popup.showTips({ force: res1.data, threshold: res2.data, showIndex: index });
		}
	}

	const handleSubmit = (value) => {
		if (!isEmailAddress(value.account)) {
			Toast.show(t('请输入正确格式的邮箱'));
			return;
		}

		if (value.password) {
			submitInfo.authMethod = 'password';
		} else if (value.code) {
			submitInfo.authMethod = 'code';
		}

		Toast.show(t('正在登录'), {
			type: 'loading'
		})
		login(submitInfo).then(res => {
			if (res.code === 0) {
				uni.setStorageSync('token', res.data.token);
				user.login(res.data.user);
				Toast.show(t('登录成功'), {
					type: 'success'
				})
				history.back();
				// 电费余额欠费提醒
				setTimeout(() => {
					getDialog();
				}, 300)
			} else {
				Toast.show(res.message, { type: 'fail' });
			}
		})

	}
	// 忘记密码
	const handleForget = () => {
		uni.navigateTo({
			url: '/pages/Login/resetPwd/index'
		});
	}

	// 定时器
	const startTimer = () => {
		let timer = setInterval(() => {
			count.value -= 1;

			if (count.value === 0) {
				count.value = 61;
				if (timer !== null) {
					clearInterval(timer);
				}
			}
		}, 1000);
	}
	//获取验证码
	const handleSend = () => {
		if (!submitInfo.account) {
			Toast.show(t('请输入邮箱'));
			return;
		}

		if (!isEmailAddress(submitInfo.account)) {
			Toast.show(t('请输入正确格式的邮箱'));
			return;
		}

		const parmas = {
			accountType: 'email',
			authType: 'login',
			account: submitInfo.account
		}
		if (count.value !== 61) return;

		sendCode(parmas).then(res => {
			if (res.code === 0) {
				Toast.show(t('发送成功'), {
					type: 'success'
				})
				startTimer();
			} else {
				Toast.show(res.message);
			}
		})
	}
	// 验证码登录
	const handleCode = () => {
		showCode.value = !showCode.value;
		if (showCode.value) {
			submitInfo.password = '';
		} else {
			submitInfo.code = '';
		}
	}
	// 密码框
	const handleEyes = () => {
		pwdEyes.value = !pwdEyes.value;
	}

	watch(submitInfo, (value) => {
		if (value.account && (value.password.length > 5 || value.code.length > 5)) {
			btnState.value = false;
		} else {
			btnState.value = true;
		}
	})

	function handleBack() {
		history.back();
	}
</script>

<style lang="scss" scoped>
	.login_main {
		height: 100%;
		@include flex(null, null, column);

		.page_nav {
			.icon {
				width: 23px;
				height: 17px;
			}
		}

		.login {
			flex: 1;
			overflow-y: auto;
			padding-left: 15px;
			padding-right: 15px;

			.login-title {
				display: inline-block;
				color: #000;
				font-size: 18px;
				font-weight: bold;
				padding: 20px 0;
			}

			.ipt {
				margin-bottom: 24px;
				border: 1px solid #ccc;
				padding: 10px;
				border-radius: 10px;
			}

			.btn {
				background-color: #05AA84;
				color: #fff;
				border-radius: 10px;
				font-size: 18px;
			}

			.forget {
				text-align: center;
				margin-top: 16px;
			}

			.login-code {
				text-align: right;
				font-size: 14px;
				margin-top: -8px;
				margin-bottom: 14px;
			}

			.code {
				color: #05AA84
			}

		}
	}
</style>