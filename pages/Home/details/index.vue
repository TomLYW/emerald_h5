<template>
	<view class="page_main">
		<Nav class="page_nav" :title="$t('detail')">
			<template #left>
				<image src="/static/base/title_left_arrow.png" class="icon" @click="handleBack" />
			</template>
		</Nav>
		<view class="page_content">
			<text class="title">{{item.title}}</text>
			<text class='date'>{{formatDate(item.createdAt)}}</text>
			<text class='content'>{{item.content}}</text>
		</view>
	</view>
</template>

<script setup>
	import { ref } from 'vue';
	import { onLoad } from "@dcloudio/uni-app";
	import { getNoticeDetails } from '@/services/home.js';
	import { formatDate } from '@/utils/index.js';
	import Nav from '@/pages/component/Nav/index.vue';

	let item = ref({});

	function handleBack() {
		history.back();
	}

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
	.page_main {
		height: 100%;
		@include flex(null, null, column);

		.page_nav {
			.icon {
				width: 23px;
				height: 17px;
			}
		}

		.page_content {
			flex: 1;
			overflow-y: auto;
			padding: 0px 15px 10px;
			@include flex(null, null, column);

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
	}
</style>