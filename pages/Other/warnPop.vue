<template>
	<view class="custom-overlay">
		<view class="box">
			<view class="caption">{{title}}</view>
			<view class="msg">{{message}}</view>
			<view class="btns">
				<text v-show="showCancel" @click="close">{{I18n.t('取消')}}</text>
				<text class="ok" @click="handleOk">{{I18n.t('确定')}}</text>
			</view>
		</view>
	</view>
</template>

<script setup>
	import I18n from '@/hooks/useLocale.js';

	const props = defineProps({
		showCancel: Boolean,
		message: String,
		title: String,
		close: Function,
		confirm: Function
	})

	function handleOk() {
		props.confirm();
		props.close();
	}
</script>

<style lang="scss" scoped>
	.custom-overlay {
		background-color: rgba(0, 0, 0, 0.6);
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 9999;
		@include flex(center, center);
		word-wrap: break-word;

		.box {
			width: 70%;
			background-color: #fff;
			padding: 15px;
			border-radius: 6px;

			.caption {
				font-weight: bold;
				font-size: 19px;
			}

			.msg {
				margin-top: 15px;
				margin-bottom: 17px;
				line-height: 22px;
			}

			.btns {
				text-align: right;
				color: #666;

				.ok {
					color: #05AA84;
					margin-left: 30px;
				}
			}
		}
	}
</style>