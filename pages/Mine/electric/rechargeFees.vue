<template>
	<view class="recharge_main">
		<Nav class="recharge_header">
			<template #left>
				<image src="/static/base/title_left_arrow.png" class="icon" @click="handleClick" />
			</template>
		</Nav>
		<view class="recharge_fees">
			<view class="title">{{$t('充值电费')}}</view>
			<view class="box">
				<text class="num">{{$t('数量')}}</text>
				<Field v-model="amount" type="number" :placeholder="$t('请输入')" class="ipt">
					<template #button>
						<text>USDT</text>
					</template>
				</Field>
				<view class="info">
					<text>{{$t('您有')}}</text>
					<text class="usable">{{dealNumber(rest.available, 2)}}</text>
					<text>{{$t('USDT可用')}}</text>
					<text class="all" @click="handleAll">{{$t('全部')}}</text>
				</view>
				<view class="sure" @click="handleSure" :style="{backgroundColor:amount ? '#05AA84' :'#ADDAD0'}">{{$t('确认充值')}}</view>
			</view>
		</view>
		<InputModel :options="options" />
	</view>
</template>

<script setup>
	import { ref, reactive, onMounted } from 'vue';
	import { Field } from 'vant';
	import { dealNumber } from '@/utils/index.js';
	import InputModel from '@/pages/component/InputModel/index.vue';
	import Nav from '@/pages/component/Nav/index.vue';
	import I18n from '@/hooks/useLocale.js';
	import Toast from '@/hooks/useToast.js';
	import { rechargeFees } from '@/services/mine.js';
	import { getAssets } from '@/services/other.js';
	let amount = ref('');
	let rest = ref({});

	let options = reactive({
		isShow: false,
		type: 'password',
		title: '',
		amount: '',
		callback: callback
	})

	function handleAll() {
		amount.value = dealNumber(rest.value.available, 2);
	}

	function handleSure() {
		if (!amount.value) return;

		if (Number(amount.value) > rest.value.available) {
			Toast.show(I18n.t('余额不足'))
			return;
		}

		options.isShow = true;
		options.title = I18n.t('充值电费');
		options.amount = amount.value + " USDT";
	}

	function callback(password) {
		Toast.show(I18n.t('正在充值'), {
			type: 'loading'
		})
		rechargeFees({ amount: Number(amount.value), pin: password }).then(res => {
			if (res.code === 0) {
				amount.value = '';
				Toast.closeToast();
				uni.navigateTo({
					url: `/pages/Mine/electric/remindSuccess?title=${I18n.t('充值成功')}`
				})
			} else {
				Toast.show(res.message)
			}
		})
	}

	function loadData() {
		getAssets().then(res => {
			if (res.code === 0) {
				rest.value = res.data.find(item => item.currency === 'USDT');
			}
		})
	}

	function handleClick() {
		history.back();
	}

	onMounted(() => {
		loadData();
	})
</script>

<style lang="scss" scoped>
	.recharge_main {
		height: 100%;
		@include flex(null, null, column);

		.recharge_header {
			.icon {
				width: 23px;
				height: 17px;
			}
		}

		.recharge_fees {
			flex: 1;
			padding: 15px;
			overflow-y: auto;

			.title {
				font-size: 25px;
				font-weight: bold;
				color: #333;
			}

			.box {
				box-shadow: 0px 0px 10px -6px #000;
				border-radius: 15px;
				padding: 15px;
				background-color: #fff;
				margin-top: 20px;

				.ipt {
					border: 1px solid #DFDFDF;
					border-radius: 12px;
					padding-top: 12px;
					padding-bottom: 12px;
					margin-top: 10px;
					margin-bottom: 12px;
				}

				.num {
					font-size: 14px;
					color: #666;
				}

				.info {
					color: #666;
					font-size: 15px;

					.usable {
						color: green;
						font-weight: bold;
						margin-left: 4px;
						margin-right: 4px;
					}

					.all {
						color: #05AA84;
						margin-left: 15px;
						font-weight: 800;

						&:active {
							opacity: 0.6;
						}
					}
				}

				.sure {
					text-align: center;
					color: #fff;
					padding: 14px 0;
					margin: 25px 30px 15px;
					border-radius: 15px;
					box-shadow: 0px 0px 10px -6px #000;
					font-size: 17px;

					&:active {
						opacity: 0.7;
					}
				}
			}
		}
	}
</style>