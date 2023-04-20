<template>
	<view class="cell">
		<view class="cell_left">
			<text>{{getType()}}</text>
			<text class="common_bottom">{{formatDate(item.createdAt,'YYYY-MM-DD HH:mm')}}</text>
		</view>
		<view class="cell_right">
			<text class="right_top">{{getAmount()}}</text>
			<text class="common_bottom"
				v-show="type === undefined && item.type === 'withdrawal'">{{$t('手续费:')}}{{dealNumber(item.fees, 8)}}{{item.currency}}</text>
		</view>
	</view>
</template>

<script setup>
	import { formatDate } from '@/utils/index.js';
	import { dealNumber } from '@/utils/index.js';
	import I18n from '@/hooks/useLocale.js';

	const { item, type } = defineProps({
		item: Object,
		type: String
	})

	function getPoint(type) {
		return type === "USDT" ? 2 : 8;
	}

	function getType() {
		//recharge充值/withdrawal提现/electric电费/income收益/consume消费/commission佣金/transfer
		if (type === undefined) {
			if (item.type === 'recharge') {
				return I18n.t('充值');
			} else if (item.type === 'withdrawal') {
				return I18n.t('提现');
			} else if (item.type === 'electric') {
				return I18n.t('充值电费');
			} else if (item.type === 'income') {
				return I18n.t('挖矿收益');
			} else if (item.type === 'consume') {
				return I18n.t('购买云算力套餐');
			} else if (item.type === 'commission') {
				return I18n.t('佣金');
			} else if (item.type === 'transfer') {
				return I18n.t('活动');
			} else {
				return I18n.t('产出') + item.currency;
			}
		} else {

			//recharge/gift/consume
			if (item.type === 'recharge') {
				return I18n.t('充值电费');
			} else if (item.type === 'gift') {
				return I18n.t('赠送电费');
			} else if (item.type === 'consume') {
				return I18n.t('扣除电费');
			} else {
				return I18n.t('未知')
			}
		}
	}

	function getAmount() {

		if (type === undefined) {
			//recharge充值/withdrawal提现/electric电费/income收益/consume消费/commission佣金/tranfer活动
			if (item.type === 'recharge') {
				return '+' + Number(item.amount).toFixed(getPoint(item.currency)) + ' ' + item.currency;
			} else if (item.type === 'withdrawal') {
				return Number(item.amount).toFixed(getPoint(item.currency)) + ' ' + item.currency;
			} else if (item.type === 'electric') {
				return Number(item.amount).toFixed(getPoint(item.currency)) + ' ' + item.currency;
			} else if (item.type === 'income') {
				return '+' + Number(item.amount).toFixed(getPoint(item.currency)) + ' ' + item.currency;
			} else if (item.type === 'consume') {
				return Number(item.amount).toFixed(getPoint(item.currency)) + ' ' + item.currency;
			} else if (item.type === 'commission') {
				return '+' + Number(item.amount).toFixed(getPoint(item.currency)) + ' ' + item.currency;
			} else if (item.type === 'transfer') {
				if (Number(item.amount) > 0) {
					return '+' + Number(item.amount).toFixed(getPoint(item.currency)) + ' ' + item.currency;
				} else {
					return Number(item.amount).toFixed(getPoint(item.currency)) + ' ' + item.currency;
				}
			} else {
				return Number(item.amount).toFixed(getPoint(item.currency)) + ' ' + item.currency;
			}
		} else {
			//recharge/gift/consume
			if (item.type === 'recharge') {
				return '+' + dealNumber(Number(item.amount), 2) + ' ' + 'USDT';
			} else if (item.type === 'gift') {
				return '+' + Number(item.amount).toFixed(2) + ' ' + 'USDT';
			} else if (item.type === 'consume') {
				return Number(item.amount).toFixed(2) + ' ' + 'USDT';
			} else {
				return dealNumber(Number(item.amount), 2) + ' ' + 'USDT';
			}
		}
	}
</script>

<style lang="scss" scoped>
	.cell {
		padding: 8px 15px;
		border-radius: 15px;
		box-shadow: 0px 4px 10px -8px;
		background-color: #fff;
		display: flex;
		justify-content: space-between;
		align-items: center;
		opacity: 0.9;

		.cell_left {
			display: flex;
			flex-direction: column;
		}

		.cell_right {
			@include flex(flex-end, null, column);

			.right_top {
				font-weight: bold;
				font-size: 15px;
				color: #666;
			}
		}

		.common_bottom {
			font-size: 13px;
			color: #999;
			margin-top: 6px;
		}
	}
</style>