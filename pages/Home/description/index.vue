<template>
	<scroll-view scroll-y="true">
		<view class="container">
			<text class="topic">{{$t('商品详情')}}</text>
			<view class="first-card">

			</view>
			<view class="second-card">

			</view>

			<view class="sell">
				<image src='/static/home/title_icon.png' class="bar" />
				<text class="tip">{{ $t('算力详情')}}</text>
			</view>
			<view class="last-card" v-for="i  in 3" :key="i">

			</view>

			<view class="buy">
				<text>激活</text>
			</view>
		</view>
	</scroll-view>

</template>

<script setup>
</script>

<style lang="scss" scoped>
	.container {
		padding: 15px;

		.topic {
			font-weight: bold;
			font-size: 24px;
		}

		.sell {
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

		.first-card {
			height: 170px;
			border-radius: 15px;
			box-shadow: 0px 0px 10px -8px;
		}

		.second-card {
			height: 170px;
			border-radius: 15px;
			box-shadow: 0px 0px 10px -8px;
		}

		.last-card {
			height: 170px;
			border-radius: 15px;
			box-shadow: 0px 0px 10px -8px;
		}

		.buy {
			height: 70px;
			width: 100%;
			background-color: blue;
			position: fixed;
			bottom: 0;
			left: 0;
		}
	}
</style>