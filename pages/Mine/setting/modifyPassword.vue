<template>
	<view class="modify_main">
		<Nav class="modify_nav">
			<template #left>
				<image src="/static/base/title_left_arrow.png" class="icon" @click="handleClick" />
			</template>
		</Nav>
		<view class="login">
			<text class="login-title">{{$t('修改登录密码')}}</text>
			<view class="second_tip">{{$t('验证码将发送到：')}}{{emailEncryption(user.userInfo.email)}}</view>
			<Form @submit="handleSubmit">
				<Field center :placeholder="$t('请输入验证码')" class="ipt" v-model="submitInfo.code" name='code' maxlength='6'>
					<template #button>
						<text class="code" @click="handleSend">{{count=== 61 ? $t('获取验证码') : count + $t('s后获取')}}</text>
					</template>
				</Field>
				<Field center :placeholder="$t('请设置密码')" class="ipt" :type="pwdEyes ? 'text' : 'password'"
					:right-icon="pwdEyes ? '/static/login/login_icon_eyes_open.png': '/static/login/login_icon_eyes_close.png'"
					@click-right-icon='handleEyes' v-model="submitInfo.password" name='password' />
				<Button native-type="submit" block class="btn" :disabled="btnState">{{$t('重置密码')}}</Button>
			</Form>
		</view>
	</view>
</template>


<script setup>
	import {
		reactive,
		ref,
		watch,
		getCurrentInstance
	} from 'vue';
	import {
		Field,
		Button,
		Form
	} from 'vant';
	import { sendCode, resetPwd } from '@/services/user.js';
	import { checkPassword, emailEncryption } from '@/utils/index.js';
	import Toast from '@/hooks/useToast.js';
	import Nav from '@/pages/component/Nav/index.vue';
	import { useUserStore } from '@/store/user.js';
	const user = useUserStore();
	const { $t: t } = getCurrentInstance().proxy;

	let count = ref(61);
	let pwdEyes = ref(false);
	let btnState = ref(true);
	let submitInfo = reactive({
		areaCode: '86',
		account: '',
		code: '',
		password: '',
		accountType: 'email', // 默认手机好注册 email/tel
	});

	const handleSubmit = (value) => {
		if (!checkPassword(value.password)) {
			Toast.show(t("登录密码为8-16位，数字字母组合"), {
				type: 'fail',
				duration: 3000
			});
			return;
		}
		submitInfo.account = user.userInfo.email;

		resetPwd(submitInfo).then(res => {
			if (res.code === 0) {
				Toast.show(t('重置成功'), {
					type: 'success'
				})
				uni.redirectTo({
					url: '/pages/Mine/setting/index'
				});
			} else {
				Toast.show(res.message);
			}
		})
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
		const parmas = {
			accountType: 'email',
			authType: 'retrieve',
			account: user.userInfo.email
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
	// 密码框
	const handleEyes = () => {
		pwdEyes.value = !pwdEyes.value;
	}

	const handleClick = () => {
		history.back();
	}

	watch(submitInfo, (value) => {
		if (value.password.length > 5 && value.code.length > 5) {
			btnState.value = false;
		} else {
			btnState.value = true;
		}
	})
</script>

<style lang="scss" scoped>
	.modify_main {
		height: 100%;
		@include flex(null, null, column);

		.modify_nav {
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

			.second_tip {
				color: #666;
				font-weight: bold;
				margin-bottom: 20px;
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

			.code {
				color: #05AA84
			}
		}
	}
</style>