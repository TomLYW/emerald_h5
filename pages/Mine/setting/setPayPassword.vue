<template>
	<view class="init_pay">
		<Nav class="initPay_nav">
			<template #left>
				<image src="/static/base/title_left_arrow.png" class="icon" @click="handleBack" />
			</template>
		</Nav>
		<view class="set_pay">
			<view class="title">
				{{$t('设置支付密码')}}
			</view>
			<InputBox v-model="password" />
			<view class="btn" @click="handleClick" :style="{backgroundColor:password.length > 5 ? '#05AA84' : '#ADDAD0'}">
				{{$t('确认')}}
			</view>
		</view>
	</view>
</template>

<script setup>
	import InputBox from '@/pages/component/InputBox/index.vue';
	import Nav from '@/pages/component/Nav/index.vue';
	import { checkNumber } from '@/utils/index.js';
	import Toast from '@/hooks/useToast.js';
	import I18n from '@/hooks/useLocale.js';
	import { setPayPassword } from '@/services/user.js';
	import { loadUserInfo } from '@/hooks/useGlobal.js';
	import { ref } from 'vue';
	let password = ref('');

	function handleBack() {
		history.back();
	}

	function handleClick() {
		if (password.value.length === 6) {
			if (!checkNumber(password.value)) {
				Toast.show(I18n.t("支付密码为6位纯数字"));
				return;
			}

			Toast.show(I18n.t('正在设置'), {
				type: 'loading'
			})

			setPayPassword({ password: password.value }).then((res) => {
				if (res.code === 0) {
					loadUserInfo();
					Toast.show(I18n.t('设置成功'), {
						type: 'success'
					});
					history.back();
				} else {
					Toast.show(res.message);
				}
			})
		}

	}
</script>

<style lang="scss" scoped>
	.init_pay {
		height: 100%;
		@include flex(null, null, column);

		.initPay_nav {
			.icon {
				width: 23px;
				height: 17px;
			}
		}

		.set_pay {
			flex: 1;
			overflow-y: auto;
			padding: 15px;
			background-color: #fff;

			.title {
				font-weight: bold;
				font-size: 26px;
				color: #333;
				margin-bottom: 10px;
			}

			.btn {
				margin-left: 15px;
				margin-right: 15px;
				margin-top: 25px;
				padding-top: 12px;
				padding-bottom: 12px;
				border-radius: 12px;
				text-align: center;
				color: #fff;
				font-size: 18px;
				font-weight: bold;
				box-shadow: 0px 0px 10px -6px #000;

				&:active {
					opacity: 0.7;
				}
			}
		}
	}
</style>