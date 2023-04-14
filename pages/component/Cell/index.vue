<template>
	<view class="cell">
		<view class="cell_left">
			<text>BTC</text>
			<text class="date">{{formatDate('2023-01-23 12:43:45')}}</text>
		</view>
		<view class="cell_right">还是就会附件是</view>
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