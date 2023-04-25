<template>
	<scroll-view scroll-y="true" style="height: 100%;">
		<view class="mine">
			<view class="header">
				<view class="left" @click="handleLeft">
					<view class="circle">
						<Avatar size="52" :src="userInfo.avatar" />
					</view>
					<view class="left_text">
						<text class="top">{{!isLogin ? $t('立即登录') : userInfo.nickname}}</text>
						<text class="bottom">{{!isLogin ? $t('欢迎来到Emerald') : emailEncryption(userInfo.email)}}</text>
					</view>
				</view>
				<view class="right">
					<image src="/static/mine/profile_icon_set.png" class="icon" @click="handleClick" />
				</view>
			</view>
			<SelectCell :options="options5">
				<template #bottom>
					<view class="wallet" v-if="isLogin">
						<view class="wallet_item" v-for="item in data.assets" :key="item.currency">
							<text class="sum">{{unroundNumber(item.available, (item.currency === 'USDT' ? 2 : 8))}}</text>
							<text>{{item.currency}}</text>
						</view>
					</view>
					<view class="wallet" v-else>
						<view class="wallet_item" v-for="item in ['ETH','BTC','USDT']" :key="item">
							<text class="sum">0.000000</text>
							<text>{{item}}</text>
						</view>
					</view>
				</template>
			</SelectCell>
			<SelectCell :options="options4" class="invite">
				<template #right1>
					<text class="fee">{{isLogin ? dealNumber(data.balance.available,2) : '0.00'}}</text>
				</template>
			</SelectCell>
			<SelectCell :options="options3" class="invite">
				<template #bottom>
					<view class="map" v-if="'BTC' in data.lines">
						<Echarts :data='data.lines' />
					</view>
					<view class="echarts_empty" v-else>{{$t('暂无数据')}}</view>
				</template>
			</SelectCell>
			<SelectCell :options="options2" class="invite" v-show="isLogin" />
			<SelectCell :options="options1" class="invite" />
		</view>
	</scroll-view>
</template>

<script setup>
	import { reactive, onMounted } from 'vue';
	import SelectCell from '@/pages/component/SelectCell/index.vue';
	import Avatar from '@/pages/component/Avatar/index.vue';
	import Echarts from '@/pages/Mine/census/ecahrts.vue';
	import { useUserStore } from '@/store/user.js';
	import { emailEncryption, dealNumber, unroundNumber } from '@/utils/index.js';
	import { getYieldLines } from '@/services/mine.js';
	import { getElectricBalance, getAssets } from '@/services/other.js';
	const { isLogin, userInfo } = useUserStore();

	let data = reactive({
		lines: {},
		balance: {},
		assets: []
	})

	const options1 = [{
			label: '帮助中心',
			icon: '/static/mine/profile_icon_help.png',
		},
		{
			label: '联系客服',
			icon: '/static/mine/profile_icon_service.png'
		},
		{
			label: 'about_us',
			icon: '/static/mine/profile_icon_about.png',
			url: '/pages/Mine/AboutUs/index'
		},
	]

	const options2 = [{
		label: 'invite',
		icon: '/static/mine/profile_icon_referral.png',
		url: '/pages/Mine/invite/index'
	}]

	const options3 = [{
		label: '数据统计',
		icon: '/static/mine/profile_icon_data.png',
		callback: handleJump('census')
	}]

	const options4 = [{
		label: '电费(USDT)',
		icon: '/static/mine/profile_icon_fee.png',
		callback: handleJump('electric')
	}]

	const options5 = [{
		label: '我的钱包',
		icon: '/static/mine/profile_icon_wallet.png',
		callback: handleJump('wallet')
	}]

	function handleClick() {
		uni.navigateTo({
			url: isLogin ? '/pages/Mine/setting/index' : '/pages/Login/index'
		})
	}

	function handleLeft() {
		if (!isLogin) {
			uni.navigateTo({
				url: '/pages/Login/index'
			})
		}
	}

	function handleJump(path) {
		return () => {
			if (isLogin) {
				uni.navigateTo({
					url: `/pages/Mine/${path}/index`
				})
			} else {
				uni.navigateTo({
					url: '/pages/Login/index'
				})
			}
		}
	}

	function loadData() {
		getYieldLines().then(res => {
			if (res.code === 0) {
				data.lines = res.data;
			}
		})

		getElectricBalance().then(res => {
			if (res.code === 0) {
				data.balance = res.data;
			}
		})

		getAssets().then(res => {
			if (res.code === 0) {
				data.assets = res.data;
			}
		})
	}

	onMounted(() => {
		if (isLogin) {
			loadData();
		}
	})
</script>

<style lang="scss" scoped>
	.mine {
		height: 100%;
		overflow-y: auto;
		padding: 0px 15px 20px;
		background-image: url('/static/mine/header_image.png');
		background-repeat: no-repeat;
		background-size: 100% 136px;

		.header {
			padding-bottom: 15px;
			padding-top: 6px;
			@include flex(null, space-between);

			.right {
				.icon {
					width: 23px;
					height: 20px;

					&:active {
						opacity: 0.6;
					}
				}
			}

			.left {
				display: flex;

				.left_text {
					margin-left: 10px;
					color: #fff;

					.top {
						font-size: 20px;
						font-weight: bold;
					}

					.bottom {
						display: block;
						font-size: 15px;
						margin-top: 6px;
						opacity: 0.6;
					}
				}

				.circle {
					width: 52px;
					height: 52px;
					border-radius: 50%;
					border: 2px solid #fff;
				}
			}
		}

		.invite {
			margin-top: 15px;
		}

		.fee {
			margin-right: 10px;
			font-size: 19px;
			font-weight: bold;
		}

		.echarts_empty {
			height: 170px;
			text-align: center;
			line-height: 170px;
			color: #6F6F6F;
			font-size: 15px;
		}

		.wallet {
			display: flex;
			margin-top: 22px;

			.wallet_item {
				flex: 1;
				@include flex(null, space-between, column);
				color: #666;
				font-size: 13px;
				font-weight: bold;
				word-break: break-all;

				.sum {
					margin-bottom: 9px;
					color: #333;
					font-size: 16px;
				}
			}
		}
	}
</style>