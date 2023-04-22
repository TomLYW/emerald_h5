<template>
	<scroll-view scroll-y="true" style="height: 100%;">
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
						<text>{{$t('您有')}} {{dealNumber(1.34,8)}} {{type + $t('可用')}}, </text>
						<text class="mr10">{{$t('最小提现金额')}} {{0.1}} {{type}}</text>
						<text class="all_btn" @click="onAll">{{$t('全部')}}</text>
					</view>
				</view>
				<view class="sure_btn" @click="handleOk" :style="{backgroundColor:canSubmit() ?'#05AA84' : '#ADDAD0' }">{{$t('确认')}}</view>
				<view class="receipt">{{$t('实际到账')}} {{2.3}} {{type}}</view>
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
	</scroll-view>
</template>

<script setup>
	import { onLoad } from '@dcloudio/uni-app';
	import { dealNumber } from '@/utils/index.js';
	import InputModel from '@/pages/component/InputModel/index.vue';
	import I18n from '@/hooks/useLocale.js';
	import Toast from '@/hooks/useToast.js';
	import { useUserStore } from '@/store/user.js';
	import { withdrawWallet } from '@/services/mine.js';
	import { Field } from 'vant';
	import { ref, reactive, watch } from 'vue';
	const { userInfo } = useUserStore();

	// 校验正则
	const ethtest = /^(0x)?[0-9a-fA-F]{40}$/;
	const btctest = /^(1|3)[a-zA-Z\d]{24,33}$/;
	const btctest1 = /^[^0OlI]{25,34}$/;

	let type = ref('');
	let state = ref(false);
	let pin = ref('');

	let data = reactive({
		address: '',
		num: ''
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

	function canSubmit() {
		if (data.address && Number(data.num) > 0) {
			return true;
		}
		return false;
	}

	function getDidCount() {
		if (Number(asset.fees) > 0) {
			return (Number(data.num) - Number(asset.fees)) > 0 ? (Number(data.num) - Number(asset.fees)).toFixed(6) : 0;
		} else {
			return (Number(data.num) * (1 - Number(asset.feesRate))).toFixed(6);
		}
	}

	function onAll() {

	}

	function handleOk() {
		if (!canSubmit()) return;

		// 提出地址校验 
		// if (type.value === 'BTC') {
		// 	if (!(btctest.test(data.address) && btctest1.test(data.address))) {
		// 		state.value = true;
		// 		return;
		// 	}
		// } else if (type.value === 'ETH') {
		// 	if (!ethtest.test(data.address)) {
		// 		state.value = true;
		// 		return;
		// 	}
		// }

		if (state.value) state.value = false;

		options.isShow = true;
		options.title = I18n.t('提现') + type.value;
		options.amount = 1.44 + " " + type.value;
	}

	function callback(val) {
		options.isShow = false;
		pin.value = val;
		options1.isShow = true;
	}

	function callback1(val) {
		console.log('google', googlePin.value)

		if (userInfo.isSet2fa) {
			//设置了谷歌验证
			Toast.show(I18n.t('正在提交'), { type: 'loading' })
			withdrawWallet({ currency: type.value, amount: data.num, toAddress: data.address, pin: pin.value, googleCode: val }).then(res => {
				if (res.code === 0) {
					Toast.show(I18n.t("提交成功"), {
						type: 'success'
					})
					uni.navigateBack();
				} else {
					Toast.show(res.message)
				}
			})

		} else {
			//短信验证
			AuthCodeModel.showAuthCodeModel({
				callBack: (data) => {
					BToast.showLoading(I18n.t('正在提交'))
					withdrawWallet({ currency: type, amount: value.count, toAddress: value.address, pin: password, accountType: data.accountType, code: data.code }).then(response => {
						if (response.data.code === 0) {
							BToast.showSuccess(I18n.t("提交成功"))
							refreshData();
							navigation.pop();
						} else {
							BToast.showAlert(response.data.message)
						}
					}).catch(error => {
						console.log(error);
					})

				}
			})
		}
	}

	onLoad((option) => {
		type.value = option.type;
	})

	watch(() => data.address, (newVal) => {
		if (!newVal) {
			state.value = false;
		}
	})
</script>

<style lang="scss" scoped>
	.cash_page {
		padding: 15px;

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
</style>