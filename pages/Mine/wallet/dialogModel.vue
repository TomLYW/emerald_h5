<template>
	<Overlay :show="open" @click="onClick">
		<view #default class="content" v-show="type">
			<view class="box" @click.stop="onJump('USDT')">
				<image src="/static/mine//pop_icon_usdt.png" class="icon" />
				<text>USDT</text>
			</view>
			<view class="box bdt" v-show="type !== 'recharge'" @click.stop="onJump('BTC')">
				<image src="/static/mine//pop_icon_btc.png" class="icon" />
				<text>BTC</text>
			</view>
			<view class="box bdt" v-show="type !== 'recharge'" @click.stop="onJump('ETH')">
				<image src="/static/mine/pop_icon_eth.png" class="icon" />
				<text>ETH</text>
			</view>
		</view>
	</Overlay>
</template>

<script setup>
	import { Overlay } from 'vant';
	const props = defineProps({
		type: String,
		open: Boolean,
	})
	const emit = defineEmits(['update:open', 'update:type']);

	function onClick() {
		emit('update:open', false);
		emit('update:type', '');
	}

	function onJump(val) {
		onClick();
		uni.navigateTo({
			url: val === 'USDT' && props.type === 'recharge' ? `/pages/Mine/wallet/rechargeUsdt?type=${val}` :
				`/pages/Mine/wallet/cashPage?type=${val}`
		})
	}
</script>

<style lang="scss" scoped>
	.content {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		margin-left: 15px;
		margin-right: 15px;
		margin-bottom: 40px;
		background-color: #fff;
		border-radius: 15px;
		padding-left: 40px;
		padding-right: 40px;

		.box {
			@include flex(center);
			padding-top: 15px;
			padding-bottom: 15px;
			font-weight: bold;

			&:active {
				opacity: 0.6;
			}

			.icon {
				width: 24px;
				height: 24px;
				margin-right: 12px;
			}
		}

		.bdt {
			border-top: 1px solid #E3E3E3;
		}
	}
</style>