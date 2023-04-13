<template>
	<view class="custom-title">
		<image src='/static/home/title_icon.png' class="bar" />
		<text class="tip">{{title}}</text>
	</view>
</template>

<script setup>
	const {
		title
	} = defineProps({
		title: String
	})
</script>

<style lang="scss" scoped>
	.custom-title {
		display: flex;
		align-items: center;
		margin: 22px 0;

		.bar {
			width: 6px;
			height: 18px;
			margin-right: 10px;
		}

		.tip {
			font-size: 18px;
			font-weight: bold;
		}
	}
</style>