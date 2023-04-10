<template>
	<view class="login">
		<text class="login-title">{{$t('找回密码')}}</text>
		<Form @submit="handleSubmit">
			<Field center :placeholder="$t('请输入邮箱')" class="ipt" name='account' v-model='submitInfo.account' />
			<Field center :placeholder="$t('请输入验证码')" class="ipt" v-model="submitInfo.code" name='code' maxlength='6'>
				<template #button>
					<text class="code" @click="handleSend">{{$t('获取验证码')}}</text>
				</template>
			</Field>
			<Field center :placeholder="$t('请设置密码')" class="ipt" :type="pwdEyes ? 'text' : 'password'"
				:right-icon="pwdEyes ? '/static/login/login_icon_eyes_open.png': '/static/login/login_icon_eyes_close.png'"
				@click-right-icon='handleEyes' v-model="submitInfo.password" name='password' />
			<Button native-type="submit" block class="btn" :disabled="btnState">{{$t('重置密码')}}</Button>
		</Form>
	</view>
</template>


<script setup>
	import {
		useI18n
	} from 'vue-i18n';

	const {
		t
	} = useI18n();
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
	import {
		sendCode
	} from '@/services/user.js';


	const pwdEyes = ref(false);
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

	//获取验证码
	const handleSend = () => {
		if (!submitInfo.account) {
			uni.showToast({
				title: t('请输入邮箱'),
				icon: 'error'
			});
			return;
		}
		console.log('xx')
	}

	// 密码框
	const handleEyes = () => {
		pwdEyes.value = !pwdEyes.value;
	}

	watch(submitInfo, (value) => {
		if (value.account && value.password.length > 5 && value.code.length > 5) {
			btnState.value = false;
		} else {
			btnState.value = true;
		}
	})
</script>

<style lang="scss" scoped>
	.login {
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
		}

		.code {
			color: #05AA84
		}

	}
</style>