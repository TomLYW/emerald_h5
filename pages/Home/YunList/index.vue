<template>
	<view class="container">
		<view class="cell">
			<view class="tag">
				<text class="tag-title">环境发生</text>
			</view>

			<!-- <text>环境事件的发生</text>
			<text>环境事件的发生</text> -->
		</view>
	</view>
</template>

<script setup>
</script>

<style lang="scss" scoped>
	.container {
		padding: 20px;
	}

	.cell {
		// display: flex;
		// flex-direction: column;
		height: 150px;
		border-radius: 12px;
		background-color: #E5E5E5;
		box-shadow: 0px 0px 10px -8px #000;

		.tag {
			width: 70px;
			height: 18px;
			background-color: #05AA84;
			border-top-left-radius: 15px;
			border-bottom-right-radius: 15px;
			line-height: 18px;
			text-align: center;

			.tag-title {
				font-size: 12px;
				color: #fff;
			}
		}
	}
</style>