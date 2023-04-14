<template>
	<view class="output_details">
		<view class="top">
			<image src="/static/order/mining_img.png" class="img" />
		</view>
		<view class="item">
			<text>{{$t('计划产出')}}</text>
			<text class="gray">1.324241 BTC</text>
		</view>
		<view class="item">
			<text>{{$t('电费消耗')}}</text>
			<text class="gray">1.324241 USDT</text>
		</view>
		<view class="item">
			<text>{{$t('抵扣价格')}}</text>
			<text class="gray">1.324241 USDT</text>
		</view>
		<view class="item">
			<text>{{$t('抵扣数量')}}</text>
			<text class="gray">1.324241 BTC</text>
		</view>
		<view class="item">
			<text>{{$t('实际产出')}}</text>
			<text class="fw">1.324241 BTC</text>
		</view>
		<view class="item">
			<text>{{$t('产出时间')}}</text>
			<text class="gray">{{formatDate('2034-05-23 23:43:12')}}</text>
		</view>
	</view>
</template>

<script setup>
	import {
		formatDate
	} from '@/utils/index.js';
</script>

<style lang="scss" scoped>
	.output_details {
		padding: 15px;

		.top {
			text-align: center;
			margin-bottom: 30px;

			.img {
				width: 137px;
				height: 138px;
			}
		}

		.item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 15px;

			.gray {
				color: #999;
				font-size: 14px;
			}

			.fw {
				font-weight: bold;
			}
		}
	}
</style>