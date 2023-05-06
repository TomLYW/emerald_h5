<template>
	<view class="remind_main">
		<Nav class="remind_nav" :title="$t('完成')" :callback="handleBack" />
		<view class="remind_content">
			<image src="/static/mine/img_mall_success.png" class="img" />
			<text class="title">{{title}}</text>
			<view class="btn" @click="handleClick">
				{{$t('完成')}}
			</view>
		</view>
	</view>
</template>

<script setup>
	import { onLoad } from '@dcloudio/uni-app';
	import I18n from '@/hooks/useLocale.js';
	import Nav from '@/pages/component/Nav/index.vue';
	import { ref } from 'vue';
	let title = ref('');

	function handleClick() {
		uni.redirectTo({
			url: '/pages/Mine/electric/index'
		})
	}

	function handleBack() {
		history.back();
	}

	onLoad((option) => {
		title.value = option.title;
	})
</script>

<style lang="scss" scoped>
	.remind_main {
		.remind_nav {}

		.remind_content {
			padding: 15px;
			@include flex(center, null, column);

			.img {
				width: 91px;
				height: 90px;
				margin-bottom: 15px;
			}

			.title {
				color: #333;
			}

			.btn {
				margin-top: 30px;
				background-color: #05AA84;
				color: #fff;
				font-weight: bold;
				font-size: 18px;
				padding: 8px 70px;
				border-radius: 12px;
				box-shadow: 0px 0px 10px -6px #000;

				&:active {
					opacity: 0.7;
				}
			}
		}
	}
</style>