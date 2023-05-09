<template>
	<view class="wallet">
		<Nav :title="$t('我的钱包')" class="header">
			<template #left>
				<image src="/static/base/title_leftarrow_white.png" class="icon" @click="handleClick" />
			</template>
		</Nav>
		<view class="card">
			<text class="card_1">{{$t('账户余额(USDT)')}}</text>
			<view class="card_2">≈{{getBalance()}}</view>
			<view>
				<text class="btn_1" @click="handleRecharge">{{$t('充值')}}</text>
				<text class="btn_2" @click="handleCash">{{$t('提现')}}</text>
			</view>
		</view>
		<view class="wallet_content">
			<CustomTitle :title="$t('资产列表')" class="mid_title" />
			<view class="asset_list">
				<view class="list_item" v-for="item in data.assets" :key="item.currency">
					<view class="item_left">
						<image :src="getImg(item.currency)" class="img" />
						<text>{{item.currency}}</text>
					</view>
					<text>{{unroundNumber(item.available,(item.currency === 'USDT' ? 2 : 8))}}</text>
				</view>
			</view>
			<view class="bottom_title">
				<CustomTitle :title="$t('asset_r')" class="left" />
				<text class="right" @click="handleMore">{{$t('查看更多')}}</text>
			</view>
			<view v-if="data.list.length">
				<CensusCell v-for="item in data.list" :key="item.id" :item="item" class="record_item" />
			</view>
			<NoData hideBtn style="height: inherit; margin-bottom: 20px;" v-else />
		</view>
		<DialogModel v-model:open='data.open' v-model:type="data.type" :assets="data.assets" />
	</view>
</template>

<script setup>
	import { onShow } from "@dcloudio/uni-app";
	import Nav from '@/pages/component/Nav/index.vue';
	import CustomTitle from '@/pages/component/CustomTitle/index.vue';
	import CensusCell from '@/pages/component/CensusCell/index.vue';
	import NoData from '@/pages/component/NoData/index.vue';
	import { reactive } from 'vue';
	import Toast from '@/hooks/useToast.js';
	import I18n from '@/hooks/useLocale.js';
	import { getAssetLogs } from '@/services/mine.js';
	import { dealNumber, unroundNumber } from '@/utils/index.js';
	import DialogModel from '@/pages/Mine/wallet/dialogModel.vue';
	import { getAssets } from '@/services/other.js';
	let data = reactive({
		list: [],
		assets: [],
		open: false,
		type: '',
	});

	function getBalance() {
		let amount = 0;

		for (let i = 0; i < data.assets.length; i++) {
			let item = data.assets[i];
			if (item.currency === 'USDT') {
				amount += Number(item.available);
			} else {
				amount += Number(item.available) * item.price;
			}
		}

		return dealNumber(amount, 2);
	};

	function getImg(type) {
		switch (type) {
			case 'USDT':
				return '/static/mine/wallet_icon_usdt.png';
			case 'BTC':
				return '/static/mine/wallet_icon_btc.png';
			default:
				return '/static/mine/wallet_icon_eth.png';
		}
	}

	function getData() {
		getAssetLogs({ page: 1, limit: 3 }).then(res => {
			if (res.code === 0) {
				data.list = res.data;
			}
		})

		getAssets().then(res => {
			if (res.code === 0) {
				data.assets = res.data;
			}
		})
	}

	function handleClick() {
		uni.switchTab({
			url: '/pages/Mine/index'
		})
	}

	function handleRecharge() {
		data.type = 'recharge';
		data.open = true;
	}

	function handleCash() {
		data.type = 'cash';
		data.open = true;
	}

	function handleMore() {
		uni.navigateTo({
			url: '/pages/Mine/wallet/assetRecords'
		})
	}

	onShow(() => {
		getData();
	})
</script>

<style lang="scss" scoped>
	.wallet {
		height: 100%;
		@include flex(null, null, column);
		background-image: url('/static/mine/header_image.png');
		background-repeat: no-repeat;
		background-size: 100% 136px;

		.header {
			color: #fff;

			.icon {
				width: 23px;
				height: 17px;
			}
		}

		.card {
			box-shadow: 0px 0px 10px -6px #000;
			border-radius: 15px;
			margin-left: 15px;
			margin-right: 15px;
			margin-top: 20px;
			padding: 20px;
			background-image: url('/static/mine/profile_img_banner_pic.png');
			background-repeat: no-repeat;
			background-size: 60% 100%;
			background-position: right;
			background-color: #E3F3F4;

			.card_1 {
				font-size: 14px;
				color: #666;
			}

			.card_2 {
				font-size: 26px;
				font-weight: bold;
				color: #333;
				margin-top: 10px;
				margin-bottom: 16px;
			}

			.common_btn {
				color: #fff;
				padding: 6px 30px;
				border-radius: 6px;
				box-shadow: 0px 0px 10px -6px #000;

				&:active {
					opacity: 0.6;
				}
			}

			.btn_1 {
				@extend .common_btn;
				background-color: #05AA84;
			}

			.btn_2 {
				@extend .common_btn;
				background-color: #00BDFF;
				margin-left: 20px;
			}
		}

		.wallet_content {
			flex: 1;
			overflow-y: auto;

			.mid_title {
				margin-left: 15px;
				margin-right: 15px;
			}

			.asset_list {
				margin-left: 15px;
				margin-right: 15px;

				.list_item {
					border-radius: 15px;
					box-shadow: 0px 0px 10px -6px #000;
					background-color: #fff;
					padding: 15px;
					@include flex(center, space-between);
					color: #7D7D7D;
					margin-top: 18px;

					.item_left {
						@include flex(center);

						.img {
							width: 45px;
							height: 45px;
							margin-right: 10px;
						}
					}
				}
			}

			.bottom_title {
				@include flex(center, space-between);
				margin-left: 15px;
				margin-right: 15px;

				.right {
					color: #666;

					&:active {
						opacity: 0.6;
					}
				}
			}

			.record_item {
				margin: 0px 15px 15px;
			}
		}
	}
</style>