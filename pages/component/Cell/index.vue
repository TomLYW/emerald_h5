<template>
	<view class="cell">
		<view class="cell_left">
			<text>{{item.currency}}</text>
			<text class="date">{{formatDate(item.createdAt)}}</text>
		</view>
		<slot>
			<view class="cell_right">+{{item.yield}}</view>
		</slot>
	</view>
</template>

<script setup>
	import {
		formatDate
	} from '@/utils/index.js';
	const {
		item
	} = defineProps({
		item: Object
	})
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

		&:active {
			opacity: 0.6;
		}

		.cell_left {
			display: flex;
			flex-direction: column;

			.date {
				color: #999;
				font-size: 13px;
				margin-top: 6px;
			}
		}

		.cell_right {
			font-weight: bold;
			font-size: 14px;
		}
	}
</style>