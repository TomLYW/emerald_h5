<template>
	<view class="home_main">
		<view class='header'>
			<image class='left-img' src='/static/home/home_logo.png' />
			<image class='right-img' src='/static/home/home_icon_news.png' @click="handleNotice" />
		</view>
		<view class="home_content">
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
			<YunCell v-for="(item,i) in current.cloudData" :item='item' :key="item.id"
				:class="[i < (current.cloudData.length - 1) ? 'yun_cell' : '']" />
			<view class="footer">
				<image class="icon" src='/static/base/base_bottom_title.png'></image>
				<text class="title">{{$t('值得信赖的矿机服务平台')}}</text>
			</view>
		</view>
	</view>
</template>


<script setup>
	import { onShow } from "@dcloudio/uni-app";
	import { reactive, onBeforeUnmount, onMounted } from 'vue';
	import { Button } from 'vant';
	import { getBannerImgs, getNoticeList } from '@/services/home.js';
	import { getMinerList } from '@/services/cloud.js';
	import { formatDate } from '@/utils/index.js';
	import YunCell from '@/pages/Home/YunList/index.vue';
	import CustomTitle from '@/pages/component/CustomTitle/index.vue';
	import { useNoticeStore } from '@/store/notice.js';
	import { useUserStore } from '@/store/user.js';
	import Popup from '@/hooks/useCustomPop.js';
	import { getForceList, getThreshold } from '@/services/other.js';

	const store = useNoticeStore();
	const user = useUserStore();

	let current = reactive({
		bannerList: [],
		noticeList: [],
		cloudData: [],
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
				current.cloudData = res.data;
			}
		})
	}

	// 弹窗显示
	const getDialog = async () => {
		let index = 0;
		const res1 = await getForceList();
		const res2 = await getThreshold();
		if (res1.data.length) {
			index = 1;
		} else {
			if (res2.data.status > 0) {
				index = 2;
			}
		}

		if ((res1.data.length && res2.data.status === 0) || (!res1.data.length && res2.data.status > 0)) {
			Popup.showTips({ force: res1.data, threshold: res2.data, showIndex: index });
		}
	}

	onShow(() => {
		getData();
	})

	onMounted(() => {
		// if (user.isLogin && !uni.getStorageSync('init')) {
		// 	Popup.showForce();
		// 	uni.setStorageSync('init', '1');
		// }
		if (user.isLogin) {
			getDialog();
			// uni.setStorageSync('init', '1');
		}
	})

	onBeforeUnmount(() => {
		// console.log('组件卸载')
		// uni.removeStorageSync('init');
	})
</script>

<style lang="scss" scoped>
	.home_main {
		height: 100%;
		@include flex(null, null, column);

		.header {
			@include flex(center, space-between);
			margin: 15px 15px 12px;

			.left-img {
				width: 118px;
				height: 22px;
			}

			.right-img {
				width: 22px;
				height: 24px;
			}
		}

		.home_content {
			flex: 1;
			overflow-y: auto;
			padding-left: 15px;
			padding-right: 15px;

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

			.yun_cell {
				margin-bottom: 20px;
			}

			.footer {
				@include flex(center, center, column);
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
	}
</style>