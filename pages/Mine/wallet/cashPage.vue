<template>
	<scroll-view scroll-y="true" style="height: 100%;">
		<view class="cash_page">
			<view class="title">{{$t('提现') + type}}</view>
			<view class="box">
				<view class="box_item">
					sfsdf
				</view>
				<view class="box_item">
					sfsdf
				</view>
			</view>
		</view>
	</scroll-view>
</template>

<script setup>
	import { onLoad } from '@dcloudio/uni-app';
	import { ref } from 'vue';
	let type = ref('');

	onLoad((option) => {
		type.value = option.type;
	})
</script>

<style lang="scss" scoped>
	.cash_page {
		padding: 15px;

		.title {
			font-weight: bold;
			font-size: 24px;
			color: #333;
		}

		.box {
			background-color: #fff;
			padding: 15px;
			border-radius: 15px;
			box-shadow: 0px 0px 10px -6px #000;

		}
	}
</style>