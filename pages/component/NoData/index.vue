<template>
	<view class="empty">
		<view class="part_1">
			<image class="img" src="/static/base/none_icon.png" />
			<text class="text">{{$t('暂无数据')}}</text>
		</view>
		<view class="btn" @click="handleClick" v-show="!hideBtn">
			<text class="btn_text">{{$t('登录后，查看订单')}}</text>
		</view>
	</view>
</template>
<script setup>
	const {
		hideBtn
	} = defineProps({
		hideBtn: Boolean
	})

	function handleClick() {
		uni.navigateTo({
			url: '/pages/Login/index'
		})
	}
</script>

<style lang="scss" scoped>
	.empty {
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		.part_1 {
			text-align: center;

			.img {
				width: 200px;
				height: 177px;
			}

			.text {
				display: block;
				color: #999;
				font-size: 17px;
			}
		}

		.btn {
			margin-top: 35px;
			background-color: #05AA84;
			padding: 12px 36px;
			border-radius: 12px;

			.btn_text {
				color: #fff;
			}
		}
	}
</style>