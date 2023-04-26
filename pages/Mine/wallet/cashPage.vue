<template>
	<view class="cash_main">
		<Nav class="cash_header">
			<template #left>
				<image src="/static/base/title_left_arrow.png" class="icon" @click="handleClick" />
			</template>
		</Nav>
		<view class="cash_page">
			<view class="title">{{$t('提现')}} {{type}}</view>
			<view class="box">
				<view class="box_item">
					<text class="item_title">{{$t('提出地址')}}</text>
					<Field class="ipt" :placeholder="$t('输入或长按粘贴地址')" v-model="data.address" />
					<text v-show="type === 'BTC'" class="item_tip">{{$t('支持划转本链BTC接收地址，一般1或3开头')}}</text>
					<text v-show="type === 'ETH'" class="item_tip">{{$t('支持划转本链ETH接收地址，一般0开头')}}</text>
					<view class="warn_text" v-show="state">{{$t('请输入正确的地址')}}</view>
				</view>
				<view class="box_item">
					<text class="item_title">{{$t('数量')}}</text>
					<Field class="ipt" :placeholder="$t('请输入')" type="number" v-model="data.num">
						<template #right-icon>
							<text class="suffix">{{type}}</text>
						</template>
					</Field>
					<view class="item_tip">
						<text>{{$t('您有')}} {{dealNumber(data.assets.available, 8)}} {{type + $t('可用')}}, </text>
						<text class="mr10">{{$t('最小提现金额')}} {{data.assets.minWithdraw}} {{type}}</text>
						<text class="all_btn" @click="onAll">{{$t('全部')}}</text>
					</view>
				</view>
				<view class="sure_btn" @click="handleOk" :style="{backgroundColor:canSubmit() ?'#05AA84' : '#ADDAD0' }">{{$t('确认')}}</view>
				<view class="receipt">{{$t('实际到账')}} {{getDidCount()}} {{type}}</view>
			</view>
			<view class="cash_tips">
				<text class="tips_item general_title">{{$t('温馨提示')}}</text>
				<text class="tips_item">1. {{$t('温馨提示内容1')}}</text>
				<text class="tips_item">2. {{$t('温馨提示内容2')}}</text>
				<text class="tips_item">3. {{$t('温馨提示内容3')}}</text>
				<text class="tips_item">4. {{$t('温馨提示内容4')}}</text>
			</view>
		</view>
		<InputModel :options="options" />
		<InputModel :options="options1" />
		<SmsVerify v-model:show="show" :options="options2" />
	</view>
</template>

