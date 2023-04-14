<template>
	<view class="cell" @click="handleClick">
		<view class="tag" :style="{backgroundColor: getMealType(item.type).bgColor}">
			<text class="tag-title">{{getMealType(item.type).text}}</text>
		</view>
		<view class="caption">
			<view class="log">
				<image class="icon"
					:src="item.currency === 'BTC' ? '/static/home/home_icon_btc.png':'/static/home/home_icon_eth.png'" />
				<text class="name">{{item.name + item.model}}</text>
				<view class="tagCount">X2</view>
			</view>
			<text class="amount">{{item.price}}</text>
			<text class="sub-title">{{$t('总产量')}}(BTC)</text>
		</view>
		<view class="line" />
		<view class="bottom">
			<view>
				<text class="left">{{$t('到期时间：')}}</text>
				<text class="right">{{formatDate('2022-11-09','YYYY-MM-DD')}}</text>
			</view>
			<text>已生效</text>
		</view>
	</view>
</template>

<script setup>
	import {
		getMealType
	} from '@/services/cloud.js';

	import {
		accMul,
		formatDate,
		unroundNumber
	} from '@/utils/index.js';
	import I18n from '@/hooks/useLocale.js';
	const {
		item
	} = defineProps({
		item: Object
	})
	const px = uni.getLocale() === 'cn' ? '12px' : '4px';

	function getStateStr() {
		switch (item.status) {
			case 'pending':
				return I18n.t('未生效');
			case 'activated':
				return I18n.t('已生效');
			case 'standby':
				return I18n.t('已停止');
			case 'destroyed':
				return I18n.t('已过期');
			default:
				return '-';
		}
	}

	function getStateColor() {
		switch (item.status) {
			case 'pending':
				return '#999999';
			case 'activated':
				return '#05AA84';
			case 'standby':
				return '#FF4040';
			case 'destroyed':
				return '#999999';
			default:
				return '#999999';
		}
	}

	function handleClick() {
		uni.navigateTo({
			url: '/pages/Order/OrderPowerMore/index'
		})
	}
</script>

<style lang="scss" scoped>
	.cell {
		border-radius: 15px;
		background-color: #fff;
		box-shadow: 0px 0px 10px -6px #000;

		.tag {
			display: inline-block;
			padding: 1px v-bind('px');
			background-color: #05AA84;
			border-top-left-radius: 15px;
			border-bottom-right-radius: 15px;

			.tag-title {
				font-size: 12px;
				color: #fff;
			}
		}

		.caption {
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: 15px;

			.log {
				display: flex;
				align-items: center;

				.icon {
					height: 17px;
					width: 17px;
				}

				.name {
					font-weight: bold;
					font-size: 18px;
					margin-left: 6px;
					margin-right: 6px;
				}

				.tagCount {
					background-color: #FF8519;
					border-top-left-radius: 6px;
					border-bottom-right-radius: 6px;
					font-size: 10px;
					color: #fff;
					padding: 0px 4px;
				}
			}

			.amount {
				font-size: 36px;
				font-weight: bold;
				color: #05AA84;
				margin-top: 10px;
			}

			.sub-title {
				font-size: 13px;
				color: #999;
			}
		}

		.line {
			height: 0.5px;
			background-color: #CFCFCF;
			margin-left: 15px;
			margin-right: 15px;
		}

		.bottom {
			height: 50px;
			padding: 0 15px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 13px;

			.left {
				color: #999;
			}

			.right {
				font-weight: bold;
				color: #333;
			}
		}
	}
</style>