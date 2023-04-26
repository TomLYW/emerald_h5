<template>
	<view class="email_main">
		<Nav class="email_nav">
			<template #left>
				<image src="/static/base/title_left_arrow.png" class="icon" @click="handleClick" />
			</template>
		</Nav>
		<view class="bind">
			<text class="bind-title">{{$t('绑定邮箱')}}</text>
			<Form @submit="handleSubmit">
				<Field center :placeholder="$t('请输入邮箱')" class="ipt" name='account' v-model='submitInfo.account' />
				<Field center :placeholder="$t('请输入验证码')" class="ipt" v-model="submitInfo.code" name='code' maxlength='6'>
					<template #button>
						<text class="code" @click="handleSend">{{count=== 61 ? $t('获取验证码') : count + $t('s后获取')}}</text>
					</template>
				</Field>
				<Button native-type="submit" block class="btn" :disabled="btnState">{{$t('确认')}}</Button>
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
	import {
		sendCode,
		bindEmail
	} from '@/services/user.js';
	import { isEmailAddress } from '@/utils/index.js';
	import Toast from '@/hooks/useToast.js';
	import Nav from '@/pages/component/Nav/index.vue';
	const {
		$t: t
	} = getCurrentInstance().proxy;

	let count = ref(61);
	let btnState = ref(true);
	let submitInfo = reactive({
		areaCode: '86',
		account: '',
		code: '',
		password: '',
		authMethod: 'password', // password/code
		accountType: 'email', // 默认手机好注册 email/tel
	});

	const handleSubmit = (value) => {
		if (!isEmailAddress(value.account)) {
			Toast.show(t('请输入正确格式的邮箱'));
			return;
		}

		bindEmail({ email: value.account, code: value.code }).then(res => {
			if (res.code === 0) {
				Toast.show(t('绑定成功'), {
					type: 'success'
				})
				uni.redirectTo({
					url: '/pages/Mine/setting/index'
				})
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
			authType: 'bind',
			account: submitInfo.account
		}
		if (count.value !== 61) return;

		sendCode(parmas).then(res => {
			if (res.code === 0) {
				Toast.show(t('验证码已发送'), {
					type: 'success'
				})
				startTimer();
			} else {
				Toast.show(res.message);
			}
		})
	}

	const handleClick = () => {
		history.back();
	}

	watch(submitInfo, (value) => {
		if (value.account && value.code.length > 5) {
			btnState.value = false;
		} else {
			btnState.value = true;
		}
	})
</script>

<style lang="scss" scoped>
	.email_main {
		height: 100%;
		@include flex(null, null, column);

		.email_nav {
			.icon {
				width: 23px;
				height: 17px;
			}
		}

		.bind {
			flex: 1;
			overflow-y: auto;
			padding-left: 15px;
			padding-right: 15px;

			.bind-title {
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

			.code {
				color: #05AA84
			}
		}
	}
</style>