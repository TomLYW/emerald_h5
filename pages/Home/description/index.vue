<template>
	<scroll-view scroll-y="true" style="height: 100%;" @scroll="handleScroll">
		<view class="container">
			<text class="topic">{{$t('goods_d')}}</text>
			<view class="first-card">
				<text class="title">
					{{pageData.name + pageData.model}}
				</text>
				<view class="side_1">
					<text class="item_1">{{$t('已售')}}</text>
					<text class="item_2">{{percent.toFixed(0)}}%</text>
				</view>
				<view class="progress" v-if="percent > -1">
					<Progress :percentage="percent" stroke-width="7" track-color="#ECEFFF" color="#05AA84" :show-pivot='false' />
				</view>
				<view class="side_2">
					<view>
						<text class="left_1">{{accMul(pageData.yieldRate,100).toFixed(2)}}%</text>
						<text class="common">{{$t('历史产出率')}}</text>
					</view>
					<view>
						<text class="right_1">{{Number(pageData.price).toFixed(2)}} U</text>
						<text class="common tar">{{$t('价格')}}</text>
					</view>
				</view>
			</view>
			<SelectAmount :stock="pageData.stock" v-model="amount" v-if="pageData.stock > -1" />
			<CustomTitle :title="$t('算力详情')" />
			<view class="last-card">
				<view class="card_item">
					<text>{{$t('套餐类型')}}</text>
					<text class="item_right c5A">{{getMealType(pageData.type).text}}</text>
				</view>
				<view class="card_item">
					<text>{{$t('产出币种')}}</text>
					<view class="item_right">
						<image :src="pageData.currency === 'BTC' ? '/static/home/home_icon_btc.png' : '/static/home/home_icon_eth.png'"
							class="icon" />
						<text>{{pageData.currency}}</text>
					</view>
				</view>
				<view class="card_item">
					<text>{{$t('服务费用')}}</text>
					<text class="item_right">{{accMul(pageData.serviceFees,100).toFixed(2)}}%</text>
				</view>
				<view class="card_item">
					<text>{{$t('周期')}}</text>
					<text class="item_right">{{pageData.duration + $t('天')}}</text>
				</view>
				<view class="card_item">
					<text>{{$t('规格')}}</text>
					<text class="item_right">{{pageData.power}} {{pageData.currency === 'BTC' ? 'TH/s' : 'MH/s'}}</text>
				</view>
				<view class="card_item">
					<text>{{$t('发售日期')}}</text>
					<text class="item_right">{{formatDate(pageData.saleTime)}}</text>
				</view>
				<view class="card_item">
					<text>{{$t('部署日期')}}</text>
					<text class="item_right">{{formatDate(pageData.deployTime)}}</text>
				</view>
				<view class="card_item">
					<text>{{$t('生效日期')}}</text>
					<text class="item_right">{{formatDate(pageData.effectTime)}}</text>
				</view>
			</view>
			<BottomTips />
			<view class="buy">
				<view class="left">
					<text class="price">{{accMul(pageData.price,amount).toFixed(2)}} U</text>
					<text class="text">{{$t('价格')}}</text>
				</view>
				<text class="right_btn" :style="{backgroundColor:!buyButtonState() ? '#ADDAD0' : '#05AA84'}" @click="handleBuy">{{$t('立即购买')}}</text>
			</view>
		</view>
		<InputModel :options="options" />
	</scroll-view>
</template>

