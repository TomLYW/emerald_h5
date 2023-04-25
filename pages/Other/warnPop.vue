<template>
	<view class="custom-overlay" v-if="show">
		<view class="box">
			<view class="caption">提示</view>
			<view class="msg">Continuous efforts to stabilize employment and promote people's livelihoods</view>
			<view class="btns">
				<text @click="cancel" v-show="showCancel">取消</text>
				<text class="ok" @click="confirm">确定</text>
			</view>
		</view>
	</view>
</template>

<script setup>
	defineProps({
		show: Boolean,
		showCancel: Boolean,
		message: String,
		title: String,
	})

	const emit = defineEmits(['update:show']);
	const pages = getCurrentPages();
	console.log('xx', pages)

	function cancel() {

	}

	function confirm() {
		emit('update:show', false);
		console.log('hjhjhjb')
		location.reload();
	}
</script>

<style lang="scss" scoped>
	.custom-overlay {
		background-color: rgba(0, 0, 0, 0.7);
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		@include flex(center, center);
		word-wrap: break-word;

		.box {
			width: 70%;
			background-color: #fff;
			padding: 15px;
			border-radius: 6px;

			.caption {
				font-weight: bold;
				font-size: 17px;
			}

			.msg {
				margin-top: 15px;
				margin-bottom: 15px;
				line-height: 22px;
			}

			.btns {
				text-align: right;

				.ok {
					color: #05AA84;
					margin-left: 15px;
				}
			}
		}
	}
</style>