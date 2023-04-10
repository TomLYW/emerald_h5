<template>
	<view class="close">
		<image class="icon" src='/static/base/login_icon_close.png' @click="handleClose"></image>
	</view>
	<view class="login">
		<text class="login-title">{{$t('登录')}}</text>
		<Form @submit="handleSubmit">
			<Field center :placeholder="$t('请输入邮箱')" class="ipt" name='account' v-model='submitInfo.account' />
			<Field center :placeholder="$t('请输入验证码')" class="ipt" v-model="submitInfo.code" name='code' v-if="showCode">
				<template #button>
					<text class="code" @click="handleSend">{{$t('获取验证码')}}</text>
				</template>
			</Field>
			<Field center :placeholder="$t('请输入密码')" class="ipt" :type="pwdEyes ? 'text' : 'password'"
				:right-icon="pwdEyes ? '/static/login/login_icon_eyes_open.png': '/static/login/login_icon_eyes_close.png'"
				@click-right-icon='handleEyes' v-model="submitInfo.password" name='password' v-else />
			<view class="login-code">
				<text @click="handleCode">{{$t('验证码登录')}}</text>
			</view>
			<Button native-type="submit" block class="btn" :disabled="btnState">{{$t('登录')}}</Button>
		</Form>
		<view class="forget">
			<text @click="handleForget">{{$t('忘记密码')}}</text>
		</view>

	</view>
</template>

<script setup>
	import {
		reactive,
		ref,
		watch
	} from 'vue';
	import {
		Field,
		Button,
		Form
	} from 'vant';

	const pwdEyes = ref(false);
	const showCode = ref(false);
	const btnState = ref(true);
	const submitInfo = reactive({
		areaCode: '86',
		account: '',
		code: '',
		password: '',
		authMethod: 'password', // password/code
		accountType: 'email', // 默认手机好注册 email/tel
		secureTextEntry: true,
	});

	const handleSubmit = (value) => {
		console.log('xx', value)
	}

	const handleForget = () => {
		console.log('xx')
	}

	const handleClose = () => {
		console.log('xx')
	}
	//获取验证码
	const handleSend=()=>{
		console.log('xx')
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
		if (value.account && (value.password.length > 5 || value.code)) {
			btnState.value = false;
		} else {
			btnState.value = true;
		}
	})
</script>

<style lang="scss" scoped>
	.login {
		padding-left: 40px;
		padding-right: 40px;

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

	.close {
		padding: 14px 40px;
		border-bottom: 1px solid #ccc;

		.icon {
			width: 18px;
			height: 18px;
		}
	}
</style>