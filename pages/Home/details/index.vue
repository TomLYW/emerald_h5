<template>
	<scroll-view scroll-y style="height: 100%;">
		<view class="container">
			<text class="title">{{item.title}}</text>
			<text class='date'>{{formatDate(item.createdAt)}}</text>
			<text class='content'>{{item.content}}</text>
		</view>
	</scroll-view>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	import {
		onLoad,
	} from "@dcloudio/uni-app";
	import {
		getNoticeDetails
	} from '@/services/home.js';
	import {
		formatDate
	} from '@/utils/index.js';

	let item = ref({});

	onLoad((option) => {
		getNoticeDetails({
			id: option.id
		}).then(res => {
			if (res.code === 0) {
				item.value = res.data;
			}
		})
	})
</script>

<style lang="scss" scoped>
	.container {
		padding: 15px;
		display: flex;
		flex-direction: column;

		.title {
			font-weight: bold;
			font-size: 18px;
			margin-bottom: 12px;
		}

		.date {
			color: #999;
			font-size: 14px;
			margin-bottom: 12px;
		}

		.content {
			color: #555;
		}
	}
</style>