<script setup>
	import { onLoad } from '@dcloudio/uni-app';
	import { dealNumber, unroundNumber } from '@/utils/index.js';
	import InputModel from '@/pages/component/InputModel/index.vue';
	import SmsVerify from '@/pages/Mine/wallet/SmsVerify.vue';
	import Nav from '@/pages/component/Nav/index.vue';
	import I18n from '@/hooks/useLocale.js';
	import Toast from '@/hooks/useToast.js';
	import { useUserStore } from '@/store/user.js';
	import { withdrawWallet } from '@/services/mine.js';
	import { getAssets, getElectricBalance } from '@/services/other.js';
	import { Field } from 'vant';
	import { ref, reactive, watch, toRef } from 'vue';
	const { userInfo } = useUserStore();

	// 校验正则
	const ethtest = /^(0x)?[0-9a-fA-F]{40}$/;
	const btctest = /^(1|3)[a-zA-Z\d]{24,33}$/;
	const btctest1 = /^[^0OlI]{25,34}$/;

	let type = ref('');
	let state = ref(false);
	let pin = ref('');
	let show = ref(false);
	let code = ref('');

	let data = reactive({
		address: '',
		num: '',
		assets: {},
		balance: {}
	})

	let options = reactive({
		isShow: false,
		type: 'password',
		title: '',
		amount: '',
		callback: callback
	})

	let options1 = reactive({
		isShow: false,
		type: 'googleAuth',
		callback: callback1
	})

	let options2 = reactive({
		authType: 'withdraw',
		accountType: 'email'
	})

	function canSubmit() {
		if (data.address && Number(data.num) > 0) {
			return true;
		}
		return false;
	}

	function getDidCount() {
		let { fees } = toRef(data, 'assets').value;
		let num = toRef(data, 'num').value;

		if (fees && num) {
			if (fees > 0) {
				return (num - fees) > 0 ? unroundNumber(num - fees, 8) : 0;
			} else {
				return unroundNumber(num * (1 - data.assets.feesRate), 8);
			}
		}
	}

	function onAll() {
		data.num = dealNumber(data.assets.available, 8);
	}

	function handleOk() {
		if (!canSubmit()) return;

		// 提出地址校验 
		if (type.value === 'BTC') {
			if (!(btctest.test(data.address) && btctest1.test(data.address))) {
				state.value = true;
				return;
			}
		} else if (type.value === 'ETH') {
			if (!ethtest.test(data.address)) {
				state.value = true;
				return;
			}
		}

		if (state.value) state.value = false;

		if (data.balance.available < 0) {
			Toast.show(I18n.t("您的电费账户已欠费，为避免造成收益损失，请及时充值电费"));
			return;
		}

		if (Number(data.num) > Number(data.assets.available)) {
			Toast.show(I18n.t("余额不足"));
			return;
		}

		// 比较最小提现额
		if (Number(data.assets.minWithdraw) > Number(data.num)) {
			Toast.show(`${I18n.t('小于最小提现金额')}${data.assets.minWithdraw} ${type.value}`);
			return;
		}

		options.isShow = true;
		options.title = I18n.t('提现') + type.value;
		options.amount = data.num + " " + type.value;
	}

	function callback(val) {
		options.isShow = false;
		pin.value = val;
		if (userInfo.isSet2fa) {
			options1.isShow = true;
		} else {
			show.value = true;
			options2.callback = callback2(val);
		}
	}

	function callback1(val) {
		//设置了谷歌验证
		Toast.show(I18n.t('正在提交'), { type: 'loading' })
		withdrawWallet({ currency: type.value, amount: data.num, toAddress: data.address, pin: pin.value, googleCode: val }).then(res => {
			if (res.code === 0) {
				Toast.show(I18n.t("提交成功"), { type: 'success' });
				data.address = '';
				data.num = '';
				uni.navigateBack();
			} else {
				Toast.show(res.message)
			}
		})
	}

	function callback2(pin) {
		return (code) => {
			Toast.show(I18n.t('正在提交'), { type: 'loading' })
			withdrawWallet({
				currency: type.value,
				amount: data.num,
				toAddress: data.address,
				pin: pin,
				accountType: options2.accountType,
				code: code
			}).then(res => {
				if (res.code === 0) {
					Toast.show(I18n.t("提交成功"), { type: 'success' });
					data.address = '';
					data.num = '';
					uni.navigateBack();
				} else {
					Toast.show(res.message)
				}
			})
		}
	}

	function loadData(type) {
		getAssets().then(res => {
			if (res.code === 0) {
				data.assets = res.data.find(item => item.currency === type);
			}
		})

		getElectricBalance().then(res => {
			if (res.code === 0) {
				data.balance = res.data;
			}
		})
	}

	function handleClick() {
		history.back();
	}

	onLoad((option) => {
		type.value = option.type;
		loadData(option.type);
	})

	watch(() => data.address, (newVal) => {
		if (!newVal) {
			state.value = false;
		}
	})
</script>

<style lang="scss" scoped>
	.cash_main {
		height: 100%;
		@include flex(null, null, column);

		.cash_header {
			.icon {
				width: 23px;
				height: 17px;
			}
		}

		.cash_page {
			flex: 1;
			padding: 15px;
			overflow-y: auto;

			.title {
				font-weight: bold;
				font-size: 24px;
				color: #333;
			}

			.box {
				background-color: #fff;
				padding: 15px;
				border-radius: 15px;
				box-shadow: 0px 0px 10px -8px #ccc;
				margin-top: 20px;

				.box_item {
					margin-bottom: 20px;
					color: #777;

					.item_title {
						font-size: 15px;
					}

					.item_tip {
						font-size: 13px;
						line-height: 22px;

						.all_btn {
							display: inline-block;
							color: #05AA84;
							font-size: 14px;
							font-weight: bold;

							&:active {
								opacity: 0.6;
							}
						}

						.mr10 {
							margin-right: 10px;
						}
					}

					.warn_text {
						color: red;
						margin-top: 8px;
						font-size: 14px;
					}

					.ipt {
						border-radius: 12px;
						border: 1px solid #cdcdcd;
						padding-top: 12px;
						padding-bottom: 12px;
						margin-top: 10px;
						margin-bottom: 12px;
					}

					.suffix {
						font-size: 17px;
						font-weight: bold;
						color: #333;

					}
				}

				.sure_btn {
					color: #fff;
					background-color: #05AA84;
					border-radius: 15px;
					box-shadow: 0px 0px 10px -6px #000;
					text-align: center;
					padding-top: 13px;
					padding-bottom: 13px;
					margin-top: 45px;
					margin-bottom: 15px;

					&:active {
						opacity: 0.6;
					}
				}

				.receipt {
					color: #666;
					font-size: 13px;
					text-align: center;
				}
			}

			.cash_tips {
				color: #666;
				margin-top: 20px;

				.tips_item {
					display: block;
					margin-bottom: 8px;
					line-height: 22px;
					font-size: 14px;
				}

				.general_title {
					font-size: 17px;
				}
			}
		}
	}
</style>