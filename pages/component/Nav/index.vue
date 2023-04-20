<template>
	<view class="custom_nav">
		<slot name='left'>
			<image src="/static/base/title_left_arrow.png" class="left_arrow" @click="callback" />
		</slot>
		<text class="title" :style="titleStyle">{{title}}</text>
		<slot name="right"></slot>
	</view>
</template>

<script setup>
	const props = defineProps({
		title: String,
		callback: Function,
		titleStyle: Object
	})
</script>

<style lang="scss" scoped>
	.custom_nav {
		height: 50px;
		padding-left: 15px;
		padding-right: 15px;
		@include flex(center, space-between);
		position: relative;

		.left_arrow {
			width: 22px;
			height: 17px;
		}

		.title {
			font-weight: bold;
			font-size: 19px;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
	}
</style>