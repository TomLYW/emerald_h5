<template>
	<view class="notice_main">
		<Nav class="notice_nav" :title="$t('notice_list')">
			<template #left>
				<image src="/static/base/title_left_arrow.png" class="icon" @click="handleBack" />
			</template>
		</Nav>
		<view class="notice_content">
			<view class="cell" v-for="item in store.noticeList" :key="item.id" @click="handleClick(item.id)">
				<text>{{item.title}}</text>
				<TextEllipsis class="content" rows='2' :content='item.content' />
				<text class="date">{{formatDate(item.createdAt)}}</text>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { TextEllipsis } from 'vant';
	import { formatDate } from '@/utils/index.js';
	import { useNoticeStore } from '@/store/notice.js';
	import Nav from '@/pages/component/Nav/index.vue';

	const store = useNoticeStore();


	const handleClick = (id) => {
		uni.navigateTo({
			url: `/pages/Home/details/index?id=${id}`
		})
	}

	const handleBack = () => {
		history.back();
	}
</script>

<style lang="scss" scoped>
	.notice_main {
		height: 100%;
		@include flex(null, null, column);

		.notice_nav {
			.icon {
				width: 23px;
				height: 17px;
			}
		}

		.notice_content {
			flex: 1;
			overflow-y: auto;
			padding: 10px 15px;

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
	}
</style>