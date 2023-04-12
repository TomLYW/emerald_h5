<template>
	<scroll-view scroll-y style="height: 100%;">
		<view class="container">
			<view class="cell" v-for="item in list" :key="item.id" @click="handleClick(item.id)">
				<text>{{item.title}}</text>
				<TextEllipsis class="content" rows='2' :content='item.content' />
				<text class="date">{{formatDate(item.createdAt)}}</text>
			</view>
		</view>
	</scroll-view>
</template>

<script setup>
	import {
		onLoad,
		onUnload
	} from "@dcloudio/uni-app";
	import {
		ref
	} from 'vue';
	import {
		TextEllipsis
	} from 'vant';
	import {
		formatDate
	} from '@/utils/index.js';

	let list = ref([]);

	const handleClick = (id) => {
		uni.navigateTo({
			url: `/pages/Home/details/index?id=${id}`
		})
	}

	onLoad(() => {
		uni.$on('item', (res) => {
			list.value = res;
		})
	})
	onUnload(() => {
		uni.$off('item');
	})
</script>

<style lang="scss" scoped>
	.container {
		padding: 20px 15px 0px;

		.cell {
			padding: 10px 15px;
			border-radius: 8px;
			box-shadow: 0px 0px 10px -4px;
			display: flex;
			flex-direction: column;
			margin-bottom: 20px;

			.content {
				color: #666;
				font-size: 14px;
				margin: 12px 0;
			}

			.date {
				color: #999;
				font-size: 12px;
			}
		}
	}
</style>