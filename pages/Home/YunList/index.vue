<template>
	<view class="container">
		<view class="cell">
			<view class="tag">
				<text class="tag-title">经典套餐</text>
			</view>

			<view class="caption">
				<view class=""></view>
				<text></text>
			</view>
			<view class="line" />
			<view class="info"></view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	const px = uni.getLocale() === 'cn' ? '12px' : '4px';
</script>

<style lang="scss" scoped>
	.container {
		padding: 20px;
	}

	.cell {
		// display: flex;
		// flex-direction: column;
		height: 150px;
		border-radius: 15px;
		background-color: #E5E5E5;
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
	}
</style>