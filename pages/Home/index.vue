<template>
	<scroll-view scroll-y="true" style="height: 100%;">
		<view class="home">
			<view class='header'>
				<image class='left-img' src='/static/home/home_logo.png' />
				<image class='right-img' src='/static/home/home_icon_news.png' @click="handleNotice" />
			</view>
			<swiper class="banner" circular indicator-dots autoplay :interval="3500">
				<swiper-item v-for="v in current.bannerList" :key="v.id">
					<image :src="v.image" class="img" />
				</swiper-item>
			</swiper>

			<view class="middle" @click="handleMiddle" v-if="current.noticeList.length > 0">
				<image class="midl-img" src='/static/home/home_icon_notice.png' />
				<view class="mid-content">
					<text class="title">{{current.noticeList[0]?.title}}</text>
					<text class="date">{{formatDate(current.noticeList[0]?.createdAt)}}</text>
				</View>
				<image class="midr-img" src='/static/home/home_icon_rightarrow.png' />
			</view>
			<CustomTitle :title="$t('推荐矿机共享服务')" />
			<YunCell :item='current.cloudData' v-if="'sold' in current.cloudData" />
			<view class="footer">
				<image class="icon" src='/static/base/base_bottom_title.png'></image>
				<text class="title">{{$t('值得信赖的矿机服务平台')}}</text>
			</view>
		</view>
	</scroll-view>
</template>


<script setup>
	import {
		onShow,
	} from "@dcloudio/uni-app";
	import {
		reactive,
		onMounted
	} from 'vue';
	import {
		Button,
	} from 'vant';
	import {
		getBannerImgs,
		getNoticeList
	} from '@/services/home.js';
	import {
		getMinerList
	} from '@/services/cloud.js';
	import {
		formatDate
	} from '@/utils/index.js';
	import YunCell from '@/pages/Home/YunList/index.vue';
	import CustomTitle from '@/pages/component/CustomTitle/index.vue';
	import {
		useNoticeStore
	} from '@/store/notice.js';

	const store = useNoticeStore();

	let current = reactive({
		bannerList: [],
		noticeList: [],
		cloudData: {},
	})

	const handleNotice = () => {
		uni.navigateTo({
			url: '/pages/Home/notice/index'
		})
	}

	const handleMiddle = () => {
		uni.navigateTo({
			url: `/pages/Home/details/index?id=${current.noticeList[0].id}`
		})
	}

	// 页面数据
	const getData = () => {
		getBannerImgs().then(res => {
			if (res.code === 0) {
				current.bannerList = res.data;
			}
		})
		getNoticeList({
			page: 1,
			limit: 100
		}).then(res => {
			if (res.code === 0) {
				current.noticeList = res.data;
				store.setNoticeList(res.data);
			}
		})

		getMinerList({
			isRecommend: 1
		}).then(res => {
			if (res.code === 0) {
				current.cloudData = res.data[0] ?? {};
			}
		})
	}
	// onMounted(() => {
	// 	getData();
	// })
	onShow(() => {
		getData();
	})
</script>

<style lang="scss" scoped>
	.home {
		padding: 15px;

		.header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 12px;

			.left-img {
				width: 118px;
				height: 22px;
			}

			.right-img {
				width: 22px;
				height: 24px;
			}
		}

		.banner {
			margin-bottom: 20px;

			.img {
				width: 100%;
				height: 100%;
				border-radius: 6px;
			}
		}

		.middle {
			display: flex;
			align-items: center;
			padding: 10px 15px;
			border-radius: 8px;
			background-color: #fff;
			box-shadow: 0px 0px 10px -8px;

			.midl-img {
				width: 40px;
				height: 40px;
			}

			.midr-img {
				width: 26px;
				height: 26px;
			}

			.mid-content {
				flex: 1;
				padding: 0 15px;

				.title {
					font-weight: bold;
				}

				.date {
					display: block;
					font-size: 13px;
					color: #C1C1C1;
					margin-top: 6px;
				}
			}
		}

		.footer {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			height: 100px;

			.icon {
				width: 110px;
				height: 24px;
			}

			.title {
				font-size: 12px;
				color: #999999;
				margin-top: 10px;
			}
		}
	}
</style>