<script setup>
	import CustomTitle from '@/pages/component/CustomTitle/index.vue';
	import SelectAmount from '@/pages/Home/description/selectAmount.vue';
	import BottomTips from '@/pages/Home/description/bottomTips.vue';
	import I18n from '@/hooks/useLocale.js';
	import Toast from '@/hooks/useToast.js';
	import InputModel from '@/pages/component/InputModel/index.vue';
	import {
		getMinerDetails,
		getMealType,
		buyCloudMiner
	} from '@/services/cloud.js';
	import {
		accMul,
		formatDate,
		whetherLogin,
		whetherSetPin,
		whetherExceedDate
	} from '@/utils/index.js';
	import {
		ref,
		computed,
		reactive
	} from 'vue';
	import {
		onLoad
	} from '@dcloudio/uni-app';
	import {
		Progress
	} from 'vant';

	let flag = ref(false);
	let pageData = ref({});
	let amount = ref(0);
	let id = ref(0);

	let options = reactive({
		isShow: false,
		type: 'password',
		title: '',
		amount: '',
		callback: callback
	})

	const percent = computed(() => {
		return (pageData.value.sold / (pageData.value.sold + pageData.value.stock)) * 100;
	})

	function buyButtonState() {
		if (pageData.value.stock === 0 || whetherExceedDate(pageData.value.saleTime) === false || whetherExceedDate(
				pageData.value.deployTime) === true) {
			return false;
		}
		return true;
	}

	function handleBuy() {
		if (whetherLogin() === false) {
			return;
		}

		if (pageData.value.stock === 0) {
			Toast.show(I18n.t("已售罄"))
			return;
		}

		//判断是否发售
		if (whetherExceedDate(pageData.value.saleTime) === false) {
			Toast.show(I18n.t("即将发售"))
			return;
		}

		//判断是否结束出售
		if (whetherExceedDate(pageData.value.deployTime)) {
			Toast.show(I18n.t("已过发售时间"))
			return;
		}

		// if (Number(pageData.value.price) * amount.value > Number(asset.available)) {
		if (pageData.value.price * amount.value > 10) {
			Toast.show(I18n.t("USDT余额不足"))
			return;
		}

		if (whetherSetPin() === false) {
			return;
		}

		options.isShow = true;
		options.title = I18n.t('购买云算力');
		options.amount = accMul(pageData.value.price, amount.value).toFixed(2) + ' USDT';
	}

	function callback(val) {
		buyCloudMiner({
			id: id.value,
			numbers: amount.value,
			pin: val
		}).then(res => {
			if (res.code === 0) {
				options.isShow = false;
				getData(id.value);
				uni.navigateTo({
					url: `/pages/Mine/electric/remindSuccess?title=${I18t.t('购买成功')}`
				})
			} else {
				Toast.show(res.message);
			}
		})
	}

	function handleScroll(e) {
		if (e.detail.scrollTop === 0) {
			uni.setNavigationBarTitle({
				title: ''
			});

			flag.value = false;
		} else {
			if (!flag.value) {
				uni.setNavigationBarTitle({
					title: I18n.t('goods_d')
				});

				flag.value = true;
			}
		}
	}

	function getData(id) {
		getMinerDetails({
			id
		}).then(res => {
			if (res.code === 0) {
				pageData.value = res.data;
			}
		})
	}

	onLoad((option) => {
		getData(option.id);
		id.value = option.id;
	})
</script>

<style lang="scss" scoped>
	.c5A {
		color: #05AA84 !important;
	}

	.container {
		padding: 15px;

		.topic {
			font-weight: bold;
			font-size: 24px;
		}


		.first-card {
			border-radius: 15px;
			box-shadow: 0px 0px 10px -8px;
			margin-top: 15px;
			margin-bottom: 15px;
			background-color: #fff;
			padding: 12px;

			.title {
				color: #333;
				font-weight: bold;
				font-size: 20px;
			}

			.side_1 {
				text-align: right;
				@include flex(center, flex-end);

				.item_1 {
					color: #999;
					font-size: 11px;
				}

				.item_2 {
					color: #05AA84;
					font-size: 15px;
					font-weight: bold;
				}
			}

			.progress {
				margin-top: 10px;
				margin-bottom: 10px;
			}

			.side_2 {
				@include flex(center, space-between);

				.common {
					display: block;
					color: #999;
					font-size: 12px;
					margin-top: 8px;
				}

				.tar {
					text-align: right;
				}

				.left_1 {
					font-size: 18px;
					color: #05AA84;
					font-weight: bold;
				}

				.right_1 {
					color: #FF8519;
					font-weight: bold;
					font-size: 18px;
				}
			}
		}

		.last-card {
			border-radius: 15px;
			box-shadow: 0px 0px 10px -8px;
			padding: 15px 15px 1px;
			background-color: #fff;

			.card_item {
				font-size: 14px;
				color: #808080;
				margin-bottom: 15px;
				@include flex(center, space-between);

				.item_right {
					font-weight: bold;
					color: #333;

					.icon {
						width: 17px;
						height: 17px;
						vertical-align: top;
						margin-right: 5px;
					}
				}
			}
		}

		.buy {
			height: 60px;
			width: 100%;
			background-color: #fff;
			position: fixed;
			bottom: 0;
			left: 0;
			@include flex(center, space-between);

			.left {
				margin-left: 15px;
				@include flex(null, null, column);

				.price {
					color: #FF8519;
					font-weight: bold;
					font-size: 20px;
				}

				.text {
					font-size: 13px;
					color: #999;
				}
			}

			.right_btn {
				margin-right: 15px;
				// background-color: #ADDAD0;
				padding: 9px 42px;
				color: #fff;
				border-radius: 12px;
			}
		}
	}
</style>