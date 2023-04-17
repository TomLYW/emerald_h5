<template>
	<view class="record_cell">
		<view class="left">
			<Avatar size="45" :src="item.user.avatar" />
			<view class="left_text">
				<text class="user">{{item.user.nickname}}</text>
				<text class="number">+{{item.user.areaCode}} {{phoneEncryption(item.user.tel)}}</text>
			</view>
		</view>
		<view>
			<text class="amount">+ {{dealNumber(item.amount,2)}} USDT</text>
			<text class="right_text">{{$t('佣金')}}</text>
		</view>
	</view>
</template>

<script setup>
	import Avatar from '@/pages/component/Avatar/index.vue';
	import {
		dealNumber,
		phoneEncryption
	} from '@/utils/index.js';
	const {
		item
	} = defineProps({
		item: Object
	})
</script>

<style lang="scss" scoped>
	.record_cell {
		border-radius: 12px;
		padding: 12px;
		box-shadow: 0px 0px 10px -6px #000;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #fff;

		.left {
			display: flex;
			align-items: center;

			.left_text {
				margin-left: 10px;

				.user {
					color: #333;
				}

				.number {
					display: block;
					margin-top: 7px;
					color: #999;
					font-size: 13px;
				}
			}
		}

		.amount {
			color: #FF8519;
			font-weight: 900;
		}

		.right_text {
			display: block;
			text-align: right;
			margin-top: 7px;
			color: #999;
			font-size: 13px;
		}
	}
</style>